/* sim.js - the simulation core: time advance, event firing, and the pure
 * functions (population, era, growth) that drive everything. Pure helpers are
 * exported for Node tests; advance() mutates state and is the per-frame step. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var CONFIG = App.CONFIG;
  var util = App.util;

  function getData() { return App.data; }

  // ---- pure: population (log-linear interpolation) ----
  function popAt(year) {
    var P = getData().population;
    if (year <= P[0][0]) return P[0][1];
    if (year >= P[P.length - 1][0]) return P[P.length - 1][1];
    for (var i = 1; i < P.length; i++) {
      if (year <= P[i][0]) {
        var a = P[i - 1], b = P[i];
        var t = (year - a[0]) / (b[0] - a[0]);
        return Math.exp(Math.log(a[1]) + (Math.log(b[1]) - Math.log(a[1])) * t);
      }
    }
    return P[P.length - 1][1];
  }

  // ---- pure: era for a given year ----
  function eraAt(year) {
    var E = getData().eras, cur = E[0];
    for (var i = 0; i < E.length; i++) { if (year >= E[i].start) cur = E[i]; }
    return cur;
  }
  function eraIndex(year) {
    var E = getData().eras, idx = 0;
    for (var i = 0; i < E.length; i++) { if (year >= E[i].start) idx = i; }
    return idx;
  }

  // ---- pure: territory growth scale (blooms from g0 -> 1 by peak, gentle decline) ----
  function growthScale(civ, year) {
    var g0 = civ.g0 != null ? civ.g0 : 0.5;
    if (year <= civ.start) return g0;
    if (year >= civ.end) return Math.max(g0, 0.8);
    var peak = civ.peak != null ? civ.peak : (civ.start + (civ.end - civ.start) * 0.4);
    if (peak <= civ.start) peak = civ.start + 1;
    if (year <= peak) {
      var t = (year - civ.start) / (peak - civ.start);
      if (civ.fast) t = Math.pow(t, 0.45);
      return g0 + (1 - g0) * t;
    }
    var t2 = (year - peak) / Math.max(1, (civ.end - peak));
    return 1 - 0.2 * t2;
  }

  // ---- pure: 0..1 nearness to peak (for glow) ----
  function peakProximity(civ, year) {
    var peak = civ.peak != null ? civ.peak : (civ.start + (civ.end - civ.start) * 0.4);
    var span = Math.max(80, (civ.end - civ.start) * 0.18);
    var d = Math.abs(year - peak);
    return d >= span ? 0 : (1 - d / span);
  }

  // ---- pure: 0..1 "dying" factor (within 100 yrs of end) ----
  function dyingFactor(civ, year) {
    if (year >= civ.end) return 1;
    var d = civ.end - year;
    return d <= 100 ? (1 - d / 100) : 0;
  }

  function isActive(civ, year) { return year >= civ.start && year <= civ.end; }

  // ---- timeline assembly: which events can fire, given mode/scenario ----
  // Real mode: canonical + flavor. Alt mode: canonical-up-to-divergence (non
  // suppressed) + alt events + flavor.
  function rebuildTimeline(state) {
    var d = getData();
    var list = [];
    var alt = state.altHistory.on ? App.altHistory.activeScenario(state) : null;
    var divergence = alt ? alt.year : Infinity;
    var suppressed = {};
    if (alt && alt.suppress) alt.suppress.forEach(function (id) { suppressed[id] = true; });

    d.events.forEach(function (e) {
      if (alt) {
        if (e.year >= divergence) return;                // the averted event (at the divergence year) must NOT fire
        if (e.civ && suppressed[e.civ]) return;
      }
      list.push(e);
    });
    if (alt && alt.altEvents) {
      // alt events are authored with a landmark NAME only; normalize them the
      // same way canonical events are (project location, fill description, flag).
      alt.altEvents.forEach(function (e) {
        list.push({
          year: e.year, name: e.name, type: e.type, landmark: e.landmark,
          location: App.geo.at(e.landmark) || [50, 50],
          description: e.desc || e.description || '',
          civ: e.civ || null, war: e.war || null, explore: e.explore || null,
          alt: true, canonical: false
        });
      });
    }
    // flavor / procedural events (seeded) fire in both modes; in alt mode skip
    // any that name a suppressed civ (avoids ghost mentions of vanished powers)
    (state.proc.flavorEvents || []).forEach(function (e) {
      if (alt && e.civ && suppressed[e.civ]) return;
      list.push(e);
    });
    list.sort(function (a, b) { return a.year - b.year; });
    state.runtime = state.runtime || {};
    state.runtime.timeline = list;
    return list;
  }

  function eventsInRange(state, fromY, toY) {
    var tl = (state.runtime && state.runtime.timeline) || getData().events;
    var out = [];
    for (var i = 0; i < tl.length; i++) {
      var y = tl[i].year;
      if (y > fromY && y <= toY) out.push(tl[i]);
    }
    return out;
  }

  // recompute "recent events" after a jump (no firing) = last N with year<=current
  function recentBefore(state, year, n) {
    var tl = (state.runtime && state.runtime.timeline) || getData().events;
    var out = [];
    for (var i = 0; i < tl.length; i++) { if (tl[i].year <= year) out.push(tl[i]); }
    out.sort(function (a, b) { return b.year - a.year; });
    return out.slice(0, n);
  }

  // prehistory auto-ramp: zip through the empty Stone Age (no canonical civ drama)
  function rampFactor(year) {
    if (!CONFIG.autoRampPrehistory) return 1;
    if (year < -20000) return 6;
    if (year < -9000) return 3;
    if (year < -4000) return 1.6;
    return 1;
  }

  // ---- per-frame advance. Returns {fired:[...], crossedEra:bool} ----
  function advance(state, dtMs) {
    var speed = CONFIG.speedLevels[state.speedIndex];
    var dy = CONFIG.simYearsPerSecondAt1x * speed * (dtMs / 1000) * rampFactor(state.currentYear);
    var prev = state.currentYear;
    var next = prev + dy;
    var stopped = false;
    if (next >= CONFIG.endYear) { next = CONFIG.endYear; stopped = true; }
    state.lastYear = prev;
    state.currentYear = next;
    var fired = eventsInRange(state, prev, next);
    var eraBefore = eraIndex(prev), eraAfter = eraIndex(next);
    return { fired: fired, crossedEra: eraAfter > eraBefore, stopped: stopped, eraIndexNow: eraAfter };
  }

  App.sim = {
    popAt: popAt, eraAt: eraAt, eraIndex: eraIndex,
    growthScale: growthScale, peakProximity: peakProximity, dyingFactor: dyingFactor,
    isActive: isActive, advance: advance, rebuildTimeline: rebuildTimeline,
    eventsInRange: eventsInRange, recentBefore: recentBefore, rampFactor: rampFactor
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { popAt: popAt, eraAt: eraAt, growthScale: growthScale, peakProximity: peakProximity, dyingFactor: dyingFactor, isActive: isActive };
  }
})(typeof window !== 'undefined' ? window : globalThis);
