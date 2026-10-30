import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { games } from "../src/lib/games.ts";
import { audioFilename } from "../src/lib/audio.ts";

const api = "https://api.elevenlabs.io";
const sample =
  "Hello, little explorer! Tree. Flower. Rainbow. Butterfly. One, two, three. Well done!";
const help = `Generazione locale con ElevenLabs (configurazione in .env.local).
  --voices              Elenca le voci disponibili nel tuo account
  --sample              Genera solo sample.mp3 (consuma crediti)
  --all --dry-run       Mostra parole e caratteri, senza chiamate API
  --all --confirm       Genera il vocabolario completo (consuma crediti)
Gli MP3 esistenti vengono riutilizzati. Nessuna rigenerazione automatica.`;

export function vocabularyJobs() {
  const words = [...new Set(games.flatMap((game) =>
    game.words.map((word) => word.english)))];
  const jobs = words.map((text) => ({
    text,
    filename: audioFilename(text),
  }));
  if (new Set(jobs.map((job) => job.filename)).size !== jobs.length) {
    throw new Error("Nomi audio duplicati: correggere i nomi prima di generare.");
  }
  return jobs;
}

function required(env, name) {
  const value = env[name]?.trim();
  if (!value) {
    throw new Error(`Configura ${name} in .env.local. Non inserire segreti in chat.`);
  }
  return value;
}

async function request(path, key, options, fetchImpl) {
  const response = await fetchImpl(`${api}${path}`, {
    ...options,
    headers: {
      "xi-api-key": key,
      "Content-Type": "application/json",
    },
    redirect: "error",
    signal: AbortSignal.timeout(90_000),
  });
  if (!response.ok) {
    const hints = {
      401: "Chiave API non valida.",
      403: "Controlla i permessi della chiave e l'accesso alla voce.",
      402: "Controlla crediti e piano ElevenLabs.",
      422: "Controlla voce, modello e impostazioni richieste.",
      429: "Limite di richieste o crediti raggiunto. Riprova piu tardi.",
    };
    throw new Error(
      `ElevenLabs HTTP ${response.status}. ${hints[response.status] ?? "Richiesta fallita: controlla il dashboard ElevenLabs."}`,
    );
  }
  return response;
}

export async function createSpeech(text, env, fetchImpl = fetch) {
  const key = required(env, "ELEVENLABS_API_KEY");
  const voice = required(env, "ELEVENLABS_VOICE_ID");
  const model = env.ELEVENLABS_MODEL_ID?.trim() || "eleven_multilingual_v2";
  if (!/^[a-zA-Z0-9_-]+$/.test(voice) || !/^[a-zA-Z0-9_-]+$/.test(model)) {
    throw new Error("ID voce o modello non valido.");
  }
  const response = await request(
    `/v1/text-to-speech/${voice}?output_format=mp3_44100_128`,
    key,
    {
      method: "POST",
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          speed: 0.95,
        },
      }),
    },
    fetchImpl,
  );
  const audio = Buffer.from(await response.arrayBuffer());
  if (!response.headers.get("content-type")?.startsWith("audio/") ||
      !isMp3(audio)) {
    throw new Error("ElevenLabs non ha restituito un MP3 valido. Nessun file salvato.");
  }
  return audio;
}

function isMp3(bytes) {
  return bytes.length > 3 && (
    bytes.subarray(0, 3).toString() === "ID3" ||
    (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)
  );
}

export async function main(args, env = process.env, fetchImpl = fetch) {
  if (args.length === 0 || (args.length === 1 && args[0] === "--help")) {
    console.log(help);
    return;
  }
  const valid = ["--voices", "--sample", "--all", "--dry-run", "--confirm"];
  if (args.some((arg) => !valid.includes(arg)) ||
      new Set(args).size !== args.length ||
      args.filter((arg) => ["--voices", "--sample", "--all"].includes(arg)).length !== 1 ||
      (args.includes("--dry-run") && args.includes("--confirm")) ||
      (args.length > 1 && !args.includes("--all"))) {
    throw new Error(`Argomenti non validi.\n${help}`);
  }
  if (args.includes("--voices")) {
    const key = required(env, "ELEVENLABS_API_KEY");
    let token;
    let count = 0;
    do {
      const query = new URLSearchParams({ page_size: "100" });
      if (token) query.set("next_page_token", token);
      const response = await request(`/v2/voices?${query}`, key, {}, fetchImpl);
      const data = await response.json();
      if (!Array.isArray(data.voices) ||
          data.voices.some((voice) => typeof voice.voice_id !== "string")) {
        throw new Error("Risposta elenco voci ElevenLabs non valida.");
      }
      for (const voice of data.voices) {
        console.log(`${voice.voice_id}\t${voice.name ?? ""}\t${voice.description ?? ""}`);
        count++;
      }
      if (data.has_more && (!data.next_page_token || data.next_page_token === token)) {
        throw new Error("Paginazione ElevenLabs non valida.");
      }
      token = data.has_more ? data.next_page_token : undefined;
    } while (token);
    if (!count) {
      throw new Error(
        "Nessuna voce trovata: controlla la libreria e i permessi della chiave ElevenLabs.",
      );
    }
    return;
  }
  const jobs = args.includes("--sample")
    ? [{ text: sample, filename: "sample.mp3" }]
    : vocabularyJobs();
  console.log(`${jobs.length} file, ${jobs.reduce((sum, job) => sum + job.text.length, 0)} caratteri di testo (non una stima del prezzo).`);
  if (args.includes("--dry-run")) {
    for (const job of jobs) console.log(`${job.filename}\t${job.text}`);
    return;
  }
  if (args.includes("--all") && !args.includes("--confirm")) {
    throw new Error("Usa --all --confirm per autorizzare il consumo di crediti, oppure --all --dry-run.");
  }
  required(env, "ELEVENLABS_API_KEY");
  const voice = required(env, "ELEVENLABS_VOICE_ID");
  const model = env.ELEVENLABS_MODEL_ID?.trim() || "eleven_multilingual_v2";
  if (!/^[a-zA-Z0-9_-]+$/.test(voice) || !/^[a-zA-Z0-9_-]+$/.test(model)) {
    throw new Error("ID voce o modello non valido.");
  }
  const directory = new URL("../public/audio/", import.meta.url);
  await mkdir(directory, { recursive: true });
  for (const job of jobs) {
    const destination = new URL(job.filename, directory);
    try {
      const existing = await readFile(destination);
      if (!isMp3(existing)) {
        throw new Error(`MP3 esistente non valido: ${fileURLToPath(destination)}. Rimuovilo manualmente prima di riprovare.`);
      }
      console.log(`Gia presente: ${job.filename}`);
      continue;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const audio = await createSpeech(job.text, env, fetchImpl);
    await writeFile(destination, audio, { flag: "wx" });
    console.log(`Salvato: ${fileURLToPath(destination)}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error instanceof Error ? error.message : "Generazione audio fallita.");
    process.exitCode = 1;
  });
}
