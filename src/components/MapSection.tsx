import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function MapSection() {
  const { settings } = useSettings();
  // Coordinates for Salmia 2, La Ferraille, Casablanca
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13303.88214811822!2d-7.545833!3d33.541667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d46e5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sSalmia%202%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1712850000000!5m2!1sfr!2sma";

  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              <MapPin size={16} /> Notre Siège
            </div>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              RETROUVEZ-NOUS À <br />
              <span className="text-brand-red">NOTRE MAGASIN</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Retrouvez-nous au cœur de la Zone Industrielle Salmia 2, La Ferraille. Notre équipe d'experts est à votre disposition pour vous conseiller.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-slate-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Adresse</h4>
                  <p className="text-slate-500">{settings.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                  <Navigation className="text-slate-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Horaires</h4>
                  <p className="text-slate-500">Lundi - Samedi: 08:30 - 18:30</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`, '_blank')}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-red transition-all flex items-center gap-2 shadow-xl shadow-slate-200"
            >
              OBTENIR L'ITINÉRAIRE
              <Navigation size={20} />
            </button>
          </div>
          
          <div className="flex-1 w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Auto-Part Maroc Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
