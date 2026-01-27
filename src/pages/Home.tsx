import { useState, useEffect } from 'react';
import type { Recipe } from '../types/recipe';
import type { FatSecretSearchItem, FatSecretSearchResponse } from '../types/fatsecret';
import RecipeCard from '../components/RecipeCard';
import Hero from '../components/Hero';
import { searchRecipes } from '../services/fatsecret';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengambil data dari API
  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchRecipes(query) as FatSecretSearchResponse;


      // Map FatSecret data to our Recipe interface
      // Note: FatSecret structure might vary, adding safety checks
      if (data?.recipes?.recipe) {
        // Handle case where single result is an object, multiple is object[]
        const results = Array.isArray(data.recipes.recipe)
          ? data.recipes.recipe
          : [data.recipes.recipe];

        const mappedRecipes: Recipe[] = results.map((item: FatSecretSearchItem) => ({
          id: item.recipe_id,
          title: item.recipe_name,
          description: item.recipe_description,
          thumbnail: item.recipe_image || 'https://via.placeholder.com/300x200?text=No+Image', // Fallback image
          calories: item.recipe_nutrition?.calories
        }));
        setRecipes(mappedRecipes);
      } else {
        setRecipes([]);
      }

    } catch (error) {
      console.error("Search error:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan pencarian otomatis saat pertama kali aplikasi dibuka
  useEffect(() => {
    handleSearch("healthy");
  }, []);

  return (
    <div className="bg-bg-main min-h-screen text-text-main pb-20">
      {/* Komponen Header & Search */}
      <Hero onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-serif italic text-neon-green">
            Featured_Protocols
          </h2>
          <div className="h-[1px] flex-1 bg-border-soft ml-6"></div>
        </div>

        {/* Logika Tampilan: Loading vs Data vs Kosong */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-mono text-neon-green animate-pulse">SYNCHRONIZING_DATA...</p>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border-soft rounded-3xl">
            <p className="text-text-muted font-mono uppercase tracking-widest">
              No_Recipes_Found_In_Database
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;