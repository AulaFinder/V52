# AulaFinder V54 - Rilascio mirato

Base: **AulaFinder V53**. Non sono stati modificati i dati didattici, i percorsi del navigatore, il Finder o il design della Home.

## Correzioni

1. **Tutorial / riquadri:** 7 schede automatiche adattive con etichette leggibili anche da 320 px; schede accessibili da tastiera.
2. **Tutorial / zoom contestuale:** il sito reale rimane incorporato nell'iframe; la vista ingrandisce e centra la porzione relativa alla tappa (con ingrandimento superiore nel passaggio Finder). Disponibili i comandi `−`, `+` e `Adatta`. La demo mantiene i limiti di navigazione della V53. Non sono alterati i dati dell'iframe.
3. **Versioni:** il calcolo automatico dei badge mostra V54 come attuale, V53 come precedente, V52 e i rilasci più vecchi nell'archivio. Aggiunti dati e anteprima V54.
4. **Piantine fullscreen:** trascinamento con un dito e zoom a due dita oltre ai pulsanti; quando è selezionata un'aula navigabile compaiono nome e `Portami qui`; se è presente un orario anche `Vedi orario`. La mappa conserva SVG e coordinate originali. Le stanze sono selezionabili anche con Enter/Spazio.

## Pubblicazione nell'attuale repository

1. Estrai lo ZIP e **apri la cartella `AulaFinderV54`**.
2. Tramite GitHub Desktop, apri la cartella locale del repository che stai già usando (`V52`, se è ancora quello): **Repository → Show in Explorer**.
3. Sostituisci il contenuto del sito con quello di `AulaFinderV54`, **senza rimuovere `.git`**.
4. Su GitHub Desktop: `Commit to main` e poi `Push origin`. GitHub Pages deve essere configurato su `main` → `/(root)`.
5. Prova le novità su un browser mobile e sul sito HTTPS dopo che Actions termina con successo.

Non serve un nuovo workflow YAML né comprimere o convertire file multimediali.
