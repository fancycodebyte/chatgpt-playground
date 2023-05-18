"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import PromptItem from "@/components/PromptItem";
import Image from "next/image";
import { Prompt, PromptType } from "@/types";
import { v4 as uuidv4 } from "uuid";

const Prompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: uuidv4(),
      type: PromptType.USER,
      message: ""
    }
  ]);

  const addMessage = () => {
    if (prompts.length > 0) {
      let type: PromptType.ASSISTANT | PromptType.USER;
      const tempPrompts = [...prompts];
      const lastPrompt = tempPrompts.pop();
      if (lastPrompt) {
        if (lastPrompt.type === PromptType.ASSISTANT) {
          type = PromptType.USER;
        } else {
          type = PromptType.ASSISTANT;
        }
        setPrompts((prev) => [...prev, { id: uuidv4(), type, message: "" }]);
      }
    } else {
      setPrompts([{ id: uuidv4(), type: PromptType.USER, message: "" }]);
    }
  };

  const bottomEl = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [prompts]);

  return (
    <div className={styles.prompts}>
      <div className={styles.messages}>
        {prompts.map((item, index) => (
          <PromptItem
            key={index}
            index={index}
            prompt={item}
            prompts={prompts}
            setPrompts={setPrompts}
          />
        ))}
        <div className={styles.addMessage} onClick={addMessage}>
          <Image src="/assets/icons/add.svg" alt="add" height={20} width={20} />
          <span className={styles.addMessageText}>Add message</span>
        </div>
        <div ref={bottomEl}></div>
      </div>
      <div className={styles.submitBtnWrap}>
        <button className={styles.submitBtn}>Submit</button>
      </div>
    </div>
  );
};

export default Prompts;
