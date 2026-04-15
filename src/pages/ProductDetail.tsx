import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, RotateCcw, ShoppingCart, Star, CheckCircle2, ChevronLeft, Wrench } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

export default function ProductDetail() {
  const { products } = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
        <button onClick={() => navigate('/')} className="text-brand-red font-bold">Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors"
      >
        <ChevronLeft size={20} /> Retour
      </button>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:border-brand-red transition-all">
                <img 
                  src={`https://picsum.photos/seed/${product.id}-${i}/200/200`} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-brand-red/10 text-brand-red text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-brand-green font-bold">
                <Star size={16} fill="currentColor" />
                {product.rating}
                <span className="text-slate-400 font-normal text-sm">({product.reviewsCount} avis)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-slate-500 font-mono text-sm mb-6">Référence: {product.reference}</p>
            
            <div className="flex items-end gap-4 mb-8">
              <div className="text-4xl font-black text-slate-900">{product.price.toLocaleString()} MAD</div>
              {product.originalPrice && (
                <div className="text-xl text-slate-400 line-through mb-1">{product.originalPrice.toLocaleString()} MAD</div>
              )}
            </div>

            <div className="flex gap-4 mb-10">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-red/20 active:scale-95"
              >
                <ShoppingCart size={24} />
                AJOUTER AU PANIER
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-8 border-y border-slate-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="text-brand-red" size={24} />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Livraison Express</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="text-green-600" size={24} />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Garantie 1 an</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="text-brand-green" size={24} />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Retour 14j</span>
              </div>
            </div>
          </div>

          {/* Compatibility */}
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100 mb-8">
            <h3 className="font-bold text-green-900 flex items-center gap-2 mb-4">
              <CheckCircle2 size={20} /> VÉRIFIER LA COMPATIBILITÉ
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {product.compatibility.map(car => (
                <li key={car} className="text-sm text-green-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  {car}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      <section className="mt-20">
        <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-wider">CARACTÉRISTIQUES TECHNIQUES</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="py-4 px-6 font-bold text-slate-500 w-1/2">{key}</td>
                    <td className="py-4 px-6 text-slate-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-900 text-white p-10 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Besoin d'aide pour le montage ?</h3>
              <p className="text-slate-400 mb-8">Consultez nos tutoriels vidéo ou contactez notre support technique gratuit.</p>
              <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-brand-green hover:text-white transition-all">
                VOIR LE TUTORIEL
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Wrench size={200} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
