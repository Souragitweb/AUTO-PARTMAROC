import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { settings } = useSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">MESSAGE ENVOYÉ !</h2>
        <p className="text-slate-500 mb-8">Merci de nous avoir contactés. Notre équipe d'experts vous répondra dans les plus brefs délais (généralement sous 24h).</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-brand-red text-white px-10 py-4 rounded-2xl font-black hover:bg-brand-red/90 transition-all inline-block"
        >
          ENVOYER UN AUTRE MESSAGE
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">CONTACTEZ-NOUS</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Une question technique ? Besoin d'aide pour trouver une pièce ? Notre équipe d'experts est à votre disposition.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mb-6">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Téléphone</h3>
            <p className="text-slate-500 text-sm mb-4">Appelez-nous pour un conseil immédiat.</p>
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-brand-red font-black text-lg hover:underline">{settings.phone}</a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp</h3>
            <p className="text-slate-500 text-sm mb-4">Chattez en direct avec nos experts.</p>
            <a 
              href={`https://wa.me/${settings.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all w-full"
            >
              <MessageCircle size={20} />
              DISCUTER SUR WHATSAPP
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green mb-6">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
            <p className="text-slate-500 text-sm mb-4">Envoyez-nous vos demandes par écrit.</p>
            <a href={`mailto:${settings.email}`} className="text-brand-red font-black text-lg hover:underline">{settings.email}</a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Horaires</h3>
            <p className="text-slate-500 text-sm">Nous sommes ouverts du :</p>
            <div className="mt-2 space-y-1">
              <p className="text-slate-900 font-bold text-sm">Lundi - Vendredi : 08:30 - 18:30</p>
              <p className="text-slate-900 font-bold text-sm">Samedi : 09:00 - 13:00</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <MessageSquare className="text-brand-green" /> ENVOYEZ UN MESSAGE
              </h2>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nom Complet</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Votre nom"
                    className="w-full bg-slate-800 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-brand-red outline-none transition-all text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="votre@email.com"
                    className="w-full bg-slate-800 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-brand-red outline-none transition-all text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sujet</label>
                  <select className="w-full bg-slate-800 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-brand-red outline-none transition-all text-white appearance-none">
                    <option>Conseil technique / Compatibilité</option>
                    <option>Suivi de commande</option>
                    <option>Retour ou Échange</option>
                    <option>Autre demande</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                  <textarea 
                    required 
                    rows={5}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full bg-slate-800 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-brand-red outline-none transition-all text-white placeholder:text-slate-500 resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-red/20 active:scale-[0.98]"
                  >
                    ENVOYER LE MESSAGE
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
            {/* Decorative element */}
            <div className="absolute -right-20 -bottom-20 opacity-5">
              <Mail size={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
