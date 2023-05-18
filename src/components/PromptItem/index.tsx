"use client";
import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import autosize from "autosize";
import { PromptType } from "@/types";
import { useRootContext } from "@/context/RootContext";

interface Props {
  index: number;
  prompt: PromptType;
}

const PromptItem: FC<Props> = ({ index, prompt }) => {
  const { removePrompt, toggleRole, updateMessage } = useRootContext();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      autosize(inputRef.current);
    }
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <label htmlFor={`message${index}`} className={styles.promptItem}>
      <div className={styles.promptType}>
        <span
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleRole(prompt.id);
          }}
          className={styles.promptTypeText}
        >
          {prompt.role}
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
            updateMessage(prompt.id, e.target.value);
          }}
          value={prompt.message}
        ></textarea>
      </div>
      <div className={styles.promptRemove}>
        <Image
          onClick={() => removePrompt(prompt.id)}
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
