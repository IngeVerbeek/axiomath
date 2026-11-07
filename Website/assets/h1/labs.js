/* Hoofdstuk 1: de interactieve labs en de vaste figuren. */
(function () {
  const AX = window.Axiomath;
  const { Graf, Veer, fmt, integraal, opp, riemann, somVan, tween, easeInOut } = G;
  const { wiskunde, tex, $, $$ } = AX;

  /* --- bouwstenen ----------------------------------------------------------------------------- */
  function kader(el, { titel, tekst, breed = true }) {
    el.classList.add('lab');
    if (breed) el.classList.add('lab-breed');
    el.innerHTML = `<div class="lab-kop"><span class="lab-etiket">Probeer</span><h4>${wiskunde(titel)}</h4></div>
      ${tekst ? `<p class="lab-tekst">${wiskunde(tekst)}</p>` : ''}
      <div class="lab-werk"><div class="lab-fig"></div><div class="lab-paneel"><div class="lab-ctrl"></div><div class="lab-uit"></div></div></div>
      <p class="missie" hidden></p>`;
    return { fig: $('.lab-fig', el), ctrl: $('.lab-ctrl', el), uit: $('.lab-uit', el), mis: $('.missie', el) };
  }
  /* Een kleine opdracht in het lab. Eén keer gehaald = één keer gevierd. */
  function missie(p, tekst, naam) {
    p.hidden = false;
    p.innerHTML = `<span class="missie-vink" aria-hidden="true"></span><span>${wiskunde(tekst)}</span>`;
    let af = false;
    return () => {
      if (af) return;
      af = true;
      p.classList.add('af');
      Geluid.goed();
      AX.spat(p, 12);
      AX.voortgang.oef['lab-' + naam] = 'goed'; AX.bewaar();
    };
  }
  function seg(ouder, label, keuzes, w, op) {
    const d = document.createElement('div');
    d.className = 'ctrl-groep';
    d.innerHTML = `${label ? `<span class="ctrl-label">${label}</span>` : ''}<div class="seg" role="group" aria-label="${label || 'Keuze'}">${keuzes.map(k => `<button type="button" data-w="${k.w}" class="${k.w === w ? 'aan' : ''}">${wiskunde(k.t)}</button>`).join('')}</div>`;
    $$('button', d).forEach(b => b.addEventListener('click', () => {
      Geluid.klik();
      $$('button', d).forEach(x => x.classList.toggle('aan', x === b));
      op(b.dataset.w);
    }));
    d.kies = v => { $$('button', d).forEach(x => x.classList.toggle('aan', x.dataset.w === String(v))); };
    ouder.appendChild(d);
    return d;
  }
  let schuifNr = 0;
  /* Schuifregelaar; rek = true geeft het ballongeluid. */
  function schuif(ouder, { label, min, max, stap = 1, w, op, toon = v => v, rek = true, tik = false }) {
    const id = 'schuif-' + (++schuifNr);
    const d = document.createElement('div');
    d.className = 'ctrl-groep';
    d.innerHTML = `<label class="ctrl-label" for="${id}">${wiskunde(label)} <output></output></label><input id="${id}" type="range" min="${min}" max="${max}" step="${stap}" value="${w}">`;
    const i = $('input', d), u = $('output', d);
    const zetVul = () => i.style.setProperty('--vul', ((i.value - min) / (max - min) * 100) + '%');
    const zetTekst = () => { u.innerHTML = wiskunde(String(toon(+i.value))); zetVul(); };
    let oud = +i.value;
    i.addEventListener('input', () => {
      const v = +i.value, nu = (v - min) / (max - min);
      if (rek) Geluid.rek(nu, Math.min(1, Math.abs(v - oud) / (stap * 2)));
      if (tik && v !== oud) Geluid.tik(nu);
      oud = v;
      zetTekst();
      op(v);
    });
    zetTekst();
    d.zet = (v, stil) => { i.value = v; oud = v; zetTekst(); if (!stil) op(v); };
    d.waarde = () => +i.value;
    ouder.appendChild(d);
    return d;
  }
  function uitvoer(ouder, rijen) {
    ouder.innerHTML = rijen.map(r => `<div class="meet ${r.klas || ''}" data-k="${r.k}"><span class="meet-label">${wiskunde(r.l)}</span><strong class="meet-w">–</strong></div>`).join('');
    return (k, v) => { const e = $(`[data-k="${k}"] .meet-w`, ouder); if (e) e.textContent = v; };
  }
  function knop(ouder, t, op, klas = 'knop-licht') {
    const b = document.createElement('button');
    b.type = 'button'; b.className = klas; b.innerHTML = wiskunde(t);
    b.addEventListener('click', op);
    ouder.appendChild(b);
    return b;
  }
  const stopBuitenBeeld = (el, stop) => {
    new IntersectionObserver(e => { if (!e[0].isIntersecting) stop(); }).observe(el);
    el.closest('.view')?.addEventListener('verborgen', stop);
  };

  const ALG = x => 1.6 + .7 * Math.sin(1.7 * x);
  const KW = x => x * x;

  /* --- de auto: het openingsprobleem ------------------------------------------------------------ */
  AX.labs.rit = function (el) {
    const T = 40;
    const v = t => {
      const aan = 1 - Math.exp(-t / 2.2), uit = 1 - Math.exp(-(T - t) / 1.6);
      return Math.max(0, aan * uit * (15 + 6 * Math.sin(t / 3.1) + 5 * Math.sin(t / 7 + 1)));
    };
    const S = [0];
    for (let i = 1; i <= 400; i++) S[i] = S[i - 1] + (v((i - .5) * T / 400)) * T / 400;
    const s = t => S[Math.min(400, Math.round(t / T * 400))];
    const k = kader(el, { titel: 'Hoe ver rijdt de auto?', tekst: 'De auto rijdt niet constant. Start de rit en kijk wat er gebeurt met het gebied onder de snelheidsgrafiek. Je kunt ook zelf aan de tijd slepen.' });
    const g = new Graf(k.fig, { x: [0, 42], y: [0, 28], w: 640, h: 300, xnaam: 't (s)', ynaam: 'v (m/s)', xticks: [10, 20, 30, 40], yticks: [10, 20], rooster: true, label: 'Snelheid van de auto in de tijd, met de afgelegde weg als oppervlakte eronder' });
    g.kromme(v, 0, T);
    const vlak = g.gebied(v, 0, 0);
    const lijn = g.lijn(0, 0, 0, 28, 'kijklijn');
    const bol = g.punt(0, 0, 'puntje');
    const weg = document.createElement('div');
    weg.className = 'weg';
    weg.innerHTML = `<div class="weg-baan"><svg class="auto" viewBox="0 0 64 28" aria-hidden="true"><path d="M3 21c-1-5 1-8 8-9l8-7c1-1 3-2 5-2h13c2 0 3 1 5 2l8 7c7 1 11 3 12 7v3c0 1-1 2-2 2H5c-1 0-2-1-2-3z"/><circle cx="16" cy="22" r="5.5"/><circle cx="48" cy="22" r="5.5"/></svg></div>`;
    k.fig.appendChild(weg);
    const auto = $('.auto', weg);
    const zet = uitvoer(k.uit, [{ k: 't', l: 'tijd' }, { k: 'v', l: 'snelheid' }, { k: 's', l: 'afgelegde weg', klas: 'groot' }]);
    let t = 0, loopt = false, stopLus = null, eersteRit = true;
    const teken = () => {
      vlak.zet(v, 0, t);
      lijn.zet(t, 0, t, 28);
      bol.zet(t, v(t));
      const f = s(t) / s(T);
      auto.style.transform = `translateX(calc(${f * 100}cqw - ${f * 100}%))`;
      zet('t', fmt(t, 1) + ' s'); zet('v', fmt(v(t), 1) + ' m/s'); zet('s', fmt(s(t), 0) + ' m');
      schuiver.zet(t, true);
    };
    const stop = () => { loopt = false; if (stopLus) stopLus(); stopLus = null; Geluid.motorStop(); speel.textContent = t >= T ? 'Rij opnieuw' : 'Rij'; };
    const speel = knop(k.ctrl, 'Rij', () => {
      if (loopt) return stop();
      if (t >= T || eersteRit) t = 0;
      eersteRit = false;
      loopt = true; speel.textContent = 'Pauze';
      if (G.rust()) { t = T; teken(); return stop(); }
      stopLus = G.anim(dt => {
        t = Math.min(T, t + dt * 6.5);
        teken();
        Geluid.motorZet(v(t) / 26);
        if (t >= T) { stop(); Geluid.goed(); return false; }
        return true;
      });
    }, 'knop');
    const schuiver = schuif(k.ctrl, { label: 'Tijd', min: 0, max: T, stap: .1, w: 0, rek: false, toon: x => fmt(x, 0) + ' s', op: x => { t = x; eersteRit = false; if (loopt) stop(); teken(); } });
    stopBuitenBeeld(el, stop);
    t = 16; teken();
  };

  /* --- de fietser: Verken ------------------------------------------------------------------------ */
  AX.labs.fietser = function (el) {
    const k = kader(el, { titel: 'Je schattingen op de grafiek', tekst: 'Heb je de vragen gemaakt? Kies een schatting en bekijk waar die op de grafiek staat.' });
    const v = t => 2 * t;
    const g = new Graf(k.fig, { x: [0, 4.4], y: [0, 9], w: 640, h: 340, xnaam: 't (s)', ynaam: 'v (m/s)', xticks: [1, 2, 3, 4], yticks: [2, 4, 6, 8], rooster: true, label: 'Snelheid van de fietser met rechthoeken als schatting' });
    const echt = g.gebied(v, 0, 4, 'vlak-echt');
    const laag = g.laag('rh');
    g.kromme(v, 0, 4);
    let plaats = 0, n = 4, toonEcht = false;
    const zet = uitvoer(k.uit, [{ k: 'som', l: 'som van de rechthoeken', klas: 'lang' }, { k: 's', l: 'schatting', klas: 'groot' }]);
    const som = $('[data-k="som"] .meet-w', k.uit);
    const teken = (stagger = 0) => {
      const rs = riemann(v, 0, 4, n, plaats);
      laag.zet(rs, { stagger });
      const w = 4 / n;
      som.innerHTML = tex(`${w === 1 ? '' : '\\tfrac12\\,('}${rs.map(r => fmt(r.h, 0)).join('+').replace(/(.{20,}?)\+.*\+(.+)$/, n > 4 ? '$1+\\ldots+$2' : '$&')}${w === 1 ? '' : ')'}`);
      zet('s', fmt(somVan(rs), 0) + ' m');
      if (stagger) rs.forEach((r, i) => setTimeout(() => Geluid.pop(i / rs.length), stagger * i));
      if (somVan(rs) === 14 || somVan(rs) === 18) klaar();
    };
    const klaar = missie(k.mis, 'Zoek de twee schattingen met stukjes van een halve seconde.', 'fietser');
    seg(k.ctrl, 'Snelheid', [{ w: 0, t: 'aan het begin' }, { w: 1, t: 'aan het einde' }], 0, w => { plaats = +w; teken(60); });
    seg(k.ctrl, 'Stukjes', [{ w: 4, t: '1 seconde' }, { w: 8, t: '½ seconde' }], 4, w => { n = +w; teken(50); });
    const ek = knop(k.ctrl, 'Toon de echte afstand', () => {
      toonEcht = !toonEcht;
      echt.classList.toggle('zicht', toonEcht);
      ek.textContent = toonEcht ? 'De echte afstand: 16 m' : 'Toon de echte afstand';
      Geluid.klik();
    });
    teken();
  };

  /* --- ondersom en bovensom ---------------------------------------------------------------------- */
  const STOPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 25, 32, 50, 64, 100];
  const FUNCTIES = {
    alg: { f: ALG, a: .5, b: 3.5, x: [-.1, 3.9], y: [-.1, 2.8], xticks: [{ v: .5, s: 'a' }, { v: 3.5, s: 'b' }], yticks: [], t: 'algemene functie', naamx: 'x' },
    kw: { f: KW, a: 0, b: 2, x: [-.1, 2.3], y: [-.2, 4.7], xticks: [.5, 1, 1.5, 2], yticks: [1, 2, 3, 4], t: '$x^2$ op $[0,2]$', rooster: true },
  };
  AX.labs.onderboven = function (el, opt) {
    const metVerloop = opt.verloop === 'ja';
    const k = kader(el, metVerloop
      ? { titel: 'Hoe fijner, hoe dichter', tekst: 'Sleep aan $n$ en kijk hoe $O_n$ en $B_n$ van twee kanten naar hetzelfde getal gaan. Klik ook op een kolom van de tabel.' }
      : { titel: 'Sluit de oppervlakte in', tekst: 'Sleep aan $n$. De donkere rechthoeken passen in het gebied, de lichtere steken erboven uit. De echte oppervlakte zit ertussen.' });
    let fn = metVerloop ? FUNCTIES.kw : FUNCTIES.alg, g, lB, lO, kurve;
    let idx = 3;
    const n = () => STOPS[idx];
    const figuur = document.createElement('div');
    k.fig.appendChild(figuur);
    let modus = 'beide';
    const bouw = () => {
      figuur.innerHTML = '';
      g = new Graf(figuur, { x: fn.x, y: fn.y, w: 640, h: 340, xticks: fn.xticks, yticks: fn.yticks, rooster: fn.rooster, label: 'Rechthoeken van de ondersom en de bovensom onder een grafiek' });
      lB = g.laag('rh rh-licht'); lO = g.laag('rh');
      kurve = g.kromme(fn.f, fn.a - .05 < fn.x[0] ? fn.a : fn.a - .2, fn.b + .15);
      teken(true);
    };
    const zetUit = uitvoer(k.uit, [
      { k: 'o', l: '$O_n$' }, { k: 'a', l: '$A$', klas: 'accent' }, { k: 'b', l: '$B_n$' }, { k: 'v', l: '$B_n - O_n$' },
    ]);
    const meter = document.createElement('div');
    meter.className = 'meter';
    meter.innerHTML = '<div class="meter-band"><i class="meter-tussen"></i><i class="meter-o"></i><i class="meter-a"></i><i class="meter-b"></i></div><div class="meter-tekst"><span>$O_n \\leqslant A \\leqslant B_n$</span></div>';
    meter.innerHTML = wiskunde(meter.innerHTML);
    k.uit.appendChild(meter);
    const [mt, mo, ma, mb] = ['.meter-tussen', '.meter-o', '.meter-a', '.meter-b'].map(s => $(s, meter));
    const A = () => integraal(fn.f, fn.a, fn.b);
    let bereik = [0, 1];
    const pos = w => (w - bereik[0]) / (bereik[1] - bereik[0]);
    const voltooi = missie(k.mis, metVerloop ? 'Maak $B_n - O_n$ kleiner dan $0{,}1$. Hoe groot moet $n$ minstens zijn?' : 'Maak $B_n - O_n$ kleiner dan $0{,}25$.', metVerloop ? 'verloop' : 'onderboven');
    function teken(direct) {
      const rO = riemann(fn.f, fn.a, fn.b, n(), 'o'), rB = riemann(fn.f, fn.a, fn.b, n(), 'b');
      lO.zet(modus === 'b' ? rO.map(r => ({ ...r, h: 0 })) : rO, { direct });
      lB.zet(modus === 'o' ? rB.map(r => ({ ...r, h: 0 })) : rB, { direct });
      const O = somVan(rO), B = somVan(rB), Aw = A();
      zetUit('o', fmt(O)); zetUit('b', fmt(B)); zetUit('a', fmt(Aw)); zetUit('v', fmt(B - O));
      const r1 = riemann(fn.f, fn.a, fn.b, 1, 'o')[0], r2 = riemann(fn.f, fn.a, fn.b, 1, 'b')[0];
      bereik = [somVan([r1]), somVan([r2])];
      const po = pos(O), pb = pos(B), pa = pos(Aw);
      mo.style.transform = `translateX(${po * 100}cqw)`; mb.style.transform = `translateX(${pb * 100}cqw)`; ma.style.transform = `translateX(${pa * 100}cqw)`;
      mt.style.transform = `translateX(${po * 100}cqw) scaleX(${Math.max(0, pb - po)})`;
      if (metVerloop) { markeerTabel(); teken2(O, B); }
      if (!direct && B - O < (metVerloop ? .1 : .25)) voltooi();
    }
    if (!metVerloop) {
      seg(k.ctrl, 'Functie', Object.entries(FUNCTIES).map(([w, f]) => ({ w, t: f.t })), 'alg', w => { fn = FUNCTIES[w]; bouw(); });
      seg(k.ctrl, 'Toon', [{ w: 'beide', t: 'beide' }, { w: 'o', t: '$O_n$' }, { w: 'b', t: '$B_n$' }], 'beide', w => { modus = w; teken(); });
    }
    const nSchuif = schuif(k.ctrl, { label: 'Aantal delen', min: 0, max: STOPS.length - 1, w: idx, tik: true, toon: i => `$n = ${STOPS[i]}$`, op: i => { idx = i; teken(); } });
    /* De tabel uit het boek, en het verloop. */
    let markeerTabel = () => {}, teken2 = () => {};
    if (metVerloop) {
      const tab = document.createElement('div');
      tab.className = 'tabel-wrap';
      const W = [4, 8, 16, 100];
      tab.innerHTML = wiskunde(`<table class="tabel klikbaar"><thead><tr><th>$n$</th>${W.map(w => `<th><button type="button" data-n="${w}">${w}</button></th>`).join('')}</tr></thead><tbody>
        <tr><th>$O_n$</th>${W.map(w => `<td data-n="${w}">${fmt(somVan(riemann(KW, 0, 2, w, 'o')))}</td>`).join('')}</tr>
        <tr><th>$B_n$</th>${W.map(w => `<td data-n="${w}">${fmt(somVan(riemann(KW, 0, 2, w, 'b')))}</td>`).join('')}</tr></tbody></table>`);
      k.uit.appendChild(tab);
      $$('button', tab).forEach(b => b.addEventListener('click', () => { Geluid.klik(); idx = STOPS.indexOf(+b.dataset.n); nSchuif.zet(idx); }));
      markeerTabel = () => { $$('[data-n]', tab).forEach(c => c.classList.toggle('aan', +c.dataset.n === n())); };
      /* Het verloop: elke n die je hebt bezocht komt als punt op de grafiek. */
      const wrap = document.createElement('div');
      wrap.className = 'verloop';
      k.fig.appendChild(wrap);
      const g2 = new Graf(wrap, { x: [0, STOPS.length - 1], y: [0, 4.2], w: 640, h: 170, pad: { l: 42, r: 26, t: 16, b: 26 }, xnaam: 'n', ynaam: '', xticks: [0, 3, 7, 9, 13, 15].map(i => ({ v: i, s: String(STOPS[i]) })), yticks: [{ v: 8 / 3, s: '8/3' }], label: 'Verloop van de ondersom en de bovensom bij stijgende n' });
      g2.lijn(0, 8 / 3, STOPS.length - 1, 8 / 3, 'hulplijn');
      const zichtbaar = {};
      teken2 = (O, B) => {
        if (zichtbaar[idx]) return;
        zichtbaar[idx] = true;
        const po = g2.punt(idx, O, 'puntje puntje-o'), pb = g2.punt(idx, B, 'puntje puntje-b');
        if (!G.rust()) [po, pb].forEach(p => p.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' }));
      };
      STOPS.forEach((w, i) => { if (i <= idx) { const h = idx; idx = i; teken2(somVan(riemann(KW, 0, 2, w, 'o')), somVan(riemann(KW, 0, 2, w, 'b'))); idx = h; } });
      const stap = document.createElement('p');
      stap.className = 'lab-noot';
      stap.innerHTML = wiskunde('Hier geldt $B_n - O_n = \\dfrac{8}{n}$. Dat verschil gaat naar 0.');
      k.uit.appendChild(stap);
    }
    bouw();
  };

  /* --- Riemannsommen: elke c_k mag ------------------------------------------------------------- */
  AX.labs.ck = function (el) {
    const k = kader(el, { titel: 'Kies je eigen punten', tekst: 'Sleep de punten $c_k$ op de grafiek, of schud ze door elkaar. Maak daarna $n$ groter: welke punten je ook kiest, de som gaat naar hetzelfde getal.' });
    const a = 0, b = 2, f = KW;
    const g = new Graf(k.fig, { x: [-.1, 2.3], y: [-.2, 4.7], w: 640, h: 340, xticks: [.5, 1, 1.5, 2], yticks: [1, 2, 3, 4], rooster: true, label: 'Riemannsom van x kwadraat met versleepbare punten' });
    const laag = g.laag('rh');
    g.kromme(f, 0, 2.1);
    let n = 4, c = Array(4).fill(.5), grepen = [];
    const zet = uitvoer(k.uit, [{ k: 's', l: 'Riemannsom', klas: 'groot' }, { k: 'l', l: 'limiet ($n \\to +\\infty$)', klas: 'accent' }]);
    zet('l', fmt(8 / 3));
    const som = () => somVan(riemann(f, a, b, n, c));
    const werk = () => { laag.zet(riemann(f, a, b, n, c)); zet('s', fmt(som(), 3)); };
    const legGrepen = () => {
      grepen.forEach(h => h.remove());
      grepen = [];
      if (n > 12) return;
      const w = (b - a) / n;
      for (let i = 0; i < n; i++) {
        const l = a + i * w;
        const h = g.greep({
          x: l + c[i] * w, y: f(l + c[i] * w), as: 'x', min: l, max: l + w, stap: w / 10, naam: `Punt c${i + 1}`,
          op: (x, d) => { c[i] = (x - l) / w; h.zet(x, f(x)); Geluid.rek(c[i], Math.min(1, d * 12)); werk(); },
        });
        grepen.push(h);
      }
    };
    const zetC = (nieuw, s = true) => {
      c = nieuw;
      if (s) werk(); legGrepen();
    };
    seg(k.ctrl, 'Plaats', [{ w: 0, t: 'links' }, { w: .5, t: 'midden' }, { w: 1, t: 'rechts' }], .5, w => zetC(Array(n).fill(+w)));
    knop(k.ctrl, 'Schud de punten', () => { Geluid.zwiep(); zetC(Array.from({ length: n }, () => Math.random())); });
    schuif(k.ctrl, { label: 'Aantal delen', min: 0, max: STOPS.length - 1, w: 3, tik: true, toon: i => `$n = ${STOPS[i]}$`, op: i => { n = STOPS[i]; const o = c; zetC(Array.from({ length: n }, (_, j) => o[j % o.length])); } });
    const klaar = missie(k.mis, 'Schud de punten met $n = 100$. Hoe ver blijft de som nog van $\\tfrac83$?', 'ck');
    const opnieuw = werk;
    k.ctrl.addEventListener('click', e => { if (n >= 100 && e.target.textContent === 'Schud de punten') klaar(); });
    opnieuw(); legGrepen();
  };

  /* --- de uitgerekte S ---------------------------------------------------------------------------- */
  AX.labs.rekS = function (el) {
    const k = kader(el, { titel: 'Rek de S uit', tekst: 'Het teken $\\int$ is een uitgerekte S, van som. Trek de bovenkant van de S omhoog en laat los: de stroken worden smaller, en de som wordt een integraal. Tik daarna eens op de veer.' });
    k.fig.classList.add('reks');
    const links = document.createElement('div'); links.className = 'reks-s'; k.fig.appendChild(links);
    const rechts = document.createElement('div'); rechts.className = 'reks-g'; k.fig.appendChild(rechts);
    const S0 = [46, 18, 34, 6, 12, 8, 12, 26, 12, 46, 48, 46, 48, 66, 48, 84, 24, 88, 10, 74];
    const S1 = [44, 14, 38, 2, 26, 2, 25, 20, 23, 60, 33, 140, 31, 180, 30, 198, 16, 200, 12, 186];
    const svg = G.maak('svg', { viewBox: '0 0 150 230', class: 'reks-svg', role: 'img', 'aria-label': 'Een S die je uitrekt tot een integraalteken' }, links);
    const grp = G.maak('g', { transform: 'translate(40 16)' }, svg);
    const pad = G.maak('path', { class: 'reks-pad' }, grp);
    /* Een brede onzichtbare lijn: daarop kun je de veer aantikken. */
    const raak = G.maak('path', { class: 'reks-raak' }, grp);
    const hand = G.maak('g', { class: 'greep', tabindex: 0, role: 'slider', 'aria-label': 'Rek de S uit' }, svg);
    G.maak('circle', { r: 22, class: 'greep-raak' }, hand); G.maak('circle', { r: 11, class: 'greep-ring' }, hand); G.maak('circle', { r: 4.5, class: 'greep-kern' }, hand);
    const form = document.createElement('div');
    form.className = 'reks-formule';
    links.appendChild(form);
    const g = new Graf(rechts, { x: [-.1, 2.3], y: [-.2, 4.7], w: 420, h: 300, pad: { l: 30, r: 16, t: 18, b: 28 }, xticks: [1, 2], yticks: [2, 4], label: 'De stroken onder de grafiek worden smaller terwijl je de S uitrekt' });
    const laag = g.laag('rh');
    g.kromme(KW, 0, 2.1);
    let t = 0, af = false, tril = 0, stopTril = null;
    const teken = (w) => {
      t = w;
      const p = S0.map((v, i) => v + (S1[i] - v) * t);
      const d = `M${p[0]} ${p[1]}C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}S${p[10]} ${p[11]} ${p[12]} ${p[13]}C${p[14]} ${p[15]} ${p[16]} ${p[17]} ${p[18]} ${p[19]}`;
      pad.setAttribute('d', d);
      raak.setAttribute('d', d);
      pad.style.strokeWidth = Math.max(3, 11 - 6 * t);
      /* De onderkant blijft staan; de bovenkant, met de greep eraan, gaat omhoog en trilt heen en weer. */
      const zak = 14 + (1 - t) * 112;
      const voet = 88 + 112 * t;
      grp.setAttribute('transform', `translate(40 ${zak}) translate(25 ${voet}) skewX(${tril}) translate(-25 ${-voet})`);
      const opzij = -(voet - p[1]) * Math.tan(tril * Math.PI / 180);
      hand.setAttribute('transform', `translate(${40 + p[0] + opzij} ${zak + p[1] - 6})`);
      const n = Math.round(3 + t * t * 77);
      laag.zet(riemann(KW, 0, 2, n, 1));
    };
    const lees = w => {
      form.innerHTML = w
        ? wiskunde(`$$\\int_{\\ac{a}}^{\\ac{b}} \\acb{f(x)}\\,\\acc{\\mathrm{d}x}$$`) + '<ul class="anatomie"><li><i class="ac"></i>ondergrens en bovengrens</li><li><i class="acb"></i>integrand</li><li><i class="acc"></i>de breedte $\\Delta x$ wordt $\\mathrm{d}x$</li></ul>'.replace(/\$([^$]+)\$/g, (_, m) => tex(m))
        : wiskunde(`$$\\sum_{k=1}^{n} f(c_k)\\,\\Delta x$$`);
    };
    lees(false);
    /* Weinig demping: de veer schiet voorbij haar eindpunt en veert een paar keer na. */
    const veer = new Veer(0, w => { if (!hand.classList.contains('vast')) teken(w); }, { k: 300, c: 7 });
    const trillen = kracht => {
      if (stopTril) stopTril();
      stopTril = tween(1200, (_, p) => {
        tril = 8 * kracht * Math.exp(-4.2 * p) * Math.sin(p * 2 * Math.PI * 12);
        teken(t);
      }, { ease: x => x, klaar: () => { tril = 0; teken(t); stopTril = null; } });
    };
    const plukken = kracht => { Geluid.veer(kracht); trillen(kracht); };
    let begin = 0, startT = 0;
    const laat = () => {
      hand.classList.remove('vast');
      veer.w = t; veer.v = 0;
      if (t > .7) {
        veer.naar(1);
        plukken(1);
        if (!af) {
          af = true; AX.spat(form, 14); AX.voortgang.oef['lab-reks'] = 'goed'; AX.bewaar();
          setTimeout(() => Geluid.goed(), 900);
        }
        lees(true);
      } else {
        veer.naar(0);
        if (t > .08) plukken(t / .7);
        af = false; lees(false);
      }
    };
    hand.addEventListener('pointerdown', e => {
      hand.setPointerCapture(e.pointerId); hand.classList.add('vast'); begin = e.clientY; startT = t; e.preventDefault();
      if (stopTril) { stopTril(); stopTril = null; tril = 0; }
    });
    hand.addEventListener('pointermove', e => {
      if (!hand.hasPointerCapture(e.pointerId)) return;
      const schaal = 230 / svg.getBoundingClientRect().height;
      const w = Math.max(0, Math.min(1, startT + (begin - e.clientY) * schaal / 112));
      Geluid.rek(w, Math.min(1, Math.abs(w - t) * 40));
      teken(w);
    });
    hand.addEventListener('pointerup', laat);
    hand.addEventListener('pointercancel', laat);
    /* Met de pijltjes: omhoog rekt ze meteen helemaal uit, omlaag laat ze terugschieten. */
    hand.addEventListener('keydown', e => {
      const d = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[e.key];
      if (!d) return; e.preventDefault();
      teken(d > 0 ? .85 : Math.min(t, .6));
      laat();
    });
    raak.addEventListener('pointerdown', e => { e.preventDefault(); plukken(.35 + .65 * Math.max(0, Math.min(1, t))); });
    k.ctrl.innerHTML = wiskunde('<p class="lab-noot">Lees $\\int_a^b f(x)\\,\\mathrm{d}x$ als de integraal van $a$ tot $b$ van $f(x)\\,\\mathrm{d}x$. De notatie vertelt nog hoe de integraal ontstaan is.</p>');
    k.uit.remove();
    teken(0);
  };

  /* --- georiënteerde oppervlakte ------------------------------------------------------------------- */
  AX.labs.georient = function (el) {
    const f = x => .25 * x * (x - 2) * (x - 4);
    const k = kader(el, { titel: 'Integraal of oppervlakte?', tekst: 'Sleep de grenzen $a$ en $b$. Stukken boven de as tellen positief, stukken eronder negatief.' });
    const g = new Graf(k.fig, { x: [-.5, 5.2], y: [-1.15, 2.2], w: 640, h: 340, xticks: [1, 2, 3, 4, 5], yticks: [-1, 1, 2], rooster: true, label: 'Grafiek met een gebied boven en onder de horizontale as' });
    const v = g.tekenGebied(f, 0, 4.6);
    g.kromme(f, -.2, 4.9);
    let a = 0, b = 4.6;
    const zet = uitvoer(k.uit, [
      { k: 'i', l: '$\\int_a^b f(x)\\,\\mathrm{d}x$', klas: 'groot' },
      { k: 'o', l: 'werkelijke oppervlakte', klas: 'groot' },
    ]);
    const lA = g.tekst(a, 0, 'a', { klas: 'greep-naam', dy: 34 });
    const lB = g.tekst(b, 0, 'b', { klas: 'greep-naam', dy: 34 });
    const klaar = missie(k.mis, 'Zoek grenzen waarvoor de integraal 0 is, terwijl de oppervlakte niet 0 is.', 'georient');
    const teken = () => {
      v.zet(f, a, b);
      lA.zet(a, 0); lB.zet(b, 0);
      const i = integraal(f, a, b), o = opp(f, a, b);
      zet('i', fmt(i)); zet('o', fmt(o));
      if (Math.abs(i) < .02 && o > .5) klaar();
    };
    /* Een tik wanneer een grens de as kruist: daar wisselt het teken. */
    const nulp = [0, 2, 4];
    const kruis = (o, n) => { if (nulp.some(z => (o - z) * (n - z) < 0)) Geluid.tik(.8); };
    g.greep({ x: a, y: 0, min: -.3, max: 4.9, naam: 'Ondergrens a', op: (w, d) => { kruis(a, w); a = w; Geluid.rek(w / 5, Math.min(1, d * 8)); teken(); } });
    g.greep({ x: b, y: 0, min: -.3, max: 4.9, naam: 'Bovengrens b', op: (w, d) => { kruis(b, w); b = w; Geluid.rek(w / 5, Math.min(1, d * 8)); teken(); } });
    teken();
  };

  /* --- het karretje -------------------------------------------------------------------------------- */
  AX.labs.robot = function (el) {
    const v = t => t < 2 ? 2 * t : t < 5 ? 4 : t < 7 ? 4 - 2 * (t - 5) : -(t - 7);
    const pos = t => integraal(v, 0, t, 200);
    const k = kader(el, { titel: 'Rij met het karretje', tekst: 'Boven de as rijdt het karretje vooruit, onder de as achteruit. Kijk hoe de verplaatsing en de afgelegde weg uit elkaar gaan.' });
    const g = new Graf(k.fig, { x: [0, 9.7], y: [-2.8, 4.9], w: 640, h: 300, xnaam: 't (s)', ynaam: 'v (m/s)', xticks: [2, 5, 7, 9], yticks: [-2, 4], rooster: true, label: 'Snelheid van het karretje in de tijd' });
    g.kromme(v, 0, 9);
    const vlak = g.tekenGebied(v, 0, 0);
    const lijn = g.lijn(0, -2.8, 0, 4.9, 'kijklijn');
    const bol = g.punt(0, 0);
    const baan = document.createElement('div');
    baan.className = 'baan';
    baan.innerHTML = `<div class="baan-lijn">${[0, 5, 10, 15, 20].map(m => `<span style="left:${m / 22 * 100}%">${m}</span>`).join('')}<i class="baan-spoor"></i><svg class="robot" viewBox="0 0 46 34" aria-hidden="true"><rect x="3" y="6" width="40" height="19" rx="5"/><circle cx="14" cy="15" r="3.2" class="oog"/><circle cx="32" cy="15" r="3.2" class="oog"/><circle cx="12" cy="28" r="5"/><circle cx="34" cy="28" r="5"/></svg></div>`;
    k.fig.appendChild(baan);
    const robot = $('.robot', baan), spoor = $('.baan-spoor', baan);
    const zet = uitvoer(k.uit, [{ k: 'v', l: 'snelheid' }, { k: 'd', l: 'verplaatsing', klas: 'groot' }, { k: 'w', l: 'afgelegde weg', klas: 'groot' }]);
    let t = 0, loopt = false, stopLus = null, piep = 0;
    const teken = () => {
      vlak.zet(v, 0, t);
      lijn.zet(t, -2.8, t, 4.9);
      bol.zet(t, v(t));
      const d = pos(t), wg = opp(v, 0, t, 200);
      zet('v', fmt(v(t), 1) + ' m/s'); zet('d', fmt(d, 1) + ' m'); zet('w', fmt(wg, 1) + ' m');
      robot.style.left = `${d / 22 * 100}%`;
      robot.classList.toggle('achteruit', v(t) < -.01);
      spoor.style.transform = `scaleX(${d / 22})`;
      sch.zet(t, true);
    };
    const stop = () => { loopt = false; if (stopLus) stopLus(); stopLus = null; Geluid.motorStop(); sp.textContent = t >= 9 ? 'Rij opnieuw' : 'Rij'; };
    const sp = knop(k.ctrl, 'Rij', () => {
      if (loopt) return stop();
      if (t >= 9) t = 0;
      loopt = true; sp.textContent = 'Pauze';
      if (G.rust()) { t = 9; teken(); return stop(); }
      stopLus = G.anim(dt => {
        t = Math.min(9, t + dt * 1.25);
        teken();
        Geluid.motorZet(Math.abs(v(t)) / 4.5);
        if (v(t) < -.01) { piep -= dt; if (piep <= 0) { Geluid.piep(); piep = .42; } }
        if (t >= 9) { stop(); Geluid.goed(); return false; }
        return true;
      });
    }, 'knop');
    const sch = schuif(k.ctrl, { label: 'Tijd', min: 0, max: 9, stap: .05, w: 0, rek: false, toon: x => fmt(x, 1) + ' s', op: x => { t = x; if (loopt) stop(); teken(); } });
    stopBuitenBeeld(el, stop);
    teken();
  };

  /* --- de rekenregels -------------------------------------------------------------------------------- */
  const FR = x => 1.3 + .5 * Math.sin(1.4 * x);
  const GR = x => .75 + .25 * Math.sin(2.1 * x + 1);
  AX.labs.regels = function (el) {
    const k = kader(el, { titel: 'Zie de regels gebeuren', tekst: 'Kies een regel en speel ermee. De getallen rekenen live mee.' });
    const zone = document.createElement('div');
    k.fig.appendChild(zone);
    const Xt = { x: [-.1, 4.2], w: 640, h: 320, label: 'Grafiek bij de gekozen rekenregel' };
    const regels = {
      gelijk() {
        const g = new Graf(zone, { ...Xt, y: [-.1, 2.3], xticks: [], yticks: [] });
        const z = g.gebied(FR, 1, 3); g.kromme(FR, .1, 4);
        let a = 1, b = 3;
        const lb = g.tekst(a, 0, 'a', { klas: 'greep-naam', dy: 26 }), lc = g.tekst(b, 0, 'b', { klas: 'greep-naam', dy: 26 });
        const w = () => { z.zet(FR, a, b); lb.zet(a, 0); lc.zet(b, 0); zet('i', fmt(integraal(FR, a, b))); if (Math.abs(b - a) < .012) Geluid.tik(1); };
        const zet = uitvoer(k.uit, [{ k: 'i', l: '$\\int_a^b f(x)\\,\\mathrm{d}x$', klas: 'groot' }]);
        k.ctrl.innerHTML = '';
        schuif(k.ctrl, { label: 'Breng $b$ naar $a$', min: 0, max: 2, stap: .01, w: 2, toon: v => `$b - a = ${fmt(v)}$`, op: v => { b = a + v; w(); } });
        w();
      },
      wissel() {
        const g = new Graf(zone, { ...Xt, y: [-.4, 2.3], xticks: [{ v: 1, s: '1' }, { v: 3, s: '4' }], yticks: [] });
        g.gebied(FR, 1, 3); g.kromme(FR, .1, 4);
        const pijl = G.maak('path', { class: 'pijl-groot' }, g.lagen.top);
        let richting = 1;
        const veer = new Veer(1, s => {
          const x1 = g.sx(2 - s * .9), x2 = g.sx(2 + s * .9), y = g.sy(.5);
          pijl.setAttribute('d', `M${x1} ${y}L${x2} ${y}M${x2 - 12 * Math.sign(s || 1)} ${y - 8}L${x2} ${y}L${x2 - 12 * Math.sign(s || 1)} ${y + 8}`);
        }, { k: 180, c: 17 });
        veer.naar(1, true);
        k.ctrl.innerHTML = '';
        k.uit.innerHTML = `<div class="meet groot"><span class="meet-label wisselvorm"></span><strong class="meet-w wisselwaarde"></strong></div>`;
        const w = () => {
          $('.wisselvorm', k.uit).innerHTML = tex(richting > 0 ? '\\int_1^4 f(x)\\,\\mathrm{d}x' : '\\int_4^1 f(x)\\,\\mathrm{d}x');
          $('.wisselwaarde', k.uit).textContent = richting > 0 ? '6' : '−6';
        };
        knop(k.ctrl, 'Wissel de grenzen', () => { richting *= -1; Geluid.zwiep(); veer.naar(richting); w(); }, 'knop');
        const noot = document.createElement('p'); noot.className = 'lab-noot';
        noot.textContent = 'Hetzelfde gebied, maar in de andere richting doorlopen: de integraal krijgt een minteken.';
        k.ctrl.appendChild(noot);
        w();
      },
      optel() {
        const a = .4, c = 3.2;
        const g = new Graf(zone, { ...Xt, y: [-.25, 2.3], xticks: [{ v: a, s: 'a' }, { v: c, s: 'c' }], yticks: [] });
        const eerste = g.gebied(FR, a, 1.8), tweede = g.gebied(FR, 1.8, c, 'vlak-licht');
        g.kromme(FR, .1, 4);
        let b = 1.8;
        const lb = g.tekst(b, 0, 'b', { klas: 'greep-naam', dy: 34 });
        k.ctrl.innerHTML = '<p class="lab-noot">Sleep $b$ ook voorbij $c$. Dan telt $\\int_b^c$ negatief, en toch klopt de som: daarvoor dient de afspraak over het wisselen van de grenzen.</p>'.replace(/\$([^$]+)\$/g, (_, m) => tex(m));
        const zet = uitvoer(k.uit, [{ k: 'x', l: '$\\int_a^b$' }, { k: 'y', l: '$\\int_b^c$' }, { k: 's', l: 'som $= \\int_a^c$', klas: 'groot accent' }]);
        const w = () => {
          eerste.zet(FR, a, b);
          if (b <= c) { tweede.setAttribute('class', 'vlak-licht'); tweede.zet(FR, b, c); }
          else { tweede.setAttribute('class', 'vlak-neg'); tweede.zet(FR, c, b); }
          lb.zet(b, 0);
          const x = integraal(FR, a, b), y = integraal(FR, b, c);
          zet('x', fmt(x)); zet('y', fmt(y)); zet('s', fmt(x + y));
        };
        g.greep({ x: b, y: 0, min: a + .02, max: 4.05, naam: 'Punt b', op: (v, d) => { const o = b; b = v; if ((o - c) * (v - c) < 0) Geluid.tik(.9); Geluid.rek((v - a) / 3.7, Math.min(1, d * 10)); w(); } });
        w();
      },
      lin() {
        const a = .4, c = 3.6;
        const g = new Graf(zone, { ...Xt, y: [-2.4, 7.4], xticks: [{ v: a, s: 'a' }, { v: c, s: 'b' }], yticks: [] });
        let r = 2, s = 1;
        const h = x => r * FR(x) + s * GR(x);
        const z = g.tekenGebied(h, a, c);
        g.kromme(FR, .1, 4, 'kromme-dun');
        g.kromme(GR, .1, 4, 'kromme-dun kromme-dun2');
        const K = g.kromme(h, .1, 4);
        const zet = uitvoer(k.uit, [{ k: 'l', l: '$\\int_a^b \\bigl(rf + sg\\bigr)\\,\\mathrm{d}x$', klas: 'groot accent' }, { k: 'r', l: '$r\\int_a^b f\\,\\mathrm{d}x + s\\int_a^b g\\,\\mathrm{d}x$', klas: 'groot' }]);
        const If = integraal(FR, a, c), Ig = integraal(GR, a, c);
        const w = () => { K.zet(h, .1, 4); z.zet(h, a, c); const u = fmt(r * If + s * Ig); zet('l', u); zet('r', u); };
        k.ctrl.innerHTML = '';
        schuif(k.ctrl, { label: 'Rek $f$ uit:', min: -1, max: 3, stap: .05, w: r, toon: v => `$r = ${fmt(v, 2)}$`, op: v => { r = v; w(); } });
        schuif(k.ctrl, { label: 'Rek $g$ uit:', min: -1, max: 3, stap: .05, w: s, toon: v => `$s = ${fmt(v, 2)}$`, op: v => { s = v; w(); } });
        w();
      },
      verg() {
        const g = new Graf(zone, { ...Xt, y: [-.1, 2.4], xticks: [], yticks: [] });
        const F = x => .55 + .22 * Math.sin(1.8 * x), Gg = x => 1.55 + .3 * Math.sin(1.4 * x);
        const z1 = g.gebied(Gg, .8, 3.2, 'vlak-licht'), z2 = g.gebied(F, .8, 3.2);
        g.kromme(Gg, .1, 4); g.kromme(F, .1, 4);
        g.tekst(3.95, Gg(3.95), 'g', { klas: 'label', dy: -10 }); g.tekst(3.95, F(3.95), 'f', { klas: 'label', dy: -10 });
        let a = .8, b = 3.2;
        const zet = uitvoer(k.uit, [{ k: 'f', l: '$\\int_a^b f(x)\\,\\mathrm{d}x$', klas: 'groot' }, { k: 't', l: '', klas: 'teken' }, { k: 'g', l: '$\\int_a^b g(x)\\,\\mathrm{d}x$', klas: 'groot' }]);
        zet('t', '≤');
        const w = () => { z1.zet(Gg, a, b); z2.zet(F, a, b); zet('f', fmt(integraal(F, a, b))); zet('g', fmt(integraal(Gg, a, b))); };
        k.ctrl.innerHTML = '<p class="lab-noot">De grafiek van $f$ ligt overal onder die van $g$. Welke grenzen je ook kiest (met $a \\leqslant b$), het kleine gebied past in het grote.</p>'.replace(/\$([^$]+)\$/g, (_, m) => tex(m));
        g.greep({ x: a, y: 0, min: .1, max: 4, naam: 'Ondergrens a', op: (v, d) => { a = Math.min(v, b); Geluid.rek(v / 4, Math.min(1, d * 8)); w(); } });
        g.greep({ x: b, y: 0, min: .1, max: 4, naam: 'Bovengrens b', op: (v, d) => { b = Math.max(v, a); Geluid.rek(v / 4, Math.min(1, d * 8)); w(); } });
        w();
      },
    };
    const kies = naam => { zone.innerHTML = ''; k.uit.innerHTML = ''; regels[naam](); };
    const sg = document.createElement('div');
    k.fig.prepend(sg);
    seg(sg, '', [{ w: 'gelijk', t: 'Gelijke grenzen' }, { w: 'wissel', t: 'Grenzen wisselen' }, { w: 'optel', t: 'Optelbaarheid' }, { w: 'lin', t: 'Lineariteit' }, { w: 'verg', t: 'Vergelijken' }], 'optel', kies);
    kies('optel');
  };

  /* --- even en oneven ------------------------------------------------------------------------------- */
  AX.labs.symmetrie = function (el) {
    const k = kader(el, { titel: 'Spiegel het linkerstuk', tekst: 'Kies een functie en zeg eerst zelf of ze even of oneven is. Dan klapt het linkerstuk om.' });
    const FN = {
      x2: { f: x => .5 * x * x, t: '$\\tfrac12 x^2$', soort: 'even' },
      cos: { f: x => 1.5 + 1.5 * Math.cos(1.6 * x), t: '$\\tfrac32 + \\tfrac32\\cos(1{,}6x)$', soort: 'even' },
      x3: { f: x => .3 * x * x * x, t: '$0{,}3\\,x^3$', soort: 'oneven' },
      sin: { f: x => 2 * Math.sin(1.2 * x), t: '$2\\sin(1{,}2x)$', soort: 'oneven' },
      mix: { f: x => .3 * x * x * x + 1, t: '$0{,}3\\,x^3 + 1$', soort: 'geen van beide' },
    };
    let fn = FN.x2, a = 2.2, g, links, rechts, kop;
    const fz = document.createElement('div');
    k.fig.appendChild(fz);
    g = new Graf(fz, { x: [-3.1, 3.1], y: [-4, 4.3], w: 640, h: 360, xticks: [-3, -2, -1, 1, 2, 3], yticks: [-4, -2, 2, 4], rooster: true, label: 'Grafiek van een functie op een symmetrisch interval' });
    rechts = g.tekenGebied(fn.f, 0, a);
    const klap = G.maak('g', {}, g.lagen.gebied);
    const lp = G.maak('path', { class: 'vlak vlak-klap' }, klap);
    const ln = G.maak('path', { class: 'vlak-neg vlak-klap' }, klap);
    kop = g.kromme(fn.f, -3, 3);
    const zet = uitvoer(k.uit, [{ k: 'i', l: '$\\int_{-a}^{a} f(x)\\,\\mathrm{d}x$', klas: 'groot' }, { k: 'r', l: '$\\int_0^a f(x)\\,\\mathrm{d}x$' }]);
    const bericht = document.createElement('p');
    bericht.className = 'lab-noot'; bericht.setAttribute('role', 'status');
    k.uit.appendChild(bericht);
    const lg = document.createElement('div');
    const cx = () => g.sx(0), cy = () => g.sy(0);
    let stopKlap = null;
    const zetKlap = t => {
      if (fn.soort === 'oneven') klap.setAttribute('transform', `rotate(${180 * t} ${cx()} ${cy()})`);
      else { const s = 1 - 2 * t; klap.setAttribute('transform', `translate(${cx()} 0) scale(${s} 1) translate(${-cx()} 0)`); }
    };
    const teken = () => {
      rechts.zet(fn.f, 0, a);
      lp.setAttribute('d', g.vlakPad(x => Math.max(0, fn.f(x)), -a, 0));
      ln.setAttribute('d', g.vlakPad(x => Math.min(0, fn.f(x)), -a, 0));
      kop.zet(fn.f, -3, 3);
      zet('i', fmt(integraal(fn.f, -a, a))); zet('r', fmt(integraal(fn.f, 0, a)));
    };
    const speel = () => {
      if (stopKlap) stopKlap();
      Geluid.zwiep();
      zetKlap(0);
      stopKlap = tween(620, t => zetKlap(t), { ease: easeInOut, klaar: () => {
        Geluid.tik(.7);
        bericht.innerHTML = wiskunde(fn.soort === 'even'
          ? 'Het linkerstuk valt op het rechterstuk: het gebied telt twee keer, en de integraal is $2\\int_0^a f(x)\\,\\mathrm{d}x$.'
          : fn.soort === 'oneven' ? 'Het linkerstuk valt op het rechterstuk, maar met het andere teken: samen geven ze 0.'
            : 'De stukken vallen niet samen. Splits: $0{,}3x^3$ is oneven en geeft 0, de rest is een rechthoek met hoogte 1.');
        setTimeout(() => { if (stopKlap) stopKlap(); stopKlap = tween(380, t => zetKlap(1 - t), { ease: easeInOut }); }, 1100);
      } });
    };
    seg(k.ctrl, 'Functie', Object.entries(FN).map(([w, v]) => ({ w, t: v.t })), 'x2', w => { fn = FN[w]; zetKlap(0); bericht.textContent = ''; teken(); kiezen.querySelectorAll('button').forEach(b => { b.classList.remove('goed', 'fout'); b.disabled = false; }); });
    schuif(k.ctrl, { label: 'Grens', min: .4, max: 3, stap: .05, w: a, toon: v => `$a = ${fmt(v, 2)}$`, op: v => { a = v; teken(); } });
    const kiezen = document.createElement('div');
    kiezen.className = 'ctrl-groep';
    kiezen.innerHTML = `<span class="ctrl-label">Deze functie is</span><div class="keuzes">${['even', 'oneven', 'geen van beide'].map(s => `<button type="button" class="knop-keuze">${s}</button>`).join('')}</div>`;
    k.ctrl.appendChild(kiezen);
    let gevonden = new Set();
    const klaar = missie(k.mis, 'Herken alle vijf de functies.', 'symmetrie');
    $$('button', kiezen).forEach(b => b.addEventListener('click', () => {
      if (b.textContent === fn.soort) {
        b.classList.add('goed'); Geluid.goed(); speel();
        gevonden.add(fn); if (gevonden.size === 5) klaar();
      } else { b.classList.add('fout'); Geluid.fout(); b.disabled = true; bericht.innerHTML = wiskunde('Vergelijk $f(-x)$ en $f(x)$. Even: ze zijn gelijk. Oneven: $f(-x) = -f(x)$.'); }
    }));
    teken();
  };

  /* --- gemiddelde waarde: de ballon --------------------------------------------------------------- */
  AX.labs.gemiddelde = function (el) {
    const k = kader(el, { titel: 'Maak het gebied plat', tekst: 'Sleep de rechthoek tot ze dezelfde oppervlakte heeft als het gebied: wat boven de bovenkant uitsteekt, moet de gaten vullen. Laat het daarna platslaan.' });
    const FN = {
      alg: { f: ALG, a: .5, b: 3.5, ymax: 2.9, t: 'algemene functie', ticks: [{ v: .5, s: 'a' }, { v: 3.5, s: 'b' }], yt: [], x: [-.1, 3.9] },
      kw: { f: KW, a: 0, b: 2, ymax: 4.6, t: '$x^2$ op $[0,2]$', ticks: [1, 2], yt: [1, 2, 3, 4], x: [-.1, 2.3] },
      kr: { f: x => Math.sqrt(Math.max(0, 9 - x * x)), a: 0, b: 3, ymax: 3.5, t: '$\\sqrt{9-x^2}$ op $[0,3]$', ticks: [1, 2, 3], yt: [1, 2, 3], x: [-.1, 3.4] },
    };
    let fn = FN.alg, L, gem, g, basis, boven, onder, kurve, rand, greep, massa = null, cPunten = [], af = false, stopM = null;
    /* Na het platslaan: terug naar de echte grafiek zodra de leerling weer sleept. */
    const herstel = () => {
      if (stopM) { stopM(); stopM = null; }
      if (massa) { massa.remove(); massa = null; kurve.zet(fn.f, fn.a, fn.b); }
    };
    const fz = document.createElement('div');
    k.fig.appendChild(fz);
    const zet = uitvoer(k.uit, [{ k: 'l', l: 'hoogte van de rechthoek' }, { k: 'v', l: 'oppervlakte van de rechthoek' }, { k: 'a', l: 'oppervlakte van het gebied', klas: 'accent' }]);
    const bal = document.createElement('div');
    bal.className = 'balans';
    bal.innerHTML = '<span>te laag</span><div class="balans-as"><i></i></div><span>te hoog</span>';
    k.uit.appendChild(bal);
    const balWijzer = $('.balans-as i', bal);
    const berek = () => {
      const { f, a, b } = fn;
      basis.setAttribute('d', g.vlakPad(x => Math.min(f(x), L), a, b));
      boven.setAttribute('d', g.vlakPad(x => Math.max(f(x), L), a, b, x => L));
      onder.setAttribute('d', g.vlakPad(x => Math.min(f(x), L), a, b, x => L));
      rand.zet(fn.a, L, fn.b, L);
      const breed = b - a;
      zet('l', fmt(L)); zet('v', fmt(L * breed)); zet('a', fmt(gem * breed));
      balWijzer.style.transform = `translateX(${Math.max(-1, Math.min(1, (L - gem) * 1.4)) * 44}cqw)`;
      const dicht = Math.abs(L - gem) < .012 * Math.max(1, gem);
      bal.classList.toggle('in-balans', dicht);
      return dicht;
    };
    const zoekC = () => {
      cPunten.forEach(p => p.remove()); cPunten = [];
      const { f, a, b } = fn; const n = 600;
      for (let i = 0; i < n; i++) {
        const x = a + (b - a) * i / n, y = a + (b - a) * (i + 1) / n;
        if ((f(x) - gem) * (f(y) - gem) < 0) {
          const c = (x + y) / 2;
          const l = g.lijn(c, 0, c, gem, 'hulplijn hulplijn-acc'); const p = g.punt(c, gem);
          const t = g.tekst(c, 0, 'c', { klas: 'greep-naam', dy: 20 });
          cPunten.push(l, p, t);
        }
      }
    };
    const vind = (dicht) => {
      if (dicht && !af) { af = true; L = gem; berek(); greep.zet((fn.a + fn.b) / 2, L); Geluid.goed(); zoekC(); klaarM(); }
    };
    const bouw = () => {
      if (stopM) { stopM(); stopM = null; }
      massa = null;
      fz.innerHTML = ''; cPunten = []; af = false;
      gem = integraal(fn.f, fn.a, fn.b) / (fn.b - fn.a);
      L = Math.min(fn.ymax * .85, gem * 1.45);
      g = new Graf(fz, { x: fn.x, y: [-.15, fn.ymax], w: 640, h: 350, xticks: fn.ticks, yticks: fn.yt, rooster: fn.yt.length > 0, label: 'Een gebied onder een grafiek en een rechthoek met dezelfde oppervlakte' });
      basis = G.maak('path', { class: 'vlak-basis' }, g.lagen.gebied);
      boven = G.maak('path', { class: 'vlak-boven' }, g.lagen.gebied);
      onder = G.maak('path', { class: 'vlak-onder' }, g.lagen.gebied);
      g.kromme(fn.f, fn.a, fn.b, 'kromme-dun');
      kurve = g.kromme(fn.f, fn.a, fn.b);
      rand = g.lijn(fn.a, L, fn.b, L, 'rand-rechthoek');
      greep = g.greep({
        x: (fn.a + fn.b) / 2, y: L, as: 'y', min: .02, max: fn.ymax - .05, stap: fn.ymax / 60, naam: 'Hoogte van de rechthoek',
        op: (v, d) => { herstel(); L = v; Geluid.rek(L / fn.ymax, Math.min(1, d * 14 / fn.ymax)); if (cPunten.length) { cPunten.forEach(p => p.remove()); cPunten = []; af = false; } vind(berek()); },
        los: () => { if (af) return; if (berek()) vind(true); else if (Math.abs(L - gem) < .05 * Math.max(1, gem)) { L = gem; greep.zet((fn.a + fn.b) / 2, L); vind(berek()); } },
      });
      berek();
    };
    const klaarM = missie(k.mis, 'Vind de hoogte waarbij de rechthoek en het gebied even groot zijn.', 'gemiddelde');
    seg(k.ctrl, 'Functie', Object.entries(FN).map(([w, f]) => ({ w, t: f.t })), 'alg', w => { fn = FN[w]; bouw(); });
    knop(k.ctrl, 'Sla plat', () => {
      herstel();
      Geluid.water();
      const { f, a, b } = fn;
      L = gem;
      greep.zet((a + b) / 2, gem);
      berek();
      [basis, boven, onder].forEach(e => e.setAttribute('d', ''));
      massa = g.gebied(f, a, b, 'vlak-massa');
      /* Dezelfde oppervlakte tijdens de hele beweging: hoogte = f + w(gem - f). */
      stopM = tween(1100, t => {
        const w = t + .06 * Math.sin(t * 12) * (1 - t);
        const h = x => f(x) + w * (gem - f(x));
        massa.zet(h, a, b);
        kurve.zet(h, a, b);
      }, { ease: easeInOut, klaar: () => { stopM = null; Geluid.tik(.6); if (!af) { af = true; zoekC(); klaarM(); } } });
    }, 'knop');
    knop(k.ctrl, 'Begin opnieuw', () => { Geluid.klik(); bouw(); });
    bouw();
  };

  /* --- vaste figuren --------------------------------------------------------------------------------- */
  const mini = (ouder, o) => new Graf(ouder, Object.assign({ w: 320, h: 230, pad: { l: 20, r: 20, t: 18, b: 26 } }, o));
  const ab = [{ v: .5, s: 'a' }, { v: 3.5, s: 'b' }];
  const rijFig = (el, stukken, label) => {
    el.classList.add('figrij-live');
    el.setAttribute('role', 'group');
    if (label) el.setAttribute('aria-label', label);
    stukken.forEach((s, i) => {
      if (typeof s === 'string') { const e = document.createElement('span'); e.className = 'fig-teken'; e.innerHTML = tex(s); el.appendChild(e); }
      else { const d = document.createElement('div'); d.className = 'fig-stuk'; el.appendChild(d); s(d); }
    });
  };

  AX.figuren.ongelijkheid = el => rijFig(el, [
    d => { const g = mini(d, { x: [-.1, 3.9], y: [-.1, 2.8], xticks: ab }); g.laag('rh').zet(riemann(ALG, .5, 3.5, 6, 'o'), { direct: true }); g.kromme(ALG, .3, 3.7); g.formule(2.5, 2.55, 'O_n', { klas: 'ac' }); },
    '\\leqslant',
    d => { const g = mini(d, { x: [-.1, 3.9], y: [-.1, 2.8], xticks: ab }); g.gebied(ALG, .5, 3.5); g.kromme(ALG, .3, 3.7); g.formule(2.5, 2.55, 'A', { klas: 'ac' }); },
    '\\leqslant',
    d => { const g = mini(d, { x: [-.1, 3.9], y: [-.1, 2.8], xticks: ab }); g.laag('rh').zet(riemann(ALG, .5, 3.5, 6, 'b'), { direct: true }); g.kromme(ALG, .3, 3.7); g.formule(2.5, 2.55, 'B_n', { klas: 'ac' }); },
  ], 'De rechthoeken van de ondersom passen in het gebied, en het gebied past in de rechthoeken van de bovensom');

  AX.figuren['riemann-th'] = el => {
    const f = x => 1 + .8 * Math.sin((x - .5) * 60 * Math.PI / 180) + .2 * x;
    const g = mini(el, { x: [-.1, 3.9], y: [-.15, 3.2], xticks: ab, label: 'Een Riemannsom met rechthoeken waarvan de hoogte in het midden van elk deel genomen is' });
    g.laag('rh').zet(riemann(f, .5, 3.5, 6, .5), { direct: true }); g.kromme(f, .3, 3.7);
    g.formule(1.25, -.02, '\\Delta x', { b: 40, h: 22 }).setAttribute('y', g.sy(0) + 3);
  };

  AX.figuren['georient-th'] = el => {
    const f = x => .25 * x * (x - 2) * (x - 4);
    const g = mini(el, { x: [-.2, 5.1], y: [-1.1, 2], xticks: [], label: 'Drie gebieden: A1 boven de as, A2 eronder en A3 weer erboven' });
    g.tekenGebied(f, 0, 4.6); g.kromme(f, 0, 4.62);
    g.formule(1, .33, 'A_1', { b: 40, h: 24, klas: 'wit' }); g.formule(3, -.35, 'A_2', { b: 40, h: 24, klas: 'wit' }); g.formule(4.42, .22, 'A_3', { b: 34, h: 22, klas: 'wit' });
    g.tekst(0, 0, 'a', { klas: 'tick', dy: 18, dx: -6 }); g.tekst(4.6, 0, 'b', { klas: 'tick', dy: 18 });
  };

  AX.figuren['mvs-th'] = el => {
    const f = x => .8 + .75 * x + .25 * Math.sin(x * 150 * Math.PI / 180);
    const h = integraal(f, .5, 3.5) / 3;
    const g = mini(el, { x: [-.1, 3.9], y: [-.1, 4.1], xticks: ab, label: 'Rechthoek op het interval met dezelfde oppervlakte als het gebied onder de grafiek' });
    g.laag('rh rh-licht').zet([{ x: .5, w: 3, h }], { direct: true });
    g.kromme(f, .3, 3.7); g.lijn(.5, h, 3.5, h, 'hulplijn hulplijn-acc');
  };

  AX.figuren['mvs-bewijs'] = el => rijFig(el, [
    d => { const g = mini(d, { x: [-.1, 3.9], y: [-.1, 2.8], xticks: ab, yticks: [{ v: .9, s: 'm' }] }); g.laag('rh').zet([{ x: .5, w: 3, h: .9 }], { direct: true }); g.kromme(ALG, .3, 3.7); },
    '\\leqslant',
    d => { const g = mini(d, { x: [-.1, 3.9], y: [-.1, 2.8], xticks: ab }); g.gebied(ALG, .5, 3.5); g.kromme(ALG, .3, 3.7); },
    '\\leqslant',
    d => { const g = mini(d, { x: [-.1, 3.9], y: [-.1, 2.8], xticks: ab, yticks: [{ v: 2.3, s: 'M' }] }); g.laag('rh').zet([{ x: .5, w: 3, h: 2.3 }], { direct: true }); g.kromme(ALG, .3, 3.7); },
  ], 'De oppervlakte onder de grafiek ligt tussen een lage rechthoek met hoogte m en een hoge met hoogte M');

  AX.figuren['alg-rechthoek'] = el => {
    const g = new Graf(el, { x: [-.1, 3.9], y: [-.1, 2.8], w: 520, h: 300, xticks: ab, label: 'Bij een algemene functie: per deel een donkere rechthoek met de kleinste en een lichtere met de grootste functiewaarde' });
    const l1 = g.laag('rh rh-licht'), l2 = g.laag('rh');
    g.kromme(ALG, .3, 3.7);
    l1.zet(riemann(ALG, .5, 3.5, 6, 'b'), { direct: true });
    l2.zet(riemann(ALG, .5, 3.5, 6, 'o'), { direct: true });
  };
})();
