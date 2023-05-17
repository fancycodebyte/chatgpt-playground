"use client";
import React, { useState } from "react";
import RCSlider from "rc-slider";
import styles from "./styles.module.css";
import "rc-slider/assets/index.css";

const Slider = () => {
  const [value, setValue] = useState<any>(0.5);

  return (
    <div>
      <div className={styles.top}>
        <span className={styles.label}>Temperature</span>
        <input
          className={styles.input}
          value={value}
          type="number"
          min={0}
          max={1}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
      <RCSlider
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => setValue(e)}
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
