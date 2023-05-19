"use client";
import React, { useState } from "react";
import RCSlider from "rc-slider";
import styles from "./styles.module.css";
import "rc-slider/assets/index.css";
import { useRootContext } from "@/context/RootContext";

const Slider = () => {
  const { config, updateConfig } = useRootContext();

  return (
    <div>
      <div className={styles.top}>
        <span className={styles.label}>Temperature</span>
        <input
          className={styles.input}
          value={config.temperature}
          type="number"
          min={0}
          max={2}
          onChange={(e) =>
            updateConfig({ temperature: Number(e.target.value) })
          }
        />
      </div>
      <RCSlider
        min={0}
        max={2}
        step={0.01}
        value={config.temperature}
        onChange={(e) => updateConfig({ temperature: e })}
        handleStyle={{
          borderColor: "#c5c5d2",
          background: "white",
          opacity: 1
        }}
        trackStyle={{
          background: "#c5c5d2"
        }}
      />
    </div>
  );
};

export default Slider;
