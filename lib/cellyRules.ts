// lib/cellyRules.ts
// -----------------------------------------------------------------------------
// Interim brain for Celly. ONE catalog (single source of truth) + a generic
// search. Mirrors the live category pages (phones, tech-audio,
// accessories-power, marine-world) and the repair-service menu.
// The "more" page is retired and intentionally excluded.
// Superseded by the AI hybrid (app/api/celly) once the API key is set; this
// then becomes the offline fallback.
//
// Messages that should show tappable WhatsApp/Call buttons end with the
// sentinel [[CONTACT]] - the chat window turns that into the two buttons.
// -----------------------------------------------------------------------------

type Item = { n: string; p: number; c: string; s?: boolean; f?: boolean }; // s=back soon, f=from/price-range

const CATALOG: Item[] = [
  // ---- PHONES (in stock) ----
  { n: 'itel A100C', p: 440, c: 'phone' },
  { n: 'Samsung A06', p: 460, c: 'phone' },
  { n: 'itel A90', p: 475, c: 'phone', s: true },
  { n: 'Samsung A07', p: 499, c: 'phone' },
  { n: 'Samsung A16', p: 649, c: 'phone' },
  { n: 'Samsung A42 5G', p: 720, c: 'phone' },
  { n: 'Samsung A17', p: 900, c: 'phone' },
  // ---- PHONES (back soon) ----
  { n: 'iPhone 12', p: 1100, c: 'phone', s: true },
  { n: 'iPhone 13 Pro Max', p: 2300, c: 'phone', s: true },
  { n: 'iPhone 14', p: 2100, c: 'phone', s: true },
  { n: 'Samsung A05', p: 450, c: 'phone', s: true },
  { n: 'Samsung A11', p: 420, c: 'phone', s: true },
  { n: 'Samsung A15', p: 649, c: 'phone', s: true },
  { n: 'Samsung A05s', p: 549, c: 'phone', s: true },
  { n: 'Samsung A25', p: 1199, c: 'phone', s: true },
  { n: 'Samsung A26 5G', p: 1200, c: 'phone', s: true },
  { n: 'Samsung A36', p: 1500, c: 'phone', s: true },
  { n: 'Samsung A56', p: 1800, c: 'phone', s: true },
  { n: 'Samsung F05', p: 420, c: 'phone', s: true },
  { n: 'BLU A140', p: 120, c: 'phone', s: true },
  { n: 'Logic Z1L Flip Phone', p: 199, c: 'phone', s: true },
  { n: 'Nokia 110 4G', p: 199, c: 'phone', s: true },
  { n: 'ZTE Blade A72s', p: 499, c: 'phone', s: true },
  // ---- TABLETS / LAPTOP ----
  { n: 'iPad 9th Generation', p: 1500, c: 'tablet', s: true },
  { n: 'FANGOR Tablet 8"', p: 250, c: 'tablet' },
  { n: 'Lenovo IdeaPad Slim 3', p: 1800, c: 'laptop', s: true },
  // ---- GAMING ----
  { n: 'Cell World 4-in-1 RGB Gaming Kit', p: 350, c: 'gaming' },
  { n: 'PlayStation 5 DualSense Controller', p: 350, c: 'gaming' },
  { n: 'Xbox Controller (Pulse Red)', p: 350, c: 'gaming', s: true },
  { n: 'Xbox Controller (Series X|S, Black)', p: 350, c: 'gaming' },
  { n: 'SteelSeries Stratus+ Mobile Controller', p: 160, c: 'gaming' },
  { n: 'PlayStation 4 DualShock Controller', p: 280, c: 'gaming' },
  { n: 'Razer PS5 Quick Charging Stand', p: 399, c: 'gaming', s: true },
  { n: 'PS5 Digital Edition', p: 2600, c: 'gaming', s: true },
  { n: 'PS5 Console Disc Drive', p: 2900, c: 'gaming', s: true },
  // ---- EARBUDS ----
  { n: 'Cell World Wireless Earbuds (ANC)', p: 89, c: 'earbuds' },
  { n: 'Apple USB-C EarPods', p: 120, c: 'earbuds' },
  { n: 'Apple AirPods 3rd Generation', p: 650, c: 'earbuds', s: true },
  { n: 'JBL Vibe Buds', p: 220, c: 'earbuds' },
  { n: 'Yesido TWS32 (ANC)', p: 140, c: 'earbuds', s: true },
  { n: 'Premium Wireless Earbuds Pro (ANC)', p: 89, c: 'earbuds', s: true },
  { n: '2000 Series Wireless Headphones (Pink)', p: 150, c: 'earbuds', s: true },
  { n: 'Buds2 Pro', p: 120, c: 'earbuds', s: true },
  { n: '2nd Gen EarPods (ANC)', p: 140, c: 'earbuds', s: true },
  { n: 'JBL Endurance Race', p: 280, c: 'earbuds', s: true },
  { n: 'HyperGear AeroFlex 360', p: 160, c: 'earbuds', s: true },
  // ---- HEADPHONES ----
  { n: 'Kotion Each Pro Gaming Headphones', p: 175, c: 'headphones' },
  { n: 'BL500 Gaming Headphones', p: 150, c: 'headphones' },
  { n: 'Motorola Kids Wireless Headphones', p: 150, c: 'headphones', s: true },
  { n: 'JBL TUNE 525', p: 225, c: 'headphones', s: true },
  { n: 'JBL TUNE 520', p: 199, c: 'headphones', s: true },
  { n: 'HyperGear VIBE', p: 90, c: 'headphones', s: true },
  { n: 'HyperGear 2-in-1', p: 110, c: 'headphones', s: true },
  // ---- SPEAKERS ----
  { n: 'JBL GO 3', p: 199, c: 'speakers' },
  { n: 'JBL GO 4 (Navy)', p: 220, c: 'speakers' },
  { n: 'JBL CLIP 4', p: 220, c: 'speakers' },
  { n: 'JBL Flip 6', p: 499, c: 'speakers', s: true },
  { n: 'JBL Pulse 4', p: 599, c: 'speakers' },
  { n: 'JBL Charge 5', p: 599, c: 'speakers' },
  { n: 'JBL Charge 6', p: 720, c: 'speakers' },
  { n: 'JBL Xtreme 4', p: 1250, c: 'speakers', s: true },
  { n: 'JBL Boombox 3 (Black)', p: 1800, c: 'speakers' },
  { n: 'JBL Boombox 3 (Camo)', p: 1800, c: 'speakers', s: true },
  { n: 'RCA BeatBox', p: 200, c: 'speakers', s: true },
  { n: 'RCA TWS GamerBeat', p: 220, c: 'speakers' },
  { n: 'RCA Shock-Wave', p: 380, c: 'speakers', s: true },
  { n: 'RCA BeatWaves (w/ wireless mic)', p: 499, c: 'speakers' },
  { n: 'RCA HoloSound', p: 599, c: 'speakers', s: true },
  { n: 'RCA CrystalBeat', p: 450, c: 'speakers', s: true },
  { n: 'Skull Candy Ounce', p: 160, c: 'speakers', s: true },
  { n: 'Skull Candy Kilo', p: 210, c: 'speakers' },
  { n: 'Skull Candy Terrain Mini', p: 230, c: 'speakers' },
  { n: 'Skull Candy Terrain', p: 330, c: 'speakers' },
  { n: 'Skull Candy Terrain XL', p: 420, c: 'speakers' },
  { n: 'Skull Candy STOMP', p: 950, c: 'speakers', s: true },
  { n: 'Skull Candy Barrel', p: 999, c: 'speakers' },
  { n: 'Fugoo Tough', p: 200, c: 'speakers', s: true },
  { n: 'Urbanista Brisbane Portable Speaker', p: 180, c: 'speakers' },
  { n: 'Braven HD Bluetooth Speaker', p: 150, c: 'speakers' },
  { n: 'RCA ZyloPulse Flame Party Speaker', p: 260, c: 'speakers' },
  { n: 'RCA LUMI CORE LED Sound Blaster', p: 165, c: 'speakers' },
  // ---- WATCHES ----
  { n: 'Casio Analog 1500WH-1BV', p: 200, c: 'watches' },
  { n: 'Casio Analog 1400WH-1AV', p: 200, c: 'watches' },
  { n: 'PEJE Smartwatch', p: 175, c: 'watches', s: true },
  { n: 'PEJE Classic Round', p: 175, c: 'watches', s: true },
  { n: 'PEJE Sport Smartwatch', p: 175, c: 'watches', s: true },
  { n: 'M900 Watch Pro', p: 175, c: 'watches', s: true },
  { n: 'PEJE ZW Series 10', p: 175, c: 'watches', s: true },
  { n: 'PEJE ZW Ultra X', p: 175, c: 'watches', s: true },
  { n: 'PEJE T800 Ultra 2 Max', p: 175, c: 'watches', s: true },
  { n: 'Samsung Galaxy Watch 7', p: 1100, c: 'watches' },
  { n: 'Casio AEQ-110W World Time', p: 250, c: 'watches', s: true },
  { n: 'Smart Watch - Waterproof ($199)', p: 199, c: 'watches' },
  { n: 'Smart Watch - Waterproof ($230)', p: 230, c: 'watches' },
  { n: 'Watch Ultra 7', p: 160, c: 'watches' },
  { n: 'PEJE GPS Smart Watch', p: 200, c: 'watches' },
  { n: 'JS Watch 7 Mini Smart Watch', p: 150, c: 'watches' },
  // ---- MICROPHONES ----
  { n: 'StudioZ Mic (Mono to XLR)', p: 80, c: 'microphones' },
  { n: 'StudioZ Wired & Wireless Mic', p: 80, c: 'microphones', s: true },
  { n: 'Digital Sunflash Microphone', p: 80, c: 'microphones' },
  { n: 'Vivitar Mini Lavalier Mic', p: 140, c: 'microphones' },
  { n: 'Yesido Lavalier Mic (3-in-1)', p: 170, c: 'microphones' },
  { n: 'HyperGear Pro Condenser Mic', p: 180, c: 'microphones' },
  { n: 'Dolphin MCX11 UHF Wireless Mic', p: 200, c: 'microphones', s: true },
  // ---- AUDIO INTERFACES ----
  { n: 'WaveMixer Bluetooth Multi-Channel Interface', p: 75, c: 'audio-interfaces', s: true },
  { n: 'Audiopipe 2 Channel Guitar-Singer Console', p: 350, c: 'audio-interfaces', s: true },
  { n: 'Audiopipe 2 Channel Audio Interface', p: 450, c: 'audio-interfaces', s: true },
  // ---- CAR AUDIO ----
  { n: 'Pipeman Speaker Grills', p: 25, c: 'car-audio', f: true },
  { n: 'Pipeman Speaker Kit', p: 50, c: 'car-audio' },
  { n: 'Audiopipe 8" PVC Speaker Ring', p: 55, c: 'car-audio' },
  { n: 'Pioneer 4" Speaker TS-F1034R', p: 155, c: 'car-audio', s: true },
  { n: 'Pioneer 5 1/4" 2-Way Speaker', p: 160, c: 'car-audio', s: true },
  { n: 'XXX 3-Way Triaxial Car Speaker', p: 160, c: 'car-audio' },
  { n: 'Pipeman Trunk Kit', p: 200, c: 'car-audio' },
  { n: 'Pioneer Dome Tweeter TS-S20', p: 300, c: 'car-audio', s: true },
  { n: 'BLAUPUNKT 4-Way 6x9 Coaxial Speakers', p: 320, c: 'car-audio' },
  // ---- TV & STREAMING ----
  { n: 'Indoor TV Antenna', p: 20, c: 'tv' },
  { n: 'LG / Vizio / Hisense / Samsung TV Remote', p: 40, c: 'tv' },
  { n: 'Fire Stick Remote', p: 40, c: 'tv' },
  { n: 'Universal Smart TV Remote (4-in-1)', p: 65, c: 'tv' },
  { n: 'Roku TV Remote', p: 40, c: 'tv', s: true },
  { n: 'Fire TV Stick 4K Ultra HD', p: 199, c: 'tv', s: true },
  // ---- KEYBOARDS ----
  { n: 'SENIMO Wireless Keyboard & Mouse Combo (several colours)', p: 90, c: 'keyboards' },
  { n: 'USB Keyboard', p: 40, c: 'keyboards' },
  { n: 'Nipponamerica Wireless Keyboard & Mouse Combo', p: 150, c: 'keyboards' },
  // ---- MOUSE ----
  { n: 'Nipponamerica USB Mouse', p: 40, c: 'mouse' },
  { n: 'Nipponamerica Wireless Mouse', p: 60, c: 'mouse' },
  { n: 'Philips M344 Wireless Mouse', p: 75, c: 'mouse', s: true },
  { n: 'Philips M413 Wireless Mouse', p: 75, c: 'mouse', s: true },
  // ---- SELFIE / GIMBALS ----
  { n: 'Digipower Quikpod Selfie Stick', p: 60, c: 'selfie' },
  { n: 'R16K Selfie Stick with Tripod', p: 75, c: 'selfie', s: true },
  { n: 'Smart M2 Pro Selfie Stick', p: 250, c: 'selfie', s: true },
  { n: 'F-5 3-Axis Gimbal', p: 300, c: 'selfie' },
  { n: 'M02 3-Axis Gimbal', p: 320, c: 'selfie' },
  { n: 'TT22 Mini Selfie Stick', p: 100, c: 'selfie' },
  { n: 'F07 Mini Selfie Stick', p: 80, c: 'selfie' },
  { n: 'JC-32 2-in-1 Selfie Stick', p: 85, c: 'selfie' },
  { n: 'RGB LED Soft Ring Light', p: 160, c: 'selfie' },
  { n: 'YM200 RGB Lighting', p: 130, c: 'selfie' },
  { n: 'MJ18 RGB LED Soft Ring Light', p: 190, c: 'selfie' },
  // ---- CHARGERS / ADAPTERS ----
  { n: 'Samsung USB-A Brick', p: 60, c: 'chargers' },
  { n: 'Samsung 25W Type-C Adapter', p: 75, c: 'chargers' },
  { n: 'Apple 20W USB-C Power Adapter', p: 85, c: 'chargers' },
  { n: 'Apple Watch Magnetic Charger', p: 130, c: 'chargers' },
  { n: 'Samsung 25W Adapter + Cable', p: 150, c: 'chargers' },
  { n: '65W PD Power Adapter Trio', p: 200, c: 'chargers' },
  { n: 'Samsung Super Fast Wireless Charger', p: 220, c: 'chargers', s: true },
  // ---- CABLES ----
  { n: 'Generic Type-C to Lightning', p: 40, c: 'cables' },
  { n: 'Generic Type-C to Type-C', p: 40, c: 'cables' },
  { n: 'Generic Micro to USB', p: 40, c: 'cables' },
  { n: 'YESIDO 4-in-1 Cable', p: 50, c: 'cables', s: true },
  { n: 'Apple USB-C Cable', p: 75, c: 'cables' },
  { n: 'Samsung Type-C to USB Cable', p: 75, c: 'cables' },
  { n: 'Samsung Micro-USB Cable', p: 75, c: 'cables' },
  { n: 'Samsung Type C-C Cable', p: 75, c: 'cables' },
  { n: 'Apple Lightning to USB Cable', p: 80, c: 'cables' },
  { n: '3-in-1 HDTV Streaming Cable', p: 95, c: 'cables' },
  { n: '3-in-1 Phone to HDTV Cable', p: 100, c: 'cables' },
  // ---- CASES ----
  { n: 'Premium MagSafe Case (Deep Blue)', p: 40, c: 'cases' },
  { n: 'Jeweled Butterfly Case', p: 40, c: 'cases' },
  { n: 'Transparent MagSafe Case', p: 40, c: 'cases' },
  { n: 'Carbon Fiber MagSafe Case (Kickstand)', p: 40, c: 'cases' },
  { n: 'Rugged Camera Slide Case', p: 40, c: 'cases' },
  { n: 'Cases for Samsung & iPhone', p: 40, c: 'cases' },
  { n: 'i-Like MagSafe Cases (iPhone/Samsung)', p: 50, c: 'cases' },
  // ---- CAR ACCESSORIES ----
  { n: 'Yesido Car Holder C267', p: 50, c: 'car-accessories', s: true },
  { n: 'RCA Car Holder', p: 60, c: 'car-accessories', s: true },
  { n: 'Yesido Car Holder C173', p: 60, c: 'car-accessories', s: true },
  { n: 'Yesido Car Holder C261', p: 60, c: 'car-accessories', s: true },
  { n: 'Yesido USB Transmitter', p: 60, c: 'car-accessories' },
  { n: 'Yesido Audio Adapter', p: 60, c: 'car-accessories', s: true },
  { n: 'HyperGear Universal Phone Holder', p: 80, c: 'car-accessories', s: true },
  { n: 'C15 Car MP3 Player (RGB)', p: 100, c: 'car-accessories', s: true },
  { n: 'Car F2 FM Transmitter', p: 100, c: 'car-accessories', s: true },
  { n: 'AudioBox FM Transmitter', p: 100, c: 'car-accessories', s: true },
  { n: 'Yesido Wireless CarPlay Adapter', p: 120, c: 'car-accessories' },
  // ---- POWER BANKS ----
  { n: 'Anker Pocket-Sized 10000mAh', p: 75, c: 'powerbanks', s: true },
  { n: 'Anker PowerCore Select 10000mAh', p: 85, c: 'powerbanks', s: true },
  { n: 'Yesido Wireless Power Bank (w/ cables)', p: 95, c: 'powerbanks', s: true },
  { n: 'HyperGear PowerPack Mini 5000mAh', p: 99, c: 'powerbanks', s: true },
  { n: 'Pocket Juice Air Plus 10000mAh', p: 99, c: 'powerbanks', s: true },
  { n: 'Pocket Juice Power Bank (Flashlight)', p: 100, c: 'powerbanks', s: true },
  { n: 'Airbro ONE Portable Fan + Powerbank', p: 140, c: 'powerbanks' },
  { n: 'HyperGear ClearCharge XL 20000mAh', p: 180, c: 'powerbanks', s: true },
  { n: 'Mophie Juice Pack 5000mAh', p: 125, c: 'powerbanks' },
  { n: 'Boss Bar Wireless 10000mAh', p: 110, c: 'powerbanks', s: true },
  { n: 'MagSafe Battery Pack 5000mAh', p: 90, c: 'powerbanks' },
  { n: 'MagSafe Battery Pack 10000mAh', p: 130, c: 'powerbanks' },
  { n: 'Apple iPhone Air Battery Pack', p: 180, c: 'powerbanks' },
  // ---- POWER / SURGE ----
  { n: 'Nipponamerica 6-Outlet Power Strip', p: 35, c: 'power' },
  { n: 'LDNIO Power Socket 3.1A (USB)', p: 70, c: 'power' },
  { n: 'LDNIO 4U Power Strip (4 USB)', p: 70, c: 'power' },
  { n: 'Multi-Function Violent Fan', p: 250, c: 'power' },
  { n: 'LUDGER Battery Charger LBCG-612-6', p: 375, c: 'power' },
  { n: 'LUDGER Battery Charger LBCG-12-100', p: 600, c: 'power' },
  // ---- EMERGENCY ----
  { n: 'LUDGER Handy Light EL-7005L', p: 50, c: 'emergency' },
  { n: 'LUDGER Emergency Lantern EL-536USV (Blue)', p: 120, c: 'emergency' },
  { n: 'LUDGER Lantern EL-1830LED (Cream)', p: 125, c: 'emergency' },
  { n: 'LUDGER Rechargeable Fan EL-8210F', p: 220, c: 'emergency' },
  // ---- STORAGE ----
  { n: 'SanDisk Cruzer 16GB', p: 50, c: 'storage', s: true },
  { n: 'SanDisk Memory Card 16GB', p: 50, c: 'storage' },
  { n: 'ADATA USB 3.2 32GB', p: 80, c: 'storage', s: true },
  { n: 'ADATA Memory Card 32GB', p: 80, c: 'storage' },
  { n: 'SanDisk Cruzer 64GB', p: 70, c: 'storage' },
  { n: 'SanDisk Ultra Dual Drive 64GB', p: 70, c: 'storage', s: true },
  { n: 'SanDisk Memory Card 64GB', p: 70, c: 'storage' },
  { n: 'SanDisk Cruzer 128GB', p: 90, c: 'storage' },
  { n: 'SanDisk Memory Card 128GB', p: 90, c: 'storage' },
  { n: 'SanDisk Memory Card 256GB', p: 160, c: 'storage' },
  // ---- NETWORK ----
  { n: 'Nippon America CAT5 Patch Cord', p: 10, c: 'network', f: true },
  { n: 'Nippon America Wireless Repeater', p: 135, c: 'network' },
  // ---- MISC ----
  { n: 'Apple AirTag', p: 220, c: 'misc' },
  // ---- MARINE ----
  { n: 'Boat Switch', p: 50, c: 'marine', f: true },
  { n: 'Outboard Base Gasket', p: 25, c: 'marine', f: true },
  { n: 'Fuel Clip', p: 60, c: 'marine' },
  { n: 'Outboard Head Gasket', p: 65, c: 'marine', f: true },
  { n: 'Fuel Primer Bulb Pump', p: 75, c: 'marine' },
  { n: 'Engine Mount', p: 100, c: 'marine', f: true },
  { n: 'Boat Navigation Lights', p: 100, c: 'marine', f: true },
  { n: 'Boat Anchor', p: 150, c: 'marine', f: true },
  { n: 'Landhoow Bilge Pump', p: 150, c: 'marine', f: true },
  { n: 'Boat Fender Holders', p: 150, c: 'marine', f: true },
  { n: 'Fuel Line Kit', p: 250, c: 'marine' },
  { n: 'Battery Selector Switch', p: 250, c: 'marine' },
  { n: 'Switch Panel', p: 350, c: 'marine', f: true },
  { n: 'Yamaha Power Head Gasket Kit', p: 450, c: 'marine' },
  { n: 'Boat Anchor Kit', p: 500, c: 'marine', f: true },
  // ---- FISHING ----
  { n: 'Jig Assist Hooks', p: 6, c: 'fishing', f: true },
  { n: 'Mustad Big Gun Hooks', p: 6, c: 'fishing', f: true },
  { n: 'Fishing Reels YoYo', p: 6, c: 'fishing', f: true },
  { n: 'Fishing Reel Spinner / Lures', p: 65, c: 'fishing' },
];

const REPAIRS = [
  { n: 'Google Account Unlock (FRP)', p: 'from $100', t: '1-3 hrs' },
  { n: 'Network / Carrier Unlock', p: 'from $100', t: '1-24 hrs' },
  { n: 'LCD Screen Replacement (free install if bought from us)', p: 'from $200', t: '1-2 hrs' },
  { n: 'Charging Port Repair', p: 'from $120', t: '1-2 hrs' },
  { n: 'Battery Replacement', p: 'from $120', t: '30-45 min' },
  { n: 'Water Damage Repair', p: 'from $40', t: '24-48 hrs' },
  { n: 'Laptop Repair', p: 'from $100', t: '1-3 days' },
  { n: 'Tablet Repair', p: 'from $75', t: '1-2 days' },
  { n: 'Software & System Repair', p: 'from $100', t: '1-3 hrs' },
  { n: 'Diagnostic (free with any repair)', p: '$40', t: '30 min' },
];

const CONTACT = '[[CONTACT]]'; // chat window renders WhatsApp + Call buttons here

const price = (i: Item) => (i.f ? `from $${i.p}` : `$${i.p}`);
const list = (items: Item[], max = 8) => {
  const shown = items.slice(0, max).map((i) => `\u2022 ${i.n} \u2014 ${price(i)}`).join('\n');
  return items.length > max ? `${shown}\n\u2026and ${items.length - max} more \u2014 ask to narrow it down.` : shown;
};
const inStock = (c: string) => CATALOG.filter((i) => i.c === c && !i.s).sort((a, b) => a.p - b.p);
const brandIn = (brand: string) =>
  CATALOG.filter((i) => !i.s && i.n.toLowerCase().includes(brand)).sort((a, b) => a.p - b.p);

// keyword -> catalog category
const CAT_MAP: [RegExp, string][] = [
  [/\b(case|cases|cover|casing)\b/, 'cases'],
  [/(charger|charging|adapter|adaptor|brick|wall plug)/, 'chargers'],
  [/(cable|cord|lightning cable|usb cable|type.?c cable|micro.?usb)/, 'cables'],
  [/(power.?bank|portable charger|battery pack)/, 'powerbanks'],
  [/(power strip|surge|extension|socket|outlet|battery charger)/, 'power'],
  [/(lantern|emergency|flashlight|hand light|handy light)/, 'emergency'],
  [/(keyboard)/, 'keyboards'],
  [/\b(mouse|mice)\b/, 'mouse'],
  [/(selfie|gimbal|stabili[sz]er|tripod)/, 'selfie'],
  [/(earbud|ear bud|airpod|earpod|ear pod|\bbuds\b|earphone)/, 'earbuds'],
  [/(headphone|headset|head phone)/, 'headphones'],
  [/(gaming kit|controller|playstation|\bps5\b|\bps4\b|xbox|gamepad|console)/, 'gaming'],
  [/(microphone|\bmic\b|mics)/, 'microphones'],
  [/(audio interface|mixer|mixing|sound card)/, 'audio-interfaces'],
  [/(car speaker|car audio|tweeter|subwoofer|coaxial|speaker ring|speaker kit)/, 'car-audio'],
  [/(car holder|phone holder|fm transmitter|carplay|car mp3|car charger|car mount)/, 'car-accessories'],
  [/(tv remote|smart remote|fire stick|firestick|roku|antenna|streaming stick|fire tv)/, 'tv'],
  [/(flash drive|memory card|sd card|micro sd|usb drive|pen drive|storage|sandisk|adata)/, 'storage'],
  [/(wifi|wi-fi|repeater|extender|cat5|ethernet|patch cord|network)/, 'network'],
  [/(fishing|hook|hooks|lure|lures|reel|bait|tackle)/, 'fishing'],
  [/(boat|marine|anchor|bilge|gasket|outboard|fuel line|fuel clip|fuel primer|engine mount|navigation light|switch panel)/, 'marine'],
  [/(airtag|air tag|tracker)/, 'misc'],
  [/(tablet|ipad)/, 'tablet'],
  [/(laptop|computer|notebook)/, 'laptop'],
  [/(speaker|jbl|skullcandy|skull candy|boombox|bluetooth speaker)/, 'speakers'],
  [/(watch|smartwatch|smart watch)/, 'watches'],
];

const CAT_LABEL: Record<string, string> = {
  cases: 'Phone cases', chargers: 'Chargers & adapters', cables: 'Cables', powerbanks: 'Power banks',
  power: 'Power & surge', emergency: 'Emergency lights & fans', keyboards: 'Keyboards', mouse: 'Mice',
  selfie: 'Selfie sticks & gimbals', earbuds: 'Earbuds', headphones: 'Headphones', gaming: 'Gaming',
  microphones: 'Microphones', 'audio-interfaces': 'Audio interfaces & mixers', 'car-audio': 'Car audio',
  'car-accessories': 'Car accessories', tv: 'TV & streaming', storage: 'Storage', network: 'Networking',
  fishing: 'Fishing gear', marine: 'Marine & boat', misc: 'Trackers', tablet: 'Tablets', laptop: 'Laptops',
  speakers: 'Speakers', watches: 'Watches',
};

const ACCESSORY_HINT =
  /(charger|charging|cable|cord|adapter|brick|case|cover|watch|buds|earbud|earpod|airpod|earphone|headphone|holder|powerbank|power bank|protector|remote|antenna|memory|flash|storage|keyboard|mouse|speaker|mic|microphone)/;

export function getCellyReply(rawInput: string): string {
  const q = (rawInput || '').toLowerCase().trim();
  if (!q) return 'Hi! What can I help you find today?';

  // greetings / thanks / short affirmations
  if (/^(hi|hey|hello|good (morning|afternoon|evening)|yo|hiya)\b/.test(q))
    return "Hi! \ud83d\udc4b I'm Celly. Ask me about anything in the shop \u2014 phones, tablets, speakers, earbuds, chargers, gaming, marine gear, repairs, prices, hours or location.";
  if (q.includes('thank')) return "You're welcome! Anything else I can help with?";
  if (/^(yes|yeah|yep|ok|okay|sure|no|nope)\b/.test(q))
    return 'Sure! What would you like \u2014 a product, a price, store hours, services, or our location?';

  // hours
  if (/(hour|open|close|closing|what time|when.*(open|close))/.test(q))
    return '\ud83d\udd52 Cell World hours:\n\u2022 Mon\u2013Fri: 8:00 AM \u2013 5:00 PM\n\u2022 Sat: 8:00 AM \u2013 2:00 PM\n\u2022 Sun: Closed';

  // email
  if (/(email|e-mail|gmail)/.test(q))
    return `The quickest way to reach us is WhatsApp or a call. Tap below.\n${CONTACT}`;

  // location / contact
  if (/(where|location|address|find you|contact|reach|phone number|whatsapp)/.test(q))
    return `You'll find us in Kingstown, St. Vincent.\n${CONTACT}`;

  // repairs / unlocking / services
  if (/(repair|fix|fixing|broken|cracked|unlock|frp|screen replace|battery replace|water damage|diagnostic|service)/.test(q)) {
    const body = REPAIRS.map((r) => `\u2022 ${r.n} \u2014 ${r.p} (${r.t})`).join('\n');
    return `\ud83d\udd27 Repair & unlocking services:\n${body}\n\nBring-your-own-parts install: from $20 to $120, moderate $60\u2013100, complex $150+.\nFor a firm quote, reach the store:\n${CONTACT}`;
  }

  // SPECIFIC ITEM lookup - answer the one product, not the whole list
  {
    const clean = q.replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
    const stripped = clean
      .replace(/\b(do|you|have|has|got|sell|sells|selling|carry|stock|in|is|there|any|a|an|the|price|cost|much|how|of|i|want|need|looking|for|me|my|your|whats|what)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    let found: Item | null = null;
    let bestLen = 0;
    for (const it of CATALOG) {
      const name = it.n.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
      if (name.length >= 5 && clean.includes(name) && name.length > bestLen) { found = it; bestLen = name.length; }
    }
    if (!found) {
      const cats = stripped.replace(/\b(speaker|speakers|charger|chargers|adapter|adapters|case|cases|cover|covers|cable|cables|cord|cords|headphone|headphones|headset|earbud|earbuds|earphone|earphones|watch|watches|smartwatch|mouse|mice|keyboard|keyboards|controller|controllers|microphone|microphones|mic|mics|powerbank|powerbanks|lantern|lanterns|tablet|tablets|laptop|laptops|phone|phones|remote|remotes|antenna)\b/g, ' ').replace(/\s+/g, ' ').trim();
      const tokens = cats.split(' ').filter((t) => t.length >= 3 || /^[0-9]+$/.test(t));
      if (tokens.length >= 1 && tokens.length <= 4) {
        const hits = CATALOG.filter((it) => tokens.every((t) => it.n.toLowerCase().includes(t)));
        if (hits.length === 1) found = hits[0];
      }
    }
    if (found) {
      return found.s
        ? `The ${found.n} is currently sold out but coming back soon. Want us to let you know when it lands?\n${CONTACT}`
        : `Yes! We have the ${found.n} at ${price(found)}. Want to order it?\n${CONTACT}`;
    }
  }

  // PHONES (only when it's about phones, not accessories that mention a brand)
  if (/iphone/.test(q) && !ACCESSORY_HINT.test(q)) {
    return `We don't have any iPhones in stock right now \u2014 they're expected back. In stock now we have Samsung and itel phones \u2014 want to see those? Or check with the store:\n${CONTACT}`;
  }
  if (/\bitel\b/.test(q)) {
    return `\ud83d\udcf1 itel phones in stock:\n${list(brandIn('itel').filter((i) => i.c === 'phone'))}\n\nTo order:\n${CONTACT}`;
  }
  if (/(samsung|galaxy)/.test(q) && !ACCESSORY_HINT.test(q)) {
    return `\ud83d\udcf1 Samsung phones in stock:\n${list(inStock('phone').filter((i) => i.n.toLowerCase().includes('samsung')))}\n\nTo order:\n${CONTACT}`;
  }
  if (/\bphones?\b/.test(q) && !ACCESSORY_HINT.test(q)) {
    return `\ud83d\udcf1 Phones in stock right now:\n${list(inStock('phone'))}\n\nWe also have the iPad 9th Gen, a FANGOR tablet and a Lenovo laptop. To order:\n${CONTACT}`;
  }

  // BRAND searches (accessories/audio etc.)
  for (const b of ['jbl', 'skull candy', 'skullcandy', 'rca', 'casio', 'peje', 'yesido', 'hypergear', 'anker', 'sandisk', 'pioneer', 'ludger', 'philips']) {
    if (q.includes(b)) {
      const hits = brandIn(b === 'skullcandy' ? 'skull candy' : b);
      if (hits.length) {
        const label = b.replace(/\b\w/g, (c) => c.toUpperCase());
        return `Here's what we have from ${label}:\n${list(hits)}\n\nTo order:\n${CONTACT}`;
      }
    }
  }

  // CATEGORY searches
  for (const [re, cat] of CAT_MAP) {
    if (re.test(q)) {
      const items = inStock(cat);
      if (items.length) {
        const label = CAT_LABEL[cat] || cat;
        return `${label} in stock:\n${list(items)}\n\nTo order:\n${CONTACT}`;
      }
    }
  }

  // cheapest phone
  if (/(cheap|cheapest|budget|affordable|lowest|least expensive)/.test(q)) {
    const ph = inStock('phone');
    return `Our most affordable phone in stock is the ${ph[0].n} at $${ph[0].p}.\n\nOther budget options:\n${list(ph.slice(0, 4))}\n\nTo order:\n${CONTACT}`;
  }

  // generic "what do you have / in stock"
  if (/(what (do|can|all)|what.*(have|sell|carry|offer)|your (catalog|products|range|inventory)|everything you|full (catalog|list))/.test(q)) {
    return 'We carry phones, tablets & laptops, speakers, earbuds & headphones, smartwatches, gaming gear, chargers, cables, cases, power banks, car accessories, storage, marine & fishing gear, plus repairs & unlocking. What are you after?';
  }

  // not in catalog - honest handoff with buttons
  return `I'm not able to confirm that one from here, but the store team can help you out directly. Tap below:\n${CONTACT}`;
}
