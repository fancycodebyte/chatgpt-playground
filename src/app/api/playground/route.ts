import { defaultConfig } from "@/context/RootContext";
import { OpenAIRequest } from "@/types";
import { getOpenAICompletion } from "@/utils/api";

export const config = {
  runtime: "edge"
};

export async function POST(req: Request) {
  const { model, temperature, messages } = await req.json();

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
    // n: 1,
    // max_tokens: 256,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0
  };

  const payload: OpenAIRequest = {
    ...config,
    messages
  };

  try {
    const stream = await getOpenAICompletion(token, payload);
    return new Response(stream);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
