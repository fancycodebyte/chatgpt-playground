"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRootContext } from "@/context/RootContext";
import Image from "next/image";

const MobileMenu = () => {
  const { mobileMenu, closeMobileMenu, setModal } = useRootContext();
  const [showSub, setShowSub] = useState(true);

  const links = [
    {
      name: "Documentation",
      sublinks: [
        {
          name: "Introduction",
          link: "https://platform.openai.com/docs/introduction"
        },
        {
          name: "Quickstart",
          link: "https://platform.openai.com/docs/quickstart"
        },
        {
          name: "Libraries",
          link: "https://platform.openai.com/docs/libraries"
        },
        {
          name: "Models",
          link: "https://platform.openai.com/docs/models"
        },
        {
          name: "Tutorials",
          link: "https://platform.openai.com/docs/tutorials"
        },
        {
          name: "Policies",
          link: "https://openai.com/policies"
        }
      ]
    },
    {
      name: "Playground",
      link: "/"
    },
    {
      name: "API Reference",
      link: "https://platform.openai.com/docs/api-reference"
    },
    {
      name: "Preferences"
    }
  ];

  const handleClick = (item: any) => {
    if (item.sublinks) {
      setShowSub((prev) => !prev);
    } else if (item.link) {
      location.href = item.link;
      closeMobileMenu;
    } else {
      closeMobileMenu();
      setModal(true);
    }
  };

  return (
    <div
      className={`${styles.mobileMenu} ${
        mobileMenu ? styles.open : styles.close
      }`}
    >
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
          </div>
          <div className={styles.sideLink}>
            <Image
              onClick={closeMobileMenu}
              className={styles.hambergerIcon}
              src="/assets/icons/close-menu.svg"
              alt="menu-btn"
              width={17}
              height={17}
            />
          </div>
        </div>
      </div>
      <div>
        {links.map((i, index) => (
          <div key={index}>
            <div className={styles.mainLink} onClick={() => handleClick(i)}>
              {i.name}
            </div>
            {showSub && i.sublinks && (
              <div>
                {i.sublinks.map((sub, index) => (
                  <div
                    className={styles.subLink}
                    key={index}
                    onClick={() => window.open(sub.link, "_blank")}
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
