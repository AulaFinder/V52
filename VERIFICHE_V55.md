# Verifiche AulaFinder V55

- Tutti i JavaScript del pacchetto: controllo sintattico con `node --check`.
- Tutti i file richiamati direttamente dai tag HTML `src/href`: controllo di presenza nello ZIP.
- Browser Chromium in memoria, larghezze **320, 390, 900 e 1280 px**: sette passi raggiunti, navigazione guidata con focus progressivo, nessuna eccezione JS osservata.
- La larghezza dell'iframe corrisponde alla larghezza visibile della demo: **330 px** su viewport 390 e **584 px** su viewport 900; trasformazione CSS `none`.
- Click sull'orb nel passo Finder (tutte e quattro le larghezze): Finder aperto, evidenziazione passata a `finderQuestion`.
- Footer: scorrimento in alto simulato e ritorno alla posizione iniziale dopo una pausa. Misure su 390 px: 790 → 528 → 790; su 900 px: 723 → 473 → 723.
- Browser HTTP/HTTPS non disponibile in questo ambiente (blocco della navigazione a localhost), pertanto test su GitHub Pages non certificato.
- I ritratti mancanti negli screenshot di test dipendono dall'isolamento in memoria e non da file assenti nel pacchetto.
