"""Maakt de voorkant van elk handboek. Uitvoeren in PowerShell, vanuit deze map:

    py -3.13 -P maak-voorkanten.py

Resultaat:
  - alle-voorkanten.pdf: alle handboeken, een pagina per handboek, met bladwijzers;
  - in elke cursus die al een handboek.tex heeft: voorkant-gegevens.tex (de gegevens en de naam van het motief).
    De voorkant, de motieven, de schilderijen en het logo blijven hier: de cursussen lezen ze rechtstreeks.

Een nieuwe cursus krijgt haar voorkant dus vanzelf bij de volgende keer dat dit script draait.
Kunstwerken: ../omslagen/maak-omslagen.py. Het logo: ../logo/.
"""
import re
import shutil
import subprocess
from pathlib import Path

import os

MAP = Path(__file__).resolve().parent
HANDBOEKEN = MAP.parent.parent / "Handboeken"
TEXLIVE = Path(r"C:\texlive\2024\bin\windows")

GRAAD = "3de graad doorstroomfinaliteit"

# Richtingen en uren: Handboeken/README.md.
PAKKETTEN = {
    "1 Grieks-Latijn, Humane, Latijn-Moderne, Moderne talen (Basis)": {
        "richtingen": "Grieks-Latijn, Humane wetenschappen, Latijn-Moderne talen, Moderne talen",
        "uren": r"5de jaar: 3 uur per week. 6de jaar: 4 uur per week (W\&S), in Moderne talen 2 uur",
    },
    "2 Economie-Moderne talen (B+S)": {
        "richtingen": "Economie-Moderne talen",
        "uren": "5de jaar: 3 uur per week. 6de jaar: 4 uur per week",
    },
    "3 Latijn-Wet., Moderne talen-Wet., Sportwetenschappen (B+S')": {
        "richtingen": "Latijn-Wetenschappen, Moderne talen-Wetenschappen, Sportwetenschappen",
        "uren": "4 uur per week",
    },
    "4 Economie-, Grieks-, Latijn-, Wetenschappen-Wiskunde (B+S'')": {
        "richtingen": "Economie-Wiskunde, Grieks-Wiskunde, Latijn-Wiskunde, Wetenschappen-Wiskunde",
        "uren": "6 uur per week",
    },
}
P1, P2, P3, P4 = PAKKETTEN

# Map (onder het pakket) en naam van het motief, zoals in de README's van de pakketten. Het leerjaar
# staat er alleen bij pakket 4 bij (de verdeling over de jaren ligt daar vast). De leerplannen zijn
# graadleerplannen: bij de andere pakketten is de verdeling over de jaren nog niet vastgelegd.
# (pakket, map, motief, leerjaar)
HANDBOEKEN_LIJST = []
GEMEEN = [
    ("Analyse/Algemene functies", "algemene-functies"),
    ("Analyse/Exponentiële en logaritmische functies", "exponentieel-logaritmisch"),
    ("Analyse/Goniometrische functies", "goniometrische-functies"),
]
for pakket, extra in (
    (P1, [("Analyse/Afgeleiden", "afgeleiden"), ("Algebra/Matrices", "matrices"), ("Discrete wiskunde/Rijen", "rijen"),
          ("Data en onzekerheid/Kansrekenen", "kansrekenen"), ("Data en onzekerheid/Statistiek", "statistiek")]),
    (P2, [("Analyse/Rationale functies", "rationale-functies"), ("Analyse/Afgeleiden", "afgeleiden"),
          ("Analyse/Integralen", "integralen"), ("Algebra/Matrices", "matrices"), ("Discrete wiskunde/Rijen", "rijen"),
          ("Data en onzekerheid/Kansrekenen", "kansrekenen"), ("Data en onzekerheid/Statistiek", "statistiek"),
          ("Onderzoekscompetentie", "onderzoekscompetentie")]),
    (P3, [("Analyse/Rationale functies", "rationale-functies"), ("Analyse/Afgeleiden", "afgeleiden"),
          ("Analyse/Integralen", "integralen"), ("Algebra/Matrices", "matrices"), ("Algebra/Complexe getallen", "complexe-getallen"),
          ("Discrete wiskunde/Rijen", "rijen"), ("Data en onzekerheid/Kansrekenen", "kansrekenen"),
          ("Data en onzekerheid/Statistiek", "statistiek"), ("Onderzoekscompetentie", "onderzoekscompetentie")]),
):
    HANDBOEKEN_LIJST += [(pakket, m, n, None) for m, n in GEMEEN + extra]
HANDBOEKEN_LIJST += [(P4, m, n, jaar) for m, n, jaar in [
    ("Analyse/Algemene functies", "algemene-functies", "5de jaar"),
    ("Analyse/Exponentiële en logaritmische functies", "exponentieel-logaritmisch", "5de jaar"),
    ("Analyse/Goniometrische functies", "goniometrische-functies", "5de jaar"),
    ("Analyse/Rationale functies", "rationale-functies", "5de jaar"),
    ("Analyse/Limieten en afgeleiden", "afgeleiden", "5de jaar"),
    ("Analyse/Integralen", "integralen", "6de jaar"),
    ("Algebra/Matrices", "matrices", "5de jaar"),
    ("Algebra/Complexe getallen", "complexe-getallen", "5de jaar"),
    ("Algebra/Groepen", "groepen", "6de jaar"),
    ("Meetkunde/Ruimtemeetkunde", "ruimtemeetkunde", "6de jaar"),
    ("Discrete wiskunde/Rijen", "rijen", "6de jaar"),
    ("Discrete wiskunde/Telproblemen", "telproblemen", "6de jaar"),
    ("Discrete wiskunde/Logica en bewijzen", "logica-en-bewijzen", "6de jaar"),
    ("Data en onzekerheid/Kansrekenen", "kansrekenen", "6de jaar"),
    ("Data en onzekerheid/Statistiek", "statistiek", "6de jaar"),
    ("Onderzoekscompetentie", "onderzoekscompetentie", None),
]]

# Titels die niet op één regel van 64 pt passen: (titel met regeleinde, grootte in pt).
TITELS = {
    "Algemene functies": (r"Algemene\\functies", 46),
    "Exponentiële en logaritmische functies": (r"Exponentiële en\\logaritmische functies", 40),
    "Goniometrische functies": (r"Goniometrische\\functies", 46),
    "Rationale functies": (r"Rationale\\functies", 46),
    "Limieten en afgeleiden": (r"Limieten en\\afgeleiden", 46),
    "Complexe getallen": (r"Complexe\\getallen", 46),
    "Ruimtemeetkunde": ("Ruimtemeetkunde", 50),
    "Logica en bewijzen": (r"Logica en\\bewijzen", 46),
    "Onderzoekscompetentie": (r"Onderzoeks-\\competentie", 46),
}


def gegevens(pakket, map_, jaar):
    """De regels van voorkant-gegevens.tex voor één handboek."""
    delen = map_.split("/")
    titel = delen[-1]
    rubriek = delen[0] if len(delen) > 1 else ""
    omslagtitel, grootte = TITELS.get(titel, (titel, 64))
    graad = f"{GRAAD}, {jaar}" if jaar else GRAAD
    p = PAKKETTEN[pakket]
    return "\n".join([
        f"\\def\\cursusrubriek{{{rubriek}}}",
        f"\\def\\cursusrichtingen{{{p['richtingen']}}}",
        f"\\def\\cursusgraad{{{graad}}}",
        f"\\def\\cursusuren{{{p['uren']}}}",
        f"\\def\\omslagtitel{{{omslagtitel}}}",
        f"\\def\\omslagtitelgrootte{{{grootte}}}",
    ]) + "\n"


def bouw_alles():
    pagina = []
    for pakket, map_, motief, jaar in HANDBOEKEN_LIJST:
        nummer = pakket.split()[0]
        titel = map_.split("/")[-1]
        pagina.append(
            "\\begingroup\n"
            f"\\input{{motieven/{motief}}}\n"
            f"{gegevens(pakket, map_, jaar)}"
            f"\\pdfbookmark[0]{{Pakket {nummer} - {titel}}}{{p{nummer}-{re.sub('[^a-z]', '', titel.lower())}}}\n"
            "\\maakomslag\n"
            "\\endgroup\n"
        )
    tex = r"""%% Gemaakt door maak-voorkanten.py: pas dat script of de motieven aan, niet dit bestand.
\documentclass[11pt,oneside,openany]{book}
\usepackage{etoolbox}
\usepackage[dutch]{babel}
\usepackage[a4paper,margin=2.5cm]{geometry}
\usepackage{amsmath}
\usepackage[T1]{fontenc}
\usepackage[default]{sourcesanspro}
\usepackage{newtxsf}
\renewcommand{\familydefault}{\sfdefault}
\linespread{1.1}
\usepackage{icomma}
\usepackage{ragged2e}
\usepackage{array}
\usepackage{graphicx}
\graphicspath{{../omslagen/}{../logo/}}
\usepackage{xcolor}
\usepackage{tikz}
\usetikzlibrary{arrows.meta,calc}
\definecolor{inkt}{HTML}{12202B}
\definecolor{accent}{HTML}{0B6470}
\definecolor{fel}{HTML}{3FD6F0}
\newcommand{\kopletter}{\sffamily\bfseries}
\newcommand{\cursusondertitel}{Handboek}
\input{voorkant}
\usepackage[hyperfootnotes=false]{hyperref}
\hypersetup{hidelinks,pdftitle={Voorkanten van de handboeken},pdflang={nl}}
\begin{document}
""" + "".join(pagina) + "\\end{document}\n"
    (MAP / "alle-voorkanten.tex").write_text(tex, encoding="utf-8")
    env = dict(os.environ)
    env["PATH"] = str(TEXLIVE) + os.pathsep + env["PATH"]
    for _ in range(2):  # twee rondes: de voorkant staat op een vaste plaats op de pagina (remember picture)
        r = subprocess.run(["pdflatex", "-interaction=nonstopmode", "-halt-on-error", "alle-voorkanten.tex"],
                           cwd=MAP, env=env, capture_output=True, text=True, encoding="latin-1")
        if r.returncode:
            print(r.stdout[-3000:])
            raise SystemExit("pdflatex is mislukt")
    print("alle-voorkanten.pdf:", len(HANDBOEKEN_LIJST), "handboeken")


def zet_in_cursussen():
    """Bestanden naar de cursussen die al een handboek.tex hebben."""
    for pakket, map_, motief, jaar in HANDBOEKEN_LIJST:
        cursus = HANDBOEKEN / pakket / Path(map_)
        if (cursus / "Handboek").is_dir():
            cursus = cursus / "Handboek"
        if not (cursus / "handboek.tex").exists():
            continue
        (cursus / "voorkant-gegevens.tex").write_text(
            gegevens(pakket, map_, jaar) + f"\\def\\motiefnaam{{{motief}}}\n", encoding="utf-8")
        print("cursus bijgewerkt:", map_, f"({pakket.split()[0]})")


if __name__ == "__main__":
    bouw_alles()
    zet_in_cursussen()
