import {
  ConfigType,
  OpenAIRequest,
  PromptType,
  SystemPromptType
} from "@/types";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser
} from "eventsource-parser";

export const customApi = async (
  apiKey: string,
  config: ConfigType,
  systemPrompt: SystemPromptType,
  messages_: PromptType[],
  signal: AbortSignal
) => {
  const response = await fetch("/api/completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    signal: signal,
    body: JSON.stringify({
      ...config,
      messages: [systemPrompt, ...messages_].map(({ role, message }) => ({
        role,
        content: message
      }))
    })
  });

  return response;
};

export const fetchModels = async (apiKey: string) => {
  const response = await fetch("/api/models", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  return response;
};

export const getOpenAICompletion = async (
  apiKey: string,
  payload: OpenAIRequest,
  signal: AbortSignal
) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const config: {
    headers: {
      Authorization: string;
      "Content-Type": string;
    };
    signal: AbortSignal;
    method: string;
    body: string;
  } = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    method: "POST",
    signal: signal,
    body: JSON.stringify(payload)
  };

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    config
  );

  // Check for errors
  if (!response.ok) {
    throw new Error(await response.text());
  }

  let counter = 0;
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of response.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
};
