# AulaFinder V56 corretta — verifica del 27 novembre 2026

Questa è una correzione puntuale della V56, non una nuova versione del progetto. Conserva navigatore, piantine, orari, Finder, dati, archivi e media originali.

## Errore realmente riprodotto e corretto

Nella V56 precedente, alcune vecchie dichiarazioni `:has(input:focus-visible)` erano più specifiche delle regole inserite in `v56.css`, per cui la ricerca della Home mostrava ancora un contorno colorato e un'ombra. Il problema è stato riprodotto misurando gli stili CSS effettivi in Chromium. Il nuovo override mantiene una sottolineatura visibile per il focus da tastiera, ma elimina bordo evidenziato e ombra dai contenitori di ricerca.

## Controlli

- 8 configurazioni Chromium con sorgenti CSS caricati in memoria: 320, 390, 768 e 1280 px, tema chiaro e scuro. Verificati: contorno dei contenitori ricerca, ombra, indicatori focus, colore del percorso e gradiente header.
- 25 file JavaScript verificati con `node --check`.
- Tutti i riferimenti locali espliciti in `index.html` sono stati risolti senza file mancanti.
- 79 asset e file critici confrontati byte per byte con la V56 precedente, tra cui `navigator.js`, `data.js`, `piantina.js`, `finder.js` e file multimediali.
- Nel tutorial V56 la fase Disponibilità richiede Aule libere e Professori liberi senza selezionare giorno o ora. Sono presenti navigazione per sottopassaggi, evidenziazione e velo leggero sullo sfondo.
- `v55-tutorial.js` resta archiviato, ma NON è caricato da `index.html`: nessuna doppia guida attiva.
- Aggiornati i parametri di versione dei file CSS/JS nell'HTML e la cache PWA per facilitare il ricambio delle risorse dopo la pubblicazione.

## Limiti

Il test ha misurato gli stili e i componenti in un documento Chromium in memoria. L'ambiente di collaudo ha impedito la navigazione diretta tramite URL HTTP o `file://`; quindi non si tratta di un test end-to-end del sito su GitHub Pages o di un collaudo con touchscreen reale. La pubblicazione e la cache del browser vanno comunque controllate sul sito online.
