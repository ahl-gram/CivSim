/* data-events-extra.js - prehistory + enrichment events merged into the
 * canonical timeline (generated). Loaded after data-events.js. */
(function (root) {
  "use strict";
  var App = root.App;
  var AT = App.geo.at;
  var raw = [
 {
  "year": -40000,
  "name": "Out of Africa",
  "landmark": "africa_east",
  "type": "DISCOVERY",
  "desc": "Bands of modern humans stream out of Africa to inherit the Earth.",
  "civ": "homo_sapiens"
 },
 {
  "year": -40000,
  "name": "First Australians",
  "landmark": "sahul",
  "type": "DISCOVERY",
  "desc": "Seafarers raft across open water to set foot on the great southern land of Sahul.",
  "civ": "homo_sapiens"
 },
 {
  "year": -39000,
  "name": "Cro-Magnons in Europe",
  "landmark": "iberia_cave",
  "type": "FOUNDING",
  "desc": "Cro-Magnon hunters settle Ice Age Europe alongside the last Neanderthals.",
  "civ": "cromagnon"
 },
 {
  "year": -36000,
  "name": "Chauvet's Lions",
  "landmark": "chauvet",
  "type": "CULTURAL",
  "desc": "Artists paint roaring lions and horses by torchlight deep in Chauvet cave.",
  "civ": "cromagnon"
 },
 {
  "year": -34000,
  "name": "Altamira Begun",
  "landmark": "altamira",
  "type": "CULTURAL",
  "desc": "The first ochre marks appear on the ceiling of Altamira.",
  "civ": "cromagnon"
 },
 {
  "year": -30000,
  "name": "Bow and Arrow",
  "landmark": "africa_east",
  "type": "DISCOVERY",
  "desc": "The bow lets hunters strike swift game from a distance.",
  "civ": "homo_sapiens"
 },
 {
  "year": -26000,
  "name": "Last Glacial Maximum",
  "landmark": "scandinavia",
  "type": "DISASTER",
  "desc": "Ice sheets swallow the north as the world plunges to its coldest depths.",
  "civ": "homo_sapiens"
 },
 {
  "year": -20000,
  "name": "Crossing Beringia",
  "landmark": "beringia",
  "type": "DISCOVERY",
  "desc": "Hunters trek the frozen land bridge from Asia toward an empty New World.",
  "civ": "homo_sapiens"
 },
 {
  "year": -17000,
  "name": "Lascaux's Bulls",
  "landmark": "lascaux",
  "type": "CULTURAL",
  "desc": "Great aurochs and stags charge across the painted halls of Lascaux.",
  "civ": "cromagnon"
 },
 {
  "year": -14500,
  "name": "Jomon Pottery",
  "landmark": "jomon",
  "type": "DISCOVERY",
  "desc": "Jomon foragers fire the world's earliest clay pots.",
  "civ": "jomon"
 },
 {
  "year": -13000,
  "name": "The First Dogs",
  "landmark": "natufian",
  "type": "CULTURAL",
  "desc": "Wolves grow tame at the hearth and become humankind's first companions.",
  "civ": "homo_sapiens"
 },
 {
  "year": -12500,
  "name": "Natufian Villages",
  "landmark": "natufian",
  "type": "FOUNDING",
  "desc": "Natufians build the first stone houses and linger in one place year-round.",
  "civ": "homo_sapiens"
 },
 {
  "year": -11000,
  "name": "Clovis Hunters",
  "landmark": "clovis",
  "type": "DISCOVERY",
  "desc": "Clovis spear-throwers spread across the Americas in a few short centuries.",
  "civ": "homo_sapiens"
 },
 {
  "year": -10800,
  "name": "Megafauna Vanish",
  "landmark": "beringia",
  "type": "DISASTER",
  "desc": "Mammoths, mastodons, and giant beasts vanish from a warming world.",
  "civ": "homo_sapiens"
 },
 {
  "year": -9600,
  "name": "Gobekli Tepe",
  "landmark": "gobekli",
  "type": "FOUNDING",
  "desc": "Foragers haul towering carved pillars to raise the world's first temple.",
  "civ": "gobekli_culture"
 },
 {
  "year": -9500,
  "name": "First Wheat",
  "landmark": "fertilecrescent",
  "type": "DISCOVERY",
  "desc": "Farmers sow and reap wild wheat, and agriculture is born.",
  "civ": "homo_sapiens"
 },
 {
  "year": -8300,
  "name": "Walls of Jericho",
  "landmark": "jericho",
  "type": "FOUNDING",
  "desc": "Jericho rings itself with a massive stone wall and watchtower.",
  "civ": "homo_sapiens"
 },
 {
  "year": -8000,
  "name": "Sheep and Goats",
  "landmark": "fertilecrescent",
  "type": "DISCOVERY",
  "desc": "Herders tame sheep and goats for wool, milk, and meat.",
  "civ": "homo_sapiens"
 },
 {
  "year": -7500,
  "name": "Cattle of the Sahara",
  "landmark": "sahara",
  "type": "DISCOVERY",
  "desc": "Herders drive cattle across a green and watered Sahara.",
  "civ": "homo_sapiens"
 },
 {
  "year": -7100,
  "name": "Catalhoyuk",
  "landmark": "catalhoyuk",
  "type": "FOUNDING",
  "desc": "Thousands crowd a honeycomb of mudbrick homes entered through the roof.",
  "civ": "homo_sapiens"
 },
 {
  "year": -6200,
  "name": "Doggerland Drowns",
  "landmark": "doggerland",
  "type": "DISASTER",
  "desc": "A great wave swallows Doggerland and severs Britain from the continent.",
  "civ": "homo_sapiens"
 },
 {
  "year": -5500,
  "name": "Copper Smelting",
  "landmark": "anatolia",
  "type": "SCIENTIFIC",
  "desc": "Smiths melt green ore into shining copper and end the age of stone.",
  "civ": "homo_sapiens"
 },
 {
  "year": -4000,
  "name": "The Potter's Wheel",
  "landmark": "mesopotamia",
  "type": "SCIENTIFIC",
  "desc": "Spinning clay on a wheel lets potters shape vessels in moments.",
  "civ": "sumer"
 },
 {
  "year": -3500,
  "name": "The Wheel Rolls",
  "landmark": "sumer",
  "type": "DISCOVERY",
  "desc": "Sumerians fit wheels to carts and set the world in motion.",
  "civ": "sumer"
 },
 {
  "year": -2334,
  "name": "Sargon Forges Akkad",
  "landmark": "sumer",
  "type": "FOUNDING",
  "desc": "Sargon the Great welds the squabbling cities of Mesopotamia into history's first empire.",
  "civ": "sumer"
 },
 {
  "year": -1754,
  "name": "Code of Hammurabi",
  "landmark": "babylon",
  "type": "CULTURAL",
  "desc": "Babylon carves 282 laws in stone: an eye for an eye, written for all to see."
 },
 {
  "year": -1600,
  "name": "Thera Erupts",
  "landmark": "crete",
  "type": "DISASTER",
  "desc": "A volcanic island detonates in the Aegean, drowning Minoan ports under ash and wave.",
  "civ": "minoan"
 },
 {
  "year": -1250,
  "name": "The Trojan War",
  "landmark": "anatolia",
  "type": "WAR",
  "desc": "A thousand Greek ships besiege Troy, and a wooden horse ends a ten-year siege.",
  "civ": "greece"
 },
 {
  "year": -1177,
  "name": "Bronze Age Collapse",
  "landmark": "anatolia",
  "type": "COLLAPSE",
  "desc": "Mysterious Sea Peoples and quake after quake topple empires across the Mediterranean."
 },
 {
  "year": -1150,
  "name": "Olmec Heads Rise",
  "landmark": "olmec",
  "type": "FOUNDING",
  "desc": "Mesoamerica's mother culture carves colossal stone heads in the steaming Gulf lowlands.",
  "civ": "olmec"
 },
 {
  "year": -1046,
  "name": "Zhou Take the Mandate",
  "landmark": "luoyang",
  "type": "FOUNDING",
  "desc": "The Zhou overthrow the Shang, claiming heaven itself has chosen them to rule.",
  "civ": "shang_zhou"
 },
 {
  "year": -814,
  "name": "Carthage Founded",
  "landmark": "carthage",
  "type": "FOUNDING",
  "desc": "Phoenician Queen Dido founds a harbor city destined to rival Rome itself.",
  "civ": "carthage"
 },
 {
  "year": -753,
  "name": "Rome is Founded",
  "landmark": "rome",
  "type": "FOUNDING",
  "desc": "Romulus marks out walls on the Palatine hill and names the city after himself.",
  "civ": "rome_republic"
 },
 {
  "year": -586,
  "name": "Fall of Jerusalem",
  "landmark": "jerusalem",
  "type": "WAR",
  "desc": "Nebuchadnezzar razes the Temple and marches the Judeans into Babylonian exile."
 },
 {
  "year": -539,
  "name": "Cyrus the Great",
  "landmark": "persepolis",
  "type": "FOUNDING",
  "desc": "Cyrus takes Babylon and stitches together the largest empire the world has yet seen.",
  "civ": "persia_achaemenid"
 },
 {
  "year": -480,
  "name": "Salamis and Thermopylae",
  "landmark": "sparta",
  "type": "WAR",
  "desc": "300 Spartans hold the pass and Greek triremes shatter Persia's fleet at Salamis.",
  "civ": "persia_achaemenid"
 },
 {
  "year": -331,
  "name": "Alexander Takes Persia",
  "landmark": "persepolis",
  "type": "WAR",
  "desc": "At Gaugamela the young Macedonian breaks Darius and burns Persepolis to the ground.",
  "civ": "alexander"
 },
 {
  "year": -261,
  "name": "Ashoka's Remorse",
  "landmark": "pataliputra",
  "type": "CULTURAL",
  "desc": "Sickened by the slaughter at Kalinga, Emperor Ashoka lays down the sword for Buddhism.",
  "civ": "maurya"
 },
 {
  "year": -130,
  "name": "The Silk Road Opens",
  "landmark": "samarkand",
  "type": "TRADE",
  "desc": "Han envoy Zhang Qian returns from the west, and caravans of silk begin the long march.",
  "civ": "han"
 },
 {
  "year": -27,
  "name": "Augustus, First Emperor",
  "landmark": "rome",
  "type": "FOUNDING",
  "desc": "Octavian becomes Augustus, trading the Republic for an empire that will last centuries.",
  "civ": "rome_empire"
 },
 {
  "year": 33,
  "name": "Crucifixion of Jesus",
  "landmark": "jerusalem",
  "type": "CULTURAL",
  "desc": "A Galilean preacher is crucified outside the city, and a new faith begins to spread."
 },
 {
  "year": 410,
  "name": "Visigoths Sack Rome",
  "landmark": "rome",
  "type": "COLLAPSE",
  "desc": "Alaric's Goths breach the Eternal City for the first time in eight hundred years."
 },
 {
  "year": 537,
  "name": "Hagia Sophia Rises",
  "landmark": "constantinople",
  "type": "CULTURAL",
  "desc": "Justinian unveils a dome so vast he cries that he has outdone Solomon himself.",
  "civ": "byzantine"
 },
 {
  "year": 622,
  "name": "The Hijra",
  "landmark": "mecca",
  "type": "CULTURAL",
  "desc": "Muhammad flees to Medina, and year one of the Islamic calendar begins.",
  "civ": "caliphate"
 },
 {
  "year": 732,
  "name": "Battle of Tours",
  "landmark": "paris",
  "type": "WAR",
  "desc": "Charles Martel halts the Umayyad advance into the Frankish heartland of Europe.",
  "civ": "caliphate"
 },
 {
  "year": 755,
  "name": "An Lushan Rebellion",
  "landmark": "changan",
  "type": "WAR",
  "desc": "A border general revolts and millions perish, breaking the glittering Tang in two.",
  "civ": "tang"
 },
 {
  "year": 800,
  "name": "Charlemagne Crowned",
  "landmark": "aachen",
  "type": "FOUNDING",
  "desc": "The Pope crowns the Frankish king Emperor of the Romans on Christmas Day.",
  "civ": "holy_roman"
 },
 {
  "year": 960,
  "name": "Song Dynasty Founded",
  "landmark": "nanjing",
  "type": "FOUNDING",
  "desc": "China reunites under the Song, ushering in an age of paper money and gunpowder.",
  "civ": "song"
 },
 {
  "year": 1054,
  "name": "The Great Schism",
  "landmark": "constantinople",
  "type": "CULTURAL",
  "desc": "Pope and Patriarch excommunicate each other, splitting Christendom east from west.",
  "civ": "byzantine"
 },
 {
  "year": 1275,
  "name": "Marco Polo Reaches China",
  "landmark": "beijing",
  "type": "TRADE",
  "desc": "A young Venetian enters Kublai Khan's court and returns with tales of the fabled east."
 },
 {
  "year": 1324,
  "name": "Mansa Musa's Pilgrimage",
  "landmark": "timbuktu",
  "type": "TRADE",
  "desc": "Mali's emperor floods Cairo with so much gold its price crashes for a decade.",
  "civ": "mali_empire"
 },
 {
  "year": 1325,
  "name": "Tenochtitlan Founded",
  "landmark": "tenochtitlan",
  "type": "FOUNDING",
  "desc": "An eagle on a cactus marks the spot where the Aztecs build their island capital.",
  "civ": "aztec"
 },
 {
  "year": 1429,
  "name": "Joan of Arc at Orleans",
  "landmark": "orleans",
  "type": "WAR",
  "desc": "A teenage peasant lifts the English siege and turns the Hundred Years War."
 },
 {
  "year": 1440,
  "name": "Gutenberg's Press",
  "landmark": "wittenberg",
  "type": "SCIENTIFIC",
  "desc": "Movable type arrives in Europe, and books begin to multiply faster than scribes can dream."
 },
 {
  "year": 1492,
  "name": "Fall of Granada",
  "landmark": "madrid",
  "type": "WAR",
  "desc": "The last Moorish kingdom surrenders, completing the centuries-long Reconquista of Spain.",
  "civ": "spain_empire"
 },
 {
  "year": 1521,
  "name": "Cortes Topples the Aztecs",
  "landmark": "tenochtitlan",
  "type": "WAR",
  "desc": "Conquistadors and smallpox bring down the mighty Aztec capital in two short years.",
  "civ": "spain_empire"
 },
 {
  "year": 1522,
  "name": "First Circumnavigation",
  "landmark": "magellanstrait",
  "type": "DISCOVERY",
  "desc": "Magellan's lone surviving ship limps home, the first to sail around the entire world.",
  "civ": "spain_empire"
 },
 {
  "year": 1526,
  "name": "Mughal Empire Founded",
  "landmark": "delhi",
  "type": "FOUNDING",
  "desc": "Babur's cannons shatter the Delhi Sultanate at Panipat and a new dynasty rises.",
  "civ": "mughal"
 },
 {
  "year": 1603,
  "name": "Tokugawa Shogunate",
  "landmark": "kyoto",
  "type": "FOUNDING",
  "desc": "Ieyasu unites Japan and seals it off, beginning two centuries of samurai peace.",
  "civ": "japan_empire"
 },
 {
  "year": 1653,
  "name": "Taj Mahal Completed",
  "landmark": "delhi",
  "type": "CULTURAL",
  "desc": "Shah Jahan crowns the Yamuna with a white marble tomb for his beloved wife.",
  "civ": "mughal"
 },
 {
  "year": 1769,
  "name": "Watt's Steam Engine",
  "landmark": "london",
  "type": "SCIENTIFIC",
  "desc": "James Watt patents an engine that turns boiling water into the muscle of an age.",
  "civ": "britain_empire"
 },
 {
  "year": 1787,
  "name": "US Constitution Signed",
  "landmark": "washington",
  "type": "FOUNDING",
  "desc": "Delegates in Philadelphia draft a framework for the young American republic.",
  "civ": "usa"
 },
 {
  "year": 1791,
  "name": "Haitian Revolution",
  "landmark": "hispaniola",
  "type": "WAR",
  "desc": "Enslaved people rise up and forge the first free black republic in the New World."
 },
 {
  "year": 1859,
  "name": "Darwin's Origin",
  "landmark": "london",
  "type": "SCIENTIFIC",
  "desc": "On the Origin of Species reveals that all life descends through natural selection.",
  "civ": "britain_empire"
 },
 {
  "year": 1868,
  "name": "Meiji Restoration",
  "landmark": "kyoto",
  "type": "CULTURAL",
  "desc": "Japan throws off the shogun and races to modernize in a single generation.",
  "civ": "japan_empire"
 },
 {
  "year": 1871,
  "name": "German Unification",
  "landmark": "berlin",
  "type": "FOUNDING",
  "desc": "Bismarck welds the German states into an empire proclaimed in Versailles itself.",
  "civ": "germany"
 },
 {
  "year": 1928,
  "name": "Penicillin Discovered",
  "landmark": "london",
  "type": "SCIENTIFIC",
  "desc": "Fleming spots a mold killing bacteria and opens the age of antibiotics.",
  "civ": "britain_empire"
 },
 {
  "year": 1949,
  "name": "People's Republic of China",
  "landmark": "beijing",
  "type": "FOUNDING",
  "desc": "Mao proclaims a new China from the gate of the Forbidden City.",
  "civ": "china_prc"
 },
 {
  "year": 1950,
  "name": "Korean War Erupts",
  "landmark": "korea",
  "type": "WAR",
  "desc": "Cold War rivals clash on the peninsula, freezing a divide that still endures."
 },
 {
  "year": 1962,
  "name": "Cuban Missile Crisis",
  "landmark": "cuba",
  "type": "WAR",
  "desc": "For thirteen days the superpowers stand on the brink of nuclear war."
 },
 {
  "year": 1975,
  "name": "Fall of Saigon",
  "landmark": "saigon",
  "type": "WAR",
  "desc": "Helicopters lift the last evacuees from the embassy roof as the war ends."
 },
 {
  "year": 2007,
  "name": "The Smartphone Era",
  "landmark": "sanfrancisco",
  "type": "CULTURAL",
  "desc": "A glass slab with a touchscreen puts the whole internet in every pocket.",
  "civ": "usa"
 }
];
  var seen = {}, ids = {};
  App.data.events.forEach(function (e) { seen[e.year + "|" + e.name] = true; ids[e.id] = true; });
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""); }
  function exploreFor(name) {
    if (/magellan/i.test(name)) return "magellan";
    if (/zheng\s*he|treasure fleet/i.test(name)) return "zhenghe";
    if (/da gama|vasco/i.test(name)) return "dagama";
    return null;
  }
  raw.forEach(function (r) {
    var k = r.year + "|" + r.name; if (seen[k]) return; seen[k] = true;
    var base = slug(r.name) + "_" + (r.year < 0 ? "b" + (-r.year) : r.year), id = base, n = 2;
    while (ids[id]) { id = base + "_" + (n++); } ids[id] = true;
    App.data.events.push({ year: r.year, id: id, name: r.name, type: r.type, landmark: r.landmark,
      location: AT(r.landmark) || [50, 50], civ: r.civ || null, description: r.desc || "",
      explore: exploreFor(r.name), canonical: true });
  });
  App.data.events.sort(function (a, b) { return a.year - b.year; });
})(typeof window !== "undefined" ? window : globalThis);
