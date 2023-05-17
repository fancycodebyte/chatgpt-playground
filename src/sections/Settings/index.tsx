"use client";
import React from "react";
import Select from "@/components/Select";
import styles from "./styles.module.css";
import Slider from "@/components/Slider";

const Settings = () => {
  return (
    <div className={styles.settings}>
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
