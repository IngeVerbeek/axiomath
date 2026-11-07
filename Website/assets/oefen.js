/* Stap-voor-stap-voorbeelden, oefenkaarten, Nu jij, en het schema Fout? Herhaal. */
(function () {
  const AX = window.Axiomath;
  const { wiskunde, tex, voortgang, bewaar, $, $$ } = AX;
  const rust = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- een antwoord lezen ------------------------------------------------------------------- */
  function leesGetal(ruw, eenheid = '') {
    let s = String(ruw).toLowerCase().trim();
    if (!s) return NaN;
    s = s.replace(/^[^=]*=/, '').replace(/≈/g, '').replace(/π/g, 'pi').replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/:/g, '/').replace(/√/g, 'sqrt').replace(/,/g, '.').replace(/\s+/g, '');
    if (eenheid) s = s.replace(new RegExp(eenheid.toLowerCase().replace('/', '\\/') + '$'), '');
    let i = 0;
    const kijk = () => s[i];
    function som() {
      let w = term();
      while (kijk() === '+' || kijk() === '-') { const o = s[i++]; const r = term(); w = o === '+' ? w + r : w - r; }
      return w;
    }
    function term() {
      let w = macht();
      for (;;) {
        if (kijk() === '*') { i++; w *= macht(); }
        else if (kijk() === '/') { i++; w /= macht(); }
        else if (kijk() === '(' || /[a-z]/.test(kijk() || '')) w *= macht();
        else return w;
      }
    }
    function macht() { const b = een(); if (kijk() === '^') { i++; return Math.pow(b, macht()); } return b; }
    function een() {
      if (kijk() === '-') { i++; return -een(); }
      if (kijk() === '+') { i++; return een(); }
      if (kijk() === '(') { i++; const w = som(); if (kijk() !== ')') throw 0; i++; return w; }
      if (s.startsWith('pi', i)) { i += 2; return Math.PI; }
      if (s.startsWith('sqrt', i)) { i += 4; return Math.sqrt(een()); }
      if (s.startsWith('ln', i)) { i += 2; return Math.log(een()); }
      if (kijk() === 'e') { i++; return Math.E; }
      const t = /^\d*\.?\d+/.exec(s.slice(i));
      if (!t) throw 0;
      i += t[0].length;
      return parseFloat(t[0]);
    }
    try { const w = som(); return i === s.length ? w : NaN; } catch (e) { return NaN; }
  }
  AX.leesGetal = leesGetal;

  function beoordeel(veld, ruw) {
    const w = leesGetal(ruw, veld.eenheid);
    if (!isFinite(w)) return { staat: 'onleesbaar' };
    const d = Math.abs(w - veld.waarde);
    if (d <= (veld.tol ?? 1e-6) + 1e-9) return { staat: 'goed' };
    if (veld.exact && d <= 0.011 && !/[/π]|pi|sqrt/.test(ruw)) return { staat: 'goed', opmerking: 'Klopt, maar geef ook de exacte waarde.' };
    return { staat: 'fout' };
  }

  function schud(e) {
    if (rust()) return;
    e.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' }], { duration: 240, easing: 'ease-out' });
  }

  function toonIn(e) {
    e.hidden = false;
    if (!rust()) e.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
  }

  /* Enkele stipjes die wegspatten: alleen bij een eerste keer iets afronden. */
  function spat(e, n = 16) {
    if (rust()) return;
    const r = e.getBoundingClientRect();
    for (let i = 0; i < n; i++) {
      const s = document.createElement('i');
      s.className = 'spat' + (i % 3 ? '' : ' spat-fel');
      s.style.left = r.left + r.width / 2 + 'px'; s.style.top = r.top + r.height / 2 + 'px';
      document.body.appendChild(s);
      const h = Math.random() * 6.283, a = 50 + Math.random() * 90;
      const an = s.animate([
        { transform: 'translate(-50%,-50%) scale(.8)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(h) * a}px), calc(-50% + ${Math.sin(h) * a - 16}px)) scale(.3)`, opacity: 0 },
      ], { duration: 520 + Math.random() * 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
      an.onfinish = () => s.remove();
    }
  }
  AX.spat = spat;

  /* --- antwoordvelden ----------------------------------------------------------------------- */
  let teller = 0;
  /* Bouwt invulvelden of keuzeknoppen. op(uitslag) krijgt 'goed' of 'fout'. */
  function controleBlok(ctrl, op) {
    const b = document.createElement('div');
    b.className = 'ctrl';
    if (ctrl.keuze) {
      b.innerHTML = `<div class="keuzes">${ctrl.keuze.map(k => `<button type="button" class="knop-keuze">${k}</button>`).join('')}</div>`;
      $$('button', b).forEach(k => k.addEventListener('click', () => {
        if (k.textContent === ctrl.juist) {
          k.classList.add('goed'); $$('button', b).forEach(x => { x.disabled = true; });
          Geluid.goed(); op('goed');
        } else { k.classList.add('fout'); k.disabled = true; schud(k); Geluid.fout(); op('fout'); }
      }));
      return b;
    }
    const velden = ctrl.velden.map(v => {
      const id = 'veld-' + (++teller);
      const label = v.label || (ctrl.velden.length > 1 ? `${ctrl.velden.indexOf(v) + 1}e waarde` : '');
      return `<label class="veld" for="${id}">${label ? `<span>${wiskunde(label)}</span>` : ''}<input id="${id}" autocomplete="off" spellcheck="false" inputmode="text" aria-label="${label ? label.replace(/[$\\{}]/g, '') : 'Antwoord'}" placeholder="antwoord">${v.eenheid ? `<em>${v.eenheid}</em>` : ''}</label>`;
    }).join('');
    b.innerHTML = `<form class="invul" novalidate>${velden}<button class="knop" type="submit">Controleer</button></form><p class="ctrl-bericht" role="status" hidden></p>`;
    const invoer = $$('input', b), bericht = $('.ctrl-bericht', b);
    $('form', b).addEventListener('submit', e => {
      e.preventDefault();
      let alles = true, onleesbaar = false, opm = '';
      ctrl.velden.forEach((v, i) => {
        const u = beoordeel(v, invoer[i].value);
        invoer[i].classList.toggle('goed', u.staat === 'goed');
        invoer[i].classList.toggle('fout', u.staat === 'fout');
        if (u.staat !== 'goed') alles = false;
        if (u.staat === 'onleesbaar') onleesbaar = true;
        if (u.opmerking) opm = u.opmerking;
      });
      if (alles) {
        Geluid.goed();
        invoer.forEach(x => { x.readOnly = true; });
        $('.knop', b).hidden = true;
        bericht.textContent = opm || 'Juist.';
        bericht.className = 'ctrl-bericht ok'; toonIn(bericht);
        spat($('.invul', b), 8);
        op('goed');
      } else if (onleesbaar) {
        Geluid.tik(.2);
        bericht.textContent = 'Dat kan ik niet lezen. Typ bijvoorbeeld 4,5 of 9pi/2 of 3/4.';
        bericht.className = 'ctrl-bericht'; toonIn(bericht);
      } else {
        Geluid.fout(); schud($('.invul', b));
        bericht.textContent = 'Nog niet. Reken het na, of bekijk de uitwerking.';
        bericht.className = 'ctrl-bericht nee'; toonIn(bericht);
        op('fout');
      }
    });
    return b;
  }

  /* Blok met tonen van antwoord en uitwerking, en eventueel zelf nakijken. */
  function onthulBlok({ antwoord, uitwerking, zelf, op }) {
    const b = document.createElement('div');
    b.className = 'onthul';
    const knoppen = [];
    if (antwoord) knoppen.push(`<button type="button" class="knop-licht" data-doe="antwoord">Toon antwoord</button>`);
    if (uitwerking) knoppen.push(`<button type="button" class="knop-licht" data-doe="uitwerking">Toon uitwerking</button>`);
    b.innerHTML = `<div class="onthul-knoppen">${knoppen.join('')}</div>
      ${antwoord ? `<div class="onthul-antwoord" hidden><span class="etiket">Antwoord</span> ${wiskunde(antwoord)}</div>` : ''}
      ${uitwerking ? `<div class="onthul-uitwerking" hidden><span class="etiket">Uitwerking</span> ${wiskunde(uitwerking)}</div>` : ''}
      ${zelf ? `<div class="zelf" hidden><span>Had je het juist?</span> <button type="button" class="knop-keuze" data-z="goed">Juist</button> <button type="button" class="knop-keuze" data-z="fout">Nog niet</button></div>` : ''}`;
    $$('[data-doe]', b).forEach(k => k.addEventListener('click', () => {
      Geluid.klik();
      const doel = $(k.dataset.doe === 'antwoord' ? '.onthul-antwoord' : '.onthul-uitwerking', b);
      if (doel.hidden) { toonIn(doel); k.textContent = k.dataset.doe === 'antwoord' ? 'Verberg antwoord' : 'Verberg uitwerking'; }
      else { doel.hidden = true; k.textContent = k.dataset.doe === 'antwoord' ? 'Toon antwoord' : 'Toon uitwerking'; }
      const z = $('.zelf', b);
      if (z && z.hidden && !z.dataset.af) toonIn(z);
    }));
    $$('[data-z]', b).forEach(k => k.addEventListener('click', () => {
      const z = $('.zelf', b);
      z.dataset.af = '1';
      $$('[data-z]', b).forEach(x => { x.classList.toggle('gekozen', x === k); });
      if (k.dataset.z === 'goed') { Geluid.goed(); } else Geluid.tik(.3);
      op(k.dataset.z);
    }));
    return b;
  }

  /* --- oefenkaart --------------------------------------------------------------------------- */
  const LETTERS = 'abcdefghijklmnop';
  const NIVEAUS = { 1: 'basis', 2: 'gevorderd', 3: 'uitdagend' };
  const RUBRIEK = { analyse: 'Analyse', algebra: 'Algebra', meetkunde: 'Meetkunde', discreet: 'Discrete wiskunde', data: 'Data en onzekerheid' };

  function zetStaat(oef, kaart, delen) {
    const uitslagen = [...delen.values()];
    const nodig = +kaart.dataset.nodig;
    let staat = null;
    if (uitslagen.includes('fout')) staat = 'fout';
    if (uitslagen.filter(u => u === 'goed').length >= nodig && nodig > 0) staat = 'goed';
    if (!staat) return;
    if (voortgang.oef[oef.id] !== staat) {
      const nieuwGoed = staat === 'goed' && voortgang.oef[oef.id] !== 'goed';
      voortgang.oef[oef.id] = staat; bewaar();
      if (nieuwGoed) spat($('.oef-nr', kaart), 14);
      document.dispatchEvent(new CustomEvent('oef-gewijzigd', { detail: { id: oef.id, staat } }));
    }
    kaart.dataset.staat = staat;
  }

  AX.oefenkaart = function (el, oef) {
    if (!oef) { el.textContent = 'Oefening niet gevonden.'; return; }
    const kaart = document.createElement('article');
    kaart.className = 'oef';
    kaart.id = oef.id;
    const uitslag = new Map();
    let nodig = 0;

    const kop = `<header class="oef-kop">
      <a class="oef-nr" href="#naar-${oef.id}" aria-label="Oefening ${oef.nr}">${oef.nr}</a>
      ${oef.niveau ? `<span class="niveau" data-n="${oef.niveau}" title="${NIVEAUS[oef.niveau]}" aria-label="Niveau: ${NIVEAUS[oef.niveau]}"><i></i><i></i><i></i></span>` : ''}
      ${oef.titel ? `<strong class="oef-titel">${oef.titel}</strong>` : ''}
      ${oef.koppel ? `<span class="koppel" data-r="${oef.koppel.rubriek}" title="${RUBRIEK[oef.koppel.rubriek]}">${oef.koppel.onderwerp}</span>` : ''}
      <span class="oef-vink" aria-hidden="true"></span>
    </header>`;
    const fig = oef.figuur ? `<div class="oef-fig">${oef.figuur}</div>` : oef.prent ? `<div class="oef-prent"><img src="assets/fig/prent-${oef.prent}.png" alt="" loading="lazy"></div>` : '';
    kaart.innerHTML = `${kop}<div class="oef-lijf ${fig ? 'met-fig' : ''}"><div class="oef-tekst"><div class="oef-opgave">${wiskunde(oef.opgave || '')}</div><div class="oef-delen" data-kol="${oef.lijst === 'reeks' ? oef.kolommen : 1}"></div>${oef.slot ? `<p>${wiskunde(oef.slot)}</p>` : ''}</div>${fig}</div><div class="oef-voet"></div>`;
    const delenEl = $('.oef-delen', kaart), voet = $('.oef-voet', kaart);

    const meld = sleutel => u => { uitslag.set(sleutel, u); zetStaat(oef, kaart, uitslag); if (u === 'fout') $('.vast', kaart)?.classList.add('open'); };

    (oef.delen || []).forEach((d, i) => {
      const r = document.createElement('div');
      r.className = 'deel';
      r.innerHTML = `<div class="deel-opgave"><b class="deel-letter">${LETTERS[i]}</b><div>${wiskunde(d.opgave)}</div></div>`;
      if (d.controle) { r.appendChild(controleBlok(d.controle, meld(i))); nodig++; }
      if (d.antwoord || d.uitwerking) {
        const zelf = !d.controle;
        if (zelf) nodig++;
        r.appendChild(onthulBlok({ antwoord: d.antwoord, uitwerking: d.uitwerking, zelf, op: meld(i) }));
      }
      delenEl.appendChild(r);
    });
    /* Antwoord of uitwerking voor de hele oefening. */
    if (oef.controle && !(oef.delen || []).length) { voet.appendChild(controleBlok(oef.controle, meld('heel'))); nodig++; }
    if (oef.antwoord || oef.uitwerking) {
      const antwoordVelden = (oef.delen || []).some(d => d.controle);
      const zelf = !oef.controle && !antwoordVelden;
      if (zelf) nodig++;
      voet.appendChild(onthulBlok({ antwoord: oef.antwoord, uitwerking: oef.uitwerking, zelf, op: meld('heel-zelf') }));
    }
    kaart.dataset.nodig = nodig;
    if (voortgang.oef[oef.id]) kaart.dataset.staat = voortgang.oef[oef.id];

    const hulp = AX.hulp[oef.id];
    if (hulp) {
      const lijst = [].concat(hulp);
      const v = document.createElement('div');
      v.className = 'vast';
      v.innerHTML = `<button type="button" class="knop-tekst">Ik zit vast</button><span class="vast-link" hidden>Kijk eerst naar ${lijst.map(h => `<a href="#naar-vb-${h}">voorbeeld ${AX.voorbeeldNr(h)}</a>`).join(' en ')}.</span>`;
      $('button', v).addEventListener('click', () => { Geluid.klik(); toonIn($('.vast-link', v)); $('button', v).hidden = true; });
      $$('a', v).forEach(a => a.addEventListener('click', () => Geluid.klik()));
      voet.appendChild(v);
    }
    el.appendChild(kaart);
  };

  /* --- reeksen: Opdrachten, Koppel, Test --------------------------------------------------- */
  AX.oefenreeks = function (el, soort) {
    const lijst = AX.alleOefeningen().filter(o => o.soort === soort);
    el.classList.add('reeks');
    let balk = null;
    if (soort === 'opdracht') {
      balk = document.createElement('div');
      balk.className = 'filter';
      balk.innerHTML = `<div class="seg" role="group" aria-label="Filter op niveau">
          <button type="button" data-n="0" class="aan">Alle</button>
          ${[1, 2, 3].map(n => `<button type="button" data-n="${n}" aria-label="${NIVEAUS[n]}"><span class="niveau" data-n="${n}"><i></i><i></i><i></i></span> ${NIVEAUS[n]}</button>`).join('')}
        </div>
        <p class="filter-stand" aria-live="polite"></p>`;
      el.appendChild(balk);
    }
    const kaarten = document.createElement('div');
    kaarten.className = 'kaarten';
    el.appendChild(kaarten);
    lijst.forEach(o => { const d = document.createElement('div'); d.dataset.niveau = o.niveau || 0; kaarten.appendChild(d); AX.oefenkaart(d, o); });
    if (balk) {
      const stand = () => { $('.filter-stand', balk).textContent = `${lijst.filter(o => voortgang.oef[o.id] === 'goed').length} van de ${lijst.length} juist`; };
      stand();
      document.addEventListener('oef-gewijzigd', stand);
      $$('.seg button', balk).forEach(k => k.addEventListener('click', () => {
        Geluid.klik();
        $$('.seg button', balk).forEach(x => x.classList.toggle('aan', x === k));
        $$('[data-niveau]', kaarten).forEach(d => { d.hidden = k.dataset.n !== '0' && d.dataset.niveau !== k.dataset.n; });
      }));
    }
  };

  /* --- Fout? Herhaal ------------------------------------------------------------------------ */
  AX.herhaalschema = function (el) {
    const rijen = AX.schema();
    el.className = 'schema';
    el.innerHTML = `<div class="schema-kop"><h3>Fout? Herhaal</h3><p class="schema-score" aria-live="polite"></p></div>
      <ul>${rijen.map(r => {
        const t = AX.oefening(r.test), o = AX.oefening(r.oefening);
        return `<li data-test="${r.test}"><a class="blok-nr" href="#naar-${r.test}">${t.nr}</a><span class="pijl" aria-hidden="true"></span>
          <span class="schema-doel"><a href="#naar-vb-${r.voorbeeld}">Voorbeeld ${AX.voorbeeldNr(r.voorbeeld)}</a> <span aria-hidden="true">+</span> <a href="#naar-${r.oefening}">Oefening ${o.nr}</a></span>
          <span class="schema-vink"></span></li>`;
      }).join('')}</ul>`;
    const werk = (viering) => {
      let goed = 0, gedaan = 0;
      rijen.forEach(r => {
        const s = voortgang.oef[r.test], li = $(`[data-test="${r.test}"]`, el);
        li.dataset.staat = s || '';
        if (s === 'goed') goed++;
        if (s) gedaan++;
      });
      $('.schema-score', el).textContent = gedaan ? `${goed} van de ${rijen.length} juist` : 'Maak eerst de test: dan zie je hier wat je moet herhalen.';
      if (viering && gedaan === rijen.length && goed === rijen.length) { Geluid.klaar(); spat($('.schema-kop', el), 40); }
    };
    werk(false);
    document.addEventListener('oef-gewijzigd', e => { if (rijen.some(r => r.test === e.detail.id)) werk(true); });
    $$('a', el).forEach(a => a.addEventListener('click', () => Geluid.klik()));
  };

  /* --- Nu jij ------------------------------------------------------------------------------- */
  AX.nuJij = function (el, id) {
    const n = AX.nujij[id];
    if (!n) return;
    const k = document.createElement('aside');
    k.className = 'nujij';
    k.id = 'nujij-' + id;
    k.innerHTML = `<p class="nujij-vraag"><span class="etiket-sterk">Nu jij</span> ${wiskunde(n.vraag)}</p>`;
    if (n.velden) k.appendChild(controleBlok({ velden: n.velden }, u => { if (u === 'goed') { voortgang.oef['nj-' + id] = 'goed'; bewaar(); } }));
    k.appendChild(onthulBlok({ antwoord: n.antwoord, op: () => {} }));
    el.appendChild(k);
  };

  /* --- de speler voor voorbeelden ----------------------------------------------------------- */
  AX.speler = function (el, id) {
    const v = AX.voorbeelden[id];
    if (!v) { el.textContent = 'Voorbeeld ' + id + ' ontbreekt.'; return; }
    const nr = AX.voorbeeldNr(id);
    const a = document.createElement('article');
    a.className = 'voorbeeld';
    a.id = 'vb-' + id;
    a.tabIndex = -1;
    a.innerHTML = `<header class="vb-kop"><span class="vb-nr">Voorbeeld ${nr}</span><div class="vb-opgave">${wiskunde(v.opgave)}</div></header>
      <p class="uitleg">${wiskunde(v.aanpak)}</p>
      <div class="vb-werk ${v.figuur ? 'met-fig' : ''}">
        ${v.figuur ? '<div class="vb-fig"></div>' : ''}
        <div class="vb-links">
          <p class="vb-denk">Wat zou jij als eerste doen? Denk even na, en klik dan op Eerste stap.</p>
          <ol class="vb-stappen">${v.stappen.map((s, i) => `<li data-i="${i}" hidden>${s.f ? `<div class="vb-formule">${tex(s.f, true)}</div>` : ''}<p class="uitleg">${wiskunde(s.t)}</p></li>`).join('')}</ol>
        </div>
      </div>
      <div class="vb-balk">
        <button type="button" class="knop-rond vb-terug" aria-label="Vorige stap" disabled>←</button>
        <div class="kralen" aria-hidden="true">${v.stappen.map(() => '<i></i>').join('')}</div>
        <button type="button" class="knop vb-verder">Eerste stap</button>
        <button type="button" class="knop-tekst vb-alles">Toon alles</button>
      </div>
      <div class="vb-slot" hidden>
        ${v.slot ? `<p>${wiskunde(v.slot)}</p>` : ''}
        ${v.probeer ? `<p class="probeer"><span class="etiket-sterk">Probeer het zelf</span> ${v.probeer.map(p => {
          const o = AX.oefening(p);
          return o ? `<a class="knop-link" href="#naar-${p}">Oefening ${o.nr} →</a>` : `<a class="knop-link" href="#naar-${p}">Nu jij →</a>`;
        }).join(' ')}</p>` : ''}
      </div>`;
    el.appendChild(a);
    const liKs = $$('.vb-stappen li', a), kralen = $$('.kralen i', a);
    const verder = $('.vb-verder', a), terug = $('.vb-terug', a), alles = $('.vb-alles', a), slot = $('.vb-slot', a);
    let figuur = v.figuur ? v.figuur($('.vb-fig', a)) : null;
    let stand = 0;
    const n = v.stappen.length;

    function toon(nieuw, { stil = false, animatie = true } = {}) {
      const vooruit = nieuw > stand;
      stand = nieuw;
      liKs.forEach((li, i) => {
        const was = !li.hidden;
        li.hidden = i >= stand;
        li.classList.toggle('laatst', i === stand - 1);
        if (!li.hidden && !was && animatie && !rust()) {
          li.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
          const f = $('.vb-formule', li);
          if (f) f.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 300, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' });
        }
      });
      kralen.forEach((k, i) => k.classList.toggle('aan', i < stand));
      $('.vb-denk', a).hidden = stand > 0;
      terug.disabled = stand === 0;
      verder.textContent = stand === 0 ? 'Eerste stap' : stand >= n ? 'Opnieuw bekijken' : 'Volgende stap';
      alles.hidden = stand >= n;
      if (figuur) figuur(stand, vooruit && animatie);
      if (stand >= n) {
        const eerste = !voortgang.voorbeeld[id];
        if (slot.hidden) toonIn(slot);
        if (!stil) {
          if (eerste) { voortgang.voorbeeld[id] = true; bewaar(); Geluid.klaar(); spat(verder, 18); }
          else Geluid.goed();
        }
      } else slot.hidden = true;
    }
    verder.addEventListener('click', () => {
      if (stand >= n) { Geluid.zwiep(); toon(0); return; }
      Geluid.stap(stand);
      toon(stand + 1);
      if (innerWidth < 900) liKs[stand - 1].scrollIntoView({ behavior: rust() ? 'auto' : 'smooth', block: 'nearest' });
    });
    terug.addEventListener('click', () => { Geluid.klik(); toon(stand - 1); });
    alles.addEventListener('click', () => { Geluid.zwiep(); toon(n); });
    a.addEventListener('keydown', e => {
      if (e.target.closest('input')) return;
      if (e.key === 'ArrowRight' && stand < n) { e.preventDefault(); Geluid.stap(stand); toon(stand + 1); }
      if (e.key === 'ArrowLeft' && stand > 0) { e.preventDefault(); Geluid.klik(); toon(stand - 1); }
    });
    $$('.vb-slot a', a).forEach(l => l.addEventListener('click', () => Geluid.klik()));
    if (figuur) figuur(0, false);
    if (voortgang.voorbeeld[id]) toon(n, { stil: true, animatie: false });
  };
})();
