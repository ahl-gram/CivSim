/* ui.js - DOM chrome: top bar, side panel, ticker, controls wiring, info
 * popup, era/alt banners, and handleFired() which turns fired events into the
 * on-map animations + ticker/side-panel entries. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var C = App.COLORS, CONFIG = App.CONFIG, util = App.util, sim = App.sim;
  var el = {};
  var ticker = { items: [], offset: 0, trackW: 0, text: '' };

  var TAG = { WAR: 'WAR', DISCOVERY: 'DISC', COLLAPSE: 'FALL', FOUNDING: 'RISE', CULTURAL: 'CULT', SCIENTIFIC: 'SCI', TRADE: 'TRADE', DISASTER: 'DOOM' };
  function $(id) { return document.getElementById(id); }

  function init(state) {
    ['year-big', 'era-tag', 'pop', 'date-big', 'era-sub', 'civ-list', 'event-list',
      'ticker-track', 'ticker-wrap', 'era-banner', 'alt-banner', 'info-popup', 'seed-label',
      'alt-controls', 'alt-scenario', 'alt-summary', 'btn-play'].forEach(function (id) { el[id] = $(id); });
    wireControls(state);
    // one delegated click listener for the whole civ list (no per-row re-binding)
    el['civ-list'].addEventListener('click', function (e) {
      var row = e.target.closest ? e.target.closest('.civ-row') : null;
      if (row) openInfo(state, row.getAttribute('data-civ'));
    });
    el['seed-label'].textContent = 'SEED ' + App.seedToCode(state.seed);
    refreshControls(state);
  }

  // ---------- control wiring ----------
  function wireControls(state) {
    $('btn-play').addEventListener('click', function () { App.main.togglePlay(); });
    var speeds = document.querySelectorAll('.speed-btn');
    speeds.forEach(function (b) {
      b.addEventListener('click', function () {
        state.speedIndex = parseInt(b.getAttribute('data-i'), 10); App.audio.unlock(); App.audio.click(); refreshControls(state);
      });
    });
    $('jump-go').addEventListener('click', function () { doJump(state); });
    $('jump-input').addEventListener('keydown', function (e) { if (e.key === 'Enter') doJump(state); });

    document.querySelectorAll('.filter-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var t = b.getAttribute('data-type'); state.filters[t] = !state.filters[t]; App.audio.click(); refreshControls(state);
      });
    });
    bindToggle('btn-grid', function () { state.grid = !state.grid; state.dirtyMap = true; return state.grid; });
    bindToggle('btn-trade', function () { state.tradeLayer = !state.tradeLayer; state.dirtyMap = true; return state.tradeLayer; });
    bindToggle('btn-scan', function () { state.scanlines = !state.scanlines; document.body.classList.toggle('scan', state.scanlines); return state.scanlines; });
    bindToggle('btn-mute', function () { state.muted = !state.muted; App.audio.setMuted(state.muted); return !state.muted; });
    $('btn-capture').addEventListener('click', function () { App.main.capture(); });
    $('btn-random').addEventListener('click', function () { App.main.reseed(); });

    $('btn-alt').addEventListener('click', function () {
      App.audio.unlock(); App.audio.click();
      App.altHistory.setMode(state, !state.altHistory.on);
      refreshControls(state);
    });
    el['alt-scenario'].addEventListener('change', function () {
      App.altHistory.setScenario(state, parseInt(el['alt-scenario'].value, 10));
      refreshControls(state);
    });
    // populate scenario dropdown
    App.data.altScenarios.forEach(function (s) {
      var o = document.createElement('option'); o.value = s.id; o.textContent = s.id + '. ' + s.name; el['alt-scenario'].appendChild(o);
    });
    el['alt-scenario'].value = state.altHistory.scenarioId;
  }
  function bindToggle(id, fn) {
    var b = $(id);
    b.addEventListener('click', function () { App.audio.unlock(); var on = fn(); b.classList.toggle('on', !!on); App.audio.click(); });
  }
  function doJump(state) {
    var v = $('jump-input').value.trim(); if (!v) return;
    var m = /^(-?\d[\d,]*)\s*(bc|ad)?$/i.exec(v.replace(/\s+/g, ' '));
    if (!m) return;
    var y = parseInt(m[1].replace(/,/g, ''), 10);
    if (m[2] && m[2].toLowerCase() === 'bc') y = -Math.abs(y);
    App.main.jumpTo(util.clamp(y, CONFIG.startYear, CONFIG.endYear));
  }

  function refreshControls(state) {
    $('btn-play').textContent = state.isPlaying ? '|| PAUSE' : '> PLAY';
    document.querySelectorAll('.speed-btn').forEach(function (b) {
      b.classList.toggle('on', parseInt(b.getAttribute('data-i'), 10) === state.speedIndex);
    });
    document.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.toggle('off', !state.filters[b.getAttribute('data-type')]);
    });
    $('btn-grid').classList.toggle('on', state.grid);
    $('btn-trade').classList.toggle('on', state.tradeLayer);
    $('btn-scan').classList.toggle('on', state.scanlines);
    $('btn-mute').classList.toggle('on', !state.muted);
    var altBtn = $('btn-alt');
    altBtn.classList.toggle('alt-on', state.altHistory.on);
    altBtn.textContent = 'ALT HISTORY: ' + (state.altHistory.on ? 'ON' : 'OFF');
    el['alt-controls'].style.display = state.altHistory.on ? 'block' : 'none';
    document.body.classList.toggle('alt-mode', state.altHistory.on);
    if (el['alt-scenario']) el['alt-scenario'].value = state.altHistory.scenarioId;
    if (state.altHistory.on) {
      var sc = App.altHistory.activeScenario(state);
      el['alt-summary'].textContent = sc.summary || '';
    }
  }

  // ---------- per-frame DOM updates ----------
  function updateTopBar(state) {
    var year = state.currentYear;
    el['year-big'].textContent = util.formatYear(year);
    el['pop'].textContent = 'POP ' + util.formatPop(sim.popAt(year));
    var tag = el['era-tag'];
    if (state.altHistory.on) {
      tag.textContent = 'ALTERNATE TIMELINE';
      tag.style.color = C.amber; tag.style.borderColor = C.amber;
    } else {
      var era = sim.eraAt(year);
      tag.textContent = era.name;
      tag.style.color = era.color; tag.style.borderColor = era.color;
    }
  }

  function civSize(civ, year) {
    var s = sim.growthScale(civ, year), pts = civ.region;
    var minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
    for (var i = 0; i < pts.length; i++) { var p = pts[i]; if (p[0] < minx) minx = p[0]; if (p[0] > maxx) maxx = p[0]; if (p[1] < miny) miny = p[1]; if (p[1] > maxy) maxy = p[1]; }
    return (maxx - minx) * (maxy - miny) * s * s;
  }

  function updateSidePanel(state) {
    var year = state.currentYear;
    el['date-big'].textContent = util.formatYear(year);
    el['era-sub'].textContent = state.altHistory.on ? ('SCENARIO ' + state.altHistory.scenarioId) : sim.eraAt(year).name;

    var civs = (state.runtime && state.runtime.effCivs) || App.data.civs;
    var active = civs.filter(function (c) { return year >= c.start && year <= c.end; });
    active.sort(function (a, b) { return civSize(b, year) - civSize(a, year); });
    var html = '';
    active.slice(0, 16).forEach(function (c) {
      var dying = sim.dyingFactor(c, year) > 0.55;
      html += '<div class="civ-row' + (dying ? ' dying' : '') + '" data-civ="' + c.id + '">' +
        '<span class="sw" style="background:' + c.color + '"></span>' +
        '<span class="cn">' + esc(c.name) + '</span>' +
        (c.altFlag ? '<span class="warn">[!]</span>' : '') + '</div>';
    });
    if (!active.length) html = '<div class="civ-empty">no civilizations yet...</div>';
    el['civ-list'].innerHTML = html;

    var ev = '';
    state.recentEvents.slice(0, 8).forEach(function (e) {
      var col = C[e.type] || '#fff';
      ev += '<div class="ev-row">' +
        '<span class="ev-tag" style="color:' + col + '">[' + (TAG[e.type] || 'EVT') + ']</span> ' +
        '<span class="ev-name">' + esc(e.name) + '</span> ' +
        '<span class="ev-yr">' + util.formatYear(e.year) + '</span></div>';
    });
    el['event-list'].innerHTML = ev || '<div class="civ-empty">...</div>';
  }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  // ---------- ticker ----------
  function tickerPush(text, alt) {
    ticker.items.push((alt ? '[ALT] ' : '') + text);
    if (ticker.items.length > 40) ticker.items.shift();
    ticker.text = ticker.items.join('   ►   ');
    el['ticker-track'].textContent = ticker.text;
    ticker.dirty = true; // measure width lazily in updateTicker (avoid per-event reflow)
  }
  // fill the ticker from recent events so it is never empty (boot / after jump)
  function seedTicker(state) {
    ticker.items = [];
    var r = state.recentEvents.slice(0, 14).reverse();
    r.forEach(function (e) { ticker.items.push('[' + util.formatYear(e.year) + '] ' + (TAG[e.type] || 'EVT') + ': ' + e.name); });
    if (state.altHistory.on) ticker.items.unshift('[ALT] ' + (App.altHistory.activeScenario(state).name || 'ALTERNATE TIMELINE'));
    ticker.text = ticker.items.join('   ►   ');
    el['ticker-track'].textContent = ticker.text;
    ticker.trackW = el['ticker-track'].offsetWidth;
    ticker.wrapW = el['ticker-wrap'].offsetWidth;
    ticker.offset = ticker.wrapW;
    ticker.dirty = false;
  }
  function updateTicker(state, dtMs) {
    if (!ticker.text) return;
    if (ticker.dirty) { ticker.trackW = el['ticker-track'].offsetWidth; ticker.dirty = false; } // one reflow only when text changed
    var speed = CONFIG.speedLevels[state.speedIndex];
    var pxPerSec = 60 + Math.min(260, speed * 14);
    ticker.offset -= pxPerSec * (dtMs / 1000);
    if (ticker.offset < -(ticker.trackW)) { ticker.wrapW = el['ticker-wrap'].offsetWidth; ticker.offset = ticker.wrapW; }
    el['ticker-track'].style.transform = 'translateX(' + ticker.offset + 'px)';
  }

  // ---------- banners ----------
  function showEraBanner(state, nowMs, name) {
    state.eraBanner = { name: name, until: nowMs + CONFIG.eraBannerMs };
    var b = el['era-banner'];
    b.textContent = '*** ENTERING THE ' + name + ' ***';
    b.classList.add('show');
  }
  function tickBanner(state, nowMs) {
    if (state.eraBanner && nowMs > state.eraBanner.until) { state.eraBanner = null; el['era-banner'].classList.remove('show'); }
  }

  // ---------- info popup ----------
  function openInfo(state, civId) {
    var civs = (state.runtime && state.runtime.effCivs) || App.data.civs;
    var civ = null; for (var i = 0; i < civs.length; i++) if (civs[i].id === civId) { civ = civs[i]; break; }
    if (!civ) return;
    state.selectedCiv = civId;
    var active = state.currentYear >= civ.start && state.currentYear <= civ.end;
    var status = active ? ('[*] ACTIVE (' + util.formatYear(state.currentYear) + ')')
      : (state.currentYear < civ.start ? '[ ] NOT YET FOUNDED' : '[x] FALLEN');
    var html = '<div class="ip-head"><span class="sw" style="background:' + civ.color + '"></span>' + esc(civ.name.toUpperCase()) +
      (civ.altFlag ? ' <span class="warn">[!]</span>' : '') + '</div>' +
      '<div class="ip-row">Founded: ' + util.formatYear(civ.start) + '</div>' +
      '<div class="ip-row">Ended: ' + util.formatYear(civ.end) + '</div>' +
      '<div class="ip-row">Capital: ' + esc(civ.capital || '-') + '</div>' +
      '<div class="ip-row">Status: ' + status + '</div>' +
      '<div class="ip-desc">' + esc(civ.description || '') + '</div>' +
      (civ.note ? '<div class="ip-desc alt">[!] ' + esc(civ.note) + '</div>' : '') +
      '<div class="ip-close">[ click anywhere to close ]</div>';
    el['info-popup'].innerHTML = html;
    el['info-popup'].classList.add('show');
  }
  function closeInfo(state) {
    state.selectedCiv = null;
    el['info-popup'].classList.remove('show');
  }

  // ---------- event firing ----------
  function sig(e) {
    var base = { COLLAPSE: 6, FOUNDING: 5, WAR: 5, DISASTER: 5, DISCOVERY: 4, SCIENTIFIC: 4, CULTURAL: 3, TRADE: 3 }[e.type] || 2;
    if (e.canonical) base += 3; if (e.alt) base += 2; if (e.emergent) base -= 1;
    return base;
  }
  function civCenterById(state, id) {
    var civs = (state.runtime && state.runtime.effCivs) || App.data.civs;
    for (var i = 0; i < civs.length; i++) if (civs[i].id === id) return civs[i].label;
    return null;
  }

  var MAX_VISUAL = 6; // markers/labels spawned per advance (rest go to ticker only)
  function handleFired(state, fired, nowMs) {
    if (!fired.length) return null;
    var shown = fired.filter(function (e) { return state.filters[e.type]; });
    if (!shown.length) return null;
    shown.sort(function (a, b) { return sig(b) - sig(a); }); // most significant first
    var best = shown[0];
    shown.forEach(function (e, idx) {
      var visual = idx < MAX_VISUAL && e.location;
      if (visual) {
        state.activeMarkers.push({ location: e.location, type: e.type, bornMs: nowMs });
        state.floatingLabels.push({ text: e.name, color: C[e.type] || '#fff', location: e.location, bornMs: nowMs });
      }
      tickerPush('[' + util.formatYear(e.year) + '] ' + (TAG[e.type] || 'EVT') + ': ' + e.name, !!e.alt);
      if (e.canonical || e.alt || e.emergent || e.type === 'DISASTER' || e.type === 'COLLAPSE') {
        state.recentEvents.unshift(e);
        if (state.recentEvents.length > 24) state.recentEvents.pop();
      }
      if (e.type === 'WAR' && visual) {
        var loc = e.location, a = null, b = null;
        if (e.war) { a = e.war[0]; b = e.war[1]; var ca = civCenterById(state, a), cb = civCenterById(state, b); if (ca && cb) loc = [(ca[0] + cb[0]) / 2, (ca[1] + cb[1]) / 2]; }
        else if (e.civ) { a = e.civ; }
        state.activeWars.push({ a: a, b: b, location: loc, bornMs: nowMs, durMs: 3600 });
      }
      if (e.explore && App.data.explorationRoutes[e.explore]) {
        state.explorations.push({ route: App.data.explorationRoutes[e.explore], bornMs: nowMs, durMs: CONFIG.explorationMs });
      }
    });
    // hard caps so nothing grows unbounded at extreme speed
    cap(state.activeMarkers, 70); cap(state.floatingLabels, 50); cap(state.activeWars, 24); cap(state.explorations, 8);
    return best;
  }
  function cap(arr, n) { if (arr.length > n) arr.splice(0, arr.length - n); }

  // random-event easter egg (R while paused)
  function randomEvent(state, nowMs) {
    var canon = App.data.events;
    var e = canon[Math.floor(App.makeRng((state.seed ^ Math.floor(state.currentYear)) >>> 0).next() * canon.length)];
    var ev = { year: state.currentYear, name: e.name, type: e.type, location: e.location, description: e.description, canonical: true };
    var best = handleFired(state, [ev], nowMs);
    if (best && !state.muted) App.audio.forEvent(best.type);
    updateSidePanel(state);
  }

  App.ui = {
    init: init, refreshControls: refreshControls, updateTopBar: updateTopBar,
    updateSidePanel: updateSidePanel, updateTicker: updateTicker, tickerPush: tickerPush,
    showEraBanner: showEraBanner, tickBanner: tickBanner, openInfo: openInfo, closeInfo: closeInfo,
    handleFired: handleFired, randomEvent: randomEvent, seedTicker: seedTicker
  };
})(typeof window !== 'undefined' ? window : globalThis);
