import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Flame, Heart, Share2, ChefHat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';
import { getRecipeDetails } from '../services/fatsecret';
import type { FatSecretDirection, FatSecretIngredient } from '../types/fatsecret';

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    // State
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                // 1. Fetch Recipe Data
                const data = await getRecipeDetails(id);
                if (data && data.recipe) {
                    setRecipe(data.recipe);

                    // 2. Check if Favorite (only if logged in)
                    if (user) {
                        const { data: favs } = await supabase
                            .from('favorites')
                            .select('id')
                            .eq('user_id', user.id)
                            .eq('recipe_id', id)
                            .single();

                        setIsFavorite(!!favs);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, user]);

    const toggleFavorite = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (!recipe) return;

        setFavLoading(true);
        try {
            if (isFavorite) {
                // Remove
                await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('recipe_id', recipe.recipe_id);
                setIsFavorite(false);
            } else {
                // Add
                // Parse calories from FatSecret data structure
                // Usually in serving_sizes.serving.calories or similar
                let calories = "0";
                if (recipe.serving_sizes?.serving) {
                    const serving = Array.isArray(recipe.serving_sizes.serving)
                        ? recipe.serving_sizes.serving[0]
                        : recipe.serving_sizes.serving;
                    calories = serving?.calories || "0";
                }

                await supabase.from('favorites').insert({
                    user_id: user.id,
                    recipe_id: recipe.recipe_id,
                    recipe_name: recipe.recipe_name,
                    recipe_image: recipe.recipe_image,
                    recipe_calories: calories,
                });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setFavLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-main">
                <div className="w-12 h-12 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main text-text-muted">
                <p>Recipe not found.</p>
                <button onClick={() => navigate('/')} className="mt-4 text-neon-green hover:underline">Go Home</button>
            </div>
        );
    }

    // Helper to get nutrition data safely
    const getNutrition = () => {
        if (!recipe.serving_sizes?.serving) return { calories: 'N/A', fat: 'N/A', protein: 'N/A', carb: 'N/A' };

        const serving = Array.isArray(recipe.serving_sizes.serving)
            ? recipe.serving_sizes.serving[0]
            : recipe.serving_sizes.serving;

        return {
            calories: serving.calories,
            fat: serving.fat,
            protein: serving.protein,
            carb: serving.carbohydrate
        };
    };

    const nutrition = getNutrition();

    return (
        <div className="bg-bg-main min-h-screen text-text-main pb-20">
            {/* Hero Image Section */}
            <div className="relative h-[50vh] w-full">
                <img
                    src={recipe.recipe_image || 'https://via.placeholder.com/1200x600?text=No+Image'}
                    alt={recipe.recipe_name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent"></div>

                {/* Navbar Placeholder/Back Button */}
                <div className="absolute top-6 left-6 z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-bg-glass backdrop-blur-md p-3 rounded-full text-white hover:bg-neon-green hover:text-bg-main transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 shadow-black drop-shadow-lg">
                                    {recipe.recipe_name}
                                </h1>
                                <div className="flex items-center gap-6 text-sm font-mono text-neon-lime">
                                    <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded backdrop-blur-sm">
                                        <Flame size={16} />
                                        <span>{nutrition.calories} kcal</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded backdrop-blur-sm">
                                        <Clock size={16} />
                                        <span>{recipe.cooking_time || recipe.preparation_time || 'N/A'} min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={toggleFavorite}
                                    disabled={favLoading}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg backdrop-blur-md border ${isFavorite ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-bg-secondary/50 border-gray-500 text-white hover:bg-neon-green/20 hover:border-neon-green'}`}
                                >
                                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                                    {isFavorite ? 'Saved' : 'Save Protocol'}
                                </button>
                                <button className="p-3 bg-bg-secondary/50 border border-gray-500 rounded-xl text-white hover:text-neon-teal hover:border-neon-teal transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Ingredients & Directions */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Ingredients */}
                    <section className="bg-bg-secondary/30 rounded-2xl p-8 border border-border-soft">
                        <h3 className="text-2xl font-serif text-neon-green mb-6 flex items-center gap-3">
                            <span className="bg-neon-green/10 p-2 rounded text-neon-green">
                                <ChefHat size={24} />
                            </span>
                            Components Required
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recipe.ingredients?.ingredient && (
                                (Array.isArray(recipe.ingredients.ingredient)
                                    ? recipe.ingredients.ingredient
                                    : [recipe.ingredients.ingredient]
                                ).map((ing: FatSecretIngredient, idx: number) => (
                                    <li key={idx} className="flex items-center gap-3 text-text-muted hover:text-text-main transition-colors border-b border-border-soft/50 pb-2">
                                        <div className="w-2 h-2 bg-neon-teal rounded-full"></div>
                                        <span>
                                            <strong className="text-text-main">{ing.measurement_description}</strong> {ing.ingredient_description}
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </section>

                    {/* Directions */}
                    <section>
                        <h3 className="text-2xl font-serif text-neon-green mb-6">Execution Sequence</h3>
                        <div className="space-y-6">
                            {recipe.directions?.direction && (
                                (Array.isArray(recipe.directions.direction)
                                    ? recipe.directions.direction
                                    : [recipe.directions.direction]
                                ).map((dir: FatSecretDirection, idx: number) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-bg-secondary border border-neon-green/30 text-neon-green font-mono font-bold group-hover:bg-neon-green group-hover:text-bg-main transition-all">
                                            {idx + 1}
                                        </div>
                                        <p className="text-text-muted leading-relaxed pt-2 group-hover:text-text-main transition-colors">
                                            {dir.direction_description}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Nutrition Cards */}
                <div className="space-y-6">
                    <div className="bg-bg-secondary p-6 rounded-2xl border border-border-glow shadow-neon">
                        <h3 className="text-xl font-serif text-white mb-4">Nutritional Matrix</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-bg-main rounded-lg border-l-4 border-neon-green">
                                <span className="text-text-muted">Calories</span>
                                <span className="text-xl font-mono text-neon-green font-bold">{nutrition.calories}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-bg-main rounded-lg border-l-4 border-blue-500">
                                <span className="text-text-muted">Protein</span>
                                <span className="text-xl font-mono text-blue-400 font-bold">{nutrition.protein}g</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-bg-main rounded-lg border-l-4 border-yellow-500">
                                <span className="text-text-muted">Fat</span>
                                <span className="text-xl font-mono text-yellow-400 font-bold">{nutrition.fat}g</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-bg-main rounded-lg border-l-4 border-purple-500">
                                <span className="text-text-muted">Carbs</span>
                                <span className="text-xl font-mono text-purple-400 font-bold">{nutrition.carb}g</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default RecipeDetails;