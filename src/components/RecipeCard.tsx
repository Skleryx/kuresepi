// src/components/RecipeCard.tsx
import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="bg-bg-secondary border border-neon-green/20 rounded-xl overflow-hidden hover:scale-105 transition-all group">
      <div className="relative">
        <img src={recipe.thumbnail} alt={recipe.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link to={`/recipe/${recipe.id}`} className="bg-neon-green text-black font-bold py-2 px-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            VIEW DETAILS
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-neon-green font-bold text-lg mb-2 line-clamp-1">{recipe.title}</h3>

        {/* Deskripsi ini yang mencegah error "missing property" */}
        <p className="text-gray-400 text-sm font-mono line-clamp-2 mb-4 h-10">
          {recipe.description}
        </p>

        <div className="flex justify-between items-center text-xs font-mono text-neon-lime">
          <span>CAL: {recipe.calories}</span>
          <Link to={`/recipe/${recipe.id}`} className="border border-neon-lime px-2 py-1 rounded hover:bg-neon-lime hover:text-black transition-colors">
            VIEW_DATA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard