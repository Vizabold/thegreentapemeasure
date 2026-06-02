export async function handler(event) {
  if (event.httpMethod === "POST") {
    try {
      const report = JSON.parse(event.body || "{}");

      console.log("CSP Violation Report:", JSON.stringify(report, null, 2));

      return {
        statusCode: 204,
      };
    } catch (err) {
      console.log('Error parsing CSP report:', err);
      return {
        statusCode: 400,
        body: "Invalid CSP report",
      };
    }

  }

  return {
    statusCode: 405,
    body: "Method Not Allowed",
  };
}
