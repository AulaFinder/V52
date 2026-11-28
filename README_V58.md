# AulaFinder V58 – Note di rilascio

**Data:** 28 novembre 2026  
**Base:** AulaFinder V57  
**Pubblicazione:** sito statico GitHub Pages; conservare il repository esistente e pubblicare i file della cartella principale.

## Obiettivi
La V58 interviene su allineamento e comportamento dell'header, accessibilità visiva, Finder, piantine, percorsi, Versioni, sezione creatori, tutorial e schermata Admin. L'obiettivo è ridurre le regressioni rispetto alla V57 senza rielaborare i file multimediali esistenti.

## Principali interventi

1. Cambio tema allineato al gruppo Giorno/Ora su desktop e disposto accanto al tasto Home su mobile.
2. Animazione del marchio stabilizzata, lieve ingrandimento del logo e rimozione dei tooltip nativi sovrapposti ai titoli.
3. Nuovo pittogramma SVG per Admin, contrasto dell'icona di visibilità e pulsante di accesso centrato.
4. Animazione circolare progressiva sui ritratti dei creatori, senza modificare gli avatar, e nuovo sfondo a gradiente.
5. Interfacce di ricerca ripulite da contorni colorati aggiuntivi.
6. Tutorial in otto tappe con isolamento visivo della funzione interessata. Restano da verificare su GitHub Pages tutte le transizioni della demo incorporata.
7. Fissaggio di Finder relativo alla sezione, senza spostamento al clic, e stabilizzazione dell'espansione/riduzione a schermo intero.
8. Domande a comparsa conservate, con elenco completo opzionale; migliorato il riconoscimento delle frasi sulle aule e sui professori liberi.
9. Le azioni della piantina sono spostate vicino all'aula; fullscreen e selezione mantengono lo stesso SVG e le stesse scelte disponibili.
10. Il raccordo della palestra viene tracciato sopra il riempimento del locale affinché sia visibile fino al centro, preservando la geometria dei corridoi esistente.
11. Archivio: scheda corrente cliccabile, animazioni estese ai rilasci precedenti, contatore ridondante e simulazione del tema scuro eliminati. Nuova anteprima V58 derivata da una schermata reale della Home.
12. Documento scolastico dei requisiti, cronologia e piano di verifica in formato DOCX e TXT.

## Documentazione da consegnare

- `DOCUMENTAZIONE_COMPLETA_AULAFINDER_V58.docx`: registro formale di 15 pagine con le specifiche V57/V58, archivio V1–V58, screenshot di riferimento e collaudo.
- `DOCUMENTAZIONE_COMPLETA_AULAFINDER_V58.txt`: versione testuale completa, leggibile e riutilizzabile per l'aggiornamento dei rilasci successivi.
- `VERIFICHE_V58.md`: esiti e limitazioni del controllo tecnico.

## Limiti tecnici importanti

- Gli orari sono dati predefiniti e non sincronizzati in tempo reale con l'istituto.
- Finder è un assistente locale basato su regole, non un modello generativo e non può garantire ogni formulazione di domanda.
- Admin conserva un controllo client-side e modifiche locali: per accesso sicuro e aggiornamenti condivisi serve un backend con autenticazione e archivio centralizzato.
- Percorsi scolastici schematici, da controllare rispetto alle porte fisiche e alle esigenze di accessibilità.
- L'isolamento nel tutorial è realizzato attraverso la selezione delle sezioni e la loro presentazione nel sito incorporato; non costituisce un'applicazione autonoma separata per ogni tappa.

## Pubblicazione tramite GitHub Desktop

1. Estrarre il file ZIP.
2. Aprire il repository già esistente da GitHub Desktop, quindi `Repository → Show in Explorer`.
3. Sostituire il contenuto precedente con il contenuto della cartella `AulaFinderV58`, **mantenendo la cartella nascosta `.git`**.
4. Eseguire il commit `AulaFinder V58 - Revisione interfaccia e documentazione` e `Push origin`.
5. Controllare l'ultima esecuzione su GitHub → Actions e aggiornare la pagina tramite finestra in incognito, per ridurre possibili interferenze della cache.
