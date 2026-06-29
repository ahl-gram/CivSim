/* data-eras.js - eras (verbatim from spec) + global population anchor points. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});

  var eras = [
    { start: -40000, name: 'STONE AGE', color: '#888888' },
    { start: -3200, name: 'BRONZE AGE', color: '#CD7F32' },
    { start: -1200, name: 'IRON AGE', color: '#9a9a9a' },
    { start: -500, name: 'CLASSICAL ERA', color: '#4169E1' },
    { start: 500, name: 'DARK AGES', color: '#6a6a6a' },
    { start: 1000, name: 'MEDIEVAL', color: '#8B0000' },
    { start: 1400, name: 'RENAISSANCE', color: '#DAA520' },
    { start: 1700, name: 'INDUSTRIAL', color: '#708090' },
    { start: 1900, name: 'MODERN ERA', color: '#00CED1' },
    { start: 2000, name: 'INFORMATION AGE', color: '#7B68EE' }
  ];

  // [year, population] anchor points (people). Interpolated log-linearly in sim.
  var population = [
    [-40000, 1e6], [-10000, 5e6], [-3000, 14e6], [-1000, 50e6],
    [1, 300e6], [1000, 310e6], [1500, 500e6], [1800, 1e9],
    [1900, 1.65e9], [1927, 2e9], [1960, 3e9], [1974, 4e9],
    [1987, 5e9], [1999, 6e9], [2011, 7e9], [2023, 8e9], [2025, 8.1e9]
  ];

  App.data = App.data || {};
  App.data.eras = eras;
  App.data.population = population;

  if (typeof module !== 'undefined' && module.exports) { module.exports = { eras: eras, population: population }; }
})(typeof window !== 'undefined' ? window : globalThis);
