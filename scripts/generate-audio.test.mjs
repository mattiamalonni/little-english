import assert from "node:assert/strict";
import test from "node:test";
import { games } from "../src/lib/games.ts";
import { createSpeech, main, vocabularyJobs } from "./generate-audio.mjs";

const env = {
  ELEVENLABS_API_KEY: "test-key-not-a-secret",
  ELEVENLABS_VOICE_ID: "test-voice",
};

test("audio jobs cover all distinct words with unique safe filenames", () => {
  const jobs = vocabularyJobs();
  assert.deepEqual(
    new Set(jobs.map((job) => job.text)),
    new Set(games.flatMap((game) => game.words.map((word) => word.english))),
  );
  assert.equal(new Set(jobs.map((job) => job.filename)).size, jobs.length);
  assert.ok(jobs.every((job) => /^[a-z0-9-]+\.mp3$/.test(job.filename)));
});

test("full generation requires confirmation before any API call", async () => {
  await assert.rejects(main(["--all"], env, () => {
    assert.fail("Must not call ElevenLabs without confirmation");
  }), /--confirm/);
});

test("invalid arguments fail before calling the API", async () => {
  for (const args of [
    ["--oops"], ["--sample", "--all"], ["--sample", "--confirm"],
    ["--all", "--confirm", "--dry-run"], ["--all", "--all"],
  ]) {
    await assert.rejects(main(args, env), /Argomenti non validi/);
  }
});

test("speech request authenticates locally and returns MP3 data", async () => {
  const bytes = Buffer.from("ID3example-mp3");
  const result = await createSpeech("Tree", env, async (url, options) => {
    assert.equal(url, "https://api.elevenlabs.io/v1/text-to-speech/test-voice?output_format=mp3_44100_128");
    assert.equal(options.headers["xi-api-key"], env.ELEVENLABS_API_KEY);
    assert.equal(options.redirect, "error");
    assert.deepEqual(JSON.parse(options.body), {
      text: "Tree",
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75, speed: 0.95 },
    });
    return new Response(bytes, { headers: { "content-type": "audio/mpeg" } });
  });
  assert.deepEqual(result, bytes);
});

test("missing credentials and invalid voice IDs fail before a request", async () => {
  const neverFetch = () => assert.fail("Must not call the API");
  await assert.rejects(createSpeech("Tree", {}, neverFetch), /ELEVENLABS_API_KEY/);
  await assert.rejects(createSpeech("Tree", {
    ELEVENLABS_API_KEY: env.ELEVENLABS_API_KEY,
  }, neverFetch), /ELEVENLABS_VOICE_ID/);
  await assert.rejects(createSpeech("Tree", {
    ...env, ELEVENLABS_VOICE_ID: "../invalid",
  }, neverFetch), /non valido/);
});

test("HTTP errors never echo provider response bodies or credentials", async () => {
  await assert.rejects(createSpeech("Tree", env, async () =>
    new Response("sensitive provider response", { status: 401 })),
  (error) => {
    assert.match(error.message, /HTTP 401/);
    assert.ok(!error.message.includes("sensitive"));
    assert.ok(!error.message.includes(env.ELEVENLABS_API_KEY));
    return true;
  });
});

test("non-audio, empty and malformed responses cannot be saved as MP3", async () => {
  for (const [body, type] of [
    ["ID3data", "application/json"], ["", "audio/mpeg"], ["not mp3", "audio/mpeg"],
  ]) {
    await assert.rejects(createSpeech("Tree", env, async () =>
      new Response(body, { headers: { "content-type": type } })), /MP3 valido/);
  }
});

test("voice lookup handles pagination without choosing a voice automatically", async () => {
  let requests = 0;
  await main(["--voices"], env, async (url) => {
    requests++;
    const query = new URL(url).searchParams;
    assert.equal(query.get("search"), null);
    assert.equal(query.get("next_page_token"), requests === 1 ? null : "page2");
    return Response.json({
      voices: [{ voice_id: `megan${requests}`, name: "Megan" }],
      has_more: requests === 1,
      next_page_token: requests === 1 ? "page2" : null,
    });
  });
  assert.equal(requests, 2);
});

test("voice lookup reports missing voices and malformed pagination", async () => {
  await assert.rejects(main(["--voices"], env, async () =>
    Response.json({ voices: [], has_more: false })), /Nessuna voce trovata/);
  await assert.rejects(main(["--voices"], env, async () =>
    Response.json({ voices: [], has_more: true })), /Paginazione/);
});
