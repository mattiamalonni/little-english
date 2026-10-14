# Little English

Minigiochi di inglese per bambini alle prime armi, con interfaccia italiana e layout per desktop, telefono e iPad. Next.js App Router, React e TypeScript.

## Giochi

- **Colors (24):** associa la parola inglese al colore, incluse tonalita chiare e scure.
- **Animals (40):** riconosci l'animale e scegli il nome inglese.
- **Everyday things (32):** leggi o ascolta la parola e trova l'oggetto.
- **Action words (24):** associa l'azione italiana al verbo inglese.
- **Food (32):** leggi o ascolta la parola e trova il cibo.
- **Numbers (0-20):** osserva la cifra, conta i pallini e scegli il numero in inglese.

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

I test verificano dimensione e unicita dei vocabolari, presenza delle illustrazioni, numeri da 0 a 20, generazione di sei domande, unicita delle opzioni, cambio della prima domanda al replay e calcolo del punteggio.

## Dati e audio

Nessun account, database, cookie applicativo o storage persistente. La partita vive nello stato React: ricaricando o chiudendo la pagina, i risultati vengono persi. L'apertura diretta di un riepilogo senza partita mostra un invito a ricominciare.

La pronuncia usa la Web Speech API con lingua inglese e velocita ridotta. Parte solo premendo il pulsante audio. Le voci e il loro funzionamento offline dipendono dal browser e dal sistema operativo; alcune voci possono usare servizi del dispositivo. Il gioco resta utilizzabile senza audio. La pronuncia va verificata anche su un iPad/iPhone reale con una voce inglese disponibile.

Illustrazioni e font sono serviti dall'applicazione. I font Google vengono scaricati durante la build, non dal browser del bambino. Non sono presenti analytics.

## Deploy su Vercel

Importa il repository su Vercel, seleziona il preset **Next.js** e Node.js 22.x o successivo. Comando build: `npm run build`. Non sono necessari segreti, variabili d'ambiente o database. Non serve configurare `output: export`.

## Aggiungere parole

Il vocabolario e le impostazioni dei giochi sono in `src/lib/games.ts`. Ogni categoria richiede almeno sei parole distinte. Le immagini locali si trovano in `public/illustrations`.

## Crediti

Illustrazioni [Twemoji](https://github.com/jdecked/twemoji), Twitter e altri contributori, distribuite con licenza [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). I file SVG originali sono usati senza modifiche; composizione, dimensioni e rotazioni sono definite tramite CSS.

Icone [Lucide](https://lucide.dev/), licenza ISC. Font Nunito e Plus Jakarta Sans, SIL Open Font License.
