import type { NextApiResponse } from "next";
import { defaultConfig } from "@/context/RootContext";
import { OpenAIRequest } from "@/types";
import { getOpenAICompletion } from "@/utils/api";

const config = {
  runtime: "edge"
};

interface Response {
  content?: string;
  error?: string;
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Response>
) {
  const { model, temperature, messages } = await req.json();

  if (!messages) {
    return new Response("Missing messages", { status: 400 });
  }

  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return new Response("Missing token", { status: 401 });
  }

  const config = {
    model: "text-ada-001",
    // model: model || defaultConfig.model,
    temperature: temperature || defaultConfig.temperature,
    stream: true,
    n: 1
  };

  const payload: OpenAIRequest = {
    ...config,
    messages
  };

  try {
    const stream = await getOpenAICompletion(token, payload);
    return new Response(stream);
  } catch (e: any) {
    return new Response(e.message || "Error fetching response.", {
      status: 500
    });
  }
}
