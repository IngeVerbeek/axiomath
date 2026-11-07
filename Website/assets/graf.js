/* De grafiekmotor: SVG met assen, krommen, gebieden, rechthoeken met veren, en versleepbare punten. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const rust = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  const maak = (naam, attrs = {}, ouder) => {
    const e = document.createElementNS(NS, naam);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (ouder) ouder.appendChild(e);
    return e;
  };

  /* Getallen in het Nederlands, met een komma. */
  const fmt = (x, d = 2) => {
    if (!isFinite(x)) return '–';
    const s = (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace('.', ',');
    return s.replace('-', '−');
  };

  /* Simpson; n even. Werkt ook als b < a. */
  function integraal(f, a, b, n = 300) {
    if (a === b) return 0;
    const h = (b - a) / n;
    let s = f(a) + f(b);
    for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
    return s * h / 3;
  }
  /* Oppervlakte met |f|. */
  const opp = (f, a, b, n = 400) => integraal(x => Math.abs(f(x)), a, b, n);

  /* Kleinste en grootste waarde op een deel: bemonsterd, de functies hier zijn glad. */
  function uiterste(f, l, r, n = 24) {
    let lo = Infinity, hi = -Infinity;
    for (let i = 0; i <= n; i++) {
      const y = f(l + (r - l) * i / n);
      if (y < lo) lo = y;
      if (y > hi) hi = y;
    }
    return [lo, hi];
  }

  /* Een doorlopende animatielus voor alles met een veer. */
  const actief = new Set();
  let draait = false, vorige = 0;
  function lus(nu) {
    const dt = Math.min(0.032, (nu - vorige) / 1000 || 0.016);
    vorige = nu;
    actief.forEach(a => { if (!a(dt)) actief.delete(a); });
    if (actief.size) requestAnimationFrame(lus); else draait = false;
  }
  function anim(stap) {
    actief.add(stap);
    if (!draait) { draait = true; vorige = performance.now(); requestAnimationFrame(lus); }
    return () => actief.delete(stap);
  }

  /* Tijdgebonden animatie, met een sterke ease-out als standaard. */
  const easeOut = t => 1 - Math.pow(1 - t, 3.4);
  const easeInOut = t => t < .5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  function tween(duur, cb, { ease = easeOut, klaar } = {}) {
    if (rust()) { cb(1, 1); if (klaar) klaar(); return () => {}; }
    let t = 0;
    return anim(dt => {
      t += dt * 1000;
      const p = Math.min(1, t / duur);
      cb(ease(p), p);
      if (p >= 1) { if (klaar) klaar(); return false; }
      return true;
    });
  }

  /* Eén getal met een veer: voor alles wat je kunt onderbreken. */
  class Veer {
    constructor(w, zet, { k = 210, c = 22 } = {}) { this.w = w; this.d = w; this.v = 0; this.zet = zet; this.k = k; this.c = c; this.stap = this.stap.bind(this); }
    naar(d, direct = false) {
      this.d = d;
      if (direct || rust()) { this.w = d; this.v = 0; this.zet(d); return; }
      anim(this.stap);
    }
    stap(dt) {
      this.v += (this.k * (this.d - this.w) - this.c * this.v) * dt;
      this.w += this.v * dt;
      if (Math.abs(this.v) < .002 && Math.abs(this.d - this.w) < .002) { this.w = this.d; this.v = 0; this.zet(this.w); return false; }
      this.zet(this.w);
      return true;
    }
  }

  class Graf {
    constructor(ouder, o = {}) {
      const { x = [0, 1], y = [0, 1], w = 640, h = 380, pad = {}, label = 'Grafiek' } = o;
      this.o = o; this.w = w; this.h = h;
      this.p = Object.assign({ l: 42, r: 26, t: 22, b: 34 }, pad);
      this.bereik(x, y);
      this.svg = maak('svg', { viewBox: `0 0 ${w} ${h}`, class: 'graf', role: 'img', 'aria-label': label });
      ouder.appendChild(this.svg);
      this.lagen = {};
      ['rooster', 'gebied', 'rect', 'assen', 'lijn', 'top'].forEach(n => { this.lagen[n] = maak('g', { class: 'l-' + n }, this.svg); });
      if (o.assen !== false) this.tekenAssen();
    }
    bereik(x, y) { this.x = x; this.y = y; }
    sx(v) { return this.p.l + (v - this.x[0]) / (this.x[1] - this.x[0]) * (this.w - this.p.l - this.p.r); }
    sy(v) { return this.h - this.p.b - (v - this.y[0]) / (this.y[1] - this.y[0]) * (this.h - this.p.t - this.p.b); }
    ix(px) { return this.x[0] + (px - this.p.l) / (this.w - this.p.l - this.p.r) * (this.x[1] - this.x[0]); }
    iy(py) { return this.y[0] + (this.h - this.p.b - py) / (this.h - this.p.t - this.p.b) * (this.y[1] - this.y[0]); }

    tekenAssen() {
      const { xticks = [], yticks = [], rooster = false, xnaam = 'x', ynaam = 'y' } = this.o;
      const R = this.lagen.rooster, A = this.lagen.assen;
      if (rooster) {
        xticks.forEach(t => { const v = t.v ?? t; maak('line', { x1: this.sx(v), x2: this.sx(v), y1: this.p.t, y2: this.h - this.p.b, class: 'rooster' }, R); });
        yticks.forEach(t => { const v = t.v ?? t; maak('line', { y1: this.sy(v), y2: this.sy(v), x1: this.p.l, x2: this.w - this.p.r, class: 'rooster' }, R); });
      }
      const nulY = this.sy(Math.max(this.y[0], Math.min(this.y[1], 0)));
      const nulX = this.sx(Math.max(this.x[0], Math.min(this.x[1], 0)));
      maak('line', { x1: this.p.l - 6, x2: this.w - this.p.r + 12, y1: nulY, y2: nulY, class: 'as' }, A);
      maak('line', { y1: this.h - this.p.b + 6, y2: this.p.t - 10, x1: nulX, x2: nulX, class: 'as' }, A);
      maak('path', { d: `M${this.w - this.p.r + 12} ${nulY}l-7 -4v8z`, class: 'aspunt' }, A);
      maak('path', { d: `M${nulX} ${this.p.t - 10}l-4 7h8z`, class: 'aspunt' }, A);
      const t1 = maak('text', { x: this.w - this.p.r + 6, y: nulY + 18, class: 'asnaam', 'text-anchor': 'end' }, A); t1.textContent = xnaam;
      const t2 = maak('text', { x: nulX + 8, y: this.p.t - 2, class: 'asnaam' }, A); t2.textContent = ynaam;
      xticks.forEach(t => {
        const v = t.v ?? t, s = t.s ?? fmt(v, Number.isInteger(v) ? 0 : 1);
        if (v === 0 && !t.s) return;
        maak('line', { x1: this.sx(v), x2: this.sx(v), y1: nulY - 3, y2: nulY + 3, class: 'as' }, A);
        const e = maak('text', { x: this.sx(v), y: nulY + 19, class: 'tick', 'text-anchor': 'middle' }, A); e.textContent = s;
      });
      yticks.forEach(t => {
        const v = t.v ?? t, s = t.s ?? fmt(v, Number.isInteger(v) ? 0 : 1);
        if (v === 0 && !t.s) return;
        maak('line', { y1: this.sy(v), y2: this.sy(v), x1: nulX - 3, x2: nulX + 3, class: 'as' }, A);
        const e = maak('text', { x: nulX - 8, y: this.sy(v) + 4.5, class: 'tick', 'text-anchor': 'end' }, A); e.textContent = s;
      });
    }

    pad(f, a, b, n = 160) {
      let d = '';
      for (let i = 0; i <= n; i++) {
        const x = a + (b - a) * i / n;
        d += (i ? 'L' : 'M') + this.sx(x).toFixed(1) + ' ' + this.sy(f(x)).toFixed(1);
      }
      return d;
    }
    kromme(f, a, b, klas = 'kromme', laag = 'lijn') {
      const e = maak('path', { d: this.pad(f, a, b), class: klas }, this.lagen[laag]);
      e.zet = (g, c = a, d = b) => e.setAttribute('d', this.pad(g, c, d));
      return e;
    }
    /* Gebied tussen de grafieken f en g (standaard de as). */
    vlakPad(f, a, b, g = () => 0, n = 160) {
      if (a === b) return '';
      let d = this.pad(f, a, b, n);
      for (let i = n; i >= 0; i--) {
        const x = a + (b - a) * i / n;
        d += 'L' + this.sx(x).toFixed(1) + ' ' + this.sy(g(x)).toFixed(1);
      }
      return d + 'Z';
    }
    gebied(f, a, b, klas = 'vlak') {
      const e = maak('path', { d: this.vlakPad(f, a, b), class: klas }, this.lagen.gebied);
      e.zet = (g, c, d, h) => e.setAttribute('d', this.vlakPad(g, c, d, h));
      return e;
    }
    /* Gebied met teken: boven de as sterk, onder de as gestreept. */
    tekenGebied(f, a, b) {
      const pos = maak('path', { class: 'vlak' }, this.lagen.gebied);
      const neg = maak('path', { class: 'vlak-neg' }, this.lagen.gebied);
      const zet = (g, c, d) => {
        pos.setAttribute('d', this.vlakPad(x => Math.max(0, g(x)), c, d));
        neg.setAttribute('d', this.vlakPad(x => Math.min(0, g(x)), c, d));
      };
      zet(f, a, b);
      return { pos, neg, zet };
    }
    lijn(x1, y1, x2, y2, klas = 'hulplijn', laag = 'top') {
      const e = maak('line', {}, this.lagen[laag]);
      e.setAttribute('class', klas);
      e.zet = (a, b, c, d) => { e.setAttribute('x1', this.sx(a)); e.setAttribute('y1', this.sy(b)); e.setAttribute('x2', this.sx(c)); e.setAttribute('y2', this.sy(d)); };
      e.zet(x1, y1, x2, y2);
      return e;
    }
    punt(x, y, klas = 'puntje') {
      const e = maak('circle', { r: 5, class: klas }, this.lagen.top);
      e.zet = (a, b) => { e.setAttribute('cx', this.sx(a)); e.setAttribute('cy', this.sy(b)); };
      e.zet(x, y);
      return e;
    }
    tekst(x, y, s, { klas = 'label', anker = 'middle', dx = 0, dy = 0 } = {}) {
      const e = maak('text', { class: klas, 'text-anchor': anker }, this.lagen.top);
      e.textContent = s;
      e.zet = (a, b, t) => { e.setAttribute('x', this.sx(a) + dx); e.setAttribute('y', this.sy(b) + dy); if (t !== undefined) e.textContent = t; };
      e.zet(x, y);
      return e;
    }
    /* Een formule als label, met KaTeX. */
    formule(x, y, tex, { b = 130, h = 44, klas = '', anker = 'middle' } = {}) {
      const f = maak('foreignObject', { width: b, height: h }, this.lagen.top);
      const div = document.createElement('div');
      div.className = 'svgformule ' + klas;
      div.style.justifyContent = anker === 'middle' ? 'center' : anker === 'end' ? 'flex-end' : 'flex-start';
      div.innerHTML = Axiomath.tex(tex);
      f.appendChild(div);
      f.zet = (a, c, t) => {
        const dx = anker === 'middle' ? b / 2 : anker === 'end' ? b : 0;
        f.setAttribute('x', this.sx(a) - dx); f.setAttribute('y', this.sy(c) - h / 2);
        if (t !== undefined) div.innerHTML = Axiomath.tex(t);
      };
      f.zet(x, y);
      return f;
    }
    /* Versleepbaar punt. o.as = 'x' of 'y'. Geeft ook toetsenbordbediening met de pijltjes. */
    greep({ x, y, as = 'x', min, max, stap = 0.05, op, naam = 'Punt', los, vat }) {
      const g = maak('g', { class: 'greep', tabindex: 0, role: 'slider', 'aria-label': naam }, this.lagen.top);
      maak('circle', { r: 22, class: 'greep-raak' }, g);
      maak('circle', { r: 11, class: 'greep-ring' }, g);
      maak('circle', { r: 4.5, class: 'greep-kern' }, g);
      const st = { x, y };
      const plaats = () => { g.setAttribute('transform', `translate(${this.sx(st.x)} ${this.sy(st.y)})`); g.setAttribute('aria-valuenow', (as === 'x' ? st.x : st.y).toFixed(2)); };
      const zet = (w, stil) => {
        const v = Math.max(min, Math.min(max, w));
        const d = as === 'x' ? st.x : st.y;
        if (as === 'x') st.x = v; else st.y = v;
        plaats();
        if (!stil && op && v !== d) op(v, Math.abs(v - d));
      };
      const scherm = e => {
        const r = this.svg.getBoundingClientRect();
        return as === 'x' ? this.ix((e.clientX - r.left) * this.w / r.width) : this.iy((e.clientY - r.top) * this.h / r.height);
      };
      g.addEventListener('pointerdown', e => {
        g.setPointerCapture(e.pointerId); g.classList.add('vast'); e.preventDefault(); g.focus({ preventScroll: true });
        if (vat) vat();
      });
      g.addEventListener('pointermove', e => { if (g.hasPointerCapture(e.pointerId)) zet(scherm(e)); });
      const laat = e => { if (g.hasPointerCapture(e.pointerId)) g.releasePointerCapture(e.pointerId); g.classList.remove('vast'); if (los) los(); };
      g.addEventListener('pointerup', laat);
      g.addEventListener('pointercancel', laat);
      g.addEventListener('keydown', e => {
        const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        zet((as === 'x' ? st.x : st.y) + d * stap);
        if (los) los();
      });
      plaats();
      g.zet = (a, b) => { st.x = a; st.y = b; plaats(); };
      g.st = st;
      return g;
    }
    /* Laag met rechthoeken die veren. */
    laag(klas = 'rh') { return new RechthoekLaag(this, klas); }
  }

  /* Rechthoeken die naar hun doel veren. Komen er rechthoeken bij, dan starten ze uit de oude rechthoek op die plaats:
     zo zie je een rechthoek splitsen in plaats van dat alles verspringt. */
  class RechthoekLaag {
    constructor(graf, klas) { this.g = graf; this.klas = klas; this.r = []; this.groep = maak('g', {}, graf.lagen.rect); this.stap = this.stap.bind(this); this.stop = null; }
    /* doelen = [{x, w, h}] in wiskundige eenheden. */
    zet(doelen, { direct = false, stagger = 0 } = {}) {
      const oud = this.r;
      const nieuw = doelen.map((d, i) => {
        let s = oud[i];
        if (!s) {
          const m = d.x + d.w / 2;
          const bron = oud.find(q => m >= q.x && m <= q.x + q.w);
          s = { x: d.x, w: d.w, h: bron ? bron.h : 0, vx: 0, vw: 0, vh: 0, e: maak('rect', { class: this.klas }, this.groep) };
        }
        s.dx = d.x; s.dw = d.w; s.dh = d.h; s.wacht = stagger * i;
        return s;
      });
      for (let i = doelen.length; i < oud.length; i++) oud[i].e.remove();
      this.r = nieuw;
      this.groep.classList.toggle('fijn', doelen.length > 40);
      if (direct || rust()) { this.r.forEach(s => { s.x = s.dx; s.w = s.dw; s.h = s.dh; s.vx = s.vw = s.vh = 0; this.teken(s); }); return; }
      anim(this.stap);
    }
    teken(s) {
      const g = this.g, y0 = g.sy(0), yh = g.sy(s.h);
      s.e.setAttribute('x', g.sx(s.x).toFixed(2));
      s.e.setAttribute('width', Math.max(0, g.sx(s.x + s.w) - g.sx(s.x)).toFixed(2));
      s.e.setAttribute('y', Math.min(y0, yh).toFixed(2));
      s.e.setAttribute('height', Math.abs(yh - y0).toFixed(2));
      s.e.classList.toggle('neg', s.h < -1e-6);
    }
    stap(dt) {
      let bezig = false;
      for (const s of this.r) {
        if (s.wacht > 0) { s.wacht -= dt * 1000; bezig = true; continue; }
        s.vh += (240 * (s.dh - s.h) - 21 * s.vh) * dt; s.h += s.vh * dt;
        s.vx += (300 * (s.dx - s.x) - 32 * s.vx) * dt; s.x += s.vx * dt;
        s.vw += (300 * (s.dw - s.w) - 32 * s.vw) * dt; s.w += s.vw * dt;
        if (Math.abs(s.vh) + Math.abs(s.vx) + Math.abs(s.vw) > .004 || Math.abs(s.dh - s.h) + Math.abs(s.dx - s.x) + Math.abs(s.dw - s.w) > .002) bezig = true;
        else { s.h = s.dh; s.x = s.dx; s.w = s.dw; }
        this.teken(s);
      }
      return bezig;
    }
  }

  /* Rechthoeken voor f op [a, b] met n delen. plaats: 'o', 'b', of een getal tussen 0 en 1. */
  function riemann(f, a, b, n, plaats) {
    const w = (b - a) / n, uit = [];
    for (let i = 0; i < n; i++) {
      const l = a + i * w, r = l + w;
      let h;
      if (plaats === 'o' || plaats === 'b') { const [lo, hi] = uiterste(f, l, r); h = plaats === 'o' ? lo : hi; }
      else h = f(l + w * (Array.isArray(plaats) ? plaats[i] : plaats));
      uit.push({ x: l, w, h });
    }
    return uit;
  }
  const somVan = rs => rs.reduce((s, r) => s + r.h * r.w, 0);

  window.G = { Graf, Veer, maak, fmt, integraal, opp, uiterste, riemann, somVan, anim, tween, easeOut, easeInOut, rust };
})();
