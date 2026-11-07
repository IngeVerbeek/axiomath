/* Hoofdstuk 1: de uitgewerkte voorbeelden, stap per stap, met hun figuren. De tekst komt uit het handboek.
   figuur(el) maakt de figuur en geeft een functie (stand, animeer) terug: stand = aantal getoonde stappen. */
(function () {
  const AX = window.Axiomath;
  const { Graf, fmt, riemann, somVan, tween, easeInOut } = G;
  const KW = x => x * x;

  /* Getimede reeks popgeluiden voor rechthoeken die verschijnen. */
  const popReeks = (n, dt = 70) => { for (let i = 0; i < n; i++) setTimeout(() => Geluid.pop(i / n), dt * i); };

  /* Laat n oplopen door een rij stops; geeft een stopfunctie terug. */
  function looptNaar(stops, cb, dt = 280) {
    let i = 0, tid;
    const volgende = () => { cb(stops[i], i); Geluid.tik(i / stops.length); i++; if (i < stops.length) tid = setTimeout(volgende, dt); };
    volgende();
    return () => clearTimeout(tid);
  }

  const V = AX.voorbeelden;

  V['h1-oboven'] = {
    opgave: 'Bereken $O_4$ en $B_4$ voor $f(x) = x^2$ op $[0, 2]$.',
    aanpak: 'We kunnen de oppervlakte niet rechtstreeks berekenen, dus sluiten we ze in tussen twee sommen van rechthoeken. Eerst bepalen we hoe breed de rechthoeken zijn, daarna welke hoogte elke rechthoek krijgt.',
    stappen: [
      { f: '\\Delta x = \\dfrac{2 - 0}{4} = \\dfrac12', t: 'Elk deel is $\\tfrac12$ breed, dus de deelpunten zijn $0,\\ \\tfrac12,\\ 1,\\ \\tfrac32,\\ 2$. De functie stijgt op $[0, 2]$: dat bepaalt waar de kleinste en de grootste waarde liggen.' },
      { f: 'O_4 = \\tfrac12\\bigl(0 + \\tfrac14 + 1 + \\tfrac94\\bigr) = \\tfrac74', t: 'Omdat $f$ stijgt, is de waarde links de kleinste van elk deel. We tellen de vier hoogtes op en vermenigvuldigen met de breedte.' },
      { f: 'B_4 = \\tfrac12\\bigl(\\tfrac14 + 1 + \\tfrac94 + 4\\bigr) = \\tfrac{15}{4}', t: 'Nu de waarde rechts, de grootste van elk deel. Drie hoogtes zijn dezelfde: alleen 0 valt weg en 4 komt erbij.' },
    ],
    slot: 'De echte oppervlakte ligt dus ergens tussen 1,75 en 3,75. Dat is nog ruim, maar het is een begin: we weten nu hoe we de oppervlakte kunnen insluiten.',
    probeer: ['nj-oboven', 'h1-oboven'],
    figuur(el) {
      const g = new Graf(el, { x: [-.1, 2.35], y: [-.2, 4.8], w: 460, h: 340, xticks: [.5, 1, 1.5, 2], yticks: [1, 2, 3, 4], rooster: true, label: 'De grafiek van x kwadraat op 0 tot 2 met vier rechthoeken' });
      const l = g.laag('rh');
      g.kromme(KW, 0, 2.1);
      const pt = [0, .5, 1, 1.5, 2].map(x => g.punt(x, 0, 'puntje puntje-klein'));
      const lab = g.formule(.72, 4.1, '', { b: 150, h: 34, klas: 'ac groot' });
      return (s, an) => {
        pt.forEach(p => { p.style.opacity = s >= 1 ? 1 : 0; });
        if (s < 2) { l.zet(riemann(KW, 0, 2, 4, 0).map(r => ({ ...r, h: 0 })), { direct: !an }); lab.zet(.72, 4.1, ''); }
        if (s === 2) { l.zet(riemann(KW, 0, 2, 4, 0), { stagger: an ? 70 : 0, direct: !an }); lab.zet(.72, 4.1, 'O_4 = 1{,}75'); if (an) popReeks(4); }
        if (s >= 3) { l.zet(riemann(KW, 0, 2, 4, 1), { stagger: an ? 70 : 0, direct: !an }); lab.zet(.72, 4.1, 'B_4 = 3{,}75'); if (an) popReeks(4); }
      };
    },
  };

  function limietFig(el, plaats, { eind }) {
    const f = KW;
    const g = new Graf(el, { x: [-.1, 3.4], y: [-.5, 10], w: 460, h: 360, xticks: [1, 2, 3], yticks: [2, 4, 6, 8], rooster: true, label: 'De grafiek van x kwadraat op 0 tot 3 met rechthoeken' });
    const l = g.laag('rh');
    const hl = g.laag('rh rh-accent');
    const vlak = g.gebied(f, 0, 3, 'vlak-echt');
    g.kromme(f, 0, 3.1);
    const k = 5, n0 = 6;
    const xk = g.formule(k * .5, -.2, 'x_k', { b: 40, h: 22, klas: 'ac' });
    const hoog = g.formule(2.5, 6.25 + .6, 'f(x_k)', { b: 60, h: 22, klas: 'ac' });
    const dx = g.formule(.25, 1.1, '\\Delta x', { b: 40, h: 22 });
    const lab = g.formule(.95, 8.6, '', { b: 170, h: 34, klas: 'ac groot' });
    let stop = null;
    const zetNaam = (naam, n) => lab.zet(.95, 8.6, `${naam}_{${n}} = ${fmt(somVan(riemann(f, 0, 3, n, plaats)))}`);
    const naam = plaats === 1 ? 'B' : 'O';
    const toonHulp = z => [xk, hoog, dx].forEach(e => { e.style.opacity = z ? 1 : 0; });
    return (s, an, _) => {
      if (stop) { stop(); stop = null; }
      vlak.classList.remove('zicht');
      if (s === 0) { l.zet(riemann(f, 0, 3, n0, plaats).map(r => ({ ...r, h: 0 })), { direct: !an }); hl.zet([], { direct: true }); toonHulp(false); lab.zet(.95, 8.6, ''); return; }
      if (s < eind) {
        l.zet(riemann(f, 0, 3, n0, plaats), { stagger: an && s === 1 ? 55 : 0, direct: !an });
        if (an && s === 1) popReeks(n0, 55);
        const h = plaats === 1 ? 6.25 : 4;
        hl.zet(plaats === 1 ? [{ x: 2, w: .5, h }] : [{ x: 2, w: .5, h: 4 }], { direct: !an });
        hoog.zet(2.5, h + .6);
        toonHulp(plaats === 1); zetNaam(naam, n0);
        return;
      }
      hl.zet([], { direct: true }); toonHulp(false);
      if (!an) { l.zet(riemann(f, 0, 3, 96, plaats), { direct: true }); zetNaam(naam, 96); }
      else stop = looptNaar([6, 12, 24, 48, 96], n => { l.zet(riemann(f, 0, 3, n, plaats)); zetNaam(naam, n); });
      if (eind === 3 && s >= 4) { vlak.classList.add('zicht'); lab.zet(.95, 8.6, 'A = 9'); if (stop) { stop(); stop = null; } l.zet(riemann(f, 0, 3, 96, plaats), { direct: !an }); }
    };
  }

  V['h1-limiet'] = {
    opgave: 'Bereken de limiet van de bovensom van $f(x) = x^2$ op $[0, 3]$.',
    aanpak: 'Nu houden we het aantal rechthoeken open: we schrijven $n$ en rekenen alsof het een gewoon getal is. De figuur toont de bovensom met $n = 6$. Elke rechthoek is $\\Delta x$ breed, en de $k$-de is $f(x_k)$ hoog. Pas op het einde laten we $n$ groeien.',
    stappen: [
      { f: '\\Delta x = \\dfrac{3}{n}, \\qquad x_k = \\dfrac{3k}{n}', t: 'De functie stijgt, dus de bovensom neemt de waarde rechts in elk deel. Dat rechterpunt van deel $k$ is $k$ keer de breedte.' },
      { f: 'B_n = \\sum_{k=1}^{n} \\Bigl(\\dfrac{3k}{n}\\Bigr)^{\\!2} \\cdot \\dfrac{3}{n} = \\dfrac{27}{n^3}\\sum_{k=1}^{n} k^2', t: 'Elke term is hoogte maal breedte. In de som verandert alleen $k$, dus 27 en $n$ mogen voor het somteken.' },
      { f: 'B_n = \\dfrac{27}{n^3} \\cdot \\dfrac{n(n+1)(2n+1)}{6}', t: 'Nu hebben we de somformule voor kwadraten nodig: $\\sum_{k=1}^{n} k^2 = \\tfrac{n(n+1)(2n+1)}{6}$. Daarmee is het somteken weg.' },
      { f: 'B_n = \\dfrac{9(n+1)(2n+1)}{2n^2}', t: 'Vereenvoudig met $3n$: er blijft één breuk over, met enkel nog $n$.' },
      { f: '\\lim_{n \\to +\\infty} B_n = \\dfrac{9 \\cdot 2}{2} = 9', t: 'Teller en noemer zijn allebei van de tweede graad, dus de hoogste machten bepalen de limiet: $\\tfrac{9 \\cdot 2n^2}{2n^2}$.' },
    ],
    slot: 'De bovensom gaat dus naar 9. Om zeker te zijn dat dit de oppervlakte is, hebben we ook de ondersom nodig: pas als die naar hetzelfde getal gaat, zit de oppervlakte ertussen vast.',
    figuur: el => limietFig(el, 1, { eind: 5 }),
  };

  V['h1-limiet2'] = {
    opgave: 'Bereken de limiet van de ondersom van $f(x) = x^2$ op $[0, 3]$, en besluit wat de oppervlakte is.',
    aanpak: 'De aanpak is dezelfde, maar elke rechthoek krijgt nu als hoogte de waarde links in het deel.',
    stappen: [
      { f: 'O_n = \\sum_{k=1}^{n} \\Bigl(\\dfrac{3(k-1)}{n}\\Bigr)^{\\!2} \\cdot \\dfrac{3}{n} = \\dfrac{27}{n^3}\\sum_{k=1}^{n-1} k^2', t: 'De waarde links in elk deel is die in het deelpunt ervoor. De term met $k = 1$ is 0, dus de som loopt in feite maar tot $n - 1$.' },
      { f: 'O_n = \\dfrac{9(n-1)(2n-1)}{2n^2}', t: 'Vul $n - 1$ in de plaats van $n$ in de somformule in, en vereenvoudig.' },
      { f: '\\lim_{n \\to +\\infty} O_n = \\dfrac{9 \\cdot 2}{2} = 9', t: 'Weer dezelfde hoogste machten, en dus dezelfde limiet.' },
      { f: 'A = 9', t: 'Omdat $O_n \\leqslant A \\leqslant B_n$ en beide sommen naar 9 gaan, zit $A$ volgens de insluitstelling vast op 9.' },
    ],
    slot: 'Merk op wat er gebeurt: de letter $n$ verdwijnt, en er blijft een exact getal over. Het gebied heeft een kromme rand, en toch is de oppervlakte precies 9.',
    probeer: ['nj-limiet', 'h1-limiet'],
    figuur: el => limietFig(el, 0, { eind: 3 }),
  };

  V['h1-riemann'] = {
    opgave: 'Bereken de Riemannsom van $f(x) = x^2$ op $[0, 2]$ met $n = 4$, met $c_k$ telkens het midden van elk deel.',
    aanpak: 'Nu kiezen we de hoogte niet links of rechts, maar in het midden. Dan steekt een deel van elke rechthoek boven de grafiek uit, en blijft er een ander deel onder. Die fouten heffen elkaar grotendeels op.',
    stappen: [
      { f: '\\Delta x = \\dfrac12, \\quad c_k = \\tfrac14,\\ \\tfrac34,\\ \\tfrac54,\\ \\tfrac74', t: 'Hetzelfde $\\Delta x$ als in voorbeeld 1, maar andere punten: de middens van de vier delen.' },
      { f: '\\tfrac12\\Bigl(\\tfrac{1}{16} + \\tfrac{9}{16} + \\tfrac{25}{16} + \\tfrac{49}{16}\\Bigr) = \\tfrac{21}{8}', t: 'Tel de kwadraten op en vermenigvuldig met de breedte. Dat is $2{,}625$: veel dichter bij de oppervlakte dan $O_4$ of $B_4$.' },
    ],
    figuur(el) {
      const g = new Graf(el, { x: [-.1, 2.3], y: [-.2, 4.5], w: 460, h: 320, xticks: [.5, 1, 1.5, 2], yticks: [1, 2, 3, 4], rooster: true, label: 'Rechthoeken met de hoogte in het midden van elk deel' });
      const l = g.laag('rh');
      g.kromme(KW, 0, 2.05);
      const m = [.25, .75, 1.25, 1.75];
      const pt = m.map(x => g.punt(x, x * x, 'puntje'));
      const vl = m.map(x => g.lijn(x, 0, x, x * x, 'hulplijn'));
      return (s, an) => {
        pt.forEach(p => { p.style.opacity = s ? 1 : 0; }); vl.forEach(p => { p.style.opacity = s ? 1 : 0; });
        l.zet(s >= 2 ? riemann(KW, 0, 2, 4, .5) : riemann(KW, 0, 2, 4, .5).map(r => ({ ...r, h: 0 })), { stagger: an ? 70 : 0, direct: !an });
        if (an && s === 2) popReeks(4);
      };
    },
  };

  V['h1-herken'] = {
    opgave: 'Schrijf $\\displaystyle\\lim_{n \\to +\\infty} \\sum_{k=1}^{n} \\Bigl(2 + \\dfrac{k}{n}\\Bigr)^{\\!3} \\cdot \\dfrac{1}{n}$ als een bepaalde integraal.',
    aanpak: 'We lezen de definitie achterstevoren: we zoeken in de som eerst de breedte $\\Delta x$ en het punt $x_k$, en daarna de functie.',
    stappen: [
      { f: '\\sum_{k=1}^{n} \\Bigl(2 + \\dfrac{k}{n}\\Bigr)^{\\!3} \\cdot \\ac{\\dfrac{1}{n}} \\qquad \\Delta x = \\ac{\\dfrac1n}', t: 'De factor die niet van $k$ afhangt, is de breedte van een stuk. Er zijn $n$ stukken, dus het interval is $n \\cdot \\tfrac1n = 1$ lang.' },
      { f: '\\sum_{k=1}^{n} \\Bigl(\\acb{2 + \\dfrac{k}{n}}\\Bigr)^{\\!3} \\cdot \\dfrac{1}{n} \\qquad x_k = \\acb{2 + \\dfrac{k}{n}}', t: 'Wat tussen de haakjes staat, is het punt $x_k$. Voor $k = 0$ is dat 2, voor $k = n$ is dat 3. Het interval is dus $[2, 3]$.' },
      { f: '\\int_{\\acb{2}}^{\\acb{3}} x^{\\acc{3}} \\dx', t: 'Wat er met $x_k$ gebeurt, is het voorschrift van de functie: hier de derde macht.' },
    ],
    probeer: ['nj-herken', 'h1-herken'],
    figuur(el) {
      const f = x => x * x * x;
      const g = new Graf(el, { x: [-.1, 3.4], y: [-2, 30], w: 460, h: 320, xticks: [1, 2, 3], yticks: [10, 20], rooster: true, label: 'De grafiek van x tot de derde op 2 tot 3' });
      const v = g.gebied(f, 2, 3, 'vlak-echt');
      const K = g.kromme(f, 0, 3.1);
      const balk = g.lijn(0, 0, 1, 0, 'dikke-lijn');
      const naam = g.tekst(.5, 0, 'lengte 1', { klas: 'label', dy: -10 });
      return (s, an) => {
        K.style.opacity = s >= 3 ? 1 : .0;
        v.classList.toggle('zicht', s >= 3);
        balk.style.opacity = s >= 1 ? 1 : 0;
        naam.style.opacity = s >= 1 ? 1 : 0;
        if (s === 2 && an) tween(420, t => { balk.zet(2 * t, 0, 1 + 2 * t, 0); naam.zet(.5 + 2 * t, 0, '[2, 3]'); });
        else { const u = s >= 2 ? 2 : 0; balk.zet(u, 0, 1 + u, 0); naam.zet(.5 + u, 0, s >= 2 ? '[2, 3]' : 'lengte 1'); }
      };
    },
  };

  V['h1-georienteerd'] = {
    opgave: 'Bereken $\\displaystyle\\int_{-1}^{3} (x - 1)\\dx$ en de werkelijke oppervlakte tussen de grafiek en de horizontale as op dat interval.',
    aanpak: 'De grafiek is een rechte die de as snijdt in $x = 1$. Daar wisselt het teken, dus daar splitsen we. Beide stukken zijn driehoeken.',
    stappen: [
      { f: '-\\tfrac12 \\cdot 2 \\cdot 2 = -2', t: 'Van $-1$ tot 1: basis en hoogte zijn 2, en het minteken komt omdat dit stuk onder de as ligt.' },
      { f: '\\tfrac12 \\cdot 2 \\cdot 2 = 2', t: 'Van 1 tot 3: dezelfde driehoek, maar boven de as.' },
      { f: '\\int_{-1}^{3} (x-1)\\dx = -2 + 2 = 0', t: 'De integraal telt de stukken met hun teken, en die heffen elkaar op.' },
      { f: 'A = 2 + 2 = 4', t: 'De werkelijke oppervlakte telt beide stukken positief.' },
    ],
    slot: 'Een integraal van 0 betekent dus niet dat er geen oppervlakte is. Let ook op de vraag: <em>bereken de integraal</em> is iets anders dan <em>bereken de oppervlakte</em>.',
    probeer: ['nj-georienteerd'],
    figuur(el) {
      const f = x => x - 1;
      const g = new Graf(el, { x: [-1.5, 3.5], y: [-2.4, 2.6], w: 460, h: 340, xticks: [-1, 1, 2, 3], yticks: [-2, -1, 1, 2], rooster: true, label: 'De rechte y = x min 1 met een driehoek onder en een driehoek boven de as' });
      const neg = g.gebied(f, -1, 1, 'vlak-neg');
      const pos = g.gebied(f, 1, 3, 'vlak');
      g.kromme(f, -1.3, 3.3);
      const la = g.tekst(.3, -.55, '−2', { klas: 'label label-groot' }), lb = g.tekst(2.3, .55, '+2', { klas: 'label label-groot' });
      let stop = null;
      const klap = t => {
        const s = 1 - 2 * t;
        neg.setAttribute('transform', `translate(0 ${g.sy(0)}) scale(1 ${s}) translate(0 ${-g.sy(0)})`);
      };
      return (s, an) => {
        if (stop) { stop(); stop = null; }
        neg.style.opacity = s >= 1 ? 1 : 0; pos.style.opacity = s >= 2 ? 1 : 0; la.style.opacity = s >= 1 ? 1 : 0; lb.style.opacity = s >= 2 ? 1 : 0;
        if (s >= 4) {
          neg.setAttribute('class', 'vlak');
          la.zet(.3, .55, '+2');
          if (an) { Geluid.zwiep(); stop = tween(520, klap, { ease: easeInOut }); } else klap(1);
        } else { neg.setAttribute('class', 'vlak-neg'); klap(0); la.zet(.3, -.55, '−2'); }
      };
    },
  };

  V['h1-cirkel'] = {
    opgave: 'Bereken $\\ig_{-2}^{2} \\sqrt{4 - x^2}\\dx$ en $\\ig_{0}^{2} -\\sqrt{4 - x^2}\\dx$.',
    aanpak: 'Geen rechte lijn dit keer, maar we herkennen de vorm $\\sqrt{r^2 - x^2}$ met $r = 2$. De grenzen zeggen welk stuk van de cirkel we nodig hebben, en het teken zegt of het boven of onder de as ligt.',
    stappen: [
      { f: '\\int_{-2}^{2} \\sqrt{4 - x^2}\\dx = \\tfrac12 \\cdot \\pi \\cdot 2^2 = 2\\pi', t: 'Een halve cirkel met straal 2, boven de as.' },
      { f: '\\int_{0}^{2} -\\sqrt{4 - x^2}\\dx = -\\tfrac14 \\cdot \\pi \\cdot 2^2 = -\\pi', t: 'Een kwart van die cirkel, onder de as, dus negatief.' },
    ],
    figuur(el) {
      const f = x => Math.sqrt(Math.max(0, 4 - x * x));
      const h = x => -f(x);
      const g = new Graf(el, { x: [-2.5, 2.7], y: [-2.5, 2.5], w: 420, h: 400, xticks: [-2, -1, 1, 2], yticks: [-2, -1, 1, 2], rooster: true, label: 'Een halve cirkel boven de as en een kwart cirkel eronder' });
      const a = g.gebied(f, -2, 2, 'vlak'), b = g.gebied(h, 0, 2, 'vlak-neg');
      const k1 = g.kromme(f, -2, 2), k2 = g.kromme(h, 0, 2);
      const la = g.tekst(0, .9, '2π', { klas: 'label label-groot' }), lb = g.tekst(.9, -.9, '−π', { klas: 'label label-groot' });
      return s => {
        [a, k1, la].forEach(e => { e.style.opacity = s >= 1 ? 1 : 0; });
        [b, k2, lb].forEach(e => { e.style.opacity = s >= 2 ? 1 : 0; });
      };
    },
  };

  V['h1-eenheden'] = {
    opgave: 'Welke eenheid krijgt de integraal, en wat betekent ze?',
    aanpak: 'Telkens is het de eenheid op de verticale as maal die op de horizontale as.',
    stappen: [
      { f: '\\text{N} \\cdot \\text{m} = \\text{J}', t: 'Een kracht in newton over een afstand in meter geeft joule: de arbeid.' },
      { f: '\\tfrac{\\text{liter}}{\\text{min}} \\cdot \\text{min} = \\text{liter}', t: 'Een debiet in liter per minuut over een tijd in minuten geeft liter: de hoeveelheid.' },
      { f: '\\text{kW} \\cdot \\text{h} = \\text{kWh}', t: 'Een vermogen in kilowatt over een tijd in uur geeft kilowattuur: de energie.' },
    ],
  };

  V['h1-snelheid'] = {
    opgave: 'De figuur toont de snelheid van een robotkarretje op een rechte baan (in m/s, $t$ in seconden). Bereken de verplaatsing en de afgelegde weg.',
    aanpak: 'De oppervlakte onder een snelheidsgrafiek is een afstand. Boven de as rijdt het karretje vooruit, onder de as achteruit. We splitsen dus in twee stukken, en zetten ze daarna op twee manieren samen.',
    stappen: [
      { f: '\\dfrac{3 + 7}{2} \\cdot 4 = 20', t: 'Boven de as: een trapezium.' },
      { f: '\\tfrac12 \\cdot 2 \\cdot 2 = 2', t: 'Eronder: een driehoek.' },
      { f: '20 - 2 = 18 \\text{ m}', t: 'Verplaatsing: achteruit telt negatief.' },
      { f: '20 + 2 = 22 \\text{ m}', t: 'Afgelegde weg: elke meter telt.' },
    ],
    probeer: ['nj-snelheid', 'h1-snelheid'],
    figuur(el) {
      const v = t => t < 2 ? 2 * t : t < 5 ? 4 : t < 7 ? 4 - 2 * (t - 5) : -(t - 7);
      const g = new Graf(el, { x: [-.1, 9.8], y: [-2.8, 4.9], w: 460, h: 320, xnaam: 't', ynaam: 'v', xticks: [2, 5, 7, 9], yticks: [-2, 4], rooster: true, label: 'De snelheid van het karretje: eerst een trapezium boven de as, dan een driehoek eronder' });
      const b = g.gebied(v, 0, 7, 'vlak'), o = g.gebied(v, 7, 9, 'vlak-neg');
      g.kromme(v, 0, 9);
      const a1 = g.tekst(3.5, 1.7, '20', { klas: 'label label-groot' }), a2 = g.tekst(8.3, -.65, '2', { klas: 'label label-groot' });
      return s => {
        b.style.opacity = a1.style.opacity = s >= 1 ? 1 : 0;
        o.style.opacity = a2.style.opacity = s >= 2 ? 1 : 0;
      };
    },
  };

  V['h1-regels'] = {
    opgave: 'Gegeven: $\\ig_0^2 f(x)\\dx = 3$, $\\ig_2^5 f(x)\\dx = -1$ en $\\ig_0^5 g(x)\\dx = 4$.<br>Bereken $\\ig_0^5 \\bigl(2f(x) - 3g(x)\\bigr)\\dx$.',
    aanpak: 'We willen de integraal van een combinatie van $f$ en $g$ op $[0, 5]$. Van $f$ kennen we alleen twee kleinere stukken, dus die leggen we eerst samen.',
    stappen: [
      { f: '\\int_0^5 f(x)\\dx = 3 + (-1) = 2', t: 'De optelbaarheid: $[0, 2]$ en $[2, 5]$ vormen samen $[0, 5]$.' },
      { f: '\\int_0^5 \\bigl(2f(x) - 3g(x)\\bigr)\\dx = 2 \\cdot 2 - 3 \\cdot 4 = -8', t: 'De lineariteit: de som mag je splitsen, en constanten komen voor de integraal.' },
    ],
    probeer: ['h1-regels'],
  };

  V['h1-regelskort'] = {
    opgave: 'Gegeven: $\\ig_1^4 f(x)\\dx = 6$. Bereken $\\ig_4^1 f(x)\\dx$ en $\\ig_2^2 f(x)\\dx$. Toon ook aan dat $\\ig_0^1 x^3\\dx \\leqslant \\ig_0^1 x^2\\dx$, zonder de integralen uit te rekenen.',
    aanpak: 'Dit zijn de drie regels die nog niet aan bod kwamen: omgewisselde grenzen, gelijke grenzen en vergelijken. Telkens zie je op de figuur wat er gebeurt.',
    stappen: [
      { f: '\\int_4^1 f(x)\\dx = -\\int_1^4 f(x)\\dx = -6', t: 'Dezelfde oppervlakte, maar van 4 naar 1 doorlopen. Grenzen wisselen geeft een minteken.' },
      { f: '\\int_2^2 f(x)\\dx = 0', t: 'Van 2 tot 2 is er geen breedte, dus het gebied krimpt tot een lijnstuk zonder oppervlakte.' },
      { f: 'x^3 \\leqslant x^2 \\text{ op } [0, 1]', t: 'Op $[0, 1]$ is $x \\leqslant 1$. Vermenigvuldig beide leden met $x^2 \\geqslant 0$. De grafiek van $x^3$ ligt dus onder die van $x^2$.' },
      { f: '\\int_0^1 x^3\\dx \\leqslant \\int_0^1 x^2\\dx', t: 'De regel om te vergelijken: het kleine gebied past in het grote.' },
    ],
    slot: 'Let op: een integraal van een product is niet het product van de integralen. Dat zie je al bij $f(x) = g(x) = 1$ op $[0, 2]$: de integraal van het product is 2, en het product van de integralen is 4.',
    probeer: ['nj-regels', 'h1-regels'],
    figuur(el) {
      const F = x => 1.1 + .5 * Math.sin(x * 70 * Math.PI / 180);
      const a = document.createElement('div'), b = document.createElement('div');
      el.append(a, b);
      const g = new Graf(a, { x: [-.1, 4.7], y: [-.1, 2.3], w: 460, h: 280, xticks: [1, 2, 4], yticks: [], label: 'Gebied onder een grafiek van 1 tot 4' });
      const v = g.gebied(F, 1, 4);
      g.kromme(F, .5, 4.4);
      const pijl = g.lijn(3.8, .45, 1.2, .45, 'pijl-lijn');
      const lab = g.tekst(2.5, .45, '−6', { klas: 'label label-groot', dy: -10 });
      const streep = g.lijn(2, 0, 2, F(2), 'dikke-lijn');
      const h = new Graf(b, { x: [-.05, 1.2], y: [-.05, 1.15], w: 460, h: 280, xticks: [1], yticks: [1], rooster: true, label: 'De grafieken van x kwadraat en x tot de derde op 0 tot 1' });
      const v2 = h.gebied(KW, 0, 1, 'vlak-licht'), v3 = h.gebied(x => x ** 3, 0, 1);
      h.kromme(KW, 0, 1); h.kromme(x => x ** 3, 0, 1, 'kromme kromme-streep');
      h.tekst(.72, .52, 'x²', { klas: 'label', dx: -14 }); h.tekst(.8, .34, 'x³', { klas: 'label', dx: 18 });
      return s => {
        a.hidden = s >= 3; b.hidden = s < 3;
        v.style.opacity = s === 2 ? 0 : 1;
        pijl.style.opacity = lab.style.opacity = s === 1 ? 1 : 0;
        streep.style.opacity = s === 2 ? 1 : 0;
        v3.style.opacity = s >= 4 ? 1 : .55; v2.style.opacity = s >= 4 ? 1 : .55;
      };
    },
  };

  V['h1-symmetrie'] = {
    opgave: 'Bereken $\\ig_{-2}^{2} (x^3 + \\sin x + 3)\\dx$.',
    aanpak: 'Een primitieve is niet nodig. De grenzen liggen symmetrisch rond 0, en dan kijken we eerst of er een oneven deel in de integrand zit.',
    stappen: [
      { f: '\\int_{-2}^{2} (x^3 + \\sin x)\\dx = 0', t: '$x^3$ en $\\sin x$ zijn oneven, en hun som ook. De stukken links en rechts van 0 heffen elkaar dus op.' },
      { f: '\\int_{-2}^{2} 3\\dx = 4 \\cdot 3 = 12', t: 'Wat overblijft, is een rechthoek met basis 4 en hoogte 3. De hele integraal is dus 12.' },
    ],
    probeer: ['h1-symmetrie'],
    figuur(el) {
      const f = x => x ** 3 + Math.sin(x);
      const g = new Graf(el, { x: [-2.6, 2.6], y: [-10, 10], w: 460, h: 340, xticks: [-2, -1, 1, 2], yticks: [-8, -4, 3, 8], rooster: true, label: 'De oneven functie x tot de derde plus sinus x, en een rechthoek met hoogte 3' });
      const a = g.tekenGebied(f, -2, 2);
      const K = g.kromme(f, -2.1, 2.1);
      const r = g.laag('rh');
      return (s, an) => {
        a.pos.style.opacity = a.neg.style.opacity = K.style.opacity = s === 1 ? 1 : s > 1 ? .18 : 0;
        r.zet([{ x: -2, w: 4, h: s >= 2 ? 3 : 0 }], { direct: !an });
      };
    },
  };

  V['h1-even'] = {
    opgave: 'Gegeven: $\\ig_0^2 x^2\\dx = \\dfrac83$. Bereken $\\ig_{-2}^{2} x^2\\dx$.',
    aanpak: 'Nu is de functie even: de twee stukken heffen elkaar niet op, maar zijn even groot.',
    stappen: [
      { f: '\\int_{-2}^{2} x^2\\dx = 2 \\int_0^2 x^2\\dx = 2 \\cdot \\dfrac83 = \\dfrac{16}{3}', t: 'De grenzen liggen symmetrisch rond 0, en $(-x)^2 = x^2$. Dus twee keer het rechterdeel.' },
    ],
    probeer: ['nj-even'],
    figuur(el) {
      const g = new Graf(el, { x: [-2.5, 2.5], y: [-.3, 4.6], w: 460, h: 300, xticks: [-2, -1, 1, 2], yticks: [2, 4], rooster: true, label: 'Parabool met een even groot gebied links en rechts van de verticale as' });
      g.gebied(KW, 0, 2);
      const links = g.gebied(KW, 0, 2, 'vlak-licht');
      g.kromme(KW, -2.1, 2.1);
      const cx = g.sx(0);
      const zet = t => links.setAttribute('transform', `translate(${cx} 0) scale(${1 - 2 * t} 1) translate(${-cx} 0)`);
      return (s, an) => {
        links.style.opacity = s ? 1 : 0;
        if (s && an) { Geluid.zwiep(); tween(520, zet, { ease: easeInOut }); } else zet(s ? 1 : 0);
      };
    },
  };

  V['h1-gemiddelde'] = {
    opgave: 'Bereken de gemiddelde waarde van $f(x) = \\sqrt{9 - x^2}$ op $[0, 3]$ en de waarde $c$ uit de middelwaardestelling.',
    aanpak: 'Voor het gemiddelde hebben we eerst de integraal nodig, en die lezen we uit de figuur. Daarna zoeken we waar de grafiek die hoogte bereikt.',
    stappen: [
      { f: '\\int_0^3 \\sqrt{9-x^2}\\dx = \\tfrac14 \\cdot \\pi \\cdot 9 = \\dfrac{9\\pi}{4}', t: 'Een kwart van een cirkel met straal 3.' },
      { f: '\\text{gemiddelde} = \\dfrac13 \\cdot \\dfrac{9\\pi}{4} = \\dfrac{3\\pi}{4} \\approx 2{,}36', t: 'Delen door de lengte van het interval: 3.' },
      { f: '\\sqrt{9 - c^2} = \\dfrac{3\\pi}{4} \\ \\Rightarrow \\ c \\approx 1{,}86', t: 'Los $f(c) = $ gemiddelde op. Er is ook een negatieve oplossing, maar $c$ moet in $[0, 3]$ liggen.' },
    ],
    probeer: ['nj-gemiddelde', 'h1-gemiddelde'],
    figuur(el) {
      const f = x => Math.sqrt(Math.max(0, 9 - x * x));
      const gem = 3 * Math.PI / 4;
      const g = new Graf(el, { x: [-.15, 3.5], y: [-.3, 3.5], w: 420, h: 400, xticks: [1, 2, 3], yticks: [1, 2, 3], rooster: true, label: 'Een kwart cirkel met straal 3 en de rechthoek met dezelfde oppervlakte' });
      const vlak = g.gebied(f, 0, 3);
      const K = g.kromme(f, 0, 3);
      const c = Math.sqrt(9 - gem * gem);
      const h = g.lijn(0, gem, 3, gem, 'hulplijn hulplijn-acc');
      const v = g.lijn(c, 0, c, gem, 'hulplijn hulplijn-acc');
      const p = g.punt(c, gem);
      const t = g.tekst(c, 0, 'c', { klas: 'greep-naam', dy: 20 });
      const K0 = g.kromme(f, 0, 3, 'kromme-dun');
      let stop = null;
      const morf = w => vlak.zet(x => f(x) + w * (gem - f(x)), 0, 3);
      return (s, an) => {
        if (stop) { stop(); stop = null; }
        vlak.style.opacity = s >= 1 ? 1 : 0;
        K.style.opacity = K0.style.opacity = 1;
        h.style.opacity = s >= 2 ? 1 : 0;
        [v, p, t].forEach(e => { e.style.opacity = s >= 3 ? 1 : 0; });
        if (s === 2 && an) { Geluid.water(); stop = tween(900, morf, { ease: easeInOut }); } else morf(s >= 2 ? 1 : 0);
      };
    },
  };

  /* --- Nu jij: de korte opgaven uit de zelfstudieversie. --- */
  const NJ = AX.nujij;
  NJ['nj-oboven'] = { vraag: 'Bereken $O_4$ en $B_4$ voor $f(x) = x + 1$ op $[0, 4]$.', antwoord: '$\\Delta x = 1$, $O_4 = 1+2+3+4 = 10$ en $B_4 = 2+3+4+5 = 14$. De echte oppervlakte (een trapezium) is 12.', velden: [{ label: '$O_4$', waarde: 10, tol: 1e-6 }, { label: '$B_4$', waarde: 14, tol: 1e-6 }] };
  NJ['nj-limiet'] = { vraag: 'Bereken zo de oppervlakte onder $f(x) = x$ op $[0, 6]$.', antwoord: '$B_n = \\tfrac{36}{n^2}\\sum k = \\tfrac{18(n+1)}{n}$, met limiet 18. Dat is ook de driehoek: $\\tfrac12 \\cdot 6 \\cdot 6$.', velden: [{ label: 'oppervlakte', waarde: 18, tol: 1e-6 }] };
  NJ['nj-herken'] = { vraag: 'Schrijf $\\displaystyle\\lim_{n \\to +\\infty} \\sum_{k=1}^{n} \\sqrt{\\dfrac{3k}{n}} \\cdot \\dfrac{3}{n}$ als een bepaalde integraal.', antwoord: '$\\Delta x = \\tfrac3n$ en $x_k = \\tfrac{3k}{n}$, dus $\\int_0^3 \\sqrt{x}\\dx$.' };
  NJ['nj-georienteerd'] = { vraag: 'Bereken $\\displaystyle\\int_{-2}^{4} (x + 1)\\dx$ en de werkelijke oppervlakte.', antwoord: 'De driehoek van $-2$ tot $-1$ telt voor $-\\tfrac12$, die van $-1$ tot 4 voor $\\tfrac{25}{2}$. De integraal is 12, de oppervlakte 13.', velden: [{ label: 'integraal', waarde: 12, tol: 1e-6 }, { label: 'oppervlakte', waarde: 13, tol: 1e-6 }] };
  NJ['nj-snelheid'] = { vraag: 'Een lift heeft snelheid $v(t) = 4 - t$ (in m/s) op $[0, 6]$. Bereken de verplaatsing en de afgelegde weg.', antwoord: 'Boven de as: $\\tfrac12 \\cdot 4 \\cdot 4 = 8$. Eronder: $\\tfrac12 \\cdot 2 \\cdot 2 = 2$. Verplaatsing 6 m, afgelegde weg 10 m.', velden: [{ label: 'verplaatsing', waarde: 6, tol: 1e-6, eenheid: 'm' }, { label: 'afgelegde weg', waarde: 10, tol: 1e-6, eenheid: 'm' }] };
  NJ['nj-regels'] = { vraag: 'Gegeven: $\\int_1^4 f(x)\\dx = 6$ en $\\int_3^4 f(x)\\dx = 2$. Bereken $\\int_3^1 f(x)\\dx$.', antwoord: '$\\int_1^3 f(x)\\dx = 6 - 2 = 4$, dus met de grenzen gewisseld is het $-4$.', velden: [{ label: '', waarde: -4, tol: 1e-6 }] };
  NJ['nj-even'] = { vraag: 'Bereken $\\int_{-\\pi}^{\\pi} (x\\cos x + 2)\\dx$.', antwoord: '$x\\cos x$ is oneven, dus de uitkomst is de rechthoek: $2\\pi \\cdot 2 = 4\\pi$.', velden: [{ label: '', waarde: 4 * Math.PI, tol: 1e-6, exact: true }] };
  NJ['nj-gemiddelde'] = { vraag: 'Bereken de gemiddelde waarde van $f(x) = 2x$ op $[1, 5]$.', antwoord: 'De integraal is een trapezium: $\\tfrac{2 + 10}{2} \\cdot 4 = 24$, en $\\tfrac{24}{4} = 6$.', velden: [{ label: '', waarde: 6, tol: 1e-6 }] };

  /* --- Ik zit vast: waar een leerling terechtkan. Pas zichtbaar als die erom vraagt: de Opdrachten staan bewust door elkaar. --- */
  Object.assign(AX.hulp, {
    'h1-oboven': 'h1-oboven', 'h1-limiet': ['h1-limiet'], 'h1-herken': 'h1-herken', 'h1-georienteerd': ['h1-georienteerd', 'h1-cirkel'],
    'h1-snelheid': 'h1-snelheid', 'h1-regels': 'h1-regels', 'h1-symmetrie': 'h1-symmetrie', 'h1-gemiddelde': 'h1-gemiddelde',
    'h1-o1': 'h1-oboven', 'h1-o2': 'h1-georienteerd', 'h1-oh': 'h1-gemiddelde', 'h1-ol': ['h1-georienteerd', 'h1-gemiddelde'], 'h1-o3': 'h1-georienteerd',
    'h1-o4': ['h1-regels', 'h1-regelskort'], 'h1-o5': 'h1-georienteerd', 'h1-o6': 'h1-herken', 'h1-o7': 'h1-gemiddelde', 'h1-o8': ['h1-snelheid', 'h1-gemiddelde'],
    'h1-o9': 'h1-regelskort', 'h1-o10': 'h1-symmetrie', 'h1-o11': 'h1-limiet', 'h1-o12': 'h1-snelheid', 'h1-o13': 'h1-cirkel', 'h1-o15': ['h1-oboven', 'h1-riemann'],
    'h1-o16': 'h1-oboven', 'h1-o17': 'h1-eenheden', 'h1-o18': 'h1-eenheden', 'h1-o19': 'h1-gemiddelde', 'h1-o20': 'h1-georienteerd', 'h1-o22': 'h1-limiet', 'h1-o23': 'h1-limiet',
  });
})();
