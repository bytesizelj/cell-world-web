'use client';

import dynamic from 'next/dynamic';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, Phone, Mail, MapPin, Clock, MessageCircle, Send, Facebook, Instagram, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const translations = {
    en: {
      title: "Get In Touch",
      subtitle: "We're here to help and answer any questions you might have",
      backToHome: "Back to Home",
      contactInfo: "Contact Information",
      visitUs: "Visit Our Store",
      businessHours: "Business Hours",
      sendMessage: "Send us a Message",
      name: "Your Name",
      email: "Your Email",
      phone: "Phone Number",
      message: "Your Message",
      send: "Send Message",
      callNow: "Call Now",
      whatsappChat: "WhatsApp Chat",
      emailUs: "Email Us",
      getDirections: "Get Directions",
      office: "Office",
      mobile: "Mobile",
      address: "Address",
      mondayFriday: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      followUs: "Follow Us",
      quickContact: "Quick Contact",
      ourLocation: "Our Location"
    },
    fr: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous aider et répondre à vos questions",
      backToHome: "Retour à l'Accueil",
      contactInfo: "Informations de Contact",
      visitUs: "Visitez Notre Magasin",
      businessHours: "Heures d'Ouverture",
      sendMessage: "Envoyez-nous un Message",
      name: "Votre Nom",
      email: "Votre Email",
      phone: "Numéro de Téléphone",
      message: "Votre Message",
      send: "Envoyer le Message",
      callNow: "Appeler Maintenant",
      whatsappChat: "Chat WhatsApp",
      emailUs: "Nous Envoyer un Email",
      getDirections: "Obtenir l'Itinéraire",
      office: "Bureau",
      mobile: "Mobile",
      address: "Adresse",
      mondayFriday: "Lundi - Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
      closed: "Fermé",
      followUs: "Suivez-nous",
      quickContact: "Contact Rapide",
      ourLocation: "Notre Emplacement"
    },
    es: {
      title: "Contáctanos",
      subtitle: "Estamos aquí para ayudarte y responder cualquier pregunta",
      backToHome: "Volver al Inicio",
      contactInfo: "Información de Contacto",
      visitUs: "Visita Nuestra Tienda",
      businessHours: "Horario de Atención",
      sendMessage: "Envíanos un Mensaje",
      name: "Tu Nombre",
      email: "Tu Email",
      phone: "Número de Teléfono",
      message: "Tu Mensaje",
      send: "Enviar Mensaje",
      callNow: "Llamar Ahora",
      whatsappChat: "Chat WhatsApp",
      emailUs: "Envíanos un Email",
      getDirections: "Obtener Direcciones",
      office: "Oficina",
      mobile: "Móvil",
      address: "Dirección",
      mondayFriday: "Lunes - Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
      closed: "Cerrado",
      followUs: "Síguenos",
      quickContact: "Contacto Rápido",
      ourLocation: "Nuestra Ubicación"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add actual form submission logic here
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </Link>
          
          <img 
            src="/images/cell-world-logo.png"
            alt="Cell World"
            style={{ 
              height: '80px',
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))'
            }}
          />
        </div>
        
        <button 
          className="group flex items-center space-x-2 text-white bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md px-4 py-2.5 rounded-full hover:from-yellow-600/30 hover:to-orange-600/30 border border-yellow-500/30 transition-all duration-300"
          onClick={() => {
            const langs = ['en', 'fr', 'es'];
            const currentIndex = langs.indexOf(language);
            setLanguage(langs[(currentIndex + 1) % langs.length]);
          }}
        >
          <Globe className="w-5 h-5 text-yellow-400" />
          <span className="text-sm uppercase font-bold text-yellow-400">{language}</span>
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4"
            style={{ 
              color: '#FFD700',
              textShadow: '0 4px 20px rgba(255, 215, 0, 0.4), 0 2px 8px rgba(0,0,0,0.9)' 
            }}>
          {t.title}
        </h1>
        <p className="text-xl text-yellow-400/80" 
           style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          {t.subtitle}
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Quick Contact Card */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t.quickContact}</h2>
            </div>
            
            <div className="space-y-6">
              {/* Office Phone */}
              <a 
                href="tel:+17844512261"
                className="group flex items-center p-4 bg-black/30 rounded-xl hover:bg-yellow-500/10 transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-yellow-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">{t.office}</p>
                  <p className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                    1-784-451-2261
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-yellow-400 transition-colors" />
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/17844310777"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 bg-black/30 rounded-xl hover:bg-green-500/10 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-green-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">{t.mobile} / WhatsApp</p>
                  <p className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                    1-784-431-0777
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-400 transition-colors" />
              </a>

              {/* Email */}
              <a 
                href="mailto:info@cellworldsvg.com"
                className="group flex items-center p-4 bg-black/30 rounded-xl hover:bg-blue-500/10 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">{t.email}</p>
                  <p className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    info@cellworldsvg.com
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-400 transition-colors" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <a 
                href="tel:+17844512261"
                className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-xl text-center hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg"
              >
                <Phone className="inline w-5 h-5 mr-2" />
                {t.callNow}
              </a>
              
              <a 
                href="https://wa.me/17844310777"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl text-center hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="inline w-5 h-5 mr-2" />
                {t.whatsappChat}
              </a>
            </div>
          </div>

          {/* Location & Hours Card */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t.ourLocation}</h2>
            </div>

            {/* Address */}
            <div className="mb-8 p-4 bg-black/30 rounded-xl">
              <p className="text-sm text-gray-400 mb-2">{t.address}</p>
              <p className="text-white font-medium leading-relaxed">
                Opposite Old BOSVG Building<br />
                Halifax Street<br />
                Kingstown, St. Vincent
              </p>
              <a 
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <MapPin className="w-4 h-4 mr-1" />
                {t.getDirections}
              </a>
            </div>

            {/* Business Hours */}
            <div className="p-4 bg-black/30 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                {t.businessHours}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400">{t.mondayFriday}</span>
                  <span className="text-white font-medium">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400">{t.saturday}</span>
                  <span className="text-white font-medium">8:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">{t.sunday}</span>
                  <span className="text-red-400 font-medium">{t.closed}</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <p className="text-sm text-gray-400 mb-4">{t.followUs}</p>
              <div className="flex space-x-3">
                <a 
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t.sendMessage}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={t.name}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder={t.email}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder={t.phone}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              <div>
                <textarea
                  placeholder={t.message}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                <Send className="inline w-5 h-5 mr-2" />
                {t.send}
              </button>
            </form>
          </div>

        </div>

        {/* Map Section - Optional */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl p-8 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {t.visitUs}
          </h2>
          <div className="bg-black/30 rounded-xl p-4 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-white text-lg mb-2">Opposite Old BOSVG Building</p>
              <p className="text-gray-400">Halifax Street, Kingstown</p>
              <a 
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Celly Assistant */}
      <Celly />
    </div>
  );
}