import { useState } from "react";
import axios from "axios";
import styles from "../quizhub.module.css";
export default function Login({ setshowLogin, showLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [MismatchedPassword, setMismatchedPassword] = useState(false);
  const [loginbtn, pressregisterbtn] = useState(false);

  function handleSubmit(e) {
    password == passwordagain ? handleLogin(e) : setMismatchedPassword(true);
  }

  function handleLogin(e) {
    e.preventDefault();
    const url = "http://localhost/Quizappdatabase/loginandregister.php";
    let fData = new FormData();
    fData.append("email", email);
    fData.append("password", password);
    fData.append("loginbtn", loginbtn);
    axios
      .post(url, fData)
      .then((responce) => {
        console.log(responce);
        if (responce.data.status === "loginsuccess") {
          //   setEmptylogin(false);
          //   setusernotfound(false);
          //   setincorrectpassword(false);
          console.log("Login success from react");
          localStorage.setItem("email", email);
        } else if (responce.data.status === "empty") {
          //   setEmptylogin(true);
          console.log("Empty");
        } else if (responce.data.status === "incorrectpassword") {
          //   setusernotfound(false);
          //   setEmptylogin(false);
          //   setincorrectpassword(true);
          console.log("Incorrect Password");
        } else if (responce.data.status === "usernotfound") {
          //   setEmptylogin(false);
          //   setusernotfound(true);
          //   setincorrectpassword(false);
          console.log("User not found");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.registerpopupcontainer}>
      <div style={{ gap: " 12px" }} className={styles.registerpopup}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1>Login</h1>
          <button
            onClick={() => setshowLogin(!showLogin)}
            style={{
              padding: "4px",
              margin: "4px",
              transform: "translateX(80px)",
              borderRadius: "20px",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className={styles.userinputfield}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={styles.userinputfield}
          type="text"
          placeholder="Password"
        />
        <input
          onChange={(e) => setPasswordagain(e.target.value)}
          className={styles.userinputfield}
          type="text"
          placeholder="Confirm Password"
        />
        <span
          className={MismatchedPassword ? "" : styles.hidden}
          style={{
            color: "red",
            opacity: "0.9",
            fontSize: "1vw",
            marginLeft: "4px",
          }}
        >
          Mismatched Password
        </span>
        <p style={{ fontSize: "12px", marginLeft: "4px" }}>
          By signing up, i agree to the Privacy Policy and the terms of
          Services.
        </p>
        <button onClick={(e) => handleSubmit(e)} className={styles.regbutton}>
          Login
        </button>
      </div>
    </div>
  );
}
