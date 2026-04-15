import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldAlert, LogIn } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Autopartmaroc' && password === 'admin') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } catch (err: any) {
      console.error("Google Login Error:", err);
      setError('Erreur lors de la connexion avec Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 px-4">
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">CONNEXION ADMIN</h1>
          <p className="text-slate-500 text-sm">Accès réservé à l'administration</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 flex items-center gap-2">
            <ShieldAlert size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Identifiant</label>
            <div className="relative">
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:ring-2 focus:ring-brand-red outline-none transition-all"
                placeholder="Nom d'utilisateur"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mot de passe</label>
            <div className="relative">
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:ring-2 focus:ring-brand-red outline-none transition-all"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-brand-red/20"
          >
            SE CONNECTER
          </button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-bold">Ou continuer avec</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex flex-col items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-2xl transition-all"
        >
          <div className="flex items-center gap-3">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            {loading ? 'Connexion...' : 'Se connecter avec Google'}
          </div>
          <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">Requis pour modifier la base de données</span>
        </button>
      </div>
    </div>
  );
}
