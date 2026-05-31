const https = require('https');

exports.handler = async (event) => {
    const CAMPAIGN_ID = "help-launch-gtm";
    const API_KEY = process.env.GIVEBUTTER_API_KEY;

    if (!API_KEY) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Missing GIVEBUTTER_API_KEY in Netlify settings." })
        };
    }

    const cleanKey = API_KEY.trim();
    const formattedKey = cleanKey.startsWith("Bearer ") ? cleanKey : `Bearer ${cleanKey}`;

    return new Promise((resolve) => {
        const options = {
            hostname: 'api.givebutter.com',
            path: `/v1/campaigns/${CAMPAIGN_ID.trim()}`,
            method: 'GET',
            headers: {
                'Authorization': formattedKey,
                'Accept': 'application/json',
                'User-Agent': 'NetlifyFunction'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => { data += chunk; });

            res.on('end', () => {
                try {
                    if (res.statusCode !== 200) {
                        return resolve({
                            statusCode: res.statusCode,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ error: `Givebutter API returned status ${res.statusCode}` })
                        });
                    }

                    const parsedData = JSON.parse(data);
                    const campaign = parsedData.data || parsedData;
                    const raised = campaign.raised || 0;
                    const goal = campaign.goal || 0;

                    resolve({
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify({ raised, goal })
                    });

                } catch (err) {
                    resolve({
                        statusCode: 500,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ error: "Failed to parse Givebutter response JSON." })
                    });
                }
            });
        });

        req.on('error', (err) => {
            resolve({
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: err.message })
            });
        });

        req.end();
    });
};