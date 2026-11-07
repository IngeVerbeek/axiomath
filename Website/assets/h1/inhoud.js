/* Hoofdstuk 1 voor de website. De tekst komt uit hoofdstukken/01-bepaalde-integraal.tex; de labs zijn eigen aan de website.
   Oefeningen staan hier alleen als data-oef="id": de inhoud komt uit de oefeningenbank, via maak-site.py. */
(function () {
  const H = String.raw;
  const kop = (eyebrow, titel, intro = '') => H`<header class="view-kop"><p class="eyebrow">${eyebrow}</p><h2>${titel}</h2>${intro}</header>`;
  const S1 = '1.1 Van som naar oppervlakte', S2 = '1.2 Georiënteerde oppervlakte', S3 = '1.3 Rekenregels';

  const views = [
    {
      id: 'h1-start', titel: 'De bepaalde integraal', kort: 'Start', groep: 'Hoofdstuk 1',
      html: H`
      <header class="hs-held">
        <canvas id="h1-stipjes" aria-hidden="true"></canvas>
        <div class="hs-held-tekst">
          <p class="eyebrow">Hoofdstuk 1</p>
          <h1>De bepaalde integraal</h1>
        </div>
      </header>
      <div class="lees">
        <p class="intro">Uit een constante snelheid haal je meteen een afstand: snelheid maal tijd. Maar een auto rijdt zelden constant. Hoe ver rijdt hij dan? Op een grafiek van de snelheid wordt dat dezelfde vraag als: hoe groot is de oppervlakte onder de grafiek? En voor een gebied onder een kromme ken je geen formule.</p>
      </div>
      <div data-lab="rit"></div>
      <div class="lees">
        <p>In dit hoofdstuk pakken we dat aan met iets wat je al kunt: rechthoeken optellen. We snijden het gebied in smalle stroken, tellen ze op en kijken wat er gebeurt als de stroken steeds smaller worden. Zo komen we bij de bepaalde integraal. Het rekenwerk is hier nog omslachtig; in hoofdstuk 2 komt een veel snellere manier. Eerst moet je goed zien wat een integraal is.</p>
      </div>
      <h3 class="strook">Start</h3>
      <div data-oef="h1-start-1"></div>
      <div data-oef="h1-verken"></div>
      <div data-lab="fietser"></div>`,
    },
    {
      id: 'h1-ondersom', titel: 'Ondersom en bovensom', groep: S1,
      html: H`${kop(S1, 'Ondersom en bovensom')}
      <div class="lees">
        <p>Bekijk een functie $f$ die op $[a, b]$ positief is. We zoeken de oppervlakte $A$ van het gebied tussen de grafiek, de horizontale as en de verticale rechten $x = a$ en $x = b$.</p>
        <p>Voor zo'n gebied bestaat geen formule, voor een rechthoek wel. Daarom verdelen we het interval in stukken die even breed zijn, en zetten we op elk stuk een rechthoek. Kies je de kleinste functiewaarde als hoogte, dan blijft de rechthoek onder de grafiek en krijg je te weinig. Kies je de grootste, dan steekt ze erboven uit en krijg je te veel. De echte oppervlakte zit daartussen.</p>
      </div>
      <div class="naast-fig">
        <div class="lees"><p>De figuur toont dat voor een algemene functie, die op $[a, b]$ eerst stijgt en dan daalt. Elk stuk heeft een donkere rechthoek met de kleinste functiewaarde en een lichtere met de grootste. De kleinste waarde ligt dus niet altijd links: dat hangt ervan af of de functie op dat stuk stijgt of daalt.</p></div>
        <div data-figuur="alg-rechthoek"></div>
      </div>
      <div class="theorie">
        <p>Verdeel $[a, b]$ in $n$ delen met dezelfde breedte <span class="formule">$\Delta x = \dfrac{b - a}{n}$</span>. Neem op elk deel een rechthoek.</p>
        <p><b class="begrip">Ondersom</b> $O_n$: de hoogte is telkens de kleinste functiewaarde op dat deel.</p>
        <p><b class="begrip">Bovensom</b> $B_n$: de hoogte is telkens de grootste functiewaarde op dat deel.</p>
        <div class="stelling"><span class="stelling-naam">Oppervlakte insluiten</span>
          <p>Is $f(x) \geqslant 0$ op $[a, b]$ en is $A$ de oppervlakte onder de grafiek, dan geldt <span class="formule">$O_n \leqslant A \leqslant B_n$</span></p>
        </div>
      </div>
      <div class="lees"><p>Bij dezelfde functie zie je de ongelijkheid meteen: de rechthoeken van de ondersom passen in het gebied, en het gebied past in de rechthoeken van de bovensom.</p></div>
      <div data-figuur="ongelijkheid"></div>
      <div data-lab="onderboven"></div>
      <div class="lees"><p>Laten we dat nu uitrekenen voor een concrete functie.</p></div>
      <div data-voorbeeld="h1-oboven"></div>
      <div class="werkwijze"><span class="werkwijze-label">Werkwijze</span>
        <p>Bereken $\Delta x$ en de deelpunten. Stijgt $f$, dan zit de kleinste waarde links en de grootste rechts in elk deel. Daalt $f$, dan is het omgekeerd. Tel de functiewaarden op en vermenigvuldig met $\Delta x$.</p>
      </div>
      <div data-nujij="nj-oboven"></div>
      <div data-oef="h1-oboven"></div>`,
    },
    {
      id: 'h1-limiet-som', titel: 'De limiet van de som', groep: S1,
      html: H`${kop(S1, 'De limiet van de som')}
      <div class="lees">
        <p>Verdeel je het interval fijner, dan passen de rechthoeken beter bij de grafiek. De stukjes die boven de grafiek uitsteken, worden steeds kleiner. Ook de cijfers tonen dat: ondersom en bovensom naderen elkaar van twee kanten, en lijken naar hetzelfde getal te gaan.</p>
      </div>
      <div data-lab="onderboven" data-verloop="ja"></div>
      <div class="lees">
        <p>Dat kunnen we ook algebraïsch tonen. Omdat $f$ stijgt, staan in $O_n$ en $B_n$ bijna dezelfde hoogtes: alleen de eerste hoogte $f(0)$ valt weg en de laatste $f(2)$ komt erbij. Dus</p>
        $$B_n - O_n = \bigl(f(2) - f(0)\bigr)\,\Delta x = 4 \cdot \frac{2}{n} = \frac{8}{n},$$
        <p>en dat gaat naar 0 voor $n \to +\infty$. Uit $O_n \leqslant A \leqslant B_n$ volgt bovendien</p>
        $$0 \leqslant A - O_n \leqslant B_n - O_n \qquad\text{en}\qquad 0 \leqslant B_n - A \leqslant B_n - O_n.$$
        <p>Volgens de insluitstelling gaan $A - O_n$ en $B_n - A$ dus allebei naar 0. Ondersom en bovensom hebben dezelfde limiet, en die limiet is precies de oppervlakte $A$.</p>
        <p>Welk getal is dat? Om dat te weten, moeten we de som opschrijven met $n$ als letter en de limiet nemen voor $n \to +\infty$. We doen dat één keer helemaal, voor een iets groter interval.</p>
      </div>
      <div data-voorbeeld="h1-limiet"></div>
      <div data-voorbeeld="h1-limiet2"></div>
      <div class="lees">
        <p>Bij een rechte lijn, zoals in de oefening hieronder, staan in de som geen kwadraten maar de getallen $k$ zelf. Dan heb je deze somformule nodig:</p>
        $$\sum_{k=1}^{n} k = \frac{n(n+1)}{2}.$$
      </div>
      <div class="werkwijze"><span class="werkwijze-label">Werkwijze</span>
        <p>Schrijf het $k$-de deelpunt als $x_k = a + k \cdot \Delta x$. Stel de som op met $n$ als letter, haal alles wat niet van $k$ afhangt voor het somteken, gebruik de somformule en neem de limiet voor $n \to +\infty$.</p>
      </div>
      <div data-nujij="nj-limiet"></div>
      <div data-oef="h1-limiet"></div>`,
    },
    {
      id: 'h1-riemannsommen', titel: 'Riemannsommen', groep: S1,
      html: H`${kop(S1, 'Riemannsommen')}
      <div class="lees"><p>Je hoeft de hoogte van de rechthoeken niet per se als grootste of kleinste waarde te nemen: elke waarde in het deel is goed. Dat geeft een Riemannsom.</p></div>
      <div class="theorie theorie-fig">
        <div>
          <p>Een <b class="begrip">Riemannsom</b> van $f$ op $[a, b]$ is een som</p>
          <p class="formule-regel"><span class="formule">$\displaystyle\sum_{k=1}^{n} f(c_k)\,\Delta x$</span></p>
          <p>met $\Delta x = \dfrac{b-a}{n}$ en $c_k$ een willekeurig punt in het $k$-de deel.</p>
        </div>
        <div data-figuur="riemann-th"></div>
      </div>
      <div data-lab="ck"></div>
      <div data-voorbeeld="h1-riemann"></div>`,
    },
    {
      id: 'h1-integraal', titel: 'De bepaalde integraal', groep: S1, kort: 'De bepaalde integraal',
      html: H`${kop(S1, 'De bepaalde integraal')}
      <div class="lees"><p>Voor een continue functie hebben alle Riemannsommen dezelfde limiet, welke punten $c_k$ je ook kiest; dat aanvaarden we zonder bewijs. Die limiet krijgt een eigen naam en een eigen teken.</p></div>
      <div class="theorie">
        <p>De <b class="begrip">bepaalde integraal</b> van een continue functie $f$ van $a$ tot $b$ is de limiet van haar Riemannsommen:</p>
        <p class="formule-regel"><span class="formule">$\displaystyle\int_a^b f(x)\dx = \lim_{n \to +\infty} \sum_{k=1}^{n} f(c_k)\,\Delta x$</span></p>
        <p>$a$ is de ondergrens, $b$ de bovengrens, $f$ de integrand.</p>
      </div>
      <div data-lab="rekS"></div>
      <div class="lees">
        <p>Je leest $\int_a^b f(x)\dx$ als <em>de integraal van $a$ tot $b$ van $f(x)\,\mathrm{d}x$</em>. Het teken $\int$ is een uitgerekte S, van som, en $\mathrm{d}x$ herinnert aan de breedte $\Delta x$: de notatie vertelt dus nog hoe de integraal ontstaan is. De letter $x$ doet er niet toe, want $\int_a^b f(x)\dx = \int_a^b f(t)\dt$.</p>
        <p>Je kunt de definitie ook omgekeerd lezen. Staat er een limiet van een som met een factor $\tfrac1n$, dan zit er misschien een integraal in verstopt.</p>
      </div>
      <div data-voorbeeld="h1-herken"></div>
      <div data-nujij="nj-herken"></div>
      <div data-oef="h1-herken"></div>`,
    },
    {
      id: 'h1-teken', titel: 'Georiënteerde oppervlakte', groep: S2,
      html: H`${kop(S2, 'Georiënteerde oppervlakte')}
      <div class="lees"><p>Tot nu toe lag de grafiek boven de as, maar niets in de definitie verplicht dat. Als $f$ negatief is, dan is ook $f(c_k)\,\Delta x$ negatief, en dan telt die rechthoek in de som negatief mee. De integraal is dus geen gewone oppervlakte meer: stukken boven en onder de as kunnen elkaar opheffen.</p></div>
      <div class="theorie">
        <div class="stelling stelling-fig"><span class="stelling-naam">Georiënteerde oppervlakte</span>
          <div>
            <p>De bepaalde integraal telt oppervlakte boven de horizontale as positief, en oppervlakte eronder negatief:</p>
            <p class="formule-regel"><span class="formule">$\displaystyle\int_a^b f(x)\dx = A_1 - A_2 + A_3$</span></p>
            <p>De <b class="begrip">werkelijke</b> oppervlakte is $A_1 + A_2 + A_3$.</p>
          </div>
          <div data-figuur="georient-th"></div>
        </div>
      </div>
      <div data-lab="georient"></div>
      <div data-voorbeeld="h1-georienteerd"></div>
      <div class="werkwijze"><span class="werkwijze-label">Werkwijze</span>
        <p>Teken de grafiek. Splits het gebied waar de functie van teken wisselt. Bereken elk deel met een formule uit de meetkunde, en zet een minteken voor de delen onder de as.</p>
      </div>
      <div data-nujij="nj-georienteerd"></div>
      <div class="lees"><p>Niet alleen rechte lijnen lenen zich hiertoe. De functie $y = \sqrt{r^2 - x^2}$ is de bovenste helft van de cirkel $x^2 + y^2 = r^2$. Herken je die vorm, dan reken je met de oppervlakte van een cirkel.</p></div>
      <div data-voorbeeld="h1-cirkel"></div>
      <div data-oef="h1-georienteerd"></div>`,
    },
    {
      id: 'h1-betekenis', titel: 'Wat betekent een georiënteerde oppervlakte?', kort: 'Wat betekent ze?', groep: S2,
      html: H`${kop(S2, 'Wat betekent een georiënteerde oppervlakte?')}
      <div class="lees">
        <p>Een oppervlakte die negatief telt: wat moet je je daarbij voorstellen? In een toepassing is het antwoord vaak eenvoudig. Op een snelheidsgrafiek betekent een stuk onder de as dat je achteruit gaat, dus die meters tellen terecht negatief. De integraal geeft dan de <b class="begrip">verplaatsing</b>, en de werkelijke oppervlakte de <b class="begrip">afgelegde weg</b>.</p>
        <p>Welke grootheid je berekent, lees je af uit de eenheden: de eenheid van een integraal is de eenheid op de verticale as maal de eenheid op de horizontale as. Snelheid in m/s maal tijd in s geeft meter.</p>
      </div>
      <div data-voorbeeld="h1-eenheden"></div>
      <div data-voorbeeld="h1-snelheid"></div>
      <div data-lab="robot"></div>
      <div data-nujij="nj-snelheid"></div>
      <div data-oef="h1-snelheid"></div>`,
    },
    {
      id: 'h1-grenzen', titel: 'Grenzen, som en veelvoud', groep: S3,
      html: H`${kop(S3, 'Grenzen, som en veelvoud')}
      <div class="lees">
        <p>Veel rekenregels zie je meteen op een grafiek. Leg twee gebieden naast elkaar, dan tellen hun oppervlaktes op: dat is de optelbaarheid. Ligt de ene grafiek boven de andere, dan is ook de integraal groter: dat is de regel om te vergelijken. En verdubbel je een functie, dan verdubbelt elke hoogte, en dus ook de oppervlakte.</p>
        <p>Bij het omwisselen van de grenzen is er geen figuur die helpt: dat is een afspraak. We kiezen die zo dat de optelbaarheid ook geldt als $b$ niet tussen $a$ en $c$ ligt.</p>
      </div>
      <div data-lab="regels"></div>
      <div class="theorie">
        <div class="stelling"><span class="stelling-naam">Rekenregels</span>
          <p>Voor continue functies $f$ en $g$:</p>
          <div class="tabel-wrap"><table class="regeltabel"><tbody>
            <tr><th>Gelijke grenzen</th><td class="formule">$\displaystyle\int_a^a f(x)\dx = 0$</td></tr>
            <tr><th>Grenzen wisselen</th><td class="formule">$\displaystyle\int_b^a f(x)\dx = -\int_a^b f(x)\dx$</td></tr>
            <tr><th>Optelbaarheid</th><td class="formule">$\displaystyle\int_a^b f(x)\dx + \int_b^c f(x)\dx = \int_a^c f(x)\dx$</td></tr>
            <tr><th>Lineariteit</th><td class="formule">$\displaystyle\int_a^b \bigl(r f(x) + s g(x)\bigr)\dx = r\int_a^b f(x)\dx + s\int_a^b g(x)\dx$</td></tr>
            <tr><th>Vergelijken, als $a \leqslant b$ en $f(x) \leqslant g(x)$ op $[a, b]$</th><td class="formule">$\displaystyle\int_a^b f(x)\dx \leqslant \int_a^b g(x)\dx$</td></tr>
          </tbody></table></div>
        </div>
        <details class="bewijs"><summary>Bewijs</summary>
          <p>De eerste twee regels zijn afspraken; optelbaarheid en vergelijken lees je af op de figuren hierboven. Voor de lineariteit nemen we een Riemannsom van $rf + sg$. Omdat $r$ en $s$ niet van $k$ afhangen, is</p>
          $$\sum_{k=1}^{n} \bigl(r f(c_k) + s g(c_k)\bigr)\Delta x = r \sum_{k=1}^{n} f(c_k)\,\Delta x + s \sum_{k=1}^{n} g(c_k)\,\Delta x.$$
          <p>Voor $n \to +\infty$ volgt hieruit de regel. <i class="qed" aria-hidden="true"></i></p>
        </details>
      </div>
      <div data-voorbeeld="h1-regels"></div>
      <div data-voorbeeld="h1-regelskort"></div>
      <div data-nujij="nj-regels"></div>
      <div data-oef="h1-regels"></div>`,
    },
    {
      id: 'h1-even-oneven', titel: 'Even en oneven functies', groep: S3,
      html: H`${kop(S3, 'Even en oneven functies')}
      <div class="lees"><p>Soms hoef je helemaal niet te rekenen, omdat de grafiek symmetrisch is. Een even functie is symmetrisch ten opzichte van de verticale as: de oppervlakte links is even groot als die rechts. Een oneven functie is symmetrisch ten opzichte van de oorsprong: het stuk onder de as is even groot als het stuk erboven, en samen geven ze 0.</p></div>
      <div data-lab="symmetrie"></div>
      <div class="theorie">
        <div class="stelling"><span class="stelling-naam">Even en oneven functies</span>
          <p>Voor een continue functie op $[-a, a]$:</p>
          <p>$f$ even, dus $f(-x) = f(x)$: <span class="formule">$\displaystyle\int_{-a}^{a} f(x)\dx = 2\int_0^a f(x)\dx$</span></p>
          <p>$f$ oneven, dus $f(-x) = -f(x)$: <span class="formule">$\displaystyle\int_{-a}^{a} f(x)\dx = 0$</span></p>
        </div>
      </div>
      <div class="lees"><p>Let op: de regel voor oneven functies geldt alleen op een interval dat symmetrisch rond 0 ligt.</p></div>
      <div data-voorbeeld="h1-symmetrie"></div>
      <div data-voorbeeld="h1-even"></div>
      <div data-nujij="nj-even"></div>
      <div data-oef="h1-symmetrie"></div>`,
    },
    {
      id: 'h1-gemiddeld', titel: 'Gemiddelde waarde', groep: S3,
      html: H`${kop(S3, 'Gemiddelde waarde')}
      <div class="lees">
        <p>Wat is de gemiddelde temperatuur op een dag, als die voortdurend verandert? Meet je $n$ keer, dan is het gemiddelde</p>
        $$\frac{f(c_1) + f(c_2) + \cdots + f(c_n)}{n} = \frac{1}{b - a} \sum_{k=1}^{n} f(c_k)\,\Delta x,$$
        <p>want $\tfrac1n = \tfrac{\Delta x}{b - a}$. Meet je steeds vaker, dan wordt die som een integraal. Meetkundig betekent dit: maak het gebied onder de grafiek plat tot een rechthoek op hetzelfde interval, met dezelfde oppervlakte. De hoogte van die rechthoek is de gemiddelde waarde. Omdat de grafiek ergens door die hoogte moet gaan, is de gemiddelde waarde ook echt een functiewaarde: dat is de middelwaardestelling.</p>
      </div>
      <div data-lab="gemiddelde"></div>
      <div class="theorie">
        <p>De <b class="begrip">gemiddelde waarde</b> van $f$ op $[a, b]$ is <span class="formule">$\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\dx$</span></p>
        <div class="stelling stelling-fig"><span class="stelling-naam">Middelwaardestelling</span>
          <div>
            <p>Is $f$ continu op $[a, b]$, dan is er een $c \in [a, b]$ met</p>
            <p class="formule-regel"><span class="formule">$\displaystyle\int_a^b f(x)\dx = f(c)\,(b-a)$</span></p>
          </div>
          <div data-figuur="mvs-th"></div>
        </div>
        <details class="bewijs"><summary>Bewijs</summary>
          <p>Noem $m$ en $M$ het minimum en het maximum van $f$ op $[a, b]$; die bestaan omdat $f$ continu is. Uit $m \leqslant f(x) \leqslant M$ volgt met de regel om te vergelijken</p>
          $$m(b - a) \leqslant \int_a^b f(x)\dx \leqslant M(b - a), \quad\text{dus}\quad m \leqslant \dfrac{1}{b - a} \int_a^b f(x)\dx \leqslant M.$$
          <p>De drie figuren tonen die ongelijkheid: het gebied past tussen een lage en een hoge rechthoek op hetzelfde interval.</p>
          <div data-figuur="mvs-bewijs"></div>
          <p>De tussenwaardestelling geeft dan een $c \in [a, b]$ met</p>
          $$f(c) = \dfrac{1}{b - a} \int_a^b f(x)\dx, \quad\text{zodat}\quad \int_a^b f(x)\dx = f(c)\,(b - a).$$
          <p><i class="qed" aria-hidden="true"></i></p>
        </details>
      </div>
      <div data-voorbeeld="h1-gemiddelde"></div>
      <div data-nujij="nj-gemiddelde"></div>
      <div data-oef="h1-gemiddelde"></div>`,
    },
    {
      id: 'h1-opdrachten', titel: 'Opdrachten', groep: 'Oefenen', fel: true, reeks: 'opdracht',
      html: H`<header class="view-kop"><p class="eyebrow">Hoofdstuk 1</p><h2>Opdrachten</h2>
        <p class="kop-tekst">De opdrachten staan door elkaar: herken zelf welke methode je nodig hebt. Noteer je oplossing in je schrift en controleer daarna hier. De nummers zijn dezelfde als in het boek.</p></header>
      <div data-reeks="opdracht"></div>`,
    },
    {
      id: 'h1-koppel', titel: 'Koppel', groep: 'Oefenen', fel: true, reeks: 'koppel',
      html: H`<header class="view-kop"><p class="eyebrow">Hoofdstuk 1</p><h2>Koppel</h2>
        <p class="kop-tekst">Verbanden met andere leerstof.</p></header>
      <div data-reeks="koppel"></div>`,
    },
    {
      id: 'h1-test', titel: 'Test jezelf', groep: 'Oefenen', fel: true, reeks: 'test',
      html: H`<header class="view-kop"><p class="eyebrow">Hoofdstuk 1</p><h2>Test jezelf</h2>
        <p class="kop-tekst">Maak deze test zonder boek of notities. Onderaan zie je per vraag wat je moet herhalen als ze fout was.</p></header>
      <div data-reeks="test"></div>
      <div data-schema="h1"></div>`,
    },
  ];

  /* De macro's \dx en \dt moeten ook hier werken: KaTeX kent ze via kern.js. */
  window.Axiomath.registreer({ nr: 1, data: window.AXIOMATH_H1, views });
  window.addEventListener('DOMContentLoaded', () => {
    /* Open bewijzen geven een klein geluid; de stipjes op de openingsview starten als ze zichtbaar worden. */
    document.addEventListener('toggle', e => { if (e.target.matches?.('.bewijs')) Geluid.klik(); }, true);
  });
})();
