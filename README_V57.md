# AulaFinder V57 · aggiornamento sulla V56 corretta

Questa versione parte da **AulaFinderV56_CORRETTA.zip**, conserva i dati scolastici e tutti i media originali del pacchetto di partenza e aggiunge soltanto un'anteprima PNG della V57.

## Principali novità

- **Interfaccia:** nessun riquadro di focus arancione fuori dal tutorial, niente linea ciano sotto i campi, switch del tema allineato, stesso ritmo di animazione del marchio in header e footer, logo dell'header con piccolo ingrandimento, profili e risultati con superfici più contrastate.
- **Tutorial:** otto tappe (Ricerca, Orari, Disponibilità, Navigatore, Finder, Piantine, Versioni, Altre funzioni), istruzioni per sottopassaggi, evidenziazione coerente, ricerca con esempio di sigla, ritorno Home, sezioni separate per Classi/Aule/Professori e Aule libere/Professori liberi, accessi limitati nella demo, preferiti e cronologia non mostrati. L'avanzamento ricolloca la guida nella posizione corretta.
- **Piantine e Navigatore:** testata delle azioni delle aule più ordinata, selezione visibile in fullscreen, percorso giallo più leggibile e raccordo palestra semplificato, frecce di navigazione centrate. **La mappa non certifica l'accessibilità fisica o l'esistenza delle porte.**
- **Finder:** suggerimenti ciclici più vari, riconoscimento di altre richieste locali, apertura a schermo intero con transizione FLIP, orb fissabile in un punto del documento (quindi non segue lo scrolling), finestra trascinabile anche nella guida.
- **Versioni:** V57 attuale, schermata V57 reale, anteprime senza frasi tecniche e badge invadenti, nuovo stile comandi. Per versioni storiche prive di screenshot scuro autentico si offre un **filtro dimostrativo esplicitamente etichettato**, non una falsa ricostruzione storica.
- **Admin:** pulsante con lucchetto, accesso visualmente riservato e più pulito, niente tastiera virtuale, feedback e controllo mostra/nascondi password, editor locale già esistente con ricalcolo dati e validazione conflitti.

## Avvertenze di sicurezza importanti

Il sito gira su GitHub Pages senza backend. Non è possibile nascondere realmente una password dentro HTML o JavaScript pubblici: il controllo della V57 confronta un digest SHA-256 con sale per evitare di stampare la password in chiaro, **ma non costituisce autenticazione sicura** e non protegge da chi modifica il browser. Non inserire dati personali o credenziali reali nell'Admin.

Le modifiche Admin sono applicate **al browser corrente** e richiedono un aggiornamento della pagina per ricostruire tutte le schermate. **Non vengono distribuite in tempo reale agli altri utenti**: per la modifica centralizzata servono server/database, autenticazione e autorizzazioni server-side. Finder è un assistente **locale basato sui dati e su regole**, non un servizio AI generativo collegato a un modello esterno. Le risposte sono limitate ai dati disponibili.

## Pubblicazione su GitHub Desktop (repository già esistente)

1. Estrai questo ZIP.
2. In GitHub Desktop seleziona il repository esistente e apri **Repository → Show in Explorer**.
3. Sostituisci i file del sito nella cartella locale con **il contenuto** di `AulaFinderV57/`, conservando la cartella nascosta `.git`.
4. Fai **Commit to main → Push origin**, ad esempio con il messaggio `AulaFinder V57 - Tutorial, Finder e interfaccia`.
5. Mantieni **Settings → Pages → Deploy from a branch → main → /(root)**. Non aggiungere workflow ZIP.
6. Verifica la nuova versione in una scheda in incognito, controlla il caricamento del logo e delle immagini, Finder, tutorial, Orari, Navigatore, mappe e Admin locale.

Conserva un backup della V56 finché non hai completato il test su GitHub Pages e su un telefono vero.

## Verifiche

Vedi `VERIFICHE_V57.md` per i controlli superati, i limiti e i punti di regressione da testare prima della consegna.
