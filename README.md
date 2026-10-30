# Little English

Minigiochi di inglese per bambini alle prime armi, con interfaccia italiana e layout per desktop, telefono e iPad. Next.js App Router, React e TypeScript.

## Giochi

- **Colors (36):** associa la parola inglese al colore, incluse tonalita chiare e scure.
- **Animals (52):** riconosci l'animale e scegli il nome inglese.
- **Everyday things (48):** leggi o ascolta la parola e trova l'oggetto.
- **Action words (40):** associa l'azione italiana al verbo inglese.
- **Food (48):** leggi o ascolta la parola e trova il cibo.
- **Weather (24):** associa illustrazione e parola italiana al termine inglese del tempo.
- **Nature (24):** associa illustrazione e parola italiana al termine inglese della natura.
- **Numbers (0-30):** osserva la cifra, conta i pallini e scegli il numero in inglese.

Ogni partita propone sei domande distinte e quattro risposte per domanda. Domande e opzioni vengono mescolate; ripetendo la partita, la prima domanda cambia sempre. Il riepilogo mostra risposte corrette, errori, traduzioni e parole da ripassare.

## Avvio locale

Node.js 22.18 o successivo.

```bash
npm install
npm run dev
```

Apri http://localhost:3000. Per una porta diversa: `npm run dev -- --port 3001`.

```bash
npm test
npm run lint
npm run build
npm start
```

I test verificano dimensione e unicita dei vocabolari, SVG locali per tutte le parole illustrate e le schede, assenza di emoji native, immagini distinte nelle risposte visive, suggerimenti italiani per i concetti ambigui, numeri da 0 a 30, generazione di sei domande, unicita delle opzioni, cambio della prima domanda al replay e calcolo del punteggio.

## Dati e audio

Nessun account, database, cookie applicativo o storage persistente. La partita vive nello stato React: ricaricando o chiudendo la pagina, i risultati vengono persi. L'apertura diretta di un riepilogo senza partita mostra un invito a ricominciare.

La pronuncia usa MP3 locali generati con la voce britannica **Alice** di ElevenLabs, uguali su tutti i dispositivi. Il pulsante Ascolta e presente nella domanda di tutti i minigiochi, inclusi quelli con immagini e numeri, oltre che nel feedback e nel riepilogo. Ascoltare prima di rispondere offre un aiuto con il nome inglese da riconoscere. Parte solo premendo il pulsante audio, senza chiamate a ElevenLabs e senza voci sintetiche del browser. Un nuovo ascolto interrompe il precedente; cambio pagina, avanzamento della domanda e disattivazione audio fermano la riproduzione. Gli errori mostrano un avviso e il gioco resta utilizzabile senza audio. La riproduzione va verificata anche su un iPad/iPhone reale.

### Generare audio naturali con ElevenLabs

Lo script locale prepara MP3 con la voce configurata. Il template e gli audio attuali usano **Alice - Clear, Engaging Educator**, una voce standard britannica, femminile e adatta a contenuti didattici. Non serve installare dipendenze aggiuntive.

1. Crea un account [ElevenLabs](https://elevenlabs.io/). Puoi usare Alice dal template oppure copiare il **Voice ID** di un'altra voce. Il nome non e un identificatore univoco. Alcune voci della libreria, come Megan, possono richiedere un piano a pagamento anche per l'uso API.
2. Crea una chiave nel [dashboard API](https://elevenlabs.io/app/api-keys), abilitando Text to Speech e lettura delle voci; imposta un limite di spesa/crediti. Verifica costi, accesso alla voce e licenza del piano prima di pubblicare gli audio.
3. Copia `.env.example` in `.env.local` (senza sovrascrivere un file esistente) e compila:

   ```dotenv
   ELEVENLABS_API_KEY=la_tua_chiave
   ELEVENLABS_VOICE_ID=Xb7hH8MSUJpSbSDYk0k2
   ELEVENLABS_MODEL_ID=eleven_multilingual_v2
   ```

   Non usare prefissi `NEXT_PUBLIC_`. Non condividere la chiave in chat o nel repository: `.env.local` e ignorato da Git. Lo script legge questo file e le variabili del processo, non gli altri file `.env`.

4. Se non trovi il Voice ID, compila prima la sola chiave e cerca le voci disponibili nel tuo account:

   ```bash
   npm run audio:generate -- --voices
   ```

5. Genera solo il campione (una richiesta a pagamento secondo il tuo piano):

   ```bash
   npm run audio:generate -- --sample
   ```

   Apri il percorso `sample.mp3` stampato nel terminale. La velocita e 0.95, senza rallentamento artificiale nel player.

6. Solo dopo l'approvazione del campione:

   ```bash
   npm run audio:generate -- --all --dry-run
   npm run audio:generate -- --all --confirm
   ```

La simulazione non richiede chiavi, non effettua richieste e mostra caratteri di testo, non un preventivo. Il lotto genera un file per parola inglese distinta; parole condivise tra categorie sono deduplicate. Gli MP3 finiscono direttamente in `public/audio/`, senza sottocartelle, e sono serviti come `/audio/tree.mp3`: sono pubblici, ma non contengono la chiave. Il browser non chiama ElevenLabs. Aggiungendo parole, genera gli audio prima del deploy: `npm test` verifica che ogni parola abbia un MP3 locale.

I file gia presenti vengono riutilizzati: il comando si puo riprendere dopo un errore senza rigenerarli. Gli errori fermano il lotto, senza retry automatici che potrebbero consumare altri crediti. Per rigenerare un file rimuovilo esplicitamente; se cambi voce o modello, sposta prima gli audio precedenti fuori da `public/audio/` per non mescolare le voci. Dopo timeout o errori di rete controlla anche il dashboard: una richiesta potrebbe essere stata addebitata senza aver salvato l'audio. Non avviare piu generatori contemporaneamente.

Il [piano gratuito](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform) non permette usi commerciali. L'app non commerciale include l'attribuzione `elevenlabs.io` nel titolo della pagina e il collegamento nel footer, secondo i termini ElevenLabs. Non considerare gli audio coperti dalla licenza delle illustrazioni. Per un eventuale uso commerciale occorre verificare la licenza e rigenerare gli audio con un piano idoneo.

Illustrazioni e font sono serviti dall'applicazione. I font Google vengono scaricati durante la build, non dal browser del bambino. Non sono presenti analytics.

## Deploy su Vercel

Importa il repository su Vercel, seleziona il preset **Next.js** e Node.js 22.x o successivo. Comando build: `npm run build`. Non sono necessari segreti, variabili d'ambiente o database. Non serve configurare `output: export`.

## Aggiungere parole

Il vocabolario e le impostazioni dei giochi sono in `src/lib/games.ts`. Ogni categoria richiede almeno sei parole distinte. Le immagini locali si trovano in `public/illustrations` e usano nomi inglesi leggibili in minuscolo, con trattini tra le parole, come `cat.svg` e `teddy-bear.svg`: `image: "cat"` fa riferimento a `cat.svg`. La corrispondenza con i nomi originali Twemoji e conservata nei crediti. Non usare emoji di sistema: lo stesso SVG viene mostrato su ogni dispositivo, nelle domande, nelle risposte e nel riepilogo. Colori e numeri mantengono le proprie rappresentazioni CSS.

Per aggiungere un'illustrazione, riusa un asset locale semanticamente corretto, oppure importa un SVG Twemoji dalla revisione indicata nell'[attribuzione](public/illustrations/ATTRIBUTION.md); per concetti non coperti, crea un SVG originale nello stesso stile piatto e aggiorna i crediti. Non sovrascrivere gli asset esistenti. Usa un `viewBox="0 0 36 36"` e nessuna risorsa esterna. Action words, Weather e Nature usano `showItalianPrompt: true`: il testo italiano distingue concetti che un'immagine da sola non rende univoci (sole/soleggiato, tuono/fulmine, mare/oceano).

## Crediti

Illustrazioni [Twemoji](https://github.com/jdecked/twemoji), Twitter e altri contributori, distribuite con licenza [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Gli asset Twemoji sono scaricati e usati senza modifiche, non generati dal modello. Le illustrazioni originali aggiuntive sono SVG scritti con assistenza di GPT-6 Astra, senza un servizio di generazione immagini, e distribuiti con la stessa licenza. Elenco, provenienza e revisione sono in [ATTRIBUTION.md](public/illustrations/ATTRIBUTION.md). Composizione, dimensioni e rotazioni sono definite tramite CSS.

Icone [Lucide](https://lucide.dev/), licenza ISC. Font Nunito e Plus Jakarta Sans, SIL Open Font License.
