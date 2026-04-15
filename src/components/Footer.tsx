import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Info */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            {settings.logoUrl && (
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="h-8 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            )}
            <h2 className="text-2xl font-black tracking-tighter text-white">
              AUTO-PART<span className="text-brand-red">MAROC</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Votre expert en pièces détachées automobile au Maroc. Plus de 500 000 références disponibles au meilleur prix.
          </p>
          <div className="flex gap-4">
            {settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>}
            {settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>}
            {settings.linkedin && <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-6">Aide & Service</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shipping" className="hover:text-white transition-colors">Livraison & Frais</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Retours & Échanges</Link></li>
            <li><Link to="/payment" className="hover:text-white transition-colors">Modes de paiement</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Foire aux questions</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contactez-nous</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-bold mb-6">Catalogue</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/cat/freinage" className="hover:text-white transition-colors">Système de freinage</Link></li>
            <li><Link to="/cat/moteur" className="hover:text-white transition-colors">Pièces moteur</Link></li>
            <li><Link to="/cat/filtration" className="hover:text-white transition-colors">Filtres</Link></li>
            <li><Link to="/cat/suspension" className="hover:text-white transition-all">Suspension & Amortisseurs</Link></li>
            <li><Link to="/cat/pneus" className="hover:text-white transition-all">Pneus & Jantes</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold mb-6">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-green shrink-0" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-green shrink-0" />
              <span>{settings.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-green shrink-0" />
              <span>{settings.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2026 Auto-Part Maroc. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link to="/terms" className="hover:text-white">CGV</Link>
          <Link to="/privacy" className="hover:text-white">Confidentialité</Link>
          <Link to="/legal" className="hover:text-white">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
}
