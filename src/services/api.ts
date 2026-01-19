import type { Recipe } from '../types/recipe';

const API_KEY = 'd0848c6edc1b4b0ebf6a132db44d09d6';

export const recipeService = {
  searchRecipes: async (query: string): Promise<Recipe[]> => {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&addRecipeNutrition=true&number=12`;
      const response = await fetch(url);
      const data = await response.json();

      // CEK DISINI: Apa isi datanya?
      console.log("Raw API Response:", data);

      if (!data.results) {
        console.error("Data results tidak ditemukan!");
        return [];
      }

      return data.results.map((raw: any) => {
        // Spoonacular simpan nutrisi di dalam array nutrition.nutrients
        const nutrients = raw.nutrition?.nutrients || [];
        const findN = (name: string) => nutrients.find((n: any) => n.name === name)?.amount || 0;

        return {
          id: raw.id.toString(),
          title: raw.title,
          description: "",
          thumbnail: raw.image,
          calories: findN("Calories").toString(),
          carbs: findN("Carbohydrates").toString(),
          protein: findN("Protein").toString(),
          fat: findN("Fat").toString(),
        };
      });
    } catch (error) {
      console.error("Error di api.ts:", error);
      return [];
    }
  }
};