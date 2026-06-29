/* procedural.js - the seeded "different every time" layer (Moderate intensity).
 * Canonical history stays accurate & on-time; this bakes a fresh set of flavor
 * events, emergent neighbor-wars, golden ages, plagues, and comets from the
 * seed each load. All randomness flows through the seeded RNG. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var geo = App.geo;
  var CONFIG = App.CONFIG;

  var OCEAN_LM = { pacific_mid: 1, indian_ocean: 1, magellanstrait: 1, capeverde: 1, canary: 1, hispaniola: 1, beringia: 1, doggerland: 1 };
  function inhabitedLandmarks() {
    return Object.keys(geo.LANDMARKS).filter(function (n) { return !OCEAN_LM[n]; });
  }
  function dist(a, b) { var dx = a[0] - b[0], dy = a[1] - b[1]; return Math.sqrt(dx * dx + dy * dy); }

  function fill(text, ctx) {
    return text.replace(/\{(place|civ|leader|omen|festival)\}/g, function (m, k) {
      return ctx[k] != null ? ctx[k] : m;
    });
  }

  function activeBaseCivsAt(year) {
    return App.data.civs.filter(function (c) { return year >= c.start && year <= c.end; });
  }

  function generate(state) {
    var seed = state.seed;
    var base = App.data.civs;
    var pools = App.data.flavor.namePools;
    var templates = App.data.flavor.templates;
    var land = inhabitedLandmarks();

    // ---- flavor events (fully baked, deterministic) ----
    var rngF = App.makeRng(seed).fork('flavor');
    var COUNT = 260;
    var flavor = [];
    for (var i = 0; i < COUNT; i++) {
      // bias toward later eras (more people, more civs) while still seeding prehistory
      var r = rngF.next();
      var bias = Math.pow(r, 1.7);
      var year = Math.round(CONFIG.startYear + (CONFIG.endYear - CONFIG.startYear) * bias);
      var cand = templates.filter(function (t) { return year >= t.eraStart && year <= t.eraEnd; });
      if (!cand.length) continue;
      // weighted pick
      var total = 0; cand.forEach(function (t) { total += (t.weight || 1); });
      var roll = rngF.next() * total, t = cand[0];
      for (var j = 0; j < cand.length; j++) { roll -= (cand[j].weight || 1); if (roll <= 0) { t = cand[j]; break; } }

      var civObj = null, civs = activeBaseCivsAt(year);
      if (civs.length) civObj = civs[Math.floor(rngF.next() * civs.length)];
      var ctx = {
        place: rngF.pick(pools.settlements),
        leader: rngF.pick(pools.leaders),
        omen: rngF.pick(pools.omens),
        festival: rngF.pick(pools.festivals),
        civ: civObj ? civObj.name : 'the old tribes'
      };
      var loc;
      if (t.anchor === 'activeCiv' && civObj) loc = civObj.label;
      else if (t.anchor !== 'activeCiv' && t.anchor !== 'anyLand') loc = geo.at(t.anchor);
      if (!loc) loc = geo.at(rngF.pick(land)) || [50, 50];

      flavor.push({
        year: year, id: 'fl_' + i, type: t.type, name: fill(t.name, ctx),
        description: fill(t.desc, ctx), location: loc, civ: civObj ? civObj.id : null,
        flavor: true, canonical: false
      });
    }

    // ---- emergent neighbor-wars (adjacent, coexisting civs) ----
    var rngW = App.makeRng(seed).fork('wars');
    var pairs = [];
    for (var a = 0; a < base.length; a++) {
      for (var b = a + 1; b < base.length; b++) {
        var ca = base[a], cb = base[b];
        var ov0 = Math.max(ca.start, cb.start), ov1 = Math.min(ca.end, cb.end);
        if (ov1 - ov0 < 50) continue;
        var d = dist(ca.label, cb.label);
        if (d > 19) continue;
        pairs.push({ ca: ca, cb: cb, ov0: ov0, ov1: ov1, d: d });
      }
    }
    pairs = rngW.shuffle(pairs);
    var warCount = Math.min(46, Math.floor(pairs.length * 0.55));
    for (var w = 0; w < warCount; w++) {
      var pr = pairs[w];
      var wy = rngW.int(pr.ov0 + 8, pr.ov1 - 4);
      var mx = (pr.ca.label[0] + pr.cb.label[0]) / 2, my = (pr.ca.label[1] + pr.cb.label[1]) / 2;
      flavor.push({
        year: wy, id: 'ew_' + w, type: 'WAR',
        name: pr.ca.name + ' vs ' + pr.cb.name,
        description: 'Border raids and skirmishes flare between ' + pr.ca.name + ' and ' + pr.cb.name + '.',
        location: [mx, my], war: [pr.ca.id, pr.cb.id], emergent: true, flavor: true, canonical: false
      });
    }

    // ---- golden ages (extra glow) ----
    var rngG = App.makeRng(seed).fork('golden');
    var golden = [];
    var bigCivs = base.filter(function (c) { return (c.end - c.start) > 120; });
    var nGold = rngG.int(7, 11);
    for (var g = 0; g < nGold; g++) {
      var gc = bigCivs[Math.floor(rngG.next() * bigCivs.length)];
      var center = gc.peak != null ? gc.peak : (gc.start + (gc.end - gc.start) * 0.4);
      var half = rngG.int(20, 70);
      golden.push({ civ: gc.id, start: center - half + rngG.int(-30, 30), end: center + half, name: rngG.pick(['Golden Age', 'Renaissance', 'Flowering', 'Pax']) });
    }

    // ---- plagues (desaturate + shrink + marker) ----
    var rngP = App.makeRng(seed).fork('plague');
    var plagues = [];
    var nPlague = rngP.int(4, 7);
    for (var p = 0; p < nPlague; p++) {
      var pc = bigCivs[Math.floor(rngP.next() * bigCivs.length)];
      var py = rngP.int(pc.start + 30, pc.end - 10);
      plagues.push({ civ: pc.id, start: py, end: py + rngP.int(6, 18), location: pc.label });
      // surface a disaster marker for the plague
      flavor.push({
        year: py, id: 'pl_' + p, type: 'DISASTER', name: 'Pestilence in ' + pc.name,
        description: 'A wasting sickness sweeps through ' + pc.name + ', emptying its towns.',
        location: pc.label, civ: pc.id, flavor: true, canonical: false
      });
    }

    // ---- comets (ambient shooting-stars across the sky) ----
    var rngC = App.makeRng(seed).fork('comet');
    var comets = [];
    var nComet = rngC.int(18, 30);
    for (var c2 = 0; c2 < nComet; c2++) {
      comets.push({ year: rngC.int(CONFIG.startYear, CONFIG.endYear), seed: rngC.next() });
    }
    comets.sort(function (x, y) { return x.year - y.year; });

    state.proc = {
      flavorEvents: flavor, goldenAges: golden, plagues: plagues, comets: comets,
      emergentWars: flavor.filter(function (e) { return e.emergent; })
    };
    return state.proc;
  }

  // ---- lookups used by render ----
  function goldenAt(state, civId, year) {
    var g = state.proc.goldenAges;
    for (var i = 0; i < g.length; i++) { if (g[i].civ === civId && year >= g[i].start && year <= g[i].end) return g[i]; }
    return null;
  }
  function plagueAt(state, civId, year) {
    var pl = state.proc.plagues;
    for (var i = 0; i < pl.length; i++) { if (pl[i].civ === civId && year >= pl[i].start && year <= pl[i].end) return pl[i]; }
    return null;
  }

  App.proc = { generate: generate, goldenAt: goldenAt, plagueAt: plagueAt, fill: fill };
})(typeof window !== 'undefined' ? window : globalThis);
