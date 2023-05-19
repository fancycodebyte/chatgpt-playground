"use client";
import React from "react";
import styles from "./styles.module.css";
import System from "../System";
import Settings from "../Settings";
import Prompts from "../Prompts";
import { useRootContext } from "@/context/RootContext";

const MainSection = () => {
  const { settingsSidebar, closeSettingsSidebar } = useRootContext();

  return (
    <div className={styles.mainSection}>
      <div className={styles.system}>
        <System />
      </div>
      <div className={styles.separator}></div>
      <div className={styles.prompts}>
        <Prompts />
      </div>
      <div
        onClick={closeSettingsSidebar}
        className={`${styles.settings} ${
          settingsSidebar ? styles.showSidebar : styles.hideSidebar
        }`}
      >
        <Settings />
      </div>
    </div>
  );
};

export default MainSection;
