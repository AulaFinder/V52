# Verifiche AulaFinder V57 · 28 novembre 2026

## Risultati realmente controllati

- Base: ZIP della **V56 corretta**.
- JavaScript: sintassi verificata con `node --check` per ogni `.js` della distribuzione.
- Test DOM in Chromium **con HTML/CSS/JavaScript caricati in memoria**: 320, 390, 768 e 1280 px, rendering Home, ricerca presente, apertura programmatica Home/Orari/Piantina/Navigatore/Versioni, V57 riconosciuta come attuale, **otto tab del tutorial**, nessun overflow orizzontale o eccezione JavaScript nei passaggi osservati.
- Screenshot reale della Home V57 generato senza alterare le immagini originali e incluso in archivio come `assets/versioni-home/V57.png`.
- Controlli statici: file HTML/CSS/JS citati presenti, manifest e JSON validi, riferimento della versione attuale corretto, service worker con file V57, integrità dello ZIP.

## Regole conservate

- I file PNG, i video e gli altri media originali già presenti nella V56 **non vengono convertiti o ricompressi**. Nessuna modifica ai dati scolastici originali di `data.js`.
- Modifica visiva di focus non equivale alla rimozione dell'accessibilità da tastiera: viene mantenuto un contorno neutro `:focus-visible`, il richiamo giallo rimane per le azioni guidate.
- Gradiente dell'header e contrasto delle schede risultati mantenuti nella stessa famiglia grafica, senza effetti globali pesanti.

## Verifiche che non sono complete (da effettuare dopo la pubblicazione)

1. Aprire i **singoli otto passaggi del tutorial** su GitHub Pages, anche in iframe, e verificare ogni avanzamento reale, restrizione e ritorno alla Home. Il browser di collaudo ha impedito la navigazione diretta al server locale; una verifica parziale in memoria ha mostrato Finder correttamente guidato, ma non copre tutte le interazioni.
2. Verificare su PC e smartphone fisici il trascinamento, ridimensionamento e blocco dell'orb Finder, compresi scroll e apertura fullscreen.
3. Verificare percorso **Palestra ↔ aula** sui due piani e la corrispondenza dei raccordi con le porte reali. Lo schema è indicativo, non una prova sul luogo.
4. Verificare piantine selezionabili nel fullscreen su Android/iOS, colore dell'aula, pinch zoom e testata «Portami qui»/«Vedi orario».
5. Testare caricamento delle immagini e cache di GitHub Pages, microfono su HTTPS e finestra privata.
6. Testare la semantica del contenuto e la compatibilità con lettori di schermo: la revisione CSS/responsive **non è una certificazione WCAG**.
7. Convalidare tutte le risposte Finder sugli orari effettivi. Le molte frasi proposte non implicano che l'assistente sappia rispondere generativamente a qualsiasi domanda.
8. Confermare che l'Admin aggiornato consenta le modifiche locali previste. **Non c'è sincronizzazione centralizzata e non c'è autenticazione server.**
9. Le anteprime storiche in tema scuro sono una **simulazione visiva** quando manca uno screenshot autentico, non una ricostruzione dei vecchi CSS.

## Copertura richieste (1–60 del prompt)

- **Interventi al codice/UI:** 1–8, 10–27, 29–44, 46–50, 52–57, 59–60. Alcuni richiedono verifica reale di interazioni e layout per essere considerati chiusi.
- **Funzioni coperte solo parzialmente:** 9 (ritorno Home soltanto nel contesto guida), 18/38 (raccordo Palestra migliorato, non verificato fisicamente), 28 (Finder ampliato con richieste locali, non AI generativa), 31 (transizione FLIP, da provare in più browser), 45 (tema scuro simulato per foto storiche), 51 (hash nel client, **non protezione reale**), 58 (modifiche locali e refresh, **non in tempo reale tra dispositivi**).
- **Da validare dopo pubblicazione:** in particolare 7, 11–17, 19, 21–23, 30, 33, 37, 39 e 44. Non dichiarati al 100% in assenza di test end-to-end su Pages.

Per problemi online, usare **F12 → Network** per cercare HTTP 404 e **Application → Service Workers** per verificare la cache, prima di sostituire i file a caso.
