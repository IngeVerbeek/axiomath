"""Maakt van de cursus drie aparte PDF's:

    <naam>.pdf                          de cursus zelf (zonder oplossingen)
    <naam> - numerieke oplossingen.pdf  alle numerieke oplossingen, genummerd zoals de oefeningen
    <naam> - uitgewerkte oplossingen.pdf  alle uitgewerkte oplossingen

Uitvoeren vanuit de map van de cursus (waar het hoofdbestand staat):
    py -3.12 -P maak-pdf.py                 # hoofdbestand wordt automatisch gevonden
    py -3.12 -P maak-pdf.py Rijen.tex       # of expliciet

Werking: eerst wordt de cursus gecompileerd; daarbij verzamelen de omgevingen `solution` en
`fullsolution` de oplossingen in oplossingen.tex en uitgewerkteoplossingen.tex. Daarna wordt
hetzelfde hoofdbestand nog twee keer gecompileerd met \\def\\uitvoer{numeriek} of
\\def\\uitvoer{uitgewerkt}; dan toont het enkel de voorkaft en de gevraagde oplossingen.
"""
import os
import shutil
import subprocess
import sys
from pathlib import Path

MAP = Path(__file__).resolve().parent
TEXLIVE = Path(r"C:\texlive\2024\bin\windows")  # wordt aan het PATH toegevoegd als latexmk ontbreekt

UITVOEREN = [("numeriek", "numerieke oplossingen"), ("uitgewerkt", "uitgewerkte oplossingen")]
TUSSENBESTANDEN = (".aux", ".log", ".out", ".toc", ".fls", ".fdb_latexmk", ".synctex.gz")


def vind_hoofdbestand():
    if len(sys.argv) > 1:
        return MAP / sys.argv[1]
    kandidaten = [p for p in MAP.glob("*.tex")
                  if r"\begin{document}" in p.read_text(encoding="utf-8", errors="ignore")]
    if len(kandidaten) != 1:
        sys.exit(f"Geef het hoofdbestand op als argument (gevonden: {[p.name for p in kandidaten]})")
    return kandidaten[0]


def run(cmd):
    resultaat = subprocess.run(cmd, cwd=MAP, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                               text=True, encoding="utf-8", errors="replace")
    if resultaat.returncode != 0:
        fouten = [r for r in resultaat.stdout.splitlines() if r.startswith("!")]
        print(resultaat.stdout[-3000:])
        sys.exit(f"Compileren mislukt ({' '.join(cmd[:2])}...): {fouten[:3]}")


if not shutil.which("latexmk"):
    os.environ["PATH"] = str(TEXLIVE) + os.pathsep + os.environ["PATH"]
    if not shutil.which("latexmk"):
        sys.exit("latexmk niet gevonden: zet TeX Live in het PATH")

hoofd = vind_hoofdbestand()
naam = hoofd.stem

print(f"{naam}.pdf (cursus)")
run(["latexmk", "-pdf", "-interaction=nonstopmode", "-halt-on-error", hoofd.name])

for uitvoer, omschrijving in UITVOEREN:
    jobnaam = f"{naam} - {omschrijving}"
    print(f"{jobnaam}.pdf")
    for _ in range(2):  # twee keer: de voorkaft gebruikt tikz-posities
        run(["pdflatex", "-interaction=nonstopmode", "-halt-on-error", f"-jobname={jobnaam}",
             rf"\def\uitvoer{{{uitvoer}}}\input{{{hoofd.stem}}}"])
    for ext in TUSSENBESTANDEN:
        (MAP / f"{jobnaam}{ext}").unlink(missing_ok=True)

print("klaar")
