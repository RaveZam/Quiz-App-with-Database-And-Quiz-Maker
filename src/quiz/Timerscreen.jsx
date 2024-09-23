import styles from "./quiz.module.css";

export default function Timerscreen({ timerpopup, timer }) {
  return (
    <>
      {timerpopup ? (
        <div className={styles.timercontainer}>
          <h1 className={styles.timer}>{timer == 0 ? "Go!" : timer}</h1>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
