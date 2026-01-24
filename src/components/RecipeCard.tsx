import type { Recipe } from '../types/recipe';
import { Zap, Flame, Target, BookHeart } from 'lucide-react';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="bg-bg-secondary border border-border-soft rounded-2xl overflow-hidden group hover:border-neon-green/50 transition-all">
      <div className="relative h-48">
        <img src={recipe.thumbnail} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="bg-bg-main/80 text-neon-lime text-[9px] px-2 py-1 rounded-md border border-neon-green/20">
            {recipe.calories} kcal
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-text-main line-clamp-1 mb-4">{recipe.title}</h3>
        
        {/* Nutrients Display */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center p-2 bg-bg-main rounded-lg border border-border-soft">
            <Flame size={12} className="text-orange-500 mb-1" />
            <span className="text-[10px] text-text-muted">Carbs</span>
            <span className="text-[11px] font-bold">{recipe.carbs}g</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-bg-main rounded-lg border border-border-soft">
            <Target size={12} className="text-neon-teal mb-1" />
            <span className="text-[10px] text-text-muted">Prot</span>
            <span className="text-[11px] font-bold">{recipe.protein}g</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-bg-main rounded-lg border border-border-soft">
            <Zap size={12} className="text-neon-lime mb-1" />
            <span className="text-[10px] text-text-muted">Fat</span>
            <span className="text-[11px] font-bold">{recipe.fat}g</span>
          </div>
        </div>

        <div className='flex flex-row gap-2 item-center'>
          <button className="w-5/6 py-2 border border-neon-green text-neon-green text-[10px] uppercase font-mono tracking-widest rounded-lg hover:bg-neon-green hover:text-bg-main transition-all ">
            View_Details
          </button>
          <div className='place-item-center w-1/6 py-2 border border-neon-green text-bg-main text-[10px] font-mono tracking-widest rounded-lg hover:bg-neon-green hover:text-bg-main transition-all bg-gradient-to-tr from-neon-green via-neon-lime to-neon-teal justify-center'>
              <BookHeart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;