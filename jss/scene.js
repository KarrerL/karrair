/* Ciel de l'accueil : nuages volumétriques en 3 plans, avion de ligne détaillé et traînées de condensation. */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* Un nuage = une image pré-rendue faite de dizaines de « bouffées » douces */
  function cloudSprite(r, w, h, shade) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d');
    const puffs = 26 + Math.floor(r() * 18);
    for (let i = 0; i < puffs; i++) {
      const a = r() * Math.PI, d = Math.sqrt(r());
      const px = w / 2 + Math.cos(a * 2) * d * w * .36, py = h * .62 - Math.abs(Math.sin(a)) * d * h * .34 + r() * h * .08;
      const pr = (h * .16) + r() * h * .2 * (1 - d * .4);
      const g = x.createRadialGradient(px, py - pr * .25, pr * .1, px, py, pr);
      g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(.55, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.beginPath(); x.arc(px, py, pr, 0, 7); x.fill();
    }
    /* ombre douce sous le nuage */
    x.globalCompositeOperation = 'source-atop';
    const s = x.createLinearGradient(0, h * .35, 0, h);
    s.addColorStop(0, 'rgba(255,255,255,0)'); s.addColorStop(1, shade);
    x.fillStyle = s; x.fillRect(0, 0, w, h);
    /* liseré lumineux côté soleil */
    const l = x.createLinearGradient(w, 0, w * .4, h * .5);
    l.addColorStop(0, 'rgba(255,226,190,.55)'); l.addColorStop(1, 'rgba(255,226,190,0)');
    x.fillStyle = l; x.fillRect(0, 0, w, h);
    return c;
  }

  function fit(c) {
    const dpr = Math.min(devicePixelRatio || 1, 2), b = c.getBoundingClientRect();
    c.width = Math.round(b.width * dpr); c.height = Math.round(b.height * dpr);
    const x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { x, w: b.width, h: b.height };
  }

  window.Scene = {
    sky(root) {
      const back = root.querySelector('.sky-back'), front = root.querySelector('.sky-front'), plane = root.querySelector('.airliner');
      const r = rng(11);
      const layers = [
        { n: 7, s: [.10, .18], v: 4, a: .55, y: [.05, .45], shade: 'rgba(120,150,200,.45)' },
        { n: 6, s: [.18, .30], v: 9, a: .8, y: [.35, .8], shade: 'rgba(110,130,180,.55)' }
      ];
      const nearL = { n: 3, s: [.38, .55], v: 22, a: .85, y: [.7, 1.0], shade: 'rgba(100,120,170,.55)' };
      const make = L => Array.from({ length: L.n }, () => {
        const sz = L.s[0] + r() * (L.s[1] - L.s[0]);
        return { L, x: r(), y: L.y[0] + r() * (L.y[1] - L.y[0]), sz, img: cloudSprite(r, 420, 200, L.shade) };
      });
      const far = layers.flatMap(make), near = make(nearL);
      let B = fit(back), F = fit(front);
      addEventListener('resize', () => { B = fit(back); F = fit(front); });

      const trails = [[], []];
      const P = 26000, PAUSE = 2500;
      let mx = 0, my = 0, last = performance.now(), t0 = performance.now() - P * .3;
      root.addEventListener('pointermove', e => { const b = root.getBoundingClientRect(); mx = (e.clientX - b.left) / b.width - .5; my = (e.clientY - b.top) / b.height - .5; });

      function cloudPass(ctx, w, h, list, t) {
        for (const c of list) {
          const cw = c.sz * Math.max(w, 700), ch = cw * .48;
          const span = w + cw * 2;
          const x = ((c.x * span + t / 1000 * c.L.v) % span) - cw + mx * c.L.v * 1.6;
          ctx.globalAlpha = c.L.a;
          ctx.drawImage(c.img, x, c.y * h - ch * .6 + my * c.L.v, cw, ch);
        }
        ctx.globalAlpha = 1;
      }

      function planeAt(k, w, h) {
        /* trajectoire montante et légèrement courbe, l'avion s'éloigne (rétrécit) */
        const x0 = -.15 * w, y0 = .78 * h, cx = .3 * w, cy = .5 * h, x1 = .72 * w, y1 = -.2 * h;
        const u = 1 - k, x = u * u * x0 + 2 * u * k * cx + k * k * x1, y = u * u * y0 + 2 * u * k * cy + k * k * y1;
        const dx = 2 * u * (cx - x0) + 2 * k * (x1 - cx), dy = 2 * u * (cy - y0) + 2 * k * (y1 - cy);
        const base = Math.min(300, Math.max(150, w * .2));
        return { x, y, ang: Math.atan2(dy, dx), size: base * (1.05 - k * .55) };
      }

      function frame(now) {
        if (!root.isConnected) return;
        const dt = Math.min(64, now - last); last = now;
        const { x: bx, w, h } = B;
        bx.clearRect(0, 0, w, h);
        const sun = bx.createRadialGradient(w * .82, h * .95, 10, w * .82, h * .95, w * .55);
        sun.addColorStop(0, 'rgba(255,212,160,.7)'); sun.addColorStop(.4, 'rgba(255,190,150,.18)'); sun.addColorStop(1, 'rgba(255,190,150,0)');
        bx.fillStyle = sun; bx.fillRect(0, 0, w, h);
        cloudPass(bx, w, h, far, now);

        const cyc = (now - t0) % (P + PAUSE), k = cyc / P, flying = k <= 1;
        let p = null;
        if (flying) {
          p = planeAt(k, w, h);
          const ca = Math.cos(p.ang), sa = Math.sin(p.ang), half = p.size * .5;
          /* moteurs : 30 % de l'envergure de chaque côté, légèrement en arrière du centre */
          [-1, 1].forEach((side, i) => {
            const ex = p.x - ca * half * .05 - sa * side * half * .3, ey = p.y - sa * half * .05 + ca * side * half * .3;
            trails[i].push({ x: ex, y: ey, t: now });
          });
          plane.style.opacity = 1;
          plane.style.width = p.size + 'px';
          plane.style.transform = `translate(${p.x - p.size / 2}px, ${p.y - p.size * .4}px) rotate(${p.ang}rad) scaleY(${1 - Math.sin(now / 1800) * .04})`;
        } else { plane.style.opacity = 0; }
        /* traînées : s'élargissent, se diluent et dérivent avec le vent */
        const LIFE = 9000;
        bx.lineCap = 'round';
        trails.forEach(tr => {
          while (tr.length && now - tr[0].t > LIFE) tr.shift();
          for (const pt of tr) { pt.x += dt * .004; pt.y -= dt * .0015; }
          for (let i = 1; i < tr.length; i++) {
            const a = tr[i - 1], b = tr[i], age = (now - b.t) / LIFE;
            const fresh = Math.min(1, (now - b.t) / 260);
            bx.strokeStyle = `rgba(255,255,255,${(1 - age) * .78 * fresh})`;
            bx.lineWidth = 1.4 + age * 15 * (p ? p.size / 260 : 1);
            bx.beginPath(); bx.moveTo(a.x, a.y); bx.lineTo(b.x, b.y); bx.stroke();
          }
        });

        const { x: fx, w: fw, h: fh } = F;
        fx.clearRect(0, 0, fw, fh);
        cloudPass(fx, fw, fh, near, now);
        if (!reduce) requestAnimationFrame(frame);
      }
      if (reduce) { t0 = performance.now() - P * .45; }
      requestAnimationFrame(frame);
    }
  };
})();
