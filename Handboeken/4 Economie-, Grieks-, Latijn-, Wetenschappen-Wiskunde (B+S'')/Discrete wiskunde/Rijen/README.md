# Rijen

Handboek Rijen voor pakket 4 (LPD 44-46). **Overgezet uit de eerdere werkrepo, in de oude opmaak.** Het is nog niet omgezet naar de gedeelde opmaak in `Opmaak/` en heeft nog geen oefeningenbank (`oefeningen/*.yaml`): de oefeningen staan nog in de hoofdstukken zelf. Zie `Analyse/Integralen/` voor hoe het moet.

| Hoofdstuk | Bestand | Status |
|---|---|---|
| 1. Rijen: begrippen | `hoofdstukken/01-rijen-begrippen.tex` | eerste versie, nog na te lezen |
| 2. Rekenkundige en meetkundige rijen | `hoofdstukken/02-rekenkundige-en-meetkundige-rijen.tex` | eerste versie, nog na te lezen |
| 3. Somformules | `hoofdstukken/03-somformules.tex` | eerste versie, nog na te lezen |
| 4. Limiet van een rij | `hoofdstukken/04-limiet-van-een-rij.tex` | eerste versie, nog na te lezen |

## Nog te doen

- Omzetten naar de gedeelde opmaak (`Opmaak/`) en een oefeningenbank maken. Verwijder dan `opmaak-v2.tex` en `maak-pdf.py` uit deze map.
- Per oefening nagaan waar ze vandaan komt en dat in het veld `bron` vastleggen.
- Nalezen door andere leerkrachten.

## Bouwen (oude werkwijze)

Vanuit deze map, in PowerShell:

```
py -3.13 -P maak-pdf.py handboek.tex
latexmk -pdf -gg leerkracht.tex
latexmk -pdf -gg zelfstudie.tex
```

De PDF's staan niet in git.
