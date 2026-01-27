import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import RecipeCard from '../components/RecipeCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

const Favourites = () => {
  const { user, loading: authLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching favorites:", error);
      } else {
        // Map DB columns to Recipe interface
        const mapped: Recipe[] = data.map((item: { recipe_id: string; recipe_name: string; recipe_image: string; recipe_calories: string }) => ({
          id: item.recipe_id,
          title: item.recipe_name,
          description: 'Saved Recipe', // DB doesn't store description, placeholder
          thumbnail: item.recipe_image,
          calories: item.recipe_calories
        }));
        setRecipes(mapped);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <div className="w-12 h-12 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main text-text-muted p-6 text-center">
        <h2 className="text-2xl text-neon-green font-serif mb-4">Internal Access Restricted</h2>
        <p className="mb-6">Please login to access your protocol database.</p>
        <Link to="/login" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-soft transition-colors">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-main min-h-screen text-text-main pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold font-serif text-white">
            <span className="text-neon-lime">My</span>_Protocols
          </h2>
          <div className="bg-bg-secondary px-4 py-2 rounded-full border border-border-soft text-text-muted text-sm font-mono">
            COUNT: {recipes.length}
          </div>
        </div>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-border-soft rounded-3xl bg-bg-secondary/20">
            <p className="text-text-muted font-mono uppercase tracking-widest mb-4">
              Database_Empty
            </p>
            <p className="text-sm text-text-muted/60 mb-6">Start by exploring recipes and saving them here.</p>
            <Link to="/" className="text-neon-green hover:underline">
              Explore Recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;