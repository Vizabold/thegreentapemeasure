export async function handler(event, context) {

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { email } = JSON.parse(event.body);

        if (!email || !email.includes("@") || !email.includes(".")) {
            return { statusCode: 400, body: "Invalid email address." };
        }

        const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
        const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

        const response = await fetch(
            `https://connect.mailerlite.com/api/subscribers`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${MAILERLITE_API_KEY}`,
                },
                body: JSON.stringify({
                    email: email,
                    groups: [GROUP_ID],
                    resubscribe: true,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            return { statusCode: response.status, body: errorText };
        }

        return { statusCode: 200, body: "Subscribed successfully!" };
    } catch (error) {
        return { statusCode: 500, body: `Server error: ${error.message}` };
    }
}
