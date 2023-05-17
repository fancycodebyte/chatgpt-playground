import React from "react";
import styles from "./styles.module.css";

const Heading = () => {
  return (
    <div className={styles.heading}>
      <div className="wrap">
        <div className={styles.headingInner}>
          <p className={styles.headingText}>Playground</p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
