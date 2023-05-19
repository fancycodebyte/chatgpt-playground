export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response("Missing API key", { status: 401 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    return data;
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
