import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

export default function Header({
  showRegister,
  setshowRegister,
  searchTerm,
  setSearchTerm,
  showLogin,
  setshowLogin,
}) {
  const navigate = useNavigate();
  function logAccount() {
    const username = localStorage.getItem("email");
    console.log(username);
  }
  return (
    <div className={styles.header}>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          width: "20%",
        }}
      >
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
          className={styles.title}
        >
          AnswerIt
        </h1>
      </div>
      <div className={styles.searchsection}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchbar}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className={styles.accountsection}>
        <div className={styles.account}>
          <button onClick={() => logAccount()}> Log Account </button>
          <button onClick={() => navigate("/Quizmaker")} className={styles.btn}>
            Create Quiz
          </button>
          <button
            onClick={() => setshowLogin(!showLogin)}
            className={styles.btn}
          >
            Login
          </button>
          <button
            onClick={() => setshowRegister(!showRegister)}
            style={{ backgroundColor: "#9405BD", color: "white" }}
            className={styles.btn}
          >
            Sign Up
          </button>
          <img className={styles.icon} src="./images/user.png" alt="" />
        </div>
      </div>
    </div>
  );
}
