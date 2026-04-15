import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CATEGORIES, PART_BRANDS } from '../data';
import { motion } from 'motion/react';
import { Filter, ChevronDown, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const { products, loading } = useProducts();
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const [filters, setFilters] = useState({
    brand: searchParams.get('brand') || '',
    priceRange: [0, 50000],
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (categorySlug && p.category !== categorySlug) return false;
      if (filters.brand && p.brand !== filters.brand) return false;
      return p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
    });
  }, [products, categorySlug, filters]);

  const brands = useMemo(() => {
    const uniqueBrands = new Set<string>();
    products.forEach(p => {
      if (p.brand) uniqueBrands.add(p.brand);
    });
    return Array.from(uniqueBrands).sort();
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  const currentCategory = CATEGORIES.find(c => c.slug === categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Filter size={20} /> FILTRES
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 block">Marque</label>
                  <select 
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  >
                    <option value="">Toutes les marques</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 block">Prix Max (MAD)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="50000" 
                    step="500"
                    className="w-full accent-brand-red"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                    <span>0 MAD</span>
                    <span>{filters.priceRange[1].toLocaleString()} MAD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-red/10 p-6 rounded-2xl border border-brand-red/20">
              <h4 className="font-bold text-brand-red mb-2">Besoin d'aide ?</h4>
              <p className="text-sm text-brand-red/80 mb-4">Nos experts sont là pour vous conseiller sur la compatibilité.</p>
              <button className="w-full bg-brand-red text-white py-2 rounded-lg font-bold text-sm">
                Chatter avec un expert
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-black text-slate-900 uppercase">
              {currentCategory ? currentCategory.name : 'Toutes les pièces'}
              <span className="ml-3 text-sm font-normal text-slate-400 normal-case">
                ({filteredProducts.length} articles trouvés)
              </span>
            </h1>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              Trier par: 
              <button className="flex items-center gap-1 text-slate-900">
                Pertinence <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50 rounded-t-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-brand-red uppercase tracking-wider">{product.brand}</span>
                    <div className="flex items-center gap-1 text-brand-green text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      {product.rating}
                    </div>
                  </div>
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 hover:text-brand-red transition-colors">{product.name}</h3>
                  </Link>
                  <div className="text-xs text-slate-400 mb-4">Réf: {product.reference}</div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-xl font-black text-slate-900">{product.price.toLocaleString()} MAD</div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-brand-red hover:bg-brand-red/90 text-white p-3 rounded-xl transition-colors shadow-lg shadow-brand-red/20"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">Aucun produit ne correspond à vos critères.</p>
              <button 
                onClick={() => setFilters({ brand: '', priceRange: [0, 50000] })}
                className="mt-4 text-brand-red font-bold hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
