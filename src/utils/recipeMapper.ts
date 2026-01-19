import type { Recipe, Ingredient } from '../types/recipe';

export const mapFatSecretToRecipe = (raw: any): Recipe => {
  // Mapping ingredients jika ada (FatSecret detail)
  const rawIngredients = raw.ingredients?.ingredient || [];
  const cleanIngredients: Ingredient[] = Array.isArray(rawIngredients)
    ? rawIngredients.map((ing: any) => ({
        name: ing.food_name,
        amount: ing.ingredient_description
      }))
    : [];

  return {
    id: raw.recipe_id,
    title: raw.recipe_name,
    description: raw.recipe_description || "",
    thumbnail: raw.recipe_image || "https://via.placeholder.com/300",
    // Data nutrisi dari FatSecret
    calories: raw.recipe_nutrition?.calories || "0",
    carbs: raw.recipe_nutrition?.carbohydrate || "0",
    protein: raw.recipe_nutrition?.protein || "0",
    fat: raw.recipe_nutrition?.fat || "0",
    ingredients: cleanIngredients,
    // Mengambil instruksi memasak
    instructions: raw.directions?.direction?.map((d: any) => d.direction_description) || []
  };
};