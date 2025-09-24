// Complete Product Database from Cell World Inventory

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand?: string;
  availability?: string;
  subcategory?: string;
  tags: string[];
}

interface ProductDatabase {
  phones: Product[];
  marine: Product[];
  electronics: Product[];
  [key: string]: Product[]; // Index signature for dynamic access
}

export const productDatabase: ProductDatabase = {
  phones: [
    // Add these as the FIRST items in phones array:
    { id: 'blu-a140', name: 'Blu A140', price: 120, category: 'phones', brand: 'Blu', availability: 'In Stock', tags: ['ultra-budget', 'basic', 'cheapest', 'unlocked'] },
    { id: 'nokia-110', name: 'Nokia 110', price: 199, category: 'phones', brand: 'Nokia', availability: 'In Stock', tags: ['basic', 'long-battery', 'reliable', 'unlocked'] },
    { id: 'logic-z11', name: 'Logic Z11', price: 199, category: 'phones', brand: 'Logic', availability: 'In Stock', tags: ['budget', 'smartphone', 'essential', 'unlocked'] },

    // SAMSUNG PHONES (from phones/page.tsx)
    { id: 'samsung-a05', name: 'Samsung Galaxy A05', price: 599, category: 'phones', brand: 'Samsung', availability: 'In Stock', tags: ['budget', 'entry-level', '4G', 'affordable'] },
    { id: 'samsung-a15', name: 'Samsung Galaxy A15', price: 899, category: 'phones', brand: 'Samsung', availability: 'In Stock', tags: ['budget', '5G', 'affordable', 'value'] },
    { id: 'samsung-a25', name: 'Samsung Galaxy A25 5G', price: 1299, category: 'phones', brand: 'Samsung', availability: 'More Coming Soon', tags: ['mid-range', '5G', 'amoled', 'popular'] },
    { id: 'samsung-a35', name: 'Samsung Galaxy A35 5G', price: 1599, category: 'phones', brand: 'Samsung', availability: 'In Stock', tags: ['mid-range', '5G', 'gorilla-glass'] },
    { id: 'samsung-a55', name: 'Samsung Galaxy A55 5G', price: 1999, category: 'phones', brand: 'Samsung', availability: 'More Coming Soon', tags: ['upper-mid', '5G', 'premium-build'] },
    { id: 'samsung-s24', name: 'Samsung Galaxy S24', price: 3499, category: 'phones', brand: 'Samsung', availability: 'In Stock', tags: ['flagship', 'premium', 'ai-features'] },
    { id: 'samsung-s24-plus', name: 'Samsung Galaxy S24+', price: 3999, category: 'phones', brand: 'Samsung', availability: 'In Stock', tags: ['flagship', 'large-display', 'premium'] },
    { id: 'samsung-s24-ultra', name: 'Samsung Galaxy S24 Ultra', price: 4999, category: 'phones', brand: 'Samsung', availability: 'In Stock', tags: ['flagship', 'ultra-premium', 's-pen', 'top-tier'] },
    
    // MOTOROLA PHONES
    { id: 'moto-g84', name: 'Motorola Moto G84', price: 1099, category: 'phones', brand: 'Motorola', availability: 'In Stock', tags: ['budget', '5G', 'clean-android', 'value'] },
    { id: 'moto-edge-40-neo', name: 'Motorola Edge 40 Neo', price: 1499, category: 'phones', brand: 'Motorola', availability: 'In Stock', tags: ['mid-range', '5G', 'curved-display', 'stylish'] },
  ],

  marine: [
    // BOAT ACCESSORIES
    { id: 'switch-panel', name: 'Switch Panel', price: 350, category: 'marine', subcategory: 'boat-accessories', tags: ['control-panel', 'marine-grade', 'dashboard'] },
    { id: 'battery-selector', name: 'Battery Selector Switch', price: 250, category: 'marine', subcategory: 'electrical', tags: ['electrical', 'battery', 'marine-rated'] },
    { id: 'bilge-pump', name: 'Landhoow Bilge Water Pump', price: 150, category: 'marine', subcategory: 'boat-accessories', tags: ['pump', 'water-removal', '12V'] },
    { id: 'boat-fenders', name: 'Boat Fender Holders', price: 150, category: 'marine', subcategory: 'boat-accessories', tags: ['fenders', 'protection', 'stainless'] },
    { id: 'navigation-lights', name: 'Boat Navigation Lights', price: 100, category: 'marine', subcategory: 'electrical', tags: ['lights', 'safety', 'USCG-approved'] },
    { id: 'boat-anchors', name: 'Shop Boat Anchors', price: 120, category: 'marine', subcategory: 'anchoring', tags: ['anchor', 'galvanized', 'mooring'] },
    { id: 'boat-anchor-new', name: 'Boat Anchor', price: 150, category: 'marine', subcategory: 'anchoring', tags: ['heavy-duty', 'steel', 'fluke'] },
    { id: 'boat-switch-new', name: 'Boat Switch', price: 50, category: 'marine', subcategory: 'electrical', tags: ['waterproof', 'LED-indicators', 'multi-circuit'] },
    
    // BOAT PARTS
    { id: 'engine-mount', name: 'Engine Mount', price: 100, category: 'marine', subcategory: 'boat-parts', tags: ['vibration-damper', 'rubber', 'outboard'] },
    { id: 'head-gasket', name: 'Outboard Head Gasket', price: 65, category: 'marine', subcategory: 'boat-parts', tags: ['gasket', 'seal', 'engine'] },
    { id: 'base-gasket', name: 'Outboard Base Gasket', price: 25, category: 'marine', subcategory: 'boat-parts', tags: ['gasket', 'powerhead', 'seal'] },
    { id: 'yamaha-gasket', name: 'Yamaha Power Head Gasket Kit', price: 450, category: 'marine', subcategory: 'boat-parts', tags: ['yamaha', 'complete-kit', 'OEM'] },
    { id: 'fuel-primer', name: 'Fuel Primer Bulb Pump', price: 75, category: 'marine', subcategory: 'boat-parts', tags: ['fuel', 'primer', 'pump'] },
    { id: 'fuel-clip', name: 'Fuel Clip', price: 60, category: 'marine', subcategory: 'boat-parts', tags: ['connector', 'fuel-line', 'clip'] },
    { id: 'fuel-line-kit', name: 'Fuel Line Kit', price: 250, category: 'marine', subcategory: 'boat-parts', tags: ['complete-kit', 'ethanol-resistant', 'fuel'] },
    
    // FISHING GEAR
    { id: 'jig-hooks', name: 'Jig Assist Hooks 5X Strong', price: 25, category: 'marine', subcategory: 'fishing-gear', tags: ['hooks', '5x-strong', 'braided'] },
    { id: 'mustad-hooks', name: 'Mustad UltraPoint Big Gun Hooks', price: 10, category: 'marine', subcategory: 'fishing-gear', tags: ['circle-hooks', 'ultrapoint', 'mustad'] },
    { id: 'fishing-yoyo', name: 'Fishing Reels YoYo', price: 6, category: 'marine', subcategory: 'fishing-lures', tags: ['reels', 'yoyo', 'multiple-colors'] },
    { id: 'fishing-spinner', name: 'Fishing Reel Spinner', price: 65, category: 'marine', subcategory: 'fishing-lures', tags: ['trolling', 'spinner', 'lures'] },
  ],

  electronics: [
    // JBL SPEAKERS
    { id: 'jbl-go4-navy', name: 'JBL GO 4 - Navy Blue', price: 220, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['portable', 'waterproof', '7-hours', 'compact'] },
    { id: 'jbl-go4-colors', name: 'JBL GO 4 - Multiple Colors', price: 220, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['portable', 'waterproof', 'colorful'] },
    { id: 'jbl-go3', name: 'JBL GO 3', price: 180, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['portable', 'budget', '5-hours'] },
    { id: 'jbl-pulse5', name: 'JBL Pulse 5', price: 350, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['360-sound', 'light-show', 'premium'] },
    { id: 'jbl-flip6', name: 'JBL Flip 6', price: 299, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['12-hours', 'partyboost', 'waterproof'] },
    { id: 'jbl-boombox3-black', name: 'JBL Boombox 3 - Black', price: 599, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['24-hours', 'massive-bass', 'powerbank'] },
    { id: 'jbl-boombox3-camo', name: 'JBL Boombox 3 - Squad Camo', price: 629, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['24-hours', 'limited-edition', 'powerful'] },
    { id: 'jbl-xtreme4', name: 'JBL Xtreme 4', price: 450, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['shoulder-strap', '24-hours', 'dual-radiators'] },
    { id: 'jbl-charge5', name: 'JBL Charge 5', price: 320, category: 'electronics', subcategory: 'speakers', brand: 'JBL', tags: ['20-hours', 'powerbank', 'waterproof'] },
    
    // RCA SPEAKERS
    { id: 'rca-gamerbeat', name: 'RCA TWS GamerBeat', price: 220, category: 'electronics', subcategory: 'speakers', brand: 'RCA', tags: ['party', 'disco-lights', 'FM-radio'] },
    { id: 'rca-beatbox', name: 'RCA BeatBox', price: 200, category: 'electronics', subcategory: 'speakers', brand: 'RCA', tags: ['illuminated', 'remote-control', 'karaoke'] },
    { id: 'rca-holosound', name: 'RCA HoloSound', price: 580, category: 'electronics', subcategory: 'speakers', brand: 'RCA', tags: ['LED-flame', 'karaoke', 'premium'] },
    { id: 'rca-beatwaves', name: 'RCA BeatWaves with Wireless Mic', price: 499, category: 'electronics', subcategory: 'speakers', brand: 'RCA', tags: ['wireless-mic', 'portable', 'karaoke'] },
    { id: 'rca-crystalbeat', name: 'RCA CrystalBeat', price: 450, category: 'electronics', subcategory: 'speakers', brand: 'RCA', tags: ['illuminated', 'FM-radio', 'party'] },
    { id: 'rca-shockwave', name: 'RCA Shock-Wave', price: 380, category: 'electronics', subcategory: 'speakers', brand: 'RCA', tags: ['LED-effects', 'high-fidelity', 'karaoke'] },
    
    // SKULLCANDY SPEAKERS  
    { id: 'skull-barrel', name: 'SkullCandy Barrel', price: 999, category: 'electronics', subcategory: 'speakers', brand: 'SkullCandy', tags: ['12-hours', 'IPX5', 'LED-show'] },
    { id: 'skull-stomp', name: 'SkullCandy STOMP', price: 950, category: 'electronics', subcategory: 'speakers', brand: 'SkullCandy', tags: ['IPX7', 'multi-link', 'LED'] },
    { id: 'skull-ounce', name: 'SkullCandy Ounce', price: 160, category: 'electronics', subcategory: 'speakers', brand: 'SkullCandy', tags: ['16-hours', 'waterproof', 'compact'] },
    { id: 'skull-kilo', name: 'SkullCandy Kilo', price: 210, category: 'electronics', subcategory: 'speakers', brand: 'SkullCandy', tags: ['24-hours', 'waterproof', 'powerful'] },
    { id: 'skull-terrain-mini', name: 'SkullCandy Terrain Mini', price: 230, category: 'electronics', subcategory: 'speakers', brand: 'SkullCandy', tags: ['14-hours', 'multi-link', 'portable'] },
    { id: 'skull-terrain', name: 'SkullCandy Terrain', price: 330, category: 'electronics', subcategory: 'speakers', brand: 'SkullCandy', tags: ['14-hours', 'IPX7', 'multi-link'] },
    { id: 'skull-terrain-xl', name: 'SkullCandy Terrain XL', price: 420, category: 'electronics', subcategory: 'speakers', brand: 'SkullCandy', tags: ['18-hours', 'powerful', 'multi-link'] },
    { id: 'fugoo-tough', name: 'Fugoo Tough Speaker', price: 200, category: 'electronics', subcategory: 'speakers', brand: 'Fugoo', tags: ['rugged', '360-sound', 'waterproof'] },
    
    // POWER BANKS
    { id: 'mophie-5000', name: 'Mophie Juice Pack 5000mAh', price: 125, category: 'electronics', subcategory: 'powerbanks', brand: 'Mophie', tags: ['wireless', 'detachable', 'compact'] },
    { id: 'pocketjuice-air', name: 'Pocket Juice Air Plus 10000mAh', price: 99, category: 'electronics', subcategory: 'powerbanks', brand: 'PocketJuice', tags: ['magnetic', 'wireless', '6x-charges'] },
    { id: 'anker-select', name: 'Anker PowerCore Select 10000mAh', price: 85, category: 'electronics', subcategory: 'powerbanks', brand: 'Anker', tags: ['46-hours', '12W', 'dual-USB'] },
    { id: 'bossbar-wireless', name: 'Boss Bar Wireless 10000mAh', price: 110, category: 'electronics', subcategory: 'powerbanks', brand: 'BossBar', availability: 'More Coming Soon', tags: ['wireless', 'digital-display', '22.5W'] },
    { id: 'anker-pocket', name: 'Anker Pocket-Sized 10000mAh', price: 75, category: 'electronics', subcategory: 'powerbanks', brand: 'Anker', tags: ['ultra-compact', '22.5W', 'pocket-size'] },
    { id: 'yesido-wireless', name: 'Yesido Wireless with Built-in Cables', price: 95, category: 'electronics', subcategory: 'powerbanks', brand: 'Yesido', tags: ['built-in-cables', 'wireless', 'digital-display'] },
    { id: 'pocketjuice-flashlight', name: 'Pocket Juice with Flashlight 2600mAh', price: 100, category: 'electronics', subcategory: 'powerbanks', brand: 'PocketJuice', tags: ['flashlight', 'weatherproof', 'compact'] },
    { id: 'hypergear-mini', name: 'HyperGear PowerPack Mini 5000mAh', price: 99, category: 'electronics', subcategory: 'powerbanks', brand: 'HyperGear', tags: ['20W-PD', '18W-USB', 'compact'] },
    { id: 'hypergear-xl', name: 'HyperGear ClearCharge XL 20000mAh', price: 180, category: 'electronics', subcategory: 'powerbanks', brand: 'HyperGear', tags: ['20000mAh', '48-hours', '3-devices'] },
    { id: 'airbro-fan', name: 'Airbro ONE Portable Fan with Powerbank 2600mAh', price: 140, category: 'electronics', subcategory: 'powerbanks', brand: 'Airbro', tags: ['fan', 'detachable', '5-speeds'] },
    
    // GAMING CONTROLLERS
    { id: 'ps5-dualsense', name: 'PS5 DualSense Controller', price: 350, category: 'electronics', subcategory: 'gaming', brand: 'Sony', tags: ['playstation', 'wireless', 'haptic'] },
    { id: 'ps4-dualshock', name: 'PS4 DualShock Controller', price: 280, category: 'electronics', subcategory: 'gaming', brand: 'Sony', tags: ['playstation', 'wireless', 'classic'] },
    { id: 'xbox-pulse-red', name: 'Xbox Controller - Pulse Red', price: 350, category: 'electronics', subcategory: 'gaming', brand: 'Microsoft', tags: ['xbox', 'wireless', 'limited'] },
    { id: 'xbox-black', name: 'Xbox Controller - Black', price: 350, category: 'electronics', subcategory: 'gaming', brand: 'Microsoft', tags: ['xbox', 'wireless', 'standard'] },
    { id: 'steelseries-stratus', name: 'SteelSeries Stratus+', price: 160, category: 'electronics', subcategory: 'gaming', brand: 'SteelSeries', tags: ['mobile', '90-hours', 'android'] },
    { id: 'razer-ps5-stand', name: 'Razer PS5 Charging Stand', price: 399, category: 'electronics', subcategory: 'gaming', brand: 'Razer', tags: ['charging', 'PS5', 'quick-charge'] },
    
    // EARBUDS & HEADPHONES
    { id: 'airpods-3rd', name: 'Apple AirPods 3rd Gen', price: 650, category: 'electronics', subcategory: 'earbuds', brand: 'Apple', tags: ['spatial-audio', 'magsafe', '6-hours'] },
    { id: '2nd-gen-earpods', name: '2nd Gen EarPods with ANC', price: 140, category: 'electronics', subcategory: 'earbuds', availability: 'More Coming Soon', tags: ['ANC', 'white', 'wireless'] },
    { id: 'jbl-vibe-buds', name: 'JBL Vibe Buds', price: 220, category: 'electronics', subcategory: 'earbuds', brand: 'JBL', tags: ['32-hours', 'voice-aware', 'water-resistant'] },
    { id: 'jbl-endurance', name: 'JBL Endurance Race', price: 280, category: 'electronics', subcategory: 'earbuds', brand: 'JBL', availability: 'More Coming Soon', tags: ['sport', 'IPX7', '30-hours'] },
    { id: 'hypergear-aeroflex', name: 'HyperGear AeroFlex 360', price: 160, category: 'electronics', subcategory: 'earbuds', brand: 'HyperGear', availability: 'More Coming Soon', tags: ['open-ear', '360-awareness', '25-hours'] },
    { id: 'yesido-tws32', name: 'Yesido TWS32 with ANC', price: 140, category: 'electronics', subcategory: 'earbuds', brand: 'Yesido', tags: ['ANC', 'heavy-bass', 'bluetooth-5.4'] },
    { id: 'wireless-pro-anc', name: 'Premium Wireless Earbuds Pro with ANC', price: 89, category: 'electronics', subcategory: 'earbuds', tags: ['ANC', 'transparency', '24-hours'] },
    { id: '2000-series-pink', name: '2000 Series Headphones - Pink', price: 150, category: 'electronics', subcategory: 'headphones', tags: ['IPX4', '18-hours', 'pink'] },
    { id: 'buds2-pro', name: 'Buds2 Pro - Purple & White', price: 120, category: 'electronics', subcategory: 'earbuds', tags: ['premium', 'touch-controls', 'multiple-colors'] },
    { id: 'moto-kids', name: 'Motorola Kids Wireless Headphones', price: 150, category: 'electronics', subcategory: 'headphones', brand: 'Motorola', availability: 'More Coming Soon', tags: ['kids', 'volume-limit', '24-hours'] },
    { id: 'jbl-tune525', name: 'JBL TUNE 525', price: 225, category: 'electronics', subcategory: 'headphones', brand: 'JBL', availability: 'More Coming Soon', tags: ['57-hours', 'multi-point', 'voice-aware'] },
    { id: 'jbl-tune520', name: 'JBL TUNE 520', price: 199, category: 'electronics', subcategory: 'headphones', brand: 'JBL', availability: 'More Coming Soon', tags: ['57-hours', 'hands-free', 'white'] },
    { id: 'hypergear-vibe', name: 'HyperGear VIBE Headphones', price: 90, category: 'electronics', subcategory: 'headphones', brand: 'HyperGear', availability: 'More Coming Soon', tags: ['10-hours', 'memory-foam', 'white'] },
    { id: 'hypergear-2in1', name: 'HyperGear 2-in-1 Headphones', price: 110, category: 'electronics', subcategory: 'headphones', brand: 'HyperGear', availability: 'More Coming Soon', tags: ['speaker-mode', '3-EQ', '4-modes'] },
    
    // APPLE PRODUCTS
    { id: 'apple-20w-brick', name: 'Apple 20W USB-C Power Adapter', price: 85, category: 'electronics', subcategory: 'apple', brand: 'Apple', tags: ['fast-charge', 'USB-C', 'adapter'] },
    { id: 'apple-usb-c-cable', name: 'Apple USB-C Cable', price: 75, category: 'electronics', subcategory: 'apple', brand: 'Apple', tags: ['1-meter', 'charging', 'USB-C'] },
    { id: 'apple-lightning-usb', name: 'Apple Lightning to USB Cable', price: 80, category: 'electronics', subcategory: 'apple', brand: 'Apple', tags: ['2-meters', 'lightning', 'iPhone'] },
    { id: 'apple-usb-c-earpods', name: 'Apple USB-C EarPods', price: 120, category: 'electronics', subcategory: 'apple', brand: 'Apple', tags: ['wired', 'USB-C', 'remote'] },
    { id: 'apple-watch-charger', name: 'Apple Watch Magnetic Charger', price: 130, category: 'electronics', subcategory: 'apple', brand: 'Apple', tags: ['magnetic', 'watch', '1-meter'] },
    { id: 'airtag', name: 'Apple AirTag', price: 220, category: 'electronics', subcategory: 'apple', brand: 'Apple', tags: ['tracker', 'precision-finding', 'IP67'] },
    
    // SAMSUNG ACCESSORIES
    { id: 'samsung-25w-adapter', name: 'Samsung 25W Power Adapter', price: 75, category: 'electronics', subcategory: 'samsung', brand: 'Samsung', tags: ['fast-charge', 'Type-C', '25W'] },
    { id: 'samsung-25w-bundle', name: 'Samsung 25W Adapter + Cable Bundle', price: 150, category: 'electronics', subcategory: 'samsung', brand: 'Samsung', tags: ['bundle', 'fast-charge', 'complete'] },
    { id: 'samsung-65w-trio', name: '65W PD Power Adapter Trio', price: 200, category: 'electronics', subcategory: 'samsung', brand: 'Samsung', tags: ['65W', '3-ports', 'USB-C'] },
    { id: 'samsung-galaxy-watch7', name: 'Samsung Galaxy Watch 7', price: 1100, category: 'electronics', subcategory: 'samsung', brand: 'Samsung', tags: ['smartwatch', 'GPS', 'bluetooth'] },
    { id: 'samsung-wireless-charger', name: 'Samsung Super Fast Wireless Charger', price: 220, category: 'electronics', subcategory: 'samsung', brand: 'Samsung', tags: ['15W', 'wireless', 'fast-charge'] },
    { id: 'samsung-type-c-cable', name: 'Samsung Type-C Cable', price: 75, category: 'electronics', subcategory: 'samsung', brand: 'Samsung', tags: ['Type-C', '1-meter', 'cable'] },
    { id: 'samsung-usb-brick', name: 'Samsung USB-A Brick', price: 60, category: 'electronics', subcategory: 'samsung', brand: 'Samsung', tags: ['adapter', 'USB-A', 'fast-charge'] },
    { id: 'samsung-micro-usb', name: 'Samsung Micro-USB Cable', price: 75, category: 'electronics', subcategory: 'samsung', brand: 'Samsung', tags: ['micro-USB', 'charging', 'cable'] },
    
    // MICROPHONES
    { id: 'hypergear-condenser', name: 'HyperGear Pro Condenser Mic', price: 180, category: 'electronics', subcategory: 'microphones', brand: 'HyperGear', tags: ['condenser', 'streaming', 'omnidirectional'] },
    { id: 'yesido-lavalier', name: 'Yesido Lavalier 3-in-1 Wireless', price: 170, category: 'electronics', subcategory: 'microphones', brand: 'Yesido', tags: ['wireless', '50M-range', '7-hours'] },
    { id: 'vivitar-lavalier', name: 'Vivitar Mini Lavalier', price: 140, category: 'electronics', subcategory: 'microphones', brand: 'Vivitar', tags: ['smartphone', 'DSLR', 'windproof'] },
    { id: 'studioz-dynamic', name: 'StudioZ Dynamic Mic', price: 80, category: 'electronics', subcategory: 'microphones', brand: 'StudioZ', tags: ['XLR', 'professional', 'dynamic'] },
    { id: 'dolphin-mcx11', name: 'Dolphin MCX11 50-Channel UHF', price: 200, category: 'electronics', subcategory: 'microphones', brand: 'Dolphin', tags: ['UHF', '50-channel', 'long-range'] },
    { id: 'studioz-wired-wireless', name: 'StudioZ Wired & Wireless Mic', price: 80, category: 'electronics', subcategory: 'microphones', brand: 'StudioZ', tags: ['dual-mode', 'versatile', 'microphone'] },
    { id: 'sunflash-digital', name: 'Digital Sunflash Microphone', price: 80, category: 'electronics', subcategory: 'microphones', brand: 'Sunflash', tags: ['digital', 'noise-reduction', 'feedback-reduction'] },
    
    // PHONE CASES
    { id: 'ilike-samsung', name: 'i-Like Cases for Samsung', price: 40, category: 'electronics', subcategory: 'cases', tags: ['magsafe', 'samsung', 'S24', 'S25'] },
    { id: 'ilike-iphone', name: 'i-Like MagSafe Cases for iPhone', price: 50, category: 'electronics', subcategory: 'cases', tags: ['magsafe', 'iPhone', 'magnetic', 'protection'] },
  ]
};

// Helper functions with proper TypeScript types
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  const allProducts: Product[] = [
    ...productDatabase.phones,
    ...productDatabase.marine,
    ...productDatabase.electronics
  ];
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.includes(searchTerm)) ||
    product.category.includes(searchTerm) ||
    (product.brand && product.brand.toLowerCase().includes(searchTerm)) ||
    (product.subcategory && product.subcategory.includes(searchTerm))
  );
}

export function getCheapestProducts(category: string = 'all', limit: number = 3): Product[] {
  let products: Product[] = [];
  
  // Handle different phrasings of categories
  const categoryMap: { [key: string]: string } = {
    'phone': 'phones',
    'phones': 'phones',
    'mobile': 'phones',
    'smartphone': 'phones',
    'marine': 'marine',
    'boat': 'marine',
    'fishing': 'marine',
    'electronics': 'electronics',
    'speaker': 'electronics',
    'speakers': 'electronics',
    'powerbank': 'electronics',
    'gaming': 'electronics'
  };
  
  const mappedCategory = categoryMap[category.toLowerCase()] || category;
  
  if (mappedCategory === 'all') {
    products = [
      ...productDatabase.phones,
      ...productDatabase.marine,
      ...productDatabase.electronics
    ];
  } else if (productDatabase[mappedCategory]) {
    products = productDatabase[mappedCategory];
  } else {
    // Search in electronics subcategories
    products = productDatabase.electronics.filter(p => 
      p.subcategory === mappedCategory || 
      p.tags.includes(mappedCategory)
    );
  }
  
  return products
    .sort((a, b) => a.price - b.price)
    .slice(0, limit);
}

export function getProductsInPriceRange(minPrice: number, maxPrice: number, category: string = 'all'): Product[] {
  let products = getCheapestProducts(category, 1000); // Get all products in category
  return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
}

export function getProductsByBrand(brand: string): Product[] {
  const allProducts: Product[] = [
    ...productDatabase.phones,
    ...productDatabase.marine,
    ...productDatabase.electronics
  ];
  
  return allProducts.filter(p => 
    p.brand && p.brand.toLowerCase() === brand.toLowerCase()
  );
}

export function getAvailableProducts(): Product[] {
  const allProducts: Product[] = [
    ...productDatabase.phones,
    ...productDatabase.marine,
    ...productDatabase.electronics
  ];
  
  return allProducts.filter(p => 
    !p.availability || p.availability === 'In Stock'
  );
}