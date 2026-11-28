# AulaFinder V58 – Registro verifiche

Data: 28 novembre 2026.

## Controlli superati

- **28 file JavaScript** verificati tramite `node --check`: nessun errore di sintassi.
- **48 riferimenti HTML** a file locali analizzati: nessuna risorsa mancante.
- **95 file multimediali** presenti; 94 già esistenti nella V57 conservati esattamente (confronto dei byte), oltre alla nuova anteprima V58.
- Immagini PNG, JPEG e WebP analizzate tramite parser immagini: nessuna immagine non valida rilevata.
- File JSON interpretati correttamente e pacchetto ZIP sottoposto a controllo di integrità.
- Browser Chromium con codice e media caricati in memoria: Home inizializzata su schermi larghi e stretti, senza eccezioni JavaScript nei test eseguiti.
- Su **320, 390, 768 px**: test end-to-end delle seguenti interazioni, senza errori JavaScript osservati: cambio tema, assenza di sovrapposizione tema/ora, navigazione Versioni, riquadro V58 cliccabile, assenza dei controlli di anteprima scura, selezione di T.08, azioni contestuali, apertura fullscreen e conservazione della selezione, Finder apribile, pin senza spostamento, max e ripristino.
- Su **1280 px**: test separati delle funzioni principali, incluso Finder, Versioni, T.08 in fullscreen e percorso Palestra → T.08.
- Ingrandimento e ritorno di Finder: pannello sempre visibile, senza transizioni verso coordinate fuori dal viewport dopo la correzione della precedente animazione FLIP.
- Navigatore: verifica visiva di Palestra → T.08 e T.08 → Palestra e percorso 1.01 → 1.07. La linea arriva al centro della Palestra anche visivamente: il raccordo sopra il riempimento non viene più nascosto.
- Finder: corretto il riconoscimento di «Quali aule sono libere?» e «Quanti professori sono liberi?», con risposta basata sui dati dell'ora selezionata e nota non-real-time.
- Registro dei requisiti DOCX renderizzato e ispezionato come documento di 15 pagine, senza evidenze di testo tagliato nel controllo visivo.

## Controlli rimasti parziali o da eseguire

- **Tutorial completo in iframe su GitHub Pages**: interazioni reali di tutte le otto tappe e navigazione guidata in locale non convalidate integralmente; serve prova pubblicata.
- **Touch fisico e accessibilità**: pinch-to-zoom e test con screen reader reali non eseguiti. Verifiche delle tecnologie assistive e contrasto WCAG non certificate.
- **Conformità degli orari**: non confrontata singolarmente ogni lezione con una fonte ufficiale aggiornata; le risposte di Finder dipendono dai dati predefiniti.
- **Geometria reale dei corridoi**: i test controllano le piantine schematiche; non confermano che ogni raccordo o porta sia percorribile sul posto.
- **GitHub Pages**: impossibile confermare da questo ambiente il caricamento dell'intero sito pubblicato e il comportamento del service worker sul dominio pubblico.
- **Admin**: accesso locale e salvataggio sul dispositivo, non modifica condivisa in tempo reale; non esiste autenticazione sicura lato server.
- **Archivio storico**: i file di anteprima preesistenti non sono stati alterati né sono stati verificati singolarmente contro tutti i pacchetti storici.

## Priorità per collaudo prima della presentazione

1. Caricare il pacchetto su GitHub Pages e verificare tutte le risorse e i video.
2. Eseguire le **otto tappe del tutorial** su smartphone e PC, verificando posizione, focus e possibilità di tornare indietro.
3. Aprire Finder, fissarlo, cambiare pagina, massimizzarlo e ridurlo.
4. Verificare Palestra ↔ T.08 e i percorsi tra piani rispetto alla planimetria reale.
5. Selezionare un'aula su Piantine, aprire fullscreen e confrontare colori, azioni e zoom su telefono fisico.
6. Aprire Versioni e l'anteprima V58, quindi provare una versione precedente.
7. Provare Admin sapendo che il salvataggio è locale e non sincronizzato.

Le verifiche sopra riportate valgono soltanto per i casi descritti: non attestano l'assenza assoluta di bug o la conformità completa a standard di accessibilità.
