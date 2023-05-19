import React from "react";
import styles from "./styles.module.css";
import System from "../System";
import Settings from "../Settings";
import Prompts from "../Prompts";

const MainSection = () => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.system}>
        <System />
      </div>
      <div className={styles.separator}></div>
      <div className={styles.prompts}>
        <Prompts />
      </div>
      <div className={styles.settings}>
        <Settings />
      </div>
    </div>
  );
};

export default MainSection;
