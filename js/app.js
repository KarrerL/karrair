(function () {
  'use strict';
  const D = window.DEST, W = window.WORLD;
  const ORDER = ['pl', 'vn', 'cn', 'kz', 'rw', 'no', 'ee', 'fi', 'dk', 'cl', 'ge', 'ma', 'jp'];
  const NICE = [7.27, 43.66];
  const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const MOIS_L = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const JOURS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const FLIGHT_SEASON = {
    eu: [.85, .8, .9, 1, 1, 1.12, 1.35, 1.4, 1, .95, .85, 1.15],
    nord: [1.05, 1.05, 1, .95, .95, 1.1, 1.3, 1.3, .95, .95, .95, 1.25],
    asie: [.95, .95, 1, 1.05, 1, 1.1, 1.3, 1.35, 1, 1.05, .95, 1.2],
    afr: [1, .95, .9, .9, .95, 1.1, 1.3, 1.3, 1, .95, .95, 1.2],
    sud: [1.1, 1.05, .95, .9, .9, .95, 1.15, 1.15, .95, .95, 1, 1.25]
  };
  const USD = 1.16; /* 1 € ≈ 1,16 $ (indicatif) */
  const CAT = [
    { k: 'flight', n: 'Vols A/R', c: '#3d6fd9' },
    { k: 'hotel', n: 'Hébergement', c: '#d7193a' },
    { k: 'food', n: 'Repas au restaurant', c: '#1f9d6b' },
    { k: 'act', n: 'Activités & entrées', c: '#e8b04b' },
    { k: 'local', n: 'Transports sur place', c: '#8a63d2' },
    { k: 'shop', n: 'Shopping & souvenirs', c: '#22a6c9' }
  ];

  /* ───────── Utilitaires ───────── */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parseISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (s, n) => { const d = parseISO(s); d.setDate(d.getDate() + n); return iso(d); };
  const fmtDate = s => { const d = parseISO(s); return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`; };
  const fmtLong = s => { const d = parseISO(s); return `${d.getDate()} ${MOIS_L[d.getMonth()]} ${d.getFullYear()}`; };
  const today = iso(new Date());
  const r5 = n => Math.round(n / 5) * 5;
  function money(n, cur) {
    cur = cur || state.cur;
    const v = cur === 'USD' ? n * USD : n;
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(v);
  }
  const plural = (n, s, p) => `${n} ${n > 1 ? (p || s + 's') : s}`;

  /* ───────── Icônes ───────── */
  const I = {
    plane: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 15.5v-2l-8-5V3.2a1.5 1.5 0 0 0-3 0V8.5l-8 5v2l8-2.5V18l-2.5 1.8V21l4-1 4 1v-1.2L13.5 18v-5z"/></svg>',
    walk: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="13.5" cy="4" r="2"/><path d="M9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3A7.3 7.3 0 0 0 19 13v-2a5 5 0 0 1-4.3-2.4l-1-1.6a2 2 0 0 0-2.5-.8L6 8.3V13h2V9.6z"/></svg>',
    metro: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 4 2.5 4 6v9.5A3.5 3.5 0 0 0 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19a3.5 3.5 0 0 0 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5-7H6V6h5zm5.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5-7h-5V6h5z"/></svg>',
    bus: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 16c0 .9.4 1.7 1 2.2V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.8c.6-.5 1-1.3 1-2.2V6c0-3.5-3.6-4-8-4S4 2.5 4 6zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5-6H6V6h12z"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-4 0-8 .5-8 4v9.5A3.5 3.5 0 0 0 7.5 19L6 20.5v.5h12v-.5L16.5 19a3.5 3.5 0 0 0 3.5-3.5V6c0-3.5-3.6-4-8-4zm-4 15a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-6H6V7h5zm5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2-6h-5V7h5z"/></svg>',
    taxi: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 6a1.5 1.5 0 0 0-1.4-1H15V3H9v2H6.5a1.5 1.5 0 0 0-1.4 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8zM6.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11l1.5-4.5h11L19 11z"/></svg>',
    cable: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l20 4M12 6v4"/><rect x="6" y="10" width="12" height="10" rx="3" fill="currentColor"/></svg>',
    boat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 21c-1.4 0-2.8-.5-4-1.3a7 7 0 0 1-8 0A7 7 0 0 1 4 21H2v2h2a8.6 8.6 0 0 0 4-1 8.7 8.7 0 0 0 8 0 8.6 8.6 0 0 0 4 1h2v-2zM3.9 19H4c1.6 0 3-.9 4-2 1 1.1 2.4 2 4 2s3-.9 4-2c1 1.1 2.4 2 4 2h.1l1.9-6.7a1 1 0 0 0-.7-1.2L20 10.6V6a2 2 0 0 0-2-2h-3V1H9v3H6a2 2 0 0 0-2 2v4.6l-1.3.4a1 1 0 0 0-.7 1.3zM6 6h12v4l-6-2-6 2z"/></svg>',
    van: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 5H3a2 2 0 0 0-2 2v9h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5zM3 11V7h4v4zm3 6.5A1.5 1.5 0 1 1 6 14a1.5 1.5 0 0 1 0 3.5zM13 11H9V7h4zm5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM15 11V7h1l4 4z"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9a4 4 0 0 0-4-4z"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13zm8 0h-1c1.2.8 2 2 2 3.5V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14zM7 12h5v5H7z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9z"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z"/></svg>',
    ext: '<svg class="ext" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3zm5 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.4 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4zm.8 2h3a15.7 15.7 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6C8.9 5.6 8.4 6.8 8.1 8zM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.4-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 0 1-4.4 3.6zm1.7-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.2 3.8 21.3l1.9.7 1-2.3c.5.2 1 .3 1.3.3C19 20 22 3 22 3c-1 2-8 2.3-13 3.3S2 11.5 2 13.5s1.8 3.8 1.8 3.8C7 8 17 8 17 8z"/></svg>',
    route: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 15.2V5a3 3 0 0 0-6 0v14a1 1 0 0 1-2 0V8.8a3 3 0 1 0-2 0V19a3 3 0 0 0 6 0V5a1 1 0 0 1 2 0v10.2a3 3 0 1 0 2 0z"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m21.4 11.6-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .6.2 1.1.6 1.4l9 9a2 2 0 0 0 2.8 0l7-7a2 2 0 0 0 0-2.8zM5.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.4 10.6 20C5.4 15.4 2 12.3 2 8.5A5.4 5.4 0 0 1 7.5 3 6 6 0 0 1 12 5.1 6 6 0 0 1 16.5 3 5.4 5.4 0 0 1 22 8.5c0 3.8-3.4 6.9-8.6 11.5z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11z"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.3V21h3.8L17.8 9.9 14 6.2zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.8z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14z"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>',
    single: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12-4h-9v7H4V4H2v16h2v-3h16v3h2v-9a4 4 0 0 0-2-4z"/></svg>'
  };
  const MOVE = {
    w: { i: 'walk', l: n => `${n} min à pied`, m: 'walking' },
    m: { i: 'metro', l: n => `${n} min en métro / tram`, m: 'transit' },
    b: { i: 'bus', l: n => `${n} en bus`, m: 'transit' },
    tr: { i: 'train', l: n => `${n} en train`, m: 'transit' },
    t: { i: 'taxi', l: n => `${n} en taxi / VTC`, m: 'driving' },
    f: { i: 'plane', l: n => `${n} de vol`, m: '' },
    k: { i: 'cable', l: n => `${n} en téléphérique`, m: '' },
    o: { i: 'boat', l: n => `${n} en bateau`, m: '' },
    c: { i: 'van', l: n => `${n} en minibus / navette`, m: 'driving' }
  };
  const dur = m => m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ' ' + String(m % 60).padStart(2, '0') : ''}`;
  function parseMove(s) {
    if (!s) return null;
    const m = /^(tr|w|m|b|t|f|k|o|c)(\d+)?(?::(.*))?$/.exec(s);
    if (!m) return null;
    const def = MOVE[m[1]], n = m[2] ? +m[2] : 0;
    let label;
    if (m[1] === 'w') label = def.l(n) + (m[3] ? ` · ${m[3]}` : '');
    else if (!n) label = m[3] || def.l('');
    else label = def.l(dur(n)) + (m[3] ? ` · ${m[3]}` : '');
    return { k: m[1], icon: def.i, label, mode: def.m, min: n };
  }

  /* ───────── État ───────── */
  const saved = store.get('azurea.prefs', {});
  const state = {
    dest: null,
    date: addDays(today, 60),
    days: 7,
    pax: 2,
    noFlight: false,
    budget: null,
    cur: saved.cur || 'EUR',
    last: null
  };
  if (saved.date && saved.date > today) state.date = saved.date;
  if (saved.days) state.days = saved.days;
  if (saved.pax) state.pax = saved.pax;
  if (saved.budget) state.budget = saved.budget;
  const savePrefs = () => store.set('azurea.prefs', { cur: state.cur, date: state.date, days: state.days, pax: state.pax, budget: state.budget });

  /* ───────── Saisons & alertes ───────── */
  const AURORA = { no: { ok: [8, 9, 10, 11, 0, 1, 2], edge: [3] }, fi: { ok: [8, 9, 10, 11, 0, 1, 2], edge: [7, 3] } };
  function auroraState(k, m) { const a = AURORA[k]; if (!a) return null; return a.ok.includes(m) ? 'ok' : a.edge.includes(m) ? 'edge' : 'no'; }
  const BEST = {
    pl: [4, 5, 6, 7, 8], vn: [1, 2, 3, 4], cn: [3, 4, 8, 9], kz: [4, 5, 6, 7, 8], rw: [5, 6, 7, 8, 11, 0, 1],
    no: [9, 10, 0, 1, 2], ee: [4, 5, 6, 7], fi: [8, 9, 0, 1, 2], dk: [4, 5, 6, 7], cl: [9, 10, 11, 2, 3],
    ge: [4, 5, 8, 9], ma: [2, 3, 4, 9, 10], jp: [2, 3, 4, 9, 10]
  };
  const OK = { pl: [3, 9], vn: [0, 5, 6, 7], cn: [2, 5, 10], kz: [3, 9], rw: [2, 9, 10], no: [3, 8], ee: [3, 8], fi: [3, 10, 11], dk: [3, 8], cl: [0, 1, 4], ge: [3, 6, 7], ma: [0, 1, 5, 11], jp: [0, 1, 5, 11] };
  function seasonScore(k, m) { return BEST[k].includes(m) ? 2 : OK[k].includes(m) ? 1 : 0; }

  function warnings(k, q) {
    const d = D[k], m = parseISO(state.date).getMonth(), out = [];
    const a = auroraState(k, m);
    if (a === 'no') out.push({ t: 'warn', h: `Pas d'aurores boréales en ${MOIS_L[m]}`, p: `Les nuits ne sont pas assez sombres de mi-avril à fin août en Laponie. La nuit « aurores » est remplacée par une sortie au soleil de minuit. Pour les voir, partez entre septembre et mars.`, act: { l: 'Décaler en février', f: () => moveMonth(1) } });
    if (a === 'edge') out.push({ t: 'info', h: 'Aurores possibles mais fin de saison', p: 'Les nuits sont courtes à cette période : les chances sont réelles mais plus faibles qu\'entre octobre et mars.' });
    if (a === 'ok') out.push({ t: 'good', h: 'Bonne saison pour les aurores boréales', p: 'Comptez 2 à 3 nuits sur place pour maximiser vos chances : l\'activité dépend de la météo et de l\'activité solaire (application « My Aurora Forecast »).' });
    if (k === 'rw') {
      out.push({ t: 'info', h: 'Permis gorilles : 1 500 USD par personne', p: 'Tarif standard pour les non-résidents, à réserver des mois à l\'avance sur visitrwanda.com (Rwanda Development Board). Un tarif réduit a été annoncé pour 2026 hors juin–octobre : vérifiez-le pour vos dates. Âge minimum 15 ans.' });
      if ([2, 3, 4].includes(m)) out.push({ t: 'warn', h: 'Grande saison des pluies', p: 'De mars à mai, les pistes vers les gorilles sont très boueuses. Les saisons sèches sont juin–septembre et décembre–février.' });
    }
    if (k === 'cn') {
      if (parseISO(state.date) > new Date(2026, 11, 31) || parseISO(addDays(state.date, state.days)) > new Date(2026, 11, 31)) out.push({ t: 'warn', h: 'Exemption de visa à vérifier', p: 'L\'entrée sans visa de 30 jours pour les Français est confirmée jusqu\'au 31 décembre 2026. Au-delà, vérifiez sur le site de l\'ambassade de Chine si elle est prolongée.' });
      if (m === 9) out.push({ t: 'warn', h: 'Semaine d\'or (1er–7 octobre)', p: 'Fête nationale : sites bondés, trains et hôtels plus chers. Évitez la première semaine d\'octobre.' });
      if ([6, 7].includes(m)) out.push({ t: 'info', h: 'Chongqing en été', p: 'Une des « fournaises » de Chine : 35-40 °C. Visites tôt le matin et en soirée.' });
      out.push({ t: 'info', h: 'Paiements en Chine', p: 'Installez Alipay et liez votre carte Visa/Mastercard avant le départ : beaucoup de commerces n\'acceptent plus les espèces.' });
    }
    if (k === 'vn' && [9, 10].includes(m)) out.push({ t: 'warn', h: 'Saison des typhons au centre', p: 'En octobre-novembre, Hội An est souvent inondée. Le nord (Hanoï, Ninh Bình) reste agréable.' });
    if (k === 'jp' && [2, 3].includes(m)) out.push({ t: 'info', h: 'Saison des cerisiers', p: 'Fin mars – début avril : spectacle magnifique mais hôtels jusqu\'à +45 %. Réservez tôt.' });
    if (k === 'kz' && [11, 0, 1].includes(m)) out.push({ t: 'warn', h: 'Hiver continental', p: 'Jusqu\'à −15 °C à Almaty, Kolsai et le Grand lac sont difficiles d\'accès. Shymbulak devient une station de ski.' });
    if (k === 'cl' && [5, 6, 7].includes(m)) out.push({ t: 'info', h: 'Hiver austral', p: 'Il fait frais à Santiago (2-15 °C) et la route d\'El Yeso peut être fermée par la neige.' });
    if (k === 'ge' && [11, 0, 1, 2].includes(m)) out.push({ t: 'warn', h: 'Kazbegi sous la neige', p: 'La route militaire peut fermer et la montée à Gergeti se fait dans la neige.' });
    if (k === 'ma' && [6, 7].includes(m)) out.push({ t: 'warn', h: 'Chaleur à Marrakech', p: 'Jusqu\'à 40-45 °C en juillet-août : visites avant 11 h et après 17 h.' });
    if (k === 'dk' && [0, 1, 2].includes(m)) out.push({ t: 'info', h: 'Tivoli fermé', p: 'Les jardins de Tivoli sont fermés de janvier à fin mars.' });
    if (q && q.short) out.push({ t: 'warn', h: 'Durée courte pour cette destination', p: (d.warnMin || 'Certaines étapes ont été retirées.') + ` Programme calculé : ${q.plan.stops.join(' → ')}.`, act: { l: `Passer à ${q.rec} jours`, f: () => { state.days = q.rec; savePrefs(); renderResults(); } } });
    if (q && q.tooShortFlight) out.push({ t: 'warn', h: 'Vol long-courrier', p: `Avec un vol de nuit, ${state.days} jours ne laissent presque pas de temps sur place. Le calcul a été fait sur ${q.N} jours minimum.` });
    return out;
  }
  function moveMonth(target) {
    const d = parseISO(state.date); let y = d.getFullYear(); if (d.getMonth() >= target) y++;
    state.date = iso(new Date(y, target, 10)); savePrefs(); renderResults(); toast(`Départ décalé au ${fmtLong(state.date)}`);
  }

  /* ───────── Construction du programme ───────── */
  function flightLabel(d) { return `${d.flight.route} · ${d.flight.air} · ${d.flight.dur}`; }
  function returnRoute(d, code) { const p = d.flight.route.split(' → '); p.reverse(); p[0] = code; return p.join(' → '); }
  function freeDay(d, s, i) {
    const v = d.veg[i % d.veg.length], idea = d.free[i % d.free.length];
    return { t: `Journée libre à ${s.city.replace(/ \(.*\)/, '')}`, c: 15, free: true, s: [
      ['09:30', 'Idée du jour', idea, ''],
      ['13:00', 'Déjeuner', `À goûter : ${v[0]}. ${v[1]}`, ''],
      ['15:30', 'Flânerie & souvenirs', 'Marché ou quartier commerçant, petits achats.', ''],
      ['19:30', 'Dîner local', d.vegTip, '']
    ] };
  }
  function adjustDay(k, day, m) {
    if (day.aurora && auroraState(k, m) === 'no') {
      const s = day.s.slice(0, 3);
      if (k === 'no') s.push(['21:00', 'Excursion « soleil de minuit »', 'Minibus vers les plages de Kvaløya (Grøtfjord) : lumière dorée en pleine nuit (mi-mai à fin juillet).', 'w5'], ['00:30', 'Retour à l\'hôtel', '', 'c60']);
      else s.push(['21:00', 'Colline d\'Ounasvaara', 'Marche vers le sommet pour la lumière de minuit (soleil visible toute la nuit début juin – début juillet).', 'b10:Bus 5'], ['23:30', 'Retour à l\'hôtel', '', 'b10']);
      return Object.assign({}, day, { t: 'Lumière arctique de minuit', c: 45, s, swapped: true });
    }
    return day;
  }

  function buildPlan(k, N, cut) {
    const cuts = [];
    const d = D[k], ov = d.flight.overnight, m = parseISO(state.date).getMonth();
    const minN = ov ? 3 : 2;
    const tooShortFlight = N < minN;
    N = Math.max(N, minN);
    let left = N - (ov ? 3 : 2);
    const st = d.stages.map((s, i) => Object.assign({}, s, { i, n: 0 }));
    const order = st.slice().sort((a, b) => a.prio - b.prio || a.i - b.i);
    const inc = [];
    for (const s of order) {
      if (s.i === 0) { s.n = Math.min(s.min, left); left -= s.n; inc.push(s); }
      else if (s.min <= left) { s.n = s.min; left -= s.n; inc.push(s); }
    }
    let guard = 0;
    while (left > 0 && guard++ < 100) {
      let added = false;
      for (const s of order) if (inc.includes(s) && s.n < s.days.length && left > 0) { s.n++; left--; added = true; }
      if (!added) break;
    }
    guard = 0;
    while (left > 0 && guard++ < 100) {
      let added = false;
      for (const s of order) if (inc.includes(s) && s.n < s.max && left > 0) { s.n++; left--; added = true; }
      if (!added) { st[0].n += left; left = 0; }
    }
    inc.sort((a, b) => a.i - b.i);
    const skipped = st.filter(s => !inc.includes(s));
    const mustSkipped = skipped.some(s => s.prio === 1);
    const rec = (ov ? 3 : 2) + d.stages.filter(s => s.prio <= 2).reduce((a, s) => a + s.min, 0);

    const days = [];
    const add = o => days.push(Object.assign({ date: addDays(state.date, days.length), c: 0 }, o));
    const niceSteps = [
      ['', 'Nice – arrêt Jean Médecin', 'Tram T2 direction Aéroport (≈ 26 min, 1,70 €).', ''],
      ['', 'Aéroport Nice Côte d\'Azur (NCE)', ov ? 'Arrivée 3 h avant le vol long-courrier. Enregistrement, sécurité.' : 'Arrivée 2 h avant le vol.', 'm26:Tram T2']
    ];
    const arr = d.arr.map(s => s.slice());
    if (state.noFlight) {
      arr[0][3] = '';
      add({ t: `Arrivée à ${d.city}`, kind: 'arr', s: arr, city: d.city });
    } else if (ov) {
      const hub = d.flight.route.split(' → ')[1];
      add({ t: 'Envol depuis Nice', kind: 'travel', s: [...niceSteps, ['', `Escale à ${hub}`, 'Correspondance, puis vol de nuit.', 'f:1er vol']], city: 'Nice' });
      arr[0][3] = 'f:vol de nuit';
      add({ t: `Arrivée à ${d.city}`, kind: 'arr', s: arr, city: d.city });
    } else {
      arr[0][3] = 'f:' + flightLabel(d);
      add({ t: `Nice → ${d.city}`, kind: 'arr', s: [...niceSteps, ...arr], city: d.city });
    }
    let fi = 0, actCost = 0, transfers = 0;
    inc.forEach((s, si) => {
      if (si > 0 && s.go) transfers += s.go;
      for (let j = 0; j < s.n; j++) {
        let day = j < s.days.length ? s.days[j] : freeDay(d, s, fi++);
        day = adjustDay(k, day, m);
        /* budget serré : les excursions payantes non essentielles deviennent une journée à pied */
        if (cut && !day.gorilla && !day.aurora && !day.must && (day.c || 0) >= 35) { cuts.push(day.t); day = Object.assign(freeDay(d, s, fi++), { t: `À pied dans ${s.city.replace(/ (.*)/, '')} (au lieu de : ${day.t})`, c: 5, cut: true }); }
        actCost += day.c || 0;
        /* musées : seulement les insolites, et seulement pour un séjour de plus de 6 jours */
        const steps = day.s.map(st => Array.isArray(st[4]) ? (N > 6 ? st.slice(0, 4).concat('M') : st[4]) : st);
        add({ t: day.t, c: day.c || 0, s: steps, city: s.city, free: day.free, cut: day.cut, swapped: day.swapped, gorilla: day.gorilla, aurora: day.aurora && !day.swapped });
      }
    });
    const last = inc[inc.length - 1] || st[0];
    const back = last.dep.map(s => s.slice());
    if (!state.noFlight) back.push(['', 'Aéroport Nice Côte d\'Azur', 'Bienvenue à la maison ! Tram T2 vers le centre-ville.', 'f:' + returnRoute(d, last.code) + ' · ' + d.flight.dur]);
    add({ t: state.noFlight ? `Départ de ${last.city}` : `Retour à Nice`, kind: 'dep', s: back, city: last.city });
    return { days, N, actCost, transfers, inc, skipped, cuts, short: mustSkipped || (d.warnMin && N < rec), rec, tooShortFlight, retCode: last.code, stops: inc.map(s => s.city) };
  }

  /* ───────── Formules de budget ───────── */
  const LEVELS = [
    { id: 'confort', n: 'Confort', hotel: 1.55, food: 1.4, shop: 1.3, cut: false, h: 'Hôtel 4★ bien noté', f: 'Bonnes tables locales', stars: 4 },
    { id: 'standard', n: 'Classique', hotel: 1, food: 1, shop: 1, cut: false, h: 'Hôtel 3★ noté 8/10 et plus', f: 'Restaurants typiques', stars: 3 },
    { id: 'malin', n: 'Malin', hotel: .7, food: .75, shop: .7, cut: false, h: 'Hôtel 2★ ou guesthouse bien notée', f: 'Midi street-food et marchés, soir restaurant typique', stars: 2 },
    { id: 'eco', n: 'Petit budget', hotel: .52, food: .58, shop: .45, cut: true, h: 'Chambre privée en auberge ou guesthouse', f: 'Street-food, marchés et cantines locales', stars: 1 }
  ];
  /* Choisit la formule la plus confortable qui tient dans le budget par personne */
  function fit(k, opts) {
    const B = state.budget;
    if (!B) return quote(k, Object.assign({}, opts, { L: LEVELS[1] }));
    let q;
    for (const L of LEVELS) { q = quote(k, Object.assign({}, opts, { L })); if (q.perPerson <= B) { q.fits = true; return q; } }
    q.fits = false; return q;
  }

  /* ───────── Calcul du prix ───────── */
  function quote(k, opts) {
    const o = Object.assign({ days: state.days, pax: state.pax, date: state.date, noFlight: state.noFlight, L: LEVELS[1] }, opts || {});
    const L = o.L;
    const d = D[k], m = parseISO(o.date).getMonth();
    const keep = { days: state.days, date: state.date, noFlight: state.noFlight };
    Object.assign(state, { days: o.days, date: o.date, noFlight: o.noFlight });
    const plan = buildPlan(k, o.days, L.cut);
    Object.assign(state, keep);
    const N = plan.N;
    const lead = Math.round((parseISO(o.date) - parseISO(today)) / 864e5);
    const leadF = lead < 21 ? 1.3 : lead < 45 ? 1.12 : lead > 200 ? 1.05 : 1;
    const flightPP = o.noFlight ? 0 : r5(d.flight.base * FLIGHT_SEASON[d.flight.season][m] * leadF);
    const nights = Math.max(1, N - (d.flight.overnight && !o.noFlight ? 2 : 1));
    const rooms = o.pax === 1 ? [{ t: 'double', n: 'Chambre double (seul·e)', f: .92 }] : o.pax === 2 ? [{ t: 'double', n: 'Chambre double', f: 1 }] : o.pax === 3 ? [{ t: 'double', n: 'Chambre double', f: 1 }, { t: 'single', n: 'Chambre simple', f: .8 }] : [{ t: 'double', n: 'Chambre double', f: 1 }, { t: 'double', n: 'Chambre double', f: 1 }];
    const night = d.hotel.night * d.hotel.season[m] * L.hotel;
    const hotelTotal = r5(nights * night * rooms.reduce((a, r) => a + r.f, 0));
    const daysOn = nights + 1;
    const foodPP = r5(d.food * L.food * daysOn);
    const actPP = r5(plan.actCost);
    const localPP = r5(d.local * daysOn + plan.transfers);
    const shopPP = r5(d.shop * 1.4 * L.shop * Math.min(1.6, Math.max(.6, .5 + N / 14)));
    const pp = { flight: flightPP, hotel: r5(hotelTotal / o.pax), food: foodPP, act: actPP, local: localPP, shop: shopPP };
    const perPerson = Object.values(pp).reduce((a, b) => a + b, 0);
    return { k, L, pp, perPerson, total: perPerson * o.pax, hotelTotal, night: r5(night), nights, rooms, plan, N, pax: o.pax, lead, flightRange: [r5(flightPP * .85), r5(flightPP * 1.2)], short: plan.short, rec: plan.rec, tooShortFlight: plan.tooShortFlight };
  }

  /* ───────── Rendu commun ───────── */
  const app = $('#app');
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2600); }
  function reveal(root) {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.rv', root).forEach((el, i) => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pre'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); } });
  }
  function countUp(root) {
    $$('[data-count]', root).forEach(el => {
      const to = +el.dataset.count, t0 = performance.now(), D0 = 1300;
      const step = t => { if (el.dataset.stop) return; const k = Math.min(1, (t - t0) / D0), e = 1 - Math.pow(1 - k, 3); el.textContent = money(to * e); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
  const PH = window.PHOTOS || {};
  function photo(k, i, small, cls) {
    const p = (PH[k] || [])[i || 0]; if (!p) return '';
    return `<img class="ph ${cls || ''}" src="${small ? p.s : p.f}" alt="${esc(p.t)}" loading="${small ? 'lazy' : 'eager'}" decoding="async" onload="this.classList.add('in')">`;
  }
  function credit(k, i) { const p = (PH[k] || [])[i || 0]; return p ? `<span class="credit">${esc(p.t)} · ${esc(p.a)} · ${esc(p.l)}</span>` : ''; }
  function mountScenes() { }
  /* Conversion automatique des montants en monnaie locale vers l'euro (taux indicatifs) */
  const RATE = { PLN: 4.25, NOK: 11.7, DKK: 7.46, VND: 28500, CNY: 8.3, JPY: 170, KZT: 590, RWF: 1650, CLP: 1050, GEL: 3.1, MAD: 10.8, USD: 1.16 };
  function eurify(txt) {
    const N = '(\\d{1,3}(?:[\\u00a0\\u202f ]\\d{3})+|\\d+(?:,\\d+)?)';
    const re = new RegExp(`(?:${N}\\s?(?:à|-|–)\\s?)?${N}\\s?(PLN|NOK|DKK|VND|CNY|JPY|KZT|RWF|CLP|GEL|MAD|USD)\\b`, 'g');
    const conv = (num, cur) => { const v = parseFloat(num.replace(/[   ]/g, '').replace(',', '.')) / RATE[cur]; return v < 10 ? v.toFixed(2).replace('.', ',') : new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(v)); };
    return esc(txt).replace(re, (all, lo, num, cur) => `${all} <span class="eur">≈ ${lo ? conv(lo, cur) + ' à ' : ''}${conv(num, cur)} €</span>`);
  }
  const ftag = t => t ? `<span class="ftag ${t === 'Poisson' ? 'fish' : 'veg'}">${esc(t)}</span>` : '';
  const flavorsHTML = d => `<div class="flavors">${d.veg.map(v => `<div class="flavor"><b>${esc(v[0])} ${ftag(v[2])}</b><span>${esc(v[1])}</span></div>`).join('')}</div>`;
  const AIRLINER = `<svg class="airliner" viewBox="0 0 200 160" aria-hidden="true">
    <defs>
      <linearGradient id="alF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c3cde0"/><stop offset=".3" stop-color="#fff"/><stop offset=".62" stop-color="#f3f6fb"/><stop offset="1" stop-color="#aab6ca"/></linearGradient>
      <linearGradient id="alW1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f6f8fc"/><stop offset="1" stop-color="#c2ccdb"/></linearGradient>
      <linearGradient id="alW2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f8"/><stop offset="1" stop-color="#b3bfd1"/></linearGradient>
      <linearGradient id="alE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f9cb2"/><stop offset=".45" stop-color="#f4f6fa"/><stop offset="1" stop-color="#7d8aa1"/></linearGradient>
      <radialGradient id="alL"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    </defs>
    <path d="M42 74 L20 49 L13 50 L26 74Z" fill="url(#alW1)" stroke="#a5b1c4" stroke-width=".4"/>
    <path d="M42 86 L20 111 L13 110 L26 86Z" fill="url(#alW2)" stroke="#a5b1c4" stroke-width=".4"/>
    <path d="M124 73 L81 9 L76 6 L71 8 L93 73Z" fill="url(#alW1)" stroke="#a5b1c4" stroke-width=".4"/>
    <path d="M124 87 L81 151 L76 154 L71 152 L93 87Z" fill="url(#alW2)" stroke="#a5b1c4" stroke-width=".4"/>
    <path d="M110 63 L85 24 M101 73 L78 16 M110 97 L85 136 M101 87 L78 144" stroke="#b7c1d0" stroke-width=".5" fill="none"/>
    <path d="M76 6 L73 2 L71 3 L71 8Z M76 154 L73 158 L71 157 L71 152Z" fill="#d7193a"/>
    <rect x="99" y="44" width="27" height="11" rx="5.2" fill="url(#alE)"/><rect x="123.5" y="44.6" width="3" height="9.8" rx="1.5" fill="#4c586d"/>
    <rect x="99" y="105" width="27" height="11" rx="5.2" fill="url(#alE)"/><rect x="123.5" y="105.6" width="3" height="9.8" rx="1.5" fill="#4c586d"/>
    <path d="M197 80 C196 75.6 190 73 181 73 L34 73 C22 73 14 77 9 80 C14 83 22 87 34 87 L181 87 C190 87 196 84.4 197 80Z" fill="url(#alF)"/>
    <path d="M12 80 L44 78.4 L48 80 L44 81.6Z" fill="#d7193a"/>
    <path d="M52 79.4 H178 V80.6 H52Z" fill="#0b1f4f" opacity=".35"/>
    <path d="M187 76.4 C190 77 192.4 78.5 193 80 C192.4 81.5 190 83 187 83.6 L185 82 L185 78Z" fill="#1a2a4c"/>
    <circle class="nl r" cx="73" cy="4" r="5" fill="url(#alL)"/><circle cx="73" cy="4" r="1.6" fill="#ff3348"/>
    <circle class="nl g" cx="73" cy="156" r="5" fill="url(#alL)"/><circle cx="73" cy="156" r="1.6" fill="#33ff88"/>
    <circle class="strobe" cx="10" cy="80" r="6" fill="url(#alL)"/>
  </svg>`;
  function tilt(root) {
    if (matchMedia('(hover: none)').matches) return;
    $$('.dcard', root).forEach(c => {
      c.addEventListener('pointermove', e => { const b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5; c.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`; });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
  }
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn'); if (!b) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), sp = document.createElement('span');
    sp.className = 'rip'; sp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.appendChild(sp); setTimeout(() => sp.remove(), 650);
  });
  function after(root) { mountScenes(root); reveal(root); tilt(root); countUp(root); }

  function destCard(k, tagName) {
    const d = D[k], m = parseISO(state.date).getMonth(), sc = seasonScore(k, m), q = quote(k, { days: 7, pax: 2 });
    const badge = sc === 2 ? `<span class="badge ok">Idéal en ${MOIS_L[m]}</span>` : sc === 1 ? `<span class="badge">Bien en ${MOIS_L[m]}</span>` : `<span class="badge no">Hors saison en ${MOIS_L[m]}</span>`;
    return `<${tagName || 'button'} class="dcard rv" data-open="${k}" type="button">
      <div class="art">${photo(k, 0, true)}${badge}</div>
      <div class="bd"><span class="ct">${esc(d.region)} · ${esc(d.city)}</span><span class="nm">${esc(d.name)}</span><span class="tg">${esc(d.tag)}</span>
      <span class="pr"><span>7 jours · vol + hôtel<br>par pers., base 2</span><b class="num">${money(q.perPerson)}</b></span></div>
    </${tagName || 'button'}>`;
  }
  function bindCards(root) { $$('[data-open]', root).forEach(b => b.addEventListener('click', () => go('dest-' + b.dataset.open))); }

  /* ───────── Module de réservation ───────── */
  function bookingHTML() {
    const d = state.dest ? D[state.dest] : null;
    const end = addDays(state.date, state.days - 1);
    return `<div class="booking rv" id="booking">
      <div class="tabs" role="tablist">
        <button role="tab" aria-selected="${!state.noFlight}" data-tab="full">${I.plane}Vol + hôtel</button>
        <button role="tab" aria-selected="${state.noFlight}" data-tab="nofl">${I.bed}Séjour sans vol</button>
        <button role="tab" aria-selected="false" data-tab="trips">${I.heart}Mes voyages</button>
      </div>
      <form class="bk-body" id="bkForm" novalidate>
        <div class="field f-from"><span class="lbl">Départ</span><span class="val">Nice Côte d'Azur</span><span class="sub">NCE · Terminal 1 ou 2</span><span class="lock">${I.lock}</span></div>
        <button type="button" class="field f-to" id="pickDest"><span class="lbl">Destination</span><span class="val">${d ? esc(d.city) + ', ' + esc(d.name) : 'Choisir sur la carte'}</span><span class="sub">${d ? esc(d.flight.route) : '13 pays disponibles'}</span></button>
        <div class="field f-date"><label for="bkDate">Aller</label><input id="bkDate" type="date" min="${addDays(today, 1)}" value="${state.date}"><span class="sub" id="bkRet">Retour le ${fmtDate(end)}</span></div>
        <div class="field dur f-dur"><label for="bkDays">Durée</label><span class="val num" id="bkDaysV">${plural(state.days, 'jour')} · ${plural(state.days - 1, 'nuit')}</span><input id="bkDays" type="range" min="2" max="21" step="1" value="${state.days}" aria-valuetext="${state.days} jours"></div>
        <div class="field f-pax"><span class="lbl">Voyageurs</span><div class="stepper"><button type="button" id="paxM" aria-label="Retirer un voyageur" ${state.pax <= 1 ? 'disabled' : ''}>−</button><span class="val num" id="paxV">${state.pax}</span><button type="button" id="paxP" aria-label="Ajouter un voyageur" ${state.pax >= 4 ? 'disabled' : ''}>+</button></div><span class="sub" id="paxS">${roomText(state.pax)}</span></div>
        <div class="field f-bud"><label for="bkBud">Budget / pers.</label><div class="bud-in"><input id="bkBud" type="number" inputmode="numeric" min="100" step="50" placeholder="Sans limite" value="${state.budget || ''}"><span>€</span></div><span class="sub" id="bkBudS">${state.budget ? 'Programme adapté au budget' : 'Facultatif'}</span></div>
        <button class="btn btn-red go" type="submit">${I.search}Rechercher</button>
      </form>
      <div class="bk-foot"><span>${I.leaf.replace('<svg', '<svg width="16" height="16" style="vertical-align:-3px;color:var(--ok)"')} Restos locaux + plats sans viande pour toi</span><span>Économique · bagage cabine</span><span class="bk-err" id="bkErr" role="alert"></span></div>
    </div>`;
  }
  function roomText(p) { return p === 1 ? '1 chambre double' : p === 2 ? '1 chambre pour 2' : p === 3 ? '1 double + 1 simple' : '2 chambres doubles'; }
  function bindBooking(root) {
    $$('[data-tab]', root).forEach(b => b.addEventListener('click', () => {
      if (b.dataset.tab === 'trips') return go('voyages');
      state.noFlight = b.dataset.tab === 'nofl';
      $$('[data-tab]', root).forEach(x => x.setAttribute('aria-selected', x === b));
      refreshPrices();
    }));
    $('#pickDest', root).addEventListener('click', openPicker);
    $('#bkDate', root).addEventListener('change', e => { if (e.target.value) { state.date = e.target.value; savePrefs(); $('#bkRet').textContent = 'Retour le ' + fmtDate(addDays(state.date, state.days - 1)); refreshPrices(); } });
    $('#bkDays', root).addEventListener('input', e => { state.days = +e.target.value; e.target.setAttribute('aria-valuetext', state.days + ' jours'); $('#bkDaysV').textContent = `${plural(state.days, 'jour')} · ${plural(state.days - 1, 'nuit')}`; $('#bkRet').textContent = 'Retour le ' + fmtDate(addDays(state.date, state.days - 1)); savePrefs(); refreshPrices(); });
    const setPax = n => { state.pax = Math.min(4, Math.max(1, n)); $('#paxV').textContent = state.pax; $('#paxS').textContent = roomText(state.pax); $('#paxM').disabled = state.pax <= 1; $('#paxP').disabled = state.pax >= 4; savePrefs(); refreshPrices(); };
    $('#paxM', root).addEventListener('click', () => setPax(state.pax - 1));
    $('#paxP', root).addEventListener('click', () => setPax(state.pax + 1));
    $('#bkBud', root).addEventListener('input', e => { const v = parseInt(e.target.value, 10); state.budget = v >= 100 ? v : null; $('#bkBudS').textContent = state.budget ? 'Programme adapté au budget' : 'Facultatif'; savePrefs(); });
    $('#bkForm', root).addEventListener('submit', e => { e.preventDefault(); search(); });
  }
  function refreshPrices() { if (window.__mapApi) window.__mapApi.refresh(); }
  function setDest(k, scroll) {
    state.dest = k;
    const f = $('#pickDest');
    if (f) { $('.val', f).textContent = `${D[k].city}, ${D[k].name}`; $('.sub', f).textContent = D[k].flight.route; f.classList.add('active'); setTimeout(() => f.classList.remove('active'), 900); }
    $('#bkErr') && ($('#bkErr').textContent = '');
    if (window.__mapApi) window.__mapApi.select(k);
    $$('.chips [data-k]').forEach(c => c.setAttribute('aria-pressed', c.dataset.k === k));
    if (scroll && $('#booking')) $('#booking').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function openPicker() {
    const bg = document.createElement('div'); bg.className = 'sheet-bg';
    bg.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="Choisir une destination">
      <div class="panel-hd" style="margin:0 0 12px"><b class="h3">Où partez-vous ?</b><button class="btn btn-ghost btn-sm" data-x>Fermer</button></div>
      <input type="search" id="pkQ" placeholder="Pays ou ville…" autocomplete="off">
      <div class="sheet-list">${ORDER.map(k => `<button data-k="${k}"><span class="chip-fl">${flag(k)}</span><span><b>${esc(D[k].name)}</b><small>${esc(D[k].city)} · ${esc(D[k].code)}</small></span></button>`).join('')}</div>
      <button class="btn btn-ink btn-sm" data-map style="margin-top:14px">${I.globe}Voir sur la carte</button></div>`;
    document.body.appendChild(bg); lockScroll(); noTouchScroll(bg);
    const close = () => { if (bg.isConnected) { bg.remove(); unlockScroll(); } };
    bg.addEventListener('click', e => { if (e.target === bg || e.target.closest('[data-x]')) close(); });
    $('[data-map]', bg).addEventListener('click', () => { close(); const m = $('#map'); if (m) m.scrollIntoView({ behavior: 'smooth' }); else go(''); });
    $$('[data-k]', bg).forEach(b => b.addEventListener('click', () => { setDest(b.dataset.k); close(); }));
    const q = $('#pkQ', bg); q.focus();
    q.addEventListener('input', () => { const v = q.value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, ''); $$('[data-k]', bg).forEach(b => { const d = D[b.dataset.k]; b.hidden = !(d.name + ' ' + d.city + ' ' + d.code).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(v); }); });
    document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', k); } });
  }
  /* Drapeaux simplifiés en SVG */
  function flag(k) {
    const F = {
      pl: '<rect width="18" height="6" fill="#fff"/><rect y="6" width="18" height="6" fill="#dc143c"/>',
      vn: '<rect width="18" height="12" fill="#da251d"/><path d="M9 3l.9 2.7h2.8l-2.3 1.7.9 2.7L9 8.4l-2.3 1.7.9-2.7-2.3-1.7h2.8z" fill="#ff0"/>',
      cn: '<rect width="18" height="12" fill="#de2910"/><path d="M4 2l.6 1.8h1.9l-1.5 1.1.6 1.8L4 5.6 2.4 6.7 3 4.9 1.5 3.8h1.9z" fill="#ffde00"/>',
      kz: '<rect width="18" height="12" fill="#00afca"/><circle cx="9" cy="6" r="2.4" fill="#fec50c"/>',
      rw: '<rect width="18" height="6" fill="#20603d"/><rect width="18" height="3" y="6" fill="#fad201"/><rect width="18" height="3" y="9" fill="#20603d"/><rect width="18" height="6" fill="#00a1de"/><circle cx="14" cy="2.6" r="1.4" fill="#fad201"/>',
      no: '<rect width="18" height="12" fill="#ba0c2f"/><path d="M5 0h3v12H5zM0 4.5h18v3H0z" fill="#fff"/><path d="M5.8 0h1.4v12H5.8zM0 5.3h18v1.4H0z" fill="#00205b"/>',
      ee: '<rect width="18" height="4" fill="#0072ce"/><rect y="4" width="18" height="4" fill="#000"/><rect y="8" width="18" height="4" fill="#fff"/>',
      fi: '<rect width="18" height="12" fill="#fff"/><path d="M5 0h3v12H5zM0 4.5h18v3H0z" fill="#002f6c"/>',
      dk: '<rect width="18" height="12" fill="#c8102e"/><path d="M5 0h2.2v12H5zM0 4.9h18v2.2H0z" fill="#fff"/>',
      cl: '<rect width="18" height="6" fill="#fff"/><rect y="6" width="18" height="6" fill="#d52b1e"/><rect width="6" height="6" fill="#0039a6"/><circle cx="3" cy="3" r="1.1" fill="#fff"/>',
      ge: '<rect width="18" height="12" fill="#fff"/><path d="M7.7 0h2.6v12H7.7zM0 4.7h18v2.6H0z" fill="#ff0000"/>',
      ma: '<rect width="18" height="12" fill="#c1272d"/><path d="M9 3.2l.8 2.4h2.5l-2 1.5.8 2.4L9 8l-2.1 1.5.8-2.4-2-1.5h2.5z" fill="none" stroke="#006233" stroke-width=".7"/>',
      jp: '<rect width="18" height="12" fill="#fff"/><circle cx="9" cy="6" r="3.4" fill="#bc002d"/>'
    };
    return `<svg class="fl" viewBox="0 0 18 12" width="18" height="12" aria-hidden="true">${F[k]}</svg>`;
  }

  /* ───────── Carte du monde ───────── */
  const R = Math.PI / 180;
  const miller = lat => 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * R));
  function project(lon, lat) { return [lon * R * W.s + W.w / 2, (W.top - miller(lat)) * W.s]; }
  /* Avion vu de dessus, nez vers la droite (≈ 20 unités d'envergure) */
  const PLANE_D = 'M10 0C10-.7 9.3-1 8.4-1H2.2L-2.6-8.6H-4.3L-1.7-1H-6.6L-8.4-3.6H-9.6L-8.6-.7-9.1 0-8.6.7-9.6 3.6H-8.4L-6.6 1H-1.7L-4.3 8.6H-2.6L2.2 1H8.4C9.3 1 10 .7 10 0Z';
  const normTxt = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
  const visited = new Set(store.get('azurea.visited', []));
  const saveVisited = () => store.set('azurea.visited', [...visited]);
  const ISO = {}; ORDER.forEach(k => ISO[D[k].iso] = k);

  function mapHTML() {
    const grat = [];
    for (let lon = -180; lon <= 180; lon += 30) { const [x] = project(lon, 0); grat.push(`M${x.toFixed(1)} 0V${W.h}`); }
    for (let lat = -30; lat <= 60; lat += 30) { const [, y] = project(0, lat); grat.push(`M0 ${y.toFixed(1)}H${W.w}`); }
    const paths = Object.entries(W.paths).map(([id, d]) => { const k = ISO[id]; return `<path class="c${k ? ' d' : ''}${id === '250' ? ' fr' : ''}${visited.has(id) ? ' v' : ''}" data-id="${esc(id)}" ${k ? `data-k="${k}"` : ''} d="${d}"/>`; }).join('');
    const pins = ORDER.map(k => { const [x, y] = project(...D[k].ll); const left = D[k].ll[0] > 125 || k === 'dk' || k === 'ee' || k === 'fi'; return `<g class="pin" data-k="${k}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle class="halo" r="5"/><circle class="dot" r="3"/><text x="${left ? -7 : 7}" y="3" text-anchor="${left ? 'end' : 'start'}">${esc(D[k].city)}</text></g>`; }).join('');
    const [nx, ny] = project(...NICE);
    const opts = Object.entries(W.names).sort((a, b) => a[1].localeCompare(b[1], 'fr')).map(([, n]) => `<option value="${esc(n)}">`).join('');
    return `<div class="map-shell rv" id="map">
      <svg class="world" viewBox="0 0 ${W.w} ${W.h}" role="img" aria-label="Carte du monde des destinations au départ de Nice">
        <defs><radialGradient id="seaGlow" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="var(--sea-2)" stop-opacity="0"/><stop offset="1" stop-color="var(--ink)" stop-opacity=".08"/></radialGradient></defs>
        <rect width="${W.w}" height="${W.h}" fill="url(#seaGlow)"/>
        <g class="grat">${grat.map(d => `<path d="${d}"/>`).join('')}</g>
        <g id="lands">${paths}</g>
        <g id="arcs"></g>
        <g>${pins}</g>
        <g class="pin nice" transform="translate(${nx.toFixed(1)} ${ny.toFixed(1)})"><circle class="dot" r="3.2"/><text x="-6" y="-6" text-anchor="end">Nice</text></g>
        <g class="plane" id="mplane" style="display:none"><path class="pl-shadow" d="${PLANE_D}" transform="translate(1.6 2.4)"/><path class="pl-body" d="${PLANE_D}"/></g>
      </svg>
      <div class="map-tools"><button type="button" data-z="in" aria-label="Zoomer">${I.plus}</button><button type="button" data-z="out" aria-label="Dézoomer">${I.minus}</button><button type="button" data-z="reset" aria-label="Vue entière">${I.reset}</button></div>
      <div class="map-legend"><span><i style="background:var(--signal)"></i>Destination disponible</span><span><i style="background:var(--gold)"></i>Sélection</span><span><i style="background:var(--visited)"></i>Déjà visité</span></div>
      <div class="map-tip" id="mtip"></div>
    </div>
    <div class="chips" role="group" aria-label="Destinations">${ORDER.map(k => `<button class="chip" data-k="${k}" aria-pressed="${state.dest === k}">${flag(k)}${esc(D[k].name)}</button>`).join('')}</div>
    <div class="visited rv">
      <div class="vis-hd"><div><b class="h3">Mes pays visités</b><span id="visCount"></span></div><button type="button" class="chip" id="visMode" aria-pressed="false">${I.check.replace('<svg', '<svg width="16" height="16"')}Cocher en cliquant sur la carte</button></div>
      <form id="visForm" class="vis-form" autocomplete="off"><label for="visIn" class="sr">Pays visité</label><input id="visIn" list="visList" placeholder="Écris un pays : Italie, Thaïlande, Pérou…"><datalist id="visList">${opts}</datalist><button class="btn btn-ink btn-sm" type="submit">${I.plus}Ajouter</button></form>
      <div class="vis-err" id="visErr" role="alert"></div>
      <div class="chips" id="visChips"></div>
    </div>`;
  }
  function bindMap(root) {
    const shell = $('#map', root), svg = $('svg', shell), tip = $('#mtip', shell), arcs = $('#arcs', shell), plane = $('#mplane', shell);
    const full = [0, 0, W.w, W.h]; let vb = full.slice(), anim = 0, planeRaf = 0, arcPath = null, mark = false;
    const setVB = v => { vb = v; svg.setAttribute('viewBox', v.map(n => n.toFixed(1)).join(' ')); shell.classList.toggle('labels', v[2] < W.w * .6); shell.style.setProperty('--z', (W.w / v[2]).toFixed(2)); svg.style.touchAction = v[2] < W.w * .98 ? 'none' : 'pan-y'; };
    function animateVB(to, ms) {
      cancelAnimationFrame(anim); const from = vb.slice(), t0 = performance.now(); ms = ms || 900;
      const st = t => { const k = Math.min(1, (t - t0) / ms), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; setVB(from.map((f, i) => f + (to[i] - f) * e)); if (k < 1) anim = requestAnimationFrame(st); };
      anim = requestAnimationFrame(st);
    }
    function clampVB(v) { const w = Math.min(W.w, Math.max(W.w / 12, v[2])), h = w * W.h / W.w; return [Math.min(W.w - w, Math.max(0, v[0])), Math.min(W.h - h, Math.max(0, v[1])), w, h]; }
    function arcFor(k) {
      const [x1, y1] = project(...NICE), [x2, y2] = project(...D[k].ll), dx = x2 - x1, dy = y2 - y1, dist = Math.hypot(dx, dy);
      const cx = (x1 + x2) / 2 + (dx > 0 ? dy : -dy) * .12, cy = (y1 + y2) / 2 - dist * .32;
      return { d: `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`, box: [Math.min(x1, x2, cx), Math.min(y1, y2, cy), Math.max(x1, x2, cx), Math.max(y1, y2, cy)] };
    }
    function drawArc(k) {
      const a = arcFor(k);
      arcs.innerHTML = `<path class="arc-base" d="${a.d}"/><path class="arc" id="arcP" d="${a.d}"/>`;
      arcPath = $('#arcP', arcs); plane.style.display = '';
      const L = arcPath.getTotalLength(), t0 = performance.now();
      cancelAnimationFrame(planeRaf);
      const place = k2 => {
        const e = k2 < .5 ? 2 * k2 * k2 : 1 - Math.pow(-2 * k2 + 2, 2) / 2;
        const p = arcPath.getPointAtLength(e * L), p2 = arcPath.getPointAtLength(Math.min(L, e * L + .5)), p0 = arcPath.getPointAtLength(Math.max(0, e * L - .5));
        const ang = Math.atan2(p2.y - p0.y, p2.x - p0.x) * 180 / Math.PI, sc = (vb[2] / W.w) * 1.15 * (1 + Math.sin(e * Math.PI) * .3);
        plane.setAttribute('transform', `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${ang.toFixed(1)}) scale(${sc.toFixed(3)})`);
        plane.style.opacity = k2 < .05 ? k2 / .05 : k2 > .95 ? (1 - k2) / .05 : 1;
      };
      const fly = t => { place(((t - t0) % 5200) / 5200); if (arcPath.isConnected) planeRaf = requestAnimationFrame(fly); };
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) planeRaf = requestAnimationFrame(fly); else place(.6);
      return a;
    }
    function select(k) {
      $$('.c.d, .pin', svg).forEach(p => p.classList.toggle('sel', p.dataset.k === k));
      const a = drawArc(k);
      const pad = 40, w0 = a.box[2] - a.box[0] + pad * 2, h0 = a.box[3] - a.box[1] + pad * 2;
      let w = Math.max(w0, h0 * W.w / W.h, W.w * .28); const h = w * W.h / W.w;
      animateVB(clampVB([(a.box[0] + a.box[2]) / 2 - w / 2, (a.box[1] + a.box[3]) / 2 - h / 2, w, h]));
    }
    function place(e) { const b = shell.getBoundingClientRect(); tip.style.left = Math.min(b.width - 100, Math.max(100, e.clientX - b.left)) + 'px'; tip.style.top = Math.max(80, e.clientY - b.top) + 'px'; tip.style.opacity = 1; }
    function showTip(el, e) {
      const k = el.dataset.k, id = el.dataset.id || (k && D[k].iso);
      const seen = id && visited.has(id) ? `<span class="vtag">Déjà visité</span>` : '';
      if (k && !mark) {
        const d = D[k], q = fit(k);
        tip.innerHTML = `<b>${esc(d.name)}</b>${seen}${esc(d.city)} · ${esc(d.flight.dur)}<br><span class="p">${money(q.perPerson)}</span> / pers. · ${state.days} j · ${state.pax} pers.`;
        $$(`[data-k="${k}"]`, svg).forEach(p => p.classList.add('hover'));
      } else {
        tip.innerHTML = `<b>${esc(W.names[id] || id)}</b>${seen}${mark ? (visited.has(id) ? 'Cliquer pour retirer' : 'Cliquer pour marquer comme visité') : ''}`;
        el.classList.add('hover');
      }
      place(e);
    }
    function hideTip() { tip.style.opacity = 0; $$('.hover', svg).forEach(p => p.classList.remove('hover')); }
    let drag = null, moved = false;
    svg.addEventListener('pointermove', e => {
      if (drag) {
        const s = vb[2] / svg.getBoundingClientRect().width, dx = (e.clientX - drag.x) * s, dy = (e.clientY - drag.y) * s;
        if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 4) moved = true;
        setVB(clampVB([drag.vb[0] - dx, drag.vb[1] - dy, vb[2], vb[3]])); return;
      }
      hideTip();
      const t = e.target.closest('[data-k],[data-id]'); if (t) showTip(t, e);
    });
    svg.addEventListener('pointerleave', hideTip);
    svg.addEventListener('pointerdown', e => { if (vb[2] < W.w * .98) { drag = { x: e.clientX, y: e.clientY, vb: vb.slice() }; moved = false; } });
    addEventListener('pointerup', () => { drag = null; });
    svg.addEventListener('click', e => {
      if (moved) { moved = false; return; }
      if (mark) { const c = e.target.closest('[data-id]') || (e.target.closest('.pin[data-k]') && $(`.c[data-k="${e.target.closest('.pin').dataset.k}"]`, svg)); if (c) toggleVisited(c.dataset.id); hideTip(); return; }
      const t = e.target.closest('[data-k]');
      if (t) { setDest(t.dataset.k); hideTip(); toast(`${D[t.dataset.k].name} sélectionné · ${D[t.dataset.k].flight.route}`); }
    });
    $$('[data-z]', shell).forEach(b => b.addEventListener('click', () => {
      const z = b.dataset.z; if (z === 'reset') return animateVB(full, 700);
      const f = z === 'in' ? .66 : 1 / .66, w = vb[2] * f, h = w * W.h / W.w, cx = vb[0] + vb[2] / 2, cy = vb[1] + vb[3] / 2;
      animateVB(clampVB([cx - w / 2, cy - h / 2, w, h]), 400);
    }));
    $$('.chips [data-k]', root).forEach(c => c.addEventListener('click', () => { setDest(c.dataset.k); }));

    /* Pays visités */
    const byName = {}; Object.entries(W.names).forEach(([id, n]) => byName[normTxt(n)] = id);
    function drawVisited() {
      $$('#lands .c', svg).forEach(p => p.classList.toggle('v', visited.has(p.dataset.id)));
      const n = visited.size, pct = (n / 195 * 100).toFixed(1).replace('.', ',');
      $('#visCount').textContent = n ? ` · ${plural(n, 'pays', 'pays')} · ${pct} % des 195 pays du monde` : ' · aucun pour l\'instant';
      $('#visChips').innerHTML = [...visited].sort((a, b) => (W.names[a] || a).localeCompare(W.names[b] || b, 'fr')).map(id => `<span class="chip vchip">${esc(W.names[id] || id)}<button type="button" data-unvisit="${esc(id)}" aria-label="Retirer ${esc(W.names[id] || id)}">×</button></span>`).join('') || '<span style="color:var(--slate);font-size:13.5px">Ajoute les pays où tu es déjà allé : ils s\'afficheront en vert sur la carte.</span>';
      $$('[data-unvisit]').forEach(b => b.addEventListener('click', () => toggleVisited(b.dataset.unvisit)));
    }
    function toggleVisited(id) {
      if (!id) return;
      const was = visited.has(id); was ? visited.delete(id) : visited.add(id); saveVisited(); drawVisited();
      const p = $(`#lands [data-id="${CSS.escape(id)}"]`, svg);
      if (p && !was) { p.classList.remove('pop'); void p.getBBox(); p.classList.add('pop'); }
      toast(was ? `${W.names[id]} retiré des pays visités` : `${W.names[id]} ajouté aux pays visités`);
    }
    $('#visForm', root).addEventListener('submit', e => {
      e.preventDefault();
      const inp = $('#visIn'), q = normTxt(inp.value), err = $('#visErr'); err.textContent = '';
      if (!q) return;
      let id = byName[q];
      if (!id) { const c = Object.keys(byName).filter(n => n.startsWith(q)); if (c.length === 1) id = byName[c[0]]; else if (c.length > 1) { err.textContent = `Plusieurs pays correspondent : ${c.slice(0, 5).map(n => W.names[byName[n]]).join(', ')}…`; return; } }
      if (!id) { const c = Object.keys(byName).filter(n => n.includes(q)); if (c.length === 1) id = byName[c[0]]; }
      if (!id) { err.textContent = `Pays introuvable : « ${inp.value} ». Choisis-le dans la liste proposée.`; return; }
      if (!visited.has(id)) toggleVisited(id); else toast(`${W.names[id]} est déjà dans ta liste`);
      inp.value = '';
    });
    $('#visMode', root).addEventListener('click', e => { mark = !mark; e.currentTarget.setAttribute('aria-pressed', mark); shell.classList.toggle('mark', mark); toast(mark ? 'Clique sur les pays visités pour les colorer en vert' : 'Mode sélection de destination'); });
    drawVisited();
    window.__mapApi = { select, refresh() { } };
    if (state.dest) select(state.dest);
  }

  /* Panneau des départs à volets */
  function flapBoard(el) {
    const rows = $$('.flap-row', el); let idx = 0;
    const put = (span, text, len) => {
      text = text.toUpperCase().padEnd(len).slice(0, len);
      const cells = $$('i', span);
      text.split('').forEach((ch, i) => { const c = cells[i]; if (c.textContent !== ch) { setTimeout(() => { c.textContent = ch; c.classList.remove('flip'); void c.offsetWidth; c.classList.add('flip'); }, i * 45 + Math.random() * 120); } });
    };
    const tick = () => {
      if (!el.isConnected) return clearInterval(h);
      rows.forEach((r, i) => {
        const k = ORDER[(idx + i) % ORDER.length], d = D[k];
        put($('.f1', r), d.city.normalize('NFD').replace(/\p{Diacritic}/gu, ''), 11);
        put($('.f2', r), d.code, 3);
        put($('.f3', r), String(quote(k, { days: 7, pax: 2 }).perPerson) + 'E', 6);
      });
      idx = (idx + 1) % ORDER.length;
    };
    const h = setInterval(tick, 3800); tick();
  }

  /* ───────── Pages ───────── */
  function pageHome() {
    const m = parseISO(state.date).getMonth();
    const top = ORDER.slice().sort((a, b) => seasonScore(b, m) - seasonScore(a, m) || quote(a, { days: 7, pax: 2 }).perPerson - quote(b, { days: 7, pax: 2 }).perPerson);
    const cell = n => `<span class="flap">${'<i> </i>'.repeat(n)}</span>`;
    app.innerHTML = `<div class="view">
      <section class="sky" id="sky"><canvas class="sky-back" aria-hidden="true"></canvas>${AIRLINER}<canvas class="sky-front" aria-hidden="true"></canvas>
        <div class="board flap-board" aria-label="Idées de départ depuis Nice"><div class="hd"><span>Départs de Nice</span><span>Vol</span><span>7 j dès</span></div>
          ${[0, 1, 2, 3].map(() => `<div class="flap-row"><span class="f1">${cell(11)}</span><span class="f2">${cell(3)}</span><span class="f3">${cell(6)}</span></div>`).join('')}
        </div>
      </section>
      <div class="wrap booking-dock">${bookingHTML()}</div>
      <section class="sec wrap" aria-labelledby="mapH">
        <div class="sec-hd"><div><div class="kicker">Carte des destinations</div><h2 class="h2" id="mapH">Choisissez votre prochain pays</h2><p class="lead">Survolez un pays pour voir le prix estimé avec vos dates et le nombre de voyageurs, puis cliquez pour l'ajouter à votre recherche.</p></div></div>
        ${mapHTML()}
      </section>
      <section class="sec wrap" style="padding-top:0">
        <div class="sec-hd"><div><div class="kicker">En ${MOIS_L[m]}</div><h2 class="h2">Les meilleures envies du moment</h2></div><button class="btn btn-ghost btn-sm" data-go="destinations">Toutes les destinations</button></div>
        <div class="rail">${top.map(k => destCard(k)).join('')}</div>
      </section>
      <section class="wrap"><div class="promo rv">${photo('no', 0, false, 'kb')}<div class="in"><div class="kicker" style="color:#9ff0c9">Septembre → mars</div><h2 class="h2">Les aurores boréales depuis Tromsø ou Rovaniemi</h2><p>Une nuit de chasse en minibus, feu de camp et vêtements polaires fournis. Programme prévu dans les deux itinéraires.</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><button class="btn btn-red btn-sm" data-pick="no">Partir en Norvège</button><button class="btn btn-sm" style="background:#fff;color:#061237" data-pick="fi">Partir en Finlande</button></div></div></div></section>
      <section class="sec wrap"><div class="perks">
        <div class="perk rv">${I.tag}<h3>Prix détaillés</h3><p>Vol, hôtel, repas, activités, transports et souvenirs, par personne et pour le groupe.</p></div>
        <div class="perk rv">${I.walk}<h3>Programmes à pied</h3><p>Chaque étape indique le trajet : minutes de marche, ligne de métro ou de bus.</p></div>
        <div class="perk rv">${I.leaf}<h3>Restos locaux, plats pour toi</h3><p>Des adresses typiques pour tout le groupe, avec à chaque fois les spécialités sans viande (poisson, fromage, légumes) à commander.</p></div>
        <div class="perk rv">${I.route}<h3>Trajets vérifiables</h3><p>Un clic sur un trajet ouvre l'itinéraire dans Google Maps pour le vérifier.</p></div>
      </div></section>
    </div>`;
    Scene.sky($('#sky'));
    flapBoard($('.flap-board'));
    bindBooking(app); bindMap(app); bindCards(app);
    $$('[data-pick]', app).forEach(b => b.addEventListener('click', () => setDest(b.dataset.pick, true)));
    after(app);
  }

  function pageDests() {
    app.innerHTML = `<div class="view"><section class="sec wrap">
      <div class="sec-hd"><div><div class="kicker">13 pays au départ de Nice</div><h2 class="h2">Destinations</h2></div>
      <div class="seg" role="group" aria-label="Filtrer par région">${['Toutes', 'Europe', 'Asie', 'Afrique', 'Amériques'].map((r, i) => `<button data-reg="${r}" aria-pressed="${i === 0}">${r}</button>`).join('')}</div></div>
      <div class="chips" style="margin:-8px 0 22px"><span style="color:var(--slate);font-size:13px;align-self:center">Trier :</span><button class="chip" data-sort="season" aria-pressed="true">Saison de votre départ</button><button class="chip" data-sort="price" aria-pressed="false">Prix croissant</button><button class="chip" data-sort="name" aria-pressed="false">A → Z</button></div>
      <div class="grid-dest" id="gd"></div></section></div>`;
    let reg = 'Toutes', sort = 'season';
    const draw = () => {
      const m = parseISO(state.date).getMonth();
      let ks = ORDER.filter(k => reg === 'Toutes' || D[k].region === reg);
      if (sort === 'price') ks.sort((a, b) => quote(a, { days: 7, pax: 2 }).perPerson - quote(b, { days: 7, pax: 2 }).perPerson);
      else if (sort === 'name') ks.sort((a, b) => D[a].name.localeCompare(D[b].name, 'fr'));
      else ks.sort((a, b) => seasonScore(b, m) - seasonScore(a, m));
      $('#gd').innerHTML = ks.map(k => destCard(k)).join('');
      bindCards(app); after($('#gd'));
    };
    $$('[data-reg]', app).forEach(b => b.addEventListener('click', () => { reg = b.dataset.reg; $$('[data-reg]', app).forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); }));
    $$('[data-sort]', app).forEach(b => b.addEventListener('click', () => { sort = b.dataset.sort; $$('[data-sort]', app).forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); }));
    draw();
  }

  function pageDest(k) {
    const d = D[k]; if (!d) return go('destinations');
    const m = parseISO(state.date).getMonth();
    const fs = FLIGHT_SEASON[d.flight.season];
    const months = MOIS.map((mo, i) => { const sc = seasonScore(k, i), price = d.flight.base * fs[i] + d.hotel.night * d.hotel.season[i] * 3; return { mo, sc, price, i }; });
    const max = Math.max(...months.map(x => x.price));
    const hl = d.stages.flatMap(s => s.days.slice(0, 2).map(x => ({ t: x.t, city: s.city })));
    app.innerHTML = `<div class="view">
      <section class="dhero">${photo(k, 0, false, 'kb')}<div class="wrap"><span class="kicker" style="color:#fff">${esc(d.region)} · ${esc(d.flight.route)}</span><div class="nm">${esc(d.name)}</div><p>${esc(d.tag)}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><button class="btn btn-red" id="dGo">${I.plane}Composer ce voyage</button><button class="btn" style="background:rgba(255,255,255,.92);color:#061237" data-go="destinations">Autres destinations</button></div></div></section>
      <section class="sec wrap"><div class="res-grid">
        <div>
          <div class="gallery rv">${(PH[k] || []).map((p, i) => `<figure>${photo(k, i, i > 0)}<figcaption>${esc(p.t)}</figcaption></figure>`).join('')}</div>
          <div class="panel rv"><div class="panel-hd"><b class="h3">Quand partir ?</b><span style="font-size:13px;color:var(--slate)">Hauteur = prix relatif (vol + 3 nuits) · couleur = météo et saison</span></div>
            <div class="months">${months.map(x => `<div class="m ${x.sc === 2 ? 'good' : x.sc === 1 ? 'mid' : ''} ${x.i === m ? 'cur' : ''}"><span style="height:${Math.round(x.price / max * 100)}%;animation-delay:${x.i * 50}ms" title="${x.mo}"></span>${x.mo}</div>`).join('')}</div>
            <div class="map-legend" style="position:static;margin-top:14px;background:none;padding:0"><span><i style="background:var(--ok)"></i>Idéal</span><span><i style="background:var(--gold)"></i>Bien</span><span><i style="background:var(--land)"></i>Hors saison</span></div>
          </div>
          <div class="panel rv"><div class="panel-hd"><b class="h3">Au programme</b><span style="color:var(--slate);font-size:13px">${d.stages.map(s => esc(s.city)).join(' → ')}</span></div>
            <div class="flavors">${hl.map(h => `<div class="flavor"><b>${esc(h.t)}</b><span>${esc(h.city)}</span></div>`).join('')}</div></div>
          <div class="panel rv"><div class="panel-hd"><b class="h3">À table : tes plats sans viande</b></div>${flavorsHTML(d)}<p class="lead" style="margin-top:14px">${esc(d.vegTip)}</p></div>
        </div>
        <aside class="aside-sticky">
          <div class="facts">${[['Vol', `${d.flight.route}<br>${d.flight.air} · ${d.flight.dur}`], ['Formalités', d.visa], ['Monnaie', d.money], ['Décalage', d.tz], ['Prises', d.plug], ['Langue', d.lang]].map(f => `<div class="fact rv"><small>${f[0]}</small>${f[1]}</div>`).join('')}</div>
        </aside>
      </div></section></div>`;
    $('#dGo').addEventListener('click', () => { state.dest = k; go(''); setTimeout(() => { setDest(k, true); }, 80); });
    after(app);
  }

  /* ───────── Défilement figé pendant les écrans par-dessus la page ───────── */
  let lockN = 0, lockY = 0;
  function lockScroll() {
    if (lockN++ > 0) return;
    lockY = scrollY;
    document.documentElement.classList.add('locked');
    document.body.style.top = -lockY + 'px';
  }
  function unlockScroll(keep) {
    if (lockN === 0 || --lockN > 0) return;
    document.documentElement.classList.remove('locked');
    document.body.style.top = '';
    if (keep !== false) scrollTo({ top: lockY, behavior: 'instant' });
  }
  const noTouchScroll = el => el.addEventListener('touchmove', e => { if (!e.target.closest('.sheet, .lightbox figure')) e.preventDefault(); }, { passive: false });

  function search() {
    if (!state.dest) { const e = $('#bkErr'); if (e) e.textContent = 'Choisissez une destination sur la carte ou dans la liste.'; const f = $('#pickDest'); if (f) { f.classList.add('active'); f.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300, iterations: 2 }); } return; }
    const d = D[state.dest];
    const ov = document.createElement('div'); ov.className = 'searching'; ov.setAttribute('role', 'status');
    ov.innerHTML = `<div class="box"><div class="route"><span>NCE</span>${I.plane.replace('<svg', '<svg width="30" height="30" style="transform:rotate(90deg)"')}<span>${esc(d.code)}</span></div>
      <div class="track"><div class="ln"></div><div class="done"></div><button type="button" class="trk-plane" aria-label="Avion : toucher pour jouer pendant le chargement">${I.plane.replace('<svg', '<svg style="transform:rotate(90deg)"')}</button></div>
      <div class="msg"></div><p class="egg">Touche l'écran pour jouer pendant le chargement</p></div>`;
    document.body.appendChild(ov); lockScroll(); noTouchScroll(ov);
    const msgs = [`Comparaison des vols <b>Nice → ${esc(d.city)}</b>`, `Recherche d'hôtels <b>${esc(roomText(state.pax))}</b>`, `Calcul du coût de la vie en <b>${MOIS_L[parseISO(state.date).getMonth()]}</b>`, `Construction du programme <b>${state.days} jours</b> à pied`];
    const steps = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : msgs.length;
    let i = 0, playing = false, ready = false;
    const finish = () => { ov.style.transition = 'opacity .3s'; ov.style.opacity = 0; setTimeout(() => ov.remove(), 300); unlockScroll(false); state.last = { k: state.dest }; go('resultats'); };
    const next = () => {
      if (i >= steps) {
        ready = true;
        if (playing) { $('.msg', ov).innerHTML = 'Résultats prêts : ils s\'ouvriront à ton prochain <b>atterrissage forcé</b>'; return; }
        return finish();
      }
      const k = (i + 1) / steps * 100, dn = $('.done', ov), pl = $('.trk-plane', ov); $('.msg', ov).innerHTML = msgs[i]; if (dn) dn.style.width = k + '%'; if (pl) pl.style.left = `calc(${k}% - ${k / 100 * 40}px)`;
      i++; setTimeout(next, 620);
    };
    /* Un toucher n'importe où sur l'écran lance le jeu, puis fait sauter l'avion */
    let game = null, leaving = false;
    const crashed = () => { if (ready && !leaving) { leaving = true; setTimeout(finish, 1300); } };
    const tap = e => {
      e.preventDefault();
      if (leaving) return;
      if (game) return game.jump();
      playing = true;
      const trk = $('.track', ov), tb = trk.getBoundingClientRect(), pb0 = $('.trk-plane', ov).getBoundingClientRect();
      const startX = pb0.left + pb0.width / 2 - tb.left;
      trk.replaceWith(Object.assign(document.createElement('div'), { className: 'game', innerHTML: '<canvas></canvas>' }));
      $('.egg', ov).textContent = 'Touche l\'écran ou Espace pour sauter';
      game = runnerGame($('.game', ov), () => ov.isConnected, crashed, startX);
      game.jump();
    };
    ov.addEventListener('pointerdown', tap);
    const key = e => { if (!ov.isConnected) return removeEventListener('keydown', key); if (e.code === 'Escape' && ready && !leaving) { leaving = true; finish(); return; } if (!game && (e.code === 'Space' || e.code === 'ArrowUp')) tap(e); };
    addEventListener('keydown', key);
    next();
  }

  /* ───────── Mini-jeu façon « dino », dessiné dans le style exact de l'écran de chargement ───────── */
  function runnerGame(box, alive, onOver, startX) {
    const c = $('canvas', box), x = c.getContext('2d');
    const PLANE = new Path2D('M21.5 15.5v-2l-8-5V3.2a1.5 1.5 0 0 0-3 0V8.5l-8 5v2l8-2.5V18l-2.5 1.8V21l4-1 4 1v-1.2L13.5 18v-5z');
    let W = 0, H = 0;
    const size = () => { const dpr = Math.min(devicePixelRatio || 1, 2), b = c.getBoundingClientRect(); W = b.width; H = b.height; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); addEventListener('resize', size);
    const GROUND = () => H - 27;
    const X0 = startX || 34; let PX = X0; const t0 = performance.now();
    const targetX = () => Math.min(140, Math.max(60, W * .26));
    const glide = now => { const k = Math.min(1, (now - t0) / 800), e = 1 - Math.pow(1 - k, 3); PX = X0 + (targetX() - X0) * e; return k >= 1; };
    let hi = 0; try { hi = +localStorage.getItem('karrair.hi') || 0; } catch (e) { }
    let st, last;
    const reset = () => { st = { mode: 'ready', y: 0, vy: 0, speed: .34, dist: 0, obs: [], gap: 380, t: 0, flash: 0 }; };
    reset();
    function jump() {
      if (st.mode === 'ready') st.mode = 'run';
      if (st.mode === 'over') { if (st.t > 450) { reset(); st.mode = 'run'; } return; }
      if (st.y === 0) st.vy = .64;
    }
    const key = e => { if (!alive()) return removeEventListener('keydown', key); if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); } };
    addEventListener('keydown', key);
    function spawn() {
      const r = Math.random();
      if (r < .5) st.obs.push({ k: 'tower', x: W + 20, w: 12, h: 18 + Math.random() * 12 });
      else if (r < .78) st.obs.push({ k: 'cones', x: W + 20, w: 20 + Math.random() * 12, h: 11 });
      else st.obs.push({ k: 'bird', x: W + 20, w: 18, h: 10, y: 26 + Math.random() * 10, f: 0 });
      st.gap = 260 + Math.random() * 360 + st.speed * 260;
    }
    function frame(now) {
      if (!alive()) { removeEventListener('resize', size); return; }
      const dt = Math.min(40, now - (last || now)); last = now; st.t += dt;
      const g = GROUND();
      if (st.mode === 'run') {
        st.speed = Math.min(.95, st.speed + dt * .000012);
        st.dist += st.speed * dt;
        st.vy -= .0032 * dt; st.y = Math.max(0, st.y + st.vy * dt); if (st.y === 0) st.vy = 0;
        if (glide(now)) { st.gap -= st.speed * dt; if (st.gap <= 0) spawn(); }
        st.obs.forEach(o => { o.x -= st.speed * dt; if (o.k === 'bird') o.f += dt; });
        st.obs = st.obs.filter(o => o.x + o.w > -10);
        const pb = { l: PX - 14, r: PX + 18, t: g - st.y - 12, b: g - st.y + 10 };
        for (const o of st.obs) {
          const ob = o.k === 'bird' ? { l: o.x + 3, r: o.x + o.w - 3, t: g - o.y - o.h, b: g - o.y } : { l: o.x + 2, r: o.x + o.w - 2, t: g - o.h + 2, b: g };
          if (pb.l < ob.r && pb.r > ob.l && pb.t < ob.b && pb.b > ob.t) {
            st.mode = 'over'; st.t = 0; st.flash = 1;
            const sc = Math.floor(st.dist / 10); if (sc > hi) { hi = sc; try { localStorage.setItem('karrair.hi', hi); } catch (e) { } }
            if (onOver) onOver();
          }
        }
      }
      x.clearRect(0, 0, W, H);
      /* piste : la même ligne pointillée et la même trace rouge que la barre de chargement */
      x.setLineDash([6, 6]); x.lineDashOffset = st.dist % 12; x.strokeStyle = 'rgba(255,255,255,.25)'; x.lineWidth = 2;
      x.beginPath(); x.moveTo(0, g); x.lineTo(W, g); x.stroke(); x.setLineDash([]);
      x.fillStyle = '#ff4d63'; x.fillRect(0, g - 1, PX, 2);
      st.obs.forEach(o => {
        if (o.k === 'tower') { x.fillStyle = 'rgba(255,255,255,.85)'; x.fillRect(o.x + 5, g - o.h + 9, 4, o.h - 9); x.fillRect(o.x, g - o.h, o.w, 8); x.fillStyle = '#ff4d63'; x.fillRect(o.x + 5, g - o.h - 4, 4, 4); }
        else if (o.k === 'cones') { x.fillStyle = '#ff4d63'; for (let cx = o.x; cx < o.x + o.w - 6; cx += 10) { x.beginPath(); x.moveTo(cx, g); x.lineTo(cx + 4.5, g - o.h); x.lineTo(cx + 9, g); x.fill(); } }
        else { x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 2; const fy = g - o.y - o.h / 2, wv = Math.sin(o.f / 90) * 5; x.beginPath(); x.moveTo(o.x, fy - wv); x.quadraticCurveTo(o.x + o.w / 4, fy - 5, o.x + o.w / 2, fy); x.quadraticCurveTo(o.x + o.w * .75, fy - 5, o.x + o.w, fy - wv); x.stroke(); }
      });
      /* l'avion : la même silhouette blanche de 40 px que sur la barre de chargement */
      const tilt = st.y > 0 ? Math.max(-.4, -st.vy * .5) : 0;
      x.save(); x.translate(PX, g - st.y); x.rotate(Math.PI / 2 + tilt); x.scale(40 / 24, 40 / 24); x.translate(-12, -12); x.fillStyle = '#fff'; x.fill(PLANE); x.restore();
      x.fillStyle = '#8fa2d6'; x.font = '600 12px ' + getComputedStyle(document.body).fontFamily; x.textAlign = 'right';
      x.fillText(`Record ${hi}   ·   ${Math.floor(st.dist / 10)}`, W - 4, g + 21);
      x.textAlign = 'center'; x.fillStyle = '#b8c4e8'; x.font = '15px ' + getComputedStyle(document.body).fontFamily;
      if (st.mode === 'over') x.fillText('Atterrissage forcé ! Touche pour repartir', W / 2, g - 34);
      if (st.flash > 0) { x.globalAlpha = st.flash * .5; x.fillStyle = '#ff4d63'; x.fillRect(0, g - 1, W, 2); x.globalAlpha = 1; st.flash = Math.max(0, st.flash - dt / 500); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return { jump };
  }

  function mapsLink(a, b, mode, city) {
    const gen = /^(Hôtel|Riad|Lodge|Retour|Repos|Vol |Départ|Point de RDV|Site d|Location|Navette|Chauffeur|Pique|Déjeuner|Dîner|Guesthouse|Lac gelé|Marche|Une heure|Trek|Excursion|Shinkansen|Grand taxi|Montée|Redescente|Canaux|Hot pot|Buffet|Embarquement|Kayak|Barque|Café ouïghour|Xiaomian|Cours|Coopérative|Idée|Flânerie|Escale|Vol|Taxi|Kyoto →|Bus |Train |Gare de Wulong|Musanze –|RDV)/i;
    if (!mode || !a || !b || gen.test(a) || gen.test(b)) return '';
    const c = ', ' + city;
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(a.replace(/ \(.*?\)/g, '') + c)}&destination=${encodeURIComponent(b.replace(/ \(.*?\)/g, '') + c)}&travelmode=${mode}`;
  }
  /* Galerie des lieux du jour (photos libres Wikipédia / Wikimedia Commons) */
  const LP = window.PLACE_PH || {};
  function dayGallery(day) {
    const seen = new Set(), ph = [];
    day.s.forEach(s => { const p = LP[s[1]]; if (p && !seen.has(p.f)) { seen.add(p.f); ph.push([s[1], p]); } });
    if (!ph.length) return '';
    return `<div class="dgal" aria-label="Photos des lieux du jour">${ph.map(([n, p]) => `<button type="button" class="dg" data-lb="${esc(p.f)}" data-cap="${esc(n)}" data-cr="${esc(p.a + ' · ' + p.l)}"><img src="${esc(p.f)}" alt="${esc(n)}" loading="lazy" decoding="async" onload="this.classList.add('in')"><span>${esc(n.replace(/ \(.*?\)/g, ''))}</span></button>`).join('')}</div>`;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lb]'); if (!b) return;
    const bg = document.createElement('div'); bg.className = 'lightbox';
    bg.innerHTML = `<figure><img src="${esc(b.dataset.lb)}" alt="${esc(b.dataset.cap)}"><figcaption><b>${esc(b.dataset.cap)}</b><span>Photo : ${esc(b.dataset.cr)}</span></figcaption></figure><button type="button" class="lb-x" aria-label="Fermer">×</button>`;
    document.body.appendChild(bg); lockScroll(); noTouchScroll(bg);
    const close = () => { if (bg.classList.contains('out')) return; bg.classList.add('out'); unlockScroll(); setTimeout(() => bg.remove(), 250); document.removeEventListener('keydown', onKey); };
    const onKey = ev => { if (ev.key === 'Escape') close(); };
    bg.addEventListener('click', close); document.addEventListener('keydown', onKey);
  });
  function dayHTML(day, i, k, open) {
    const d = D[k], city = (day.city || d.city).replace(/ \(.*\)/, '') + ', ' + d.name;
    const items = day.s.map((s, j) => {
      const mv = parseMove(s[3]);
      let moveHTML = '';
      if (mv && j > 0) {
        const href = mapsLink(day.s[j - 1][1], s[1], mv.mode, city);
        moveHTML = href ? `<a class="move ${mv.k}" href="${href}" target="_blank" rel="noopener">${I[mv.icon]}${esc(mv.label)}${I.ext}</a>` : `<span class="move ${mv.k}">${I[mv.icon]}${esc(mv.label)}</span>`;
      } else if (mv && j === 0) moveHTML = `<span class="move ${mv.k}">${I[mv.icon]}${esc(mv.label)} depuis l'hôtel</span>`;
      return `<li>${moveHTML}<div class="stop">${s[0] ? `<span class="tm">${esc(s[0])}</span>` : ''}<div class="pl">${esc(s[1])}${s[4] === 'M' ? ' <span class="ftag odd">Musée insolite</span>' : ''}</div>${s[2] ? `<div class="ds">${eurify(s[2])}</div>` : ''}</div></li>`;
    }).join('');
    const walk = day.s.reduce((a, s) => { const m = parseMove(s[3]); return a + (m && m.k === 'w' ? m.min : 0); }, 0);
    const tag = day.kind === 'travel' ? 'Journée de voyage' : day.kind === 'arr' ? 'Arrivée' : day.kind === 'dep' ? 'Départ' : day.free ? 'Journée libre' : '';
    const v = d.veg[i % d.veg.length];
    return `<details class="day rv" ${open ? 'open' : ''}>
      <summary><span class="dn"><small>Jour</small><b>${i + 1}</b></span><span class="dt"><b>${esc(day.t)}</b><span>${fmtDate(day.date)} · ${esc((day.city || '').replace(/ \(.*\)/, ''))}${tag ? ' · ' + tag : ''}${walk ? ` · ≈ ${dur(walk)} de marche` : ''}</span></span><span style="display:flex;gap:12px;align-items:center"><span class="cost-tag num">${day.c ? money(day.c) + '<br>activités' : ''}</span><span class="chev">${I.chev}</span></span></summary>
      <ol class="tl">${items}</ol>
      ${dayGallery(day)}
      ${!day.kind ? `<div class="veg-tip">${I.leaf.replace('<svg', '<svg width="15" height="15" style="vertical-align:-2px;color:var(--ok)"')} <b>Pour toi aujourd'hui :</b> ${esc(v[0])} ${ftag(v[2])} — ${esc(v[1])}</div>` : ''}
      ${day.gorilla ? `<div class="veg-tip" style="background:color-mix(in srgb,var(--gold) 14%,var(--paper))">${eurify("Permis 1 500 USD/pers.")} réservé à l'avance sur visitrwanda.com · prévoir chaussures de rando, gants (orties), imperméable, pourboires pisteurs.</div>` : ''}
    </details>`;
  }

  function renderResults() {
    const k = state.dest; if (!k) return go('');
    const d = D[k], q = fit(k), plan = q.plan, end = addDays(state.date, q.N - 1);
    const lo = quote(k, { L: LEVELS[3] }).perPerson, hi = quote(k, { L: LEVELS[0] }).perPerson;
    const alerts = warnings(k, q);
    let mode = 'pp';
    const ret = returnRoute(d, plan.retCode);
    const gf = `https://www.google.com/travel/flights?q=${encodeURIComponent(`Vols de NCE à ${d.flight.route.split(' → ').pop()} le ${state.date} retour le ${end} en économique ${state.pax} adultes`)}&hl=fr&curr=EUR`;
    const bk = `https://www.booking.com/searchresults.fr.html?ss=${encodeURIComponent(d.city + ', ' + d.name)}&checkin=${state.date}&checkout=${addDays(state.date, q.nights + (d.flight.overnight && !state.noFlight ? 1 : 0))}&group_adults=${state.pax}&no_rooms=${q.rooms.length}&group_children=0&nflt=${encodeURIComponent('class=' + Math.max(2, q.L.stars) + ';review_score=' + (q.L.stars >= 3 ? 80 : 70))}`;
    const roomsHTML = q.rooms.map(r => `<div class="room">${r.t === 'single' ? I.single : I.bed}<span><b>${r.n}</b><br><span style="color:var(--slate);font-size:12.5px">${r.t === 'single' ? '≈ 80 % du prix d\'une double' : 'Lit double ou twin'}</span></span></div>`).join('');
    app.innerHTML = `<div class="view">
      <section class="res-hero">${photo(k, 0, false, 'kb')}<div class="wrap">
        <div class="itin"><span>NCE</span>${I.plane.replace('<svg', '<svg style="transform:rotate(90deg)"')}<span>${esc(d.code)}</span><span style="font-size:.5em;font-weight:600;letter-spacing:0">${esc(d.city)} · ${esc(d.name)}</span></div>
        <div class="meta"><span>${fmtDate(state.date)} → ${fmtDate(end)}</span><span>${plural(q.N, 'jour')} · ${plural(q.nights, 'nuit')} à l'hôtel</span><span>${plural(state.pax, 'voyageur')}</span><span>${state.noFlight ? 'Sans vol' : 'Économique'}</span>
        <button class="btn btn-sm" style="background:#fff;color:#061237;padding:6px 14px" id="rEdit">${I.edit}Modifier</button></div>
      </div></section>
      <nav class="subnav" aria-label="Sections du résultat"><div class="wrap">${[['budget', 'Budget'], ['vol', 'Vol'], ['hotel', 'Hôtel'], ['programme', 'Programme'], ['saveurs', 'Saveurs'], ['pratique', 'Pratique']].map(s => `<a href="#" data-sec="r-${s[0]}">${s[1]}</a>`).join('')}</div></nav>
      <section class="sec wrap" style="padding-top:28px">
        ${alerts.length ? `<div class="alerts">${alerts.map((a, i) => `<div class="alert ${a.t} rv">${I[a.t === 'warn' ? 'warn' : a.t === 'good' ? 'check' : 'info']}<div><b>${eurify(a.h)}</b><br>${eurify(a.p)}${a.act ? `<div class="act"><button class="btn btn-ink btn-sm" data-alert="${i}">${esc(a.act.l)}</button></div>` : ''}</div></div>`).join('')}</div>` : ''}
        <div class="res-grid">
          <div>
            <div class="panel rv" id="r-vol"><div class="panel-hd"><b class="h3">Votre vol</b>${state.noFlight ? '' : `<a class="btn btn-ghost btn-sm" href="${gf}" target="_blank" rel="noopener">${I.search}Vérifier sur Google Flights</a>`}</div>
              ${state.noFlight ? `<p class="lead">Vous avez choisi un séjour sans vol. Le programme commence à votre arrivée à ${esc(d.city)}.</p>` : `
              <div class="pass">
                <div class="main">
                  ${legHTML(d.flight.route, 'Aller · ' + fmtDate(state.date))}
                  ${legHTML(ret, 'Retour · ' + fmtDate(end))}
                  <div class="legs-meta"><span>Compagnie : <b>${esc(d.flight.air)}</b></span><span>Durée : <b>${esc(d.flight.dur)}</b></span><span>Classe : <b>Économique</b></span><span>${d.flight.stops ? '1 escale' : 'Vol direct'}</span></div>
                  <div class="legs-meta">${esc(d.flight.alt)}</div>
                </div>
                <div class="perf" aria-hidden="true"></div>
                <div class="stub"><small>Par personne, A/R</small><span class="p num">${money(q.pp.flight)}</span><small>Fourchette constatée ${money(q.flightRange[0])} – ${money(q.flightRange[1])}</small><small>Réservé ${q.lead} jours avant le départ</small></div>
              </div>`}
            </div>
            <div class="panel rv" id="r-hotel"><div class="panel-hd"><b class="h3">Votre hébergement</b><a class="btn btn-ghost btn-sm" href="${bk}" target="_blank" rel="noopener">${I.bed}Voir les hôtels sur Booking</a></div>
              <div class="rooms">${roomsHTML}</div>
              <div class="kv"><div><small>Quartier conseillé</small><b>${esc(d.hotel.area)}</b></div><div><small>Prix / nuit (double)</small><b class="num">${money(q.night)}</b></div><div><small>Nuits</small><b>${q.nights}</b></div><div><small>Total hébergement</small><b class="num">${money(q.hotelTotal)}</b></div><div><small>Votre part</small><b class="num">${money(q.pp.hotel)}</b></div></div>
              <p style="font-size:13px;color:var(--slate);margin:12px 0 0">Formule ${esc(q.L.n)} : ${esc(q.L.h)}, petit-déjeuner non inclus. Étapes : ${plan.stops.map(esc).join(' → ')}.</p>
            </div>
            <div class="panel rv" id="r-programme"><div class="panel-hd"><b class="h3">Programme jour par jour</b><div style="display:flex;gap:8px"><button class="btn btn-ghost btn-sm" id="openAll">Tout déplier</button></div></div>
              <p style="margin:-6px 0 16px;color:var(--slate);font-size:13.5px">Cliquez sur un trajet pour l'ouvrir dans Google Maps. Les horaires sont indicatifs ; les durées de marche sont calculées entre les lieux cités.</p>
              <div class="days">${plan.days.map((day, i) => dayHTML(day, i, k, i < 2)).join('')}</div>
            </div>
            <div class="panel rv" id="r-saveurs"><div class="panel-hd"><b class="h3">À table : tes plats sans viande</b><span style="color:var(--slate);font-size:13px">Spécialités typiques, poisson ou végétarien</span></div>${flavorsHTML(d)}<p class="lead" style="margin-top:14px">${esc(d.vegTip)}</p></div>
            <div class="panel rv" id="r-pratique"><div class="panel-hd"><b class="h3">Infos pratiques</b><button class="btn btn-ghost btn-sm" data-go="infos">Tous les pays</button></div>
              <div class="kv">${[['Formalités', d.visa], ['Monnaie', d.money], ['Décalage', d.tz], ['Prises', d.plug], ['Langue', d.lang]].map(f => `<div><small>${f[0]}</small>${esc(f[1])}</div>`).join('')}</div></div>
          </div>
          <aside class="aside-sticky" id="r-budget" style="order:0">
            <div class="panel rv">
              <div class="panel-hd"><b class="h3">Budget estimé</b><div class="seg" role="group" aria-label="Affichage du budget"><button data-mode="pp" aria-pressed="true">Par pers.</button><button data-mode="grp" aria-pressed="false">Groupe</button></div></div>
              <div class="formula">
                <div class="lv" role="group" aria-label="Formule">${LEVELS.map(L => `<span class="${L.id === q.L.id ? 'on' : ''}">${L.n}</span>`).join('')}</div>
                <label for="rBud" class="bud-lbl"><span>Mon budget max / pers.</span><b id="rBudV">${state.budget ? money(state.budget) : 'Sans limite'}</b></label>
                <input type="range" id="rBud" min="${Math.floor(lo * .85 / 50) * 50}" max="${Math.ceil(hi * 1.25 / 50) * 50}" step="50" value="${state.budget || Math.ceil(hi * 1.25 / 50) * 50}">
                <div class="bud-ends"><span>${money(Math.floor(lo * .85 / 50) * 50)}</span><button type="button" class="linkish" id="rBudX">Sans limite</button><span>${money(Math.ceil(hi * 1.25 / 50) * 50)}</span></div>
                ${state.budget ? (q.fits ? `<p class="fit ok">${I.check} Formule <b>${esc(q.L.n)}</b> : ${esc(q.L.h.toLowerCase())}, ${esc(q.L.f.toLowerCase())}${plan.cuts.length ? `. ${plan.cuts.length} excursion${plan.cuts.length > 1 ? 's' : ''} payante${plan.cuts.length > 1 ? 's' : ''} remplacée${plan.cuts.length > 1 ? 's' : ''} par des journées à pied` : ''}.</p>` : `<p class="fit no">${I.warn} Budget trop serré : même en formule Petit budget, il faut compter ${money(q.perPerson)} par personne. Raccourcis le séjour ou change de dates.</p>`) : `<p class="fit">Formule <b>Classique</b> : ${esc(q.L.h.toLowerCase())}, ${esc(q.L.f.toLowerCase())}.</p>`}
              </div>
              <div class="total"><span class="big num"><span id="bigN" data-count="${q.perPerson}">${money(q.perPerson)}</span><small id="bigU">/ personne</small></span><span class="grp" id="grpL">${state.pax > 1 ? `Soit ${money(q.total)} pour ${state.pax} voyageurs` : 'Pour 1 voyageur'}</span></div>
              <svg class="donut" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="44" stroke="var(--cabin)"/>${CAT.map(c => `<circle data-arc="${c.k}" cx="60" cy="60" r="44" stroke="${c.c}" stroke-dasharray="0 277" transform="rotate(-90 60 60)"/>`).join('')}<text x="60" y="56" text-anchor="middle" style="font:700 11px var(--f-ui);fill:var(--slate)">${q.N} jours</text><text x="60" y="72" text-anchor="middle" style="font:700 13px var(--f-display);fill:var(--ink)">${esc(d.city)}</text></svg>
              <div class="cats" id="cats"></div>
            </div>
            <div class="panel rv" style="display:grid;gap:10px">
              <button class="btn btn-red" id="rSave">${I.heart}Enregistrer ce voyage</button>
              <button class="btn btn-ghost" id="rCopy">${I.copy}Copier le résumé</button>
              <button class="btn btn-ghost" id="rEdit2">${I.edit}Modifier la recherche</button>
            </div>
          </aside>
        </div>
      </section></div>`;
    const notes = { flight: state.noFlight ? 'Non inclus' : `${d.flight.air}, ${d.flight.stops ? '1 escale' : 'direct'}`, hotel: `${q.nights} nuits · ${roomText(state.pax)}`, food: `${q.L.f} · ${r5(d.food * q.L.food)} €/jour/pers.`, act: 'Entrées, excursions, guides' + (k === 'rw' ? ' · dont permis gorilles' : ''), local: 'Métro, bus, taxis, trains entre villes', shop: 'Souvenirs et petits achats' };
    const drawBudget = () => {
      const f = mode === 'pp' ? 1 : state.pax, tot = q.perPerson * f;
      $('#bigN').textContent = money(tot); $('#bigU').textContent = mode === 'pp' ? '/ personne' : `/ ${state.pax} pers.`;
      $('#grpL').textContent = mode === 'pp' ? (state.pax > 1 ? `Soit ${money(q.total)} pour ${state.pax} voyageurs` : 'Pour 1 voyageur') : `Soit ${money(q.perPerson)} par personne`;
      $('#cats').innerHTML = CAT.map(c => `<div class="cat"><i style="background:${c.c}"></i><span>${c.n}</span><b>${money(q.pp[c.k] * f)}</b><span class="bar"><span data-w="${q.perPerson ? q.pp[c.k] / q.perPerson * 100 : 0}" style="background:${c.c}"></span></span><span class="nt">${esc(notes[c.k])}</span></div>`).join('');
      requestAnimationFrame(() => requestAnimationFrame(() => $$('#cats [data-w]').forEach(b => b.style.width = b.dataset.w + '%')));
      let acc = 0; const C = 2 * Math.PI * 44;
      CAT.forEach(c => { const el = $(`[data-arc="${c.k}"]`), part = q.perPerson ? q.pp[c.k] / q.perPerson * C : 0; el.style.strokeDasharray = `${Math.max(0, part - 1.5)} ${C}`; el.style.strokeDashoffset = -acc; acc += part; });
    };
    const rb = $('#rBud'), rbMax = +rb.max;
    rb.addEventListener('input', () => { $('#rBudV').textContent = +rb.value >= rbMax ? 'Sans limite' : money(+rb.value); });
    rb.addEventListener('change', () => { state.budget = +rb.value >= rbMax ? null : +rb.value; savePrefs(); const y = scrollY; renderResults(); scrollTo({ top: y, behavior: 'instant' }); toast(state.budget ? `Programme recalculé pour ${money(state.budget)} par personne` : 'Budget sans limite'); });
    $('#rBudX').addEventListener('click', () => { state.budget = null; savePrefs(); const y = scrollY; renderResults(); scrollTo({ top: y, behavior: 'instant' }); });
    $$('[data-mode]').forEach(b => b.addEventListener('click', () => { $('#bigN').dataset.stop = 1; mode = b.dataset.mode; $$('[data-mode]').forEach(x => x.setAttribute('aria-pressed', x === b)); drawBudget(); }));
    $$('[data-alert]').forEach(b => b.addEventListener('click', () => alerts[+b.dataset.alert].act.f()));
    const edit = () => { go(''); setTimeout(() => $('#booking') && $('#booking').scrollIntoView({ behavior: 'smooth', block: 'center' }), 120); };
    $('#rEdit').addEventListener('click', edit); $('#rEdit2').addEventListener('click', edit);
    $('#openAll').addEventListener('click', e => { const ds = $$('.day'), all = ds.every(x => x.open); ds.forEach(x => x.open = !all); e.target.textContent = all ? 'Tout déplier' : 'Tout replier'; });
    $('#rSave').addEventListener('click', () => {
      tearTicket({ d, from: 'NCE', to: d.code, ret: plan.retCode, date: state.date, end, pax: state.pax, pp: q.perPerson, days: q.N }, () => {
        const trips = store.get('azurea.trips', []);
        trips.unshift({ id: Date.now(), k, date: state.date, days: state.days, pax: state.pax, noFlight: state.noFlight, pp: q.perPerson, total: q.total, at: today });
        store.set('azurea.trips', trips.slice(0, 30)); updateCount(); toast('Voyage enregistré dans « Mes voyages »');
      });
    });
    $('#rCopy').addEventListener('click', () => {
      const txt = [`${d.city} (${d.name}) · ${fmtLong(state.date)} → ${fmtLong(end)} · ${state.pax} pers.`, ...CAT.map(c => `${c.n} : ${money(q.pp[c.k])} / pers.`), `Total : ${money(q.perPerson)} / pers. (${money(q.total)} au total)`, '', ...plan.days.map((x, i) => `J${i + 1} ${fmtDate(x.date)} – ${x.t}\n` + x.s.map(s => { const mv = parseMove(s[3]); return `   ${mv ? '(' + mv.label + ') → ' : ''}${s[0] ? s[0] + ' ' : ''}${s[1]}`; }).join('\n'))].join('\n');
      const ok = () => toast('Résumé copié dans le presse-papiers');
      try { navigator.clipboard.writeText(txt).then(ok, () => fallbackCopy(txt)); } catch (e) { fallbackCopy(txt); }
    });
    $$('[data-sec]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = document.getElementById(a.dataset.sec); if (t) { const y = t.getBoundingClientRect().top + scrollY - 130; scrollTo({ top: y, behavior: 'smooth' }); } }));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('[data-sec]').forEach(a => a.classList.toggle('on', a.dataset.sec === e.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
      ['r-budget', 'r-vol', 'r-hotel', 'r-programme', 'r-saveurs', 'r-pratique'].forEach(id => io.observe(document.getElementById(id)));
    }
    if (matchMedia('(max-width: 980px)').matches) $('#r-budget').style.order = -1;
    after(app); drawBudget();
  }
  /* Billet qui se déchire le long des pointillés quand on enregistre le voyage */
  function tearTicket(t, onSaved) {
    const teeth = 22, zig = side => { /* bord dentelé : side=1 bord droit du billet, -1 bord gauche du talon */
      const pts = []; for (let i = 0; i <= teeth; i++) { const y = (i / teeth * 100).toFixed(2), x = side > 0 ? (i % 2 ? 7 : 0) : (i % 2 ? 0 : 7); pts.push(side > 0 ? `calc(100% - ${x}px) ${y}%` : `${x}px ${y}%`); } return pts; };
    const mainClip = `polygon(0 0, ${zig(1).join(', ')}, 0 100%)`;
    const stubClip = `polygon(${zig(-1).join(', ')}, 100% 100%, 100% 0)`;
    const serial = 'KR' + String(Date.now()).slice(-6);
    const bg = document.createElement('div'); bg.className = 'tk-bg';
    bg.innerHTML = `<div class="tk" role="button" tabindex="0" aria-label="Billet ${esc(t.from)} vers ${esc(t.to)} : cliquer pour le déchirer et enregistrer le voyage">
      <div class="tk-main" style="clip-path:${mainClip}">
        <div class="tk-top"><span class="tk-brand">KARRAIR VOYAGES</span><span>CARTE D'EMBARQUEMENT</span></div>
        <div class="tk-route"><div><b>${esc(t.from)}</b><small>Nice</small></div>${I.plane.replace('<svg', '<svg class="tk-pl"')}<div><b>${esc(t.to)}</b><small>${esc(t.d.city)}</small></div></div>
        <div class="tk-grid"><div><small>Aller</small>${fmtDate(t.date)}</div><div><small>Retour</small>${fmtDate(t.end)}</div><div><small>Voyageurs</small>${t.pax}</div><div><small>Classe</small>Éco</div><div><small>Durée</small>${t.days} j</div><div><small>Par pers.</small>${money(t.pp)}</div></div>
        <div class="tk-bar" aria-hidden="true">${Array.from({ length: 46 }, (_, i) => `<i style="width:${1 + (i * 7 % 4)}px"></i>`).join('')}</div>
      </div>
      <div class="tk-perf" aria-hidden="true"></div>
      <div class="tk-stub" style="clip-path:${stubClip}">
        <span class="tk-brand">TALON</span><b>${esc(t.from)} → ${esc(t.to)}</b><small>${fmtDate(t.date)}</small><small>N° ${serial}</small>
        <div class="tk-bar v" aria-hidden="true">${Array.from({ length: 22 }, (_, i) => `<i style="height:${1 + (i * 5 % 3)}px"></i>`).join('')}</div>
      </div>
    </div>
    <p class="tk-hint">Clique sur le billet pour le composter</p>`;
    document.body.appendChild(bg); lockScroll(); noTouchScroll(bg);
    const tk = $('.tk', bg); let done = false;
    const tear = () => {
      if (done) return; done = true;
      $('.tk-hint', bg).textContent = 'Bon voyage !';
      tk.classList.add('tug');
      setTimeout(() => { tk.classList.remove('tug'); void tk.offsetWidth; tk.classList.add('torn'); }, 400);
      setTimeout(() => {
        onSaved();
        const target = $('#tripCount') && $('#tripCount').parentElement, main = $('.tk-main', bg);
        if (target) { const a = main.getBoundingClientRect(), b = target.getBoundingClientRect(); main.style.setProperty('--fx', (b.left + b.width / 2 - (a.left + a.width / 2)) + 'px'); main.style.setProperty('--fy', (b.top + b.height / 2 - (a.top + a.height / 2)) + 'px'); }
        tk.classList.add('fly');
      }, 1750);
      setTimeout(() => { bg.remove(); unlockScroll(); }, 2800);
    };
    tk.addEventListener('click', e => { e.stopPropagation(); tear(); });
    tk.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tear(); } });
    bg.addEventListener('click', () => { if (!done) { bg.remove(); unlockScroll(); } });
    setTimeout(() => tk.focus(), 50);
  }
  function fallbackCopy(txt) {
    const ta = document.createElement('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;inset:10% 5%;height:80%;z-index:200;font:13px monospace;padding:14px;border-radius:12px';
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch (e) { }
    if (ok) { ta.remove(); toast('Résumé copié'); } else { toast('Sélectionnez le texte puis copiez-le (Ctrl+C). Cliquez ailleurs pour fermer.'); ta.addEventListener('blur', () => ta.remove()); }
  }
  function legHTML(route, label) {
    const p = route.split(' → '), a = p[0], b = p[p.length - 1], hubs = p.slice(1, -1);
    return `<div class="leg"><span class="ap">${esc(a)}<small>${esc(label)}</small></span><span class="mid">${hubs.map((h, i) => `<span class="stp" style="left:${(i + 1) / (hubs.length + 1) * 100}%"></span>`).join('')}${I.plane.replace('<svg', '<svg style="transform:rotate(90deg)"')}<span class="lb">${hubs.length ? 'via ' + hubs.map(esc).join(', ') : 'direct'}</span></span><span class="ap" style="text-align:right">${esc(b)}<small>&nbsp;</small></span></div>`;
  }

  function pageTrips() {
    const trips = store.get('azurea.trips', []);
    app.innerHTML = `<div class="view"><section class="sec wrap"><div class="sec-hd"><div><div class="kicker">Enregistrés sur cet appareil</div><h2 class="h2">Mes voyages</h2></div></div><div id="tl" style="display:grid;gap:12px"></div></section></div>`;
    const draw = () => {
      const t = store.get('azurea.trips', []);
      $('#tl').innerHTML = t.length ? t.map(x => { const d = D[x.k]; return `<div class="trip rv" data-id="${x.id}"><div class="trip-ph">${photo(x.k, 0, true)}</div><div><b class="h3">${esc(d.city)}, ${esc(d.name)}</b><div style="color:var(--slate);font-size:13.5px">${fmtLong(x.date)} · ${plural(x.days, 'jour')} · ${plural(x.pax, 'voyageur')}${x.noFlight ? ' · sans vol' : ''}</div><div style="margin-top:4px"><b class="num" style="color:var(--signal)">${money(x.pp)}</b> / pers. · enregistré le ${fmtLong(x.at)}</div></div><div class="acts"><button class="btn btn-ink btn-sm" data-open-trip>Ouvrir</button><button class="btn btn-ghost btn-sm" data-del>${I.trash}Supprimer</button></div></div>`; }).join('')
        : `<div class="empty">${I.heart.replace('<svg', '<svg width="40" height="40" style="color:var(--signal)"')}<b>Aucun voyage enregistré pour l'instant.</b><span>Lancez une recherche, puis cliquez sur « Enregistrer ce voyage ».</span><button class="btn btn-red" data-go="">Choisir une destination</button></div>`;
      $$('[data-open-trip]').forEach(b => b.addEventListener('click', () => { const x = t.find(y => y.id == b.closest('.trip').dataset.id); Object.assign(state, { dest: x.k, date: x.date > today ? x.date : addDays(today, 30), days: x.days, pax: x.pax, noFlight: x.noFlight }); go('resultats'); }));
      $$('[data-del]').forEach(b => b.addEventListener('click', () => {
        if (b.dataset.sure) { const id = b.closest('.trip').dataset.id; store.set('azurea.trips', t.filter(y => y.id != id)); updateCount(); draw(); toast('Voyage supprimé'); }
        else { b.dataset.sure = 1; b.innerHTML = 'Confirmer ?'; b.classList.add('btn-red'); setTimeout(() => { if (b.isConnected) { delete b.dataset.sure; b.innerHTML = I.trash + 'Supprimer'; b.classList.remove('btn-red'); } }, 3000); }
      }));
      bindGo($('#tl')); after($('#tl'));
    };
    draw();
  }

  function pageInfos() {
    app.innerHTML = `<div class="view"><section class="sec wrap">
      <div class="sec-hd"><div><div class="kicker">Avant de partir</div><h2 class="h2">Infos pratiques par pays</h2><p class="lead">Avec la double nationalité franco-américaine, voyagez avec votre passeport français : il est exempté de visa dans les 13 pays (sauf formalité au Rwanda). Entrez et sortez de chaque pays avec le même passeport.</p></div></div>
      <div class="tbl-wrap rv"><table class="tbl"><thead><tr><th>Pays</th><th>Formalités (passeport FR)</th><th>Monnaie</th><th>Décalage</th><th>Prises</th><th>Meilleure saison</th></tr></thead><tbody>
      ${ORDER.map(k => { const d = D[k]; return `<tr><td><b>${flag(k)} ${esc(d.name)}</b><br><span style="color:var(--slate)">${esc(d.city)}</span></td><td>${esc(d.visa)}</td><td>${esc(d.money)}</td><td>${esc(d.tz)}</td><td>${esc(d.plug)}</td><td>${BEST[k].map(i => MOIS[i]).join(', ')}</td></tr>`; }).join('')}
      </tbody></table></div>
      <div class="perks" style="margin-top:26px">
        <div class="perk rv">${I.info}<h3>Santé</h3><p>Rwanda : traitement antipaludique et vaccin contre la fièvre jaune recommandés. Asie et Afrique : consultez un centre de vaccinations internationales 6 semaines avant.</p></div>
        <div class="perk rv">${I.globe}<h3>Internet</h3><p>Chine : Google, WhatsApp et Instagram bloqués. Une eSIM internationale (Airalo, Holafly) fonctionne sans VPN.</p></div>
        <div class="perk rv">${I.tag}<h3>Paiement</h3><p>Prévoyez une carte sans frais à l'étranger. Espèces utiles au Maroc, au Vietnam et au Rwanda.</p></div>
        <div class="perk rv">${I.check}<h3>Ariane</h3><p>Inscrivez votre voyage sur le portail Ariane du ministère des Affaires étrangères pour recevoir les alertes sécurité.</p></div>
      </div></section></div>`;
    after(app);
  }

  function pageHelp() {
    const faq = [
      ['Comment les prix sont-ils calculés ?', 'Vol : tarif aller-retour économique typique, avec au plus une escale, ajusté selon le mois et le délai de réservation. Hôtel : prix moyen d\'une chambre double 3★ bien notée dans le quartier conseillé, ajusté selon la saison. Repas : budget quotidien au restaurant (cuisine locale) selon le coût de la vie du pays. Activités : somme exacte des entrées et excursions du programme. Shopping : enveloppe raisonnable selon la durée.'],
      ['Les prix sont-ils garantis ?', 'Non. Ce sont des estimations réalistes : les billets d\'avion changent chaque jour. Utilisez le bouton « Vérifier sur Google Flights » et « Voir les hôtels sur Booking » pour obtenir le prix exact de vos dates.'],
      ['Comment est réparti le prix entre voyageurs ?', 'Le vol, les repas, les activités et le shopping sont comptés par personne. L\'hôtel est partagé : 1 chambre double pour 1 ou 2 personnes, 1 double + 1 simple pour 3 personnes, 2 doubles pour 4 personnes. Le total hôtel est ensuite divisé par le nombre de voyageurs.'],
      ['Comment sont construits les programmes ?', 'Chaque pays a des étapes prioritaires (vos incontournables : aurores, gorilles, Chongqing + Wulong + Shenzhen + Pékin, massage au Vietnam…). Selon la durée choisie, on garde les étapes prioritaires puis on ajoute les étapes secondaires et des journées libres pour les longs séjours.'],
      ['Puis-je vérifier les trajets à pied ?', 'Oui : chaque trajet entre deux lieux précis est un lien qui ouvre l\'itinéraire dans Google Maps (à pied, en transports ou en voiture).'],
      ['Comment réserver les gorilles au Rwanda ?', 'Sur visitrwanda.com (Rwanda Development Board) ou via une agence locale agréée, idéalement 3 à 6 mois à l\'avance pour juin–septembre. Le permis est nominatif, payable en dollars.'],
      ['Où sont enregistrés mes voyages ?', 'Dans le stockage local de votre navigateur, sur cet appareil uniquement. Rien n\'est envoyé sur un serveur.']
    ];
    app.innerHTML = `<div class="view"><section class="sec wrap" style="max-width:900px">
      <div class="sec-hd"><div><div class="kicker">Centre d'aide</div><h2 class="h2">Questions fréquentes</h2></div></div>
      <div class="faq panel rv">${faq.map((f, i) => `<details ${i === 0 ? 'open' : ''}><summary>${esc(f[0])}</summary><div class="a">${esc(f[1])}</div></details>`).join('')}</div>
      <div class="panel rv" style="margin-top:22px"><div class="panel-hd"><b class="h3">Bloc-notes de voyage</b><span style="color:var(--slate);font-size:13px" id="nSaved"></span></div>
        <label for="notes" class="sr">Notes</label><textarea id="notes" rows="6" style="width:100%;border:1px solid var(--line);border-radius:12px;padding:12px;font:inherit;background:var(--cabin);color:var(--ink)" placeholder="Numéros de réservation, idées, contacts…"></textarea></div>
      <div class="panel rv" style="margin-top:22px"><div class="panel-hd"><b class="h3">Crédits photos</b><span style="color:var(--slate);font-size:13px">Wikimedia Commons, licences libres</span></div>
        <ul class="credits">${ORDER.flatMap(k => (PH[k] || []).map(p => `<li><b>${esc(p.t)}</b> — ${esc(p.a)} · <a href="${esc(p.u)}" target="_blank" rel="noopener">${esc(p.l || 'voir la licence')}</a></li>`)).join('')}</ul>
        <details style="margin-top:14px"><summary style="cursor:pointer;font-weight:650">Photos des lieux des programmes (${Object.keys(LP).length})</summary>
        <ul class="credits" style="margin-top:10px">${Object.entries(LP).map(([n, p]) => `<li><b>${esc(n)}</b> — ${esc(p.a)} · <a href="${esc(p.u)}" target="_blank" rel="noopener">${esc(p.l)}</a></li>`).join('')}</ul></details></div>
    </section></div>`;
    const n = $('#notes'); n.value = store.get('azurea.notes', '');
    n.addEventListener('input', () => { store.set('azurea.notes', n.value); $('#nSaved').textContent = 'Enregistré sur cet appareil'; });
    after(app);
  }

  /* ───────── Routeur ───────── */
  const routes = { '': pageHome, accueil: pageHome, destinations: pageDests, voyages: pageTrips, infos: pageInfos, aide: pageHelp, resultats: () => state.dest ? renderResults() : go('') };
  function route() {
    const h = location.hash.slice(1);
    window.__mapApi = null;
    if (h.startsWith('dest-')) pageDest(h.slice(5)); else (routes[h] || pageHome)();
    $$('nav.main a').forEach(a => a.setAttribute('aria-current', a.dataset.go === h || (h.startsWith('dest-') && a.dataset.go === 'destinations') || (h === 'resultats' && a.dataset.go === '') ? 'page' : 'false'));
    $('nav.main').classList.remove('open'); $('.burger').setAttribute('aria-expanded', 'false');
    bindGo(app);
    scrollTo({ top: 0, behavior: 'instant' });
  }
  function go(h) { if (location.hash.slice(1) === h) route(); else location.hash = h; }
  function bindGo(root) { $$('[data-go]', root).forEach(b => { if (b._go) return; b._go = 1; b.addEventListener('click', e => { e.preventDefault(); go(b.dataset.go); }); }); }
  function updateCount() { const n = store.get('azurea.trips', []).length; $('#tripCount').textContent = n; $('#tripCount').hidden = !n; }

  addEventListener('hashchange', route);
  bindGo(document);
  $('.burger').addEventListener('click', e => { const o = $('nav.main').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); });
  $$('.cur button').forEach(b => { b.setAttribute('aria-pressed', b.dataset.cur === state.cur); b.addEventListener('click', () => { state.cur = b.dataset.cur; savePrefs(); $$('.cur button').forEach(x => x.setAttribute('aria-pressed', x === b)); route(); toast(state.cur === 'USD' ? 'Prix affichés en dollars US (1 € ≈ 1,16 $)' : 'Prix affichés en euros'); }); });
  updateCount();
  window.Azurea = { quote, state };
  route();
})();
