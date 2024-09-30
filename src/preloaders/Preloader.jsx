import styles from "./preloader.module.css";

export default function Preloader() {
  return (
    <>
      <div className={styles.loadingScreen}>
        <div className={styles.loadingScreen__circle}>
          <div className={styles.loadingScreen__circle__reverse}></div>
        </div>
      </div>
    </>
  );
}
