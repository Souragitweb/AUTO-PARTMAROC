import React from 'react';
import { Search, ShoppingCart, User, Menu, Phone, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

export default function Header() {
  const { totalItems } = useCart();
  const { settings } = useSettings();
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={14} /> {settings.phone}</span>
            <span className="hidden md:inline">Support client 7j/7</span>
          </div>
          <div className="flex gap-4 items-center">
            <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
              <Globe size={14} />
              Maroc (FR)
              <ChevronDown size={12} />
            </button>
            <Link to="/blog" className="hover:text-blue-400 transition-colors">Blog & Conseils</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4 md:gap-8">
        <Link to="/" className="flex-shrink-0 flex items-center gap-3">
          {settings.logoUrl && (
            <img 
              src={settings.logoUrl} 
              alt="Logo" 
              className="h-10 w-auto object-contain" 
              referrerPolicy="no-referrer"
            />
          )}
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 flex items-center">
            AUTO-PART<span className="text-brand-red">MAROC</span>
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <Link to="/login" className="flex flex-col items-center text-slate-600 hover:text-brand-red transition-colors">
            <User size={24} />
            <span className="text-[10px] font-bold uppercase hidden md:block">Compte</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-slate-600 hover:text-brand-red transition-colors relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="text-[10px] font-bold uppercase hidden md:block">Panier</span>
          </Link>
          <button className="md:hidden text-slate-600">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-slate-50 border-t border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-8 text-sm font-semibold text-slate-700">
            <li className="py-3 border-b-2 border-transparent hover:border-brand-red hover:text-brand-red transition-all cursor-pointer">
              <Link to="/">ACCUEIL</Link>
            </li>
            <li className="py-3 border-b-2 border-transparent hover:border-brand-red hover:text-brand-red transition-all cursor-pointer">
              <Link to="/catalog">PRODUITS</Link>
            </li>
            <li className="py-3 border-b-2 border-transparent hover:border-brand-red hover:text-brand-red transition-all cursor-pointer">
              <Link to="/contact">CONTACTEZ-NOUS</Link>
            </li>
            <li className="py-3 border-b-2 border-transparent hover:border-brand-red hover:text-brand-red transition-all cursor-pointer">
              <Link to="/blog">BLOG</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
