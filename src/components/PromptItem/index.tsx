"use client";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import autosize from "autosize";
import { Prompt, PromptType } from "@/types";
import debounce from "lodash.debounce";

interface Props {
  index: number;
  prompt: Prompt;
  prompts: Prompt[];
  setPrompts: (_prompt: Prompt[]) => void;
}

const PromptItem: FC<Props> = ({ index, prompt, prompts, setPrompts }) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      autosize(inputRef.current);
    }
  });

  const changeType = (_prompt: Prompt) => {
    const tempType =
      _prompt.type === PromptType.USER ? PromptType.ASSISTANT : PromptType.USER;

    const tempPrompts = prompts.map((i) =>
      i.id === _prompt.id ? { ...i, type: tempType } : i
    );
    setPrompts(tempPrompts);
  };

  const changeHandler = (_message: string) => {
    var tempPrompts = [...prompts];
    tempPrompts = prompts.map((i) =>
      i.id === prompt.id ? { ...i, message: _message } : i
    );
    setPrompts(tempPrompts);
  };

  const removePrompt = (_prompt: Prompt) => {
    var tempPrompts = [...prompts];
    tempPrompts = tempPrompts.filter((i) => i.id !== _prompt.id);
    setPrompts(tempPrompts);
  };

  return (
    <label htmlFor={`message${index}`} className={styles.promptItem}>
      <div className={styles.promptType}>
        <span
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            changeType(prompt);
          }}
          className={styles.promptTypeText}
        >
          {prompt.type}
        </span>
      </div>
      <div className={styles.promptMessage}>
        <textarea
          id={`message${index}`}
          ref={inputRef}
          rows={1}
          className={styles.promptMessageInput}
          placeholder={"Enter a user message here"}
          onChange={(e) => {
            changeHandler(e.target.value);
          }}
          value={prompt.message}
        ></textarea>
      </div>
      <div className={styles.promptRemove}>
        <Image
          onClick={() => removePrompt(prompt)}
          src="/assets/icons/remove.svg"
          alt="remove"
          width={20}
          height={20}
        />
      </div>
    </label>
  );
};

export default PromptItem;
