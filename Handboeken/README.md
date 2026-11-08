# Handboeken wiskunde 3de graad doorstroomfinaliteit

Hier staan alle handboeken, geordend per **leerplanpakket**. Elke richting volgt precies één pakket, dus elk handboek staat maar één keer in de repo, ook als meerdere richtingen het gebruiken.

## Pakketten en richtingen

De pakketten volgen de graadleerplannen wiskunde 3de graad D. Ze zijn uitbreidingen van elkaar: B+S'' bevat alles van B+S' plus extra leerplandoelen, enzovoort. De afbakening verschilt soms (bijvoorbeeld alleen sinus in Basis, ook cosinus in B+S').

| Pakket | Richtingen | Lestijden per graad |
|---|---|---|
| 1 Basis | Grieks-Latijn, Humane wetenschappen, Latijn-Moderne talen, Moderne talen | 125 |
| 2 B+S | Economie-Moderne talen | 175 |
| 3 B+S' | Latijn-Wetenschappen, Moderne talen-Wetenschappen, Sportwetenschappen | 200 |
| 4 B+S'' | Economie-Wiskunde, Grieks-Wiskunde, Latijn-Wiskunde, Wetenschappen-Wiskunde | 300 (6 uur per week) |

Het leerplan van een ander net of een andere school kan de richtingen anders groeperen. Dat past in een extra rij of kolom hier. Het aantal uren per week verschilt per school: de uren op de voorkant van de handboeken staan in `Ontwerp/voorkanten/maak-voorkanten.py` en zijn aan te passen.

## Mappenstructuur

```
Handboeken/
  <pakket>/        1 Grieks-Latijn, Humane, Latijn-Moderne, Moderne talen (Basis)
                   2 Economie-Moderne talen (B+S)
                   3 Latijn-Wet., Moderne talen-Wet., Sportwetenschappen (B+S')
                   4 Economie-, Grieks-, Latijn-, Wetenschappen-Wiskunde (B+S'')
    <rubriek>/     Analyse, Algebra, Meetkunde, Discrete wiskunde, Data en onzekerheid, Onderzoekscompetentie
      <cursus>/    een eigen map per cursus, opgebouwd zoals Integralen
```

Houd de namen kort: Windows beperkt de padlengte tot 260 tekens.

Een nieuwe cursus begint met een kopie van de cursus [Integralen](<4 Economie-, Grieks-, Latijn-, Wetenschappen-Wiskunde (B+S'')/Analyse/Integralen/README.md>) en volgt de [ontwerpregels](../Ontwerp/ontwerpregels.md).

## Status

| Cursus | Plaats | Status |
|---|---|---|
| Integralen | [Pakket 4 / Analyse](<4 Economie-, Grieks-, Latijn-, Wetenschappen-Wiskunde (B+S'')/Analyse/Integralen/README.md>) | eerste versie, nog na te lezen |
| Matrices | [Pakket 1 / Algebra](<1 Grieks-Latijn, Humane, Latijn-Moderne, Moderne talen (Basis)/Algebra/Matrices/README.md>) | eerste versie, nog na te lezen |
| Onderzoekscompetentie | [Pakket 3](<3 Latijn-Wet., Moderne talen-Wet., Sportwetenschappen (B+S')/Onderzoekscompetentie/README.md>) | eerste versie, nog na te lezen |
| alle overige | per pakket | nog te maken |
