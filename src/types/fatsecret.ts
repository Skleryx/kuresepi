export interface FatSecretSearchItem {
    recipe_id: string;
    recipe_name: string;
    recipe_description: string;
    recipe_image?: string;
    recipe_nutrition?: {
        calories: string;
        carbohydrate: string;
        protein: string;
        fat: string;
    };
}

export interface FatSecretSearchResponse {
    recipes: {
        recipe: FatSecretSearchItem | FatSecretSearchItem[];
        page_number?: string;
        max_results?: string;
        total_results?: string;
    };
}

export interface FatSecretIngredient {
    ingredient_description: string;
    measurement_description: string;
}

export interface FatSecretDirection {
    direction_description: string;
    direction_number: string;
}

export interface FatSecretServing {
    calories: string;
    carbohydrate: string;
    protein: string;
    fat: string;
    serving_id: string;
}

export interface FatSecretRecipeDetail {
    recipe_id: string;
    recipe_name: string;
    recipe_image?: string;
    cooking_time?: string;
    preparation_time?: string;
    ingredients: {
        ingredient: FatSecretIngredient | FatSecretIngredient[];
    };
    directions: {
        direction: FatSecretDirection | FatSecretDirection[];
    };
    serving_sizes: {
        serving: FatSecretServing | FatSecretServing[];
    };
}

export interface FatSecretRegionResponse {
    recipe: FatSecretRecipeDetail;
}
