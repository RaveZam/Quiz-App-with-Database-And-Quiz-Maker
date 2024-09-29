import styles from "./header.module.css";

export default function Ingameheader() {
  return (
    <div className={styles.ingameheader}>
      <svg
        className={styles.logo}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 480 480"
        fill="%23808"
      >
        <path d="M120 120h120v120H120zM0 240h120v120H0zM120 360h120v120H120zM0 0h120v120H0zM360 120h120v120H360zM240 240h120v120H240zM360 360h120v120H360zM240 0h120v120H240z"></path>
      </svg>

      <h1
        onClick={() => console.log("hello from header")}
        className={styles.ingameheadertitle}
      >
        AnswerIt
      </h1>
    </div>
  );
}
