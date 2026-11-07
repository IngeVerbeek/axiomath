# Axiomath

Vrije, niet-commerciële handboeken wiskunde voor de **3de graad doorstroomfinaliteit** van het Vlaamse secundair onderwijs, met de oefeningen als gegevens: de basis voor PDF's, een online oefenplatform, testen en gedifferentieerde oefenreeksen.

Het project is gemaakt door leerkrachten voor leerkrachten. Je mag alles gebruiken, aanpassen en delen zolang het niet commercieel is en je de bron vermeldt. Zie [LICENSE.md](LICENSE.md).

> Naam: *axioma* + *math*. Een axioma is wat je aanvaardt om te kunnen redeneren.

## Waar we naartoe willen

Een geïntegreerd ecosysteem, volledig open:

1. **Handboeken** per leerplanpakket, als PDF met drie versies uit één bron: handboek, leerkrachtenversie en zelfstudie.
2. **Een oefeningenbank** (`oefeningen/*.yaml`): elke oefening heeft een vast nummer, een niveau, een antwoord en een uitwerking. Daarop steunen de PDF's, de website en later de testen.
3. **Een online leerplatform** voor thuis, met automatisch nakijken. Er is al een voorbeeld: [Website/](Website/).
4. **Testen en gedifferentieerde oefenreeksen** uit dezelfde bank.

## Wat er nu staat

| Cursus | Pakket | Inhoud | Status |
|---|---|---|---|
| [Integralen](<Handboeken/4 Economie-, Grieks-, Latijn-, Wetenschappen-Wiskunde (B+S'')/Analyse/Integralen/README.md>) | 4 (B+S'') | 4 hoofdstukken, 178 oefeningen | eerste versie, nog na te lezen |
| [Matrices](<Handboeken/1 Grieks-Latijn, Humane, Latijn-Moderne, Moderne talen (Basis)/Algebra/Matrices/README.md>) | 1 (Basis) | 2 hoofdstukken, 83 oefeningen | eerste versie, nog na te lezen |

De rest van de leerstof volgt. Zie [Handboeken/README.md](Handboeken/README.md) voor de indeling per pakket en richting.

## Indeling van de repo

| Map | Inhoud |
|---|---|
| [Handboeken/](Handboeken/) | De cursussen, per leerplanpakket, per rubriek, per cursus |
| [Ontwerp/](Ontwerp/) | [Ontwerpregels](Ontwerp/ontwerpregels.md), logo, voorkanten en de schilderijen voor de voorkaft |
| [Website/](Website/) | Voorbeeld van de online versie (Integralen, hoofdstuk 1) |
| `.claude/skills/` | Een skill voor wie met Claude Code een hoofdstuk schrijft |

## Zelf een PDF bouwen

Je hebt nodig: TeX Live (2024 of recenter, met `pdflatex`) en Python 3.13 met `pymupdf`, `pillow` en `pyyaml`.

```
cd "Handboeken/4 Economie-, Grieks-, Latijn-, Wetenschappen-Wiskunde (B+S'')/Analyse/Integralen"
python maak-pdf.py
```

Dat maakt het handboek, de leerkrachtenversie, de zelfstudieversie en de lijsten met oplossingen. Zie de README van de cursus voor opties.

## Meewerken

Alle leerkrachten uit het Vlaamse onderwijs zijn welkom: nalezen, oefeningen schrijven, een hoofdstuk maken, fouten melden. Lees eerst [CONTRIBUTING.md](CONTRIBUTING.md).

## Leerplannen

De cursussen volgen de leerplandoelen van de graadleerplannen wiskunde 3de graad D. De leerplannen zelf zitten niet in de repo: lees ze bij de bevoegde instantie. De koppeling tussen leerplan en cursus staat per pakket, zodat ze later ook voor andere netten kan bestaan. Het leerplan wijkt per net soms in naam of indeling af; de eindtermen van de Vlaamse overheid zijn voor alle netten dezelfde.
