# Complexe getallen: handboek

Cursus voor pakket 4 (B+S''), leerplandoelen 38-42, volgens de [ontwerpregels](../../../../Ontwerp/ontwerpregels.md). De opmaak en de bouwscripts zijn gedeeld: zie [Opmaak/README.md](../../../../Opmaak/README.md). Alle opgaven, contexten en figuren zijn eigen werk. De voorkant (Delaunay) komt uit `Ontwerp/voorkanten/`: pas ze daar aan.

| Hoofdstuk | Bestand | Leerplan | Status |
|---|---|---|---|
| 1. Rekenen met complexe getallen | `hoofdstukken/01-rekenen-met-complexe-getallen.tex` | LPD 38, 39 | eerste versie, nog na te lezen |
| 2. Vierkantswortels en vergelijkingen | | LPD 40 | nog te maken |
| 3. De goniometrische vorm | | LPD 41, 42 | nog te maken |
| 4. Machten en wortels | | LPD 42 | nog te maken |

## Maken

Vanuit de hoofdmap van de repo:

```
python Opmaak/maak-pdf.py "4/Algebra/Complexe getallen"                  alles: handboek, oplossingen, leerkracht, zelfstudie
python Opmaak/maak-pdf.py "4/Algebra/Complexe getallen" --hoofdstuk 1    snel: alleen hoofdstuk 1, in snel-h1.pdf
```

Zoals bij Integralen: de grafieken worden bewaard in `figuren-cache/`, LaTeX leest `gen/`, en de oefeningen staan in `oefeningen/*.yaml`. Pas een opgave dus aan in de YAML.

## Afbakening

- **Hoofdstuk 1:** $i$ als oplossing van $x^2 = -1$, zonder wortelteken bij een negatief getal (zoals het leerplan vraagt). Geen ordening op $\mathbb{C}$: uitgelegd met $i > 0$ en $i < 0$, niet bewezen in het algemeen. De rekenregels voor de toegevoegde ($\overline{z + w}$, $\overline{zw}$) komen pas in hoofdstuk 2, waar ze nodig zijn voor de toegevoegde oplossingen.
- **Hoofdstuk 2 (gepland):** vierkantswortels van een negatief reëel getal en van een complex getal in cartesische vorm (wenk bij LPD 39), tweedegraadsvergelijkingen met reële coëfficiënten, toegevoegde oplossingen, som en product.
- **Hoofdstuk 3 en 4 (gepland):** modulus en argument, omzetten, product en quotiënt met hun meetkundige betekenis (draaien en schalen), het verband met de somformules uit de goniometrie, de formule van De Moivre, en de $n$-de machtswortels als regelmatige $n$-hoek.
- **Nog te beslissen:** het argument in radialen of in graden, en welk interval voor de hoofdwaarde. Voorstel: radialen, met de hoofdwaarde in $]-\pi, \pi]$, zoals bij de goniometrische functies van dit pakket.
- **Pakket 3** (B+S') heeft ook een cursus Complexe getallen. Kijk na welke doelen daar gelden voor je deze cursus ervoor kopieert.

## Eigen macro's

- `notatie.tex`: `\C`, `\R`, `\Re`, `\Im` (als Re en Im in plaats van de gotische letters), `\conj{z}` voor de toegevoegde;
- het vlak van Gauss: `\gauss{xmin}{xmax}{ymin}{ymax}` (rooster met de getallen $1, 2, \ldots$ en $i, 2i, \ldots$), `\gaussstap{stap}{...}` (een getal bij elke stap-de lijn) en `\gaussleeg{...}` (zonder getallen); `\cpunt[positie]{x}{y}{label}` voor een punt met label, en de TikZ-stijlen `vector` en `hulplijn`;
- zoals in Integralen: `\naast`, `\figuren`, `metgrafiek`, `stappenbreed` en `stappenvrij`.

## Controle

De uitkomsten van voorbeelden, oefeningen, Koppel en test van hoofdstuk 1 zijn nagerekend met SymPy. Bewijzen en uitlegvragen zijn niet nagerekend. Niet getest: de afdruk op de schoolkopieerder en het gebruik in de klas. Er zijn nog geen kleine prenten.
