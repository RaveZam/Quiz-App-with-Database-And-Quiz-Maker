import { useState } from "react";
import axios from "axios";
import styles from "../quizhub.module.css";
import Errorcomponent from "../Components/Errorcomponent";
export default function Register({ setshowRegister, showRegister }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [registerbtn, pressregisterbtn] = useState(false);
  const [registersuccess, setregisterSuccess] = useState(false);

  const [EverythingIsEmpty, setEverythingIsEmpty] = useState(false);

  const [InvalidEmail, setInvalidEmail] = useState(false);
  const [EmailTaken, setEmailTaken] = useState(false);
  const [UsernameTaken, setUsernameTaken] = useState(false);
  const [WeakPassword, setWeakPassword] = useState(false);

  const [MismatchedPassword, setMismatchedPassword] = useState(false);

  function handleSubmit(e) {
    if (
      email === "" ||
      username === "" ||
      password === "" ||
      passwordagain === ""
    ) {
      setEverythingIsEmpty(true);
    } else {
      setEverythingIsEmpty(false);
      handleRegister(e);
    }
  }

  function handleRegister(e) {
    setInvalidEmail(false);
    setEmailTaken(false);
    setUsernameTaken(false);
    e.preventDefault();

    if (password !== passwordagain) {
      setMismatchedPassword(true);
    } else {
      setMismatchedPassword(false);
      const url = "http://localhost/Quizappdatabase/loginandregister.php";
      let fData = new FormData();
      fData.append("email", email);
      fData.append("username", username);
      fData.append("password", password);
      fData.append("registerbtn", registerbtn);
      axios
        .post(url, fData)
        .then((responce) => {
          if (responce.data.status === "invalidemail") {
            setInvalidEmail(true);
            console.log("Invalid Email");
          } else if (responce.data.status === "emailtaken") {
            setInvalidEmail(false);
            setEmailTaken(true);
          } else if (responce.data.status === "usernametaken") {
            setEmailTaken(false);
            setUsernameTaken(true);
          } else if (responce.data.status === "weakpassword") {
            setUsernameTaken(false);
            setWeakPassword(true);
          } else if (responce.data.status === "registersuccess") {
            setWeakPassword(false);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            window.location.reload();
          }
        })
        .catch((error) => console.log(error));
    }
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
          condition={EverythingIsEmpty}
          className={styles.showinvalidemail}
          message="Please Enter All Details"
        />
        <Errorcomponent
          condition={InvalidEmail}
          className={styles.showinvalidemail}
          message="Invalid Email Format"
        />
        <Errorcomponent
          condition={EmailTaken}
          className={styles.showinvalidemail}
          message="Email is Already Taken"
        />
        <Errorcomponent
          condition={UsernameTaken}
          className={styles.showinvalidemail}
          message="Username is Already Taken"
        />
        <Errorcomponent
          condition={MismatchedPassword}
          className={styles.showinvalidemail}
          message="Password Does Not Match"
        />
        <Errorcomponent
          condition={WeakPassword}
          className={styles.showinvalidemail}
          message="Password Must Contain Atleast One Uppercase,Lowercase and a Number"
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
