/* Node tests for the pure simulation logic (run: node --test).
 * Rendering/animation is the exempted UI category; this covers the logic. */
'use strict';
const { test } = require('node:test');
const assert = require('node:assert');

// load modules onto globalThis.App in dependency order
require('../js/core.js'); require('../js/rng.js'); require('../js/geo.js');
require('../js/data-civs.js'); require('../js/data-eras.js');
require('../js/data-events.js'); require('../js/data-events-extra.js');
require('../js/data-trade.js'); require('../js/data-flavor.js'); require('../js/data-althistory.js');
require('../js/sim.js'); require('../js/althistory.js'); require('../js/procedural.js');
const App = globalThis.App;

test('population interpolation hits anchor points and is monotonic', () => {
  assert.ok(Math.abs(App.sim.popAt(1) - 300e6) < 1e6, 'popAt(1)~300M');
  assert.ok(Math.abs(App.sim.popAt(2023) - 8e9) < 1e7, 'popAt(2023)~8B');
  assert.equal(App.sim.popAt(-40000), 1e6);
  let prev = 0;
  for (let y = -40000; y <= 2025; y += 500) { const p = App.sim.popAt(y); assert.ok(p >= prev - 1, 'monotonic at ' + y); prev = p; }
});

test('era boundaries are correct', () => {
  assert.equal(App.sim.eraAt(-40000).name, 'STONE AGE');
  assert.equal(App.sim.eraAt(-3200).name, 'BRONZE AGE');
  assert.equal(App.sim.eraAt(-3201).name, 'STONE AGE');
  assert.equal(App.sim.eraAt(1000).name, 'MEDIEVAL');
  assert.equal(App.sim.eraAt(2025).name, 'INFORMATION AGE');
});

test('growthScale: g0 at start, ~1 at peak, in [0,1.05]', () => {
  const civ = { start: -27, end: 476, peak: 117, g0: 0.5 };
  assert.ok(Math.abs(App.sim.growthScale(civ, -27) - 0.5) < 1e-9);
  assert.ok(Math.abs(App.sim.growthScale(civ, 117) - 1) < 1e-9);
  for (let y = -27; y <= 476; y += 10) { const s = App.sim.growthScale(civ, y); assert.ok(s >= 0 && s <= 1.05, 'scale in range at ' + y); }
});

test('RNG is deterministic per seed and varies across seeds', () => {
  const a = App.makeRng(42), b = App.makeRng(42), c = App.makeRng(43);
  const sa = [a.next(), a.next(), a.next()], sb = [b.next(), b.next(), b.next()];
  assert.deepEqual(sa, sb);
  assert.notEqual(sa[0], c.next());
});

test('procedural.generate is reproducible for a seed and differs across seeds', () => {
  const s1 = App.createState(); s1.seed = 12345; App.proc.generate(s1);
  const s2 = App.createState(); s2.seed = 12345; App.proc.generate(s2);
  const s3 = App.createState(); s3.seed = 99999; App.proc.generate(s3);
  const names = (st) => st.proc.flavorEvents.slice(0, 12).map(e => e.year + ':' + e.name).join('|');
  assert.equal(names(s1), names(s2), 'same seed => same flavor');
  assert.notEqual(names(s1), names(s3), 'different seed => different flavor');
  assert.ok(s1.proc.flavorEvents.length > 200, 'rich flavor set');
  // all flavor events have a finite on-map location
  for (const e of s1.proc.flavorEvents) {
    assert.ok(isFinite(e.location[0]) && e.location[0] >= 0 && e.location[0] <= 100, 'flavor loc on map: ' + e.name);
  }
});

test('alt-history is derived, never mutates base data', () => {
  const realRomeEnd = App.data.civs.find(c => c.id === 'rome_empire').end;
  assert.equal(realRomeEnd, 476);
  const st = App.createState(); st.seed = 1; App.proc.generate(st);
  st.altHistory.scenarioId = 2; // Rome Never Falls
  App.altHistory.setMode(st, true);
  const eff = st.runtime.effCivs;
  const effRome = eff.find(c => c.id === 'rome_empire');
  assert.equal(effRome.end, 2025, 'effective Rome persists');
  assert.equal(App.data.civs.find(c => c.id === 'rome_empire').end, 476, 'BASE Rome untouched');
  // suppressed civs are absent
  assert.ok(!eff.find(c => c.id === 'caliphate'), 'caliphate suppressed in scenario 2');
  // new counterfactual civ present and flagged
  const reborn = eff.find(c => c.alt);
  assert.ok(reborn, 'a counterfactual civ exists');
  assert.ok(Array.isArray(reborn.region) && reborn.region.length >= 3, 'new civ has geometry');
});

test('alt-history state machine rewinds and restores the year', () => {
  const st = App.createState(); st.seed = 1; App.proc.generate(st);
  st.currentYear = 1600;
  st.altHistory.scenarioId = 1; // Alexander Lives, rewind -336
  App.altHistory.setMode(st, true);
  assert.equal(st.currentYear, -336, 'rewinds to divergence');
  App.altHistory.setScenario(st, 3); // Mongols, rewind 1206
  assert.equal(st.currentYear, 1206, 'switching scenario rewinds');
  App.altHistory.setMode(st, false);
  assert.equal(st.currentYear, 1600, 'restores saved year on toggle off');
});

test('every alt scenario builds without throwing and yields civs', () => {
  for (const sc of App.data.altScenarios) {
    const st = App.createState(); st.seed = 7; App.proc.generate(st);
    st.altHistory.scenarioId = sc.id;
    App.altHistory.setMode(st, true);
    assert.ok(st.runtime.effCivs.length > 5, 'scenario ' + sc.id + ' has civs');
    App.sim.rebuildTimeline(st);
    assert.ok(st.runtime.timeline.length > 50, 'scenario ' + sc.id + ' has a timeline');
  }
});

// regression: the review found alt events had no projected location -> render crash
test('EVERY timeline event (all modes/scenarios) has a finite on-map location', () => {
  function check(st, label) {
    for (const e of st.runtime.timeline) {
      assert.ok(e.location && isFinite(e.location[0]) && isFinite(e.location[1]),
        label + ' event missing location: ' + e.name);
    }
  }
  const real = App.createState(); real.seed = 3; App.proc.generate(real);
  App.altHistory.rebuild(real); check(real, 'real');
  for (const sc of App.data.altScenarios) {
    const st = App.createState(); st.seed = 3; App.proc.generate(st);
    st.altHistory.scenarioId = sc.id; App.altHistory.setMode(st, true);
    check(st, 'scenario ' + sc.id);
    const altEvents = st.runtime.timeline.filter(e => e.alt);
    assert.ok(altEvents.length > 0, 'scenario ' + sc.id + ' has alt events flagged');
  }
});

// regression: the averted canonical event (at the divergence year) must NOT fire
test('divergence boundary excludes the averted event and later real history', () => {
  for (const sc of App.data.altScenarios) {
    const st = App.createState(); st.seed = 5; App.proc.generate(st);
    st.altHistory.scenarioId = sc.id; App.altHistory.setMode(st, true);
    const leaked = st.runtime.timeline.filter(e => e.canonical && e.year >= sc.year);
    assert.equal(leaked.length, 0, 'scenario ' + sc.id + ' leaks canonical events at/after divergence ' + sc.year);
  }
});
