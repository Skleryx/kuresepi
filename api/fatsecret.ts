import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
        return res.status(200).end();
    }

    // Only allow GET requests for API calls
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Build the query string from request query params
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(req.query)) {
            if (typeof value === 'string') {
                queryParams.append(key, value);
            }
        }

        const url = `https://platform.fatsecret.com/rest/server.api?${queryParams.toString()}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': req.headers.authorization || '',
            },
        });

        const data = await response.json();

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

        return res.status(response.status).json(data);
    } catch (error) {
        console.error('FatSecret proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
}
