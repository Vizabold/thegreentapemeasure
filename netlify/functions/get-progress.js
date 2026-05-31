export const handler = async (event) => {
    const CAMPAIGN_ID = "help-launch-gtm";
    const API_KEY = process.env.GIVEBUTTER_API_KEY;

    try {
        const response = await fetch(`https://givebutter.com{CAMPAIGN_ID}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            return { statusCode: response.status, body: "Failed fetching data from Givebutter" };
        }

        const data = await response.json();
        const raised = data.data.raised || 0;
        const goal = data.data.goal || 0;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ raised, goal })
        };

    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};