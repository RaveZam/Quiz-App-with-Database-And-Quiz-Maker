import { useState } from "react";
import axios from "axios";
import styles from "../quizhub.module.css";
import Errorcomponent from "../Components/Errorcomponent";
export default function Login({ setshowLogin, showLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [MismatchedPassword, setMismatchedPassword] = useState(false);
  const [loginbtn, pressregisterbtn] = useState(false);
  const [emptyLogin, setEmptylogin] = useState(false);
  const [incorrectpassword, setincorrectpassword] = useState(false);
  const [usernotfound, setusernotfound] = useState(false);

  function handleSubmit(e) {
    password == passwordagain
      ? handleLogin(e)
      : setMismatchedPassword(true) &
        setincorrectpassword(false) &
        setEmptylogin(false);
  }

  function handleLogin(e) {
    console.log(username);
    console.log(password);
    e.preventDefault();
    const url = "http://localhost/Quizappdatabase/loginandregister.php";
    let fData = new FormData();
    fData.append("username", username);
    fData.append("password", password);
    fData.append("loginbtn", loginbtn);
    axios
      .post(url, fData)
      .then((responce) => {
        console.log(responce);
        if (responce.data.status === "loginsuccess") {
          setEmptylogin(false);
          setusernotfound(false);
          setincorrectpassword(false);
          setMismatchedPassword(false);
          console.log("Login success from react");
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          setUsername("");
          setPassword("");
          setPasswordagain("");
          window.location.reload();
        } else if (responce.data.status === "empty") {
          setEmptylogin(true);
          console.log("Empty");
        } else if (responce.data.status === "incorrectpassword") {
          setusernotfound(false);
          setEmptylogin(false);
          setMismatchedPassword(false);
          setincorrectpassword(true);
          console.log("Incorrect Password");
        } else if (responce.data.status === "usernotfound") {
          setEmptylogin(false);
          setusernotfound(true);
          setMismatchedPassword(false);
          setincorrectpassword(false);
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
          onChange={(e) => setUsername(e.target.value)}
          className={styles.userinputfield}
          type="text"
          placeholder="Username"
          value={username}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={styles.userinputfield}
          type="text"
          placeholder="Password"
          value={password}
        />
        <input
          onChange={(e) => setPasswordagain(e.target.value)}
          className={styles.userinputfield}
          type="text"
          placeholder="Confirm Password"
          value={passwordagain}
        />
        <Errorcomponent
          condition={emptyLogin}
          className={styles.showemptymsg}
          message="Please Input Username and Password"
        />
        <Errorcomponent
          condition={MismatchedPassword}
          className={styles.mismatch}
          message="Password Does not match"
        />
        <Errorcomponent
          condition={incorrectpassword}
          className={styles.showincorrectpassword}
          message="Incorrect Password"
        />
        <Errorcomponent
          condition={usernotfound}
          className={styles.showusernotfound}
          message="Username Does not Exist"
        />

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
