# AulaFinder V56 - Aggiornamento mirato della V55

## Cosa cambia
- **Tutorial:** frecce precedente/successivo per i sottopassaggi, contatore, istruzione più leggibile e una maschera di oscuramento leggero che lascia scoperto il controllo da cliccare; per la tappa Orari / Disponibilità non occorre selezionare giorno o ora.
- **Ricerca:** nessuna cornice colorata sui campi; resta una sottolineatura di focus per la navigazione da tastiera.
- **Navigatore:** modificati solo i colori CSS del percorso e della relativa legenda; il codice delle rotte `navigator.js` non è stato modificato.
- **Header:** torna il gradiente statico della V52, senza gli effetti di luce dinamici.
- **Versioni:** cronologia aggiornata a V56, file dati allineato.

## Cosa resta uguale
Tutte le altre parti della V55, inclusi disegni e geometrie del Navigatore, fullscreen piantine, Finder, Admin, orari e asset originali.

## Pubblicazione su GitHub Pages
In GitHub Desktop aprire il repository esistente con **Repository → Show in Explorer**, sostituire i file del sito con il contenuto di questa cartella (preservare `.git`), eseguire **Commit to main → Push origin**. Pages: `Deploy from a branch`, `main`, `/(root)`. La cartella `AulaFinderV56` non deve finire come sottocartella del repository.

## Accessibilità
Il velo del tutorial ha `pointer-events:none` e non blocca mouse o tastiera; il ritorno del footer rispetta `prefers-reduced-motion`. Nessuna certificazione formale WCAG è implicata nei test automatici.
