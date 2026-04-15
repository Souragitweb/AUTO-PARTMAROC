import React, { useState, useMemo } from 'react';
import { Search, Car, ChevronRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { cn } from '../lib/utils';

export default function VehicleSelector() {
  const { products } = useProducts();
  const [selection, setSelection] = useState({
    brand: '',
    year: '',
    model: '',
    engine: ''
  });

  // Extract unique brands from products
  const brands = useMemo(() => {
    const uniqueBrands = new Set<string>();
    products.forEach(p => {
      if (p.brand) uniqueBrands.add(p.brand);
      p.compatibility.forEach(comp => {
        const brand = comp.split(' ')[0];
        if (brand) uniqueBrands.add(brand);
      });
    });
    return Array.from(uniqueBrands).sort();
  }, [products]);

  // Extract unique years for the selected brand
  const years = useMemo(() => {
    if (!selection.brand) return [];
    const uniqueYears = new Set<string>();
    products.forEach(p => {
      const matchesBrand = p.brand === selection.brand || p.compatibility.some(comp => comp.startsWith(selection.brand));
      if (matchesBrand && p.year) {
        uniqueYears.add(p.year);
      }
    });
    return Array.from(uniqueYears).sort((a, b) => b.localeCompare(a));
  }, [products, selection.brand]);

  // Extract unique models for the selected brand and year
  const models = useMemo(() => {
    if (!selection.brand) return [];
    const uniqueModels = new Set<string>();
    products.forEach(p => {
      const matchesBrand = p.brand === selection.brand || p.compatibility.some(comp => comp.startsWith(selection.brand));
      const matchesYear = !selection.year || p.year === selection.year;
      
      if (matchesBrand && matchesYear) {
        if (p.model) uniqueModels.add(p.model);
        p.compatibility.forEach(comp => {
          if (comp.startsWith(selection.brand)) {
            const model = comp.split(' ').slice(1).join(' ');
            if (model) uniqueModels.add(model);
          }
        });
      }
    });
    return Array.from(uniqueModels).sort();
  }, [products, selection.brand, selection.year]);

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
      <div className="flex border-b">
        <div
          className="flex-1 py-4 text-sm font-semibold bg-brand-red text-white flex items-center justify-center gap-2"
        >
          <Car size={18} />
          Trouver des pièces par véhicule
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red outline-none appearance-none bg-white"
            value={selection.brand}
            onChange={(e) => setSelection({ ...selection, brand: e.target.value, year: '', model: '' })}
          >
            <option value="">1. Marque</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select 
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red outline-none appearance-none bg-white"
            disabled={!selection.brand}
            value={selection.year}
            onChange={(e) => setSelection({ ...selection, year: e.target.value, model: '' })}
          >
            <option value="">2. Année</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
            {/* Fallback if no years found for brand */}
            {years.length === 0 && selection.brand && (
              <>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </>
            )}
          </select>
          <select 
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red outline-none appearance-none bg-white"
            disabled={!selection.brand}
            value={selection.model}
            onChange={(e) => setSelection({ ...selection, model: e.target.value })}
          >
            <option value="">3. Modèle</option>
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          <button className="bg-brand-green hover:bg-brand-green/90 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
            RECHERCHER
            <ChevronRight size={20} />
          </button>
        </div>
        <p className="mt-4 text-xs text-slate-500 text-center">
          Trouvez les pièces compatibles avec votre véhicule en quelques secondes.
        </p>
      </div>
    </div>
  );
}
