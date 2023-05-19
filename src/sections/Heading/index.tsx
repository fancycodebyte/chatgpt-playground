"use client";
import React from "react";
import styles from "./styles.module.css";
import { useRootContext } from "@/context/RootContext";
import Image from "next/image";

const Heading = () => {
  const { openSettingsSidebar } = useRootContext();

  return (
    <div className={styles.heading}>
      <div className={styles.headingInner}>
        <p className={styles.headingText}>Playground</p>
        <button
          onClick={openSettingsSidebar}
          className={styles.openSettingsBtn}
        >
          <span className={styles.gearIconWrap}>
            <Image
              src="/assets/icons/gear.svg"
              alt="gear"
              height={14}
              width={14}
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Heading;
