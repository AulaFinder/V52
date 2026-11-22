# AulaFinder V53 · Verifiche e limiti

**Data:** 22 novembre 2026.

## Effettuate

1. Sintassi di **22 file JS** mediante `node --check`: nessuna segnalazione.
2. Browser Chromium con l'HTML, i CSS e i JavaScript reali caricati in una pagina di collaudo in memoria, modalità `prefers-reduced-motion: reduce`, tema chiaro e scuro, viewport **320, 390, 768, 1280 px**: nessuna eccezione JavaScript e **nessun overflow orizzontale** nei quattro casi.
3. Home: tasto del tema sullo stesso rigo e adiacente a Home su schermi da 320 e 390 px, scorciatoie dei liberi compatte, tastiera con contorno di focus singolo e non giallo.
4. Navigatore: tracciati visualizzati su piano terra, seminterrato, 1°, 2° e collegamenti tra piani; percorso composto da segmenti ortogonali. Controllati con campionamento dei poligoni SVG 14 casi; piccoli tratti di raccordo aula/corridoio possono attraversare lo spessore schematico delle pareti (il disegno non definisce porte).
5. **Allineamento reale del pin.** Misura con `getScreenCTM` delle coordinate della punta del puntatore rosso e del centro SVG della stanza 1.07 e 2.14: errore di posizionamento inferiore a **0,001 px** nel Chromium di prova, dopo la correzione dell'`transform-origin` ereditato.
6. Piantine: selezionando l'aula 1.07, entrambe le azioni (naviga e orario) compaiono dentro `.plan-banner`.
7. Versioni: **53 voci**, con V53 presente e anteprima locale.
8. Integrità delle risorse principali e degli URL relativi verificata nel pacchetto prima della compressione; PWA aggiornata a V53.

## Limiti dei controlli

- Il browser di test non ha potuto aprire il sito pubblicato o il server locale; il test Chromium è stato eseguito **in memoria**, e alcuni URI immagine sono stati sostituiti temporaneamente con `data:` URI unicamente per le schermate di verifica, senza modificare i file che riceve l'utente.
- Non sono stati collaudati la pubblicazione reale GitHub Pages, i dispositivi fisici, il riconoscimento vocale o tutte le modalità assistive. Il controllo di accessibilità è un controllo tecnico **parziale**, non una certificazione WCAG.
- I percorsi sono ottenuti dallo schema geometrico del sito; non garantiscono che tutte le porte del percorso siano percorribili nella realtà.
- I file media originali sono conservati per scelta esplicita, quindi non è stata perseguita una riduzione aggressiva della dimensione dello ZIP.
