// Gemaakt door maak-site.py uit de oefeningenbank. Niet met de hand aanpassen.
window.AXIOMATH_H1 = {
"oefeningen": [
{
"id": "h1-start-1",
"nr": 1,
"soort": "start",
"niveau": null,
"titel": "Opwarmer",
"opgave": "",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Bereken de oppervlakte van een driehoek met basis 6 en hoogte 3.",
"antwoord": "9",
"uitwerking": "$\\tfrac12\\cdot 6\\cdot 3=9$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 9.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Bereken de oppervlakte van een trapezium met evenwijdige zijden 2 en 5 en hoogte 4.",
"antwoord": "14",
"uitwerking": "$\\dfrac{2+5}{2}\\cdot 4=14$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 14.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Bereken de oppervlakte van een halve cirkel met straal 3.",
"antwoord": "$\\tfrac{9\\pi}{2}$",
"uitwerking": "$\\tfrac12\\cdot\\pi\\cdot 3^2=\\tfrac{9\\pi}{2}$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 14.13716694,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
},
{
"opgave": "Bereken $\\displaystyle\\sum_{k=1}^{4} k^2$.",
"antwoord": "30",
"uitwerking": "$1+4+9+16=30$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 30.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Bereken $\\displaystyle\\lim_{n \\to +\\infty} \\dfrac{(n+1)(2n+1)}{n^2}$.",
"antwoord": "2",
"uitwerking": "De teller is $2n^2+3n+1$: de hoogste machten bepalen de limiet, en dat geeft $\\tfrac21=2$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 2.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Een trein rijdt een kwartier aan 80 km/h. Hoe ver rijdt hij?",
"antwoord": "20 km",
"uitwerking": "$80\\cdot\\tfrac14=20$ km.",
"controle": {
"velden": [
{
"label": "",
"waarde": 20.0,
"tol": 1e-06,
"exact": false,
"eenheid": "km"
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-verken",
"nr": 2,
"soort": "start",
"niveau": null,
"titel": "Verken",
"opgave": "Een fietser vertrekt uit stilstand. Na $t$ seconden is zijn snelheid $v(t) = 2t$ meter per seconde. Hoe ver is hij na 4 seconden?",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Schat de afstand: doe alsof de snelheid in elke seconde constant blijft, en gelijk is aan de snelheid aan het begin van die seconde. Is dat te veel of te weinig?",
"antwoord": "12 m, te weinig",
"uitwerking": "$0+2+4+6=12$ m. Dat is te weinig, want de snelheid stijgt tijdens elke seconde.",
"controle": null
},
{
"opgave": "Doe hetzelfde met de snelheid aan het einde van elke seconde.",
"antwoord": "20 m",
"uitwerking": "$2+4+6+8=20$ m.",
"controle": {
"velden": [
{
"label": "",
"waarde": 20.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
}
]
}
},
{
"opgave": "Herhaal beide schattingen met stukjes van een halve seconde.",
"antwoord": "14 m en 18 m",
"uitwerking": "De snelheden aan het begin zijn $0,\\ 1,\\ \\ldots,\\ 7$, en elk stukje duurt $\\tfrac12$ s: $\\tfrac12\\cdot 28=14$ m. Aan het einde zijn het $1,\\ 2,\\ \\ldots,\\ 8$: $\\tfrac12\\cdot 36=18$ m.",
"controle": {
"velden": [
{
"label": "",
"waarde": 14.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
},
{
"label": "",
"waarde": 18.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
}
]
}
},
{
"opgave": "Teken de grafiek van $v$ op $[0, 4]$. Waar zie je je schattingen op die grafiek? Wat is de echte afstand?",
"antwoord": "16 m",
"uitwerking": "Snelheid maal tijd is de oppervlakte van een rechthoek onder of boven de grafiek. De echte afstand is de oppervlakte onder de grafiek: de driehoek $\\tfrac12\\cdot 4\\cdot 8=16$ m.\n<div class=\"figrij\"><img class=\"fig\" src=\"assets/fig/h1-1.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"><img class=\"fig\" src=\"assets/fig/h1-2.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"></div>",
"controle": {
"velden": [
{
"label": "",
"waarde": 16.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-oboven",
"nr": 3,
"soort": "kort",
"niveau": null,
"opgave": "Bereken $O_4$ en $B_4$ voor $f(x) = \\dfrac{1}{x}$ op $[1, 3]$. Let op: de functie daalt.",
"antwoord": "$O_4=0{,}95$ en $B_4\\approx 1{,}28$",
"uitwerking": "$\\Delta x=\\tfrac12$, deelpunten $1;\\ 1{,}5;\\ 2;\\ 2{,}5;\\ 3$. De functie daalt, dus de kleinste waarde staat rechts.<br>\n$O_4=\\tfrac12\\bigl(\\tfrac23+\\tfrac12+\\tfrac25+\\tfrac13\\bigr)=\\tfrac12\\cdot 1{,}9=0{,}95$.<br>\n$B_4=\\tfrac12\\bigl(1+\\tfrac23+\\tfrac12+\\tfrac25\\bigr)=\\tfrac12\\cdot\\tfrac{77}{30}=\\tfrac{77}{60}\\approx 1{,}28$.",
"controle": {
"velden": [
{
"label": "$O_4$",
"waarde": 0.95,
"tol": 0.006,
"exact": false,
"eenheid": ""
},
{
"label": "$B_4$",
"waarde": 1.28,
"tol": 0.006,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-limiet",
"nr": 4,
"soort": "kort",
"niveau": null,
"opgave": "Bereken de oppervlakte onder de grafiek van $f(x) = 2x$ op $[0, 4]$ als limiet van de bovensom. Controleer met de formule voor een driehoek.",
"antwoord": "16",
"uitwerking": "$\\Delta x=\\tfrac4n$ en $x_k=\\tfrac{4k}{n}$, dus $B_n=\\displaystyle\\sum_{k=1}^{n} \\dfrac{8k}{n}\\cdot\\dfrac4n=\\dfrac{32}{n^2}\\cdot\\dfrac{n(n+1)}{2}=\\dfrac{16(n+1)}{n}$, en dat heeft limiet 16. De driehoek: $\\tfrac12\\cdot 4\\cdot 8=16$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 16.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-herken",
"nr": 5,
"soort": "kort",
"niveau": null,
"opgave": "Schrijf $\\displaystyle\\lim_{n \\to +\\infty} \\sum_{k=1}^{n} \\Bigl(1 + \\dfrac{2k}{n}\\Bigr)^{\\!2} \\cdot \\dfrac{2}{n}$ als een bepaalde integraal.",
"antwoord": "$\\displaystyle\\int_1^3 x^2\\dx$",
"uitwerking": "$\\Delta x=\\tfrac2n$, $x_k=1+\\tfrac{2k}{n}$ loopt van 1 tot 3, en de functie is het kwadraat. Dus $\\displaystyle\\int_1^3 x^2\\dx$.",
"controle": null
},
{
"id": "h1-georienteerd",
"nr": 6,
"soort": "kort",
"niveau": null,
"opgave": "Bereken met een figuur:",
"lijst": "reeks",
"kolommen": 2,
"delen": [
{
"opgave": "$\\ig_0^3 (2x - 2)\\dx$",
"antwoord": "3",
"uitwerking": "Van 0 tot 1 onder de as: $-\\tfrac12\\cdot 1\\cdot 2=-1$. Van 1 tot 3 erboven: $\\tfrac12\\cdot 2\\cdot 4=4$. Samen 3.",
"controle": {
"velden": [
{
"label": "",
"waarde": 3.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_{-3}^{3} -\\sqrt{9 - x^2}\\dx$",
"antwoord": "$-\\tfrac{9\\pi}{2}$",
"uitwerking": "De grafiek is de onderste helft van de cirkel met straal 3: $-\\tfrac12\\cdot\\pi\\cdot 9=-\\tfrac{9\\pi}{2}$.<br><div class=\"figrij\"><img class=\"fig\" src=\"assets/fig/h1-18.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"><img class=\"fig\" src=\"assets/fig/h1-19.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"></div>",
"controle": {
"velden": [
{
"label": "",
"waarde": -14.13716694,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-snelheid",
"nr": 7,
"soort": "kort",
"niveau": null,
"opgave": "Een bal rolt een helling op en weer af. Zijn snelheid is $v(t) = 3 - 1{,}5t$ (in m/s) op $[0, 4]$. Bereken de verplaatsing en de afgelegde weg. Wat betekent de verplaatsing hier?",
"antwoord": "Verplaatsing 0 m; afgelegde weg 6 m",
"uitwerking": "De snelheid is 0 voor $t=2$. Boven de as: $\\tfrac12\\cdot 2\\cdot 3=3$. Eronder: $\\tfrac12\\cdot 2\\cdot 3=3$. De verplaatsing is 0 m: de bal is terug waar hij vertrok. De afgelegde weg is 6 m.",
"controle": {
"velden": [
{
"label": "Verplaatsing",
"waarde": 0.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
},
{
"label": "afgelegde weg",
"waarde": 6.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
}
]
}
},
{
"id": "h1-regels",
"nr": 8,
"soort": "kort",
"niveau": null,
"opgave": "Gegeven: $\\ig_1^6 f(x)\\dx = 10$,  $\\ig_1^2 f(x)\\dx = 4$ en $\\ig_2^6 g(x)\\dx = -3$.<br> Bereken $\\ig_2^6 \\bigl(f(x) + 2g(x) + 1\\bigr)\\dx$.",
"antwoord": "4",
"uitwerking": "$\\displaystyle\\int_2^6 f(x)\\dx=10-4=6$ en $\\displaystyle\\int_2^6 1\\dx=4$ (een rechthoek). Samen: $6+2\\cdot(-3)+4=4$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 4.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-symmetrie",
"nr": 9,
"soort": "kort",
"niveau": null,
"opgave": "Bereken $\\ig_{-3}^{3} (x^5 - 4x + 2)\\dx$.",
"antwoord": "12",
"uitwerking": "$x^5-4x$ is oneven en geeft 0. De rechthoek geeft $6\\cdot 2=12$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 12.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-gemiddelde",
"nr": 10,
"soort": "kort",
"niveau": null,
"opgave": "Bereken de gemiddelde waarde van $f(x) = |x|$ op $[-1, 3]$ en de waarde $c$ uit de middelwaardestelling.",
"antwoord": "Gemiddelde $\\tfrac54$ en $c=\\tfrac54$",
"uitwerking": "De integraal is $\\tfrac12+\\tfrac92=5$, dus het gemiddelde is $\\tfrac54$. Uit $|c|=\\tfrac54$ volgt $c=\\pm\\tfrac54$. Enkel $c=\\tfrac54$ ligt in $[-1,3]$.",
"controle": {
"velden": [
{
"label": "Gemiddelde",
"waarde": 1.25,
"tol": 1e-06,
"exact": true,
"eenheid": ""
},
{
"label": "$c$",
"waarde": 1.25,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
},
{
"id": "h1-o1",
"nr": 11,
"soort": "opdracht",
"niveau": 1,
"opgave": "Bereken $O_4$ en $B_4$ voor $f(x) = x^2 + 1$ op $[0, 2]$.",
"antwoord": "$O_4=3{,}75$ en $B_4=5{,}75$",
"uitwerking": "$\\Delta x=\\tfrac12$. De functie stijgt op $[0,2]$; de waarden zijn $1;\\ 1{,}25;\\ 2;\\ 3{,}25;\\ 5$.<br>\n$O_4=\\tfrac12(1+1{,}25+2+3{,}25)=3{,}75$ en $B_4=\\tfrac12(1{,}25+2+3{,}25+5)=5{,}75$.",
"controle": {
"velden": [
{
"label": "$O_4$",
"waarde": 3.75,
"tol": 0.006,
"exact": false,
"eenheid": ""
},
{
"label": "$B_4$",
"waarde": 5.75,
"tol": 0.006,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-o2",
"nr": 12,
"soort": "opdracht",
"niveau": 1,
"opgave": "Bereken met een figuur.",
"lijst": "reeks",
"kolommen": 2,
"delen": [
{
"opgave": "$\\ig_1^4 3\\dx$",
"antwoord": "9",
"uitwerking": "Rechthoek: $3\\cdot 3=9$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 9.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_0^5 (x+1)\\dx$",
"antwoord": "$\\tfrac{35}{2}$",
"uitwerking": "Trapezium: $\\dfrac{1+6}{2}\\cdot 5=\\tfrac{35}{2}$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 17.5,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_{-2}^{0} (-x)\\dx$",
"antwoord": "2",
"uitwerking": "Driehoek boven de as: $\\tfrac12\\cdot 2\\cdot 2=2$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 2.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_0^3 (x-3)\\dx$",
"antwoord": "$-\\tfrac92$",
"uitwerking": "Driehoek onder de as: $-\\tfrac12\\cdot 3\\cdot 3=-\\tfrac92$.<br><div class=\"figrij\"><img class=\"fig\" src=\"assets/fig/h1-33.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"><img class=\"fig\" src=\"assets/fig/h1-34.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"><img class=\"fig\" src=\"assets/fig/h1-35.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"><img class=\"fig\" src=\"assets/fig/h1-36.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"></div>",
"controle": {
"velden": [
{
"label": "",
"waarde": -4.5,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-oh",
"nr": 13,
"soort": "opdracht",
"niveau": 1,
"opgave": "De figuur toont de grafiek van een functie $f$ op $[0, 6]$.",
"figuur": "<img class=\"fig\" src=\"assets/fig/h1-37.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\">",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Schat $\\ig_0^6 f(x)\\dx$ door de hokjes te tellen.",
"antwoord": "ongeveer 9,5",
"uitwerking": "Per stuk van breedte 1 ongeveer $1{,}9$; $2{,}6$; $2{,}3$; $1{,}4$; $0{,}7$ en $0{,}6$. Samen ongeveer 9,5. (Dat is een schatting: elke waarde tussen 9 en 10 is goed.)",
"controle": {
"velden": [
{
"label": "",
"waarde": 9.5,
"tol": 0.665,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Schat daarmee de gemiddelde waarde van $f$ op $[0, 6]$. Teken ze als een horizontale rechte op de figuur.",
"antwoord": "ongeveer 1,6",
"uitwerking": "$\\tfrac{9{,}5}{6}\\approx 1{,}6$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 1.6,
"tol": 0.11200000000000002,
"exact": false,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-ol",
"nr": 14,
"soort": "opdracht",
"niveau": 1,
"opgave": "De figuur toont de grafiek van $f$. Bereken:",
"figuur": "<img class=\"fig\" src=\"assets/fig/h1-38.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\">",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "$\\ig_0^2 f(x)\\dx$ en $\\ig_2^6 f(x)\\dx$;",
"antwoord": "4 en 0",
"uitwerking": "De rechthoek geeft $2\\cdot 2=4$. Op $[2,6]$ heffen twee even grote driehoeken elkaar op: $2-2=0$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 4.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
},
{
"label": "",
"waarde": 0.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_0^6 f(x)\\dx$;",
"antwoord": "4",
"uitwerking": "$4+0=4$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 4.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "de werkelijke oppervlakte tussen de grafiek en de as op $[0, 6]$;",
"antwoord": "8",
"uitwerking": "$4+2+2=8$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 8.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "de gemiddelde waarde van $f$ op $[0, 6]$.",
"antwoord": "$\\tfrac23$",
"uitwerking": "$\\tfrac46=\\tfrac23$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 0.66666667,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o3",
"nr": 15,
"soort": "opdracht",
"niveau": 1,
"opgave": "Is de integraal positief, negatief of nul? Reken niet: redeneer met een figuur.",
"lijst": "reeks",
"kolommen": 3,
"delen": [
{
"opgave": "$\\ig_0^{\\pi} \\sin x\\dx$",
"antwoord": "positief",
"uitwerking": "De grafiek ligt boven de as.",
"controle": {
"keuze": [
"positief",
"negatief",
"nul"
],
"juist": "positief"
}
},
{
"opgave": "$\\ig_{\\pi}^{2\\pi} \\sin x\\dx$",
"antwoord": "negatief",
"uitwerking": "De grafiek ligt onder de as.",
"controle": {
"keuze": [
"positief",
"negatief",
"nul"
],
"juist": "negatief"
}
},
{
"opgave": "$\\ig_0^{2\\pi} \\sin x\\dx$",
"antwoord": "nul",
"uitwerking": "De twee stukken heffen elkaar op.",
"controle": {
"keuze": [
"positief",
"negatief",
"nul"
],
"juist": "nul"
}
},
{
"opgave": "$\\ig_{-1}^{0} x^3\\dx$",
"antwoord": "negatief",
"uitwerking": "De grafiek ligt onder de as.",
"controle": {
"keuze": [
"positief",
"negatief",
"nul"
],
"juist": "negatief"
}
},
{
"opgave": "$\\ig_3^{1} x^2\\dx$",
"antwoord": "negatief",
"uitwerking": "$x^2>0$, maar de grenzen staan omgekeerd: $\\displaystyle\\int_3^1 x^2\\dx=-\\int_1^3 x^2\\dx<0$.",
"controle": {
"keuze": [
"positief",
"negatief",
"nul"
],
"juist": "negatief"
}
},
{
"opgave": "$\\ig_{-5}^{5} x^3\\dx$",
"antwoord": "nul",
"uitwerking": "$x^3$ is oneven.",
"controle": {
"keuze": [
"positief",
"negatief",
"nul"
],
"juist": "nul"
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o4",
"nr": 16,
"soort": "opdracht",
"niveau": 1,
"opgave": "Gegeven: $\\ig_1^3 f(x)\\dx = 5$ en $\\ig_3^7 f(x)\\dx = -2$. Bereken:",
"lijst": "reeks",
"kolommen": 2,
"delen": [
{
"opgave": "$\\ig_1^7 f(x)\\dx$",
"antwoord": "3",
"uitwerking": "$5+(-2)=3$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 3.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_7^3 f(x)\\dx$",
"antwoord": "2",
"uitwerking": "Grenzen wisselen: $-(-2)=2$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 2.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_3^3 f(x)\\dx$",
"antwoord": "0",
"uitwerking": "Gelijke grenzen: 0.",
"controle": {
"velden": [
{
"label": "",
"waarde": 0.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_1^3 \\bigl(2f(x) + 1\\bigr)\\dx$",
"antwoord": "12",
"uitwerking": "$2\\cdot 5+\\displaystyle\\int_1^3 1\\dx=10+2=12$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 12.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o5",
"nr": 17,
"soort": "opdracht",
"niveau": 1,
"opgave": "De figuur toont de grafiek van $f$. De oppervlaktes van de drie gebieden staan erin.",
"figuur": "<img class=\"fig\" src=\"assets/fig/h1-39.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\">",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Bereken $\\ig_a^d f(x)\\dx$.",
"antwoord": "0",
"uitwerking": "$3-5+2=0$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 0.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Bereken $\\ig_b^d f(x)\\dx$.",
"antwoord": "$-3$",
"uitwerking": "$-5+2=-3$.",
"controle": {
"velden": [
{
"label": "",
"waarde": -3.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Hoe groot is de werkelijke oppervlakte tussen de grafiek en de as van $a$ tot $d$?",
"antwoord": "10",
"uitwerking": "$3+5+2=10$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 10.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o6",
"nr": 18,
"soort": "opdracht",
"niveau": 1,
"opgave": "Schrijf als een bepaalde integraal.",
"lijst": "reeks",
"kolommen": 3,
"delen": [
{
"opgave": "$\\displaystyle\\lim_{n \\to +\\infty} \\sum_{k=1}^{n} \\dfrac{k^2}{n^2} \\cdot \\dfrac1n$",
"antwoord": "$\\displaystyle\\int_0^1 x^2\\dx$",
"uitwerking": "$\\Delta x=\\tfrac1n$, $x_k=\\tfrac{k}{n}$ loopt van 0 tot 1, en de functie is $x^2$.",
"controle": null
},
{
"opgave": "$\\displaystyle\\lim_{n \\to +\\infty} \\sum_{k=1}^{n} \\sqrt{\\dfrac{k}{n}} \\cdot \\dfrac1n$",
"antwoord": "$\\displaystyle\\int_0^1 \\sqrt{x}\\dx$",
"uitwerking": "Zelfde $\\Delta x$ en $x_k$, de functie is $\\sqrt{x}$.",
"controle": null
},
{
"opgave": "$\\displaystyle\\lim_{n \\to +\\infty} \\sum_{k=1}^{n} \\Bigl(1 + \\dfrac{2k}{n}\\Bigr) \\dfrac2n$",
"antwoord": "$\\displaystyle\\int_1^3 x\\dx$",
"uitwerking": "$\\Delta x=\\tfrac2n$ en $x_k=1+\\tfrac{2k}{n}$ loopt van 1 tot 3, en de functie is $x$.",
"controle": null
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o7",
"nr": 19,
"soort": "opdracht",
"niveau": 1,
"opgave": "Bereken de gemiddelde waarde van $f(x) = 2x + 1$ op $[1, 3]$. Voor welke $c$ neemt $f$ die waarde aan?",
"antwoord": "Gemiddelde 5 en $c=2$",
"uitwerking": "De integraal is een trapezium: $\\dfrac{3+7}{2}\\cdot 2=10$. Het gemiddelde is $\\tfrac{10}{2}=5$. Uit $2c+1=5$ volgt $c=2$.",
"controle": {
"velden": [
{
"label": "Gemiddelde",
"waarde": 5.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
},
{
"label": "$c$",
"waarde": 2.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-o8",
"nr": 20,
"soort": "opdracht",
"niveau": 1,
"opgave": "Een auto rijdt 20 seconden aan 30 m/s en remt dan gelijkmatig tot stilstand in 10 seconden.",
"prent": "auto",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Teken de grafiek van de snelheid.",
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"opgave": "Hoe ver rijdt de auto in die 30 seconden?",
"antwoord": "750 m",
"uitwerking": null,
"controle": {
"velden": [
{
"label": "",
"waarde": 750.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
}
]
}
},
{
"opgave": "Bereken de gemiddelde snelheid.",
"antwoord": "25 m/s",
"uitwerking": null,
"controle": {
"velden": [
{
"label": "",
"waarde": 25.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m/s"
}
]
}
}
],
"antwoord": null,
"uitwerking": "<b>a.</b> Horizontaal op hoogte 30 van $t=0$ tot $t=20$, dan een rechte naar 0 bij $t=30$.<br><div class=\"figrij\"><img class=\"fig\" src=\"assets/fig/h1-40.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"></div><br><b>b.</b> $20\\cdot 30+\\tfrac12\\cdot 10\\cdot 30=750$ m.<br>\n<b>c.</b> $\\tfrac{750}{30}=25$ m/s.",
"controle": null
},
{
"id": "h1-o9",
"nr": 21,
"soort": "opdracht",
"niveau": 1,
"opgave": "Welke van de twee integralen is het grootst? Reken niet, maar gebruik de grafieken.",
"figuur": "<img class=\"fig\" src=\"assets/fig/h1-41.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\">",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "$\\ig_0^1 x\\dx$ of $\\ig_0^1 x^2\\dx$",
"antwoord": "$\\displaystyle\\int_0^1 x\\dx$",
"uitwerking": "Op $[0,1]$ is $x^2\\leqslant x$.",
"controle": null
},
{
"opgave": "$\\ig_1^2 x\\dx$ of $\\ig_1^2 x^2\\dx$",
"antwoord": "$\\displaystyle\\int_1^2 x^2\\dx$",
"uitwerking": "Op $[1,2]$ is $x\\leqslant x^2$.",
"controle": null
},
{
"opgave": "$\\ig_{-1}^{0} x\\dx$ of $\\ig_{-1}^{0} x^2\\dx$",
"antwoord": "$\\displaystyle\\int_{-1}^{0} x^2\\dx$",
"uitwerking": "Op $[-1,0]$ is $x\\leqslant 0\\leqslant x^2$.",
"controle": null
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o10",
"nr": 22,
"soort": "opdracht",
"niveau": 1,
"opgave": "Lena schrijft: “$\\int_{-2}^{2} x^3\\dx = 0$, dus de grafiek van $x^3$ en de horizontale as sluiten op $[-2, 2]$ geen oppervlakte in.” Wat klopt er niet?",
"antwoord": "De integraal is 0, de oppervlakte niet.",
"uitwerking": "De integraal is wel 0, omdat het stuk onder de as negatief telt en even groot is als het stuk erboven. De oppervlakte is de som van twee positieve stukken, dus niet 0.",
"controle": null
},
{
"id": "h1-o11",
"nr": 23,
"soort": "opdracht",
"niveau": 2,
"opgave": "Bereken $\\ig_0^2 3x\\dx$ als limiet van de bovensom. Controleer met een figuur.",
"antwoord": "6",
"uitwerking": "$\\Delta x=\\tfrac2n$ en $x_k=\\tfrac{2k}{n}$, dus $B_n=\\displaystyle\\sum_{k=1}^{n} \\dfrac{6k}{n}\\cdot\\dfrac2n=\\dfrac{12}{n^2}\\cdot\\dfrac{n(n+1)}{2}=\\dfrac{6(n+1)}{n}$, met limiet 6. De driehoek: $\\tfrac12\\cdot 2\\cdot 6=6$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 6.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-o12",
"nr": 24,
"soort": "opdracht",
"niveau": 2,
"opgave": "Een bad wordt gevuld. De eerste 4 minuten stroomt er 12 liter per minuut in. Van minuut 4 tot 6 daalt het debiet gelijkmatig tot 0. Van minuut 6 tot 10 loopt er 8 liter per minuut weg. Het bad is in het begin leeg.",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Teken de grafiek van het debiet, met weglopen als negatief debiet.",
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"opgave": "Hoeveel water zit er na 10 minuten in het bad?",
"antwoord": "28 liter",
"uitwerking": null,
"controle": {
"velden": [
{
"label": "",
"waarde": 28.0,
"tol": 1e-06,
"exact": false,
"eenheid": "liter"
}
]
}
},
{
"opgave": "Op welk moment zit er het meest in, en hoeveel is dat?",
"antwoord": "na 6 minuten, 60 liter",
"uitwerking": null,
"controle": {
"velden": [
{
"label": "na",
"waarde": 6.0,
"tol": 1e-06,
"exact": false,
"eenheid": "minuten"
},
{
"label": "",
"waarde": 60.0,
"tol": 1e-06,
"exact": false,
"eenheid": "liter"
}
]
}
}
],
"antwoord": null,
"uitwerking": "<b>a.</b> De figuur:<br><div class=\"figrij\"><img class=\"fig\" src=\"assets/fig/h1-42.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"></div>\n<b>b.</b> Rechthoek $4\\cdot 12=48$, driehoek $\\tfrac12\\cdot 2\\cdot 12=12$ en rechthoek onder de as $4\\cdot(-8)=-32$. Samen 28 liter.<br>\n<b>c.</b> Zolang het debiet positief is, neemt het volume toe: tot minuut 6. Dan is het volume $48+12=60$ liter.",
"controle": null
},
{
"id": "h1-o13",
"nr": 25,
"soort": "opdracht",
"niveau": 2,
"opgave": "Bereken met een figuur.",
"lijst": "reeks",
"kolommen": 3,
"delen": [
{
"opgave": "$\\ig_0^2 \\sqrt{4 - x^2}\\dx$",
"antwoord": "$\\pi$",
"uitwerking": "Een kwart van een cirkel met straal 2: $\\tfrac14\\cdot\\pi\\cdot 4=\\pi$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 3.14159265,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_{-2}^{2} \\bigl(3 + \\sqrt{4 - x^2}\\bigr)\\dx$",
"antwoord": "$12+2\\pi$",
"uitwerking": "Een rechthoek $4\\cdot 3=12$ plus een halve cirkel met straal 2, dat is $2\\pi$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 18.28318531,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_0^4 \\sqrt{4x - x^2}\\dx$",
"antwoord": "$2\\pi$",
"uitwerking": "$y=\\sqrt{4x-x^2}$ geeft $(x-2)^2+y^2=4$ met $y\\geqslant 0$: de bovenste helft van de cirkel met middelpunt $(2,0)$ en straal 2. Dus $2\\pi$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 6.28318531,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_0^4 |x - 1|\\dx$",
"antwoord": "5",
"uitwerking": "Twee driehoeken: $\\tfrac12\\cdot 1\\cdot 1+\\tfrac12\\cdot 3\\cdot 3=5$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 5.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_{-1}^{2} \\bigl(|x| + 1\\bigr)\\dx$",
"antwoord": "$\\tfrac{11}{2}$",
"uitwerking": "Rechthoek $3\\cdot 1=3$ en twee driehoeken: $\\tfrac12\\cdot 1\\cdot 1+\\tfrac12\\cdot 2\\cdot 2=\\tfrac52$. Samen $\\tfrac{11}{2}$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 5.5,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_{-3}^{3} |x|\\dx$",
"antwoord": "9",
"uitwerking": "Twee driehoeken met basis 3 en hoogte 3: $2\\cdot\\tfrac92=9$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 9.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o15",
"nr": 26,
"soort": "opdracht",
"niveau": 2,
"opgave": "We benaderen $\\ig_1^2 \\dfrac1x\\dx$ met $n = 4$.",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Bereken $O_4$ en $B_4$, op drie decimalen.",
"antwoord": "$O_4\\approx 0{,}635$ en $B_4\\approx 0{,}760$",
"uitwerking": "$\\Delta x=\\tfrac14$. $O_4=\\tfrac14\\bigl(\\tfrac45+\\tfrac23+\\tfrac47+\\tfrac12\\bigr)\\approx 0{,}635$ en $B_4=\\tfrac14\\bigl(1+\\tfrac45+\\tfrac23+\\tfrac47\\bigr)\\approx 0{,}760$.",
"controle": {
"velden": [
{
"label": "$O_4$",
"waarde": 0.635,
"tol": 0.0006,
"exact": false,
"eenheid": ""
},
{
"label": "$B_4$",
"waarde": 0.76,
"tol": 0.0006,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Neem nu de hoogte in het midden van elk deel. Bereken die Riemannsom op drie decimalen.",
"antwoord": "$\\approx 0{,}691$",
"uitwerking": "De middens zijn $1{,}125;\\ 1{,}375;\\ 1{,}625;\\ 1{,}875$. De som is $\\tfrac14\\bigl(\\tfrac{8}{9}+\\tfrac{8}{11}+\\tfrac{8}{13}+\\tfrac{8}{15}\\bigr)\\approx 0{,}691$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 0.691,
"tol": 0.0006,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Waarom verwacht je dat die laatste benadering beter is?",
"antwoord": null,
"uitwerking": "In elk deel ligt een stuk van de rechthoek boven en een stuk onder de grafiek, en die heffen elkaar grotendeels op.",
"controle": null
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o16",
"nr": 27,
"soort": "opdracht",
"niveau": 2,
"opgave": "Een stijgende functie op $[a, b]$ heeft ondersom $O_n$ en bovensom $B_n$. De donkere rechthoekjes in de figuur vormen het verschil $B_n - O_n$.",
"figuur": "<img class=\"fig\" src=\"assets/fig/h1-43.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\">",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Schuif ze in gedachten onder elkaar in één kolom. Toon zo aan: $B_n - O_n = \\Delta x \\cdot \\bigl(f(b) - f(a)\\bigr)$.",
"antwoord": null,
"uitwerking": "In $B_n-O_n$ valt alles weg behalve $\\Delta x\\cdot f(x_n)-\\Delta x\\cdot f(x_0)$, want elke andere functiewaarde staat in beide sommen.",
"controle": null
},
{
"opgave": "Voor $f(x) = x^2$ op $[0, 2]$: hoe groot moet $n$ minstens zijn opdat $B_n - O_n < 0{,}01$?",
"antwoord": "$n=801$",
"uitwerking": "$\\tfrac2n\\cdot 4<0{,}01$ geeft $n>800$, dus minstens $n=801$.",
"controle": {
"velden": [
{
"label": "$n$",
"waarde": 801.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o17",
"nr": 28,
"soort": "opdracht",
"niveau": 2,
"opgave": "Je duwt een kar 4 m ver met een constante kracht van 50 N. Daarna neemt de kracht gelijkmatig af tot 0 N over de volgende 2 m.",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Teken de kracht als functie van de afstand.",
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"opgave": "De arbeid (in joule) is de oppervlakte onder die grafiek. Bereken die.",
"antwoord": "250 J",
"uitwerking": null,
"controle": {
"velden": [
{
"label": "",
"waarde": 250.0,
"tol": 1e-06,
"exact": false,
"eenheid": "J"
}
]
}
}
],
"antwoord": null,
"uitwerking": "<b>a.</b> Horizontaal op hoogte 50 tot 4 m, dan een rechte naar 0 bij 6 m.<br><div class=\"figrij\"><img class=\"fig\" src=\"assets/fig/h1-44.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\"></div><br><b>b.</b> $4\\cdot 50+\\tfrac12\\cdot 2\\cdot 50=250$ J.",
"controle": null
},
{
"id": "h1-o18",
"nr": 29,
"soort": "opdracht",
"niveau": 2,
"opgave": "Het vermogen van zonnepanelen stijgt op een dag gelijkmatig van 0 kW om 7 uur tot 3 kW om 12 uur, en daalt dan gelijkmatig tot 0 kW om 18 uur.",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Bereken de opgewekte energie. Welke eenheid krijgt de uitkomst?",
"antwoord": "16,5 kWh",
"uitwerking": "De oppervlakte is een driehoek: $\\tfrac12\\cdot 11\\cdot 3=16{,}5$. De eenheid is kW maal uur: kilowattuur.",
"controle": {
"velden": [
{
"label": "",
"waarde": 16.5,
"tol": 1e-06,
"exact": false,
"eenheid": "kWh"
}
]
}
},
{
"opgave": "Bereken het gemiddelde vermogen tussen 7 en 18 uur.",
"antwoord": "1,5 kW",
"uitwerking": "$\\tfrac{16{,}5}{11}=1{,}5$ kW.",
"controle": {
"velden": [
{
"label": "",
"waarde": 1.5,
"tol": 1e-06,
"exact": false,
"eenheid": "kW"
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o19",
"nr": 30,
"soort": "opdracht",
"niveau": 2,
"opgave": "Gegeven: $f(x) = \\sqrt{16 - x^2}$ op $[-4, 4]$. Bereken de gemiddelde waarde en alle waarden $c$ uit de middelwaardestelling, op twee decimalen.",
"antwoord": "Gemiddelde $\\pi$; $c\\approx\\pm 2{,}48$",
"uitwerking": "De integraal is een halve cirkel: $\\tfrac12\\cdot\\pi\\cdot 16=8\\pi$, dus het gemiddelde is $\\tfrac{8\\pi}{8}=\\pi$. Uit $\\sqrt{16-c^2}=\\pi$ volgt $c^2=16-\\pi^2$, dus $c\\approx\\pm 2{,}48$. Beide liggen in het interval.",
"controle": null
},
{
"id": "h1-o20",
"nr": 31,
"soort": "opdracht",
"niveau": 2,
"opgave": "Bepaal de onbekende met een figuur.",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "$\\ig_0^x 2t\\dt = 9$ met $x > 0$",
"antwoord": "$x=3$",
"uitwerking": "De driehoek heeft basis $x$ en hoogte $2x$: $x^2=9$, dus $x=3$.",
"controle": {
"velden": [
{
"label": "$x$",
"waarde": 3.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_0^a (a - t)\\dt = 8$ met $a > 0$",
"antwoord": "$a=4$",
"uitwerking": "De driehoek heeft basis $a$ en hoogte $a$: $\\tfrac{a^2}{2}=8$, dus $a=4$.",
"controle": {
"velden": [
{
"label": "$a$",
"waarde": 4.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "$\\ig_0^2 (kx + 1)\\dx = 8$",
"antwoord": "$k=3$",
"uitwerking": "Lineariteit: $k\\cdot 2+2=8$, want $\\displaystyle\\int_0^2 x\\dx=2$. Dus $k=3$.",
"controle": {
"velden": [
{
"label": "$k$",
"waarde": 3.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o21",
"nr": 32,
"soort": "opdracht",
"niveau": 2,
"opgave": "Bewijs met Riemannsommen:",
"lijst": "reeks",
"kolommen": 2,
"delen": [
{
"opgave": "$\\ig_a^b r f(x)\\dx = r \\ig_a^b f(x)\\dx$",
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"opgave": "$\\ig_a^b r\\dx = r(b - a)$",
"antwoord": null,
"uitwerking": null,
"controle": null
}
],
"antwoord": "Zie de uitgewerkte oplossingen.",
"uitwerking": "$\\displaystyle\\sum_{k=1}^{n} r f(c_k)\\,\\Delta x=r\\sum_{k=1}^{n} f(c_k)\\,\\Delta x$. Neem aan beide kanten de limiet.<br>\nVoor de constante functie is elke Riemannsom gelijk aan $n\\cdot r\\cdot\\dfrac{b-a}{n}=r(b-a)$, en dat is dus ook de limiet.",
"controle": null
},
{
"id": "h1-o22",
"nr": 33,
"soort": "opdracht",
"niveau": 3,
"opgave": "Gebruik de bovensom.",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Toon aan: $\\ig_0^a x^2\\dx = \\dfrac{a^3}{3}$ voor elke $a > 0$.",
"antwoord": null,
"uitwerking": "$\\Delta x=\\tfrac{a}{n}$ en $x_k=\\tfrac{ak}{n}$, dus $B_n=\\dfrac{a^3}{n^3}\\displaystyle\\sum_{k=1}^{n} k^2=\\dfrac{a^3(n+1)(2n+1)}{6n^2}$, met limiet $\\dfrac{a^3\\cdot 2}{6}=\\dfrac{a^3}{3}$.",
"controle": null
},
{
"opgave": "Bereken daarmee $\\ig_1^4 x^2\\dx$ en $\\ig_{-1}^{2} (x^2 + 1)\\dx$.",
"antwoord": "21 en 6",
"uitwerking": "$\\displaystyle\\int_1^4 x^2\\dx=\\dfrac{64}{3}-\\dfrac13=21$. $x^2$ is even, dus $\\displaystyle\\int_{-1}^{0} x^2\\dx=\\int_0^1 x^2\\dx=\\tfrac13$. Samen met $\\int_0^2 x^2\\dx=\\tfrac83$ en de rechthoek 3: $\\tfrac13+\\tfrac83+3=6$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 21.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
},
{
"label": "",
"waarde": 6.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o23",
"nr": 34,
"soort": "opdracht",
"niveau": 3,
"opgave": "Er geldt $\\displaystyle\\sum_{k=1}^{n} k^3 = \\Bigl(\\dfrac{n(n+1)}{2}\\Bigr)^{\\!2}$. Bereken $\\ig_0^2 x^3\\dx$ als limiet van de bovensom.",
"antwoord": "4",
"uitwerking": "$\\Delta x=\\tfrac2n$ en $x_k=\\tfrac{2k}{n}$, dus $B_n=\\dfrac{16}{n^4}\\displaystyle\\sum_{k=1}^{n} k^3=\\dfrac{16}{n^4}\\cdot\\dfrac{n^2(n+1)^2}{4}=\\dfrac{4(n+1)^2}{n^2}$, met limiet 4.",
"controle": {
"velden": [
{
"label": "",
"waarde": 4.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-o24",
"nr": 35,
"soort": "opdracht",
"niveau": 3,
"opgave": "Niemand kan $\\ig_0^1 \\e^{-x^2}\\dx$ uitrekenen met een formule, maar je kunt de waarde wel insluiten.",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Waarom geldt $1 - x^2 \\leqslant \\e^{-x^2} \\leqslant 1$ op $[0, 1]$? Gebruik dat $\\e^u \\geqslant 1 + u$ voor elke $u$.",
"antwoord": null,
"uitwerking": "Met $u=-x^2$ krijg je $\\e^{-x^2}\\geqslant 1-x^2$. Omdat $-x^2\\leqslant 0$ is ook $\\e^{-x^2}\\leqslant\\e^0=1$.",
"controle": null
},
{
"opgave": "Toon aan: $\\tfrac23 \\leqslant \\ig_0^1 \\e^{-x^2}\\dx \\leqslant 1$. Je mag $\\int_0^1 x^2\\dx = \\tfrac13$ gebruiken.",
"antwoord": null,
"uitwerking": "Vergelijken geeft $\\displaystyle\\int_0^1(1-x^2)\\dx\\leqslant\\int_0^1\\e^{-x^2}\\dx\\leqslant\\int_0^1 1\\dx$, en links staat $1-\\tfrac13=\\tfrac23$.",
"controle": null
}
],
"antwoord": "Zie de uitgewerkte oplossingen.",
"uitwerking": null,
"controle": null
},
{
"id": "h1-o25",
"nr": 36,
"soort": "opdracht",
"niveau": 3,
"opgave": "Neem de functie $D$ op $[0, 1]$ met $D(x) = 1$ als $x$ rationaal is, en $D(x) = 0$ als $x$ irrationaal is.",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "In elk deel van $[0, 1]$ liggen rationale en irrationale getallen. Hoe groot is $B_n$? En $O_n$?",
"antwoord": "$B_n=1$ en $O_n=0$",
"uitwerking": "De grootste waarde in elk deel is 1, de kleinste 0. Dus $B_n=n\\cdot\\tfrac1n\\cdot 1=1$ en $O_n=0$ voor elke $n$.",
"controle": {
"velden": [
{
"label": "$B_n$",
"waarde": 1.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
},
{
"label": "$O_n$",
"waarde": 0.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Waarom bestaat de limiet uit de definitie van de bepaalde integraal hier niet? Welke voorwaarde uit de definitie is niet voldaan?",
"antwoord": null,
"uitwerking": "De Riemannsom hangt af van de keuze van de punten $c_k$: de limiet is 1 of 0, of iets anders. De functie is niet continu, en dat was de voorwaarde.",
"controle": null
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-o26",
"nr": 37,
"soort": "opdracht",
"niveau": 3,
"opgave": "Stel dat $f$ continu is op $[a, b]$ en dat $\\ig_a^b f(x)\\dx = 0$. Bewijs dat de grafiek van $f$ de horizontale as op $[a, b]$ minstens één keer raakt of snijdt.",
"antwoord": "Gebruik de middelwaardestelling.",
"uitwerking": "Volgens de middelwaardestelling is er een $c\\in[a,b]$ met $f(c)\\,(b-a)=0$. Omdat $b\\neq a$ (anders staat er niets te bewijzen) is $f(c)=0$.",
"controle": null
},
{
"id": "h1-koppel-1",
"nr": 38,
"soort": "koppel",
"niveau": 3,
"opgave": "We berekenen $\\ig_0^1 2^x\\dx$ met een bovensom. De termen vormen een meetkundige rij.",
"koppel": {
"rubriek": "discreet",
"onderwerp": "Rijen"
},
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Toon aan: $B_n = \\dfrac1n\\bigl(2^{1/n} + 2^{2/n} + \\cdots + 2^{n/n}\\bigr) = \\dfrac1n \\cdot 2^{1/n} \\cdot \\dfrac{1}{2^{1/n} - 1}$.",
"antwoord": null,
"uitwerking": "De functie stijgt, $\\Delta x=\\tfrac1n$. De rij heeft eerste term $2^{1/n}$, reden $q=2^{1/n}$ en $n$ termen, dus de som is $2^{1/n}\\cdot\\dfrac{q^{\\,n}-1}{q-1}=2^{1/n}\\cdot\\dfrac{2-1}{2^{1/n}-1}$.",
"controle": null
},
{
"opgave": "Bereken $B_{10}$ en $B_{100}$ op vier decimalen.",
"antwoord": "$B_{10}\\approx 1{,}4933$ en $B_{100}\\approx 1{,}4477$",
"uitwerking": "Rechtstreeks invullen.",
"controle": {
"velden": [
{
"label": "$B_{10}$",
"waarde": 1.4933,
"tol": 6e-05,
"exact": false,
"eenheid": ""
},
{
"label": "$B_{100}$",
"waarde": 1.4477,
"tol": 6e-05,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Stel $h = \\tfrac1n$ en gebruik $\\displaystyle\\lim_{h \\to 0} \\dfrac{2^h - 1}{h} = \\ln 2$. Bereken de limiet van $B_n$.",
"antwoord": "$\\dfrac{1}{\\ln 2}\\approx 1{,}4427$",
"uitwerking": "$B_n=2^h\\cdot\\dfrac{h}{2^h-1}$, en dat gaat naar $1\\cdot\\dfrac{1}{\\ln 2}$.",
"controle": {
"velden": [
{
"label": "$\\dfrac{1}{\\ln 2}$",
"waarde": 1.4427,
"tol": 6e-05,
"exact": false,
"eenheid": ""
}
]
}
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-koppel-2",
"nr": 39,
"soort": "koppel",
"niveau": 2,
"opgave": "De oppervlakte van een cirkel is de limiet van een som van driehoeken. Teken in een cirkel met straal $r$ een regelmatige $n$-hoek, en verbind de hoekpunten met het middelpunt.",
"koppel": {
"rubriek": "meetkunde",
"onderwerp": "Goniometrie"
},
"figuur": "<img class=\"fig\" src=\"assets/fig/h1-45.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\">",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Toon aan dat de $n$-hoek oppervlakte $\\dfrac{n r^2}{2} \\sin\\dfrac{2\\pi}{n}$ heeft.",
"antwoord": null,
"uitwerking": "Elke driehoek heeft twee zijden $r$ met tophoek $\\tfrac{2\\pi}{n}$, dus oppervlakte $\\tfrac12 r^2\\sin\\tfrac{2\\pi}{n}$. Er zijn $n$ driehoeken.",
"controle": null
},
{
"opgave": "Bereken die oppervlakte voor $r = 1$ en $n = 6$, $n = 12$ en $n = 100$, op vier decimalen.",
"antwoord": "$2{,}5981$; $3{,}0000$; $3{,}1395$",
"uitwerking": "Rechtstreeks invullen, in radialen.",
"controle": {
"velden": [
{
"label": "",
"waarde": 2.5981,
"tol": 6e-05,
"exact": false,
"eenheid": ""
},
{
"label": "",
"waarde": 3.0,
"tol": 6e-05,
"exact": false,
"eenheid": ""
},
{
"label": "",
"waarde": 3.1395,
"tol": 6e-05,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Gebruik $\\displaystyle\\lim_{h \\to 0} \\dfrac{\\sin h}{h} = 1$ met $h = \\tfrac{2\\pi}{n}$ om de limiet voor $n \\to +\\infty$ te bepalen.",
"antwoord": "$\\pi r^2$",
"uitwerking": "$\\dfrac{nr^2}{2}\\sin\\dfrac{2\\pi}{n}=\\pi r^2\\cdot\\dfrac{\\sin h}{h}$, en dat gaat naar $\\pi r^2$.",
"controle": null
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-koppel-3",
"nr": 40,
"soort": "koppel",
"niveau": 2,
"opgave": "Bij een histogram met ongelijke klassen is de oppervlakte van een staaf de relatieve frequentie, en niet de hoogte. Van de lengte van 200 leerlingen (in cm) weet je: 20% in $[150, 160[$, 50% in $[160, 175[$ en 30% in $[175, 190[$.",
"koppel": {
"rubriek": "data",
"onderwerp": "Statistiek"
},
"figuur": "<img class=\"fig\" src=\"assets/fig/h1-46.svg\" alt=\"Grafiek bij de opgave, zoals in het boek\" loading=\"lazy\">",
"lijst": "enumerate",
"kolommen": 1,
"delen": [
{
"opgave": "Bereken de hoogte van elke staaf. Wat is de totale oppervlakte?",
"antwoord": "$0{,}02$; $\\tfrac{1}{30}$; $0{,}02$ en oppervlakte 1",
"uitwerking": "$\\tfrac{0{,}20}{10}=0{,}02$, $\\tfrac{0{,}50}{15}=\\tfrac1{30}$ en $\\tfrac{0{,}30}{15}=0{,}02$. De totale oppervlakte is $0{,}2+0{,}5+0{,}3=1$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 0.02,
"tol": 0.006,
"exact": false,
"eenheid": ""
},
{
"label": "",
"waarde": 0.03333333,
"tol": 1e-06,
"exact": true,
"eenheid": ""
},
{
"label": "",
"waarde": 0.02,
"tol": 0.006,
"exact": false,
"eenheid": ""
},
{
"label": "oppervlakte",
"waarde": 1.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"opgave": "Stel dat de lengtes gelijkmatig over de klassen verdeeld zijn. Welk deel van de leerlingen is korter dan 170 cm?",
"antwoord": "$\\tfrac{8}{15}\\approx 53{,}3\\%$",
"uitwerking": "$0{,}20+10\\cdot\\tfrac{1}{30}=\\tfrac15+\\tfrac13=\\tfrac{8}{15}$.",
"controle": null
},
{
"opgave": "Wat wordt het histogram als je de klassen steeds smaller maakt? Hoe bereken je dan het deel van de leerlingen tussen $a$ en $b$?",
"antwoord": "met een integraal",
"uitwerking": "De staven worden een kromme, de dichtheidsfunctie $f$ met totale oppervlakte 1. Het deel tussen $a$ en $b$ is $\\displaystyle\\int_a^b f(x)\\dx$.",
"controle": null
}
],
"antwoord": null,
"uitwerking": null,
"controle": null
},
{
"id": "h1-t1",
"nr": 41,
"soort": "test",
"niveau": 1,
"opgave": "Bereken $O_4$ en $B_4$ voor $f(x) = 4 - x^2$ op $[0, 2]$.",
"antwoord": "$O_4=4{,}25$ en $B_4=6{,}25$",
"uitwerking": "$\\Delta x=\\tfrac12$. De functie daalt; de waarden zijn $4;\\ 3{,}75;\\ 3;\\ 1{,}75;\\ 0$.<br>\n$O_4=\\tfrac12(3{,}75+3+1{,}75+0)=4{,}25$ en $B_4=\\tfrac12(4+3{,}75+3+1{,}75)=6{,}25$.",
"controle": {
"velden": [
{
"label": "$O_4$",
"waarde": 4.25,
"tol": 0.006,
"exact": false,
"eenheid": ""
},
{
"label": "$B_4$",
"waarde": 6.25,
"tol": 0.006,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-t2",
"nr": 42,
"soort": "test",
"niveau": 2,
"opgave": "Bereken $\\ig_0^1 4x\\dx$ als limiet van de bovensom.",
"antwoord": "2",
"uitwerking": "$\\Delta x=\\tfrac1n$ en $x_k=\\tfrac{k}{n}$, dus $B_n=\\displaystyle\\sum_{k=1}^{n}\\dfrac{4k}{n}\\cdot\\dfrac1n=\\dfrac{4}{n^2}\\cdot\\dfrac{n(n+1)}{2}=\\dfrac{2(n+1)}{n}$, met limiet 2.",
"controle": {
"velden": [
{
"label": "",
"waarde": 2.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-t3",
"nr": 43,
"soort": "test",
"niveau": 1,
"opgave": "Schrijf $\\displaystyle\\lim_{n \\to +\\infty} \\sum_{k=1}^{n} \\Bigl(1 + \\dfrac{k}{n}\\Bigr)^{\\!3} \\cdot \\dfrac1n$ als een bepaalde integraal.",
"antwoord": "$\\displaystyle\\int_1^2 x^3\\dx$",
"uitwerking": "$\\Delta x=\\tfrac1n$ en $x_k=1+\\tfrac{k}{n}$ loopt van 1 tot 2.",
"controle": null
},
{
"id": "h1-t4",
"nr": 44,
"soort": "test",
"niveau": 1,
"opgave": "Bereken $\\ig_{-1}^{3} 2x\\dx$ en de werkelijke oppervlakte tussen de grafiek en de horizontale as op dat interval.",
"antwoord": "Integraal 8 en oppervlakte 10",
"uitwerking": "Onder de as: $\\tfrac12\\cdot 1\\cdot 2=1$. Erboven: $\\tfrac12\\cdot 3\\cdot 6=9$. De integraal is $9-1=8$, de oppervlakte $9+1=10$.",
"controle": {
"velden": [
{
"label": "Integraal",
"waarde": 8.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
},
{
"label": "oppervlakte",
"waarde": 10.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-t5",
"nr": 45,
"soort": "test",
"niveau": 2,
"opgave": "De snelheid van een voorwerp is $v(t) = 2t - 4$ (in m/s) op $[0, 5]$. Bereken de verplaatsing en de afgelegde weg.",
"antwoord": "Verplaatsing 5 m, afgelegde weg 13 m",
"uitwerking": "De snelheid is 0 voor $t=2$. Onder de as: $\\tfrac12\\cdot 2\\cdot 4=4$. Erboven: $\\tfrac12\\cdot 3\\cdot 6=9$. Verplaatsing $9-4=5$ m, afgelegde weg $9+4=13$ m.",
"controle": {
"velden": [
{
"label": "Verplaatsing",
"waarde": 5.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
},
{
"label": "afgelegde weg",
"waarde": 13.0,
"tol": 1e-06,
"exact": false,
"eenheid": "m"
}
]
}
},
{
"id": "h1-t6",
"nr": 46,
"soort": "test",
"niveau": 1,
"opgave": "Gegeven: $\\ig_0^4 f(x)\\dx = 6$,  $\\ig_0^1 f(x)\\dx = 2$ en $\\ig_1^4 g(x)\\dx = -1$.<br> Bereken $\\ig_1^4 \\bigl(f(x) - 2g(x)\\bigr)\\dx$.",
"antwoord": "6",
"uitwerking": "$\\displaystyle\\int_1^4 f(x)\\dx=6-2=4$, dus de uitkomst is $4-2\\cdot(-1)=6$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 6.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-t7",
"nr": 47,
"soort": "test",
"niveau": 1,
"opgave": "Bereken $\\ig_{-2}^{2} (x^3 + 2)\\dx$.",
"antwoord": "8",
"uitwerking": "$x^3$ is oneven en geeft 0. De rechthoek geeft $4\\cdot 2=8$.",
"controle": {
"velden": [
{
"label": "",
"waarde": 8.0,
"tol": 1e-06,
"exact": false,
"eenheid": ""
}
]
}
},
{
"id": "h1-t8",
"nr": 48,
"soort": "test",
"niveau": 1,
"opgave": "Bereken de gemiddelde waarde van $f(x) = 3 - x$ op $[0, 3]$ en de waarde $c$ uit de middelwaardestelling.",
"antwoord": "Gemiddelde $\\tfrac32$ en $c=\\tfrac32$",
"uitwerking": "De integraal is $\\tfrac12\\cdot 3\\cdot 3=\\tfrac92$, en $\\tfrac92\\cdot\\tfrac13=\\tfrac32$. Uit $3-c=\\tfrac32$ volgt $c=\\tfrac32$.",
"controle": {
"velden": [
{
"label": "Gemiddelde",
"waarde": 1.5,
"tol": 1e-06,
"exact": true,
"eenheid": ""
},
{
"label": "$c$",
"waarde": 1.5,
"tol": 1e-06,
"exact": true,
"eenheid": ""
}
]
}
}
],
"voorbeelden": {
"h1-oboven": 1,
"h1-limiet": 2,
"h1-limiet2": 3,
"h1-riemann": 4,
"h1-herken": 5,
"h1-georienteerd": 6,
"h1-cirkel": 7,
"h1-eenheden": 8,
"h1-snelheid": 9,
"h1-regels": 10,
"h1-regelskort": 11,
"h1-symmetrie": 12,
"h1-even": 13,
"h1-gemiddelde": 14
},
"herhaal": [
{
"test": "h1-t1",
"voorbeeld": "h1-oboven",
"oefening": "h1-oboven"
},
{
"test": "h1-t2",
"voorbeeld": "h1-limiet",
"oefening": "h1-limiet"
},
{
"test": "h1-t3",
"voorbeeld": "h1-herken",
"oefening": "h1-herken"
},
{
"test": "h1-t4",
"voorbeeld": "h1-georienteerd",
"oefening": "h1-georienteerd"
},
{
"test": "h1-t5",
"voorbeeld": "h1-snelheid",
"oefening": "h1-snelheid"
},
{
"test": "h1-t6",
"voorbeeld": "h1-regels",
"oefening": "h1-regels"
},
{
"test": "h1-t7",
"voorbeeld": "h1-symmetrie",
"oefening": "h1-symmetrie"
},
{
"test": "h1-t8",
"voorbeeld": "h1-gemiddelde",
"oefening": "h1-gemiddelde"
}
]
};
