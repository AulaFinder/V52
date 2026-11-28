# AulaFinder V59 — Revisione mirata

**Base:** AulaFinder V58. **Destinazione:** GitHub Pages, repository già in uso.

## Principali interventi

- **Header e ricerca:** eliminati i contorni arancioni dopo la chiusura del logo ingrandito e il secondo contorno sul campo di ricerca vuoto; hover con leggero ingrandimento e illuminazione sincronizzata.
- **Footer e creatori:** contenitore esterno riportato allo stile neutro; gradiente interno ai cerchi dei ritratti originali; bordi SVG animati lungo la circonferenza e didascalie stabilizzate; icona Admin visibile con contrasto maggiore.
- **Navigatore:** collegamento ortogonale al centro della Palestra, incluso P.03 e T.08; preservati grafi e dati delle piantine.
- **Finder:** fissaggio relativo alla sezione corrente, senza salti durante lo scorrimento o le interazioni; posizionamento proporzionale passando a un'altra sezione; domande generiche utili, suggerimenti ciclici e lista opzionale. Indicazione sulla cartelletta di Disegno limitata alle classi pertinenti.
- **Tutorial:** utilizzo dei componenti autentici del sito, con isolamento per tappa; Finder visibile soltanto nel proprio passaggio e insieme alla Home originale; nell'ultimo passaggio vengono presentati logo nell'header, tema, Preferiti e Cronologia. Rimossa la domanda sui contatti duplicata.
- **Admin:** lucchetto più visibile su PC e mobile, conferma positiva verde animata; limite locale di cinque tentativi errati con blocco temporaneo di cinque minuti, senza durata esplicitata all'utente; messaggi di errore più accessibili e stato vuoto non visualizzato.
- **Temi e menu:** modalità iniziale secondo il sistema operativo, salva la scelta manuale; colori coerenti per Preferiti/Cronologia e selezione Orari durante l'espansione; più margine interno per le frecce dei menu.
- **Versioni:** V59 registrata con screenshot della vera Home; anteprime precedenti conservate senza aggiunte arbitrarie. Informazioni sullo storico aggiornate.

## Cosa non è stato modificato

Dati scolastici, immagine del logo, ritratti originali, video, piantine SVG e anteprime storiche non sono stati ricompressi o convertiti. L'algoritmo generale dei corridoi è preservato salvo il raccordo ortogonale della Palestra.

## Pubblicazione su GitHub Pages

Estrarre l'archivio e copiare **il contenuto** della cartella `AulaFinderV59` nella radice del repository locale, senza cancellare `.git`. Con GitHub Desktop eseguire **Commit to main** e **Push origin**. Pubblicazione Pages: `Deploy from a branch`, `main`, `/(root)`. Controllare il deployment in Actions e aprire il sito in incognito, lasciando a GitHub il tempo necessario al completamento della pubblicazione.

## Limiti tecnici importanti

- L'Admin utilizza solo dati nel browser: **non è autenticazione server sicura** e le modifiche non vengono sincronizzate con tutti i visitatori. Il limite dei tentativi è soltanto locale e può essere aggirato da chi controlla il browser.
- Gli orari sono dati predefiniti e non ricevono automaticamente aggiornamenti in tempo reale.
- I percorsi sono schematici, non un rilievo delle porte, delle barriere o delle uscite di emergenza.
- Le prove automatizzate sono state eseguite su un documento con asset incorporati in Chromium, poiché l'ambiente di test non permette di aprire il server locale e GitHub Pages. I media originali non sono stati ricompressi.

Consultare `VERIFICHE_V59.md` e `PROMPT_AULAFINDER_V1-V59_FORMALI.docx`.
