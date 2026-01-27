import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_FATSECRET_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_FATSECRET_CLIENT_SECRET;
const SCOPE = 'basic';

// Note: In a production environment, this token generation should happen on the server side
// to avoid exposing the Client Secret. We are doing this client-side for this MVP.

let accessToken: string | null = null;

const getAccessToken = async () => {
    if (accessToken) return accessToken;

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('scope', SCOPE);

        // ... (imports)

        // ...

        // FatSecret expects Basic Auth header
        const authString = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

        // 使用 Proxy endpoint
        const response = await axios.post('/api/token', params, {
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error getting FatSecret access token:', error);
        throw error;
    }
};

const fatSecretClient = axios.create({
    baseURL: '/api/fatsecret', // Proxy endpoint
});

fatSecretClient.interceptors.request.use(async (config) => {
    // ...
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const searchRecipes = async (query: string, page = 0) => {
    try {
        const response = await fatSecretClient.get('', {
            params: {
                method: 'recipes.search',
                search_expression: query,
                format: 'json',
                page_number: page,
                max_results: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};

export const getRecipeDetails = async (recipeId: string) => {
    try {
        const response = await fatSecretClient.get('', {
            params: {
                method: 'recipe.get',
                recipe_id: recipeId,
                format: 'json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting recipe details:', error);
        throw error;
    }
};
