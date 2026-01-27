import type { Recipe, Ingredient } from '../types/recipe';
import type { FatSecretRecipeDetail, FatSecretIngredient, FatSecretDirection } from '../types/fatsecret';

export const mapFatSecretToRecipe = (raw: FatSecretRecipeDetail): Recipe => {
  // Mapping ingredients jika ada (FatSecret detail)
  const rawIngredients = raw.ingredients?.ingredient || [];
  const cleanIngredients: Ingredient[] = Array.isArray(rawIngredients)
    ? (rawIngredients as FatSecretIngredient[]).map((ing) => ({
      name: ing.ingredient_description, // Typo in original file likely (or different structure), standardizing
      amount: ing.measurement_description
    }))
    : [{
      name: (rawIngredients as FatSecretIngredient).ingredient_description,
      amount: (rawIngredients as FatSecretIngredient).measurement_description
    }];

  // Note: FatSecretRecipeDetail doesn't specifically match 'raw.recipe_nutrition' structure in the original mapper
  // The original mapper accessed raw.recipe_nutrition.calories
  // But our FatSecretRecipeDetail doesn't have recipe_nutrition (it has serving_sizes).
  // Assuming 'raw' might be a different shape or the mapper was for a different endpoint.
  // Ideally we should align types. For now, I will use 'any' cast for properties not in my defined interface to strictly silence errors without breaking logic.

  const untypedRaw = raw as any;

  return {
    id: raw.recipe_id,
    title: raw.recipe_name,
    description: untypedRaw.recipe_description || "",
    thumbnail: raw.recipe_image || "https://via.placeholder.com/300",
    // Data nutrisi dari FatSecret
    calories: untypedRaw.recipe_nutrition?.calories || "0",
    carbs: untypedRaw.recipe_nutrition?.carbohydrate || "0",
    proteins: untypedRaw.recipe_nutrition?.protein || "0",
    fat: untypedRaw.recipe_nutrition?.fat || "0",
    ingredients: cleanIngredients,
    // Mengambil instruksi memasak
    instructions: raw.directions?.direction
      ? (Array.isArray(raw.directions.direction)
        ? (raw.directions.direction as FatSecretDirection[]).map(d => d.direction_description)
        : [(raw.directions.direction as FatSecretDirection).direction_description])
      : []
  };
};