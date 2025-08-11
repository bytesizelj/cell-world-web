'use client';

import React, { useState, useEffect, useRef } from 'react';

// Define types for better TypeScript support
interface Message {
  type: 'bot' | 'user';
  text: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  ram?: string;
  storage?: string;
  camera?: string;
  brand?: string;
  network?: string;
}

// Product data
const phoneProducts: Product[] = [
  { id: 'samsung-s24fe', name: 'Samsung Galaxy S24FE', price: 2999.00, category: 'flagship', ram: '8GB', storage: '256GB', camera: '50MP', brand: 'Samsung' },
  { id: 'samsung-a25', name: 'Samsung Galaxy A25', price: 1199.00, category: 'mid-range', ram: '6GB', storage: '128GB', camera: '50MP', brand: 'Samsung' },
  { id: 'samsung-a16', name: 'Samsung Galaxy A16', price: 649.00, category: 'budget', ram: '4GB', storage: '128GB', camera: '50MP', brand: 'Samsung' },
  { id: 'samsung-a06', name: 'Samsung Galaxy A06', price: 499.00, category: 'budget', ram: '4GB', storage: '64GB', camera: '50MP', brand: 'Samsung' },
  { id: 'samsung-a05s', name: 'Samsung Galaxy A05s', price: 549.00, category: 'budget', ram: '4GB', storage: '128GB', camera: 'Triple', brand: 'Samsung' },
  { id: 'samsung-a26', name: 'Samsung Galaxy A26 5G', price: 1250.00, category: 'mid-range', ram: '6GB', storage: '128GB', camera: '50MP', brand: 'Samsung', network: '5G' },
  { id: 'samsung-f05', name: 'Samsung Galaxy F05', price: 420.00, category: 'budget', ram: '4GB', storage: '64GB', camera: '50MP', brand: 'Samsung' },
  { id: 'ipad-9th-gen', name: 'iPad 9th Generation', price: 1799.00, category: 'tablet', ram: '3GB', storage: '64GB', camera: '8MP', brand: 'Apple' },
  { id: 'blu-a140', name: 'BLU A140', price: 120.00, category: 'basic', ram: 'Basic', storage: 'MicroSD', camera: 'Basic', brand: 'BLU' },
  { id: 'logic-z1l', name: 'Logic Z1L Flip Phone', price: 199.00, category: 'flip', ram: 'Basic', storage: 'MicroSD', brand: 'Logic' },
  { id: 'nokia-110', name: 'Nokia 110 4G', price: 199.00, category: 'basic', ram: 'Basic', storage: 'MicroSD', network: '4G', brand: 'Nokia' },
  { id: 'zteblade-a72s', name: 'ZTE Blade A72s', price: 499.00, category: 'budget', ram: '4GB', storage: '64GB', camera: '50MP', brand: 'ZTE' }
];

const CellyAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      text: "👋 Hi! I'm Celly, your Cell World assistant! How can I help you today?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Debug log
  useEffect(() => {
    console.log('✅ CellyAssistant mounted successfully');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // BUSINESS HOURS & SCHEDULE QUERIES
    if (lowerQuery.includes('open') || lowerQuery.includes('hours') || lowerQuery.includes('sunday') || 
        lowerQuery.includes('saturday') || lowerQuery.includes('weekend') || lowerQuery.includes('time') ||
        lowerQuery.includes('schedule') || lowerQuery.includes('closed')) {
      
      // Check specific day queries
      if (lowerQuery.includes('sunday')) {
        return {
          type: 'hours',
          response: `Sorry, we're CLOSED on Sundays. 😊\n\n**Our Store Hours:**\n📅 Monday - Friday: 8:00 AM - 5:00 PM\n📅 Saturday: 8:00 AM - 2:00 PM\n📅 Sunday: CLOSED\n\n📍 Location: Opposite Old BOSVG Building, Halifax Street, Kingstown, St. Vincent\n📞 Call us: 1-784-451-2261 / 1-784-431-0777\n\nSee you Monday-Saturday!`
        };
      }
      
      return {
        type: 'hours',
        response: `**Our Store Hours:**\n📅 Monday - Friday: 8:00 AM - 5:00 PM\n📅 Saturday: 8:00 AM - 2:00 PM\n📅 Sunday: CLOSED\n\n📍 Opposite Old BOSVG Building, Halifax Street, Kingstown, St. Vincent\n📞 Phone: 1-784-451-2261 / 1-784-431-0777\n💬 WhatsApp: 1-784-431-0777\n\nWe're open Monday to Saturday for your convenience!`
      };
    }

    // LOCATION & DIRECTIONS QUERIES
    if (lowerQuery.includes('where') || lowerQuery.includes('location') || lowerQuery.includes('address') || 
        lowerQuery.includes('directions') || lowerQuery.includes('find you')) {
      return {
        type: 'location',
        response: `📍 **Find us at:**\nCell World Store\nOpposite Old BOSVG Building\nHalifax Street, Kingstown\nSt. Vincent\n\n**Contact us:**\n📞 Phone: 1-784-451-2261 / 1-784-431-0777\n💬 WhatsApp: 1-784-431-0777\n\nWe're right opposite the Old BOSVG Building on Halifax Street - easy to find! Look for our Cell World sign. 🏪`
      };
    }

    // CONTACT INFORMATION QUERIES
    if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('call') || 
        lowerQuery.includes('whatsapp') || lowerQuery.includes('reach')) {
      return {
        type: 'contact',
        response: `**Here's how to reach us:**\n\n📞 **Office:** 1-784-451-2261\n📱 **Mobile/WhatsApp:** 1-784-431-0777\n📧 **Email:** info@cellworldsvg.com\n\n**Store Hours:**\nMon-Fri: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 2:00 PM\nSunday: CLOSED\n\n📍 **Visit us at:**\nOpposite Old BOSVG Building\nHalifax Street, Kingstown, St. Vincent\n\nWe're always happy to help! 😊`
      };
    }

    // SERVICES & WHAT WE OFFER
    if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('sell') || 
        lowerQuery.includes('what do you') || lowerQuery.includes('repair')) {
      return {
        type: 'services',
        response: `**Our Services & Products:**\n\n📱 **Mobile Phones** - Latest smartphones & tablets\n🎣 **Fishing Gear** - Professional equipment\n🎮 **Gaming** - Controllers, headsets, accessories\n📷 **Security** - Cameras & alarm systems\n☀️ **Solar** - Panels, batteries, inverters\n🔌 **Electronics** - Chargers, cables, speakers\n🔧 **Phone Repairs** - Screen fixes, battery replacement\n💳 **Phone Plans** - Prepaid & postpaid options\n\nNeed something specific? Just ask or visit our store!`
      };
    }

    // PAYMENT METHODS
    if (lowerQuery.includes('payment') || lowerQuery.includes('pay') || lowerQuery.includes('credit card') || 
        lowerQuery.includes('cash')) {
      return {
        type: 'payment',
        response: `**We accept multiple payment methods:**\n\n💵 Cash\n💳 Credit/Debit Cards (Visa, Mastercard)\n📱 Mobile Money\n🏦 Bank Transfer\n\nFor online orders, call us at 1-784-451-2261 to arrange payment and delivery!`
      };
    }

    // DELIVERY & SHIPPING
    if (lowerQuery.includes('deliver') || lowerQuery.includes('ship')) {
      return {
        type: 'delivery',
        response: `**Delivery Options:**\n\n🚚 **Local Delivery** (Kingstown area) - Same day available!\n📦 **Island-wide Shipping** - 1-2 business days\n🏃 **Store Pickup** - Ready in 30 minutes\n\n**To arrange delivery:**\n📞 Call: 1-784-451-2261\n💬 WhatsApp: 1-784-431-0777\n\nDelivery fees vary by location. Free delivery on orders over $500!`
      };
    }

    // Price queries
    if (lowerQuery.includes('cheap') || lowerQuery.includes('lowest price') || lowerQuery.includes('affordable')) {
      const cheapest = phoneProducts.reduce((min, p) => p.price < min.price ? p : min);
      return {
        type: 'product_recommendation',
        response: `Our most affordable phone is the **${cheapest.name}** at just ${cheapest.price}! 💰\n\nIt's perfect for basic use. We also have the Nokia 110 4G and Logic Flip Phone at $199 each if you need something simple.`,
        products: phoneProducts.filter(p => p.price <= 200)
      };
    }

    // Price range queries
    const priceMatch = lowerQuery.match(/under \$?(\d+)|below \$?(\d+)|less than \$?(\d+)/);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3]);
      const filtered = phoneProducts.filter(p => p.price <= maxPrice);
      
      if (filtered.length > 0) {
        return {
          type: 'price_filter',
          response: `Great! I found ${filtered.length} phones under ${maxPrice}:\n\n${filtered.map(p => `• **${p.name}** - ${p.price}`).join('\n')}\n\nWould you like more details about any of these?`,
          products: filtered
        };
      } else {
        return {
          type: 'no_results',
          response: `I don't see any phones under ${maxPrice} in our current online catalog. However, we have more options in store! Please call us at 📞 1-784-451-2261 or visit our store for more budget-friendly options.`
        };
      }
    }

    // Samsung specific
    if (lowerQuery.includes('samsung')) {
      const samsungs = phoneProducts.filter(p => p.brand === 'Samsung');
      return {
        type: 'brand_query',
        response: `We have ${samsungs.length} Samsung phones available:\n\n${samsungs.map(p => `• **${p.name}** - ${p.price}`).join('\n')}\n\nWhich one interests you?`,
        products: samsungs
      };
    }

    // Apple/iPad queries
    if (lowerQuery.includes('apple') || lowerQuery.includes('ipad') || lowerQuery.includes('iphone')) {
      const appleProducts = phoneProducts.filter(p => p.brand === 'Apple');
      if (appleProducts.length > 0) {
        return {
          type: 'brand_query',
          response: `We have the **${appleProducts[0].name}** available at ${appleProducts[0].price}!\n\n📱 We also carry iPhones and more Apple products in store. Visit us or call 1-784-451-2261 for our full Apple selection!`,
          products: appleProducts
        };
      }
    }

    // Camera queries
    if (lowerQuery.includes('camera') || lowerQuery.includes('photo')) {
      const goodCameras = phoneProducts.filter(p => p.camera === '50MP');
      return {
        type: 'feature_query',
        response: `For great photos, I recommend these phones with 50MP cameras:\n\n${goodCameras.slice(0, 4).map(p => `• **${p.name}** - ${p.price}`).join('\n')}\n\nThe Samsung Galaxy S24FE has the best camera system overall! 📸`,
        products: goodCameras
      };
    }

    // 5G queries
    if (lowerQuery.includes('5g')) {
      const fiveG = phoneProducts.filter(p => p.network === '5G');
      if (fiveG.length > 0) {
        return {
          type: 'feature_query',
          response: `Here are our 5G-enabled phones:\n\n${fiveG.map(p => `• **${p.name}** - ${p.price}`).join('\n')}\n\n5G gives you super-fast internet speeds where available! 🚀`,
          products: fiveG
        };
      }
    }

    // Tablet queries
    if (lowerQuery.includes('tablet') || lowerQuery.includes('tab')) {
      const tablets = phoneProducts.filter(p => p.category === 'tablet');
      if (tablets.length > 0) {
        return {
          type: 'product_recommendation',
          response: `We have the **${tablets[0].name}** at ${tablets[0].price}!\n\n🖥️ Perfect for work, entertainment, and creativity. We also have Android tablets in store - call us for more options!`,
          products: tablets
        };
      }
    }

    // Fishing gear queries
    if (lowerQuery.includes('fishing') || lowerQuery.includes('rod') || lowerQuery.includes('reel')) {
      return {
        type: 'fishing',
        response: `🎣 **Fishing Gear Available!**\n\nWe have a great selection of:\n• Fishing rods (from $99)\n• Reels & spinning reels\n• Tackle boxes & lures\n• Lines & hooks\n• Professional equipment\n\nVisit our Fishing section online or come to the store to see our full range!\n\n📞 Call 1-784-451-2261 for specific fishing gear inquiries.`
      };
    }

    // Gaming queries
    if (lowerQuery.includes('gaming') || lowerQuery.includes('game') || lowerQuery.includes('playstation') || 
        lowerQuery.includes('xbox') || lowerQuery.includes('controller')) {
      return {
        type: 'gaming',
        response: `🎮 **Gaming Products:**\n\nWe carry:\n• Gaming controllers\n• Headsets & microphones\n• Gaming keyboards & mice\n• Console accessories\n• Game cards & gift cards\n\nCheck our "More Products" section or visit the store for our full gaming selection!\n\n📞 Call for availability: 1-784-451-2261`
      };
    }

    // Greeting queries
    if (lowerQuery.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/i)) {
      return {
        type: 'greeting',
        response: `Hello! 👋 Welcome to Cell World!\n\nI'm Celly, your virtual assistant. I can help you with:\n• 📱 Finding the perfect phone\n• 💰 Checking prices\n• 📍 Store hours & location\n• 🎣 Fishing gear info\n• And much more!\n\nWhat can I help you with today?`
      };
    }

    // Thank you queries
    if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
      return {
        type: 'thanks',
        response: `You're very welcome! 😊\n\nIs there anything else I can help you with? Remember, you can always:\n📞 Call us: 1-784-451-2261\n💬 WhatsApp: 1-784-431-0777\n📍 Visit us in Kingstown\n\nWe're here to help!`
      };
    }

    // Default/Unknown queries
    return {
      type: 'default',
      response: `I'd love to help you with that! While I can show you our online phone selection, we have MUCH more in store including:\n\n• Gaming accessories\n• Security cameras\n• Solar equipment\n• Fishing gear\n• And more!\n\n📞 Call us at 1-784-451-2261\n📍 Or visit our store in Kingstown\n\nMeanwhile, what type of phone are you looking for? I can help with our current online selection!`
    };
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const analysis = analyzeQuery(inputValue);
      setMessages(prev => [...prev, { type: 'bot', text: analysis.response }]);
      setIsTyping(false);
    }, 1000);

    setInputValue('');
  };

  const quickActions = [
    "Show cheapest phones",
    "Phones under $500",
    "Samsung phones",
    "Best camera phone"
  ];

  return (
    <>
      {/* Celly Agent Button - FIXED POSITIONING */}
      {!isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 99999
          }}
        >
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            {/* Pulsing animation background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #FFA500, #FF6347)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite',
              opacity: 0.6
            }} />
            
            {/* Main button */}
            <div style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
              borderRadius: '50%',
              boxShadow: '0 10px 30px rgba(255, 165, 0, 0.5)',
              border: '4px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              <span style={{ fontSize: '40px' }}>🤖</span>
            </div>
            
            {/* Online indicator */}
            <div style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              width: '16px',
              height: '16px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              border: '3px solid white',
              animation: 'blink 2s infinite'
            }} />
            
            {/* Message bubble */}
            <div style={{
              position: 'absolute',
              top: '-5px',
              left: '-5px',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              animation: 'bounce 2s infinite'
            }}>
              <span style={{ fontSize: '20px' }}>💬</span>
            </div>
            
            {/* Hover tooltip */}
            <div style={{
              position: 'absolute',
              bottom: '100px',
              right: 0,
              backgroundColor: 'black',
              color: '#FFA500',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
            className="celly-tooltip"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✨ <span>Hi! I'm Celly, your assistant!</span>
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                Click to chat with me
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window - FIXED POSITIONING */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 99999,
          width: '400px',
          height: isMinimized ? '70px' : '600px',
          transition: 'height 0.3s ease'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            border: '2px solid #FFA500',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: isMinimized ? '18px' : '18px 18px 0 0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <span style={{ fontSize: '28px' }}>🤖</span>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#4CAF50',
                    borderRadius: '50%',
                    border: '2px solid white'
                  }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: 'black', fontSize: '18px', fontWeight: 'bold' }}>
                    Celly
                  </h3>
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.8)' }}>
                    ✨ Cell World AI Assistant
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'black',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  }}
                >
                  <span style={{ transform: isMinimized ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                    ⌄
                  </span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'black',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '20px',
                  backgroundColor: '#f8f9fa'
                }}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '16px'
                      }}
                    >
                      {message.type === 'bot' && (
                        <div style={{ marginRight: '8px', marginTop: '4px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{ fontSize: '18px' }}>🤖</span>
                          </div>
                        </div>
                      )}
                      <div
                        style={{
                          maxWidth: '75%',
                          padding: '12px 16px',
                          borderRadius: message.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          backgroundColor: message.type === 'user' ? '#007bff' : 'white',
                          color: message.type === 'user' ? 'white' : '#333',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                          fontSize: '14px',
                          lineHeight: '1.5'
                        }}
                      >
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ marginRight: '8px', marginTop: '4px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ fontSize: '18px' }}>🤖</span>
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: 'white',
                        padding: '12px 16px',
                        borderRadius: '18px 18px 18px 4px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#999',
                            borderRadius: '50%',
                            animation: 'bounce 1.4s infinite',
                            animationDelay: '0s'
                          }} />
                          <div style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#999',
                            borderRadius: '50%',
                            animation: 'bounce 1.4s infinite',
                            animationDelay: '0.2s'
                          }} />
                          <div style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#999',
                            borderRadius: '50%',
                            animation: 'bounce 1.4s infinite',
                            animationDelay: '0.4s'
                          }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  gap: '8px',
                  overflowX: 'auto',
                  borderTop: '1px solid #e0e0e0'
                }}>
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(action)}
                      style={{
                        fontSize: '12px',
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFA500';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = '#FFA500';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = 'black';
                        e.currentTarget.style.borderColor = '#ddd';
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div style={{
                  padding: '16px',
                  borderTop: '1px solid #e0e0e0',
                  backgroundColor: 'white'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about phones, prices, features..."
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '24px',
                        outline: 'none',
                        fontSize: '14px',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#FFA500';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#ddd';
                      }}
                    />
                    <button
                      onClick={handleSend}
                      style={{
                        background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
                        border: 'none',
                        color: 'white',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      ➤
                    </button>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    📞 Need more help? Call 1-784-451-2261 / 1-784-431-0777
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes blink {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0.5;
          }
        }
        
        button:hover .celly-tooltip {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
};

export default CellyAssistant;