import React from "react";
import styles from "./styles.module.css";

const System = () => {
  return (
    <div className={styles.system}>
      <h6 className={styles.heading}>System</h6>
      <textarea
        className={styles.input}
        placeholder="You are a helpful assistant."
      ></textarea>
    </div>
  );
};

export default System;
