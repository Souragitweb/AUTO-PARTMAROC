import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES, PART_BRANDS } from '../data';
import VehicleSelector from '../components/VehicleSelector';
import MapSection from '../components/MapSection';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function Home() {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/carparts/1920/1080?blur=5" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6 leading-tight"
            >
              VOTRE EXPERT PIÈCES <br />
              <span className="text-brand-red">AU MEILLEUR PRIX</span>
            </motion.h2>
            <p className="text-lg text-slate-300 mb-8 max-w-lg">
              Plus de 500 000 pièces détachées pour toutes les marques. Livraison express partout au Maroc.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <ShieldCheck className="text-green-400" size={20} />
                <span className="text-sm font-semibold">Qualité d'origine</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Truck className="text-brand-red" size={20} />
                <span className="text-sm font-semibold">Livraison Express</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <VehicleSelector />
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red">
              <Truck size={24} />
            </div>
            <h4 className="font-bold text-slate-900">Livraison Express</h4>
            <p className="text-xs text-slate-500">Partout au Maroc</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-bold text-slate-900">Paiement Sécurisé</h4>
            <p className="text-xs text-slate-500">CMI, Cartes & Cash</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red">
              <RotateCcw size={24} />
            </div>
            <h4 className="font-bold text-slate-900">Retours Faciles</h4>
            <p className="text-xs text-slate-500">Sous 14 jours</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
              <Headphones size={24} />
            </div>
            <h4 className="font-bold text-slate-900">Support Expert</h4>
            <p className="text-xs text-slate-500">Conseils techniques</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900">CATÉGORIES</h2>
            <p className="text-slate-500">Explorez notre catalogue par univers</p>
          </div>
          <Link to="/catalog" className="text-brand-red font-bold flex items-center gap-1 hover:underline">
            Voir tout <ChevronRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = (Icons as any)[cat.icon];
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/cat/${cat.slug}`)}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  {Icon && <Icon size={32} />}
                </div>
                <span className="text-sm font-bold text-slate-700 text-center">{cat.name}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Brands */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-[0.2em] mb-2">NOS MARQUES PARTENAIRES</h2>
            <div className="w-20 h-1 bg-brand-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PART_BRANDS.map(brand => (
              <motion.div 
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center aspect-[4/3] group transition-all hover:shadow-xl hover:border-brand-red/20"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900">MEILLEURES VENTES</h2>
            <p className="text-slate-500">Les pièces les plus demandées en ce moment</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group"
            >
              <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-slate-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-brand-green text-white text-xs font-black px-3 py-1 rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </Link>
              <div className="p-6">
                <div className="text-xs font-bold text-brand-red mb-2 uppercase tracking-wider">{product.brand}</div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3rem] hover:text-brand-red transition-colors">{product.name}</h3>
                </Link>
                <div className="text-xs text-slate-500 mb-4">Réf: {product.reference}</div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <div className="text-2xl font-black text-slate-900">{product.price.toLocaleString()} MAD</div>
                    {product.originalPrice && (
                      <div className="text-sm text-slate-400 line-through">{product.originalPrice.toLocaleString()} MAD</div>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-brand-red hover:bg-brand-red/90 text-white p-3 rounded-xl transition-colors shadow-lg shadow-brand-red/20"
                  >
                    <Icons.ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </div>
  );
}
