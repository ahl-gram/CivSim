/* core.js - global namespace, config, palette, central state, small utilities.
 * Loaded first. Everything attaches to window.App. No external deps. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});

  // ---- Palette (1990s VGA / DOS strategy game) ----
  var COLORS = {
    bg: '#000014',
    ocean: '#0a1a5c',
    oceanDither: '#0d2070',
    land: '#1a3a0a',
    landHi: '#23500f',
    mountain: '#3a3a3a',
    mountainHi: '#555555',
    desert: '#6b5010',
    tundra: '#d0d8e8',
    coast: '#0e2a72',
    uiPanel: '#000080',
    uiPanelDark: '#000050',
    uiBorder: '#ffffff',
    uiBorderDim: '#8a8ad0',
    text: '#ffffff',
    textDim: '#9a9ad8',
    amber: '#ffb000',
    amberDim: '#7a5400',
    grid: '#1b3aa0',
    // event type colors
    WAR: '#ff3030',
    DISCOVERY: '#30ffff',
    COLLAPSE: '#ff7a1a',
    FOUNDING: '#ffe83a',
    CULTURAL: '#ff45ff',
    SCIENTIFIC: '#49a8ff',
    TRADE: '#d9a520',
    DISASTER: '#ff3b0a'
  };

  var EVENT_ICONS = {
    WAR: 'swords',
    DISCOVERY: 'scope',
    COLLAPSE: 'burst',
    FOUNDING: 'temple',
    CULTURAL: 'mask',
    SCIENTIFIC: 'atom',
    TRADE: 'coin',
    DISASTER: 'volcano'
  };

  var CONFIG = {
    colors: COLORS,
    eventIcons: EVENT_ICONS,
    // Equirectangular view window (frames the inhabited world, drops empty poles).
    view: { latTop: 84, latBot: -58, lonLeft: -170, lonRight: 190 },
    startYear: -40000,
    endYear: 2025,
    speedLevels: [0.5, 1, 2, 5, 10, 50, 200],
    defaultSpeedIndex: 2, // 2x
    // At 1x => 100 sim-years per real second (per spec).
    simYearsPerSecondAt1x: 100,
    eraBannerMs: 2600,
    floatLabelMs: 3000,
    markerActiveYears: 8,   // event marker visible within +/- this many sim years
    warPulseYears: 10,
    explorationMs: 3000,
    maxRecentEvents: 8,
    autoRampPrehistory: true // speed up through empty stretches
  };

  App.CONFIG = CONFIG;
  App.COLORS = COLORS;

  // ---- small pure utilities ----
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function invLerp(a, b, v) { return (b - a) === 0 ? 0 : (v - a) / (b - a); }

  function formatYear(y) {
    y = Math.round(y);
    if (y < 0) return Math.abs(y).toLocaleString('en-US') + ' BC';
    if (y === 0) return '1 BC';
    return y.toLocaleString('en-US') + ' AD';
  }

  function formatPop(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1e3) return Math.round(n / 1e3) + 'K';
    return Math.round(n) + '';
  }

  var util = { clamp: clamp, lerp: lerp, invLerp: invLerp, formatYear: formatYear, formatPop: formatPop };
  App.util = util;

  // ---- central mutable state factory ----
  function createState() {
    return {
      seed: 0,
      currentYear: CONFIG.startYear,
      isPlaying: false,
      speedIndex: CONFIG.defaultSpeedIndex,
      muted: false,
      scanlines: true,
      grid: false,
      tradeLayer: false,
      booting: true,
      filters: {
        WAR: true, DISCOVERY: true, COLLAPSE: true, FOUNDING: true,
        CULTURAL: true, SCIENTIFIC: true, TRADE: true, DISASTER: true
      },
      altHistory: { on: false, scenarioId: 1, savedYear: null },
      selectedCiv: null,
      // transient animation collections
      activeMarkers: [],     // {event, bornAt(real ms), x,y}
      floatingLabels: [],     // {text,color,x,y,bornAt}
      activeWars: [],         // {a,b,startYear,endYear,x,y,...}
      explorations: [],       // {route, startReal, durMs}
      ambient: [],            // ambient particles (migration dots, comets...)
      recentEvents: [],       // last N fired events (for side panel)
      tickerItems: [],        // queued ticker entries
      eraBanner: null,        // {name,color,until(real ms),alt}
      lastEraName: null,
      // procedural (seeded) layers, filled by procedural.js
      proc: { flavorEvents: [], emergentWars: [], goldenAges: [], plagues: [], settlements: [], ambientSchedule: [] },
      firedKeys: Object.create(null), // keys of events already fired this pass
      lastYear: CONFIG.startYear,
      hoverCiv: null,
      dirtyMap: true
    };
  }
  App.createState = createState;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG: CONFIG, COLORS: COLORS, util: util, createState: createState };
  }
})(typeof window !== 'undefined' ? window : globalThis);
