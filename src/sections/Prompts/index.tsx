import React from "react";
import styles from "./styles.module.css";
import PromptItem from "@/components/PromptItem";
import Image from "next/image";

const Prompts = () => {
  return (
    <div className={styles.prompts}>
      <div className={styles.messages}>
        {[1, 2, 3, 4].map((item, index) => (
          <PromptItem key={index} index={index} />
        ))}
        <div className={styles.addMessage}>
          <Image src="/assets/icons/add.svg" alt="add" height={20} width={20} />
          <span className={styles.addMessageText}>Add message</span>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
