/* geo.js - equirectangular projection, blocky "gamey" continent outlines,
 * mountain ranges, terrain overlays, and the canonical LANDMARK table.
 *
 * Everything geographic is authored here in real [lat, lon] and projected
 * through ll(). Downstream data files reference LANDMARKS by NAME and build
 * regions with box()/poly() so coordinates never drift between files. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var view = (App.CONFIG && App.CONFIG.view) || { latTop: 84, latBot: -58, lonLeft: -170, lonRight: 190 };

  // [lat, lon] -> [x%, y%] within the framed view window.
  function ll(lat, lon) {
    var x = (lon - view.lonLeft) / (view.lonRight - view.lonLeft) * 100;
    var y = (view.latTop - lat) / (view.latTop - view.latBot) * 100;
    return [x, y];
  }
  // project an array of [lat,lon] pairs
  function path(pairs) {
    var out = [];
    for (var i = 0; i < pairs.length; i++) out.push(ll(pairs[i][0], pairs[i][1]));
    return out;
  }

  // ---- Named landmarks: [lat, lon]. Single source of truth for locations. ----
  var LM = {
    // river-valley / near east
    nile: [26, 31], memphis: [29.85, 31.25], thebes: [25.7, 32.6],
    sumer: [31.5, 46], babylon: [32.5, 44.4], mesopotamia: [33, 44],
    indus: [27, 68], harappa: [30.6, 72.9], ganges: [25.4, 81.9],
    anatolia: [39, 33], gobekli: [37.2, 38.9], crete: [35.2, 25],
    aegean: [38, 24], athens: [37.97, 23.7], sparta: [37, 22.4],
    rome: [41.9, 12.5], carthage: [36.85, 10.3], italy: [42, 13],
    jerusalem: [31.78, 35.2], judea: [31.7, 35.2], mecca: [21.4, 39.8],
    persia: [32.4, 53], persepolis: [29.9, 52.9], ctesiphon: [33.1, 44.6],
    constantinople: [41, 28.97], byzantium: [41, 29],
    // east + south asia
    xian: [34.3, 108.9], beijing: [39.9, 116.4], luoyang: [34.6, 112.4],
    nanjing: [32, 118.8], changan: [34.3, 108.9], china: [34, 110],
    japan: [35.7, 139.7], kyoto: [35, 135.8], jomon: [38, 140],
    angkor: [13.4, 103.9], khmer: [13, 104], srivijaya: [-3, 104.7],
    delhi: [28.6, 77.2], pataliputra: [25.6, 85.1], india: [22, 79],
    samarkand: [39.65, 66.96], karakorum: [47.2, 102.8], steppe: [48, 90],
    mongolia: [47, 103],
    // africa
    mali: [16.8, -3], timbuktu: [16.77, -3], ghana_emp: [15, -8],
    sahara: [23, 13], atlas_mts: [31, -6], westafrica: [10, -2],
    ethiopia: [9, 39], congo: [-1, 22], greatzimbabwe: [-20, 31],
    // europe
    london: [51.5, -0.1], paris: [48.85, 2.35], aachen: [50.78, 6.08],
    rome_eu: [41.9, 12.5], madrid: [40.4, -3.7], lisbon: [38.7, -9.1],
    amsterdam: [52.37, 4.9], vienna: [48.2, 16.37], moscow: [55.75, 37.6],
    kiev: [50.45, 30.5], scandinavia: [60, 10], oslo: [60, 10],
    novgorod: [58.5, 31.3], stpetersburg: [59.9, 30.3], berlin: [52.5, 13.4],
    // americas
    tenochtitlan: [19.4, -99.1], teotihuacan: [19.7, -98.8], aztec: [19.4, -99.1],
    olmec: [17.9, -94.6], maya: [17.2, -89.6], cusco: [-13.5, -71.97],
    inca: [-13.5, -71.97], andes: [-15, -70], washington: [38.9, -77],
    boston: [42.36, -71.06], caribbean: [19, -75], lima: [-12, -77],
    brazil: [-12, -45], buenosaires: [-34.6, -58.4],
    // oceania / pacific
    australia: [-25, 134], sydney: [-33.87, 151.2], hawaii: [21, -157.8],
    polynesia: [-17, -149],
    // exploration anchors
    spain: [40, -4], canary: [28, -16], hispaniola: [19, -71],
    capeofgoodhope: [-34.3, 18.5], goa: [15.5, 73.8], malacca: [2.2, 102.2],
    philippines: [13, 122], moluccas: [-3.4, 128], magellanstrait: [-54, -70],
    pacific_mid: [0, -160], indian_ocean: [-10, 75], capeverde: [16, -24],
    // disasters / misc
    vesuvius: [40.8, 14.4], pompeii: [40.75, 14.49], wuhan: [30.6, 114.3],
    sarajevo: [43.85, 18.4], cuba: [22, -80], berlinwall: [52.5, 13.4],
    hiroshima: [34.4, 132.5], nyc: [40.7, -74], suez: [30, 32.5],
    panama: [9, -79.5], marathon: [38.1, 23.97], waterloo: [50.7, 4.4],
    kadesh: [34.6, 36.5], chaldea: [30.96, 46.1],
    // prehistory anchors
    lascaux: [45, 1.2], chauvet: [44.4, 4.4], altamira: [43.4, -4.1],
    jericho: [31.87, 35.44], catalhoyuk: [37.67, 32.83], beringia: [64, -170],
    doggerland: [54, 3], clovis: [34, -103], natufian: [33, 36],
    fertilecrescent: [34, 40], sahul: [-6, 140], africa_east: [-3, 36],
    africa_horn: [8, 45], iberia_cave: [43, -4],
    // silk road
    dunhuang: [40.1, 94.7], kashgar: [39.5, 76], antioch: [36.2, 36.16],
    // trans-saharan
    sijilmasa: [31.3, -4.3], gao: [16.27, -0.04], taghaza: [23.6, -5],
    // maritime spice
    calicut: [11.25, 75.78], venice: [45.44, 12.34], alexandria: [31.2, 29.9],
    // specific event anchors
    olympia: [37.6, 21.6], bodhgaya: [24.7, 85], qufu: [35.6, 117],
    wittenberg: [51.87, 12.65], kittyhawk: [36.0, -75.7], baikonur: [45.96, 63.3],
    capecanaveral: [28.4, -80.6], gettysburg: [39.8, -77.2], normandy: [49.3, -0.4],
    stalingrad: [48.7, 44.5], pearlharbor: [21.35, -157.95], hastings: [50.9, 0.49],
    manchuria: [44, 125], saigon: [10.8, 106.7], korea: [38, 127],
    sanfrancisco: [37.77, -122.4], chernobyl: [51.4, 30.1], gibraltar: [36.1, -5.35],
    rhine: [50, 7], greenland_pt: [72, -40], alaska: [64, -150], orleans: [47.9, 1.9]
  };

  // helpers used by data files: project a named landmark, or build a box/poly.
  function at(name) { var p = LM[name]; return p ? ll(p[0], p[1]) : null; }
  // box(name, wLon, hLat) -> rectangular region centered on a landmark
  function box(name, wLon, hLat) {
    var p = LM[name];
    if (!p) return [];
    var la = p[0], lo = p[1], dw = wLon / 2, dh = hLat / 2;
    return path([[la + dh, lo - dw], [la + dh, lo + dw], [la - dh, lo + dw], [la - dh, lo - dw]]);
  }
  // poly([[lat,lon],...]) -> projected polygon
  function poly(pairs) { return path(pairs); }
  // mid-point between two landmarks (in [lat,lon]); f=0 -> a, f=1 -> b
  function mid(a, b, f) {
    if (f === undefined) f = 0.5;
    var pa = LM[a], pb = LM[b];
    return [pa[0] + (pb[0] - pa[0]) * f, pa[1] + (pb[1] - pa[1]) * f];
  }

  // ---- Continent outlines (blocky, recognizable), in [lat, lon] ----
  var CONTINENTS = [
    { id: 'northamerica', pts: [
      [71, -156], [70, -128], [68, -110], [60, -95], [62, -78], [52, -56],
      [46, -52], [40, -68], [34, -76], [30, -81], [25, -81], [25, -97],
      [18, -94], [16, -92], [20, -106], [23, -110], [32, -117], [40, -124],
      [48, -125], [55, -130], [59, -140], [60, -150], [66, -162], [71, -156]
    ]},
    { id: 'southamerica', pts: [
      [11, -72], [11, -61], [6, -50], [-2, -44], [-8, -35], [-13, -38],
      [-23, -41], [-34, -54], [-41, -62], [-52, -69], [-54, -71], [-45, -74],
      [-33, -72], [-18, -70], [-5, -81], [2, -80], [8, -77], [11, -72]
    ]},
    { id: 'africa', pts: [
      [37, -6], [33, 11], [32, 22], [31, 30], [28, 34], [15, 40], [12, 44],
      [11, 51], [2, 42], [-5, 39], [-16, 40], [-26, 33], [-34, 26], [-34, 19],
      [-29, 16], [-17, 12], [-6, 12], [4, 9], [5, -3], [10, -8], [14, -17],
      [21, -17], [28, -13], [33, -10], [37, -6]
    ]},
    { id: 'europe', pts: [
      [36, -9], [43, -9], [44, -2], [48, -5], [49, 0], [51, 3], [53, 7],
      [57, 8], [58, 11], [62, 5], [71, 25], [69, 30], [60, 28], [56, 21],
      [49, 17], [45, 14], [40, 18], [37, 21], [38, 24], [41, 27], [45, 30],
      [47, 38], [50, 40], [44, 40], [40, 35], [37, 27], [41, 16], [44, 9],
      [44, 4], [42, -2], [40, -5], [36, -9]
    ]},
    { id: 'britain', pts: [[58, -5], [57, -2], [54, -1], [51, 1], [50, -4], [53, -5], [55, -6], [58, -5]] },
    { id: 'mideast', pts: [
      [37, 27], [40, 36], [38, 44], [37, 49], [30, 49], [25, 57], [22, 60],
      [13, 53], [12, 44], [15, 42], [20, 39], [27, 34], [30, 33], [33, 36], [37, 27]
    ]},
    { id: 'siberia', pts: [
      [55, 38], [60, 45], [68, 55], [73, 80], [74, 105], [71, 140], [66, 172],
      [62, 178], [60, 162], [55, 150], [52, 135], [50, 120], [48, 105], [50, 88],
      [52, 70], [53, 55], [55, 38]
    ]},
    { id: 'centralasia', pts: [
      [50, 48], [52, 62], [52, 80], [49, 92], [46, 100], [42, 96], [40, 80],
      [42, 66], [44, 54], [47, 49], [50, 48]
    ]},
    { id: 'southasia', pts: [
      [33, 74], [30, 70], [24, 67], [22, 70], [16, 73], [8, 77], [11, 79],
      [16, 81], [20, 85], [22, 89], [26, 89], [29, 82], [31, 79], [33, 74]
    ]},
    { id: 'eastasia', pts: [
      [42, 88], [45, 100], [47, 120], [45, 128], [40, 124], [38, 122], [35, 120],
      [30, 122], [24, 118], [22, 114], [21, 108], [23, 100], [28, 98], [29, 88],
      [33, 80], [38, 80], [42, 88]
    ]},
    { id: 'korea_japan', pts: [[44, 142], [40, 141], [35, 140], [33, 131], [37, 137], [40, 140], [44, 142]] },
    { id: 'seasia', pts: [
      [22, 96], [20, 100], [14, 99], [9, 100], [8, 104], [1, 104], [-2, 106],
      [-8, 110], [-9, 119], [-3, 128], [-1, 131], [-8, 141], [-2, 137],
      [6, 126], [14, 121], [18, 121], [16, 108], [20, 106], [22, 96]
    ]},
    { id: 'australia', pts: [
      [-11, 132], [-11, 142], [-15, 145], [-25, 153], [-38, 147], [-39, 144],
      [-35, 138], [-32, 128], [-34, 118], [-31, 115], [-22, 114], [-15, 124],
      [-12, 130], [-11, 132]
    ]},
    { id: 'newzealand', pts: [[-35, 173], [-39, 177], [-46, 170], [-44, 168], [-38, 174], [-35, 173]] },
    { id: 'scandinavia', pts: [[71, 25], [69, 21], [63, 11], [58, 6], [60, 17], [66, 24], [71, 25]] }
  ];

  // ---- Mountain ranges: small triangle clusters around a center ----
  var MOUNTAINS = [
    { name: 'Alps', c: [46, 9], n: 5, spread: 4 },
    { name: 'Himalayas', c: [30, 84], n: 9, spread: 9 },
    { name: 'Andes', c: [-20, -68], n: 9, spread: 10, vertical: true },
    { name: 'Rockies', c: [42, -112], n: 7, spread: 9, vertical: true },
    { name: 'Atlas', c: [32, -4], n: 4, spread: 5 },
    { name: 'Urals', c: [60, 60], n: 6, spread: 8, vertical: true }
  ];

  // ---- Terrain overlays (deserts + tundra) for color variety ----
  var DESERTS = [
    { id: 'sahara', pts: [[30, -8], [31, 25], [20, 30], [16, 16], [18, -5], [24, -10], [30, -8]] },
    { id: 'arabian', pts: [[30, 38], [29, 49], [20, 53], [16, 46], [20, 40], [26, 37], [30, 38]] },
    { id: 'gobi', pts: [[44, 95], [45, 110], [40, 112], [38, 100], [40, 94], [44, 95]] },
    { id: 'thar', pts: [[29, 70], [28, 74], [25, 73], [26, 70], [29, 70]] },
    { id: 'outback', pts: [[-20, 122], [-21, 138], [-28, 138], [-29, 124], [-24, 120], [-20, 122]] },
    { id: 'atacama', pts: [[-19, -70], [-20, -68], [-26, -69], [-25, -71], [-19, -70]] },
    { id: 'kalahari', pts: [[-20, 20], [-21, 25], [-26, 25], [-27, 20], [-22, 18], [-20, 20]] }
  ];
  var TUNDRA = [
    { id: 'arctic_na', pts: [[71, -156], [72, -100], [70, -75], [66, -70], [62, -90], [66, -130], [70, -150], [71, -156]] },
    { id: 'arctic_eu', pts: [[71, 25], [73, 60], [74, 100], [72, 140], [69, 150], [68, 110], [67, 70], [69, 35], [71, 25]] },
    { id: 'greenland', pts: [[60, -45], [70, -55], [76, -45], [72, -25], [62, -42], [60, -45]] }
  ];

  // precompute projected continent + terrain pixel-percent paths once
  function projectAll() {
    var out = { continents: [], deserts: [], tundra: [], mountains: [] };
    CONTINENTS.forEach(function (c) { out.continents.push({ id: c.id, pts: path(c.pts) }); });
    DESERTS.forEach(function (d) { out.deserts.push({ id: d.id, pts: path(d.pts) }); });
    TUNDRA.forEach(function (t) { out.tundra.push({ id: t.id, pts: path(t.pts) }); });
    MOUNTAINS.forEach(function (m) { out.mountains.push(m); });
    return out;
  }

  App.geo = {
    ll: ll, path: path, at: at, box: box, poly: poly, mid: mid,
    LANDMARKS: LM, CONTINENTS: CONTINENTS, MOUNTAINS: MOUNTAINS,
    DESERTS: DESERTS, TUNDRA: TUNDRA, projectAll: projectAll, view: view
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ll: ll, LANDMARKS: LM, box: box, poly: poly, mid: mid, view: view };
  }
})(typeof window !== 'undefined' ? window : globalThis);
