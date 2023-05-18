"use client";
import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRootContext } from "@/context/RootContext";

const Navbar = () => {
  const { setModal } = useRootContext();

  return (
    <div className={styles.navbar}>
      <div className="wrap">
        <div className={styles.navbarInner}>
          <div className={styles.mainLinks}>
            <Link
              className={styles.link}
              href={"https://platform.openai.com/docs"}
              target="_blank"
            >
              Documentation
            </Link>
            <Link
              className={styles.link}
              href={"https://platform.openai.com/docs/api-reference"}
              target="_blank"
            >
              API reference
            </Link>
            <Link
              className={`${styles.link} ${styles.greenLink}`}
              href={"https://platform.openai.com/playground"}
              target="_blank"
            >
              Playground
            </Link>
          </div>
          <div className={styles.sideLink}>
            <span className={styles.link} onClick={() => setModal(true)}>
              Preferences
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
