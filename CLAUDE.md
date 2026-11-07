# Axiomath

Vrije, niet-commerciële handboeken wiskunde voor de 3de graad doorstroomfinaliteit (Vlaanderen), met een oefeningenbank als bron voor PDF's, website en later testen. Taal: Nederlands. Zie `README.md` en `CONTRIBUTING.md`.

## Regels

- **De ontwerpregels staan in `Ontwerp/ontwerpregels.md`.** Pas ze daar aan, niet hier. Voor een nieuw hoofdstuk of een nieuwe cursus: gebruik de skill `handboek-hoofdstuk` (`.claude/skills/`).
- **Alleen eigen werk.** Neem nooit opgaven, teksten of figuren over uit bestaande handboeken, ook niet met andere getallen. Neem geen leerplantekst over: verwijs naar de nummers van de leerplandoelen.
- Alles is vrij en niet-commercieel (`LICENSE.md`): inhoud CC BY-NC-SA 4.0, code PolyForm Noncommercial. Afbeeldingen alleen publiek domein, met de bron erbij.
- Geen persoonsgegevens, schoolnamen of lokale paden in de repo.
- Commit en push alleen met toestemming van de gebruiker.

## Indeling

- `Handboeken/<pakket>/<rubriek>/<cursus>/`: vier pakketten naar leerplan (Basis, B+S, B+S', B+S''). Zie `Handboeken/README.md`.
- Het voorbeeld van een cursus is `Handboeken/4 .../Analyse/Integralen/`: hoofdstukken in `hoofdstukken/`, oefeningen in `oefeningen/*.yaml` (de bron), macro's in `opmaak-v2.tex` en `notatie.tex`.
- `Ontwerp/`: ontwerpregels, `logo/`, `voorkanten/` (gedeeld door alle handboeken) en `omslagen/` (schilderijen).
- `Website/`: voorbeeld van de online versie; `maak-site.py` leest de oefeningenbank van Integralen.

## Bouwen

- Python 3.13 met `pymupdf`, `pillow`, `pyyaml`; TeX Live 2024 of recenter. Vanuit de map van de cursus: `python maak-pdf.py` (of `--hoofdstuk 2` voor één hoofdstuk).
- LaTeX leest `gen/`, dus draai altijd eerst `maak-pdf.py`, ook vóór een gewone `latexmk`.
- Voorkanten: `python maak-voorkanten.py` in `Ontwerp/voorkanten/`. Pas ze daar aan, want het script overschrijft de kopieën in de cursussen.
- Voortgang: zet de status van een handboek in `voortgang.yaml` en draai `python maak-voortgang.py`. Dat vult het overzicht in `README.md` tussen de markeringen: pas dat deel nooit met de hand aan.
- Bekijk na het bouwen de pagina's echt (render naar PNG): de meeste fouten zie je alleen op de pagina.
