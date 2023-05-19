"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { PromptType } from "@/types";
import { useRootContext } from "@/context/RootContext";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  index: number;
  prompt: PromptType;
}

const PromptItem: FC<Props> = ({ index, prompt }) => {
  const { removePrompt, toggleRole, updateMessage } = useRootContext();
  const [txt, setTxt] = useState("");

  useEffect(() => {
    setTxt(prompt.message);
  }, [prompt.message]);

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
        <TextareaAutosize
          id={`message${index}`}
          autoFocus
          rows={1}
          className={styles.promptMessageInput}
          placeholder={`Enter a ${prompt.role} message here.`}
          onChange={(e) => {
            updateMessage(prompt.id, e.target.value);
          }}
          value={txt}
        ></TextareaAutosize>
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
