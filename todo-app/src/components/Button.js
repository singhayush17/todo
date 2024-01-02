import React from "react";
import styles from "../styles/modules/button.module.scss";

function Button({ children, type }) {
  return (
    <button
      className={styles.button1}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}
function Button2({ children, type }) {
  return (
    <button
      className={styles.button2}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}

function SelectButton({ children }) {
  return <select className={styles.button2__select}>{children}</select>;
}

export default Button;
export { SelectButton, Button2 };
