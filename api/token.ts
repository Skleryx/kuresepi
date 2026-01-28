import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Convert body to URLSearchParams if it's an object
        let bodyStr: string;
        if (typeof req.body === 'object') {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(req.body)) {
                params.append(key, String(value));
            }
            bodyStr = params.toString();
        } else if (typeof req.body === 'string') {
            bodyStr = req.body;
        } else {
            bodyStr = '';
        }

        // Forward the request to FatSecret OAuth endpoint
        const response = await fetch('https://oauth.fatsecret.com/connect/token', {
            method: 'POST',
            headers: {
                'Authorization': req.headers.authorization as string || '',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyStr,
        });

        const data = await response.json();

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

        return res.status(response.status).json(data);
    } catch (error) {
        console.error('Token proxy error:', error);
        return res.status(500).json({ error: 'Failed to get token', details: String(error) });
    }
}
