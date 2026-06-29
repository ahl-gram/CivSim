/* audio.js - retro square-wave bleeps via Web Audio API. Unlocked on first
 * user gesture (autoplay policy). One sound per frame is enforced by the caller. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var ctx = null, muted = false;

  function unlock() {
    try {
      if (!ctx) { var AC = root.AudioContext || root.webkitAudioContext; if (AC) ctx = new AC(); }
      if (ctx && ctx.state === 'suspended') ctx.resume();
    } catch (e) {}
  }
  function setMuted(m) { muted = m; }
  function isMuted() { return muted; }

  function tone(freq, startOffset, dur, type, peak) {
    if (!ctx || muted) return;
    var t0 = ctx.currentTime + startOffset;
    var osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = type || 'square';
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak || 0.12, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  }
  function slide(f0, f1, dur, peak) {
    if (!ctx || muted) return;
    var t0 = ctx.currentTime;
    var osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(f0, t0);
    osc.frequency.linearRampToValueAtTime(f1, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak || 0.12, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  }

  function boop() { tone(440, 0, 0.08, 'square', 0.1); }
  function founded() { slide(440, 880, 0.16, 0.12); }
  function collapsed() { slide(440, 220, 0.22, 0.13); }
  function war() { tone(180, 0, 0.10, 'square', 0.13); tone(150, 0.06, 0.10, 'square', 0.12); }
  function disaster() { slide(330, 110, 0.3, 0.14); }
  function discovery() { tone(880, 0, 0.06, 'triangle', 0.1); tone(1320, 0.05, 0.07, 'triangle', 0.09); }
  function era() { tone(523, 0, 0.12, 'square', 0.12); tone(659, 0.12, 0.12, 'square', 0.12); tone(784, 0.24, 0.20, 'square', 0.13); }
  function click() { tone(660, 0, 0.03, 'square', 0.06); }

  // pick a sound for an event type
  function forEvent(type) {
    switch (type) {
      case 'FOUNDING': founded(); break;
      case 'COLLAPSE': collapsed(); break;
      case 'WAR': war(); break;
      case 'DISASTER': disaster(); break;
      case 'DISCOVERY': case 'SCIENTIFIC': discovery(); break;
      default: boop();
    }
  }

  App.audio = {
    unlock: unlock, setMuted: setMuted, isMuted: isMuted,
    boop: boop, founded: founded, collapsed: collapsed, war: war,
    disaster: disaster, discovery: discovery, era: era, click: click, forEvent: forEvent
  };
})(typeof window !== 'undefined' ? window : globalThis);
