export enum PromptType {
  USER = "user",
  ASSISTANT = "assistant"
}

export interface Prompt {
  id: string;
  type: PromptType.USER | PromptType.ASSISTANT;
  message: string;
}
