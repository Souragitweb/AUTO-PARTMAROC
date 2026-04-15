import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';
import { Trash2, Edit, Plus, Package, Search, LogOut, X, Save, Image as ImageIcon, Upload, Settings as SettingsIcon, Facebook, Instagram, Linkedin, Phone, Mail, MapPin, MessageSquare, ShieldAlert } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';
import { useSettings } from '../context/SettingsContext';

import { auth } from '../firebase';

export default function Admin() {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, seedDatabase } = useProducts();
  const { settings, updateSettings, loading: settingsLoading } = useSettings();
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsForm, setSettingsForm] = useState(settings);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSettingsForm({ ...settingsForm, logoUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!settingsLoading) {
      setSettingsForm(settings);
    }
  }, [settings, settingsLoading]);

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('Vous devez être connecté avec Google pour modifier les paramètres de la base de données.');
      return;
    }
    
    setIsSavingSettings(true);
    try {
      await updateSettings(settingsForm);
      alert('Paramètres enregistrés avec succès !');
    } catch (error: any) {
      console.error("Error in handleSettingsSave:", error);
      let message = 'Erreur lors de l\'enregistrement des paramètres.';
      try {
        const errInfo = JSON.parse(error.message);
        if (errInfo.error.includes('Missing or insufficient permissions')) {
          message = 'Vous n\'avez pas les permissions nécessaires pour modifier les paramètres. Assurez-vous d\'être connecté avec un compte administrateur.';
        }
      } catch (e) {
        // Not a JSON error
      }
      alert(message);
    } finally {
      setIsSavingSettings(false);
    }
  };
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: '',
    model: '',
    year: '',
    reference: '',
    price: 0,
    category: 'freinage',
    image: 'https://picsum.photos/seed/newpart/400/400',
    rating: 5,
    reviewsCount: 0,
    compatibility: [],
    specs: {}
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/');
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct({ ...editingProduct, ...newProduct } as Product);
      } else {
        // Add new product
        const productToAdd = {
          ...newProduct,
          compatibility: (newProduct.compatibility as string[]) || [],
        } as Omit<Product, 'id'>;
        await addProduct(productToAdd);
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      setNewProduct({
        name: '',
        brand: '',
        model: '',
        year: '',
        reference: '',
        price: 0,
        category: 'freinage',
        image: 'https://picsum.photos/seed/newpart/400/400',
        rating: 5,
        reviewsCount: 0,
        compatibility: [],
        specs: {}
      });
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Erreur lors de l'enregistrement du produit. Vérifiez vos permissions.");
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      brand: product.brand,
      model: product.model || '',
      year: product.year || '',
      reference: product.reference,
      price: product.price,
      category: product.category,
      image: product.image,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      compatibility: product.compatibility,
      specs: product.specs
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setNewProduct({
      name: '',
      brand: '',
      model: '',
      year: '',
      reference: '',
      price: 0,
      category: 'freinage',
      image: 'https://picsum.photos/seed/newpart/400/400',
      rating: 5,
      reviewsCount: 0,
      compatibility: [],
      specs: {}
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            {activeTab === 'products' ? (
              <>
                <Package className="text-brand-red" size={32} />
                GESTION DU CATALOGUE
              </>
            ) : (
              <>
                <SettingsIcon className="text-brand-red" size={32} />
                PARAMÈTRES DU SITE
              </>
            )}
          </h1>
          <p className="text-slate-500">
            {activeTab === 'products' 
              ? `Gérez vos ${products.length} produits référencés` 
              : 'Configurez les informations de contact et réseaux sociaux'}
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleLogout}
            className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={20} /> DÉCONNEXION
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-slate-100">
        <button 
          onClick={() => setActiveTab('products')}
          className={`pb-4 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'products' ? 'border-brand-red text-brand-red' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          PRODUITS
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`pb-4 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'settings' ? 'border-brand-red text-brand-red' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          PARAMÈTRES
        </button>
      </div>

      {activeTab === 'products' ? (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Rechercher un produit par nom ou référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:ring-2 focus:ring-brand-red outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
            <div className="flex gap-4">
              {products.length === 0 && (
                <button 
                  onClick={seedDatabase}
                  className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
                >
                  <Plus size={20} /> INITIALISER LA BASE
                </button>
              )}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-red/90 transition-all"
              >
                <Plus size={20} /> AJOUTER UN PRODUIT
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Total Produits</div>
          <div className="text-3xl font-black text-slate-900">{products.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Catégories</div>
          <div className="text-3xl font-black text-slate-900">{CATEGORIES.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Marques</div>
          <div className="text-3xl font-black text-slate-900">6</div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Rechercher par nom ou référence..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <th className="py-4 px-6">Produit</th>
                <th className="py-4 px-6">Référence</th>
                <th className="py-4 px-6">Marque</th>
                <th className="py-4 px-6">Prix (MAD)</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <div className="font-bold text-slate-900 text-sm">{product.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500 font-mono">{product.reference}</td>
                  <td className="py-4 px-6">
                    <span className="bg-brand-red/10 text-brand-red text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      {product.brand}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-black text-slate-900">{product.price.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="p-2 text-slate-400 hover:text-brand-red transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 max-w-4xl">
          <form onSubmit={handleSettingsSave} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Phone className="text-brand-red" size={20} />
                  COORDONNÉES
                </h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Numéro WhatsApp</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({...settingsForm, whatsapp: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none"
                      placeholder="Ex: 212600000000"
                    />
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
                  <p className="text-[10px] text-slate-400">Format international sans le + (ex: 212600000000)</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Téléphone Fixe</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none"
                      placeholder="Ex: +212 (0) 5 22 45 67 89"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email de contact</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none"
                      placeholder="Ex: contact@autopart.ma"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Adresse</label>
                  <div className="relative">
                    <textarea 
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none resize-none"
                      rows={2}
                      placeholder="Ex: Zone Industrielle Salmia 2, La Ferraille, Casablanca, Maroc"
                    />
                    <MapPin className="absolute left-3 top-4 text-slate-400" size={18} />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Facebook className="text-brand-red" size={20} />
                  RÉSEAUX SOCIAUX
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lien Facebook</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={settingsForm.facebook}
                      onChange={(e) => setSettingsForm({...settingsForm, facebook: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none"
                      placeholder="https://facebook.com/..."
                    />
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lien Instagram</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={settingsForm.instagram}
                      onChange={(e) => setSettingsForm({...settingsForm, instagram: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none"
                      placeholder="https://instagram.com/..."
                    />
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lien LinkedIn</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={settingsForm.linkedin}
                      onChange={(e) => setSettingsForm({...settingsForm, linkedin: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none"
                      placeholder="https://linkedin.com/in/..."
                    />
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
                </div>
              </div>

              {/* Visual Identity */}
              <div className="space-y-6 md:col-span-2 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="text-brand-red" size={20} />
                  IDENTITÉ VISUELLE
                </h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logo du site</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          value={settingsForm.logoUrl}
                          onChange={(e) => setSettingsForm({...settingsForm, logoUrl: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none text-sm"
                          placeholder="URL du logo ou importez un fichier"
                        />
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleLogoFileChange}
                          id="logo-upload"
                          className="hidden"
                        />
                        <label 
                          htmlFor="logo-upload"
                          className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl cursor-pointer transition-all border-2 border-dashed border-slate-300"
                        >
                          <Upload size={18} />
                          IMPORTER DEPUIS L'ORDINATEUR
                        </label>
                      </div>
                    </div>
                    
                    {settingsForm.logoUrl && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Aperçu du logo</p>
                        <img src={settingsForm.logoUrl} alt="Site Logo Preview" className="h-16 w-auto object-contain" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <button 
                type="submit"
                disabled={isSavingSettings || settingsLoading}
                className="bg-brand-red text-white font-black py-4 px-12 rounded-2xl hover:bg-brand-red/90 transition-all flex items-center gap-2 shadow-xl shadow-brand-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingSettings ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ENREGISTREMENT...
                  </>
                ) : (
                  <>
                    <Save size={20} /> ENREGISTRER LES PARAMÈTRES
                  </>
                )}
              </button>
              {!auth.currentUser && (
                <p className="mt-4 text-sm text-red-500 font-bold flex items-center gap-2">
                  <ShieldAlert size={16} />
                  Attention : Vous n'êtes pas connecté avec Google. Les modifications ne seront pas enregistrées dans la base de données.
                </p>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                {editingProduct ? <Edit className="text-brand-red" /> : <Plus className="text-brand-red" />}
                {editingProduct ? 'MODIFIER LE PRODUIT' : 'NOUVEAU PRODUIT'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-900 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nom du produit</label>
                  <input 
                    type="text" 
                    required 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-red outline-none"
                    placeholder="Ex: Disques de frein"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Marque</label>
                  <input 
                    type="text" 
                    required 
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-red outline-none"
                    placeholder="Ex: Bosch"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modèle</label>
                  <input 
                    type="text" 
                    value={newProduct.model}
                    onChange={(e) => setNewProduct({...newProduct, model: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-red outline-none"
                    placeholder="Ex: Golf 7"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Année</label>
                  <input 
                    type="text" 
                    value={newProduct.year}
                    onChange={(e) => setNewProduct({...newProduct, year: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-red outline-none"
                    placeholder="Ex: 2012-2020"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Référence</label>
                  <input 
                    type="text" 
                    required 
                    value={newProduct.reference}
                    onChange={(e) => setNewProduct({...newProduct, reference: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-red outline-none"
                    placeholder="Ex: B-12345"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prix (MAD)</label>
                  <input 
                    type="number" 
                    required 
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-red outline-none"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Catégorie</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-red outline-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Image du produit</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-10 focus:ring-2 focus:ring-brand-red outline-none text-sm"
                          placeholder="URL de l'image"
                        />
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          id="file-upload"
                          className="hidden"
                        />
                        <label 
                          htmlFor="file-upload"
                          className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl cursor-pointer transition-all border-2 border-dashed border-slate-300"
                        >
                          <Upload size={18} />
                          IMPORTER DEPUIS L'ORDINATEUR
                        </label>
                      </div>
                    </div>
                    <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center relative group">
                      {newProduct.image ? (
                        <img 
                          src={newProduct.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-slate-300 flex flex-col items-center gap-2">
                          <ImageIcon size={48} />
                          <span className="text-xs font-bold uppercase">Aperçu</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex gap-4">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
                >
                  ANNULER
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-brand-red text-white font-black py-4 rounded-2xl hover:bg-brand-red/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-red/20"
                >
                  <Save size={20} /> {editingProduct ? 'METTRE À JOUR' : 'ENREGISTRER'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">SUPPRIMER LE PRODUIT ?</h2>
            <p className="text-slate-500 mb-8">
              Cette action est irréversible. Êtes-vous sûr de vouloir retirer ce produit du catalogue ?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
              >
                ANNULER
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-200"
              >
                SUPPRIMER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
