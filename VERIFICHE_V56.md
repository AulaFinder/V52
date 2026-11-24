# Verifiche AulaFinder V56 (24 novembre 2026)

## Base
Aggiornamento mirato della V55. I file multimediali precedenti e la logica del Navigatore sono mantenuti invariati.

## Controlli statici
- 25 file JavaScript: `node --check` superato su tutti.
- 52 riferimenti ai file locali presenti nell'HTML: nessuna risorsa mancante.
- 20 file richiesti dal nucleo PWA/service worker: tutti presenti.
- Cronologia: 56 versioni consecutive, V56 ultima e corrente, immagini di anteprima presenti per tutte.
- 92 risorse multimediali già presenti nella V55 confrontate byte per byte e identiche; nuova sola anteprima V56.
- Il file `navigator.js` è byte per byte identico alla V55 (SHA256 a8fa63f502ad214c…); modificato esclusivamente il colore CSS del percorso/legenda.
- Cache PWA aggiornata a V56, riferimenti CSS/JS aggiornati a `v56-1` per evitare vecchi asset.

## Test funzionali in Chromium (HTML, script e CSS caricati in memoria)
- Viewport: 320×680, 390×844, 768×850, 1280×800, senza scorrimento orizzontale del documento.
- Tutte e sette le tappe tutorial: target selezionato e istruzione aggiornata, senza errori JavaScript rilevati.
- Frecce sottopassaggi: funzionanti nei test; Disponibilità richiede Aule libere → Professori liberi, nessuna scelta di giorno o ora.
- Finder: apertura e passaggio all'indicazione del campo domanda verificati con click nei test mobile; il collaudo desktop a livello di click del test automatico è stato limitato dal viewport dell'iframe fuori dalla porzione visibile, non da un errore JS.
- Test navigatore: 1.01 → 1.07, percorso restituito; colore linea chiaro `#b4235a`, scuro `#ffda55`.
- Campo di ricerca Navigatore da tastiera: focus tramite sottolineatura, senza contorno.
- Gradiente header: `linear-gradient` verificato.
- Versioni: V56 visualizzata come versione attuale.

## Limiti
L'ambiente Chromium non permette la navigazione HTTP verso `127.0.0.1` (`ERR_BLOCKED_BY_ADMINISTRATOR`), quindi i test interattivi sono stati eseguiti con sorgenti caricate direttamente in memoria. Non costituiscono test di integrazione end-to-end su GitHub Pages, né verifica con smartphone fisico o lettori di schermo. Pubblicare via GitHub Desktop e ricontrollare sul sito online dopo il deploy.
