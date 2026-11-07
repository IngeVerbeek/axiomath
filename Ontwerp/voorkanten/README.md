# Voorkanten van de handboeken

Alle voorkanten komen hier vandaan: 47 handboeken, 16 onderwerpen. De regels en de lijst met kunstwerken staan in [de ontwerpregels](../ontwerpregels.md).

| Bestand | Inhoud |
|---|---|
| `voorkant.tex` | De indeling, voor alle handboeken dezelfde. De cursussen lezen dit bestand rechtstreeks |
| `motieven/<naam>.tex` | Per onderwerp: het kunstwerk, de bovenrand van de band en de vormen |
| `maak-voorkanten.py` | De lijst met handboeken en gegevens per pakket, en het bouwscript |
| `alle-voorkanten.pdf` | Het resultaat: een pagina per handboek, met bladwijzers. Niet in git |

## Bouwen

In PowerShell, vanuit deze map:

```
py -3.13 -P maak-voorkanten.py
```

Dat maakt `alle-voorkanten.pdf` en schrijft in elke cursus die al een `handboek.tex` heeft een `voorkant-gegevens.tex` (nu Integralen en Matrices): de gegevens en de naam van het motief. De voorkant, het motief, het schilderij en het logo kopieert het niet: de cursussen lezen ze hier rechtstreeks. Pas ze dus alleen hier aan. De PDF van de cursus zelf maak je daarna opnieuw met `Opmaak/maak-pdf.py`.

De schilderijen komen uit `Ontwerp/omslagen/` (gemaakt met `maak-omslagen.py`), het logo uit `Ontwerp/logo/`.

## Nog na te kijken

- **Leerjaar in de pakketten 1, 2 en 3:** staat nog niet op de voorkant, omdat de verdeling over het 5de en 6de jaar niet vastligt. Zet het in `HANDBOEKEN_LIJST` zodra ze vastligt. Dan kan bij pakket 1 en 2 ook het juiste aantal uren voor dat jaar komen.
- **Cursussen die nog niet bestaan:** hun voorkant is klaar en komt vanzelf mee zodra de cursus een `handboek.tex` heeft.
