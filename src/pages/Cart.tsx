import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-400">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">VOTRE PANIER EST VIDE</h2>
        <p className="text-slate-500 mb-8">Il semble que vous n'ayez pas encore ajouté de pièces à votre panier.</p>
        <Link to="/" className="bg-brand-red text-white px-10 py-4 rounded-2xl font-black hover:bg-brand-red/90 transition-all inline-block">
          DÉCOUVRIR LE CATALOGUE
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-12 uppercase tracking-tight flex items-center gap-4">
        MON PANIER
        <span className="text-sm font-normal text-slate-400 normal-case">({totalItems} articles)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-6 items-center"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-xl shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-brand-red uppercase mb-1">{item.brand}</div>
                <h3 className="font-bold text-slate-900 mb-1 truncate">{item.name}</h3>
                <div className="text-xs text-slate-400 mb-4">Réf: {item.reference}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-slate-900">{(item.price * item.quantity).toLocaleString()} MAD</div>
                <div className="text-xs text-slate-400">{item.price.toLocaleString()} MAD / unité</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-32">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">RÉSUMÉ DE LA COMMANDE</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400">
                <span>Sous-total</span>
                <span>{totalPrice.toLocaleString()} MAD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Livraison</span>
                <span className="text-green-400 font-bold uppercase">Gratuite</span>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                <span className="font-bold">TOTAL</span>
                <span className="text-3xl font-black text-brand-green">{totalPrice.toLocaleString()} MAD</span>
              </div>
            </div>
            <Link 
              to="/checkout"
              className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand-red/20"
            >
              PASSER LA COMMANDE
              <ArrowRight size={20} />
            </Link>
            <p className="mt-6 text-[10px] text-slate-500 text-center leading-relaxed">
              En passant commande, vous acceptez nos conditions générales de vente et notre politique de confidentialité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
