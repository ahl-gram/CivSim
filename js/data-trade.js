/* data-trade.js - historical trade routes (golden dashed, date-gated) and
 * explorer voyage paths (animated dotted lines). All via named landmarks. */
(function (root) {
  'use strict';
  var App = root.App || (root.App = {});
  var AT = App.geo.at;
  function via(names) { return names.map(function (n) { return AT(n); }); }

  var tradeRoutes = [
    { id: 'silk', name: 'Silk Road', start: 100, end: 1450, color: '#ffd700',
      points: via(['changan', 'dunhuang', 'kashgar', 'samarkand', 'ctesiphon', 'antioch', 'constantinople']) },
    { id: 'sahara', name: 'Trans-Saharan Trade', start: 500, end: 1600, color: '#ffc23a',
      points: via(['timbuktu', 'gao', 'taghaza', 'sijilmasa', 'carthage']) },
    { id: 'spice', name: 'Maritime Spice Route', start: 1500, end: 1800, color: '#ffe27a',
      points: via(['lisbon', 'capeofgoodhope', 'calicut', 'malacca', 'moluccas']) }
  ];

  // Explorer voyages: triggered by their event id; animate over CONFIG.explorationMs.
  var explorationRoutes = {
    columbus: { name: 'Columbus 1492', color: '#30ffff', points: via(['lisbon', 'canary', 'caribbean', 'hispaniola']) },
    magellan: { name: 'Magellan 1519-22', color: '#30ffff', points: via(['spain', 'capeverde', 'brazil', 'magellanstrait', 'pacific_mid', 'philippines']) },
    zhenghe: { name: 'Zheng He', color: '#ffd700', points: via(['nanjing', 'malacca', 'calicut', 'capeofgoodhope', 'africa_east']) },
    dagama: { name: 'da Gama 1498', color: '#30ffff', points: via(['lisbon', 'capeofgoodhope', 'calicut']) }
  };

  App.data = App.data || {};
  App.data.tradeRoutes = tradeRoutes;
  App.data.explorationRoutes = explorationRoutes;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { tradeRoutes: tradeRoutes, explorationRoutes: explorationRoutes };
  }
})(typeof window !== 'undefined' ? window : globalThis);
