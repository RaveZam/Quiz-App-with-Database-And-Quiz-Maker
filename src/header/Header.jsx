import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import Signout from "./Components/Signout";
import { useState } from "react";

export default function Header({
  showRegister,
  setshowRegister,
  searchTerm,
  setSearchTerm,
  showLogin,
  setshowLogin,
}) {
  const navigate = useNavigate();
  const [showsignout, setshowsignout] = useState(true);
  const username = localStorage.getItem("username");

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
        <h1 className={styles.title}>AnswerIt</h1>
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
      <div>
        {username === "" ? (
          <div className={styles.accountsection}>
            <div className={styles.account}>
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
        ) : (
          <div
            style={{
              display: "flex",
              marginRight: "16px",
            }}
          >
            <button
              style={{
                height: "20%",
                marginTop: "8px",
                backgroundColor: "#9405BD",
                marginRight: "12px",
              }}
              onClick={() => navigate("/Quizmaker")}
              className={styles.btn}
            >
              Create Quiz
            </button>
            <h1 style={{ color: "white", fontSize: "2vw" }}> {username} </h1>
            <img
              onClick={() => setshowsignout(!showsignout)}
              style={{
                width: "48px",
                transform: "translateY(0px)",
                cursor: "pointer",
              }}
              className={styles.icon}
              src="./images/user.png"
              alt=""
            />
            <div style={showsignout ? { display: "none" } : {}}>
              <Signout />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
