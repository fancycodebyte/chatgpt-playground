import { defaultConfig } from "@/context/RootContext";
import { OpenAIRequest } from "@/types";
import { getOpenAICompletion } from "@/utils/api";

export async function POST(req: Request) {
  const { model, temperature, messages } = await req.json();

  const signal = req.signal;

  if (!messages) {
    return new Response("Missing messages", { status: 400 });
  }

  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return new Response("Missing token", { status: 401 });
  }

  const config = {
    model: model || defaultConfig.model,
    temperature: temperature || defaultConfig.temperature,
    stream: true
  };

  const payload: OpenAIRequest = {
    ...config,
    messages
  };

  try {
    const stream = await getOpenAICompletion(token, payload, signal);
    return new Response(stream);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
