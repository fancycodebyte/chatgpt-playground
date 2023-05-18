import React, { FC } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

interface Props {
  setShowModal: (_bool: boolean) => void;
}

const Modal: FC<Props> = ({ setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.overlay}>
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
        <input className={styles.input} placeholder="sk-NhU98cac878..." />
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.clearBtn}`}
            onClick={closeModal}
          >
            Clear Token
          </button>
          <button
            onClick={closeModal}
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
