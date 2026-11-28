# AulaFinder V59 — Rapporto delle verifiche

Data: 28 novembre 2026. Base: AulaFinder V58.

## Controlli positivi

- **Sintassi JavaScript:** verificata con `node --check` per tutti i file `.js` della distribuzione.
- **Integrità dei file:** ogni percorso locale indicato da HTML (`src`, `href`) è stato confrontato con i file presenti, escludendo URL esterni, riferimenti dinamici e ancore.
- **Navigatori:** **65 destinazioni uniche; 4.160 itinerari direzionali** sottoposti a test del rendering con partenza e arrivo differenti. In tutti i casi sono stati generati percorsi SVG senza segmenti diagonali rilevati oltre la tolleranza di 1,3 unità. Nessuna eccezione JavaScript osservata nei test. Sono stati controllati visivamente i casi P.03 → Palestra e relativi raccordi. La validità fisica delle porte e il centro geometrico di ogni corridoio non sono certificabili tramite questi test.
- **Responsive:** verificati i viewport 320, 390, 768 e 1280 px senza scorrimento orizzontale nella Home, e senza eccezioni JS osservate nei test delle sezioni principali.
- **Logo e ricerca:** verificati al browser stili senza outline arancione sul logo e senza secondo contorno interno durante una ricerca vuota.
- **Finder:** controllo manuale del fissaggio sulla stessa sezione, cambio pagina e scorrimento con coordinate assolute stabili; nessuno spostamento progressivo osservato.
- **Footer:** verificati i ritratti, il gradiente soltanto interno ai cerchi e il bordo animato; nessun cambiamento ai file degli avatar originali.
- **Admin:** verificata la visualizzazione del login su viewport desktop e mobile; pannello di stato vuoto nascosto e testo di errore comprensibile in caso di storage non disponibile.
- **Limite tentativi Admin:** cinque credenziali errate simulate con memoria del browser sostituita da un archivio di test; ai primi quattro tentativi viene mostrato «Accesso negato», al quinto «Accesso temporaneamente bloccato», con campo disabilitato e scadenza salvata. Resta necessario il test dell’accesso reale su HTTPS.
- **Documentazione:** prompt V59 integrato in Word/TXT, DOCX renderizzato e controllato visualmente su 12 pagine.
- **Archivio:** struttura e CRC ZIP verificati.

## Da ricontrollare dopo la pubblicazione

1. Tutorial completo dentro l'iframe su GitHub Pages, con ogni tappa, focus e possibilità di tornare indietro.
2. Spostamento di Finder e fissaggio su telefoni fisici, anche dopo più cambi di sezione e cambi d'orientamento.
3. Test dell'accesso Admin su HTTPS con 5 codici errati, blocco e successivo ripristino; il contatore è locale, non server.
4. Gesti touch, apertura dell'anteprima Versioni e controllo della cache con un vero dispositivo.
5. Palestra e scale confrontati con la planimetria reale (non usare il percorso per evacuazione o orientamento di emergenza).

**Nota:** l'assenza di errori nei test locali non equivale a una garanzia di assenza di bug nell'ambiente pubblicato.
