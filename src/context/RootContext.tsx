"use client";
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState
} from "react";
import { ConfigType, PromptType, RoleType, SystemPromptType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import secureLocalStorage from "react-secure-storage";
import { customApi } from "@/utils/api";

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
  error: "",
  toggleError: false,
  setToggleError: (val: boolean) => {},
  mobileMenu: false,
  openMobileMenu: () => {},
  closeMobileMenu: () => {}
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
  toggleError: boolean;
  setToggleError: (val: boolean) => void;
  mobileMenu: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}>(defaultContext);

export default function RootContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const [modelsLoading, setModelsLoading] = useState(false);
  const [error, setError] = React.useState("");
  const [toggleError, setToggleError] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [mobileMenu, setMobileMenu] = React.useState(false);

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

  const addToken = (token: string) => {
    setToken(token);
    secureLocalStorage.setItem("open-ai-token", token);
  };

  const clearToken = () => {
    setToken("");
    secureLocalStorage.removeItem("open-ai-token");
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
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

      const decoder = new TextDecoder();
      const response = await customApi(token, config, systemPrompt, messages_);

      if (response.ok) {
        setError("");
        setToggleError(false);
        const { body, ok } = response;

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
      } else {
        const err: any = await response.json();
        if (err.error.type === "invalid_request_error") {
          switch (err.error.code) {
            case "invalid_api_key":
              setError(
                "Invalid API key, please check your API key and try again"
              );
              setToggleError(true);
              break;
            default:
              setError("An error has occurred. Please try again!");
              setToggleError(true);
              break;
          }
        } else {
          switch (err.error.type) {
            case "insufficient_quota":
              setError(
                `You've reached your usage limit. See your <a href="https://platform.openai.com/account/usage" target="_blank">usage dashboard</a> and <a href="https://platform.openai.com/account/billing" target="_blank" >billing settings</a> for more details. If you have further questions, please contact us through our help center at help.openai.com.`
              );
              setToggleError(true);
              break;
            default:
              setError("An error has occurred. Please try again!");
              setToggleError(true);
              break;
          }
        }
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

  // const getModels = useCallback(async () => {
  //   if (modelsLoading) return;
  //   setModelsLoading(true);

  //   const response = await fetchModels(token);

  //   if (response.ok) {
  //     console.log(response);
  //   } else {
  //     console.log(response);
  //   }

  //   setLoading(false);
  // }, [modelsLoading, token]);

  // useEffect(() => {
  //   if (token) getModels();
  // }, [getModels, token]);

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
      setModal,
      toggleError,
      setToggleError,
      mobileMenu,
      openMobileMenu,
      closeMobileMenu
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
      modal,
      toggleError,
      setToggleError,
      mobileMenu
    ]
  );

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}

export const useRootContext = () => React.useContext(RootContext);
