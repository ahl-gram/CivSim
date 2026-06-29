/* render.js - all canvas drawing. Two on-screen layers: a base map (terrain +
 * civs + grid + trade) and an fx overlay (markers, labels, wars, voyages,
 * comets). The truly-static terrain is cached to an offscreen canvas and only
 * rebuilt when dirty (resize / grid toggle). Coords are [x%,y%] -> pixels. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var C = App.COLORS, CONFIG = App.CONFIG, util = App.util, sim = App.sim, proc = App.proc;

  var mapCanvas, fxCanvas, mctx, fctx, W = 900, H = 520, dpr = 1;
  var staticCanvas = null, sctx = null;

  // ---- color helpers ----
  function hx(h) { h = h.replace('#', ''); if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function rgba(c, a) { var r = hx(c); return 'rgba(' + r[0] + ',' + r[1] + ',' + r[2] + ',' + a + ')'; }
  function desat(c, amt) { var r = hx(c); var g = 0.32 * r[0] + 0.55 * r[1] + 0.13 * r[2]; return 'rgb(' + Math.round(util.lerp(r[0], g, amt)) + ',' + Math.round(util.lerp(r[1], g, amt)) + ',' + Math.round(util.lerp(r[2], g, amt)) + ')'; }
  function brighten(c, amt) { var r = hx(c); return 'rgb(' + Math.round(util.clamp(r[0] + 255 * amt, 0, 255)) + ',' + Math.round(util.clamp(r[1] + 255 * amt, 0, 255)) + ',' + Math.round(util.clamp(r[2] + 255 * amt, 0, 255)) + ')'; }
  function colToRgba(col, a) {
    if (col.indexOf('#') === 0) return rgba(col, a);
    var m = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(col);
    return m ? 'rgba(' + m[1] + ',' + m[2] + ',' + m[3] + ',' + a + ')' : col;
  }

  function px(p) { return [p[0] / 100 * W, p[1] / 100 * H]; }

  function init(map, fx) {
    mapCanvas = map; fxCanvas = fx;
    mctx = map.getContext('2d', { alpha: false });
    fctx = fx.getContext('2d', { alpha: true });
    resize();
  }
  function resize() {
    var rect = mapCanvas.parentNode.getBoundingClientRect();
    dpr = Math.min(2, root.devicePixelRatio || 1);
    W = Math.max(320, Math.floor(rect.width));
    H = Math.max(240, Math.floor(rect.height));
    [mapCanvas, fxCanvas].forEach(function (cv) {
      cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    });
    mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    staticCanvas = null; // force rebuild of the cached base layer
  }

  // ---- geometry helpers ----
  function poly(ctx, pts) {
    ctx.beginPath();
    var p0 = px(pts[0]); ctx.moveTo(p0[0], p0[1]);
    for (var i = 1; i < pts.length; i++) { var p = px(pts[i]); ctx.lineTo(p[0], p[1]); }
    ctx.closePath();
  }
  function centroidPct(pts) { var x = 0, y = 0; for (var i = 0; i < pts.length; i++) { x += pts[i][0]; y += pts[i][1]; } return [x / pts.length, y / pts.length]; }
  function scaled(pts, s) {
    var c = centroidPct(pts), out = [];
    for (var i = 0; i < pts.length; i++) out.push([c[0] + (pts[i][0] - c[0]) * s, c[1] + (pts[i][1] - c[1]) * s]);
    return out;
  }
  function bboxPx(pts) {
    var minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9;
    for (var i = 0; i < pts.length; i++) { var p = px(pts[i]); if (p[0] < minx) minx = p[0]; if (p[0] > maxx) maxx = p[0]; if (p[1] < miny) miny = p[1]; if (p[1] > maxy) maxy = p[1]; }
    return { w: maxx - minx, h: maxy - miny, cx: (minx + maxx) / 2, cy: (miny + maxy) / 2 };
  }
  function pointInPoly(pt, pts) {
    var x = pt[0], y = pt[1], inside = false;
    for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      var xi = pts[i][0], yi = pts[i][1], xj = pts[j][0], yj = pts[j][1];
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }
  function h01(n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  // per-seed, per-civ variation so the MAP itself differs run to run (size + breathing)
  function civJitter(state, civ) {
    if (civ._jSeed === state.seed && civ._j) return civ._j;
    var r = App.makeRng((state.seed ^ hashStr(civ.id)) >>> 0);
    civ._j = { sizeMul: 0.9 + r.next() * 0.18, phase: r.next() * Math.PI * 2, amp: 0.012 + r.next() * 0.03 };
    civ._jSeed = state.seed;
    return civ._j;
  }

  // ===================== STATIC BASE (cached) =====================
  function drawOcean(ctx) {
    ctx.fillStyle = C.ocean; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = rgba(C.oceanDither, 0.5);
    for (var y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);
  }
  function drawTerrain(ctx) {
    var g = App.geo;
    ctx.fillStyle = C.land;
    g.CONTINENTS.forEach(function (c) { poly(ctx, g.path(c.pts)); ctx.fill(); });
    ctx.fillStyle = rgba(C.landHi, 0.25);
    g.CONTINENTS.forEach(function (c) { poly(ctx, g.path(c.pts)); ctx.fill(); });
    ctx.fillStyle = rgba(C.desert, 0.85);
    g.DESERTS.forEach(function (d) { poly(ctx, g.path(d.pts)); ctx.fill(); });
    ctx.fillStyle = rgba(C.tundra, 0.7);
    g.TUNDRA.forEach(function (t) { poly(ctx, g.path(t.pts)); ctx.fill(); });
    drawMountains(ctx, g);
  }
  function drawMountains(ctx, g) {
    g.MOUNTAINS.forEach(function (m, mi) {
      var c = px(g.ll(m.c[0], m.c[1]));
      for (var i = 0; i < m.n; i++) {
        var t = (i / Math.max(1, m.n - 1)) - 0.5, jitter = (h01(mi * 31 + i) - 0.5), ox, oy;
        if (m.vertical) { ox = jitter * 10; oy = t * m.spread * 8; } else { ox = t * m.spread * 9; oy = jitter * 10; }
        var bx = c[0] + ox, by = c[1] + oy, s = 5 + h01(mi * 7 + i) * 5;
        ctx.fillStyle = C.mountain;
        ctx.beginPath(); ctx.moveTo(bx - s, by + s); ctx.lineTo(bx, by - s); ctx.lineTo(bx + s, by + s); ctx.closePath(); ctx.fill();
        ctx.fillStyle = C.mountainHi;
        ctx.beginPath(); ctx.moveTo(bx, by - s); ctx.lineTo(bx + s * 0.45, by + s * 0.1); ctx.lineTo(bx - s * 0.1, by + s * 0.1); ctx.closePath(); ctx.fill();
      }
    });
  }
  function drawGrid(ctx) {
    ctx.strokeStyle = rgba(C.grid, 0.5); ctx.lineWidth = 1;
    var g = App.geo, lat, lon, p;
    for (lon = -180; lon <= 180; lon += 30) {
      ctx.beginPath(); for (lat = 84; lat >= -58; lat -= 4) { p = px(g.ll(lat, lon)); if (lat === 84) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); } ctx.stroke();
    }
    for (lat = 80; lat >= -40; lat -= 20) {
      ctx.beginPath(); for (lon = -170; lon <= 190; lon += 6) { p = px(g.ll(lat, lon)); if (lon === -170) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); } ctx.stroke();
    }
  }
  function buildStatic(state) {
    if (!staticCanvas) { staticCanvas = document.createElement('canvas'); }
    staticCanvas.width = W * dpr; staticCanvas.height = H * dpr;
    sctx = staticCanvas.getContext('2d'); sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawOcean(sctx); drawTerrain(sctx); if (state.grid) drawGrid(sctx);
  }

  // ===================== DYNAMIC MAP =====================
  function drawTradeRoutes(ctx, year) {
    App.data.tradeRoutes.forEach(function (tr) {
      if (year < tr.start || year > tr.end) return;
      ctx.strokeStyle = rgba(tr.color, 0.8); ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
      ctx.beginPath(); var p0 = px(tr.points[0]); ctx.moveTo(p0[0], p0[1]);
      for (var i = 1; i < tr.points.length; i++) { var p = px(tr.points[i]); ctx.lineTo(p[0], p[1]); }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = rgba(tr.color, 0.9);
      tr.points.forEach(function (pt) { var p = px(pt); ctx.fillRect(p[0] - 2, p[1] - 2, 4, 4); });
    });
  }

  function warSet(state) {
    var set = {};
    state.activeWars.forEach(function (w) { if (w.a) set[w.a] = 1; if (w.b) set[w.b] = 1; });
    return set;
  }

  function drawCivShape(ctx, pts, scale, fill, border, dashed, glow, holding) {
    var sp = scaled(pts, scale);
    if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = 14; } else ctx.shadowBlur = 0;
    ctx.fillStyle = fill; poly(ctx, sp); ctx.fill(); ctx.shadowBlur = 0;
    ctx.lineWidth = holding ? 1.5 : 2; ctx.strokeStyle = border;
    if (holding) ctx.setLineDash([2, 3]); else if (dashed) ctx.setLineDash([7, 5]); else ctx.setLineDash([]);
    poly(ctx, sp); ctx.stroke(); ctx.setLineDash([]);
  }

  function drawCivs(state, nowMs) {
    var year = state.currentYear;
    var civs = (state.runtime && state.runtime.effCivs) || App.data.civs;
    var wars = warSet(state);

    // decorate (compute scale + bbox once per civ this frame)
    var list = [];
    for (var i = 0; i < civs.length; i++) {
      var c = civs[i]; if (year < c.start || year > c.end) continue;
      var j = civJitter(state, c);
      var gs = sim.growthScale(c, year) * j.sizeMul;
      var golden = proc.goldenAt(state, c.id, year), plague = proc.plagueAt(state, c.id, year);
      if (golden) gs *= 1.05; if (plague) gs *= 0.85;
      var scale = gs * (1 + j.amp * Math.sin(nowMs / 900 + j.phase));
      list.push({ civ: c, scale: scale, bb: bboxPx(scaled(c.region, scale)), golden: golden, plague: plague });
    }
    list.sort(function (a, b) { return b.bb.w - a.bb.w; });

    // fills (largest first so small civs sit on top)
    list.forEach(function (it) {
      var c = it.civ, scale = it.scale;
      var alpha = 0.4, pk = sim.peakProximity(c, year);
      if (pk > 0) alpha = util.lerp(0.4, 0.64, pk);
      if (it.golden) alpha = Math.min(0.74, alpha + 0.12);
      var dyf = sim.dyingFactor(c, year);
      if (dyf > 0) alpha *= (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(nowMs / 140)));
      var col = c.color;
      if (c.desaturate) col = desat(col, 0.45); else if (c.alt) col = brighten(col, 0.08);
      if (it.plague) col = desat(col, 0.5);
      var atWar = wars[c.id], fill, border, glow = null;
      if (atWar) { var rp = 0.5 + 0.5 * Math.sin(nowMs / 110); fill = rgba('#ff3030', 0.22 + 0.25 * rp); border = rgba('#ff5050', 0.9); }
      else { fill = colToRgba(col, alpha); border = colToRgba(col, 0.85); if (pk > 0.5 || it.golden) glow = colToRgba(col, 0.9); }
      var dashed = !!c.alt;
      drawCivShape(mctx, c.region, scale, fill, border, dashed, glow, false);
      if (c.holdings) c.holdings.forEach(function (h) {
        if (!h || h.length < 3) return;
        var hf = colToRgba(atWar ? '#ff3030' : col, (atWar ? 0.3 : alpha) * 0.6);
        var hb = colToRgba(atWar ? '#ff5050' : col, 0.7);
        drawCivShape(mctx, h, scale, hf, hb, dashed, null, true);
      });
    });

    // labels with greedy de-collision (largest civ wins the spot)
    mctx.textAlign = 'center'; mctx.textBaseline = 'middle';
    mctx.font = "7px 'Press Start 2P', monospace";
    var placed = [];
    list.forEach(function (it) {
      var c = it.civ, bb = it.bb;
      if (bb.w < 46 || bb.h < 16) return;
      var lp = px(c.label);
      var name = c.name.length > 18 ? c.name.slice(0, 17) + '.' : c.name;
      var w = mctx.measureText(name).width;
      var rect = { x: lp[0] - w / 2, y: lp[1] - 5, w: w, h: 10 };
      var clash = false;
      for (var k = 0; k < placed.length; k++) {
        var p = placed[k];
        if (rect.x < p.x + p.w && rect.x + rect.w > p.x && rect.y < p.y + p.h && rect.y + rect.h > p.y) { clash = true; break; }
      }
      if (clash) return;
      placed.push(rect);
      mctx.fillStyle = 'rgba(0,0,0,0.85)'; mctx.fillText(name, lp[0] + 1.5, lp[1] + 1.5);
      mctx.fillStyle = c.altFlag ? C.amber : '#ffffff'; mctx.fillText(name, lp[0], lp[1]);
    });
  }

  function drawMap(state, nowMs) {
    if (state.dirtyMap || !staticCanvas) { buildStatic(state); state.dirtyMap = false; }
    mctx.drawImage(staticCanvas, 0, 0, W, H);
    if (state.tradeLayer) drawTradeRoutes(mctx, state.currentYear);
    drawCivs(state, nowMs);
  }

  // ===================== FX OVERLAY =====================
  function clearFx() { fctx.clearRect(0, 0, W, H); }
  function typeColor(t) { return C[t] || '#ffffff'; }

  function drawSword(x, y, s, alpha) {
    fctx.save(); fctx.translate(x, y); fctx.globalAlpha = alpha;
    fctx.strokeStyle = '#ffffff'; fctx.lineWidth = 2;
    fctx.beginPath(); fctx.moveTo(-s, s); fctx.lineTo(s, -s); fctx.stroke();
    fctx.beginPath(); fctx.moveTo(s, s); fctx.lineTo(-s, -s); fctx.stroke();
    fctx.strokeStyle = '#ff3030'; fctx.lineWidth = 1;
    fctx.beginPath(); fctx.moveTo(-s, s); fctx.lineTo(s, -s); fctx.stroke();
    fctx.beginPath(); fctx.moveTo(s, s); fctx.lineTo(-s, -s); fctx.stroke();
    fctx.restore();
  }

  function drawMarkers(state, nowMs) {
    state.activeMarkers.forEach(function (m) {
      if (!m.location) return;
      var age = (nowMs - m.bornMs) / 2600; if (age < 0 || age > 1) return;
      var p = px(m.location), col = typeColor(m.type), ring = 4 + age * 26, a = (1 - age);
      fctx.strokeStyle = rgba(col, 0.8 * a); fctx.lineWidth = 2;
      fctx.beginPath(); fctx.arc(p[0], p[1], ring, 0, Math.PI * 2); fctx.stroke();
      fctx.fillStyle = rgba(col, a);
      fctx.beginPath(); fctx.arc(p[0], p[1], 3.5, 0, Math.PI * 2); fctx.fill();
    });
  }
  function drawWars(state, nowMs) {
    state.activeWars.forEach(function (w) {
      if (!w.location) return;
      var age = (nowMs - w.bornMs) / w.durMs; if (age < 0 || age > 1) return;
      var p = px(w.location), s = 7 + 3 * Math.sin(nowMs / 90);
      drawSword(p[0], p[1], s, 1 - age);
    });
  }
  function drawExplorations(state, nowMs) {
    state.explorations.forEach(function (ex) {
      var age = (nowMs - ex.bornMs) / ex.durMs; if (age < 0) return; var pts = ex.route.points, prog = Math.min(1, age);
      fctx.strokeStyle = rgba(ex.route.color, age > 1 ? Math.max(0, 1.4 - age) : 0.95);
      fctx.lineWidth = 2; fctx.setLineDash([2, 4]);
      var total = pts.length - 1, upto = prog * total;
      fctx.beginPath(); var p0 = px(pts[0]); fctx.moveTo(p0[0], p0[1]);
      for (var i = 1; i < pts.length; i++) {
        var p = px(pts[i]);
        if (upto >= i) fctx.lineTo(p[0], p[1]);
        else if (upto > i - 1) { var f = upto - (i - 1), a = px(pts[i - 1]); fctx.lineTo(a[0] + (p[0] - a[0]) * f, a[1] + (p[1] - a[1]) * f); break; }
        else break;
      }
      fctx.stroke(); fctx.setLineDash([]);
      if (prog < 1) { var ip = lerpPath(pts, prog); fctx.fillStyle = '#ffffff'; fctx.fillRect(ip[0] - 2, ip[1] - 2, 4, 4); }
    });
  }
  function lerpPath(pts, prog) {
    var total = pts.length - 1, upto = prog * total, seg = Math.min(total - 1, Math.floor(upto)), f = upto - seg;
    var a = px(pts[seg]), b = px(pts[seg + 1]);
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  }
  function drawComets(state, nowMs) {
    state.ambient.forEach(function (cm) {
      var age = (nowMs - cm.bornMs) / cm.durMs; if (age < 0 || age > 1) return;
      var x = cm.x0 + (cm.x1 - cm.x0) * age, y = cm.y0 + (cm.y1 - cm.y0) * age;
      var tx = x - (cm.x1 - cm.x0) * 0.08, ty = y - (cm.y1 - cm.y0) * 0.08;
      var grad = fctx.createLinearGradient(x, y, tx, ty);
      grad.addColorStop(0, 'rgba(255,255,255,' + (1 - age) + ')');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      fctx.strokeStyle = grad; fctx.lineWidth = 2;
      fctx.beginPath(); fctx.moveTo(x, y); fctx.lineTo(tx, ty); fctx.stroke();
      fctx.fillStyle = 'rgba(255,255,255,' + (1 - age) + ')'; fctx.fillRect(x - 1, y - 1, 2, 2);
    });
  }
  function drawFloatLabels(state, nowMs) {
    fctx.textAlign = 'center'; fctx.textBaseline = 'middle';
    fctx.font = "6px 'Press Start 2P', monospace";
    state.floatingLabels.forEach(function (fl) {
      if (!fl.location) return;
      var age = (nowMs - fl.bornMs) / CONFIG.floatLabelMs; if (age < 0 || age > 1) return;
      var p = px(fl.location), y = p[1] - 14 - age * 22, a = 1 - age;
      var txt = fl.text.length > 26 ? fl.text.slice(0, 25) + '.' : fl.text;
      fctx.fillStyle = 'rgba(0,0,0,' + (0.85 * a) + ')'; fctx.fillText(txt, p[0] + 1, y + 1);
      fctx.fillStyle = rgba(fl.color, a); fctx.fillText(txt, p[0], y);
    });
  }
  function drawSelection(state) {
    if (!state.selectedCiv) return;
    var civs = (state.runtime && state.runtime.effCivs) || App.data.civs, civ = null;
    for (var i = 0; i < civs.length; i++) if (civs[i].id === state.selectedCiv) { civ = civs[i]; break; }
    if (!civ || state.currentYear < civ.start || state.currentYear > civ.end) return;
    var scale = sim.growthScale(civ, state.currentYear) * civJitter(state, civ).sizeMul;
    fctx.strokeStyle = '#ffffff'; fctx.lineWidth = 2; fctx.setLineDash([3, 3]);
    var sp = scaled(civ.region, scale);
    fctx.beginPath(); var p0 = px(sp[0]); fctx.moveTo(p0[0], p0[1]);
    for (var k = 1; k < sp.length; k++) { var p = px(sp[k]); fctx.lineTo(p[0], p[1]); }
    fctx.closePath(); fctx.stroke(); fctx.setLineDash([]);
  }

  function drawFx(state, nowMs) {
    clearFx();
    drawExplorations(state, nowMs);
    drawWars(state, nowMs);
    drawMarkers(state, nowMs);
    drawComets(state, nowMs);
    drawSelection(state);
    drawFloatLabels(state, nowMs);
  }

  function frame(state, nowMs) { drawMap(state, nowMs); drawFx(state, nowMs); }

  function hitCiv(state, mxPx, myPx) {
    var pctX = mxPx / W * 100, pctY = myPx / H * 100;
    var civs = (state.runtime && state.runtime.effCivs) || App.data.civs, year = state.currentYear;
    var hits = civs.filter(function (c) { return year >= c.start && year <= c.end; });
    hits.sort(function (a, b) { return bboxPx(a.region).w - bboxPx(b.region).w; });
    for (var i = 0; i < hits.length; i++) {
      var civ = hits[i], scale = sim.growthScale(civ, year) * civJitter(state, civ).sizeMul;
      if (pointInPoly([pctX, pctY], scaled(civ.region, scale))) return civ.id;
      if (civ.holdings) for (var h = 0; h < civ.holdings.length; h++) {
        if (civ.holdings[h] && civ.holdings[h].length >= 3 && pointInPoly([pctX, pctY], scaled(civ.holdings[h], scale))) return civ.id;
      }
    }
    return null;
  }

  function size() { return { W: W, H: H }; }

  App.render = { init: init, resize: resize, frame: frame, hitCiv: hitCiv, size: size, colors: { rgba: rgba, desat: desat } };
})(typeof window !== 'undefined' ? window : globalThis);
