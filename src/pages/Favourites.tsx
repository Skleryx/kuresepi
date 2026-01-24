import RecipeCard from '../components/RecipeCard';
import { Database, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favourites = () => {
  // Data dummy lengkap agar TypeScript tidak error
  const favoriteItems = [
    {
      id: "fav-1",
      title: "Cyberpunk Ramen Protocol",
      description: "Data-synthesized authentic ramen with neon-green broth.", // WAJIB ADA
      thumbnail: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
      calories: "450",
      protein: "12",
      fat: "8",
      carbs: "60"
    },
    {
      id: "fav-2",
      title: "Neon Glazed Salmon",
      description: "High-protein energy source optimized for long-duration coding sessions.", // WAJIB ADA
      thumbnail: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
      calories: "320",
      protein: "24",
      fat: "14",
      carbs: "5"
    }
  ];

  return (
    <div className="bg-bg-main min-h-screen text-text-main pt-44 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header UI */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-soft pb-8">
          <div>
            <Link to="/" className="text-neon-lime font-mono text-xs mb-4 flex items-center gap-2 hover:brightness-125 transition-all">
              <ArrowLeft size={14} /> BACK_TO_TERMINAL
            </Link>
            <h1 className="text-5xl font-serif font-bold italic">
              Saved_<span className="text-neon-green">Protocols</span>
            </h1>
          </div>

          <div className="bg-bg-secondary/50 border border-neon-green/20 p-4 rounded-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Database className="text-neon-green" size={18} />
              <span className="font-mono text-xs uppercase tracking-tighter">Vault_Storage: {favoriteItems.length}/50</span>
            </div>
          </div>
        </div>

        {/* Grid Mapping - Sekarang tidak akan error lagi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favoriteItems.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Favourites;