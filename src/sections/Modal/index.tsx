"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRootContext } from "@/context/RootContext";

const Modal = () => {
  const { modal, setModal, addToken, clearToken, token } = useRootContext();
  const [api, setApi] = useState(token);

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    setApi(token);
  }, [token]);

  return (
    <div
      className={styles.overlay}
      style={{ display: modal ? "flex" : "none" }}
    >
      <div className={styles.modal}>
        <span className={styles.close} onClick={closeModal}>
          <Image
            src="/assets/icons/close.svg"
            alt="close"
            width={20}
            height={20}
          />
        </span>
        <h1 className={styles.heading}>Your API token</h1>
        <p className={styles.text}>
          You can get your API token from the{" "}
          <a
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
          >
            OpenAI dashboard
          </a>
          . All requests are made on the client side, so your token is never
          sent to the server. If you would like more information look at the
          Github Repository!
        </p>
        <input
          value={api}
          onChange={(e) => setApi(e.target.value)}
          className={styles.input}
          placeholder="sk-NhU98cac878..."
        />
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.clearBtn}`}
            onClick={() => {
              clearToken();
              closeModal();
            }}
          >
            Clear Token
          </button>
          <button
            onClick={() => {
              addToken(api);
              closeModal();
            }}
            className={`${styles.btn} ${styles.addBtn}`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
