import React from "react";
import styles from "./styles.module.css";
import { useRootContext } from "@/context/RootContext";
import Image from "next/image";

const Error = () => {
  const { error } = useRootContext();

  return (
    <div className={styles.error}>
      <span className={styles.errorIcon}>
        <Image
          src="/assets/icons/error.svg"
          alt="error"
          height={22}
          width={22}
        />
      </span>
      <p className={styles.errorText}>{error}</p>
    </div>
  );
};

export default Error;
