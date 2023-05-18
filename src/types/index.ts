export enum RoleType {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system"
}

export interface PromptType {
  id: string;
  role: RoleType.USER | RoleType.ASSISTANT | RoleType.SYSTEM;
  message: string;
}

export interface ConfigType {
  model: string;
  temperature?: any;
}

export interface SystemPromptType {
  role: RoleType.SYSTEM;
  message: string;
}

export type OpenAIRequest = {
  messages: PromptType[];
} & ConfigType;
