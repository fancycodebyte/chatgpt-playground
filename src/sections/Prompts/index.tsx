"use client";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import PromptItem from "@/components/PromptItem";
import Image from "next/image";
import { RoleType } from "@/types";
import { useRootContext } from "@/context/RootContext";
import Error from "@/components/Error";

const Prompts = () => {
  const { prompts, addPrompt, submit, loading, toggleError } = useRootContext();

  const handleAddMessage = () => {
    if (prompts.length > 0) {
      let role: RoleType.ASSISTANT | RoleType.USER;
      const tempPrompts = [...prompts];
      const lastPrompt = tempPrompts.pop();
      if (lastPrompt) {
        if (lastPrompt.role === RoleType.ASSISTANT) {
          role = RoleType.USER;
        } else {
          role = RoleType.ASSISTANT;
        }
        addPrompt("", false, role);
      }
    } else {
      addPrompt();
    }
  };

  const bottomEl = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [prompts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.metaKey) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [submit]);

  return (
    <div className={styles.prompts}>
      <div className={styles.messages}>
        {prompts.map((item, index) => (
          <PromptItem key={index} index={index} prompt={item} />
        ))}
        <div className={styles.addMessage} onClick={handleAddMessage}>
          <Image src="/assets/icons/add.svg" alt="add" height={20} width={20} />
          <span className={styles.addMessageText}>Add message</span>
        </div>
        {toggleError && <Error />}
        <div ref={bottomEl}></div>
      </div>
      <div className={styles.submitBtnWrap}>
        <button className={styles.submitBtn} onClick={submit}>
          {loading ? "Loading" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Prompts;
