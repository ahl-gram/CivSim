/* althistory.js - alternate history as a PURE DERIVED layer. Base civ data is
 * never mutated; effectiveCivs() = base (minus suppressed, plus deltas) + new
 * counterfactual civs. The whole state machine is: set scenario, recompute,
 * rewind the year. (Per the immutability rule + advisor guidance.) */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var geo = App.geo;

  function scenarioById(id) {
    var list = App.data.altScenarios;
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    return list[0];
  }
  function activeScenario(state) {
    if (!state.altHistory.on) return null;
    return scenarioById(state.altHistory.scenarioId);
  }

  function boxesToPolys(boxes) {
    return boxes.map(function (b) { return geo.box(b.landmark, b.wLon || 22, b.hLat || 16); });
  }
  function growthHoldings(growth) {
    if (!growth || !growth.toLandmarks) return [];
    return growth.toLandmarks.map(function (l) { return geo.box(l, 18, 14); });
  }

  // Build the list of civ render-objects for the current mode/scenario.
  function buildEffectiveCivs(state) {
    var base = App.data.civs;
    var scenario = activeScenario(state);
    if (!scenario) {
      // real history: pass base civs straight through (no flags)
      return base.map(function (c) { return c; });
    }
    var suppressed = {};
    (scenario.suppress || []).forEach(function (id) { suppressed[id] = true; });
    var deltaByCiv = {};
    (scenario.civDeltas || []).forEach(function (d) { deltaByCiv[d.civ] = d; });

    var out = [];
    base.forEach(function (c) {
      if (suppressed[c.id]) return;
      var d = deltaByCiv[c.id];
      if (!d) { out.push(c); return; }
      // derive a NEW object (never mutate base)
      var eff = {
        id: c.id, name: c.name, start: c.start,
        end: d.endOverride != null ? d.endOverride : c.end,
        color: c.color, peak: c.peak, region: c.region,
        holdings: c.holdings ? c.holdings.slice() : [],
        label: c.label, capital: c.capital, description: c.description,
        g0: c.g0, fast: c.fast
      };
      var persisted = d.endOverride != null && d.endOverride > c.end;
      if (d.growth) {
        eff.peak = d.growth.byYear;
        eff.holdings = eff.holdings.concat(growthHoldings(d.growth));
      }
      eff.desaturate = !!d.desaturate; // respect the authored flag (don't grey the surviving power)
      eff.persisted = persisted;
      eff.altFlag = true; // touched by the scenario -> show warning icon
      eff.note = d.note;
      out.push(eff);
    });

    // brand-new counterfactual civs
    (scenario.newCivs || []).forEach(function (nc) {
      var polys = boxesToPolys(nc.regionBoxes);
      var holdings = polys.slice(1).concat(growthHoldings(nc.growth));
      out.push({
        id: nc.id, name: nc.name, start: nc.start, end: nc.end, color: nc.color,
        peak: nc.growth ? nc.growth.byYear : (nc.start + (nc.end - nc.start) * 0.4),
        region: polys[0] || geo.box(nc.label, 22, 16),
        holdings: holdings, label: geo.at(nc.label), capital: nc.capital,
        description: nc.description, g0: 0.22, fast: false,
        alt: true, altFlag: true
      });
    });
    return out;
  }

  function rebuild(state) {
    state.runtime = state.runtime || {};
    state.runtime.effCivs = buildEffectiveCivs(state);
    App.sim.rebuildTimeline(state);
    state.recentEvents = App.sim.recentBefore(state, state.currentYear, App.CONFIG.maxRecentEvents);
    // clear ALL transient anims that reference old civs/timeline (match jumpTo)
    state.activeWars = []; state.activeMarkers = []; state.floatingLabels = [];
    state.explorations = []; state.ambient = [];
    if (App.main && App.main.resetCometIdx) App.main.resetCometIdx(state);
    state.dirtyMap = true;
  }

  // ---- state machine (rewind/restore) ----
  function setMode(state, on) {
    if (on === state.altHistory.on) return;
    if (on) {
      state.altHistory.savedYear = state.currentYear;
      state.altHistory.on = true;
      rebuild(state);
      var sc = activeScenario(state);
      state.currentYear = sc.rewindTo;
    } else {
      state.altHistory.on = false;
      rebuild(state);
      if (state.altHistory.savedYear != null) state.currentYear = state.altHistory.savedYear;
    }
    state.lastYear = state.currentYear;
    state.recentEvents = App.sim.recentBefore(state, state.currentYear, App.CONFIG.maxRecentEvents);
  }
  function setScenario(state, id) {
    state.altHistory.scenarioId = id;
    if (state.altHistory.on) {
      rebuild(state);
      state.currentYear = activeScenario(state).rewindTo;
      state.lastYear = state.currentYear;
      state.recentEvents = App.sim.recentBefore(state, state.currentYear, App.CONFIG.maxRecentEvents);
    }
  }

  App.altHistory = {
    scenarioById: scenarioById, activeScenario: activeScenario,
    buildEffectiveCivs: buildEffectiveCivs, rebuild: rebuild,
    setMode: setMode, setScenario: setScenario
  };
})(typeof window !== 'undefined' ? window : globalThis);
