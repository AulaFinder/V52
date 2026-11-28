# Verifiche AulaFinder V60

## Risultati positivi
- JavaScript: analisi sintattica di tutti gli script .js del pacchetto.
- Finder su viewport 1280, 390, 320: apertura, presenza di «Svuota chat», azzeramento della conversazione, assenza del pulsante di fissaggio e posizione dello sportello compatibile con il viewport.
- Finder: con Giorno=Lunedì, «Cosa devo mettere nello zaino domani?» rimanda alle materie di Martedì; con Giorno=Venerdì comunica che Sabato non sono previste lezioni.
- Versioni: archivio include V60; una sola scheda aperta per volta nel test desktop.
- Piantine su 1280 e 390: selezione P.03, popup di azioni visibile, apertura fullscreen, selezione P.03 conservata e impossibilità di selezionare altre aule nel fullscreen.
- Tutorial nel test Chromium in memoria: navigazione dalla Home agli Orari e alla tappa Finder, apertura del Finder nel passaggio dedicato; nessun errore JavaScript osservato nel percorso provato.
- Layout: sui viewport 320, 390, 1280 non è stato osservato scorrimento orizzontale nei percorsi eseguiti.
- File multimediali V59 conservati senza riconversione o ricompressione; aggiunta soltanto l'anteprima V60 PNG.
- Archivio ZIP e riferimenti statici HTML controllati.

## Limiti e verifiche manuali consigliate
- Il test in Chromium usa risorse caricate in memoria, a causa delle restrizioni dell'ambiente sui server locali. Per la consegna verificare il caricamento reale su HTTPS/GitHub Pages, cache e video.
- Il tutorial completo, la ricerca con microfono e le interazioni touch non sono stati collaudati su telefoni fisici.
- Il fullscreen della piantina mantiene l'aula già selezionata ma non permette di selezionare altre aule: comportamento richiesto per V60.
- I percorsi del Navigatore non sono stati modificati in questa versione e non è stata svolta una nuova ispezione fisica delle porte.
- L'Admin resta locale al dispositivo, non è un servizio sincronizzato o un'autenticazione server.
