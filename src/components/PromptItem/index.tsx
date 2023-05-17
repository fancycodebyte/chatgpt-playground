"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import autosize from "autosize";

interface Props {
  index: number;
}

const PromptItem: FC<Props> = ({ index }) => {
  const [message, setMessage] = useState(" ");

  useEffect(() => {
    setMessage("");
  }, []);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      autosize(inputRef.current);
    }
  });

  return (
    <label htmlFor={`message${index}`} className={styles.promptItem}>
      <div className={styles.promptType}>
        <span
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className={styles.promptTypeText}
        >
          User
        </span>
      </div>
      <div className={styles.promptMessage}>
        <textarea
          id={`message${index}`}
          ref={inputRef}
          rows={1}
          className={styles.promptMessageInput}
          placeholder={"Enter a user message here"}
        ></textarea>
      </div>
      <div className={styles.promptRemove}>
        <Image
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
