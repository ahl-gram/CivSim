/* rng.js - seeded deterministic PRNG. Same seed => same procedural run.
 * Default seed comes from crypto (or URL ?seed=), but ALL simulation
 * randomness flows through this module so a run is reproducible/shareable. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});

  function xmur3(str) {
    var h = 1779033703 ^ str.length;
    for (var i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return h >>> 0;
    };
  }

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Build a small RNG object around a numeric seed.
  function makeRng(seed) {
    var rand = mulberry32(seed >>> 0);
    return {
      seed: seed >>> 0,
      next: function () { return rand(); },
      range: function (a, b) { return a + rand() * (b - a); },
      int: function (a, b) { return Math.floor(a + rand() * (b - a + 1)); },
      pick: function (arr) { return arr[Math.floor(rand() * arr.length)]; },
      chance: function (p) { return rand() < p; },
      shuffle: function (arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
          var j = Math.floor(rand() * (i + 1));
          var t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
      },
      // deterministic independent sub-stream keyed by label
      fork: function (label) {
        return makeRng((seed ^ xmur3(String(label))()) >>> 0);
      }
    };
  }

  function pickInitialSeed() {
    // URL override first (browser only), then crypto, then time-free fallback.
    try {
      if (typeof location !== 'undefined' && location.search) {
        var m = /[?&]seed=([0-9a-zA-Z]+)/.exec(location.search);
        if (m) {
          var n = parseInt(m[1], 36);
          if (!isNaN(n)) return n >>> 0;
        }
      }
    } catch (e) {}
    try {
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        var buf = new Uint32Array(1);
        crypto.getRandomValues(buf);
        return buf[0] >>> 0;
      }
    } catch (e2) {}
    return (xmur3(String((typeof performance !== 'undefined' ? performance.now() : 1) + ':' + Math.E))()) >>> 0;
  }

  function seedToCode(seed) { return (seed >>> 0).toString(36).toUpperCase(); }

  App.makeRng = makeRng;
  App.pickInitialSeed = pickInitialSeed;
  App.seedToCode = seedToCode;
  App._rngInternals = { xmur3: xmur3, mulberry32: mulberry32 };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { makeRng: makeRng, xmur3: xmur3, mulberry32: mulberry32, seedToCode: seedToCode };
  }
})(typeof window !== 'undefined' ? window : globalThis);
