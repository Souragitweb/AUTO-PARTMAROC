import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ChevronRight } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: "Comment choisir ses plaquettes de frein ?",
    excerpt: "Découvrez les critères essentiels pour garantir un freinage optimal et sécurisé pour votre véhicule.",
    author: "Expert Auto",
    date: "10 Avril 2026",
    image: "https://picsum.photos/seed/brakes-blog/800/400"
  },
  {
    id: 2,
    title: "L'importance de la vidange régulière",
    excerpt: "Pourquoi changer son huile moteur est crucial pour la longévité de votre moteur, surtout en climat chaud.",
    author: "Mécanicien Pro",
    date: "05 Avril 2026",
    image: "https://picsum.photos/seed/oil-blog/800/400"
  },
  {
    id: 3,
    title: "Préparer sa voiture pour l'été au Maroc",
    excerpt: "Nos conseils pour affronter les fortes chaleurs : climatisation, pneus et circuit de refroidissement.",
    author: "Conseiller Technique",
    date: "01 Avril 2026",
    image: "https://picsum.photos/seed/summer-blog/800/400"
  }
];

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">BLOG & CONSEILS D'EXPERTS</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Retrouvez tous nos guides, tutoriels et astuces pour entretenir votre véhicule comme un professionnel.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {POSTS.map((post) => (
          <motion.article 
            key={post.id}
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-red transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <button className="text-brand-red font-bold flex items-center gap-1 text-sm">
                Lire la suite <ChevronRight size={16} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
