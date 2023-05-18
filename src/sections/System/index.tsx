"use client";
import React from "react";
import styles from "./styles.module.css";
import { useRootContext } from "@/context/RootContext";

const System = () => {
  const { updateSystemPrompt, systemPrompt } = useRootContext();

  return (
    <div className={styles.system}>
      <h6 className={styles.heading}>System</h6>
      <textarea
        className={styles.input}
        placeholder="You are a helpful assistant."
        onChange={(e) => updateSystemPrompt(e.target.value)}
        value={systemPrompt.message}
      ></textarea>
    </div>
  );
};

export default System;
