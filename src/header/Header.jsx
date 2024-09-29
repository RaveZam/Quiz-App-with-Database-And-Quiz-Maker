import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div>
        <h1
          onClick={() => console.log("hello from header")}
          className={styles.title}
        >
          AnswerIt
        </h1>
      </div>
      <div className={styles.searchsection}>
        <input className={styles.searchbar} type="text" placeholder="Search" />
      </div>
      <div className={styles.accountsection}>
        <div className={styles.noaccount}>
          <button className={styles.btn}> Login </button>
          <button style={{ backgroundColor: "#DD1188" }} className={styles.btn}>
            Sign Up
          </button>

          <img className={styles.icon} src="./images/user.png" alt="" />
        </div>
      </div>
    </div>
  );
}
