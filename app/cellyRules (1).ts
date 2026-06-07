// lib/cellyRules.ts
// -----------------------------------------------------------------------------
// Interim rule responder for Celly. Accurate and self-contained (no API key).
// Mirrors the IN-STOCK list on app/Categories/phones/page.tsx.
// When the AI hybrid (app/api/celly) goes live this becomes the offline
// fallback, so it is not throwaway.
// -----------------------------------------------------------------------------

type Item = {
  name: string;
  brand: 'samsung' | 'itel' | 'apple' | 'other';
  kind: 'phone' | 'tablet' | 'laptop';
  price: number;
  inStock: boolean;
  match: string[]; // lowercase model tokens (matched as whole words)
};

const ITEMS: Item[] = [
  // ---------- IN STOCK ----------
  { name: 'itel A100C',            brand: 'itel',    kind: 'phone',  price: 440,  inStock: true,  match: ['a100c', 'a100'] },
  { name: 'Samsung A06',           brand: 'samsung', kind: 'phone',  price: 460,  inStock: true,  match: ['a06'] },
  { name: 'itel A90',              brand: 'itel',    kind: 'phone',  price: 475,  inStock: true,  match: ['a90'] },
  { name: 'Samsung A07',           brand: 'samsung', kind: 'phone',  price: 499,  inStock: true,  match: ['a07'] },
  { name: 'Samsung A16',           brand: 'samsung', kind: 'phone',  price: 649,  inStock: true,  match: ['a16'] },
  { name: 'Samsung A42 5G',        brand: 'samsung', kind: 'phone',  price: 720,  inStock: true,  match: ['a42'] },
  { name: 'Samsung A17',           brand: 'samsung', kind: 'phone',  price: 900,  inStock: true,  match: ['a17'] },
  { name: 'iPad 9th Generation',   brand: 'apple',   kind: 'tablet', price: 1500, inStock: true,  match: ['ipad'] },
  { name: 'FANGOR Tablet 8"',      brand: 'other',   kind: 'tablet', price: 250,  inStock: true,  match: ['fangor'] },
  { name: 'Lenovo IdeaPad Slim 3', brand: 'other',   kind: 'laptop', price: 1800, inStock: true,  match: ['lenovo', 'ideapad'] },
  // ---------- NOT IN STOCK (returning) ----------
  { name: 'iPhone 12',             brand: 'apple',   kind: 'phone',  price: 1100, inStock: false, match: ['iphone 12', 'iphone12'] },
  { name: 'iPhone 13 Pro Max',     brand: 'apple',   kind: 'phone',  price: 2300, inStock: false, match: ['iphone 13', 'iphone13', '13 pro'] },
  { name: 'iPhone 14',             brand: 'apple',   kind: 'phone',  price: 2100, inStock: false, match: ['iphone 14', 'iphone14'] },
  { name: 'Samsung A05s',          brand: 'samsung', kind: 'phone',  price: 549,  inStock: false, match: ['a05s'] },
  { name: 'Samsung A05',           brand: 'samsung', kind: 'phone',  price: 450,  inStock: false, match: ['a05'] },
  { name: 'Samsung A11',           brand: 'samsung', kind: 'phone',  price: 420,  inStock: false, match: ['a11'] },
  { name: 'Samsung A15',           brand: 'samsung', kind: 'phone',  price: 649,  inStock: false, match: ['a15'] },
  { name: 'Samsung A25',           brand: 'samsung', kind: 'phone',  price: 1199, inStock: false, match: ['a25'] },
  { name: 'Samsung A26 5G',        brand: 'samsung', kind: 'phone',  price: 1200, inStock: false, match: ['a26'] },
  { name: 'Samsung A36',           brand: 'samsung', kind: 'phone',  price: 1500, inStock: false, match: ['a36'] },
  { name: 'Samsung A56',           brand: 'samsung', kind: 'phone',  price: 1800, inStock: false, match: ['a56'] },
  { name: 'Samsung F05',           brand: 'samsung', kind: 'phone',  price: 420,  inStock: false, match: ['f05'] },
  { name: 'BLU A140',              brand: 'other',   kind: 'phone',  price: 120,  inStock: false, match: ['a140', 'blu'] },
  { name: 'Logic Z1L',             brand: 'other',   kind: 'phone',  price: 199,  inStock: false, match: ['z1l'] },
  { name: 'Nokia 110',             brand: 'other',   kind: 'phone',  price: 199,  inStock: false, match: ['nokia'] },
  { name: 'ZTE Blade A72s',        brand: 'other',   kind: 'phone',  price: 499,  inStock: false, match: ['a72s', 'zte'] },
];

const HANDOFF =
  '📱 WhatsApp: 1-784-431-0777\n📞 Call: 1-784-451-2261\n📍 Visit us in Kingstown';

const money = (n: number) => `$${n}`;

function inStock(filter: (i: Item) => boolean): Item[] {
  return ITEMS.filter((i) => i.inStock && filter(i)).sort((a, b) => a.price - b.price);
}

function formatList(items: Item[]): string {
  return items.map((i) => `• ${i.name} — ${money(i.price)}`).join('\n');
}

function wholeWord(input: string, token: string): boolean {
  return new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(input);
}

export function getCellyReply(rawInput: string): string {
  const input = (rawInput || '').toLowerCase().trim();
  if (!input) return 'Hi! What can I help you find today?';

  // Greetings / thanks / short affirmations
  if (/^(hi|hey|hello|good (morning|afternoon|evening)|yo|hiya)\b/.test(input)) {
    return "Hi! 👋 I'm Celly. I can help with phones and tablets in stock, prices, store hours, services and location. What are you after?";
  }
  if (input.includes('thank')) return "You're welcome! Anything else I can help with?";
  if (/^(yes|yeah|yep|ok|okay|sure|no|nope)\b/.test(input)) {
    return 'Sure! What would you like — phones in stock, a price, store hours, services, or our location?';
  }

  // Store hours
  if (/(hour|open|close|closing|what time|when.*(open|close))/.test(input)) {
    return '🕒 Cell World hours:\n• Mon–Fri: 8:00 AM – 5:00 PM\n• Sat: 8:00 AM – 2:00 PM\n• Sun: Closed';
  }

  // Services
  if (/(service|repair|fix|unlock|screen protector|frp)/.test(input)) {
    return (
      '🔧 We offer:\n• Google (FRP) & network unlocking\n• Phone repairs (screen, battery, more)\n• Screen protector install (free with purchase, $5 if you bring your own)\n\nFor a repair quote, reach the store:\n' +
      HANDOFF
    );
  }

  // Location / contact
  if (/(where|location|address|find you|contact|reach|phone number|whatsapp)/.test(input)) {
    return "You'll find us in Kingstown, St. Vincent.\n\n" + HANDOFF;
  }

  // Items we don't track (accessories, watches, audio, etc.) — be honest, don't dump phones
  if (/(watch|charger|cable|case|cover|earbud|headphone|airpod|power.?bank|speaker|microphone|controller|gaming|sim card)/.test(input)) {
    return (
      "I don't have those details in my list — the store can tell you what's available:\n\n" +
      HANDOFF +
      '\n\nI can help with phones and tablets in stock, prices, hours and services.'
    );
  }

  // Specific model
  const named = ITEMS.find((i) => i.match.some((m) => wholeWord(input, m)));
  if (named) {
    if (named.inStock) {
      return `Yes — the ${named.name} is in stock at ${money(named.price)}.\n\nTo order:\n${HANDOFF}`;
    }
    return `The ${named.name} isn't in stock right now, but it's expected back. I can show you what we do have — just ask. Or reach the store:\n\n${HANDOFF}`;
  }

  // iPhone / Apple (no iPhones currently in stock)
  if (input.includes('iphone') || input.includes('apple')) {
    const ipads = inStock((i) => i.brand === 'apple' && i.kind === 'tablet');
    let r = "We don't have any iPhones in stock right now — they're expected back.";
    if (ipads.length) r += `\n\nWe do have the ${ipads[0].name} (${money(ipads[0].price)}) if a tablet helps.`;
    r += `\n\nWant the latest from the store?\n${HANDOFF}`;
    return r;
  }

  // Samsung
  if (input.includes('samsung') || input.includes('galaxy')) {
    const s = inStock((i) => i.brand === 'samsung' && i.kind === 'phone');
    return `📱 Samsung phones in stock:\n${formatList(s)}\n\nTo order any of these:\n${HANDOFF}`;
  }

  // itel
  if (input.includes('itel')) {
    const it = inStock((i) => i.brand === 'itel');
    return `📱 itel phones in stock:\n${formatList(it)}\n\nTo order:\n${HANDOFF}`;
  }

  // Tablets / laptop
  if (/(tablet|ipad|fangor)/.test(input)) {
    return `Tablets in stock:\n${formatList(inStock((i) => i.kind === 'tablet'))}\n\nTo order:\n${HANDOFF}`;
  }
  if (/(laptop|computer|lenovo|ideapad)/.test(input)) {
    return `In stock:\n${formatList(inStock((i) => i.kind === 'laptop'))}\n\nTo order:\n${HANDOFF}`;
  }

  // Cheapest / budget
  if (/(cheap|cheapest|budget|affordable|lowest|least expensive)/.test(input)) {
    const phones = inStock((i) => i.kind === 'phone');
    return `Our most affordable phone in stock is the ${phones[0].name} at ${money(phones[0].price)}.\n\nOther good-value options:\n${formatList(phones.slice(0, 4))}\n\nTo order:\n${HANDOFF}`;
  }

  // General phones / "what do you have" / "in stock"
  if (/(phone|stock|have|sell|carry|available|show|list|what do you)/.test(input)) {
    const phones = inStock((i) => i.kind === 'phone');
    return `📱 Phones in stock right now:\n${formatList(phones)}\n\nWe also have the iPad 9th Gen, a FANGOR tablet and a Lenovo laptop. To order or ask more:\n${HANDOFF}`;
  }

  // Honest fallback
  return (
    "I'm not sure I have that one — best to check with the store directly:\n\n" +
    HANDOFF +
    '\n\nOr ask me about phones in stock, prices, hours or services.'
  );
}
