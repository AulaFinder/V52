# AulaFinder V55 - Tutorial a ritaglio fedele

## Base e compatibilità
Partenza: AulaFinder V54. Tutte le sezioni, i dati scolastici, le piantine, Finder, l'Admin e gli asset originali rimangono presenti.

## Modifiche
- **Nessun ridimensionamento arbitrario:** tolto il precedente modulo di zoom automatico V54 dalla pagina; la demo usa un iframe responsive a larghezza naturale e una finestra di ritaglio.
- **Inquadratura:** ogni tappa richiama la sezione reale e scorre alla funzione richiesta, lasciando il testo alla sua dimensione normale.
- **Istruzioni interattive:** i controlli sono evidenziati in sequenza. Su Finder: orb → barra della domanda → invio. Il segnale si sposta in seguito all'interazione; non compila nulla da solo.
- **Footer a molla:** si può scorrere, poi dopo circa 1,1 s di pausa la finestra ritorna in circa 1,15 s alla zona footer; rispetta la preferenza di movimento ridotto.
- **Accessibilità:** testi di istruzione comunicati alla barra esterna; controlli da tastiera, rifocalizzazione manuale, focus distinguibile.
- **Versioni:** V55 presente come attuale, Home di V55 identica alla V54 (modifica solo al tutorial).

## Pubblicazione
Estrarre la cartella `AulaFinderV55` nello stesso repository GitHub Desktop esistente, **conservando `.git`**. `index.html` deve essere nella radice del repository. Eseguire Commit e Push; per GitHub Pages usare `Deploy from a branch`, `main`, `/(root)`.

## Limiti
Collaudo effettuato su Chromium con HTML/JS caricati in memoria per limiti di navigazione verso localhost. La prova di integrazione HTTP/HTTPS pubblicata resta da effettuare, così come la verifica su dispositivi fisici e lettori di schermo.
