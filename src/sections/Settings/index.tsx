"use client";
import React from "react";
import Select from "@/components/Select";
import styles from "./styles.module.css";
import Slider from "@/components/Slider";
import { useRootContext } from "@/context/RootContext";

const Settings = () => {
  const { settingsSidebar, closeSettingsSidebar } = useRootContext();

  return (
    <div className={styles.settings} onClick={(e) => e.stopPropagation()}>
      <button className={styles.sidebarCloseBtn} onClick={closeSettingsSidebar}>
        ×
      </button>
      <div className={styles.select}>
        <Select label="Model" />
      </div>
      <div className={styles.slider}>
        <Slider />
      </div>
    </div>
  );
};

export default Settings;
