import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">COMMANDE CONFIRMÉE !</h2>
        <p className="text-slate-500 mb-8">Merci pour votre confiance. Vous allez recevoir un email de confirmation avec les détails de votre livraison.</p>
        <p className="text-sm text-slate-400">Redirection vers l'accueil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-12 uppercase tracking-tight">FINALISER MA COMMANDE</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
        {/* Shipping & Payment */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Truck className="text-brand-red" size={24} /> 1. INFORMATIONS DE LIVRAISON
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Prénom" required className="p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-red" />
              <input type="text" placeholder="Nom" required className="p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-red" />
              <input type="email" placeholder="Email" required className="p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-red md:col-span-2" />
              <input type="tel" placeholder="Téléphone" required className="p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-red md:col-span-2" />
              <input type="text" placeholder="Adresse" required className="p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-red md:col-span-2" />
              <select className="p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-red">
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marrakech">Marrakech</option>
                <option value="tanger">Tanger</option>
                <option value="agadir">Agadir</option>
                <option value="fes">Fès</option>
              </select>
              <input type="text" placeholder="Code Postal" className="p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-red" />
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="text-brand-red" size={24} /> 2. MODE DE PAIEMENT
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-brand-red bg-brand-red/5 cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-brand-red" />
                <div className="flex-1">
                  <div className="font-bold text-slate-900">Paiement à la livraison (Cash)</div>
                  <div className="text-xs text-slate-500">Payez en espèces lors de la réception de votre colis.</div>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-brand-red/30 cursor-pointer transition-all">
                <input type="radio" name="payment" className="w-5 h-5 accent-brand-red" />
                <div className="flex-1">
                  <div className="font-bold text-slate-900">Carte Bancaire (CMI)</div>
                  <div className="text-xs text-slate-500">Paiement en ligne sécurisé via le Centre Monétique Interbancaire.</div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 p-8 rounded-3xl sticky top-32 border border-slate-200">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">VOTRE COMMANDE</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600">
                <span>Total articles</span>
                <span className="font-bold">{totalPrice.toLocaleString()} MAD</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Frais de port</span>
                <span className="text-green-600 font-bold uppercase">Gratuit</span>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                <span className="font-bold text-slate-900">À PAYER</span>
                <span className="text-3xl font-black text-brand-red">{totalPrice.toLocaleString()} MAD</span>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-green hover:bg-brand-green/90 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand-green/20"
            >
              CONFIRMER L'ACHAT
              <ChevronRight size={20} />
            </button>
            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs">
              <ShieldCheck size={16} />
              Paiement 100% sécurisé
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
