import { useState } from "react";
import styles from "../header.module.css";

export default function Signout() {
  function clearTokens() {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload();
  }
  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: "4px",
          paddingTop: "12px",
        }}
        className={styles.signout}
      >
        <span onClick={() => clearTokens()} style={{ cursor: "pointer" }}>
          Sign Out
        </span>
      </div>
    </>
  );
}
