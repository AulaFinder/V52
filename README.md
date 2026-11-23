# AulaFinder · Il tuo navigatore scolastico

**Versione attuale: V54 · Tutorial e piantine più intuitivi (23 novembre 2026).**

AulaFinder è la web app/PWA per il Liceo Scientifico G.B. Grassi di Saronno. La V54 è costruita sulla V53, che deriva dalla V52 rifatta, a sua volta basata sulla V51, conservando gli orari, le piantine, la ricerca, il navigatore, i preferiti, le versioni e le altre funzionalità esistenti.

## Funzioni principali

- Cerca aule, classi e professori, con cronologia, preferiti e collegamenti alle piantine.
- Consulta orari, aule libere, professori liberi e ore buche. **La disponibilità è ricavata dagli orari**, non è una misura in tempo reale.
- Esplora le piantine e i percorsi schematici tra le aule; in fullscreen puoi ingrandire con due dita e usare Portami qui e Vedi orario per le aule disponibili.
- Usa Finder con orb originale animato in loop, senza tastiera automatica all'apertura, con finestra spostabile, ridimensionabile e orb bloccabile nella posizione scelta. Il microfono è facoltativo e dipende dal browser.
- Prova il sito vero dentro un unico Tutorial di sette tappe, con zoom contestuale, comandi +/−/Adatta e navigazione limitata alla funzione scelta.
- Consulta **54 versioni** con ricerca evidenziata e anteprime storiche.
- Entra nella console Admin locale: modifica le lezioni, valida i conflitti di aula/docente e importa/esporta le modifiche in JSON.
- Nessun suono, sintesi vocale o effetto acqua: solo animazioni visive.

**Correzione didattica:** classe 4AS, mercoledì, quarta ora: Informatica nel laboratorio **1.07**. Anche gli indici delle aule, dei docenti e delle disponibilità sono stati aggiornati.

## Pubblicare su GitHub Pages

1. Estrai lo ZIP: contiene la cartella `AulaFinderV54/`.
2. Pubblica **il contenuto** della cartella `AulaFinderV54/` nella radice del repository se vuoi mantenere l'attuale URL del progetto.
3. Mantieni `assets/`, `icons/`, tutti i file HTML/JS/CSS e `manifest.webmanifest`, `sw.js`, `versioni-data.json`.
4. La cache PWA è `aulafinder-pwa-v54-20261123-1`; ricarica la pagina e, se necessario, riapri la PWA per ricevere tutti gli aggiornamenti.
5. Per provare il tutorial incorporato in locale, usa un server HTTP (ad esempio dalla cartella `AulaFinderV54`, `python -m http.server 8000`) e apri `http://localhost:8000/`. Aprire direttamente `index.html` con `file://` può limitare l'iframe e il microfono per le restrizioni del browser.

## Admin: limite importante

La password dimostrativa è `kiwi`. **Non è un sistema di sicurezza lato server.** La V54 è una web app statica: le modifiche agli orari vengono salvate **solo su quel browser/dispositivo**. Per trasferirle puoi esportare e importare il JSON. Per aggiornarle per **tutti gli utenti** occorre applicare i nuovi dati alla versione pubblicata, oppure costruire un backend con autenticazione e archivio centralizzato. Non pubblicare dati sensibili nel JSON.

## Verifiche e altre note

- Smoke test in Chromium con DOM, CSS e script caricati in memoria a 320, 390, 768 e 1280 px: nessuna eccezione JavaScript osservata sui percorsi testati. Si tratta di un collaudo parziale, non di una certificazione di ogni funzione.
- Il browser di test dell'ambiente impediva l'apertura diretta della pagina via localhost; i controlli sono stati eseguiti in Chromium con l'HTML, CSS e JavaScript reali caricati in un documento di test, più verifiche statiche di percorsi e risorse. Non equivalgono a un collaudo HTTPS o su dispositivi fisici.
- I percorsi del navigatore sono indicativi e **non** sostituiscono segnaletica e vie di evacuazione.
- Documentazione di rilascio: `README_V54.md` e `VERIFICHE_V54.md`. I documenti V51 e precedenti sono conservati come storico.
