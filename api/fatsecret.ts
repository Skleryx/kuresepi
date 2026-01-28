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
            } else if (Array.isArray(value)) {
                // Handle array values (take first one)
                queryParams.append(key, value[0] || '');
            }
        }

        const url = `https://platform.fatsecret.com/rest/server.api?${queryParams.toString()}`;

        console.log('Fetching FatSecret URL:', url);
        console.log('Authorization header present:', !!req.headers.authorization);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': req.headers.authorization as string || '',
            },
        });

        const data = await response.json();

        console.log('FatSecret response status:', response.status);

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

        return res.status(response.status).json(data);
    } catch (error) {
        console.error('FatSecret proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch data', details: String(error) });
    }
}
