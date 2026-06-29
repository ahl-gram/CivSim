# Civilization Timeline Simulation — Claude Code Prompt

> Paste this entire document into Claude Code (Ultracode) as your prompt.

---

# Civilization Timeline Simulation — 40,000 BC to Present Day

## Overview
Build a single-file HTML5/Canvas web app simulating the rise and fall of human civilizations from 40,000 BC to 2025 AD. The aesthetic must evoke 1990s DOS strategy games — specifically the feel of Civilization I (1991) and Colonization (1994): pixel fonts, chunky double-line UI borders, VGA-era saturated colors, and optional CRT scanlines. The app must be fully self-contained in one HTML file.

---

## Tech Stack
- Single HTML file: CSS in `<style>`, JS in `<script>`
- HTML5 Canvas for map rendering (no external canvas libraries)
- Google Font: `"Press Start 2P"` (pixel font — import from fonts.googleapis.com)
- Web Audio API for retro beep sounds on major events (square wave, ~100ms)
- No other external dependencies

---

## Visual Style & Aesthetic

### Color & Design
- Background: `#000014` (near-black navy)
- Ocean: `#0a1a5c` with subtle `#0d2070` horizontal stripe dithering every 4px (simulate 1990s texture)
- Land base: `#1a3a0a` (dark forest green)
- Mountains: `#3a3a3a`
- Desert: `#6b5010`
- Tundra/Arctic: `#d0d8e8`
- UI panels: `#000080` background, `#ffffff` double-line border (exact DOS box-drawing style)
- All UI text: `"Press Start 2P"` font
- Label shadows: 2px black offset on all map text (for readability)

### CRT Effect
- Thin semi-transparent horizontal lines (1px black every 3px) overlaid on the entire canvas via a CSS `::after` pseudo-element at 15% opacity — optional toggle in settings

### UI Layout (pixel-art style borders everywhere)
```
╔════════════════════════════════════════════════════════════════╗
║  CIVILIZATIONS THROUGH TIME          3500 BC    [BRONZE AGE]  ║
╠═══════════════════════════════════════════════╦════════════════╣
║                                               ║ ACTIVE CIVS   ║
║              WORLD MAP (CANVAS)               ╠════════════════╣
║                                               ║ RECENT EVENTS  ║
║                                               ║                ║
╠═══════════════════════════════════════════════╩════════════════╣
║ TICKER: [40000 BC] Homo sapiens spread across Africa >>>       ║
╠════════════════════════════════════════════════════════════════╣
║ [▶ PLAY] [⏸ PAUSE]  SPEED: [0.5x][1x][2x][5x][10x][50x]      ║
║ JUMP TO: [__________]  FILTERS: [WARS][EVENTS][CIVS][GRID]    ║
║ [ALT HISTORY: OFF]                                             ║
╚════════════════════════════════════════════════════════════════╝
```

The `ALT HISTORY` button glows amber when active to visually distinguish it from the real-history mode.

---

## World Map

Draw simplified continent outlines as polygon arrays (percentages of canvas area). Use an equirectangular projection. Map area: ~900x500px canvas. Keep continent shapes "gamey" and recognizable but not pixel-perfect — slightly blocky like Civ I.

Polygons needed (define as % coordinates):
- North America
- South America
- Europe
- Africa
- Middle East / Arabia
- South Asia (India)
- East Asia (China/Japan peninsula)
- Southeast Asia
- Central Asia (steppe region)
- Oceania / Australia

Add simple mountain ranges as small triangle clusters at:
- Alps, Himalayas, Andes, Rockies, Atlas Mountains, Urals

Ocean fills the rest.

---

## Civilizations Data

Each civilization object:
```js
{
  id: 'egypt',
  name: 'Egypt',
  start: -3100,   // BC = negative
  end: -30,
  color: '#FFD700',
  peak: -1300,    // year of max power (for glow effect)
  region: [       // polygon of [x%, y%] map coordinates
    [52, 38], [58, 38], [58, 48], [52, 48]
  ],
  label: [55, 43], // [x%, y%] for name label placement
  capital: 'Memphis',
  description: 'Ancient Egyptian civilization along the Nile'
}
```

### Include ALL of these civilizations:

**Prehistoric (40,000 BC – 3,500 BC)**
- Early Homo Sapiens (Out of Africa): -70000 to -10000, multiple regions
- Cro-Magnon / European Hunter-Gatherers: -40000 to -5000 (Europe)
- Jōmon (Japan): -14000 to -300 (Japan)
- Göbekli Tepe Culture: -9500 to -8000 (Southern Turkey)

**River Valley Civilizations**
- Sumer / Mesopotamia: -3500 to -500 (Iraq)
- Ancient Egypt: -3100 to -30 (Nile Valley)
- Indus Valley: -2600 to -1900 (Pakistan/NW India)
- Shang/Zhou Dynasty: -1600 to -256 (China)
- Minoan: -2700 to -1100 (Crete/Aegean)
- Olmec: -1500 to -400 (Mexico)

**Classical Antiquity**
- Ancient Greece: -800 to -146 (Greece + colonies)
- Achaemenid Persia: -550 to -330 (Middle East)
- Carthage: -650 to -146 (North Africa)
- Maurya Empire: -322 to -185 (India)
- Alexander's Empire: -336 to -323 (Middle East to India) — fast-expanding
- Roman Republic: -509 to -27 (Mediterranean)
- Roman Empire: -27 to 476 (Mediterranean, larger)
- Han Dynasty: -206 to 220 (China)
- Qin Dynasty: -221 to -206 (China)
- Parthian Empire: -247 to 224 (Persia)

**Post-Classical**
- Byzantine Empire: 330 to 1453 (Eastern Mediterranean)
- Sassanid Persia: 224 to 651 (Iran/Iraq)
- Gupta Empire: 320 to 550 (India)
- Umayyad/Abbasid Caliphate: 632 to 1258 (Middle East, N Africa, Spain)
- Tang Dynasty: 618 to 907 (China)
- Song Dynasty: 960 to 1279 (China)
- Holy Roman Empire: 962 to 1806 (Central Europe)
- Viking Age: 793 to 1100 (Scandinavia → N Atlantic)
- Mali Empire: 1235 to 1600 (West Africa)
- Khmer Empire: 802 to 1431 (Southeast Asia)
- Mongol Empire: 1206 to 1368 (Eurasia — rapid expansion animation)
- Aztec Empire: 1300 to 1521 (Mexico)
- Inca Empire: 1438 to 1572 (Andes)

**Early Modern**
- Ottoman Empire: 1299 to 1922 (Turkey, Middle East, N Africa)
- Ming/Qing Dynasty: 1368 to 1912 (China)
- Mughal Empire: 1526 to 1857 (India)
- Spanish Empire: 1492 to 1898 (Americas, Europe, Philippines)
- Portuguese Empire: 1415 to 1999 (Africa, Brazil, Asia)
- Dutch Republic/Empire: 1581 to 1795 (Europe, SE Asia, Americas)
- British Empire: 1583 to 1997 (Global — maximum size ~1920)
- French Empire (Napoleon): 1804 to 1815 (Europe)
- Russian Empire: 1721 to 1917 (Eurasia)

**Modern (after 1776)**
- United States: 1776 to present
- German Empire / Nazi Germany / Germany: 1871 to present
- Japanese Empire: 1868 to 1945 (Asia-Pacific)
- Soviet Union: 1922 to 1991 (Eurasia)
- Republic of China / PRC: 1912 to present
- Modern India: 1947 to present
- European Union (symbolic): 1993 to present

---

## Historical Events Data

Each event:
```js
{
  year: -3200,
  name: 'Writing Invented',
  location: [54, 40],  // [x%, y%] on map
  type: 'DISCOVERY',   // DISCOVERY | WAR | COLLAPSE | FOUNDING | CULTURAL | SCIENTIFIC | TRADE | DISASTER
  description: 'Cuneiform script emerges in Sumer',
  civ: 'sumer'         // optional: which civ to highlight
}
```

### Required events (add more as you see fit):

| Year | Event | Type |
|------|-------|------|
| -40000 | Out of Africa migration | DISCOVERY |
| -12000 | End of Last Ice Age | DISASTER |
| -10000 | Agricultural Revolution begins (Fertile Crescent) | DISCOVERY |
| -3200 | Writing invented (Sumer) | DISCOVERY |
| -3100 | Egypt unified under Menes | FOUNDING |
| -2560 | Great Pyramid of Giza built | CULTURAL |
| -1274 | Battle of Kadesh (Egypt vs Hittites) | WAR |
| -776 | First Olympic Games (Greece) | CULTURAL |
| -563 | Birth of Buddha (India) | CULTURAL |
| -551 | Birth of Confucius (China) | CULTURAL |
| -490 | Battle of Marathon | WAR |
| -431 | Peloponnesian War begins | WAR |
| -323 | Death of Alexander the Great | COLLAPSE |
| -221 | Great Wall construction begins | CULTURAL |
| -44 | Julius Caesar assassinated | WAR |
| -4 | Birth of Jesus (Judea) | CULTURAL |
| 79 | Vesuvius erupts — Pompeii destroyed | DISASTER |
| 105 | Paper invented in China | DISCOVERY |
| 476 | Fall of Western Rome | COLLAPSE |
| 570 | Birth of Muhammad (Arabia) | CULTURAL |
| 793 | Viking raids begin | WAR |
| 1066 | Battle of Hastings | WAR |
| 1095 | First Crusade begins | WAR |
| 1206 | Genghis Khan unites the Mongols | FOUNDING |
| 1215 | Magna Carta signed | CULTURAL |
| 1347 | Black Death arrives in Europe | DISASTER |
| 1453 | Fall of Constantinople | COLLAPSE |
| 1492 | Columbus reaches the Americas | DISCOVERY |
| 1517 | Protestant Reformation (Luther) | CULTURAL |
| 1543 | Copernican heliocentric model | SCIENTIFIC |
| 1588 | Spanish Armada defeated | WAR |
| 1687 | Newton's Principia Mathematica | SCIENTIFIC |
| 1776 | American Declaration of Independence | FOUNDING |
| 1789 | French Revolution | WAR |
| 1804 | Napoleon crowned Emperor | FOUNDING |
| 1815 | Battle of Waterloo | WAR |
| 1848 | Year of Revolutions (Europe) | WAR |
| 1861 | US Civil War begins | WAR |
| 1869 | Suez Canal opens | TRADE |
| 1879 | Edison invents the lightbulb | SCIENTIFIC |
| 1903 | Wright Brothers' first flight | SCIENTIFIC |
| 1914 | World War I begins | WAR |
| 1917 | Russian Revolution | WAR |
| 1929 | Great Depression begins | COLLAPSE |
| 1939 | World War II begins | WAR |
| 1945 | Atomic bombs dropped on Japan | WAR |
| 1947 | Indian Independence | FOUNDING |
| 1957 | Sputnik launched | SCIENTIFIC |
| 1969 | Moon landing | SCIENTIFIC |
| 1989 | Berlin Wall falls | COLLAPSE |
| 1991 | Soviet Union dissolves | COLLAPSE |
| 2001 | September 11 attacks | WAR |
| 2008 | Global financial crisis | COLLAPSE |
| 2020 | COVID-19 pandemic begins | DISASTER |

---

## Rendering Engine

### Per-Frame Logic (requestAnimationFrame, target 60fps)
1. Clear canvas
2. Fill ocean (solid + dither stripe texture)
3. Draw continent polygons (terrain fill)
4. For each active civilization at current year:
   - Fill territory polygon with civ color at 40% alpha
   - Draw border outline at 80% alpha, 2px
   - If near `peak` year: increase opacity to 65%, add subtle glow
   - If within 100 years of `end`: pulse alpha (fade dying effect)
5. Draw event markers:
   - Active events (within 8 simulated years of current year): pulsing circle, outer ring expanding and fading
   - Color by type: WAR=red, DISCOVERY=cyan, COLLAPSE=orange, etc.
6. Draw all labels:
   - Civilization names (centered in territory, white text with 2px black shadow)
   - Event name labels (appear near marker, float up and fade over 3 seconds real-time)
   - Hide labels when civs are too small or overlapping (simple size threshold)
7. Draw UI overlays (top bar, side panel, ticker, controls)
8. Draw scanlines if enabled

### Era System
```js
const eras = [
  { start: -40000, name: 'STONE AGE',       color: '#888888' },
  { start: -3200,  name: 'BRONZE AGE',      color: '#CD7F32' },
  { start: -1200,  name: 'IRON AGE',        color: '#888888' },
  { start: -500,   name: 'CLASSICAL ERA',   color: '#4169E1' },
  { start: 500,    name: 'DARK AGES',       color: '#4a4a4a' },
  { start: 1000,   name: 'MEDIEVAL',        color: '#8B0000' },
  { start: 1400,   name: 'RENAISSANCE',     color: '#DAA520' },
  { start: 1700,   name: 'INDUSTRIAL',      color: '#708090' },
  { start: 1900,   name: 'MODERN ERA',      color: '#00CED1' },
  { start: 2000,   name: 'INFORMATION AGE', color: '#7B68EE' }
]
```

When the era changes, display a full-width announcement banner for 2 seconds:
```
╔══════════════════════════════════════╗
║   *** ENTERING THE MEDIEVAL ERA ***  ║
╚══════════════════════════════════════╝
```
Play a short ascending 3-note chime (Web Audio API).

---

## Time System

```js
let currentYear = -40000;  // negative = BC
let isPlaying = false;
let speed = 1;             // multiplier

const speedLevels = [0.5, 1, 2, 5, 10, 50, 200];
// At 1x: 100 simulated years per real second
// At 50x: 5,000 simulated years per real second
```

Keyboard shortcuts:
- `Space`: play/pause
- `+` / `-`: speed up/down
- `←` / `→`: step ±500 years
- `Home`: jump to -40000
- `End`: jump to 2025

---

## Side Panel (right 220px)

**Section 1: Current Date** (large pixel font)
- "3,500 BC" or "1492 AD"
- Era name below in smaller font

**Section 2: Active Civilizations** (scrollable list)
- Colored square + civ name
- Sorted by territorial size (largest first)
- Grayed out / strikethrough when a civ just collapsed
- `⚠` icon next to any alt-history civ when alt-history mode is active

**Section 3: Recent Events** (last 8 events)
- Type icon + event name + year
- Color coded by type

---

## Bottom Ticker

Auto-scrolling news ticker:
```
► [476 AD] COLLAPSE: Fall of Western Rome  ► [490 BC] WAR: Battle of Marathon  ►
```
Scroll speed increases with simulation speed. Events are added when they fire.
In alt-history mode, counterfactual events are prefixed with an amber `[ALT]` tag.

---

## Additional Features

### 1. Civilization Info Panel (click to open)
Clicking on a civilization territory opens a pixel-art info popup:
```
╔══════════════════════════════╗
║  [COLOR] ROMAN EMPIRE        ║
║  Founded: 27 BC              ║
║  Collapsed: 476 AD           ║
║  Capital: Rome               ║
║  Status: ● ACTIVE (123 AD)   ║
║  [Description text here]     ║
╚══════════════════════════════╝
```
Click anywhere else to close.

### 2. War Indicators
When a WAR event fires between two civs, display an animated ⚔ symbol between their territory centers. Both civ territory fills pulse red for 10 simulated years. The war icon fades after the period ends.

### 3. Event Type Filter (bottom controls)
Toggle buttons to show/hide:
- ⚔ WARS (red)
- 🔭 DISCOVERIES (cyan)
- 💥 COLLAPSES (orange)
- 🏛 FOUNDINGS (yellow)
- 🎨 CULTURAL (magenta)
- 🌋 DISASTERS (bright orange)

### 4. Simulated Global Population Counter
Display in top bar. Values should match rough historical estimates:

| Year | Population |
|------|-----------|
| -40000 | ~1M |
| -10000 | ~5M |
| 1 AD | ~300M |
| 1800 | ~1B |
| 1927 | ~2B |
| 1960 | ~3B |
| 1974 | ~4B |
| 1987 | ~5B |
| 1999 | ~6B |
| 2023 | ~8B |

Interpolate smoothly. Show as "POP: 1.2M" or "POP: 3.7B".

### 5. Map Grid Toggle
Toggleable 10x10 degree grid lines (like Civ I) in dark blue at 20% opacity.

### 6. Retro Sound Effects (Web Audio API)
Use square wave oscillator (duty cycle 0.5):
- Major event fires: short "boop" (440Hz, 80ms)
- Civ founded: ascending two-tone (440→880Hz)
- Civ collapses: descending tone (440→220Hz, 200ms)
- Era change: triumphant 3-note chime
- All sounds: mute toggle in controls

### 7. Exploration Routes
When Columbus, Magellan, or other explorer events fire, animate a dotted line tracing their route across the map over 3 real seconds.

### 8. Trade Route Layer
Toggle-able layer showing major historical trade routes as golden dashed lines:
- Silk Road: ~100 AD to 1450 AD
- Trans-Saharan trade: ~500 AD to 1600 AD
- Maritime Spice Routes: ~1500 AD to 1800 AD

Lines appear/disappear based on date range.

### 9. Screenshot Button
A "📷 CAPTURE" button that exports the current canvas state as a PNG download named `civ-timeline-YEAR.png`.

### 10. "Random Event" Easter Egg
Pressing `R` while paused triggers a randomly selected historical event's visual at the current year — marker flashes, ticker shows it, side panel updates.

---

### 11. Alternate History Mode

A toggle in the controls bar switches between REAL HISTORY and ALTERNATE HISTORY modes.

When enabled:
- An amber banner replaces the era label: `⚠ ALTERNATE TIMELINE ACTIVE`
- The simulation rewinds to the divergence point for the selected scenario
- Alternate civilizations render with a **dashed** territory border (instead of solid) to signal they are counterfactual
- The bottom ticker prefixes counterfactual entries with an amber `[ALT]` tag
- The side panel shows a `⚠` icon next to any alt-history civ

#### Divergence Scenarios
Implement a dropdown (visible when alt history is toggled on) to select one of these scenarios:

| ID | Divergence Point | Scenario Name | What Changes |
|----|-----------------|---------------|-------------|
| 1 | 323 BC | Alexander Lives | Alexander the Great survives. His empire does not fragment — it persists and expands east into India and west into Italy. Rome never rises to dominance. |
| 2 | 476 AD | Rome Never Falls | The Western Roman Empire stabilizes. It survives and eventually industrializes. No Dark Ages in Europe. Byzantine and Western Rome coexist. |
| 3 | 1274 AD | Mongols Conquer All | The Mongol invasions of Japan succeed, and the storm that historically stopped them in Western Europe also fails. The Mongol Empire encompasses Europe and Japan. |
| 4 | 1347 AD | No Black Death | The Black Death never reaches Europe. Europe's population continues growing, the feudal system holds longer, the Renaissance is delayed by ~150 years. |
| 5 | 1421 AD | China Colonizes | Zheng He's treasure fleet voyages continue. China establishes colonies along Africa, India, and eventually reaches the Americas before Europe. European colonial empires never form at their historical scale. |
| 6 | 1521 AD | Aztec Survives | Hernán Cortés is defeated. The Aztec Empire repels Spanish invasion, eventually adopts firearms, and expands to dominate Mesoamerica into the modern era. |
| 7 | 1914 AD | No World War I | Franz Ferdinand's assassination is foiled. The European alliance system never triggers. The Ottoman, Russian, and Austro-Hungarian empires slowly modernize rather than collapse. No WW2 as we know it. No Soviet Union. |
| 8 | 1945 AD | Axis Victory | Germany and Japan win WWII. Europe is divided into Nazi and Italian spheres. Japan controls the Pacific. The United States retreats into isolationism. |
| 9 | 1962 AD | Nuclear Exchange | The Cuban Missile Crisis escalates. Limited nuclear exchange occurs. Both superpowers collapse. Power shifts to non-combatant nations (India, China, Brazil). |
| 10 | 1991 AD | USSR Survives | Gorbachev's reforms stabilize the Soviet Union rather than unravel it. The Cold War continues into the 21st century as a technological and ideological standoff. |

#### Alternate Civilization Objects
Each scenario adds new civ objects that only render in alt-history mode, plus flags on existing civs that modify their `end` date or expand their `region`. For example:
- Scenario 2 ("Rome Never Falls"): sets Roman Empire `end` to `2025`, gradually expands territory polygon over time
- Scenario 5 ("China Colonizes"): adds a "Chinese Colonial Empire" civ starting ~1430 covering Africa, India, and eventually the Americas
- Scenario 6 ("Aztec Survives"): sets Aztec `end` to `2025`, adds expanded territory growth through 1600–1800

#### Visual Differentiation
- Real civs that "should have died" but persist in alt-history: solid fill, slightly desaturated color
- New counterfactual civs that never existed historically: dashed border, slightly brighter/warmer color
- Side panel `⚠` icon next to any alt-history civ

#### State Management
- Switching alt-history **off** resets `currentYear` to where it was before the divergence point and restores all civ data to historical defaults
- Switching alt-history **on** rewinds to the divergence year for the selected scenario automatically
- Switching between scenarios while in alt-history mode rewinds to the new scenario's divergence point

---

## Performance Notes
- Use `requestAnimationFrame` loop
- Only re-render when `currentYear` changes OR animation is active
- Pre-calculate all polygon screen coordinates once on resize
- Use `canvas.getContext('2d', { alpha: false })` for main map layer
- Layer event markers on a secondary canvas overlay
- Throttle ticker scrolling to CSS animation (not JS)

---

## Starting State
App should open paused at 40,000 BC with a brief "LOADING HISTORY..." splash screen (fake DOS-style boot sequence, ~2 seconds). Then auto-play at 2x speed.

---

## Tone & Feel
The whole app should feel like you discovered a floppy disk of forgotten 1993 shareware and installed it on your old 486. The font, the colors, the double-line borders, the ticker — all of it should feel authentically retro. But the data should be legitimately accurate and fascinating to watch unfold. In Alternate History mode, the amber color scheme and dashed borders should feel like a parallel dimension flickering into view — same retro aesthetic, but subtly wrong in a way that makes you lean in.
