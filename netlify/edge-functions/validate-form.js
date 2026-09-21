export default async (request, context) => {
    if (request.method === "POST") {
        try {
            const reqClone = request.clone();
            const formData = await reqClone.formData();
            const formName = formData.get("form-name");
            if (formName === "volunteer-interest") {
                const requiredField = formData.get("email");
                if (!requiredField || requiredField.trim() === "") {
                    return new Response("Bad Request: Missing required data.", { status: 400 });
                }
            }
        } catch (err) {
            return new Response("Invalid form format.", { status: 400 });
        }
    }
    return context.next();
};

export const config = {
    path: "/thank-you.html",
};