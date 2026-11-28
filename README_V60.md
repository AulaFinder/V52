# AulaFinder V60 — guida alla pubblicazione

Questa versione deriva dalla V59, mantenendo dati degli orari, piantine e risorse originali.

## Principali interventi richiesti
- Finder con posizione fissa e stabile, senza comando «Fissa» e con «Svuota chat».
- Corretto il calcolo del giorno successivo rispetto alla selezione Giorno sul sito; il sabato non vengono suggerite lezioni.
- Orbita del titolo AulaFinder riposizionata; presentazione più sobria degli avatar dei creatori.
- Piantine: azioni non ritagliate vicino ai bordi, fullscreen unico e non selezionabile, conservazione dell'aula già selezionata; etichette «Piantine», «Tutte» e «Nessuna».
- Versioni: apertura esclusiva delle schede, maggiore contrasto delle etichette, aggiunta V60 e relativa anteprima.
- Tutorial: rimosso l'avanzamento anticipato durante la digitazione; il passaggio completo fa avanzare automaticamente alla tappa successiva. Eliminato «Inizia dalla ricerca»; Finder appare soltanto nella sua tappa, senza puntina.

## Pubblicazione tramite GitHub Desktop
Estrarre lo ZIP; aprire la cartella locale del repository da GitHub Desktop; sostituire i file del sito con quelli contenuti in `AulaFinderV60`, conservando la cartella nascosta `.git`. Verificare che `index.html` sia direttamente nella radice del repository. Eseguire `Commit to main` e `Push origin`. In GitHub Pages usare `Deploy from a branch`, `main`, `/(root)`.

## Collaudo e limiti
Consultare `VERIFICHE_V60.md`. I test sono stati eseguiti in Chromium con le risorse del sito caricate in memoria. Non equivalgono a una prova su GitHub Pages né su telefoni fisici. Le modifiche dell'Admin, come nelle versioni precedenti, hanno effetto solo nel browser locale e non sono una sincronizzazione fra utenti.

## Documentazione scolastica
`PROMPT_AULAFINDER_V1-V60_FORMALI.docx` e `.txt` sono la raccolta delle richieste progettuali formulate, non un elenco di funzionalità certificate come completate.
