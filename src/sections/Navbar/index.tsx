"use client";
import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRootContext } from "@/context/RootContext";
import Image from "next/image";

const Navbar = () => {
  const { setModal, openMobileMenu } = useRootContext();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarInner}>
        <div className={styles.mainLinks}>
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            height={24}
            width={24}
            className={styles.logo}
          />
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
            href={"/"}
            target="_blank"
          >
            Playground
          </Link>
        </div>
        <div className={styles.sideLink}>
          <span className={styles.link} onClick={() => setModal(true)}>
            Preferences
          </span>
          <Image
            onClick={openMobileMenu}
            className={styles.hambergerIcon}
            src="/assets/icons/hamburger.svg"
            alt="menu-btn"
            width={26}
            height={26}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
