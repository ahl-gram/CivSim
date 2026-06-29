/* main.js - boot sequence, the requestAnimationFrame loop, and control actions.
 * Loaded last. Gates first paint on the pixel font so the retro look never
 * bakes a fallback font into the opening frames (advisor note). */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var CONFIG = App.CONFIG;
  var state, lastT = 0, sidePanelAccum = 0, started = false;

  function boot() {
    state = App.createState();
    state.seed = App.pickInitialSeed();
    App.state = state;
    App.proc.generate(state);
    App.altHistory.rebuild(state); // builds effCivs + timeline + recentEvents
    state.recentEvents = App.sim.recentBefore(state, state.currentYear, CONFIG.maxRecentEvents);

    var map = document.getElementById('map-canvas');
    var fx = document.getElementById('fx-canvas');
    App.render.init(map, fx);
    App.ui.init(state);
    App.input.init(state, fx);
    App.audio.setMuted(state.muted);
    document.body.classList.toggle('scan', state.scanlines);

    runSplash();
  }

  // ---- DOS-style boot splash (~2s) ----
  function runSplash() {
    var lines = [
      'CIVILIZATION TIMELINE  v1.0',
      '(C) 1993 ROUTE12B SOFTWORKS',
      '',
      'DETECTING CPU............ 486DX2/66',
      'CONVENTIONAL MEMORY...... 640K OK',
      'EXTENDED MEMORY.......... 7168K OK',
      'LOADING HISTORY.DAT...... ' + App.data.events.length + ' EVENTS',
      'LOADING CIVS.DAT......... ' + App.data.civs.length + ' CIVILIZATIONS',
      'SEEDING TIMELINE......... ' + App.seedToCode(state.seed),
      'CALIBRATING VGA.......... 320x200x256',
      '',
      'PRESS START 2P. READY.'
    ];
    var box = document.getElementById('splash-text');
    var i = 0;
    function next() {
      if (i < lines.length) { box.textContent += lines[i] + '\n'; i++; setTimeout(next, 150); }
    }
    next();

    var fontP = (document.fonts && document.fonts.load)
      ? document.fonts.load("10px 'Press Start 2P'").catch(function () {}) : Promise.resolve();
    Promise.resolve(fontP).then(function () {
      setTimeout(function () {
        App.render.resize();
        document.getElementById('splash').classList.add('hide');
        applyUrlParams();
        if (!state._noAutoplay) { state.isPlaying = true; state.speedIndex = 2; } // auto-play 2x
        App.ui.refreshControls(state);
        App.ui.updateSidePanel(state);
        App.ui.seedTicker(state);
        started = true;
        if (state._burn) burnTest(state._burn);
        lastT = performance.now();
        requestAnimationFrame(loop);
      }, 2000);
    });
  }

  // deep-link / share params: ?seed= (handled in rng) ?alt=N ?year=YYYY ?paused=1
  function applyUrlParams() {
    var q = (typeof location !== 'undefined' && location.search) || '';
    var alt = /[?&]alt=(\d+)/.exec(q);
    if (alt) { var id = parseInt(alt[1], 10); if (id >= 1 && id <= 10) { state.altHistory.scenarioId = id; App.altHistory.setMode(state, true); } }
    var yr = /[?&]year=(-?\d+)/.exec(q);
    if (yr) jumpTo(parseInt(yr[1], 10));
    if (/[?&]paused=1/.test(q)) state._noAutoplay = true;
    var burn = /[?&]burn=(\d+)/.exec(q);
    if (burn) state._burn = parseInt(burn[1], 10);
  }

  // diagnostic self-test: synchronously run advance->handleFired->render.frame for N
  // frames (exercises the full pipeline without relying on rAF). Reports to body[data-burn].
  function burnTest(n) {
    var t = 1000, i = 0;
    try {
      for (i = 0; i < n; i++) {
        var res = App.sim.advance(state, 16);
        if (res.fired.length) { var b = App.ui.handleFired(state, res.fired, t); if (b && !state.muted) App.audio.forEvent(b.type); }
        if (res.crossedEra) App.ui.showEraBanner(state, t, App.sim.eraAt(state.currentYear).name);
        pruneAnims(state, t); App.ui.updateTopBar(state); App.ui.updateSidePanel(state); App.ui.updateTicker(state, 16);
        App.render.frame(state, t);
        t += 16; if (state.currentYear >= CONFIG.endYear) break;
      }
      document.body.dataset.burn = 'OK year=' + Math.round(state.currentYear) + ' iters=' + i;
    } catch (e) {
      document.body.dataset.burn = 'ERR@iter' + i + ' year=' + Math.round(state.currentYear) + ': ' + (e && e.message);
      document.title = 'BURNERR: ' + (e && e.message);
    }
  }

  function pruneAnims(state, now) {
    state.activeMarkers = state.activeMarkers.filter(function (m) { return now - m.bornMs < 2700; });
    state.floatingLabels = state.floatingLabels.filter(function (f) { return now - f.bornMs < CONFIG.floatLabelMs; });
    state.activeWars = state.activeWars.filter(function (w) { return now - w.bornMs < w.durMs; });
    state.explorations = state.explorations.filter(function (x) { return now - x.bornMs < x.durMs + 800; });
    state.ambient = state.ambient.filter(function (a) { return now - a.bornMs < a.durMs; });
  }

  // spawn a comet shooting-star when crossing a comet year during play
  var cometIdx = 0;
  function checkComets(state, fromY, toY, now) {
    var comets = state.proc.comets;
    while (cometIdx < comets.length && comets[cometIdx].year <= toY) {
      if (comets[cometIdx].year > fromY) {
        var s = comets[cometIdx].seed, sz = App.render.size();
        var x0 = s * sz.W, y0 = 10 + s * 40;
        state.ambient.push({ bornMs: now, durMs: 1100, x0: x0, y0: y0, x1: x0 - 120 - s * 80, y1: y0 + 90 + s * 60 });
      }
      cometIdx++;
    }
  }
  function resetCometIdx(state) {
    cometIdx = 0; var c = state.proc.comets;
    while (cometIdx < c.length && c[cometIdx].year < state.currentYear) cometIdx++;
  }

  function loop(now) {
    var dt = Math.min(80, now - lastT); lastT = now;

    if (state.isPlaying) {
      var fromY = state.currentYear;
      var res = App.sim.advance(state, dt);
      checkComets(state, fromY, state.currentYear, now);
      if (res.fired.length) {
        var best = App.ui.handleFired(state, res.fired, now);
        if (best && !state.muted) App.audio.forEvent(best.type); // one sound/frame
      }
      if (res.crossedEra) {
        var era = App.sim.eraAt(state.currentYear);
        App.ui.showEraBanner(state, now, era.name);
        if (!state.muted) App.audio.era();
      }
      if (res.stopped) { state.isPlaying = false; App.ui.refreshControls(state); }
    }

    pruneAnims(state, now);
    App.ui.tickBanner(state, now);
    App.ui.updateTopBar(state);
    App.ui.updateTicker(state, dt);
    sidePanelAccum += dt;
    if (sidePanelAccum > 120) { App.ui.updateSidePanel(state); sidePanelAccum = 0; }

    App.render.frame(state, now);
    requestAnimationFrame(loop);
  }

  // ---- control actions ----
  function togglePlay() {
    App.audio.unlock();
    if (state.currentYear >= CONFIG.endYear && !state.isPlaying) jumpTo(CONFIG.startYear);
    state.isPlaying = !state.isPlaying;
    App.ui.refreshControls(state);
  }
  function changeSpeed(d) {
    state.speedIndex = App.util.clamp(state.speedIndex + d, 0, CONFIG.speedLevels.length - 1);
    App.ui.refreshControls(state);
  }
  function jumpTo(year) {
    state.currentYear = App.util.clamp(Math.round(year), CONFIG.startYear, CONFIG.endYear);
    state.lastYear = state.currentYear;
    state.recentEvents = App.sim.recentBefore(state, state.currentYear, CONFIG.maxRecentEvents);
    state.activeMarkers = []; state.floatingLabels = []; state.activeWars = []; state.explorations = []; state.ambient = [];
    resetCometIdx(state);
    state.dirtyMap = true;
    App.ui.updateSidePanel(state);
    App.ui.seedTicker(state);
  }
  function step(d) { jumpTo(state.currentYear + d); }

  function capture() {
    var sz = App.render.size();
    var tmp = document.createElement('canvas');
    tmp.width = sz.W; tmp.height = sz.H;
    var tc = tmp.getContext('2d');
    tc.drawImage(document.getElementById('map-canvas'), 0, 0, sz.W, sz.H);
    tc.drawImage(document.getElementById('fx-canvas'), 0, 0, sz.W, sz.H);
    var url = tmp.toDataURL('image/png');
    var a = document.createElement('a');
    var y = state.currentYear, name = 'civ-timeline-' + (y < 0 ? Math.abs(y) + 'BC' : y + 'AD') + '.png';
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    App.audio.click();
  }

  function reseed() {
    state.seed = App.pickInitialSeed();
    App.proc.generate(state);
    App.altHistory.rebuild(state);
    resetCometIdx(state);
    try { history.replaceState(null, '', '?seed=' + App.seedToCode(state.seed)); } catch (e) {}
    document.getElementById('seed-label').textContent = 'SEED ' + App.seedToCode(state.seed);
    App.ui.tickerPush('[NEW TIMELINE] seed ' + App.seedToCode(state.seed) + ' - history will unfold anew');
    App.audio.founded();
  }

  App.main = {
    boot: boot, togglePlay: togglePlay, changeSpeed: changeSpeed,
    jumpTo: jumpTo, step: step, capture: capture, reseed: reseed, resetCometIdx: resetCometIdx
  };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
  }
})(typeof window !== 'undefined' ? window : globalThis);
