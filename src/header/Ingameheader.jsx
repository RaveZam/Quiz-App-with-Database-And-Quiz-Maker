import styles from "./header.module.css";

export default function Ingameheader() {
  return (
    <div className={styles.ingameheader}>
      <h1
        onClick={() => console.log("hello from header")}
        className={styles.ingameheadertitle}
      >
        AnswerIt
      </h1>
    </div>
  );
}
