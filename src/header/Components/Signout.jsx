import styles from "../header.module.css";

export default function Signout() {
  return (
    <div
      style={{ textAlign: "center", padding: "4px", paddingTop: "12px" }}
      className={styles.signout}
    >
      <span style={{ cursor: "pointer" }}>Sign Out</span>
    </div>
  );
}
