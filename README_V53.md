# AulaFinder V53 · Essenziale e accessibile

**Data:** 22 novembre 2026  
**Base:** AulaFinder V52 RIFATTA, con i dati e le risorse originali.  
**Tipo di rilascio:** sito statico HTML/CSS/JavaScript, pubblicabile su GitHub Pages senza build, pacchetti NPM o workflow personalizzati.

## Modifiche

- **Design essenziale.** Ridotti gradienti, riflessi, ombre, illuminazioni che seguivano il puntatore, anelli e animazioni superflue; tipografia e colori conservano un contrasto più riconoscibile nei due temi. Il footer e le scorciatoie usano tinte piene.
- **Barre di ricerca.** Eliminate cornici gialle e aloni multipli; il focus da tastiera rimane visibile con un singolo contorno ad alto contrasto per accessibilità.
- **Mobile.** Pulsante del tema affiancato a Home; testati viewport da 320, 390, 768 e 1280 pixel senza overflow orizzontale nel test Chromium sintetico.
- **Home.** Aule libere e Professori liberi diventano pulsanti più sottili, con nome e informazioni su una sola riga quando lo spazio lo permette; i valori vengono ancora calcolati dagli orari locali.
- **Navigatore.** Il percorso è cercato nel poligono del corridoio effettivamente rappresentato in SVG, con spostamenti ortogonali (orizzontali e verticali), costo aggiuntivo per le svolte e raccordi dalla stanza al corridoio. Il percorso e il pin arrivano al centro dell'aula, compresa la stanza irregolare 2.14. Nessun gradiente sul percorso. Non viene dichiarata una certificazione topografica della rete di passaggi, delle porte o dell'accessibilità fisica: resta una **guida schematica**.
- **Piantine.** Dopo la selezione di un locale, `Portami qui` e `Vedi orario` appaiono nella testata del piano, vicino al nome.
- **Orari.** La sottosezione attiva è la sola evidenziata; le altre sono neutre, in entrambe le modalità di colore.
- **Tutorial.** La demo reale è mostrata in proporzione, con adattamento proporzionale del frame; nella tappa Orari non si può aprire Disponibilità e viceversa. Il pulsante Professori liberi è lo stesso del sito reale, non un duplicato costruito per il tutorial.
- **Archivio.** Aggiunta V53 e l'anteprima della sua Home, con 53 voci totali.
- **PWA.** Cache offline aggiornata a V53; immagini originali conservate, senza conversioni WebP o compressioni aggressive dei video della V52 rifatta.

## Come pubblicare

1. Estrai `AulaFinderV53.zip`.
2. Apri la cartella `AulaFinderV53` **e copia il contenuto**, non l'intera cartella dentro il repository.
3. In GitHub Desktop apri la copia del tuo repository tramite **Repository → Show in Explorer**. Sostituisci i file del sito, ma **non eliminare la cartella `.git`**. Rimuovi solo gli eventuali workflow ZIP precedenti (`.github/workflows/pubblica.yml`) se ancora presenti: per questa release non servono.
4. Torna in GitHub Desktop, scrivi `AulaFinder V53 - Design essenziale e navigatore corretto` in Summary, clicca **Commit to main** e **Push origin**.
5. In GitHub **Settings → Pages**, imposta **Deploy from a branch**, **main**, **/(root)**. Verifica la pubblicazione nella scheda **Actions**.
6. Controlla il sito in una nuova finestra in incognito, poi prova Home, Orari, Piantine, Navigatore, Finder, Versioni e tutorial su PC e telefono.

**Indirizzo previsto dal metadata di questa versione:** `https://aulafinder.github.io/V53/`. I collegamenti tra file dell'app sono relativi e funzionano anche se scegli di aggiornare il vecchio repository `V52`; in tal caso i metadata SEO (URL canonico, sitemap, Open Graph) andrebbero aggiornati all'indirizzo effettivo.

## Vincoli e sicurezza

- I dati degli orari restano quelli locali dell'app, non sono un aggiornamento dal registro in tempo reale.
- La console Admin della V51/V52 continua a operare sui dati **locali del browser**, non su un backend condiviso; la password dimostrativa non costituisce autenticazione sicura.
- Il navigatore è **schematico e non utilizzabile per emergenze o evacuazioni**. Nessuna verifica fisica in edificio di porte, barriere o percorsi accessibili.
- Il frame del tutorial deve essere testato anche su GitHub Pages via HTTPS: i browser possono imporre restrizioni diverse da quelle del test in memoria.
- Le immagini e i video originali non sono stati sostituiti né ricompressi; l'unica nuova miniatura `V53.webp` documenta questo rilascio.
