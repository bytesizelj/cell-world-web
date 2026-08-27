'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Clock, Phone, Shield, HelpCircle, MapPin, Mail, Sparkles, Headphones } from 'lucide-react';
import { searchProducts, getCheapestProducts, getProductsInPriceRange, getProductsByBrand } from '@/utils/productDatabase';
import { getCellyReply } from '@/lib/cellyRules';

// Intent Detection System - Groups similar questions together
const detectIntent = (input: string): string => {
  const lower = input.toLowerCase();
  
  // CHEAP/BUDGET PHONES - All variations
  if ((lower.match(/(cheap|cheapest|affordable|budget|low.?price|inexpensive|lowest|minimum)/) && 
       lower.match(/(phone|mobile|cell|smartphone)/)) ||
      lower.match(/phone.*(under|below|less than).*\d/) ||
      lower.match(/(under|below|less than).*\d.*(phone|mobile)/)) {
    
    // Check if asking for specific brand
    if (lower.includes('samsung') || lower.includes('galaxy')) return 'CHEAP_SAMSUNG';
    if (lower.includes('iphone') || lower.includes('apple')) return 'CHEAP_IPHONE';
    return 'CHEAP_PHONES';
  }
  
  // CHEAPEST PHONE (superlative)
  if (lower.match(/(cheapest|most affordable|lowest price|least expensive)/) && 
      lower.match(/(phone|mobile|stock|available)/)) {
    return 'CHEAPEST_PHONE';
  }
  
  // STORE HOURS
  if (lower.match(/(hour|open|close|schedule|when are you|what time)/)) {
    if (lower.includes('sunday')) return 'SUNDAY_HOURS';
    if (lower.match(/(open|opening)/)) return 'OPENING_TIME';
    if (lower.match(/(close|closing)/)) return 'CLOSING_TIME';
    return 'STORE_HOURS';
  }
  
  // SERVICES
  if (lower.match(/(service|repair|fix|unlock|google unlock|network unlock)/)) {
    return 'SERVICES';
  }
  
  // LOCATION/CONTACT
  if (lower.match(/(where|location|address|find you|contact|email|reach)/)) {
    return 'CONTACT';
  }
  
  // PRODUCT AVAILABILITY - ORDER MATTERS! Check specific items before generic ones
  if (lower.match(/(do you have|do you sell|available|in stock|got any|carry)/)) {
    if (lower.match(/(case|cases|cover)/)) return 'HAVE_CASES';  // BEFORE phone!
    if (lower.match(/(screen protector|protector)/)) return 'HAVE_PROTECTORS';
    if (lower.match(/(power.?bank|portable.?charger|battery.?pack)/)) return 'HAVE_POWERBANKS';
    if (lower.match(/(earbud|airpod)/)) return 'HAVE_EARBUDS';
    if (lower.match(/(headphone|headset)/)) return 'HAVE_HEADPHONES';
    if (lower.match(/(watch)/)) return 'HAVE_WATCHES';
    if (lower.match(/(controller|gaming|playstation|xbox|ps4|ps5)/)) return 'HAVE_GAMING';
    if (lower.match(/(microphone|mic)/)) return 'HAVE_MICROPHONES';
    if (lower.match(/(cable|usb|lightning|type.?c)/)) return 'HAVE_CABLES';
    if (lower.match(/(charger|charging.?brick)/)) return 'HAVE_CHARGERS';
    if (lower.match(/(phone)/)) return 'HAVE_PHONES';  // AFTER cases, chargers, etc.
    if (lower.match(/(fishing|rod|reel|boat)/)) return 'HAVE_MARINE';
    if (lower.match(/(speaker|jbl|audio)/)) return 'HAVE_SPEAKERS';
    return 'AVAILABILITY_GENERAL';
  }
  
  // BEST CAMERA
  if (lower.match(/(best camera|camera phone|good camera|top camera|photography)/)) {
    return 'BEST_CAMERA';
  }
  
  // BRAND QUERIES
  if (lower.includes('samsung') && !lower.match(/(cheap|affordable|budget)/)) return 'SAMSUNG_PHONES';
  if (lower.includes('iphone') && !lower.match(/(cheap|affordable|budget)/)) return 'IPHONE_PHONES';
  if (lower.includes('jbl')) return 'JBL_SPEAKERS';
  
  // GREETINGS
  if (lower.match(/^(hi|hey|hello|good morning|good afternoon|good evening)$/)) {
    return 'GREETING';
  }
  
  // THANKS
  if (lower.includes('thank')) return 'THANKS';

  // DIRECT PRODUCT QUERIES (without "do you have" phrasing)
  if (lower.match(/(case|cases|cover)/)) return 'HAVE_CASES';
  if (lower.match(/(power.?bank|portable.?charger|battery.?pack)/)) return 'HAVE_POWERBANKS';
  if (lower.match(/(earbud|airpod)/)) return 'HAVE_EARBUDS';
  if (lower.match(/(headphone|headset)/)) return 'HAVE_HEADPHONES';
  if (lower.match(/(watch)/)) return 'HAVE_WATCHES';
  if (lower.match(/(controller|playstation|ps4|ps5|xbox|gaming)/)) return 'HAVE_GAMING';
  if (lower.match(/(microphone|mic)/)) return 'HAVE_MICROPHONES';
  if (lower.match(/(cable|usb|lightning|type.?c)/)) return 'HAVE_CABLES';
  if (lower.match(/(charger|charging.?brick)/)) return 'HAVE_CHARGERS';
  
  // PRICE INQUIRY FOR SPECIFIC PRODUCT
  if (lower.match(/(how much|price|cost)/) && !lower.match(/(phone|cheap)/)) {
    return 'PRICE_INQUIRY';
  }
  
  // UNLOCKED PHONES QUESTION
  if (lower.match(/(unlocked|locked|carrier|network|sim)/)) {
    return 'UNLOCKED_INFO';
  }
  
  // DELIVERY
  if (lower.match(/(deliver|delivery|ship|shipping)/)) {
    return 'DELIVERY_INFO';
  }
  
  return 'UNKNOWN';
};

// Enhanced Cell World Knowledge Base with complete training data
const cellWorldKnowledge = {
  storeInfo: {
    name: "Cell World St. Vincent",
    location: "St. Vincent and the Grenadines",
    email: "info@cellworldsvg.com",
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

// Response Generator - Uses intents and pulls from database
const generateResponse = (input: string): string => {
  const intent = detectIntent(input);
  const lowerInput = input.toLowerCase();
  
  switch (intent) {
    
    // ========== CHEAP/BUDGET PHONES ==========
    case 'CHEAP_PHONES':
    case 'CHEAPEST_PHONE': {
      const cheapPhones = getCheapestProducts('phones', 3);
      let response = `💰 **Cheapest Phones in Stock:**\n\n`;
      cheapPhones.forEach((phone, index) => {
        const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";
        response += `${medal} **${phone.name}** - $${phone.price}\n`;
        response += `   • ${phone.availability || 'In Stock'}\n\n`;
      });
      response += `🔓 All phones are factory unlocked!\n\n💡 The **${cheapPhones[0].name}** at **$${cheapPhones[0].price}** is our absolute cheapest option!`;
      return response;
    }
    
    case 'CHEAP_SAMSUNG': {
      const samsungPhones = getProductsByBrand('Samsung')
        .filter(p => p.category === 'phones')
        .sort((a, b) => a.price - b.price)
        .slice(0, 3);
      
      let response = `📱 **Most Affordable Samsung Phones:**\n\n`;
      samsungPhones.forEach((phone, index) => {
        const medal = index === 0 ? "💎" : index === 1 ? "⭐" : "✨";
        response += `${medal} **${phone.name}** - $${phone.price}\n`;
        response += `   • ${phone.availability || 'In Stock'}\n\n`;
      });
      response += `🔓 All unlocked!\n\n💡 The **${samsungPhones[0].name}** at **$${samsungPhones[0].price}** is our best Samsung deal!`;
      return response;
    }
    
    case 'CHEAP_IPHONE': {
      return `📱 **iPhone Pricing:**\n\nHonestly? iPhones aren't "cheap" - but here's what we have:\n\n💎 Our iPhone selection starts at premium prices.\n\n💡 **Want something budget-friendly?**\nCheck our Samsung or Motorola options starting at **$120!**\n\nWant me to show you affordable alternatives?`;
    }
    
    // ========== BRAND QUERIES ==========
    case 'SAMSUNG_PHONES': {
      const samsungPhones = getProductsByBrand('Samsung')
        .filter(p => p.category === 'phones')
        .sort((a, b) => a.price - b.price);
      
      let response = `📱 **Samsung Phones in Stock:**\n\n`;
      samsungPhones.forEach(phone => {
        const status = phone.availability === 'More Coming Soon' ? '📦 More Coming Soon' : '✅ In Stock';
        response += `• **${phone.name}** - $${phone.price}\n  ${status}\n`;
      });
      response += `\n🔓 All phones are factory unlocked!\n\nWhich Samsung model interests you?`;
      return response;
    }
    
    case 'IPHONE_PHONES': {
      return `📱 **iPhone Models:**\n\nContact us for current iPhone availability and pricing!\n\n📞 Visit us in store or call for the latest stock.\n\n🔓 All phones are factory unlocked!`;
    }
    
    case 'JBL_SPEAKERS': {
      const jblSpeakers = getProductsByBrand('JBL')
        .filter(p => p.subcategory === 'speakers')
        .sort((a, b) => a.price - b.price);
      
      let response = `🔊 **JBL Speakers Available:**\n\n`;
      jblSpeakers.slice(0, 6).forEach(speaker => {
        response += `• **${speaker.name}** - $${speaker.price}\n`;
      });
      response += `\n🎵 Premium sound quality guaranteed!\n\nWhich JBL speaker interests you?`;
      return response;
    }
    
    // ========== STORE HOURS ==========
    case 'SUNDAY_HOURS': {
      return `❌ **Sorry, we're CLOSED on Sundays!**\n\n📅 **Our Schedule:**\n• Monday-Friday: 8:00 AM - 5:00 PM\n• Saturday: 8:00 AM - 2:00 PM\n• Sunday: CLOSED\n\nSee you Monday through Saturday! 🛍️`;
    }
    
    case 'OPENING_TIME': {
      const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      return `🕐 **Opening Times:**\n\n📅 **Monday-Friday:** 8:00 AM\n📅 **Saturday:** 8:00 AM\n📅 **Sunday:** CLOSED\n\n✨ **Today (${currentDay}):** ${currentDay === 'Sunday' ? 'CLOSED' : '8:00 AM'}\n\nWe open early to serve you better!`;
    }
    
    case 'CLOSING_TIME': {
      const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const closingTime = currentDay === 'Saturday' ? '2:00 PM' : currentDay === 'Sunday' ? 'CLOSED' : '5:00 PM';
      return `🕕 **Closing Times:**\n\n📅 **Monday-Friday:** 5:00 PM\n📅 **Saturday:** 2:00 PM\n📅 **Sunday:** CLOSED\n\n✨ **Today (${currentDay}):** ${closingTime}`;
    }
    
    case 'STORE_HOURS': {
      const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const todayHours = currentDay === 'Sunday' ? 'CLOSED' : currentDay === 'Saturday' ? '8:00 AM - 2:00 PM' : '8:00 AM - 5:00 PM';
      return `🕐 **Cell World Store Hours:**\n\n📅 **Monday-Friday:** 8:00 AM - 5:00 PM\n📅 **Saturday:** 8:00 AM - 2:00 PM\n📅 **Sunday:** CLOSED ❌\n\n✨ **Today (${currentDay}):** ${todayHours}`;
    }
    
    // ========== SERVICES ==========
    case 'SERVICES': {
      return `🔧 **Cell World Services:**\n\n📱 **Unlocking Services:**\n• ✅ Google Unlock (FRP removal)\n• ✅ Network Unlock (any carrier)\n\n🛠️ **Repair Services:**\n• ✅ Phone repairs\n• ✅ Screen replacement\n• ✅ Battery replacement\n\n🛡️ **Protection Services:**\n• ✅ Screen protector installation (FREE with purchase)\n• ✅ Bring your own protector - $5 installation\n\nBring your device for a FREE assessment!`;
    }
    
    // ========== CONTACT/LOCATION ==========
    case 'CONTACT': {
      return `📞 **Contact Cell World:**\n\n📧 **Email:** info@cellworldsvg.com\n📍 **Location:** St. Vincent and the Grenadines\n\n🕐 **Store Hours:**\n• Monday-Friday: 8:00 AM - 5:00 PM\n• Saturday: 8:00 AM - 2:00 PM\n• Sunday: CLOSED\n\nVisit us in-store or email us anytime!`;
    }
    
    // ========== AVAILABILITY CHECKS ==========
    case 'HAVE_CHARGERS': {
      return `✅ **Yes! Chargers in stock:**\n\n**Original Chargers:**\n• Samsung: $75 - $200\n• Apple/iPhone: $75 - $130\n\n**Generic Options:**\n• Cables: $40\n• Charging bricks: $60\n\nWhich brand do you need?`;
    }
    
    case 'HAVE_PHONES': {
      const phoneCount = getCheapestProducts('phones', 100).length;
      return `✅ **Yes! We sell phones!**\n\n📱 **${phoneCount}+ models available**\n🔓 **All factory unlocked**\n💰 **Prices from $120 - $4,999**\n\n**Brands:** Samsung, Motorola, Nokia, Blu, Logic & more!\n\nLooking for something specific? Tell me your budget!`;
    }
    
    case 'HAVE_PROTECTORS': {
      return `✅ **Yes! Screen protectors in stock:**\n\n🛡️ **Clear Protection:** $40\n• Hydro-gel or Tempered glass\n\n🔒 **Privacy Protection:** $50\n• Hydro-gel or Tempered glass\n\n✨ **FREE installation** with purchase!\n💡 Bring your own? Just $5 to install.\n\nWhich type would you prefer?`;
    }
    
    case 'HAVE_MARINE': {
      return `✅ **Yes! Fishing & boat supplies available:**\n\n🎣 **Fishing Gear:**\n• Hooks, lures, reels\n• Prices from $6\n\n🚤 **Boat Parts:**\n• Engine parts, gaskets, fuel systems\n• Electrical & navigation\n\n⚓ **Anchoring:**\n• Anchors from $120\n\nWhat are you looking for?`;
    }
    
    case 'HAVE_SPEAKERS': {
      const speakerCount = getProductsByBrand('JBL').length + getProductsByBrand('RCA').length + getProductsByBrand('SkullCandy').length;
      return `✅ **Yes! Speakers in stock:**\n\n🔊 **${speakerCount}+ speakers available!**\n\n**Brands:**\n• JBL (GO, Flip, Charge, Boombox, Xtreme)\n• SkullCandy (Barrel, Terrain, Kilo)\n• RCA (Party speakers with lights)\n\n💰 **Prices from $160 - $999**\n\nWant to see a specific brand?`;
    }
    
    case 'AVAILABILITY_GENERAL': {
      return `🛍️ **We carry:**\n\n📱 Phones & Tablets\n🔌 Chargers & Cables\n🛡️ Screen Protectors\n🔊 Speakers & Audio\n🎮 Gaming Controllers\n⌚ Smartwatches\n🎣 Fishing Gear\n🚤 Boat Parts\n\nWhat are you looking for?`;
    }
    
    // ========== BEST CAMERA ==========
    case 'BEST_CAMERA': {
      const flagships = getProductsByBrand('Samsung')
        .filter(p => p.category === 'phones' && p.tags.includes('flagship'))
        .sort((a, b) => b.price - a.price)
        .slice(0, 3);
      
      let response = `📸 **Best Camera Phones:**\n\n`;
      flagships.forEach((phone, index) => {
        const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";
        response += `${medal} **${phone.name}** - $${phone.price}\n`;
      });
      response += `\n💡 The flagship Samsung S24 series has the best cameras in our store!\n\nWant to test the camera in-store?`;
      return response;
    }
    
    // ========== GREETINGS & THANKS ==========
    case 'GREETING': {
      const greetings = [
        "Hey there! 👋 Welcome to Cell World! What can I help you find today?",
        "Hello! 😊 I'm Celly! Looking for phones, speakers, or marine gear?",
        "Hi! Ready to find your perfect phone? Or maybe some fishing equipment?",
        "Welcome! 🌟 How can I help you today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    case 'THANKS': {
      const thanks = [
        "You're welcome! 😊 Anything else I can help with?",
        "Happy to help! Need anything else?",
        "No problem! Don't hesitate to ask more questions!"
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }
    
    // ========== MORE PRODUCT AVAILABILITY ==========
    case 'HAVE_CASES': {
      const cases = searchProducts('cases');
      return `✅ **Yes! Phone cases in stock:**\n\n📱 **Available:**\n• i-Like MagSafe Cases for iPhone - $50\n• i-Like Cases for Samsung - $40\n\n✨ **Features:**\n• MagSafe compatible\n• Drop protection\n• Multiple colors\n\n**Compatible with:** iPhone 11-16, Samsung S24/S25 series\n\nWhich phone do you need a case for?`;
    }
    
    case 'HAVE_POWERBANKS': {
      const powerbanks = searchProducts('powerbank').slice(0, 5);
      let response = `✅ **Yes! Power banks in stock:**\n\n🔋 **Options:**\n`;
      powerbanks.forEach(pb => {
        response += `• **${pb.name}** - $${pb.price}\n`;
      });
      response += `\n💡 Capacities from 2,600mAh to 20,000mAh!\n\nHow much battery capacity do you need?`;
      return response;
    }
    
    case 'HAVE_EARBUDS': {
      const earbuds = searchProducts('earbuds').slice(0, 5);
      let response = `✅ **Yes! Earbuds & headphones in stock:**\n\n🎧 **Options:**\n`;
      earbuds.forEach(eb => {
        const status = eb.availability === 'More Coming Soon' ? '📦 Coming Soon' : '✅';
        response += `• **${eb.name}** - $${eb.price} ${status}\n`;
      });
      response += `\n**Brands:** Apple, JBL, HyperGear, Yesido\n\nLooking for wired or wireless?`;
      return response;
    }
    
    case 'HAVE_WATCHES': {
      return `✅ **Yes! Regular and Smartwatches available:**\n\n⌚ **Samsung Galaxy Watch 7** - $1,100\n• Bluetooth, Wi-Fi & GPS\n• Android 11.0+ compatible\n\n💡 Perfect for fitness tracking, notifications & more!\n\nWant to see it in store?`;
    }
    
    case 'HAVE_GAMING': {
      const gaming = searchProducts('gaming').filter(p => p.subcategory === 'gaming').slice(0, 5);
      let response = `✅ **Yes! Gaming gear in stock:**\n\n🎮 **Controllers:**\n`;
      gaming.forEach(g => {
        response += `• **${g.name}** - $${g.price}\n`;
      });
      response += `\n**Brands:** Sony PlayStation, Xbox, SteelSeries, Razer\n\nWhich console do you have?`;
      return response;
    }
    
    case 'HAVE_MICROPHONES': {
      const mics = searchProducts('microphone').slice(0, 5);
      let response = `✅ **Yes! Microphones in stock:**\n\n🎤 **Options:**\n`;
      mics.forEach(m => {
        response += `• **${m.name}** - $${m.price}\n`;
      });
      response += `\n**Types:** Condenser, Lavalier, Wireless, Dynamic\n\nWhat will you use it for? (Streaming, recording, karaoke?)`;
      return response;
    }
    
    case 'HAVE_CABLES': {
      return `✅ **Yes! Cables in stock:**\n\n🔌 **Original Cables:**\n• Apple Lightning/USB-C: $75-$80\n• Samsung Type-C: $75\n\n💡 **Generic Cables:** $40\n\n**Types available:**\n• Lightning to USB\n• USB-C to USB-C\n• Micro USB\n• Type-C to Lightning\n\nWhich type do you need?`;
    }
    
    case 'PRICE_INQUIRY': {
      // Try to find the product they're asking about
      const searchResults = searchProducts(lowerInput.replace(/how much|price|cost|is|the|of|a|an/g, '').trim());
      
      if (searchResults.length > 0) {
        const product = searchResults[0];
        return `💰 **${product.name}**\n\n📱 Price: **$${product.price}**\n${product.availability ? `✅ ${product.availability}` : '✅ In Stock'}\n\nWant more details or ready to purchase?`;
      }
      return `🤔 Which product would you like the price for?\n\nTry asking:\n• "How much is Samsung A15?"\n• "Price of JBL Flip 6"\n• "What does the AirTag cost?"`;
    }
    
    case 'UNLOCKED_INFO': {
      return `🔓 **All Our Phones Are Factory Unlocked!**\n\n✅ Works with ANY carrier\n✅ Use any SIM card\n✅ No restrictions\n✅ International compatible\n✅ Switch carriers anytime\n\n💡 Freedom to choose your network!\n\nEvery phone we sell comes unlocked - guaranteed!`;
    }
    
    case 'DELIVERY_INFO': {
      return `🚚 **Delivery Information:**\n\n📍 We're located in **St. Vincent**\n\n✅ In-store pickup available\n✅ Local delivery options\n\n📞 Contact us for delivery arrangements:\n📧 info@cellworldsvg.com\n\nVisit us or call for details!`;
    }

    case 'HAVE_HEADPHONES': {
      const headphones = searchProducts('headphone').slice(0, 5);
      let response = `✅ **Yes! Headphones in stock:**\n\n🎧 **Options:**\n`;
      headphones.forEach(hp => {
        const status = hp.availability === 'More Coming Soon' ? '📦 Coming Soon' : '✅';
        response += `• **${hp.name}** - $${hp.price} ${status}\n`;
      });
      response += `\n**Brands:** JBL, HyperGear, SkullCandy\n\nWired or wireless preference?`;
      return response;
    }
    
    case 'HAVE_WATCHES': {
      const watches = searchProducts('watch').slice(0, 5);
      let response = `✅ **Yes! Watches in stock:**\n\n⌚ **Options:**\n`;
      watches.forEach(w => {
        response += `• **${w.name}** - $${w.price}\n`;
      });
      response += `\nLooking for smartwatch or regular watch?`;
      return response;
    }

    // ========== FALLBACK ==========
    default: {
      // Try to find products matching the query
      const searchResults = searchProducts(lowerInput);
      
      if (searchResults.length > 0) {
        let response = `🔍 **Found ${searchResults.length} result(s):**\n\n`;
        searchResults.slice(0, 5).forEach(product => {
          response += `• **${product.name}** - $${product.price}\n`;
        });
        if (searchResults.length > 5) {
          response += `\n...and ${searchResults.length - 5} more!\n`;
        }
        response += `\nWant details on any of these?`;
        return response;
      }
      
      return `🤖 **I'm Celly, your Cell World assistant!**\n\nI can help you with:\n\n📱 **Phones** - "Show me cheap phones" or "Samsung phones"\n🔊 **Speakers** - "JBL speakers" or "What speakers do you have?"\n🔧 **Services** - "Do you do repairs?" or "Unlock services"\n📍 **Store Info** - "What are your hours?" or "Are you open Sunday?"\n🎣 **Marine** - "Fishing gear" or "Boat parts"\n\nWhat would you like to know? 😊`;
    }
  }
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

  // Auto-open the chat window once per browser session, shortly after the bubble appears
  useEffect(() => {
    if (sessionStorage.getItem('cellyAutoOpened')) return;
    const t = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('cellyAutoOpened', '1');
    }, 2500);
    return () => clearTimeout(t);
  }, []);

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
          text: getCellyReply(inputMessage),
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

      {/* Chat Window - Mobile Responsive */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 left-0 md:bottom-4 md:right-4 md:left-auto w-full md:w-96 h-[600px] md:h-[500px] bg-white md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slideUp">
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
                <p className="text-xs text-white/80 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 shrink-0" aria-hidden="true"></span>
                  Online • Cell World Expert
                </p>
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
                      <p className="text-sm whitespace-pre-line">{message.text.replace('[[CONTACT]]', '').trim()}</p>
                      {message.isBot && message.text.includes('[[CONTACT]]') && (
                        <div className="flex gap-2 mt-3">
                          
                          <a href="tel:+17844512261" className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors">Call</a>
                        </div>
                      )}
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
            <p className="text-xs text-gray-400 text-center mt-2 flex items-center justify-center gap-1.5">
              Powered by Cell World AI
              <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
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