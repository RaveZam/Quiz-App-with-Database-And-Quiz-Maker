import { useState } from "react";
import axios from "axios";
import styles from "../quizhub.module.css";
import Errorcomponent from "../Components/Errorcomponent";
export default function Register({ setshowRegister, showRegister }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [MismatchedPassword, setMismatchedPassword] = useState(false);
  const [registerbtn, pressregisterbtn] = useState(false);

  const [registersuccess, setregisterSuccess] = useState(false);
  const [emptyLogin, setEmptylogin] = useState(false);
  const [invalidEmail, setinvalidEmail] = useState(false);
  const [usernotfound, setusernotfound] = useState(false);
  const [emailTaken, setEmailtaken] = useState(false);
  const [usernameTaken, setUsernametaken] = useState(false);
  const [weakpassword, setweakpassword] = useState(false);
  const [emptyinputs, setemptyinputs] = useState(false);

  function handleSubmit(e) {
    email && password && username && passwordagain == ""
      ? ""
      : setemptyinputs(true);
    password == passwordagain
      ? handleRegister(e)
      : setMismatchedPassword(true) &
        setemptyinputs(false) &
        setUsernametaken(false);
  }

  function handleRegister(e) {
    setMismatchedPassword(false);
    setemptyinputs(false);
    e.preventDefault();
    const url = "http://localhost/Quizappdatabase/loginandregister.php";
    let fData = new FormData();
    fData.append("email", email);
    fData.append("username", username);
    fData.append("password", password);
    fData.append("registerbtn", registerbtn);
    axios
      .post(url, fData)
      .then((responce) => {
        if (responce.data.status === "emailtaken") {
          console.log("emailtaken");
          setEmailtaken(true);
          setweakpassword(false);
        } else if (responce.data.status === "invalidemail") {
          console.log("invalidemail");
          setinvalidEmail(true);
          setweakpassword(false);
        } else if (responce.data.status === "emptyfields") {
          console.log("emptyfields");
          console.log(username);
          console.log(password);
          console.log(password);
          setEmailtaken(false);
          setweakpassword(false);
          setemptyinputs(true);
        } else if (responce.data.status === "weakpassword") {
          setweakpassword(true);
          console.log("weakpassword");
        } else if (responce.data.status === "usernametaken") {
          setUsernametaken(true);
          setEmailtaken(false);
          console.log("username taken");
        } else if (responce.data.status === "registersuccess") {
          console.log("registersuccess");
          localStorage.setItem("email", email);
          setMismatchedPassword(false);
          setweakpassword(false);
          setUsernametaken(false);
          setEmail("");
          setUsername("");
          setPassword("");
          setPasswordagain("");
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
          <h1>Register</h1>
          <button
            onClick={() => setshowRegister()}
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
          value={email}
          required
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          className={styles.userinputfield}
          value={username}
          type="text"
          placeholder="Username"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={styles.userinputfield}
          type="text"
          placeholder="Password"
          value={password}
          required
        />
        <input
          onChange={(e) => setPasswordagain(e.target.value)}
          className={styles.userinputfield}
          type="text"
          placeholder="Confirm Password"
          required
          value={passwordagain}
        />
        <Errorcomponent
          condition={MismatchedPassword}
          className={styles.mismatch}
          message="Password Does not match"
        />
        <Errorcomponent
          condition={registersuccess}
          className={styles.showregsuccess}
          message="Account has been Created, Please Proceed to Login Window!"
        />
        <Errorcomponent
          condition={usernameTaken}
          className={styles.mismatch}
          message="Username is Taken"
        />
        <Errorcomponent
          condition={emptyinputs}
          className={styles.showinvalidemail}
          message="Please Enter All Details"
        />
        <Errorcomponent
          condition={invalidEmail}
          className={styles.showinvalidemail}
          message="Invalid Email"
        />
        <Errorcomponent
          condition={emailTaken}
          className={styles.showemailtaken}
          message="Email Already Exists"
        />
        <Errorcomponent
          condition={weakpassword}
          className={styles.showweakpassword}
          message="Password must contain atleast one Uppercase,Lowercase and Number"
        />
        <p style={{ fontSize: "12px", marginLeft: "4px" }}>
          By signing up, i agree to the Privacy Policy and the terms of
          Services.
        </p>
        <button onClick={(e) => handleSubmit(e)} className={styles.regbutton}>
          Register
        </button>
      </div>
    </div>
  );
}
