'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Clock, Phone, Shield, HelpCircle, MapPin, Mail, Sparkles, Headphones } from 'lucide-react';

// Enhanced Cell World Knowledge Base with complete training data
const cellWorldKnowledge = {
  storeInfo: {
    name: "Cell World St. Vincent",
    location: "St. Vincent and the Grenadines",
    email: "musicworld@vincysurf.com",
    phone: "Contact us in store", // Add actual number when available
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM", 
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "8:00 AM - 5:00 PM",
      sunday: "CLOSED"
    },
    services: [
      "Phone Sales (All Unlocked)",
      "Google Unlock Service", 
      "Network Unlock Service",
      "Phone Repairs",
      "Screen Protector Installation",
      "Screen Protector Replacement",
      "Fishing & Boat Supplies",
      "Electronics & Accessories"
    ]
  },

  products: {
    phones: [
      { 
        name: "Samsung Galaxy S24FE", 
        price: 2999, 
        category: "flagship", 
        camera: "exceptional", 
        cameraScore: 95,
        description: "Latest flagship with pro-level camera system",
        inStock: true 
      },
      { 
        name: "Samsung Galaxy A54", 
        price: 1400, 
        category: "mid-range", 
        camera: "very good",
        cameraScore: 80, 
        description: "Popular mid-range choice with great value",
        inStock: true 
      },
      { 
        name: "Samsung Galaxy A25", 
        price: 1199, 
        category: "mid-range", 
        camera: "very good",
        cameraScore: 78, 
        description: "Great mid-range phone with solid performance",
        inStock: true 
      },
      { 
        name: "Samsung Galaxy A16", 
        price: 649, 
        category: "budget", 
        camera: "good",
        cameraScore: 70, 
        description: "Affordable smartphone with essential features",
        inStock: true 
      },
      { 
        name: "iPhone 15 Pro Max", 
        price: 4500, 
        category: "flagship", 
        camera: "exceptional",
        cameraScore: 98, 
        description: "Top-tier iPhone with pro camera system",
        inStock: true 
      },
      { 
        name: "iPhone 15 Pro", 
        price: 4000, 
        category: "flagship", 
        camera: "exceptional",
        cameraScore: 97, 
        description: "Professional iPhone with advanced features",
        inStock: true 
      },
      { 
        name: "iPhone 15", 
        price: 3200, 
        category: "premium", 
        camera: "excellent",
        cameraScore: 90, 
        description: "Latest iPhone with great camera quality",
        inStock: true 
      },
      { 
        name: "Nokia 110", 
        price: 199, 
        category: "basic", 
        camera: "basic",
        cameraScore: 20, 
        description: "Reliable basic phone with long battery life",
        inStock: true 
      },
      { 
        name: "Logic Z11", 
        price: 199, 
        category: "basic", 
        camera: "basic",
        cameraScore: 25, 
        description: "Simple smartphone for essential needs",
        inStock: true 
      },
      { 
        name: "Blu A140", 
        price: 120, 
        category: "basic", 
        camera: "basic",
        cameraScore: 15, 
        description: "Ultra-affordable basic phone",
        inStock: true 
      }
    ],
    
    accessories: {
      chargers: {
        samsung_original: { min: 135, max: 150, description: "Complete original Samsung charger set" },
        iphone_original: { min: 135, max: 165, description: "Complete original iPhone charger set" },
        generic_cable: { price: 40, description: "Generic charging cable" },
        generic_brick: { price: 40, description: "Generic charging brick" }
      },
      screenProtectors: {
        clear_hydrogel: { price: 40, type: "Hydro-gel clear" },
        clear_tempered: { price: 40, type: "Tempered glass clear" },
        privacy_hydrogel: { price: 50, type: "Hydro-gel privacy" },
        privacy_tempered: { price: 50, type: "Tempered glass privacy" },
        installation: { free: "with purchase", paid: "$5 if you bring your own" }
      }
    },

    fishing: [
      { 
        name: "Professional Fishing Rod", 
        price: 150, 
        beginner: false, 
        description: "7ft carbon fiber rod for experienced anglers",
        inStock: true 
      },
      { 
        name: "Beginner Fishing Rod", 
        price: 89, 
        beginner: true, 
        description: "Perfect starter rod for new anglers",
        inStock: true 
      },
      { 
        name: "Fishing Reel Spinner", 
        price: 89, 
        beginner: true, 
        description: "Easy-to-use spinning reel",
        inStock: true 
      },
      { 
        name: "Tackle Box Pro", 
        price: 45, 
        beginner: true, 
        description: "Complete tackle storage solution",
        inStock: true 
      }
    ]
  }
};

// Enhanced response generation with better pattern matching
const generateResponse = (input: string): string => {
  const lowerInput = input.toLowerCase().trim();
  
  // 1. PRICE INQUIRIES - Multiple patterns
  if (lowerInput.match(/(how much|price|cost|what('s| is) the price|what does.*cost|\$|dollar)/)) {
    // Check for Samsung A54 specifically (different variations)
    if (lowerInput.match(/(a54|a 54|galaxy a54)/)) {
      return `💰 **Samsung Galaxy A54**\n\n📱 Price: $1,400\n✅ In Stock\n🔓 Factory Unlocked\n📸 Very good camera\n💡 Popular mid-range choice with great value\n\nWould you like to see it or compare with other models?`;
    }
    
    // Check for any specific phone
    const phone = cellWorldKnowledge.products.phones.find(p => {
      const phoneName = p.name.toLowerCase();
      const simpleName = phoneName.replace(/samsung galaxy |iphone /g, '');
      return lowerInput.includes(phoneName) || 
             lowerInput.includes(simpleName) ||
             (lowerInput.includes('s24') && phoneName.includes('s24')) ||
             (lowerInput.includes('a25') && phoneName.includes('a25')) ||
             (lowerInput.includes('a16') && phoneName.includes('a16'));
    });
    
    if (phone) {
      return `💰 **${phone.name}**\n\n📱 Price: $${phone.price.toLocaleString()}\n✅ In Stock\n🔓 Factory Unlocked to any network\n📸 Camera: ${phone.camera}\n💡 ${phone.description}\n\nInterested? Visit us to see it in person!`;
    }

    // Charger pricing
    if (lowerInput.includes("charger")) {
      return `🔌 **Charger Pricing:**\n\n**✨ Original Chargers (Complete Set):**\n• Samsung: $135-$150\n• iPhone: $135-$165\n\n**💡 Generic Options:**\n• Charging cable: $40\n• Charging brick: $40\n\nOriginal chargers offer faster, safer charging with warranty. Which type do you need?`;
    }

    // Screen protector pricing
    if (lowerInput.match(/(screen protector|protector|tempered|hydrogel)/)) {
      return `🛡️ **Screen Protector Pricing:**\n\n**Clear Protection:** $40\n• Hydro-gel (flexible)\n• Tempered glass (rigid)\n\n**Privacy Protection:** $50\n• Hydro-gel privacy\n• Tempered glass privacy\n\n✨ **FREE installation** with purchase!\n💡 Bring your own? We install for just $5\n\nWhich type would you prefer?`;
    }
  }

  // 2. AVAILABILITY CHECKS
  if (lowerInput.match(/(do you have|do you sell|available|in stock|got any|carry)/)) {
    if (lowerInput.match(/(iphone charger|charger.*iphone|apple charger)/)) {
      return `✅ **Yes! iPhone chargers in stock:**\n\n📱 **Product:** iPhone Chargers\n✅ **Stock Status:** Available\n📂 **Category:** Accessories\n\n**Options:**\n• Original Apple charger set: $135-$165\n• Generic cables/bricks: $40 each\n\nOriginal chargers ensure fastest, safest charging. Visit us to pick one up!`;
    }
    
    if (lowerInput.includes("charger")) {
      return `✅ **Yes! Chargers in stock:**\n\n📱 **Products:** Samsung & iPhone Chargers\n✅ **Stock Status:** Available\n📂 **Category:** Accessories\n\n**Samsung:** $135-$150 (original)\n**iPhone:** $135-$165 (original)\n**Generic:** $40 each (cable/brick)\n\nWhich brand do you need?`;
    }

    if (lowerInput.includes("phone")) {
      return `✅ **Yes! We sell phones:**\n\n📱 **Products:** Latest Samsung & iPhone models\n✅ **Stock Status:** Multiple models available\n📂 **Category:** Smartphones\n🔓 **All phones are factory unlocked**\n\n**Price Range:** $649 - $4,500\n\nLooking for something specific? Tell me your budget or preferred brand!`;
    }

    if (lowerInput.match(/(screen protector|protector)/)) {
      return `✅ **Yes! Screen protectors in stock:**\n\n🛡️ **Products:** Hydro-gel & Tempered Glass\n✅ **Stock Status:** Available\n📂 **Category:** Accessories\n\n**Types:**\n• Clear protectors: $40\n• Privacy protectors: $50\n• FREE installation with purchase!\n\nProtect your investment today!`;
    }

    if (lowerInput.match(/(fishing|rod|reel|boat)/)) {
      return `✅ **Yes! Fishing & boat supplies available:**\n\n🎣 **Products:** Rods, reels, tackle, boat supplies\n✅ **Stock Status:** Well stocked\n📂 **Category:** Fishing & Marine\n\n**Featured items:**\n• Beginner rods from $89\n• Professional rods from $150\n• Complete tackle boxes from $45\n\nWhether you're new or experienced, we have what you need!`;
    }
  }

  // 3. CHEAPEST PHONE CHECK - MUST CHECK BEFORE GENERIC BUDGET QUERIES
  if (lowerInput.match(/(cheapest|most affordable|lowest price|minimum price|least expensive)/) && 
      (lowerInput.includes("phone") || lowerInput.includes("stock") || lowerInput.includes("available"))) {
    const cheapestPhones = cellWorldKnowledge.products.phones
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);
    
    let response = `💰 **Cheapest Phones in Stock:**\n\n`;
    cheapestPhones.forEach((phone, index) => {
      const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";
      response += `${medal} **${phone.name}** - ${phone.price}\n`;
      response += `   • ${phone.description}\n`;
      response += `   • ✅ In stock\n\n`;
    });
    response += `🔓 All phones are factory unlocked!\n\n💡 The Blu A140 at $120 is our absolute cheapest option!`;
    return response;
  }

  // 4. BUDGET RECOMMENDATIONS - "under X" queries
  if (lowerInput.match(/(under|below|less than|budget|maximum|\<)/) && lowerInput.match(/\d+/)) {
    const priceMatch = lowerInput.match(/(\d+)/);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : 1500;
    
    const recommendations = cellWorldKnowledge.products.phones
      .filter(p => p.price <= maxPrice)
      .sort((a, b) => b.price - a.price)
      .slice(0, 3);

    if (recommendations.length > 0) {
      let response = `💎 **Best phones under ${maxPrice.toLocaleString()}:**\n\n`;
      recommendations.forEach((phone, index) => {
        response += `${index + 1}. **${phone.name}**\n`;
        response += `   💰 Price: ${phone.price.toLocaleString()}\n`;
        response += `   📸 Camera: ${phone.camera}\n`;
        response += `   💡 ${phone.description}\n\n`;
      });
      response += `🔓 All phones are factory unlocked!\n\nWhich one catches your eye?`;
      return response;
    } else {
      return `🤔 Our most affordable phone starts at $120 (Blu A140). Would you like to see our budget-friendly options?`;
    }
  }

  // 4. CAMERA INQUIRIES - Multiple patterns
  if (lowerInput.match(/(best camera|camera phone|good camera|which.*camera|phone.*camera|camera quality|top camera|photography)/)) {
    const bestCameraPhones = cellWorldKnowledge.products.phones
      .sort((a, b) => b.cameraScore - a.cameraScore)
      .slice(0, 3);

    let response = `📸 **Top Camera Phones:**\n\n`;
    bestCameraPhones.forEach((phone, index) => {
      const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";
      response += `${medal} **${phone.name}**\n`;
      response += `   💰 Price: $${phone.price.toLocaleString()}\n`;
      response += `   📷 Camera: ${phone.camera} (Score: ${phone.cameraScore}/100)\n`;
      response += `   💡 ${phone.description}\n\n`;
    });
    response += `These phones deliver professional-quality photos. Want to test the camera in-store?`;
    return response;
  }

  // 5. COMPARISONS
  if (lowerInput.match(/(compare|vs|versus|difference|which is better|or)/)) {
    if ((lowerInput.includes("iphone 15") && lowerInput.includes("s24")) || 
        (lowerInput.includes("samsung") && lowerInput.includes("iphone"))) {
      return `📊 **iPhone 15 vs Samsung Galaxy S24FE:**\n\n**📱 iPhone 15 - $3,200**\n✅ iOS ecosystem\n✅ Excellent camera (90/100)\n✅ Premium build quality\n✅ 5+ years of updates\n✅ iMessage & FaceTime\n\n**📱 Samsung S24FE - $2,999**\n✅ Android flexibility\n✅ Exceptional camera (95/100)\n✅ Better value for money\n✅ S Pen support\n✅ More customization\n\n**Bottom line:** iPhone for Apple ecosystem, Samsung for features & value. Both are excellent! Want to see them side-by-side?`;
    }
  }

  // 6. FISHING FOR BEGINNERS
  if (lowerInput.match(/(fishing.*beginner|beginner.*fishing|start.*fishing|new.*fishing|fishing.*start)/)) {
    return `🎣 **Perfect Fishing Gear for Beginners:**\n\n1. **Beginner Fishing Rod** - $89\n   • Perfect starter rod\n   • Easy to handle\n   • Great for learning\n\n2. **Fishing Reel Spinner** - $89\n   • Simple to use\n   • Smooth operation\n   • Beginner-friendly\n\n3. **Tackle Box Pro** - $45\n   • Everything organized\n   • Essential tackle included\n   • Room to grow\n\n💡 **Starter Bundle:** Get all three for a special price!\n\nOur staff can also give you local fishing tips!`;
  }

  // 7. SUNDAY SPECIFIC
  if (lowerInput.includes("sunday")) {
    return `❌ **Sorry, we're CLOSED on Sundays!**\n\n📅 **Our Schedule:**\n• Monday-Friday: 8:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 5:00 PM\n• Sunday: CLOSED\n\n💡 Visit us Monday through Saturday for the best deals and service!\n\nSee you during the week! 🛍️`;
  }

  // 8. OPENING TIME
  if (lowerInput.match(/(what time.*open|when.*open|opening time|open at)/)) {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return `🕐 **Opening Times:**\n\n📅 **Monday-Friday:** 8:00 AM\n📅 **Saturday:** 9:00 AM\n📅 **Sunday:** CLOSED\n\n✨ **Today (${currentDay}):** ${currentDay === 'Sunday' ? 'CLOSED' : currentDay === 'Saturday' ? '9:00 AM' : '8:00 AM'}\n\nWe open early to serve you better!`;
  }

  // 9. CLOSING TIME
  if (lowerInput.match(/(what time.*close|when.*close|closing time|close at)/)) {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return `🕕 **Closing Times:**\n\n📅 **Monday-Friday:** 6:00 PM\n📅 **Saturday:** 5:00 PM\n📅 **Sunday:** CLOSED\n\n✨ **Today (${currentDay}):** ${currentDay === 'Sunday' ? 'CLOSED' : currentDay === 'Saturday' ? '5:00 PM' : '6:00 PM'}\n\nVisit us before closing time!`;
  }

  // 10. STORE HOURS (general)
  if (lowerInput.match(/(hour|open|close|schedule|when are you)/)) {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = cellWorldKnowledge.storeInfo.hours[currentDay.toLowerCase() as keyof typeof cellWorldKnowledge.storeInfo.hours];
    
    return `🕐 **Cell World Store Hours:**\n\n📅 **Monday-Friday:** 8:00 AM - 6:00 PM\n📅 **Saturday:** 9:00 AM - 5:00 PM\n📅 **Sunday:** CLOSED ❌\n\n✨ **Today (${currentDay}):** ${todayHours}\n\nWe're here to serve you 6 days a week!`;
  }

  // 11. LOCATION
  if (lowerInput.match(/(where.*located|location|address|find you|where are you)/)) {
    return `📍 **Cell World Location:**\n\n🏝️ **St. Vincent and the Grenadines**\n\n📧 Email: musicworld@vincysurf.com\n\n🕐 **Visit Us:**\n• Mon-Fri: 8AM-6PM\n• Saturday: 9AM-5PM\n• Sunday: CLOSED\n\nCome visit us for hands-on experience with all our products!`;
  }

  // 12. CONTACT INFO
  if (lowerInput.match(/(contact|phone number|call|email|reach)/)) {
    return `📞 **Contact Cell World:**\n\n📧 **Email:** musicworld@vincysurf.com\n📍 **Location:** St. Vincent and the Grenadines\n\n🕐 **Store Hours:**\n• Monday-Friday: 8:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 5:00 PM\n• Sunday: CLOSED\n\nVisit us in-store for immediate assistance or email us anytime!`;
  }

  // 13. UNLOCKED PHONES
  if (lowerInput.match(/(unlocked|locked|carrier|network|sim)/)) {
    return `🔓 **All Our Phones Are Factory Unlocked!**\n\n✅ Works with ANY network carrier\n✅ Use any SIM card\n✅ No restrictions\n✅ International compatible\n✅ Switch carriers anytime\n\n💡 Freedom to choose your network provider!\n\nEvery phone we sell comes unlocked - guaranteed!`;
  }

  // 14. SERVICES
  if (lowerInput.match(/(unlock.*service|repair|fix|service|google unlock|network unlock)/)) {
    return `🔧 **Cell World Services:**\n\n📱 **Unlocking Services:**\n• ✅ Google Unlock (FRP removal)\n• ✅ Network Unlock (any carrier)\n\n🛠️ **Repair Services:**\n• ✅ Phone repairs\n• ✅ Screen replacement\n• ✅ Battery replacement\n\n🛡️ **Protection Services:**\n• ✅ Screen protector installation (FREE with purchase)\n• ✅ Screen protector replacement\n• ✅ Bring your own protector ($5 installation)\n\nBring your device for a FREE assessment!`;
  }

  // 15. CHEAPEST OPTIONS - Priority check for "cheapest phone(s) in stock"
  if (lowerInput.match(/(cheapest.*phone|most affordable.*phone|lowest price.*phone|minimum.*phone|least expensive.*phone|cheapest.*stock)/)) {
    const cheapestPhones = cellWorldKnowledge.products.phones
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);
    
    let response = `💰 **Cheapest Phones in Stock:**\n\n`;
    cheapestPhones.forEach((phone, index) => {
      const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";
      response += `${medal} **${phone.name}** - ${phone.price}\n`;
      response += `   • ${phone.description}\n`;
      response += `   • ✅ In stock\n\n`;
    });
    response += `🔓 All phones are factory unlocked!\n\n💡 The Blu A140 at $120 is our absolute cheapest option!`;
    return response;
  }
  
  // Other cheapest queries
  if (lowerInput.match(/(cheapest|lowest price|most affordable|minimum|least expensive)/)) {
    if (lowerInput.includes("screen protector")) {
      return `💰 **Most Affordable Screen Protection:**\n\n🛡️ **Clear Screen Protectors - $40**\n• Hydro-gel option\n• Tempered glass option\n• FREE installation included!\n\n📱 Privacy protectors start at $50\n\n💡 Best value: Buy any protector and get FREE professional installation!`;
    }
  }

  // Generic fallback with helpful suggestions
  return `🤖 **Hi! I'm Celly, your Cell World assistant!**\n\nI can help you with:\n\n📱 **Phones & Pricing**\n• "How much is the Samsung A54?"\n• "Show me phones under $2000"\n• "Which phone has the best camera?"\n\n🔧 **Services**\n• "Do you do phone repairs?"\n• "Can you unlock phones?"\n\n🛍️ **Products**\n• "Do you have iPhone chargers?"\n• "Screen protector prices?"\n• "Fishing equipment for beginners?"\n\n📍 **Store Info**\n• "Are you open on Sunday?"\n• "What time do you close?"\n• "Where are you located?"\n\nWhat would you like to know? 😊`;
};

export default function Celly() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isBot: boolean, timestamp: Date}>>([
    {
      text: "👋 Welcome to Cell World St. Vincent! I'm Celly, your personal shopping assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: <Clock className="w-4 h-4" />, text: "Store Hours", query: "What are your store hours?" },
    { icon: <Phone className="w-4 h-4" />, text: "Best Camera", query: "Which phone has the best camera?" },
    { icon: <Shield className="w-4 h-4" />, text: "Services", query: "What services do you offer?" },
    { icon: <MapPin className="w-4 h-4" />, text: "Contact", query: "What's your email address?" },
  ];

  const handleSend = () => {
    if (inputMessage.trim()) {
      // Add user message
      const userMessage = {
        text: inputMessage,
        isBot: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);
      
      // Generate bot response
      setTimeout(() => {
        const botResponse = {
          text: generateResponse(inputMessage),
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 800);
    }
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button with Celly Avatar */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 group pulsate"
        style={{
          width: '80px',
          height: '80px'
        }}
        aria-label="Open chat with Celly"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Celly Avatar */}
          <img 
            src="/images/celly/celly-avatar-main.png"
            alt="Celly AI Assistant"
            className="w-16 h-16 rounded-full object-cover bg-white"
            style={{
              objectPosition: 'top center'
            }}
          />
          {/* Online indicator */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></span>
        </div>
        <span className="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
  Hi Im Celly - Ask me anything
</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* Celly Avatar */}
                <img 
                  src="/images/celly/celly-avatar-main.png"
                  alt="Celly"
                  className="w-12 h-12 rounded-full object-cover bg-white border-2 border-white/50"
                  style={{
                    objectPosition: 'top center'
                  }}
                />
                {/* Online status */}
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Celly Assistant</h3>
                <p className="text-xs text-white/80">🟢 Online • Cell World Expert</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 p-3 border-b">
            <p className="text-xs text-gray-600 mb-2">Quick Questions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.query)}
                  className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg text-sm hover:bg-orange-50 transition-colors border border-gray-200"
                >
                  {action.icon}
                  <span className="text-xs">{action.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}
              >
                <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-end gap-2">
                    {message.isBot && (
  <img 
    src="/images/celly/celly-avatar-icon.png"
    alt="Celly"
    className="w-8 h-8 rounded-full"
  />
)}
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                          : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-none shadow-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-400' : 'text-white/70'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {!message.isBot && (
                      <div className="bg-gray-200 p-2 rounded-full">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <img 
  src="/images/celly/celly-avatar-icon.png"
  alt="Celly"
  className="w-8 h-8 rounded-full"
/>                  <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about phones, prices, services..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Powered by Cell World AI ✨
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulsate {
          0% {
            box-shadow: 0 0 0 0 rgba(251, 146, 60, 0.7),
                        0 10px 25px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(251, 146, 60, 0),
                        0 0 30px rgba(255, 165, 0, 0.6),
                        0 10px 25px rgba(0, 0, 0, 0.3);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(251, 146, 60, 0),
                        0 10px 25px rgba(0, 0, 0, 0.3);
          }
        }

        .pulsate {
          animation: pulsate 2s ease-in-out infinite;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}