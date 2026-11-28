# AulaFinder V56 corretta

Questo pacchetto sostituisce **AulaFinderV56.zip** senza cambiare il numero di versione.

Comprende il tutorial V56 (senza giorno/ora nella tappa Disponibilità; frecce dei sottopassaggi e pulsante attivo evidenziato), il gradiente statico dell'header e la linea del Navigatore magenta in chiaro/gialla in scuro. Il file `navigator.js` e la geometria dei percorsi sono identici alla V56 precedente.

La correzione effettiva riguarda i bordi gialli di focus nella ricerca: una vecchia regola CSS superava l'override V56. Ora il focus da tastiera rimane visibile come sottolineatura discreta.

## GitHub Desktop

Nel repository già collegato, apri **Repository → Show in Explorer** e copia **il contenuto** della cartella `AulaFinderV56` estratta qui sopra i file del sito esistenti. Non spostare né eliminare `.git`. In GitHub Desktop usa **Commit to main → Push origin**. Controlla che il deployment Pages finisca con successo; poi riapri la pagina in incognito, per escludere cache vecchie.

Vedi `VERIFICHE_V56_CORRETTA.md` per i controlli realmente eseguiti e i limiti.
