"use client";
import React, { PropsWithChildren, createContext, useCallback } from "react";
import { ConfigType, PromptType, RoleType, SystemPromptType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import secureLocalStorage from "react-secure-storage";

export const defaultConfig: ConfigType = {
  model: "gpt-3.5-turbo",
  temperature: 0.5
};

const defaultContext = {
  token: "",
  addToken: () => {},
  clearToken: () => {},
  systemPrompt: {
    role: RoleType.SYSTEM,
    message: ""
  } as SystemPromptType,
  prompts: [
    {
      id: uuidv4(),
      role: RoleType.USER,
      message: ""
    }
  ] as PromptType[],
  config: defaultConfig,
  updateSystemPrompt: (message: string) => {},
  addPrompt: () => {},
  removePrompt: (id: string) => {},
  toggleRole: (id: string) => {},
  updateMessage: (id: string, message: string) => {},
  updateConfig: (newConfig: Partial<ConfigType>) => {},
  submit: () => {},
  loading: true,
  modal: false,
  setModal: (val: boolean) => {},
  error: ""
};

const RootContext = createContext<{
  token: string;
  addToken: (token: string) => void;
  clearToken: () => void;
  systemPrompt: SystemPromptType;
  prompts: PromptType[];
  config: ConfigType;
  updateSystemPrompt: (message: string) => void;
  addPrompt: (
    message?: string,
    submit?: boolean,
    role?: RoleType.USER | RoleType.ASSISTANT
  ) => void;
  removePrompt: (id: string) => void;
  toggleRole: (id: string) => void;
  updateMessage: (id: string, message: string) => void;
  updateConfig: (newConfig: Partial<ConfigType>) => void;
  submit: () => void;
  modal: boolean;
  setModal: (val: boolean) => void;
  loading: boolean;
  error: string;
}>(defaultContext);

export default function RootContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [modal, setModal] = React.useState(false);

  const [systemPrompt, setSystemPrompt] = React.useState<SystemPromptType>(
    defaultContext.systemPrompt
  );
  const [config, setConfig] = React.useState<ConfigType>(defaultConfig);
  const [prompts, setPrompts] = React.useState<PromptType[]>(
    defaultContext.prompts
  );

  React.useEffect(() => {
    const token = secureLocalStorage.getItem("open-ai-token") as string;
    if (token) {
      setToken(token);
    }
  }, []);

  console.log(token);

  const addToken = (token: string) => {
    setToken(token);
    secureLocalStorage.setItem("open-ai-token", token);
  };

  const clearToken = () => {
    setToken("");
    secureLocalStorage.removeItem("open-ai-token");
  };

  const updateSystemPrompt = (message: string) => {
    setSystemPrompt({
      role: RoleType.SYSTEM,
      message
    });
  };

  const removePrompt = (id: string) => {
    setPrompts((prev) => {
      return [...prev.filter((message) => message.id !== id)];
    });
  };

  const toggleRole = (id: string) => {
    setPrompts((prev) => {
      const index = prev.findIndex((prompt) => prompt.id === id);
      if (index === -1) return prev;
      const prompt = prev[index];
      return [
        ...prev.slice(0, index),
        {
          ...prompt,
          role:
            prompt.role === RoleType.USER ? RoleType.ASSISTANT : RoleType.USER
        },
        ...prev.slice(index + 1)
      ];
    });
  };

  const updateConfig = (newConfig: Partial<ConfigType>) => {
    setConfig((prev) => {
      return {
        ...prev,
        ...newConfig
      };
    });
  };

  const updateMessage = (id: string, message: string) => {
    setPrompts((prev) => {
      const index = prev.findIndex((prompt) => prompt.id === id);
      if (index === -1) return prev;
      const prompt = prev[index];
      return [
        ...prev.slice(0, index),
        {
          ...prompt,
          message
        },
        ...prev.slice(index + 1)
      ];
    });
  };

  const submit = useCallback(
    async (messages_: PromptType[] = []) => {
      if (loading) return;
      setLoading(true);

      messages_ = messages_.length ? messages_ : prompts;

      try {
        const decoder = new TextDecoder();
        const { body, ok } = await fetch("/api/playground", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...config,
            messages: [systemPrompt, ...messages_].map(({ role, message }) => ({
              role,
              message
            }))
          })
        });

        if (!body) return;
        const reader = body.getReader();

        if (!ok) {
          // Get the error message from the response body
          const { value } = await reader.read();
          const chunkValue = decoder.decode(value);
          const { error } = JSON.parse(chunkValue);

          throw new Error(
            error?.message ||
              "Failed to fetch response, check your API key and try again."
          );
        }

        let done = false;

        const prompt = {
          id: uuidv4(),
          role: "assistant",
          message: ""
        } as PromptType;

        setPrompts((prev) => {
          return [...prev, prompt];
        });

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          prompt.message += chunkValue;

          updateMessage(prompt.id, prompt.message);
        }
      } catch (error: any) {
        // setMessages((prev) => {
        //   return [
        //     ...prev,
        //     {
        //       id: prev.length,
        //       role: "assistant",
        //       message: error.message
        //     }
        //   ];
        // });
      }

      setLoading(false);
    },
    [loading, prompts, token, config, systemPrompt]
  );

  const addPrompt = useCallback(
    (message = "", submit_ = false, role = RoleType.USER) => {
      setPrompts((prev) => {
        const messages = [
          ...prev,
          {
            id: uuidv4(),
            role,
            message: message || ""
          } as PromptType
        ];
        submit_ && submit(messages);
        return messages;
      });
    },
    [submit]
  );

  const value = React.useMemo(
    () => ({
      systemPrompt,
      prompts,
      config,
      loading,
      updateSystemPrompt,
      addPrompt,
      removePrompt,
      toggleRole,
      updateMessage,
      updateConfig,
      submit,
      error,
      token,
      addToken,
      clearToken,
      modal,
      setModal
    }),
    [
      systemPrompt,
      prompts,
      config,
      loading,
      addPrompt,
      submit,
      error,
      token,
      modal
    ]
  );

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}

export const useRootContext = () => React.useContext(RootContext);
