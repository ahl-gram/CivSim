/* data-althistory.js - 10 alternate-history scenario designs (generated).
 * Locations are landmark NAMES; althistory.js projects them at runtime. */
(function (root) {
  "use strict";
  var App = root.App || (root.App = {});
  App.data = App.data || {};
  App.data.altScenarios = [
 {
  "id": 1,
  "year": -323,
  "rewindTo": -336,
  "name": "Alexander Lives",
  "summary": "Alexander shakes off the Babylon fever and rules for forty more years, welding Greece, Persia, India, and Italy into one undying Hellenistic world-empire. Rome is strangled in the cradle.",
  "civDeltas": [
   {
    "civ": "rome_republic",
    "endOverride": -280,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "rome"
     ],
     "byYear": -300
    },
    "note": "Alexander turns west after India; the young Republic is crushed at the gates of Italy and never escapes Latium."
   },
   {
    "civ": "rome_empire",
    "endOverride": -323,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "rome"
     ],
     "byYear": -323
    },
    "note": "With the Republic stillborn, the Empire that should have ruled the Mediterranean never exists."
   },
   {
    "civ": "carthage",
    "endOverride": -270,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "carthage"
     ],
     "byYear": -300
    },
    "note": "Phoenician kin or not, Carthage is absorbed as a Hellenistic naval province rather than dueling a Rome that never comes."
   },
   {
    "civ": "maurya",
    "endOverride": -250,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "pataliputra"
     ],
     "byYear": -300
    },
    "note": "Chandragupta's revolt is broken when Alexander returns east in force; the Mauryan dream collapses into Greco-Indian satrapies."
   },
   {
    "civ": "persia_achaemenid",
    "endOverride": -323,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "persepolis"
     ],
     "byYear": -330
    },
    "note": "Persia stays conquered and becomes the eastern heart of the empire, its bureaucracy fused into the Hellenistic state."
   }
  ],
  "suppress": [
   "rome_empire",
   "parthia",
   "byzantine"
  ],
  "newCivs": [
   {
    "id": "alexandrian_empire",
    "name": "Alexandrian Empire",
    "start": -323,
    "end": 640,
    "capital": "Babylon",
    "label": "babylon",
    "color": "#FFB400",
    "description": "Alexander's consolidated world-state stretching from Italy to the Ganges, ruled from a golden Babylon as a fusion of Greek, Persian, and Indian crowns.",
    "regionBoxes": [
     {
      "landmark": "babylon",
      "wLon": 40,
      "hLat": 28
     },
     {
      "landmark": "persia",
      "wLon": 35,
      "hLat": 26
     },
     {
      "landmark": "aegean",
      "wLon": 30,
      "hLat": 22
     },
     {
      "landmark": "nile",
      "wLon": 22,
      "hLat": 26
     }
    ],
    "growth": {
     "toLandmarks": [
      "indus",
      "india",
      "pataliputra",
      "italy",
      "rome",
      "carthage"
     ],
     "byYear": -300
    }
   },
   {
    "id": "greco_india",
    "name": "Greco-Indian Kingdom",
    "start": -300,
    "end": 1100,
    "capital": "Taxila",
    "label": "indus",
    "color": "#FF7A33",
    "description": "A lasting Hellenistic-Buddhist realm on the Indus and Ganges where Greek philosophy and Indian dharma merge into a single courtly civilization.",
    "regionBoxes": [
     {
      "landmark": "indus",
      "wLon": 28,
      "hLat": 22
     },
     {
      "landmark": "pataliputra",
      "wLon": 24,
      "hLat": 18
     }
    ],
    "growth": {
     "toLandmarks": [
      "india",
      "ganges",
      "delhi"
     ],
     "byYear": 200
    }
   },
   {
    "id": "hellenic_west",
    "name": "Hellenic West",
    "start": -280,
    "end": 900,
    "capital": "Neapolis",
    "label": "italy",
    "color": "#FFD23F",
    "description": "Greek Italy and North Africa governed from the Bay of Naples, where Latin survives only as a peasant dialect under marble Doric colonnades.",
    "regionBoxes": [
     {
      "landmark": "italy",
      "wLon": 24,
      "hLat": 20
     },
     {
      "landmark": "carthage",
      "wLon": 26,
      "hLat": 16
     }
    ],
    "growth": {
     "toLandmarks": [
      "rome",
      "spain",
      "athens"
     ],
     "byYear": 100
    }
   },
   {
    "id": "hellenistic_commonwealth",
    "name": "Hellenistic Commonwealth",
    "start": 640,
    "end": 2025,
    "capital": "Alexandria",
    "label": "alexandria",
    "color": "#FF9E1B",
    "description": "The successor confederation of Greek-speaking states that carries Alexander's universal culture from the Atlantic to the Bay of Bengal into the modern age.",
    "regionBoxes": [
     {
      "landmark": "alexandria",
      "wLon": 30,
      "hLat": 24
     },
     {
      "landmark": "constantinople",
      "wLon": 28,
      "hLat": 22
     },
     {
      "landmark": "persia",
      "wLon": 30,
      "hLat": 24
     }
    ],
    "growth": {
     "toLandmarks": [
      "india",
      "carthage",
      "samarkand",
      "calicut"
     ],
     "byYear": 1500
    }
   }
  ],
  "altEvents": [
   {
    "year": -323,
    "name": "The Fever Breaks",
    "type": "DISCOVERY",
    "landmark": "babylon",
    "desc": "Alexander rises from his sickbed in Babylon and declares the empire one and indivisible; the generals sheathe their knives."
   },
   {
    "year": -320,
    "name": "March on the Ganges",
    "type": "WAR",
    "landmark": "pataliputra",
    "desc": "The Macedonian phalanx returns east, shattering the Nanda host and planting Greek garrisons on the Ganges."
   },
   {
    "year": -312,
    "name": "Fall of the Republic",
    "type": "COLLAPSE",
    "landmark": "rome",
    "desc": "Alexander's western army storms Latium; the infant Roman Republic is dissolved before it ever sees an empire."
   },
   {
    "year": -300,
    "name": "Babylon the Golden",
    "type": "FOUNDING",
    "landmark": "babylon",
    "desc": "Babylon is rebuilt as the world capital, a city of ziggurats faced in marble where Greek and Persian gods share altars."
   },
   {
    "year": -270,
    "name": "Carthage Submits",
    "type": "TRADE",
    "landmark": "carthage",
    "desc": "Carthage opens its harbors as a Hellenistic naval province, its fleets now flying the sunburst of Macedon."
   },
   {
    "year": -250,
    "name": "Gandharan Renaissance",
    "type": "CULTURAL",
    "landmark": "indus",
    "desc": "Greek sculptors and Buddhist monks invent a shared art; the Buddha is first carved with the face of Apollo."
   },
   {
    "year": -200,
    "name": "The Library Eternal",
    "type": "SCIENTIFIC",
    "landmark": "alexandria",
    "desc": "Alexandria's Library, never burned, becomes a continent-spanning academy linking scholars from Iberia to India."
   },
   {
    "year": 100,
    "name": "Hellenic Atlantic",
    "type": "DISCOVERY",
    "landmark": "lisbon",
    "desc": "Greek navigators chart the Atlantic coast, probing past the Pillars toward the unknown ocean."
   },
   {
    "year": 640,
    "name": "Commonwealth Proclaimed",
    "type": "FOUNDING",
    "landmark": "alexandria",
    "desc": "The far-flung satrapies reorganize as a Hellenistic Commonwealth, trading kings for elected strategoi."
   },
   {
    "year": 1492,
    "name": "Greeks Reach the New World",
    "type": "DISCOVERY",
    "landmark": "hispaniola",
    "desc": "Commonwealth caravels make landfall in the Caribbean, greeting the Maya in Koine Greek."
   },
   {
    "year": 1789,
    "name": "The Reasoned Republics",
    "type": "CULTURAL",
    "landmark": "athens",
    "desc": "An Enlightenment built on unbroken Greek philosophy reshapes the Commonwealth into a league of rational republics."
   },
   {
    "year": 1969,
    "name": "Sons of Icarus",
    "type": "SCIENTIFIC",
    "landmark": "baikonur",
    "desc": "Hellenistic engineers land men on the Moon, naming the first crater for Aristotle."
   }
  ],
  "tickerLines": [
   "BABYLON: Alexander recovers -- 'The empire is one!'",
   "GANGES: Phalanx triumphant, Nanda kings flee",
   "ROME: Republic crushed, Latium a Greek province",
   "CARTHAGE bows -- harbors open to Macedon",
   "INDUS: Apollo-faced Buddha unveiled at Taxila",
   "ALEXANDRIA: Great Library declared eternal",
   "Koine Greek now spoken from Spain to the Ganges",
   "Latin survives only in mountain villages",
   "COMMONWEALTH: strategoi elected, kings retired",
   "HISPANIOLA: Greek sails reach the New World",
   "ATHENS: Enlightenment of unbroken reason dawns",
   "MOON: First crater named for Aristotle"
  ]
 },
 {
  "id": 2,
  "year": 476,
  "rewindTo": 410,
  "name": "Rome Never Falls",
  "summary": "The Western Empire reforms instead of collapsing: no Dark Ages, twin Romes endure, and legions ride steam centuries early. The eagle never lands.",
  "civDeltas": [
   {
    "civ": "rome_empire",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "paris",
      "london",
      "berlin",
      "vienna",
      "scandinavia",
      "atlas_mts",
      "westafrica",
      "washington",
      "brazil"
     ],
     "byYear": 1700
    },
    "note": "Stabilized after 476, the West reabsorbs Gaul and Britannia, holds the Rhine, and rides reform straight into an early industrial age and overseas empire."
   },
   {
    "civ": "byzantine",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "jerusalem",
      "antioch",
      "persia",
      "ctesiphon",
      "alexandria"
     ],
     "byYear": 900
    },
    "note": "The Eastern Empire endures as Rome's twin, never losing the Levant or Egypt and pushing the old Persian frontier eastward."
   },
   {
    "civ": "sassanid",
    "endOverride": 700,
    "desaturate": true,
    "growth": {
     "toLandmarks": [],
     "byYear": 650
    },
    "note": "Crushed between two enduring Romes, Persia fades a century early instead of conquering."
   }
  ],
  "suppress": [
   "caliphate",
   "holy_roman",
   "viking",
   "france_napoleon",
   "germany",
   "ottoman",
   "britain_empire",
   "spain_empire",
   "portugal_empire"
  ],
  "newCivs": [
   {
    "id": "rome_occidens",
    "name": "Rome Reborn (Occidens)",
    "start": 480,
    "end": 2025,
    "capital": "Ravenna",
    "label": "rome",
    "color": "#FFB300",
    "description": "The reformed Western Empire that reorganizes the legions, taxes the cities, and federates the Germanic tribes as Roman citizens rather than conquerors.",
    "regionBoxes": [
     {
      "landmark": "rome",
      "wLon": 40,
      "hLat": 26
     },
     {
      "landmark": "paris",
      "wLon": 28,
      "hLat": 22
     }
    ],
    "growth": {
     "toLandmarks": [
      "london",
      "rhine",
      "scandinavia",
      "madrid",
      "atlas_mts"
     ],
     "byYear": 1100
    }
   },
   {
    "id": "imperium_novum",
    "name": "Imperium Novum",
    "start": 1500,
    "end": 2025,
    "capital": "Nova Roma Atlantica",
    "label": "washington",
    "color": "#FF6F3C",
    "description": "Roman colonial provinces planted across the Atlantic, where legions and engineers raise aqueducts over the Maya and Aztec heartlands.",
    "regionBoxes": [
     {
      "landmark": "washington",
      "wLon": 30,
      "hLat": 22
     },
     {
      "landmark": "tenochtitlan",
      "wLon": 26,
      "hLat": 20
     }
    ],
    "growth": {
     "toLandmarks": [
      "boston",
      "brazil",
      "lima",
      "caribbean"
     ],
     "byYear": 1750
    }
   },
   {
    "id": "africa_romana",
    "name": "Africa Romana",
    "start": 700,
    "end": 2025,
    "capital": "Carthago Magna",
    "label": "carthage",
    "color": "#FFD23F",
    "description": "A reborn Roman Africa that crosses the Sahara to tap the gold roads, fusing legionary roads with caravan trade.",
    "regionBoxes": [
     {
      "landmark": "carthage",
      "wLon": 34,
      "hLat": 20
     },
     {
      "landmark": "sahara",
      "wLon": 30,
      "hLat": 22
     }
    ],
    "growth": {
     "toLandmarks": [
      "timbuktu",
      "westafrica",
      "ethiopia"
     ],
     "byYear": 1300
    }
   }
  ],
  "altEvents": [
   {
    "year": 451,
    "name": "Catalaunian Triumph",
    "type": "WAR",
    "landmark": "paris",
    "desc": "Aetius shatters Attila for good; the Huns scatter and Gaul stays Roman."
   },
   {
    "year": 476,
    "name": "The Reforms of Romulus",
    "type": "FOUNDING",
    "landmark": "rome",
    "desc": "Instead of deposing the boy-emperor, the army crowns a reformer: pay restored, tribes made citizens, the West holds."
   },
   {
    "year": 540,
    "name": "Twin Eagles Pact",
    "type": "CULTURAL",
    "landmark": "constantinople",
    "desc": "West and East formally split rule but pledge eternal alliance; one law, two thrones."
   },
   {
    "year": 632,
    "name": "Levant Held",
    "type": "WAR",
    "landmark": "jerusalem",
    "desc": "With Persia broken early, Byzantine legions hold Arabia's frontier and no caliphate rises."
   },
   {
    "year": 800,
    "name": "No Crown for Charles",
    "type": "COLLAPSE",
    "landmark": "aachen",
    "desc": "There is no Holy Roman Empire to invent: the real eagle still flies, and Aachen is just a Roman town."
   },
   {
    "year": 1088,
    "name": "The Aqueduct Engines",
    "type": "SCIENTIFIC",
    "landmark": "rome",
    "desc": "Roman engineers harness steam from mining pumps; the first iron legions of industry are forged."
   },
   {
    "year": 1340,
    "name": "Iron Roads of Empire",
    "type": "DISCOVERY",
    "landmark": "london",
    "desc": "Steam wagons run the via system from Britannia to Babylon; the Empire shrinks to a week wide."
   },
   {
    "year": 1492,
    "name": "The Atlantic Vow",
    "type": "TRADE",
    "landmark": "hispaniola",
    "desc": "Roman galleys reach the New World; Nova Roma Atlantica is founded, not conquered but colonized."
   },
   {
    "year": 1620,
    "name": "Pax Romana Mundi",
    "type": "FOUNDING",
    "landmark": "tenochtitlan",
    "desc": "Aztec and Maya cities sign foederati treaties; Roman law and Mesoamerican gods share the forum."
   },
   {
    "year": 1789,
    "name": "The Senate Endures",
    "type": "CULTURAL",
    "landmark": "paris",
    "desc": "No revolution overturns a king: reform comes by Senate decree, and the eagle adapts again."
   },
   {
    "year": 1914,
    "name": "The Long Peace",
    "type": "CULTURAL",
    "landmark": "sarajevo",
    "desc": "No tangle of nation-states to ignite: a single Roman order keeps the powder dry."
   },
   {
    "year": 2025,
    "name": "Two Thousand Years On",
    "type": "CULTURAL",
    "landmark": "rome",
    "desc": "The Empire's bimillennial-plus endures: legions in orbit, Latin on every screen, the eagle unbroken."
   }
  ],
  "tickerLines": [
   "ROME ENDURES: Western legions reformed, frontier holds on the Rhine",
   "TWIN EAGLES: West and East Rome pledge eternal alliance",
   "PERSIA FADES: Sassanid throne crumbles between two Romes",
   "NO DARK AGES: aqueducts flow, roads paved, schools open across Gaul",
   "STEAM LEGIONS: Roman engineers raise the first iron engines",
   "IRON ROADS: steam wagons link Britannia to Babylon",
   "ATLANTIC VOW: Roman galleys plant Nova Roma in the New World",
   "PAX MUNDI: Aztec and Maya cities join as Roman foederati",
   "AFRICA ROMANA: legions cross the Sahara to the gold roads",
   "NO CALIPHATE, NO VIKINGS: the eagle never let go",
   "SENATE ENDURES: reform by decree, no revolution needed",
   "BIMILLENNIAL ROME: the empire that simply never fell"
  ]
 },
 {
  "id": 3,
  "year": 1274,
  "rewindTo": 1206,
  "name": "Mongols Conquer All",
  "summary": "The divine winds never blow and Europe never holds. The Mongol Empire refuses to fracture, swallowing Japan and crashing into the heart of Christendom. One horde, from the Pacific to the Rhine.",
  "civDeltas": [
   {
    "civ": "mongol",
    "endOverride": 1740,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "japan",
      "kyoto",
      "moscow",
      "kiev",
      "vienna",
      "berlin",
      "rome",
      "paris",
      "constantinople",
      "delhi",
      "ctesiphon"
     ],
     "byYear": 1330
    },
    "note": "No kamikaze, no halt at Legnica or the Adriatic. The Great Khanate stays whole and grows to span all Eurasia plus Japan and Eastern/Central Europe."
   },
   {
    "civ": "song",
    "endOverride": 1279,
    "desaturate": true,
    "growth": {
     "toLandmarks": [],
     "byYear": 1279
    },
    "note": "Southern Song still falls on schedule, fully absorbed into the unbroken horde."
   },
   {
    "civ": "byzantine",
    "endOverride": 1340,
    "desaturate": true,
    "growth": {
     "toLandmarks": [],
     "byYear": 1340
    },
    "note": "Constantinople is overrun by the western Mongol thrust two centuries early."
   },
   {
    "civ": "holy_roman",
    "endOverride": 1290,
    "desaturate": true,
    "growth": {
     "toLandmarks": [],
     "byYear": 1290
    },
    "note": "The Empire shatters under the cavalry storm; German lands become Mongol marches."
   },
   {
    "civ": "caliphate",
    "endOverride": 1258,
    "desaturate": true,
    "growth": {
     "toLandmarks": [],
     "byYear": 1258
    },
    "note": "Baghdad still burns in 1258, but now there is no Mamluk rebound to stop the tide."
   }
  ],
  "suppress": [
   "ottoman",
   "ming_qing",
   "mughal",
   "russia_empire",
   "japan_empire",
   "france_napoleon",
   "germany",
   "ussr"
  ],
  "newCivs": [
   {
    "id": "great_yuan_eternal",
    "name": "Eternal Yuan",
    "start": 1271,
    "end": 1740,
    "capital": "Khanbaliq",
    "label": "beijing",
    "color": "#FFB400",
    "description": "The undivided heart of the Mongol world, ruling China, the steppe, and the trade roads as one unbroken dynasty for four and a half centuries.",
    "regionBoxes": [
     {
      "landmark": "beijing",
      "wLon": 45,
      "hLat": 30
     },
     {
      "landmark": "karakorum",
      "wLon": 50,
      "hLat": 28
     },
     {
      "landmark": "samarkand",
      "wLon": 40,
      "hLat": 24
     }
    ],
    "growth": {
     "toLandmarks": [
      "xian",
      "changan",
      "luoyang",
      "kashgar",
      "dunhuang"
     ],
     "byYear": 1300
    }
   },
   {
    "id": "yamato_horde",
    "name": "Yamato Horde",
    "start": 1281,
    "end": 1740,
    "capital": "Kyoto",
    "label": "kyoto",
    "color": "#FF6A1A",
    "description": "Japan, drowned not by typhoon but by landing armies, becomes a mounted-samurai khanate that fuses bushido with the yam relay.",
    "regionBoxes": [
     {
      "landmark": "japan",
      "wLon": 18,
      "hLat": 22
     },
     {
      "landmark": "kyoto",
      "wLon": 12,
      "hLat": 10
     }
    ],
    "growth": {
     "toLandmarks": [
      "korea",
      "manchuria"
     ],
     "byYear": 1320
    }
   },
   {
    "id": "khanate_europa",
    "name": "Khanate of Europa",
    "start": 1241,
    "end": 1700,
    "capital": "Vienna",
    "label": "vienna",
    "color": "#FFD23F",
    "description": "From the ashes of Legnica and the Sajo the western horde plants its ordu on the Danube, ruling Christendom from a felt-tent throne in Vienna.",
    "regionBoxes": [
     {
      "landmark": "vienna",
      "wLon": 30,
      "hLat": 20
     },
     {
      "landmark": "berlin",
      "wLon": 28,
      "hLat": 18
     }
    ],
    "growth": {
     "toLandmarks": [
      "paris",
      "rome",
      "rome_eu",
      "london",
      "madrid"
     ],
     "byYear": 1340
    }
   },
   {
    "id": "golden_horde_west",
    "name": "Greater Golden Horde",
    "start": 1242,
    "end": 1700,
    "capital": "Sarai",
    "label": "moscow",
    "color": "#FFA533",
    "description": "Russia and the western steppe stay under the Horde permanently, with no Muscovy ever rising to throw off the yoke.",
    "regionBoxes": [
     {
      "landmark": "moscow",
      "wLon": 40,
      "hLat": 26
     },
     {
      "landmark": "kiev",
      "wLon": 32,
      "hLat": 20
     }
    ],
    "growth": {
     "toLandmarks": [
      "novgorod",
      "constantinople",
      "byzantium"
     ],
     "byYear": 1360
    }
   },
   {
    "id": "neo_horde_states",
    "name": "United Hordes",
    "start": 1740,
    "end": 2025,
    "capital": "Karakorum",
    "label": "karakorum",
    "color": "#FFC857",
    "description": "When the old khanate finally modernizes it does not fall but reforms into a steppe-spanning industrial federation that still answers to the line of Genghis.",
    "regionBoxes": [
     {
      "landmark": "karakorum",
      "wLon": 55,
      "hLat": 30
     },
     {
      "landmark": "beijing",
      "wLon": 45,
      "hLat": 28
     },
     {
      "landmark": "moscow",
      "wLon": 42,
      "hLat": 26
     }
    ],
    "growth": {
     "toLandmarks": [
      "vienna",
      "kyoto",
      "delhi",
      "samarkand"
     ],
     "byYear": 1850
    }
   }
  ],
  "altEvents": [
   {
    "year": 1206,
    "name": "One Khan, One Sky",
    "type": "FOUNDING",
    "landmark": "karakorum",
    "desc": "Temujin is named Genghis Khan and vows the horde will never again be divided among quarreling sons."
   },
   {
    "year": 1241,
    "name": "Vienna Falls",
    "type": "WAR",
    "landmark": "vienna",
    "desc": "No Khan dies to recall the armies; Subutai rides past Legnica and plants the horsetail standard on the Danube."
   },
   {
    "year": 1258,
    "name": "Baghdad in Ashes",
    "type": "COLLAPSE",
    "landmark": "ctesiphon",
    "desc": "The Abbasid Caliphate is extinguished and no Mamluk wall ever rises to stop the next wave."
   },
   {
    "year": 1281,
    "name": "No Divine Wind",
    "type": "WAR",
    "landmark": "japan",
    "desc": "The sea stays calm, the great fleet lands intact, and Japan is broken in a single summer."
   },
   {
    "year": 1300,
    "name": "Pax Mongolica",
    "type": "TRADE",
    "landmark": "samarkand",
    "desc": "A merchant can ride from Kyoto to the Rhine under one law, one passport, one road."
   },
   {
    "year": 1340,
    "name": "The Rhine Marches",
    "type": "WAR",
    "landmark": "rhine",
    "desc": "Paris and Rome bow; the western frontier of the horde now drinks from the Rhine."
   },
   {
    "year": 1405,
    "name": "Steppe Renaissance",
    "type": "CULTURAL",
    "landmark": "samarkand",
    "desc": "Chinese astronomers, Persian poets, and Japanese smiths trade ideas in the courts of the unbroken empire."
   },
   {
    "year": 1492,
    "name": "Horde Sails West",
    "type": "DISCOVERY",
    "landmark": "lisbon",
    "desc": "Mongol-funded fleets out of conquered Iberia cross the ocean before any free European crown can."
   },
   {
    "year": 1571,
    "name": "Gunpowder of the Khans",
    "type": "SCIENTIFIC",
    "landmark": "beijing",
    "desc": "Cannon foundries from China to Vienna standardize under a single imperial pattern."
   },
   {
    "year": 1740,
    "name": "The Great Reform",
    "type": "FOUNDING",
    "landmark": "karakorum",
    "desc": "Rather than fracture, the aging khanate reorganizes into the modern United Hordes federation."
   },
   {
    "year": 1869,
    "name": "Iron Yam",
    "type": "SCIENTIFIC",
    "landmark": "moscow",
    "desc": "A trans-Eurasian railway replaces the horse relay, binding Pacific to Atlantic in a week."
   },
   {
    "year": 2025,
    "name": "Khan's Long Peace",
    "type": "CULTURAL",
    "landmark": "karakorum",
    "desc": "Eight centuries on, the world still speaks the trade-tongue of the steppe, and the blue banner flies from Kyoto to Paris."
   }
  ],
  "tickerLines": [
   "GENGHIS DECREES: THE HORDE SHALL NEVER DIVIDE",
   "SUBUTAI TAKES VIENNA -- DANUBE NOW MONGOL",
   "THE SEA WAS CALM: JAPAN FALLS IN ONE SUMMER",
   "PAX MONGOLICA -- KYOTO TO THE RHINE UNDER ONE LAW",
   "PARIS AND ROME KNEEL TO THE KHAN OF EUROPA",
   "NO MUSCOVY RISES -- RUSSIA STAYS THE HORDE'S FOREVER",
   "HORDE FLEETS CROSS THE OCEAN BEFORE THE WEST CAN",
   "STEPPE RENAISSANCE: PERSIAN POETS, CHINESE STARS",
   "THE GREAT REFORM: KHANATE BECOMES THE UNITED HORDES",
   "IRON YAM RAILWAY LINKS PACIFIC TO ATLANTIC IN A WEEK",
   "EIGHT CENTURIES ON, THE BLUE BANNER STILL FLIES",
   "ONE KHAN, ONE SKY, ONE WORLD"
  ]
 },
 {
  "id": 4,
  "year": 1347,
  "rewindTo": 1300,
  "name": "No Black Death",
  "summary": "The plague burns out on the steppe and never reaches Europe. Feudalism holds, cities overflow, and the Renaissance arrives 150 years late.",
  "civDeltas": [
   {
    "civ": "holy_roman",
    "endOverride": 1880,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "rhine",
      "vienna",
      "berlin",
      "amsterdam"
     ],
     "byYear": 1500
    },
    "note": "No mortality, no labor shortage: the feudal Empire stays crowded, intact, and dominant for centuries."
   },
   {
    "civ": "byzantine",
    "endOverride": 1640,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "anatolia",
      "aegean"
     ],
     "byYear": 1450
    },
    "note": "Without plague gutting Christendom, a populous Constantinople repels the Ottomans far past 1453."
   },
   {
    "civ": "ottoman",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "jerusalem",
      "persia"
     ],
     "byYear": 1700
    },
    "note": "Checked at the walls of Constantinople, the Ottomans turn east instead of into Europe."
   },
   {
    "civ": "britain_empire",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "caribbean",
      "boston",
      "india"
     ],
     "byYear": 1850
    },
    "note": "Cheap labor and a packed island delay the surplus capital that funds overseas empire by 150 years."
   },
   {
    "civ": "spain_empire",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "hispaniola",
      "tenochtitlan",
      "lima"
     ],
     "byYear": 1700
    },
    "note": "With no demographic crisis pushing men to sea, Iberian exploration starts a century and a half late."
   },
   {
    "civ": "portugal_empire",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "capeofgoodhope",
      "goa",
      "calicut"
     ],
     "byYear": 1700
    },
    "note": "The caravel age is postponed; the spice route is opened only after the old order finally cracks."
   }
  ],
  "suppress": [],
  "newCivs": [
   {
    "id": "capetian_empire",
    "name": "Capetian Empire",
    "start": 1340,
    "end": 2025,
    "capital": "Paris",
    "label": "paris",
    "color": "#E8A33D",
    "description": "Uninterrupted by plague, the French crown swells into a feudal mega-monarchy ruling tens of millions of bound peasants.",
    "regionBoxes": [
     {
      "landmark": "paris",
      "wLon": 32,
      "hLat": 24
     }
    ],
    "growth": {
     "toLandmarks": [
      "london",
      "rome_eu",
      "madrid"
     ],
     "byYear": 1620
    }
   },
   {
    "id": "rhenish_league",
    "name": "Rhenish Burgher League",
    "start": 1420,
    "end": 2025,
    "capital": "Cologne",
    "label": "rhine",
    "color": "#F2C14E",
    "description": "Overflowing Rhine and Low Country cities band into a crowded, cash-rich merchant league straining at its medieval walls.",
    "regionBoxes": [
     {
      "landmark": "rhine",
      "wLon": 16,
      "hLat": 14
     },
     {
      "landmark": "amsterdam",
      "wLon": 12,
      "hLat": 10
     }
    ],
    "growth": {
     "toLandmarks": [
      "vienna",
      "scandinavia"
     ],
     "byYear": 1650
    }
   },
   {
    "id": "late_bloom_italy",
    "name": "Late Italian Bloom",
    "start": 1560,
    "end": 2025,
    "capital": "Florence",
    "label": "italy",
    "color": "#FF8A5C",
    "description": "The Renaissance finally ignites in the city-states, a century and a half behind schedule but blazing all the brighter.",
    "regionBoxes": [
     {
      "landmark": "italy",
      "wLon": 18,
      "hLat": 16
     },
     {
      "landmark": "venice",
      "wLon": 10,
      "hLat": 8
     }
    ],
    "growth": {
     "toLandmarks": [
      "aegean",
      "vienna"
     ],
     "byYear": 1720
    }
   }
  ],
  "altEvents": [
   {
    "year": 1348,
    "name": "Plague Dies on the Steppe",
    "type": "DISASTER",
    "landmark": "steppe",
    "desc": "The Great Mortality burns itself out among the Asian horse clans; Europe never even hears its name."
   },
   {
    "year": 1362,
    "name": "Cities Burst Their Walls",
    "type": "FOUNDING",
    "landmark": "paris",
    "desc": "With no die-off, Paris and London choke on their own millions and sprawl past their crumbling ramparts."
   },
   {
    "year": 1400,
    "name": "Serfs Stay Bound",
    "type": "CULTURAL",
    "landmark": "london",
    "desc": "Labor stays dirt cheap, so lords tighten the feudal yoke instead of paying free wages."
   },
   {
    "year": 1453,
    "name": "Constantinople Holds",
    "type": "WAR",
    "landmark": "constantinople",
    "desc": "A teeming, unbled Christendom storms to the Bosphorus and shatters the Ottoman siege at the walls."
   },
   {
    "year": 1494,
    "name": "No Ships Sail West",
    "type": "TRADE",
    "landmark": "lisbon",
    "desc": "With surplus men and money still locked in the fields, the Atlantic stays empty and the New World waits."
   },
   {
    "year": 1538,
    "name": "The Famine of the Many",
    "type": "DISASTER",
    "landmark": "rhine",
    "desc": "Decades of unchecked growth end in a brutal Malthusian crash; granaries fail across a packed continent."
   },
   {
    "year": 1567,
    "name": "The Late Awakening",
    "type": "CULTURAL",
    "landmark": "venice",
    "desc": "Freed at last by hard times, the Italian Renaissance finally blooms, 150 years behind history's clock."
   },
   {
    "year": 1622,
    "name": "Gutenberg's Tardy Heir",
    "type": "SCIENTIFIC",
    "landmark": "wittenberg",
    "desc": "Movable type spreads only now, and printed words race to make up for a lost century."
   },
   {
    "year": 1671,
    "name": "The Slow Reformation",
    "type": "CULTURAL",
    "landmark": "wittenberg",
    "desc": "A delayed Reformation splits a Church that had ruled unchallenged far longer than it ever should have."
   },
   {
    "year": 1758,
    "name": "The Old Order Cracks",
    "type": "COLLAPSE",
    "landmark": "paris",
    "desc": "Feudalism, propped up for four extra centuries, finally buckles under its own overcrowded weight."
   },
   {
    "year": 1861,
    "name": "Steam, At Long Last",
    "type": "SCIENTIFIC",
    "landmark": "london",
    "desc": "The Industrial Revolution roars to life a century late, and the bound millions pour into the new mills."
   },
   {
    "year": 1985,
    "name": "The Great Catch-Up",
    "type": "DISCOVERY",
    "landmark": "berlin",
    "desc": "A crowded, latecomer Europe sprints to modernity, compressing 600 lost years into a frantic dash."
   }
  ],
  "tickerLines": [
   "STEPPE: Mystery sickness dies among the horse clans -- caravans report nothing amiss.",
   "PARIS: Population doubles again; new shanties spill far beyond the city walls.",
   "LONDON: Lords reaffirm bondage -- 'a serf is born a serf, and dies one.'",
   "CONSTANTINOPLE: Christian host hurls back the Turk at the Golden Gate!",
   "LISBON: Crown shelves all plans for ocean voyages -- 'no men to spare.'",
   "RHINELAND: Granaries empty as the Famine of the Many grips the crowded west.",
   "FLORENCE: Painters and poets declare a new age -- critics say it's overdue.",
   "WITTENBERG: First printing presses clatter to life, decades behind the times.",
   "ROME: Pope rules unopposed as the long-delayed Reformation only now stirs.",
   "PARIS: Mobs storm the manors as the ancient feudal order finally shatters.",
   "LONDON: Smoke rises over the Thames -- the steam age arrives at last.",
   "BERLIN: Europe races to modernize, six centuries crammed into one wild sprint."
  ]
 },
 {
  "id": 5,
  "year": 1421,
  "rewindTo": 1405,
  "name": "China Colonizes",
  "summary": "The Treasure Fleets never burn. Ming China rings the Indian Ocean with colonies, then sails east and reaches the Americas a century before Columbus. Europe stays a peninsula on the edge of a Chinese world.",
  "civDeltas": [
   {
    "civ": "ming_qing",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "malacca",
      "calicut",
      "moluccas",
      "africa_east",
      "capeofgoodhope"
     ],
     "byYear": 1500
    },
    "note": "Yongle's pro-navy faction wins permanently; the dynasty becomes a maritime superstate that never turns inward."
   },
   {
    "civ": "spain_empire",
    "endOverride": 1700,
    "desaturate": true,
    "growth": null,
    "note": "Reconquista-era kingdom that never wins the Atlantic; the Americas are already Chinese-claimed, so Spain stays a poor home power and fades early."
   },
   {
    "civ": "portugal_empire",
    "endOverride": 1650,
    "desaturate": true,
    "growth": null,
    "note": "Henry's caravels arrive at an Indian Ocean already policed by Ming squadrons; Portugal never breaks past the Cape."
   },
   {
    "civ": "britain_empire",
    "endOverride": 1900,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "boston"
     ],
     "byYear": 1700
    },
    "note": "Cut off from Asian trade and a Chinese Pacific, Britain stays a North Atlantic also-ran rather than a global empire."
   },
   {
    "civ": "aztec",
    "endOverride": 1700,
    "desaturate": true,
    "growth": null,
    "note": "Survives the Spanish that never came, but is absorbed as a Ming tributary-protectorate after first contact at Tenochtitlan."
   },
   {
    "civ": "inca",
    "endOverride": 1700,
    "desaturate": true,
    "growth": null,
    "note": "Spared Pizarro; bends instead to Chinese silver-and-silk diplomacy out of Lima."
   }
  ],
  "suppress": [
   "france_napoleon",
   "usa"
  ],
  "newCivs": [
   {
    "id": "chinese_colonial_empire",
    "name": "Chinese Sea Empire",
    "start": 1430,
    "end": 2025,
    "capital": "Nanjing",
    "label": "malacca",
    "color": "#FFC23C",
    "description": "A vast Ming overseas dominion ringing the Indian Ocean and Pacific, governed by treasure-fleet admirals and silk-road bursars.",
    "regionBoxes": [
     {
      "landmark": "malacca",
      "wLon": 40,
      "hLat": 28
     },
     {
      "landmark": "calicut",
      "wLon": 28,
      "hLat": 20
     },
     {
      "landmark": "moluccas",
      "wLon": 26,
      "hLat": 22
     }
    ],
    "growth": {
     "toLandmarks": [
      "africa_east",
      "capeofgoodhope",
      "ethiopia",
      "goa",
      "philippines",
      "polynesia",
      "hawaii"
     ],
     "byYear": 1550
    }
   },
   {
    "id": "ming_americas",
    "name": "Ming Pacific Americas",
    "start": 1480,
    "end": 2025,
    "capital": "New Guangzhou (Lima)",
    "label": "lima",
    "color": "#FF7A3D",
    "description": "Chinese silver colonies on the Pacific coast of the Americas, ruling former Inca and Aztec lands as wealthy tributary provinces.",
    "regionBoxes": [
     {
      "landmark": "lima",
      "wLon": 26,
      "hLat": 30
     },
     {
      "landmark": "tenochtitlan",
      "wLon": 22,
      "hLat": 18
     }
    ],
    "growth": {
     "toLandmarks": [
      "cusco",
      "andes",
      "teotihuacan",
      "sanfrancisco"
     ],
     "byYear": 1650
    }
   },
   {
    "id": "swahili_ming_states",
    "name": "Swahili-Ming Coast",
    "start": 1450,
    "end": 2025,
    "capital": "Malindi",
    "label": "africa_east",
    "color": "#FFE066",
    "description": "Hybrid Swahili port-cities under Chinese protection, where giraffes, ivory, and porcelain flow through booming East African harbors.",
    "regionBoxes": [
     {
      "landmark": "africa_east",
      "wLon": 24,
      "hLat": 26
     }
    ],
    "growth": {
     "toLandmarks": [
      "ethiopia",
      "greatzimbabwe",
      "capeofgoodhope"
     ],
     "byYear": 1600
    }
   }
  ],
  "altEvents": [
   {
    "year": 1421,
    "name": "Fleets Sail On",
    "type": "FOUNDING",
    "landmark": "nanjing",
    "desc": "Yongle's navalists win the court fight; the order to burn the treasure ships is never given."
   },
   {
    "year": 1431,
    "name": "Calicut Garrison",
    "type": "FOUNDING",
    "landmark": "calicut",
    "desc": "Zheng He plants a permanent Ming fort and dockyard on the Malabar coast."
   },
   {
    "year": 1438,
    "name": "Malacca Bastion",
    "type": "TRADE",
    "landmark": "malacca",
    "desc": "The strait choke-point becomes the beating heart of a Chinese maritime empire."
   },
   {
    "year": 1451,
    "name": "Giraffes of Malindi",
    "type": "TRADE",
    "landmark": "africa_east",
    "desc": "East African ports swear tribute; giraffes again parade through the imperial gardens."
   },
   {
    "year": 1466,
    "name": "Rounding the Cape",
    "type": "DISCOVERY",
    "landmark": "capeofgoodhope",
    "desc": "Ming squadrons round southern Africa, decades ahead of any European sail."
   },
   {
    "year": 1481,
    "name": "Landfall at Lima",
    "type": "DISCOVERY",
    "landmark": "lima",
    "desc": "Treasure junks cross the Pacific and step ashore in the Andes before Europe knows the place exists."
   },
   {
    "year": 1492,
    "name": "Columbus Turned Back",
    "type": "COLLAPSE",
    "landmark": "spain",
    "desc": "A Castilian expedition finds the New World already flying Ming banners and limps home bankrupt."
   },
   {
    "year": 1519,
    "name": "Tenochtitlan Treaty",
    "type": "DISCOVERY",
    "landmark": "tenochtitlan",
    "desc": "The Aztec court receives Chinese envoys, not conquistadors, and signs a silk-for-silver pact."
   },
   {
    "year": 1571,
    "name": "Silver River",
    "type": "TRADE",
    "landmark": "pacific_mid",
    "desc": "American silver pours straight across the Pacific into Ming treasuries, no Manila middleman needed."
   },
   {
    "year": 1644,
    "name": "Dynasty Holds",
    "type": "WAR",
    "landmark": "beijing",
    "desc": "Backed by overseas wealth and gunpowder fleets, the Ming throne weathers the rebellions that once doomed it."
   },
   {
    "year": 1839,
    "name": "No Opium War",
    "type": "TRADE",
    "landmark": "china",
    "desc": "Britain, too weak to coerce a global China, trades on Chinese terms instead of forcing the issue."
   },
   {
    "year": 1949,
    "name": "Sea-Empire Republic",
    "type": "FOUNDING",
    "landmark": "nanjing",
    "desc": "The old maritime dominion modernizes into a Pacific-spanning republic, Mandarin the lingua franca of two oceans."
   },
   {
    "year": 2025,
    "name": "A Chinese Globe",
    "type": "CULTURAL",
    "landmark": "pacific_mid",
    "desc": "Porcelain harbors from Mombasa to Lima mark a world that learned to read the map from the east."
   }
  ],
  "tickerLines": [
   "BREAKING: Emperor orders the fleets to sail ON, not burn.",
   "Zheng He plants the dragon banner at Calicut.",
   "Malacca falls under Ming control: the strait is ours.",
   "Giraffes parade in Beijing as Africa swears tribute.",
   "Ming squadrons round the Cape of Good Hope.",
   "TREASURE JUNKS REACH THE ANDES: New World is Chinese.",
   "Castile's little ships find the Americas already claimed.",
   "Aztec court signs silk-for-silver pact with Chinese envoys.",
   "Pacific silver river floods the imperial treasury.",
   "Lisbon and Madrid shut out of the Asia trade.",
   "No Opium War: Britain trades on China's terms.",
   "Two oceans, one map, drawn from the east."
  ]
 },
 {
  "id": 6,
  "year": 1521,
  "rewindTo": 1519,
  "name": "Aztec Survives",
  "summary": "Cortes burns on the causeways of Tenochtitlan. The Aztec seize horse, steel, and gun, outlast the plagues, and forge a sun-empire that swallows two continents.",
  "civDeltas": [
   {
    "civ": "aztec",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "tenochtitlan",
      "teotihuacan",
      "maya",
      "olmec",
      "cusco",
      "andes",
      "lima",
      "caribbean",
      "hispaniola",
      "washington",
      "boston"
     ],
     "byYear": 1900
    },
    "note": "Repels Cortes, captures and breeds horses, casts its own guns, and inoculates against smallpox; expands from Mesoamerica across the Americas into the modern era."
   },
   {
    "civ": "inca",
    "endOverride": 1560,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "andes",
      "cusco",
      "lima"
     ],
     "byYear": 1540
    },
    "note": "Survives the un-arrived Pizarro a little longer, then is absorbed by the northern sun-empire rather than Spain."
   },
   {
    "civ": "maya",
    "endOverride": 1600,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "maya"
     ],
     "byYear": 1550
    },
    "note": "Lowland city-states persist under Aztec overlordship instead of falling to conquistadors."
   },
   {
    "civ": "spain_empire",
    "endOverride": 1898,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "madrid",
      "lisbon",
      "philippines"
     ],
     "byYear": 1600
    },
    "note": "Locked out of the New World, Spain stays a tired European and Pacific power, never the empire on which the sun never set."
   },
   {
    "civ": "portugal_empire",
    "endOverride": 1900,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "lisbon",
      "goa",
      "malacca"
     ],
     "byYear": 1600
    },
    "note": "Brazil never becomes Portuguese; the empire shrinks to its African and Asian trade posts."
   }
  ],
  "suppress": [],
  "newCivs": [
   {
    "id": "aztec_empire_mexica",
    "name": "Mexica Sun-Empire",
    "start": 1521,
    "end": 2025,
    "capital": "Tenochtitlan",
    "label": "tenochtitlan",
    "color": "#FF7A1A",
    "description": "The triumphant Aztec state that mastered steel and horse and grew into a continental superpower of jaguar cavalry and obsidian rifles.",
    "regionBoxes": [
     {
      "landmark": "tenochtitlan",
      "wLon": 32,
      "hLat": 22
     },
     {
      "landmark": "maya",
      "wLon": 18,
      "hLat": 14
     }
    ],
    "growth": {
     "toLandmarks": [
      "olmec",
      "maya",
      "caribbean",
      "hispaniola",
      "washington",
      "boston",
      "cusco",
      "lima",
      "andes",
      "brazil"
     ],
     "byYear": 1900
    }
   },
   {
    "id": "tawantin_confed",
    "name": "Andean Sun League",
    "start": 1560,
    "end": 2025,
    "capital": "Cusco",
    "label": "cusco",
    "color": "#FFC233",
    "description": "A reborn Andean federation that allies with the Mexica against Europe, trading silver, llamas, and mountain riflemen.",
    "regionBoxes": [
     {
      "landmark": "cusco",
      "wLon": 22,
      "hLat": 28
     }
    ],
    "growth": {
     "toLandmarks": [
      "lima",
      "andes",
      "buenosaires"
     ],
     "byYear": 1750
    }
   },
   {
    "id": "mexica_north",
    "name": "Northern Eagle Dominions",
    "start": 1650,
    "end": 2025,
    "capital": "Teotihuacan",
    "label": "teotihuacan",
    "color": "#FFA63D",
    "description": "Aztec settler-vassals and allied plains nations holding the prairies and eastern seaboard against European landings.",
    "regionBoxes": [
     {
      "landmark": "washington",
      "wLon": 36,
      "hLat": 24
     }
    ],
    "growth": {
     "toLandmarks": [
      "boston",
      "washington",
      "sanfrancisco"
     ],
     "byYear": 1850
    }
   }
  ],
  "altEvents": [
   {
    "year": 1521,
    "name": "Causeway Slaughter",
    "type": "WAR",
    "landmark": "tenochtitlan",
    "desc": "Eagle and Jaguar warriors trap Cortes on the flooded causeways; the conquistadors drown in their own gold."
   },
   {
    "year": 1525,
    "name": "Horse of the Sun",
    "type": "DISCOVERY",
    "landmark": "tenochtitlan",
    "desc": "Captured Spanish mares foal in Aztec corrals; within a decade jaguar cavalry rides the valley."
   },
   {
    "year": 1531,
    "name": "Obsidian Foundry",
    "type": "SCIENTIFIC",
    "landmark": "teotihuacan",
    "desc": "Smiths reverse-engineer the arquebus, casting bronze guns beside obsidian blades."
   },
   {
    "year": 1548,
    "name": "The Pox Survived",
    "type": "DISCOVERY",
    "landmark": "tenochtitlan",
    "desc": "Priest-physicians spread deliberate mild infection; the empire endures the plagues that should have killed it."
   },
   {
    "year": 1562,
    "name": "Eagle Meets Condor",
    "type": "TRADE",
    "landmark": "cusco",
    "desc": "Mexica envoys and the Andean lords swear a sun-alliance against the pale ships from the east."
   },
   {
    "year": 1588,
    "name": "Caribbean Cleared",
    "type": "WAR",
    "landmark": "caribbean",
    "desc": "War canoes and captured galleons sweep Spanish outposts from the islands."
   },
   {
    "year": 1640,
    "name": "Sun-Empire Roads",
    "type": "FOUNDING",
    "landmark": "olmec",
    "desc": "A network of paved highways and relay-runners binds Mesoamerica into one administered realm."
   },
   {
    "year": 1701,
    "name": "Wall of the North",
    "type": "WAR",
    "landmark": "washington",
    "desc": "Allied plains nations and Aztec riflemen halt English and French colonists at the great rivers."
   },
   {
    "year": 1789,
    "name": "Codex Enlightenment",
    "type": "CULTURAL",
    "landmark": "tenochtitlan",
    "desc": "Printed picture-codices and a reformed calendar spark a Mexica scientific golden age."
   },
   {
    "year": 1848,
    "name": "Steam Eagles",
    "type": "SCIENTIFIC",
    "landmark": "teotihuacan",
    "desc": "Steam railroads and ironclad lake-ships modernize the empire on its own terms."
   },
   {
    "year": 1898,
    "name": "Spain Expelled",
    "type": "COLLAPSE",
    "landmark": "philippines",
    "desc": "The last Spanish New-World claims dissolve; Madrid signs away the Americas forever."
   },
   {
    "year": 1969,
    "name": "Quetzal to Orbit",
    "type": "SCIENTIFIC",
    "landmark": "capecanaveral",
    "desc": "A feathered-serpent rocket lifts from the Gulf coast; the Sun-Empire reaches space."
   },
   {
    "year": 2025,
    "name": "Two-Continent Power",
    "type": "CULTURAL",
    "landmark": "tenochtitlan",
    "desc": "Nahuatl is a world language; the Mexica superstate spans from the prairies to the pampas."
   }
  ],
  "tickerLines": [
   "FLASH: Cortes dead on the causeways -- Tenochtitlan stands!",
   "Aztec corrals breed the first New-World warhorses",
   "Obsidian and gunpowder: jaguar warriors take up the arquebus",
   "Priests beat the pox -- the empire survives the plague",
   "Eagle and Condor swear alliance against the pale ships",
   "Spanish galleons swept from the Caribbean",
   "Sun-roads bind Mesoamerica from sea to sea",
   "Colonists turned back at the great rivers of the north",
   "Picture-codices roll off Mexica printing stones",
   "Steam eagles thunder across the empire's iron rails",
   "Madrid signs away the Americas -- Spain goes home",
   "Nahuatl now spoken on two continents"
  ]
 },
 {
  "id": 7,
  "year": 1914,
  "rewindTo": 1914,
  "name": "No World War I",
  "summary": "A nervous Sarajevo cop knocks the pistol from Princip's hand, and the 20th century never burns. The old land empires limp, reform, and quietly outlive everyone who buried them.",
  "civDeltas": [
   {
    "civ": "ottoman",
    "endOverride": 2025,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "mecca",
      "jerusalem",
      "anatolia",
      "babylon"
     ],
     "byYear": 1990
    },
    "note": "No Allied carve-up, no Sevres, no Ataturk rupture. A constitutional Ottoman federation modernizes Anatolia and holds the Arab provinces as autonomous vilayets into the 21st century."
   },
   {
    "civ": "russia_empire",
    "endOverride": 2025,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "samarkand",
      "manchuria",
      "stpetersburg",
      "kiev"
     ],
     "byYear": 1970
    },
    "note": "No February or October Revolution. The Duma forces a real constitutional monarchy; the Romanov state survives as a sprawling federated empire from Warsaw to the Pacific."
   },
   {
    "civ": "germany",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "berlin",
      "rhine",
      "vienna"
     ],
     "byYear": 1950
    },
    "note": "No defeat, no Versailles, no Weimar collapse, no Nazism. Wilhelmine Germany evolves into an industrial constitutional powerhouse and the economic anchor of Mitteleuropa."
   },
   {
    "civ": "britain_empire",
    "endOverride": 2025,
    "desaturate": true,
    "growth": null,
    "note": "Spared the bleeding of two wars, the Empire decolonizes slowly and on its own terms, mutating into a vast trade Commonwealth rather than shattering."
   },
   {
    "civ": "usa",
    "endOverride": 2025,
    "desaturate": false,
    "growth": null,
    "note": "Never dragged into Europe's wars, America stays a confident continental and Pacific power, rich but less globally domineering."
   }
  ],
  "suppress": [
   "ussr",
   "japan_empire"
  ],
  "newCivs": [
   {
    "id": "austria_danube",
    "name": "Danubian Federation",
    "start": 1925,
    "end": 2025,
    "capital": "Vienna",
    "label": "vienna",
    "color": "#F4B23E",
    "description": "Reborn from Austria-Hungary's deathbed, a federation of Germans, Magyars, Czechs, Croats, and Poles bound by railroads, courts, and compromise instead of crowns.",
    "regionBoxes": [
     {
      "landmark": "vienna",
      "wLon": 30,
      "hLat": 20
     }
    ],
    "growth": {
     "toLandmarks": [
      "sarajevo",
      "kiev"
     ],
     "byYear": 1960
    }
   },
   {
    "id": "mitteleuropa",
    "name": "Mitteleuropa Customs Union",
    "start": 1935,
    "end": 2025,
    "capital": "Berlin",
    "label": "berlin",
    "color": "#FFD166",
    "description": "A continental free-trade bloc orbiting Berlin and Vienna that does peacefully what armies failed to do: knit Central Europe into one market.",
    "regionBoxes": [
     {
      "landmark": "berlin",
      "wLon": 28,
      "hLat": 18
     }
    ],
    "growth": {
     "toLandmarks": [
      "paris",
      "amsterdam",
      "rome_eu"
     ],
     "byYear": 2000
    }
   },
   {
    "id": "arab_autonomy",
    "name": "Arab Vilayets",
    "start": 1930,
    "end": 2025,
    "capital": "Mecca",
    "label": "mecca",
    "color": "#FF9F45",
    "description": "Self-governing Arab provinces within a loosened Ottoman federation, oil-rich and proudly autonomous yet never partitioned by foreign mandates.",
    "regionBoxes": [
     {
      "landmark": "mecca",
      "wLon": 26,
      "hLat": 24
     }
    ],
    "growth": {
     "toLandmarks": [
      "jerusalem",
      "babylon"
     ],
     "byYear": 1975
    }
   }
  ],
  "altEvents": [
   {
    "year": 1914,
    "name": "Sarajevo Foiled",
    "type": "DISCOVERY",
    "landmark": "sarajevo",
    "desc": "A wrong turn never happens; the Archduke's car speeds past as the assassin's pistol is wrestled away. The match that would have lit the world goes out."
   },
   {
    "year": 1916,
    "name": "The Long Peace Begins",
    "type": "CULTURAL",
    "landmark": "vienna",
    "desc": "With no Western Front, Europe's great powers settle into an armed but profitable truce. Diplomats, not generals, divide the spoils of the new century."
   },
   {
    "year": 1919,
    "name": "Romanov Constitution",
    "type": "FOUNDING",
    "landmark": "stpetersburg",
    "desc": "No war, no famine, no Lenin. A frightened Tsar signs real powers to the Duma; Russia becomes a constitutional empire instead of a charnel house."
   },
   {
    "year": 1925,
    "name": "Danube Federalized",
    "type": "FOUNDING",
    "landmark": "vienna",
    "desc": "Aging Franz Joseph's heirs trade the dual monarchy for a federation of nations, granting votes to Czechs, Croats, and Poles to keep the empire alive."
   },
   {
    "year": 1931,
    "name": "Ottoman Reform Charter",
    "type": "CULTURAL",
    "landmark": "constantinople",
    "desc": "Constitutional sultans and Arab notables sign a charter of autonomous vilayets, modernizing the empire without a single mandate flag raised."
   },
   {
    "year": 1938,
    "name": "Petro-Boom of Babylon",
    "type": "TRADE",
    "landmark": "babylon",
    "desc": "Mesopotamian oil flows under Ottoman-Arab licenses, never under colonial ones. Baghdad and Basra grow fat on derricks and pipelines."
   },
   {
    "year": 1945,
    "name": "No Mushroom Cloud",
    "type": "DISCOVERY",
    "landmark": "hiroshima",
    "desc": "Atomic physics advances slowly and openly in peaceful labs. No second world war means no race to weaponize the atom over a burning city."
   },
   {
    "year": 1957,
    "name": "Five-Empire Concord",
    "type": "TRADE",
    "landmark": "paris",
    "desc": "Germany, Russia, Britain, the Ottomans, and the Danube sign a continental concord on trade and arms limits: the bones of a multipolar century."
   },
   {
    "year": 1969,
    "name": "Joint Moonshot",
    "type": "SCIENTIFIC",
    "landmark": "baikonur",
    "desc": "Without a Cold War to fund a race, the empires pool engineers; a multinational crew reaches the Moon a decade late but together."
   },
   {
    "year": 1984,
    "name": "The Wall Never Rises",
    "type": "CULTURAL",
    "landmark": "berlinwall",
    "desc": "Berlin, never bombed and never divided, becomes the unbroken capital of Mitteleuropa: one city, one market, no checkpoints."
   },
   {
    "year": 2001,
    "name": "Commonwealth of Empires",
    "type": "TRADE",
    "landmark": "london",
    "desc": "The old empires, now hollowed into trade federations, formalize a loose Commonwealth: passports, tariffs, and treaties replace garrisons."
   },
   {
    "year": 2025,
    "name": "The Century That Didn't Burn",
    "type": "CULTURAL",
    "landmark": "vienna",
    "desc": "Historians mark a hundred years without a world war. Five aging empires, reformed and federated, share a crowded, peaceful, multipolar planet."
   }
  ],
  "tickerLines": [
   "SARAJEVO: Archduke survives -- assassin disarmed, plot collapses",
   "ST PETERSBURG: Tsar grants Duma real power, revolution averted",
   "VIENNA: Habsburgs federate the Danube -- Czechs and Croats get the vote",
   "CONSTANTINOPLE: Ottoman charter creates autonomous Arab vilayets",
   "BERLIN: Kaiser's Reich modernizes -- no Versailles, no Weimar, no Hitler",
   "BABYLON: Mesopotamian oil flows under Ottoman, not colonial, flags",
   "HIROSHIMA: no second world war -- the atom stays in the laboratory",
   "PARIS: Five-Empire Concord limits arms, opens borders to trade",
   "BAIKONUR: empires pool engineers for a joint Moon landing",
   "BERLIN: no wall ever rises -- the city stays whole",
   "LONDON: old empires reborn as a peaceful trade Commonwealth",
   "VIENNA: 100 years and not one world war -- the century that didn't burn"
  ]
 },
 {
  "id": 8,
  "year": 1945,
  "rewindTo": 1939,
  "name": "Axis Victory",
  "summary": "Germany and Japan win the Second World War. A Nazi sphere swallows Europe to the Urals, Japan owns the Pacific, and a shrunken America hides behind two oceans.",
  "civDeltas": [
   {
    "civ": "germany",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "paris",
      "london",
      "vienna",
      "moscow",
      "kiev",
      "stpetersburg",
      "rome_eu",
      "amsterdam",
      "scandinavia"
     ],
     "byYear": 1945
    },
    "note": "The Greater Germanic Reich annexes continental Europe and pushes its eastern frontier to the Urals."
   },
   {
    "civ": "japan_empire",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "beijing",
      "xian",
      "nanjing",
      "wuhan",
      "manchuria",
      "korea",
      "saigon",
      "malacca",
      "philippines",
      "moluccas",
      "hawaii",
      "pacific_mid"
     ],
     "byYear": 1945
    },
    "note": "The Greater East Asia Co-Prosperity Sphere becomes a real empire spanning China, Southeast Asia, and the whole Pacific."
   },
   {
    "civ": "usa",
    "endOverride": 2025,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "washington",
      "boston",
      "nyc",
      "sanfrancisco",
      "alaska"
     ],
     "byYear": 1945
    },
    "note": "Defeated abroad and broken at home, America retreats into Fortress North America and bitter isolation."
   }
  ],
  "suppress": [
   "ussr"
  ],
  "newCivs": [
   {
    "id": "italy_mediterraneo",
    "name": "Italian Mare Nostrum",
    "start": 1945,
    "end": 2025,
    "capital": "Rome",
    "label": "rome_eu",
    "color": "#E8B53A",
    "description": "Mussolini's heirs rule a restored Roman lake from the Atlas Mountains to the Suez.",
    "regionBoxes": [
     {
      "landmark": "italy",
      "wLon": 22,
      "hLat": 16
     },
     {
      "landmark": "carthage",
      "wLon": 30,
      "hLat": 14
     }
    ],
    "growth": {
     "toLandmarks": [
      "athens",
      "crete",
      "alexandria",
      "suez",
      "ethiopia",
      "atlas_mts",
      "gibraltar"
     ],
     "byYear": 1950
    }
   },
   {
    "id": "reichskommissariat_ost",
    "name": "Reichskommissariat Ostland",
    "start": 1945,
    "end": 2025,
    "capital": "Kiev",
    "label": "kiev",
    "color": "#C0744A",
    "description": "A vast occupied frontier of slave-worked estates between Berlin's heartland and the Ural wall.",
    "regionBoxes": [
     {
      "landmark": "kiev",
      "wLon": 34,
      "hLat": 20
     },
     {
      "landmark": "moscow",
      "wLon": 30,
      "hLat": 18
     }
    ],
    "growth": {
     "toLandmarks": [
      "stpetersburg",
      "novgorod",
      "samarkand"
     ],
     "byYear": 1955
    }
   },
   {
    "id": "free_americas_pact",
    "name": "Free Americas Pact",
    "start": 1948,
    "end": 2025,
    "capital": "Buenos Aires",
    "label": "buenosaires",
    "color": "#3FB6A0",
    "description": "South American republics band together under exiles, the last governments outside Axis reach.",
    "regionBoxes": [
     {
      "landmark": "buenosaires",
      "wLon": 28,
      "hLat": 26
     },
     {
      "landmark": "brazil",
      "wLon": 34,
      "hLat": 28
     }
    ],
    "growth": {
     "toLandmarks": [
      "lima",
      "andes",
      "caribbean"
     ],
     "byYear": 1965
    }
   }
  ],
  "altEvents": [
   {
    "year": 1940,
    "name": "London Falls",
    "type": "WAR",
    "landmark": "london",
    "desc": "Sea Lion succeeds; the swastika flies over Whitehall as Britain signs the armistice."
   },
   {
    "year": 1941,
    "name": "Pearl Harbor Decisive",
    "type": "WAR",
    "landmark": "pearlharbor",
    "desc": "The carrier strike cripples the Pacific Fleet for good, and Hawaii is invaded within months."
   },
   {
    "year": 1942,
    "name": "Moscow Taken",
    "type": "WAR",
    "landmark": "moscow",
    "desc": "The Red capital falls in the winter; Stalin vanishes and Soviet resistance shatters eastward."
   },
   {
    "year": 1943,
    "name": "Manhattan Betrayed",
    "type": "DISCOVERY",
    "landmark": "nyc",
    "desc": "A spy ring hands the bomb secret to Berlin before America can finish the race."
   },
   {
    "year": 1945,
    "name": "Pax Germanica",
    "type": "FOUNDING",
    "landmark": "berlin",
    "desc": "The Greater Germanic Reich is proclaimed from Brittany to the Urals."
   },
   {
    "year": 1945,
    "name": "Co-Prosperity Sphere",
    "type": "FOUNDING",
    "landmark": "japan",
    "desc": "Tokyo declares dominion over China, the Indies, and the open Pacific."
   },
   {
    "year": 1946,
    "name": "America Withdraws",
    "type": "COLLAPSE",
    "landmark": "washington",
    "desc": "A shattered Congress votes Fortress America: the fleets come home and the gates close."
   },
   {
    "year": 1948,
    "name": "Andean Holdout",
    "type": "FOUNDING",
    "landmark": "buenosaires",
    "desc": "Exile governments forge the Free Americas Pact, the last free states on Earth."
   },
   {
    "year": 1957,
    "name": "Reich Reaches Orbit",
    "type": "SCIENTIFIC",
    "landmark": "baikonur",
    "desc": "German rockets loft the first satellite; the swastika circles the planet."
   },
   {
    "year": 1969,
    "name": "Rising Sun on the Moon",
    "type": "SCIENTIFIC",
    "landmark": "capecanaveral",
    "desc": "Japan plants its banner on the lunar surface, winning the Axis space race."
   },
   {
    "year": 1989,
    "name": "Ural Wall Reinforced",
    "type": "WAR",
    "landmark": "moscow",
    "desc": "Endless partisan war along the Urals hardens into a fortified, irradiated frontier."
   },
   {
    "year": 2025,
    "name": "Eighty Years of Night",
    "type": "CULTURAL",
    "landmark": "berlin",
    "desc": "Two Axis superpowers and a hermit America share a cold, watchful, divided world."
   }
  ],
  "tickerLines": [
   "BERLIN: Greater Germanic Reich now spans Atlantic to the Urals",
   "TOKYO: Co-Prosperity Sphere annexes all of the Pacific",
   "WASHINGTON: Congress votes Fortress America, recalls all fleets",
   "ROME: Mare Nostrum restored, Mediterranean an Italian lake",
   "KIEV: Ostland estates expand as eastern resettlement continues",
   "MOSCOW: Soviet state erased, partisan war smolders past the Volga",
   "LONDON: Occupation authority marks five years of Reich rule",
   "BUENOS AIRES: Free Americas Pact vows to outlast the Axis night",
   "BAIKONUR: Reich satellite confirmed orbiting Earth",
   "PACIFIC: Imperial Navy patrols from Hawaii to the Indies",
   "URAL FRONTIER: New defensive line declared impregnable",
   "GLOBAL: Eighty years on, the world remains carved between empires"
  ]
 },
 {
  "id": 9,
  "year": 1962,
  "rewindTo": 1962,
  "name": "Nuclear Exchange",
  "summary": "October 1962: the Cuban standoff cracks and warheads fly. Washington and Moscow burn together, and the future is inherited by the nations that never fired a shot.",
  "civDeltas": [
   {
    "civ": "usa",
    "endOverride": 1963,
    "desaturate": true,
    "growth": null,
    "note": "Decapitation strikes shatter the federal union; surviving regional remnants linger as a desaturated husk before formal collapse in 1963."
   },
   {
    "civ": "ussr",
    "endOverride": 1963,
    "desaturate": true,
    "growth": null,
    "note": "Moscow, Leningrad and the missile fields are gone; the Soviet state disintegrates into irradiated successor zones by 1963."
   },
   {
    "civ": "china_prc",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "manchuria",
      "moscow",
      "samarkand",
      "steppe",
      "korea"
     ],
     "byYear": 2010
    },
    "note": "Spared the exchange, the PRC absorbs collapsing Soviet Central Asia and the Far East to become the dominant Eurasian power."
   },
   {
    "civ": "india_modern",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "persia",
      "indian_ocean",
      "calicut",
      "delhi",
      "ganges"
     ],
     "byYear": 2005
    },
    "note": "Non-aligned and intact, India becomes the workshop and granary of a post-superpower world, leading the Global South."
   }
  ],
  "suppress": [],
  "newCivs": [
   {
    "id": "brazil",
    "name": "Brazilian Federation",
    "start": 1965,
    "end": 2025,
    "capital": "Brasilia",
    "label": "brazil",
    "color": "#22C55E",
    "description": "Untouched and resource-rich, Brazil unites South America into the leading power of the Western Hemisphere after the North falls silent.",
    "regionBoxes": [
     {
      "landmark": "brazil",
      "wLon": 40,
      "hLat": 30
     }
    ],
    "growth": {
     "toLandmarks": [
      "buenosaires",
      "lima",
      "caribbean",
      "andes"
     ],
     "byYear": 2000
    }
   },
   {
    "id": "free_states_america",
    "name": "Free States of America",
    "start": 1968,
    "end": 2025,
    "capital": "San Francisco",
    "label": "sanfrancisco",
    "color": "#F59E0B",
    "description": "A fragile coalition of surviving Pacific-coast towns rebuilds amid the irradiated ruin of the old United States.",
    "regionBoxes": [
     {
      "landmark": "sanfrancisco",
      "wLon": 16,
      "hLat": 14
     }
    ],
    "growth": {
     "toLandmarks": [
      "alaska"
     ],
     "byYear": 2010
    }
   },
   {
    "id": "south_african_union",
    "name": "Cape Union",
    "start": 1975,
    "end": 2025,
    "capital": "Cape Town",
    "label": "capeofgoodhope",
    "color": "#FB7185",
    "description": "Spared and mineral-rich, southern Africa rises as a hub linking the new powers of the South Atlantic and Indian Ocean.",
    "regionBoxes": [
     {
      "landmark": "capeofgoodhope",
      "wLon": 22,
      "hLat": 18
     }
    ],
    "growth": {
     "toLandmarks": [
      "greatzimbabwe",
      "congo"
     ],
     "byYear": 2010
    }
   }
  ],
  "altEvents": [
   {
    "year": 1962,
    "name": "Cuba Burns",
    "type": "WAR",
    "landmark": "cuba",
    "desc": "A downed spy plane sparks the order to launch; the first warheads fall on the Caribbean and the world holds its breath no longer."
   },
   {
    "year": 1962,
    "name": "Washington Falls",
    "type": "COLLAPSE",
    "landmark": "washington",
    "desc": "The American capital vanishes in a flash; the chain of command dies with it and the republic comes apart overnight."
   },
   {
    "year": 1962,
    "name": "Moscow Erased",
    "type": "COLLAPSE",
    "landmark": "moscow",
    "desc": "Retaliatory strikes gut the Soviet heartland; the Kremlin's lights go dark forever as the union fractures."
   },
   {
    "year": 1963,
    "name": "Nuclear Winter",
    "type": "DISASTER",
    "landmark": "rome_eu",
    "desc": "Soot blots out the sun across the north; failed harvests and killing frosts empty the great cities of Europe."
   },
   {
    "year": 1964,
    "name": "The Dead Zones",
    "type": "DISASTER",
    "landmark": "berlinwall",
    "desc": "Fallout maps the new borders of the world: vast irradiated wastes seal off the old industrial heartlands."
   },
   {
    "year": 1965,
    "name": "Brasilia Rises",
    "type": "FOUNDING",
    "landmark": "brazil",
    "desc": "Spared the fire, Brazil opens its borders and silos to refugees and proclaims a new federation for a broken hemisphere."
   },
   {
    "year": 1968,
    "name": "Pacific Remnant",
    "type": "FOUNDING",
    "landmark": "sanfrancisco",
    "desc": "Survivors along the western shore stitch together the Free States of America from the wreckage of the old union."
   },
   {
    "year": 1971,
    "name": "Delhi Doctrine",
    "type": "CULTURAL",
    "landmark": "delhi",
    "desc": "India convenes the non-aligned survivors and declares itself the workshop and conscience of the Global South."
   },
   {
    "year": 1978,
    "name": "China Marches West",
    "type": "WAR",
    "landmark": "samarkand",
    "desc": "The PRC pours into the leaderless Soviet steppe, claiming Central Asia clear to the ruins of Moscow."
   },
   {
    "year": 1985,
    "name": "Cape Renaissance",
    "type": "TRADE",
    "landmark": "capeofgoodhope",
    "desc": "Southern Africa's untouched mines and ports boom, binding Brazil, India and the new South into a single trade web."
   },
   {
    "year": 1999,
    "name": "Green Revolution South",
    "type": "SCIENTIFIC",
    "landmark": "ganges",
    "desc": "Drought-proof grain bred in India and Brazil finally outpaces the famines, feeding billions in the rebuilt South."
   },
   {
    "year": 2025,
    "name": "The Southern Century",
    "type": "CULTURAL",
    "landmark": "buenosaires",
    "desc": "Sixty years on, a confident South leads the world while the irradiated North still slumbers under its ash."
   }
  ],
  "tickerLines": [
   "FLASH: Caribbean ablaze -- nuclear war has begun.",
   "Washington silent. No word from any surviving authority.",
   "Moscow gone. Soviet command structure has ceased to exist.",
   "Skies darken over Europe as the long winter sets in.",
   "Geiger counters redraw the map: enter the Dead Zones.",
   "Brasilia opens its doors -- the South takes in the lost.",
   "Survivors raise the Free States flag over San Francisco.",
   "Delhi: 'The future belongs to those who did not fire.'",
   "Chinese columns reach the empty Soviet steppe.",
   "Cape Town booms as Southern trade routes light up.",
   "New grain ends the famines -- the South is feeding itself.",
   "2025: a Southern century, born from the northern ashes."
  ]
 },
 {
  "id": 10,
  "year": 1991,
  "rewindTo": 1985,
  "name": "USSR Survives",
  "summary": "Gorbachev's reforms steady the ship instead of sinking it: the Union holds, the Wall stands taller, and the Cold War freezes into a century-long tech and space duel between Moscow and Washington.",
  "civDeltas": [
   {
    "civ": "ussr",
    "endOverride": 2025,
    "desaturate": true,
    "growth": {
     "toLandmarks": [
      "samarkand",
      "steppe",
      "novgorod",
      "stpetersburg",
      "scandinavia"
     ],
     "byYear": 2005
    },
    "note": "The August coup fails, the New Union Treaty is signed, and a reformed-but-intact USSR modernizes and keeps its republics through 2025."
   },
   {
    "civ": "usa",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "boston",
      "sanfrancisco"
     ],
     "byYear": 2000
    },
    "note": "No post-Cold-War 'end of history' dividend; the US stays locked in a renewed arms, space, and cyber race with a living Soviet Union."
   },
   {
    "civ": "china_prc",
    "endOverride": 2025,
    "desaturate": false,
    "growth": {
     "toLandmarks": [
      "beijing",
      "xian",
      "manchuria"
     ],
     "byYear": 2010
    },
    "note": "Caught between two surviving superpowers, Beijing plays a guarded third pole rather than the lone rising giant of our timeline."
   }
  ],
  "suppress": [
   "eu"
  ],
  "newCivs": [
   {
    "id": "warsaw_bloc",
    "name": "Iron Curtain Bloc",
    "start": 1991,
    "end": 2025,
    "capital": "East Berlin",
    "label": "berlinwall",
    "color": "#F25C05",
    "description": "The Warsaw Pact never dissolves; a fortified Eastern Europe stays welded to Moscow with the Berlin Wall as its glowing spine.",
    "regionBoxes": [
     {
      "landmark": "berlinwall",
      "wLon": 16,
      "hLat": 10
     },
     {
      "landmark": "berlin",
      "wLon": 12,
      "hLat": 8
     }
    ],
    "growth": {
     "toLandmarks": [
      "vienna",
      "kiev"
     ],
     "byYear": 1996
    }
   },
   {
    "id": "red_sphere",
    "name": "Soviet World Sphere",
    "start": 1991,
    "end": 2025,
    "capital": "Havana",
    "label": "cuba",
    "color": "#E8482B",
    "description": "A globe-spanning belt of Moscow-armed client states from the Caribbean to the Horn of Africa, bankrolled to deny the West its unipolar moment.",
    "regionBoxes": [
     {
      "landmark": "cuba",
      "wLon": 9,
      "hLat": 6
     },
     {
      "landmark": "ethiopia",
      "wLon": 16,
      "hLat": 14
     }
    ],
    "growth": {
     "toLandmarks": [
      "congo",
      "caribbean",
      "india"
     ],
     "byYear": 2010
    }
   },
   {
    "id": "soviet_cosmos",
    "name": "Lunograd Cosmodrome",
    "start": 1996,
    "end": 2025,
    "capital": "Baikonur",
    "label": "baikonur",
    "color": "#FFD23F",
    "description": "The reborn Soviet space program turns Baikonur into a launch empire feeding permanent stations in orbit and a crewed base on the Moon.",
    "regionBoxes": [
     {
      "landmark": "baikonur",
      "wLon": 13,
      "hLat": 10
     }
    ],
    "growth": {
     "toLandmarks": [
      "steppe"
     ],
     "byYear": 2010
    }
   }
  ],
  "altEvents": [
   {
    "year": 1991,
    "name": "The Union Holds",
    "type": "FOUNDING",
    "landmark": "moscow",
    "desc": "The August coup collapses, Gorbachev signs the New Union Treaty, and a reformed USSR steps back from the brink intact."
   },
   {
    "year": 1992,
    "name": "EU Stillborn",
    "type": "COLLAPSE",
    "landmark": "aachen",
    "desc": "With the Cold War still raging, Maastricht falls apart and a unified Europe never gets off the drawing board."
   },
   {
    "year": 1993,
    "name": "Wall Reinforced",
    "type": "CULTURAL",
    "landmark": "berlinwall",
    "desc": "Far from falling, the Berlin Wall is rebuilt taller and floodlit as the proud frontier of Cold War II."
   },
   {
    "year": 1996,
    "name": "Mir-2 Aloft",
    "type": "SCIENTIFIC",
    "landmark": "baikonur",
    "desc": "Soviet rockets loft the sprawling Mir-2 station, restarting the space race in earnest."
   },
   {
    "year": 1999,
    "name": "OGAS Goes Live",
    "type": "DISCOVERY",
    "landmark": "moscow",
    "desc": "The USSR fields OGAS, a state-run national computer network, opening a parallel digital iron curtain."
   },
   {
    "year": 2003,
    "name": "Lunograd Founded",
    "type": "DISCOVERY",
    "landmark": "baikonur",
    "desc": "Cosmonauts plant the first permanent crewed Moon base, and the red flag flies over the Sea of Tranquility."
   },
   {
    "year": 2008,
    "name": "The Great Blackout",
    "type": "WAR",
    "landmark": "nyc",
    "desc": "A cyber duel between Moscow and Washington dims the US Eastern Seaboard for three days; both sides deny everything."
   },
   {
    "year": 2014,
    "name": "Red Mars Probe",
    "type": "SCIENTIFIC",
    "landmark": "baikonur",
    "desc": "A Soviet lander touches down on Mars years ahead of any rival, beaming home propaganda from another world."
   },
   {
    "year": 2019,
    "name": "Caribbean Standoff",
    "type": "WAR",
    "landmark": "cuba",
    "desc": "Hypersonic missiles return to Havana and the world holds its breath through a second Cuban crisis."
   },
   {
    "year": 2025,
    "name": "The Long Freeze",
    "type": "CULTURAL",
    "landmark": "berlinwall",
    "desc": "A century after Lenin, two superpowers glare across a wired, orbital, undefeated Cold War with no end in sight."
   }
  ],
  "tickerLines": [
   "MOSCOW: 'The Union is reformed, the Union endures' -- Gorbachev",
   "BERLIN: Wall rebuilt taller; checkpoints now run on facial scanners",
   "BRUSSELS: European unity talks collapse as Cold War II hardens",
   "BAIKONUR: Mir-2 station opens for permanent crews",
   "WASHINGTON: Pentagon doubles 'Star Wars' missile-shield budget",
   "RED NET: USSR switches on OGAS, its own national computer grid",
   "THE MOON: Cosmonauts raise the hammer and sickle over Lunograd base",
   "NEW YORK: Three-day blackout blamed on Soviet cyber strike",
   "MARS: Soviet lander beats the West to the red planet",
   "HAVANA: Hypersonic missiles trigger second Caribbean crisis",
   "BEIJING: Caught between two giants, China hedges its bets",
   "2025: The Cold War turns 80 and shows no sign of thawing"
  ]
 }
];
})(typeof window !== "undefined" ? window : globalThis);
