/* input.js - keyboard shortcuts + canvas mouse interaction. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});

  function init(state, fxCanvas) {
    document.addEventListener('keydown', function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
      switch (e.key) {
        case ' ': case 'Spacebar': e.preventDefault(); App.main.togglePlay(); break;
        case '+': case '=': App.main.changeSpeed(1); break;
        case '-': case '_': App.main.changeSpeed(-1); break;
        case 'ArrowLeft': App.main.step(-500); break;
        case 'ArrowRight': App.main.step(500); break;
        case 'Home': App.main.jumpTo(App.CONFIG.startYear); break;
        case 'End': App.main.jumpTo(App.CONFIG.endYear); break;
        case 'r': case 'R': if (!state.isPlaying) { App.audio.unlock(); App.ui.randomEvent(state, performance.now()); } break;
        case 'Escape': App.ui.closeInfo(state); break;
        default: return;
      }
    });

    fxCanvas.addEventListener('click', function (e) {
      App.audio.unlock();
      var rect = fxCanvas.getBoundingClientRect();
      var mx = e.clientX - rect.left, my = e.clientY - rect.top;
      var id = App.render.hitCiv(state, mx, my);
      if (id) { App.audio.click(); App.ui.openInfo(state, id); }
      else App.ui.closeInfo(state);
    });
    fxCanvas.addEventListener('mousemove', function (e) {
      var rect = fxCanvas.getBoundingClientRect();
      var id = App.render.hitCiv(state, e.clientX - rect.left, e.clientY - rect.top);
      fxCanvas.style.cursor = id ? 'pointer' : 'crosshair';
    });

    // clicking the popup closes it (per "click anywhere to close")
    var pop = document.getElementById('info-popup');
    if (pop) pop.addEventListener('click', function () { App.ui.closeInfo(state); });

    var rt;
    root.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { App.render.resize(); state.dirtyMap = true; }, 120);
    });
  }

  App.input = { init: init };
})(typeof window !== 'undefined' ? window : globalThis);
