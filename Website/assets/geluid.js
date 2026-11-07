/* Alle geluiden worden in de browser gesynthetiseerd: geen geluidsbestanden, geen rechtenkwesties.
   De browser laat geluid pas toe na een eerste klik; bij de eerste handeling start de AudioContext. */
(function () {
  let ctx = null, meester = null, ruis = null;
  let aan = true;
  try { aan = localStorage.getItem('axiomath-geluid') !== 'uit'; } catch (e) {}

  function start() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    meester = ctx.createGain();
    meester.gain.value = aan ? 0.55 : 0;
    const rem = ctx.createDynamicsCompressor();
    meester.connect(rem); rem.connect(ctx.destination);
    ruis = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
    const d = ruis.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return true;
  }
  ['pointerdown', 'keydown'].forEach(t => addEventListener(t, start, { capture: true, passive: true }));

  const klaar = () => aan && ctx && ctx.state === 'running';

  function toon(f, duur, { type = 'sine', vol = 0.3, naar = null, wacht = 0, aanval = 0.004 } = {}) {
    const t = ctx.currentTime + wacht;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (naar) o.frequency.exponentialRampToValueAtTime(naar, t + duur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + aanval);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duur);
    o.connect(g); g.connect(meester);
    o.start(t); o.stop(t + duur + 0.02);
  }

  function sis(duur, { van = 800, naar = 3000, q = 1.2, vol = 0.2, wacht = 0, soort = 'bandpass' } = {}) {
    const t = ctx.currentTime + wacht;
    const b = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    b.buffer = ruis; b.loop = true;
    f.type = soort; f.Q.value = q;
    f.frequency.setValueAtTime(van, t);
    f.frequency.exponentialRampToValueAtTime(naar, t + duur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + duur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duur);
    b.connect(f); f.connect(g); g.connect(meester);
    b.start(t, Math.random()); b.stop(t + duur + 0.02);
  }

  /* De ballon: een zaagtand door een smal filter, met een trilling die sneller wordt naarmate je harder trekt.
     Het geluid leeft alleen zolang er echt getrokken wordt, en valt na 110 ms stil. */
  const ballon = { o: null, f: null, g: null, l: null, stil: 0 };
  function rek(waarde, snelheid = 1) {
    if (!klaar()) return;
    const t = ctx.currentTime;
    if (!ballon.o) {
      ballon.o = ctx.createOscillator(); ballon.o.type = 'sawtooth';
      ballon.f = ctx.createBiquadFilter(); ballon.f.type = 'bandpass'; ballon.f.Q.value = 9;
      ballon.g = ctx.createGain(); ballon.g.gain.value = 0;
      ballon.l = ctx.createOscillator(); ballon.l.type = 'triangle';
      const diepte = ctx.createGain(); diepte.gain.value = 26;
      ballon.l.connect(diepte); diepte.connect(ballon.o.frequency);
      ballon.o.connect(ballon.f); ballon.f.connect(ballon.g); ballon.g.connect(meester);
      ballon.o.start(); ballon.l.start();
    }
    const w = Math.max(0, Math.min(1, waarde));
    const f = 170 + 780 * w * w + 120 * w;
    ballon.o.frequency.setTargetAtTime(f, t, 0.02);
    ballon.f.frequency.setTargetAtTime(f * 2.4, t, 0.02);
    ballon.l.frequency.setTargetAtTime(14 + 26 * w, t, 0.03);
    ballon.g.gain.setTargetAtTime(Math.min(0.14, 0.05 + 0.1 * snelheid), t, 0.012);
    clearTimeout(ballon.stil);
    ballon.stil = setTimeout(() => { if (ballon.g) ballon.g.gain.setTargetAtTime(0, ctx.currentTime, 0.03); }, 110);
  }

  /* Motor van de auto en het karretje: toonhoogte volgt de snelheid. */
  const motor = { o: null, o2: null, g: null, f: null };
  function motorZet(snelheid) {
    if (!klaar()) return;
    const t = ctx.currentTime;
    if (!motor.o) {
      motor.o = ctx.createOscillator(); motor.o.type = 'sawtooth';
      motor.o2 = ctx.createOscillator(); motor.o2.type = 'square';
      motor.f = ctx.createBiquadFilter(); motor.f.type = 'lowpass'; motor.f.frequency.value = 420;
      motor.g = ctx.createGain(); motor.g.gain.value = 0;
      motor.o.connect(motor.f); motor.o2.connect(motor.f); motor.f.connect(motor.g); motor.g.connect(meester);
      motor.o.start(); motor.o2.start();
    }
    const s = Math.max(0, Math.min(1, snelheid));
    motor.o.frequency.setTargetAtTime(48 + 120 * s, t, 0.05);
    motor.o2.frequency.setTargetAtTime(24 + 60 * s, t, 0.05);
    motor.f.frequency.setTargetAtTime(240 + 520 * s, t, 0.05);
    motor.g.gain.setTargetAtTime(0.05 + 0.07 * s, t, 0.05);
  }
  function motorStop() {
    if (motor.g && ctx) motor.g.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
  }

  /* Pojojojojong: de veer van een deurstop. Een lage snaar met een filter dat steeds trager open en dicht gaat
     (dat is het "jojojo"), een harde tik vooraan ("po"), metalige boventonen, en een brom die uitsterft ("ong").
     kracht 0..1: hoe verder uitgerekt, hoe lager, luider en langer. */
  function veerGeluid(c, uit, t, kracht = 1) {
    const k = Math.max(0.15, Math.min(1, kracht));
    const duur = 0.65 + 0.75 * k;
    const f0 = 128 - 34 * k;
    const stop = t + duur + 0.05;

    /* De trilling die alles aanstuurt: eerst snel, op het einde trager. */
    const tril = c.createOscillator();
    tril.type = 'sine';
    tril.frequency.setValueAtTime(25, t);
    tril.frequency.exponentialRampToValueAtTime(9.5, t + duur);
    tril.start(t); tril.stop(stop);

    /* De snaar */
    const snaar = c.createGain();
    snaar.gain.setValueAtTime(0.0001, t);
    snaar.gain.exponentialRampToValueAtTime(0.5 + 0.2 * k, t + 0.006);
    /* Lang blijven hangen, en pas op het einde wegvallen: anders hoor je "pong" in plaats van "pojojojojong". */
    snaar.gain.exponentialRampToValueAtTime(0.3 + 0.1 * k, t + duur * 0.45);
    snaar.gain.exponentialRampToValueAtTime(0.1, t + duur * 0.8);
    snaar.gain.exponentialRampToValueAtTime(0.0001, t + duur);
    [['sawtooth', 1, 1], ['square', 1.006, 0.45], ['triangle', 2.01, 0.6]].forEach(([type, maal, luid]) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f0 * maal * 1.5, t);
      o.frequency.exponentialRampToValueAtTime(f0 * maal, t + 0.09);
      const diepte = c.createGain();
      diepte.gain.setValueAtTime(f0 * maal * 0.3, t);
      diepte.gain.exponentialRampToValueAtTime(f0 * maal * 0.02, t + duur);
      tril.connect(diepte); diepte.connect(o.frequency);
      g.gain.value = luid;
      o.connect(g); g.connect(snaar);
      o.start(t); o.stop(stop);
    });

    /* De wah: "jo-jo-jo". Het filter sluit stilaan tot de brom overblijft. */
    const wah = c.createBiquadFilter();
    wah.type = 'bandpass'; wah.Q.value = 5.5;
    wah.frequency.setValueAtTime(1300 + 500 * k, t);
    wah.frequency.exponentialRampToValueAtTime(420, t + duur);
    const wahDiepte = c.createGain();
    wahDiepte.gain.setValueAtTime(760 + 300 * k, t);
    wahDiepte.gain.exponentialRampToValueAtTime(240, t + duur);
    tril.connect(wahDiepte); wahDiepte.connect(wah.frequency);
    /* De luidheid gaat mee op en neer. */
    const golf = c.createGain();
    golf.gain.value = 0.6;
    const golfDiepte = c.createGain();
    golfDiepte.gain.value = 0.4;
    tril.connect(golfDiepte); golfDiepte.connect(golf.gain);
    snaar.connect(wah); wah.connect(golf); golf.connect(uit);

    /* Metalen boventonen, die snel wegsterven */
    [3.17, 5.43, 8.9].forEach((maal, i) => {
      const o = c.createOscillator(), g = c.createGain(), d = c.createGain();
      o.type = 'sine';
      o.frequency.value = f0 * maal * 2;
      d.gain.value = f0 * maal * 0.12;
      tril.connect(d); d.connect(o.frequency);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.1 / (i + 1), t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3 + 0.25 * k);
      o.connect(g); g.connect(uit);
      o.start(t); o.stop(stop);
    });

    /* De tik vooraan */
    const n = c.createBuffer(1, Math.ceil(c.sampleRate * 0.03), c.sampleRate);
    const d = n.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const b = c.createBufferSource(), bg = c.createGain();
    b.buffer = n; bg.gain.value = 0.12 + 0.08 * k;
    b.connect(bg); bg.connect(uit); b.start(t);
    const po = c.createOscillator(), pg = c.createGain();
    po.frequency.setValueAtTime(760, t);
    po.frequency.exponentialRampToValueAtTime(f0, t + 0.045);
    pg.gain.setValueAtTime(0.2, t);
    pg.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    po.connect(pg); pg.connect(uit); po.start(t); po.stop(t + 0.08);
  }

  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
  const G = {
    klik() { if (klaar()) { sis(0.035, { van: 2600, naar: 1800, q: 2, vol: 0.2 }); toon(1500, 0.03, { vol: 0.08 }); } },
    tik(p = 0.5) { if (klaar()) toon(500 + 1100 * p, 0.05, { type: 'triangle', vol: 0.16, naar: 340 + 800 * p }); },
    pop(p = 0.5) { if (klaar()) toon(260 + 620 * p, 0.09, { vol: 0.24, naar: 560 + 1100 * p }); },
    plop() { if (klaar()) { toon(620, 0.12, { vol: 0.24, naar: 150 }); sis(0.08, { van: 700, naar: 240, vol: 0.09 }); } },
    stap(i = 0) { if (klaar()) { toon(392 * Math.pow(2, Math.min(i, 8) * 2 / 12), 0.13, { type: 'triangle', vol: 0.18 }); sis(0.04, { van: 2300, naar: 1400, vol: 0.08 }); } },
    zwiep() { if (klaar()) sis(0.26, { van: 380, naar: 3400, q: 0.8, vol: 0.2 }); },
    blad() { if (klaar()) { sis(0.09, { van: 1500, naar: 4600, q: 0.7, vol: 0.15 }); sis(0.13, { van: 4200, naar: 900, q: 0.7, vol: 0.1, wacht: 0.07 }); } },
    water() { if (klaar()) { for (let i = 0; i < 6; i++) toon(240 + Math.random() * 420, 0.1, { vol: 0.1, naar: 700 + Math.random() * 500, wacht: i * 0.1 + Math.random() * 0.05 }); sis(0.8, { van: 500, naar: 900, q: 0.6, vol: 0.05, soort: 'lowpass' }); } },
    goed() { if (klaar()) [0, 2, 3].forEach((n, i) => toon(notes[n], 0.26, { type: 'triangle', vol: 0.2, wacht: i * 0.075 })); },
    fout() { if (klaar()) { toon(233, 0.18, { type: 'triangle', vol: 0.18 }); toon(196, 0.24, { type: 'triangle', vol: 0.18, wacht: 0.13 }); } },
    klaar() { if (klaar()) { notes.forEach((n, i) => toon(n, 0.42, { type: 'triangle', vol: 0.18, wacht: i * 0.08 })); sis(0.7, { van: 3000, naar: 8000, q: 0.5, vol: 0.05, wacht: 0.3 }); } },
    piep() { if (klaar()) toon(1040, 0.14, { type: 'square', vol: 0.05 }); },
    veer(kracht = 1) { if (klaar()) veerGeluid(ctx, meester, ctx.currentTime, kracht); },
    veerGeluid,
    rek,
    motorZet,
    motorStop,
    get aan() { return aan; },
    zet(w) {
      aan = w;
      try { localStorage.setItem('axiomath-geluid', w ? 'aan' : 'uit'); } catch (e) {}
      if (w) start();
      if (meester) meester.gain.setTargetAtTime(w ? 0.55 : 0, ctx.currentTime, 0.02);
    },
  };
  window.Geluid = G;
})();
