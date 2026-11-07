"""Haalt de schilderijen voor de voorkaft op (Wikimedia Commons, publiek domein) en
snijdt ze bij tot de afbeelding bovenaan de voorkaft.

Uitvoeren vanuit de map Ontwerp/omslagen:
    py -3.13 -P maak-omslagen.py            alle schilderijen
    py -3.13 -P maak-omslagen.py grande-jatte   alleen deze

Resultaat: omslag-<naam>.jpg in deze map (21 x 20 cm, 2100 x 2000 px).
Op de voorkaft van Integralen valt de onderste 1,5 cm achter de gekleurde band.

Een nieuw schilderij toevoegen:
  1. een regel bij SCHILDERIJEN (bestandsnaam op Commons, uitsnede);
  2. een motief in ../voorkanten/motieven/ met \\omslagbestand en \\omslagbron (kunstenaar en titel).
Controleer altijd of de licentie op Commons "Public domain" is.
"""
import io
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

MAP = Path(__file__).resolve().parent
API = "https://commons.wikimedia.org/w/api.php"
UA = {"User-Agent": "AxiomathWiskunde/1.0 (educatief project; https://github.com/Klaasvdb/axiomath)"}
BREEDTE, HOOGTE = 2100, 2000

# naam: (bestand op Commons, horizontale positie 0..1, verticale positie 0..1 van de uitsnede)
SCHILDERIJEN = {
    "athene": ("File:Sanzio 01.jpg", 0.5, 0.5),                       # Rafaël, De School van Athene
    "nevelzee": ("File:Caspar David Friedrich - Wanderer above the sea of fog.jpg", 0.5, 0.3),
    "sterrennacht": ("File:Van Gogh - Starry Night - Google Art Project.jpg", 0.45, 0.5),
    "golf": ("File:Great Wave off Kanagawa2.jpg", 0.15, 0.5),           # Hokusai
    "impressie": ("File:Monet - Impression, Sunrise.jpg", 0.5, 0.5),
    "waterlelies": ("File:Claude Monet - Water Lilies - 1906, Ryerson.jpg", 0.5, 0.5),
    "grande-jatte": ("File:A Sunday on La Grande Jatte, Georges Seurat, 1884.jpg", 0.85, 0.5),  # Seurat
    "middelharnis": ("File:Meindert Hobbema 001.jpg", 0.5, 0.5),        # Hobbema
    "regen-stoom": ("File:Turner - Rain, Steam and Speed - National Gallery file.jpg", 0.7, 0.5),
    "mondriaan": ("File:Tableau 3 with red-orange, yellow, black, blue and grey, 1921, Piet Mondrian.jpg", 0.5, 0.5),
    "lune": ("File:Delaunay, Robert - Formes circulaires; lune no. 1 - Google Art Project.jpg", 0.5, 0.5),
    "aardbeiendief": ("File:Textile, Strawberry Thief, designed 1883, printed ca. 1934 (CH 18340065).jpg", 0.5, 0.5),  # Morris
    "ideale-stad": ("File:Formerly Piero della Francesca - Ideal City - Galleria Nazionale delle Marche Urbino.jpg", 0.5, 0.5),
    "populieren": ("File:Claude Monet - Poplars on the Epte - Google Art Project.jpg", 0.5, 0.5),
    "volkstelling": ("File:Pieter Bruegel the Elder - The Numbering at Bethlehem - Google Art Project.jpg", 0.1, 0.5),
    "valsspelers": ("File:Caravaggio (Michelangelo Merisi) - The Cardsharps - Google Art Project.jpg", 0.5, 0.5),
    "staalmeesters": ("File:Rembrandt - De Staalmeesters- het college van staalmeesters (waardijns) van het Amsterdamse lakenbereidersgilde - Google Art Project.jpg", 0.5, 0.5),
    "geograaf": ("File:Johannes Vermeer - The Geographer - Google Art Project.jpg", 0.5, 0.3),
}
# deel dat rondom wegvalt: Seurat schilderde een stippelrand mee, de andere foto's tonen de lijst of de stofrand
RAND = {"grande-jatte": 0.015, "mondriaan": 0.04, "aardbeiendief": 0.05, "ideale-stad": 0.03}


def haal(url):
    """Commons antwoordt met 429 als je te snel vraagt: dan even wachten."""
    for poging in range(5):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA)) as r:
                return r.read()
        except urllib.error.HTTPError as fout:
            if fout.code != 429 or poging == 4:
                raise
            time.sleep(40)


def info(titel):
    params = {
        "action": "query", "format": "json", "prop": "imageinfo", "titles": titel,
        "iiprop": "url|size|extmetadata", "iiurlwidth": 3840,
        "iiextmetadatafilter": "LicenseShortName",
    }
    pagina = next(iter(json.loads(haal(API + "?" + urllib.parse.urlencode(params)))["query"]["pages"].values()))
    i = pagina["imageinfo"][0]
    return i["thumburl"] if i["width"] > 3840 else i["url"], i["extmetadata"]["LicenseShortName"]["value"]


for naam, (titel, px, py) in SCHILDERIJEN.items():
    if sys.argv[1:] and naam not in sys.argv[1:]:
        continue
    url, licentie = info(titel)
    if "public domain" not in licentie.lower():
        print(f"{naam}: licentie '{licentie}', overgeslagen")
        continue
    img = Image.open(io.BytesIO(haal(url))).convert("RGB")
    time.sleep(5)
    b, h = img.size
    rand = RAND.get(naam, 0)
    img = img.crop((round(b * rand), round(h * rand), round(b * (1 - rand)), round(h * (1 - rand))))
    b, h = img.size
    # grootst mogelijke uitsnede met de verhouding van de afbeelding op de voorkaft
    if b / h > BREEDTE / HOOGTE:
        nb, nh = round(h * BREEDTE / HOOGTE), h
    else:
        nb, nh = b, round(b * HOOGTE / BREEDTE)
    x = round((b - nb) * px)
    y = round((h - nh) * py)
    uitsnede = img.crop((x, y, x + nb, y + nh)).resize((BREEDTE, HOOGTE), Image.LANCZOS)
    doel = MAP / f"omslag-{naam}.jpg"
    uitsnede.save(doel, quality=85, optimize=True)
    print(doel.name, doel.stat().st_size // 1024, "kB", licentie)
