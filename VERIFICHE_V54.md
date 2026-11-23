# Verifiche AulaFinder V54 (23 novembre 2026)

## Controlli svolti

- Versione e badge: la testata mostra **V54**, la prima scheda **Versione attuale**, la seconda **Rilascio precedente**, le successive **Archivio storico**.
- Quattro layout testati in Chromium in memoria: **320×740, 390×844, 768×1024, 1280×900**. Nessuna barra dei 7 passi presenta overflow di testo o scorrimento orizzontale eccessivo della pagina.
- Tutorial nel browser in memoria con pagina originale incorporata in `srcdoc`: gli step Home, Orari, Disponibilità, Finder e Piantine selezionano le sezioni previste e aggiornano il ritaglio ingrandito.
- Piantine fullscreen: selezione della stanza S.01 e comparsa del nome e dei pulsanti in testata su tutte le 4 risoluzioni; eventi touch a due puntatori simulati portano il valore di zoom da 100% a 220%.
- Nessuna eccezione JavaScript osservata negli smoke test eseguiti.
- Anteprima V54 salvata come screenshot reale della Home in Chromium, usando le immagini PNG originali per il test.

## Limiti

- L'ambiente Chromium blocca richieste http://localhost e file://: le prove sono state condotte caricando l'HTML, i CSS e i JS originali **in memoria**; il tutorial è stato provato in un iframe `srcdoc` equivalente. Non è un collaudo integrale su GitHub Pages.
- I due tocchi sono **eventi PointerEvent simulati**, non un test con dita su smartphone fisico.
- Verificare il comportamento del fullscreen nativo su Safari iOS/Android e la PWA aggiornata dopo la pubblicazione.
- Controllare l'accessibilità con screen reader reali e verificare che la selezione aule corrisponda alle piantine fisiche.
