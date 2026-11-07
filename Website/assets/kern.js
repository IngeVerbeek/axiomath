/* De kern: formules, navigatie, voortgang, kleurthema en overgangen. */
(function () {
  const MACROS = {
    '\\dx': '\\,\\mathrm{d}x', '\\dt': '\\,\\mathrm{d}t', '\\du': '\\,\\mathrm{d}u', '\\e': '\\mathrm{e}',
    '\\ig': '\\displaystyle\\int', '\\ac': '\\htmlClass{ac}{#1}', '\\acb': '\\htmlClass{acb}{#1}', '\\acc': '\\htmlClass{acc}{#1}',
  };
  const tex = (s, display = false) => {
    if (!window.katex) return s;
    return katex.renderToString(s, { displayMode: display, macros: MACROS, throwOnError: false, trust: true, strict: false });
  };
  /* Vervangt $$…$$ en $…$ in een HTML-tekst door formules. */
  const wiskunde = html => String(html)
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => tex(m, true))
    .replace(/\$([^$]+?)\$/g, (_, m) => tex(m, false));

  const opslag = {
    lees(k, d) { try { const w = localStorage.getItem('axiomath-' + k); return w === null ? d : JSON.parse(w); } catch (e) { return d; } },
    zet(k, w) { try { localStorage.setItem('axiomath-' + k, JSON.stringify(w)); } catch (e) {} },
  };
  const voortgang = opslag.lees('voortgang', { gezien: {}, voorbeeld: {}, oef: {}, laatste: null });
  const bewaar = () => opslag.zet('voortgang', voortgang);

  const $ = (s, o = document) => o.querySelector(s);
  const $$ = (s, o = document) => [...o.querySelectorAll(s)];
  const rust = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CURSUS = {
    titel: 'Integralen',
    hoofdstukken: [
      { nr: 1, titel: 'De bepaalde integraal', tekst: 'Van rechthoeken optellen naar de integraal, als limiet van een som en als georiënteerde oppervlakte.', online: true },
      { nr: 2, titel: 'Hoofdstelling en primitieve functies', tekst: 'De snelle manier om een integraal te berekenen, en het verband met afleiden.' },
      { nr: 3, titel: 'Integratiemethoden', tekst: 'Substitutie, partiële integratie en meer: welke methode past bij welke integraal?' },
      { nr: 4, titel: 'Toepassingen van integralen', tekst: 'Oppervlaktes, volumes, arbeid en energie.' },
    ],
  };

  let hoofdstuk = null;     // de geregistreerde inhoud van een hoofdstuk
  let huidig = null;        // id van de zichtbare view
  const inhoudIndex = {};   // oef-id of voorbeeld-id → view-id
  const AX = { tex, wiskunde, opslag, voortgang, bewaar, $, $$, CURSUS, labs: {}, figuren: {}, voorbeelden: {}, hulp: {}, nujij: {} };
  window.Axiomath = AX;

  /* --- kleurthema ---------------------------------------------------------------------------- */
  function thema(nr) { document.documentElement.dataset.h = nr; }

  /* Vult het scherm vanaf het klikpunt met de kleur van het hoofdstuk. Alleen bij wisselen tussen cursus en hoofdstuk. */
  function kleurvlak(x, y, nr, wissel) {
    const v = $('#kleurvlak');
    if (rust()) { thema(nr); wissel(); return; }
    v.dataset.h = nr; v.hidden = false;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    Geluid.zwiep();
    const a = v.animate([{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${r}px at ${x}px ${y}px)` }], { duration: 420, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'forwards' });
    a.onfinish = () => {
      thema(nr); wissel();
      const b = v.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' });
      b.onfinish = () => { v.hidden = true; a.cancel(); b.cancel(); };
    };
  }

  /* --- inhoud opbouwen ----------------------------------------------------------------------- */
  AX.registreer = function (def) {
    hoofdstuk = def;
    def.views.forEach(v => {
      /* Een voorbeeld en een oefening kunnen dezelfde code hebben: voorbeelden krijgen het voorvoegsel vb-. */
      for (const t of v.html.matchAll(/data-(oef|voorbeeld|nujij)="([^"]+)"/g)) inhoudIndex[(t[1] === 'voorbeeld' ? 'vb-' : '') + t[2]] = v.id;
    });
    def.data.oefeningen.forEach(o => {
      if (inhoudIndex[o.id]) return;
      const v = def.views.find(w => w.reeks === o.soort);
      if (v) inhoudIndex[o.id] = v.id;
    });
  };
  AX.oefening = id => hoofdstuk.data.oefeningen.find(o => o.id === id);
  AX.alleOefeningen = () => hoofdstuk.data.oefeningen;
  AX.schema = () => hoofdstuk.data.herhaal;
  AX.voorbeeldNr = id => hoofdstuk.data.voorbeelden[id];

  function vulIn(el) {
    const held = $('#h1-stipjes', el);
    if (held) AX.stipjes(held, { kleur: 'rgba(255,255,255,.95)', kleur2: getComputedStyle(document.documentElement).getPropertyValue('--hf').trim() });
    $$('[data-figuur]', el).forEach(d => { const f = AX.figuren[d.dataset.figuur]; if (f) f(d); });
    $$('[data-lab]', el).forEach(d => { const f = AX.labs[d.dataset.lab]; if (f) f(d, d.dataset); });
    $$('[data-voorbeeld]', el).forEach(d => AX.speler(d, d.dataset.voorbeeld));
    $$('[data-nujij]', el).forEach(d => AX.nuJij(d, d.dataset.nujij));
    $$('[data-oef]', el).forEach(d => AX.oefenkaart(d, AX.oefening(d.dataset.oef)));
    $$('[data-reeks]', el).forEach(d => AX.oefenreeks(d, d.dataset.reeks));
    $$('[data-schema]', el).forEach(d => AX.herhaalschema(d));
    $$('a[href^="#"]', el).forEach(a => a.addEventListener('click', () => Geluid.klik()));
  }

  function maakView(v) {
    const s = document.createElement('section');
    s.className = 'view' + (v.fel ? ' fel' : '');
    s.dataset.view = v.id;
    s.innerHTML = wiskunde(v.html) + vervolg(v);
    $('#inhoud').appendChild(s);
    vulIn(s);
    return s;
  }

  function vervolg(v) {
    const i = hoofdstuk.views.indexOf(v);
    const voor = hoofdstuk.views[i - 1], na = hoofdstuk.views[i + 1];
    return `<nav class="vervolg" aria-label="Volgende en vorige">
      ${voor ? `<a class="vervolg-terug" href="#${voor.id}"><span>Terug</span>${voor.titel}</a>` : '<a class="vervolg-terug" href="#cursus"><span>Terug</span>Overzicht van de cursus</a>'}
      ${na ? `<a class="vervolg-verder" href="#${na.id}"><span>Verder</span>${na.titel}</a>` : '<a class="vervolg-verder" href="#cursus"><span>Klaar</span>Terug naar de cursus</a>'}
    </nav>`;
  }

  /* --- navigatie ----------------------------------------------------------------------------- */
  function bouwNav() {
    const nav = $('#rail-lijst');
    let html = '', groep = null;
    hoofdstuk.views.forEach(v => {
      if (v.groep !== groep) {
        if (groep !== null) html += '</ul>';
        groep = v.groep;
        html += `<p class="rail-groep">${v.groep}</p><ul>`;
      }
      html += `<li><a href="#${v.id}" data-naar="${v.id}" class="${v.fel ? 'isfel' : ''}${v.sub ? ' issub' : ''}"><i class="stip" aria-hidden="true"></i><span>${v.kort || v.titel}</span></a></li>`;
    });
    nav.innerHTML = wiskunde(html + '</ul>');
    $$('a', nav).forEach(a => a.addEventListener('click', () => { Geluid.klik(); openRail(false); }));
  }

  function werkNavBij() {
    $$('#rail-lijst a').forEach(a => {
      const id = a.dataset.naar;
      a.classList.toggle('actief', id === huidig);
      if (id === huidig) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      a.classList.toggle('gezien', !!voortgang.gezien[id]);
    });
    if (!hoofdstuk) return;
    const n = hoofdstuk.views.filter(v => voortgang.gezien[v.id]).length;
    const f = n / hoofdstuk.views.length;
    const ring = $('#voortgang-ring');
    if (ring) ring.style.strokeDashoffset = (1 - f) * 100;
    const t = $('#voortgang-tekst');
    if (t) t.textContent = `${n} van ${hoofdstuk.views.length}`;
  }
  AX.werkNavBij = werkNavBij;

  function openRail(open) {
    document.body.classList.toggle('rail-open', open);
    const k = $('#rail-knop');
    if (k) k.setAttribute('aria-expanded', open);
  }

  /* --- router -------------------------------------------------------------------------------- */
  let klikpunt = null;
  addEventListener('pointerdown', e => { klikpunt = { x: e.clientX, y: e.clientY }; }, true);

  function toonCursus(eerste) {
    const zet = () => {
      thema(0);
      document.body.dataset.scherm = 'cursus';
      huidig = null;
      window.scrollTo(0, 0);
      AX.cursusBijwerken();
    };
    if (eerste || document.body.dataset.scherm === 'cursus') zet();
    else { const p = klikpunt || { x: innerWidth / 2, y: 80 }; kleurvlak(p.x, p.y, 0, zet); }
  }

  function toonView(id, doel, eerste) {
    const v = hoofdstuk.views.find(w => w.id === id);
    if (!v) return;
    const vanCursus = document.body.dataset.scherm !== 'hoofdstuk';
    const wissel = () => {
      document.body.dataset.scherm = 'hoofdstuk';
      thema(hoofdstuk.nr);
      const nieuw = $(`[data-view="${id}"]`) || maakView(v);
      const oud = huidig && huidig !== id ? $(`[data-view="${huidig}"]`) : null;
      const richting = oud ? (hoofdstuk.views.findIndex(w => w.id === id) > hoofdstuk.views.findIndex(w => w.id === huidig) ? 1 : -1) : 0;
      $$('.view').forEach(s => { s.hidden = s !== nieuw; });
      document.body.classList.toggle('in-fel', !!v.fel);
      huidig = id;
      voortgang.gezien[id] = true; voortgang.laatste = id; bewaar();
      werkNavBij();
      document.title = `${v.titel}: Axiomath Integralen`;
      $('#kop-titel').innerHTML = wiskunde(v.titel);
      if (doel) {
        requestAnimationFrame(() => {
          const e = document.getElementById(doel) || document.getElementById('nujij-' + doel);
          if (e) {
            e.scrollIntoView({ behavior: rust() ? 'auto' : 'smooth', block: 'center' });
            e.classList.remove('flits'); void e.offsetWidth; e.classList.add('flits');
          }
        });
      } else window.scrollTo(0, 0);
      if (richting && !rust()) {
        nieuw.animate([{ opacity: 0, transform: `translateX(${richting * 22}px)` }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
      }
      if (!eerste && richting && !vanCursus) Geluid.blad();
      nieuw.dispatchEvent(new CustomEvent('zichtbaar'));
    };
    if (vanCursus && !eerste) { const p = klikpunt || { x: innerWidth / 2, y: 200 }; kleurvlak(p.x, p.y, hoofdstuk.nr, wissel); }
    else wissel();
  }

  function route(eerste) {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h || h === 'cursus') return toonCursus(eerste);
    if (h.startsWith('naar-')) {
      const d = h.slice(5);
      if (inhoudIndex[d]) return toonView(inhoudIndex[d], d, eerste);
    }
    if (hoofdstuk.views.some(v => v.id === h)) return toonView(h, null, eerste);
    toonCursus(eerste);
  }

  /* --- overzicht van de cursus --------------------------------------------------------------- */
  function bouwCursus() {
    const lijst = $('#hoofdstuk-lijst');
    lijst.innerHTML = CURSUS.hoofdstukken.map(h => `
      <li class="hs-kaart ${h.online ? 'open' : 'dicht'}" data-h="${h.nr}" style="--stap:${h.nr}">
        <a ${h.online ? 'href="#h1-start"' : 'role="button" aria-disabled="true" tabindex="0"'} data-hs="${h.nr}">
          <span class="hs-nr">${h.nr}</span>
          <span class="hs-tekst"><strong>${h.titel}</strong><span>${h.tekst}</span></span>
          <span class="hs-staat">${h.online ? 'Open' : 'Nog niet online'}</span>
        </a>
      </li>`).join('');
    $$('#hoofdstuk-lijst .hs-kaart').forEach(k => {
      const nr = +k.dataset.h;
      const licht = () => { if (document.body.dataset.scherm === 'cursus') thema(nr); };
      const dof = () => { if (document.body.dataset.scherm === 'cursus') thema(0); };
      k.addEventListener('pointerenter', licht); k.addEventListener('focusin', licht);
      k.addEventListener('pointerleave', dof); k.addEventListener('focusout', dof);
      if (!k.classList.contains('open')) {
        k.querySelector('a').addEventListener('click', e => {
          e.preventDefault();
          Geluid.fout();
          thema(nr);
          k.classList.remove('schud'); void k.offsetWidth; k.classList.add('schud');
        });
        k.querySelector('a').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.target.click(); } });
      }
    });
    const verder = $('#verder-knop');
    verder.addEventListener('click', () => Geluid.klik());
  }
  AX.cursusBijwerken = function () {
    const n = hoofdstuk.views.filter(v => voortgang.gezien[v.id]).length;
    const verder = $('#verder-knop');
    const l = hoofdstuk.views.find(v => v.id === voortgang.laatste);
    verder.href = '#' + (l ? l.id : 'h1-start');
    verder.innerHTML = wiskunde(l ? `Verder met ${l.kort || l.titel}` : 'Begin bij hoofdstuk 1');
    $('#cursus-stand').textContent = n ? `${n} van de ${hoofdstuk.views.length} delen van hoofdstuk 1 bekeken` : '';
  };

  /* --- knoppen in de kop --------------------------------------------------------------------- */
  function bouwKop() {
    const gk = $$('.geluid-knop');
    const toon = () => gk.forEach(k => { k.setAttribute('aria-pressed', Geluid.aan); k.setAttribute('aria-label', Geluid.aan ? 'Geluid uitzetten' : 'Geluid aanzetten'); k.title = k.getAttribute('aria-label'); });
    gk.forEach(k => k.addEventListener('click', () => { Geluid.zet(!Geluid.aan); toon(); Geluid.klik(); }));
    toon();

    const dk = $$('.donker-knop');
    const bewaard = opslag.lees('thema', null);
    if (bewaard) document.documentElement.dataset.theme = bewaard;
    dk.forEach(k => k.addEventListener('click', () => {
      const nu = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const n = nu === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = n;
      opslag.zet('thema', n);
      Geluid.klik();
    }));

    $('#rail-knop').addEventListener('click', () => { openRail(!document.body.classList.contains('rail-open')); Geluid.klik(); });
    $('#rail-dek').addEventListener('click', () => openRail(false));
    addEventListener('keydown', e => { if (e.key === 'Escape') openRail(false); });

    /* De leesbalk in de kop. */
    const balk = $('#leesbalk');
    let wacht = false;
    addEventListener('scroll', () => {
      if (wacht) return; wacht = true;
      requestAnimationFrame(() => {
        wacht = false;
        const max = document.documentElement.scrollHeight - innerHeight;
        balk.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      });
    }, { passive: true });
  }

  /* --- stipjes: het motief van de voorkant, een gebied onder een kromme uit stippen --------------- */
  AX.stipjes = function (canvas, { functie, kleur = 'rgba(255,255,255,.9)', kleur2 = null, dicht = 13 } = {}) {
    const c = canvas.getContext('2d');
    let stippen = [], w = 0, h = 0, muis = null, gestart = 0, stop = true;
    const f = functie || (x => .46 + .24 * Math.sin(x * 5.1 + .6) + .1 * Math.sin(x * 11));
    const leg = () => {
      const r = canvas.getBoundingClientRect();
      const d = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      if (!w || !h) return;
      canvas.width = w * d; canvas.height = h * d;
      c.setTransform(d, 0, 0, d, 0, 0);
      stippen = [];
      let zaad = 7;
      const rnd = () => (zaad = (zaad * 16807) % 2147483647) / 2147483647;
      for (let x = dicht / 2; x < w; x += dicht) {
        const top = h * (1 - f(x / w));
        for (let y = h - dicht / 2; y > top; y -= dicht) {
          stippen.push({ x: x + (rnd() - .5) * 6, y: y + (rnd() - .5) * 6, r: 1.6 + rnd() * 2.3, o: .4 + rnd() * .6, t: x / w * 900 + (h - y) / h * 280 + rnd() * 130, fel: rnd() > .78 });
        }
      }
    };
    const teken = nu => {
      c.clearRect(0, 0, w, h);
      const t = rust() ? 1e9 : nu - gestart;
      let bezig = false;
      for (const s of stippen) {
        const p = Math.min(1, Math.max(0, (t - s.t) / 340));
        if (p < 1) bezig = true;
        if (p <= 0) continue;
        const e = 1 - Math.pow(1 - p, 3);
        let r = s.r * e, dx = 0, dy = 0;
        if (muis) {
          const a = s.x - muis.x, b = s.y - muis.y, d = Math.hypot(a, b);
          if (d < 110) { const k = (1 - d / 110); r *= 1 + 1.1 * k; dx = a / (d || 1) * 14 * k; dy = b / (d || 1) * 14 * k; }
        }
        c.globalAlpha = s.o * e;
        c.fillStyle = s.fel && kleur2 ? kleur2 : kleur;
        c.beginPath(); c.arc(s.x + dx, s.y + dy, r, 0, 7); c.fill();
      }
      c.globalAlpha = 1;
      if (bezig || muis) requestAnimationFrame(teken); else stop = true;
    };
    const go = () => { if (stop) { stop = false; requestAnimationFrame(teken); } };
    const speel = () => { leg(); gestart = performance.now(); go(); };
    const ouder = canvas.parentElement;
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      ouder.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); muis = { x: e.clientX - r.left, y: e.clientY - r.top }; go(); });
      ouder.addEventListener('pointerleave', () => { muis = null; go(); });
    }
    new ResizeObserver(() => { leg(); go(); }).observe(canvas);
    speel();
    return speel;
  };

  /* --- opstart ------------------------------------------------------------------------------- */
  AX.start = function () {
    bouwKop();
    bouwCursus();
    bouwNav();
    addEventListener('hashchange', () => route(false));
    route(true);
    AX.stipjes($('#cursus-stipjes'), { kleur: 'rgba(255,255,255,.92)', dicht: 15 });
  };
})();
