import { useState } from "react";
import styles from "../quizhub.module.css";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [MismatchedPassword, setMismatchedPassword] = useState(false);
  function handleSubmit(e) {
    password == passwordagain ? handleRegister(e) : setMismatchedPassword(true);
    console.log(MismatchedPassword);
  }
  function handleRegister(e) {
    console.log(MismatchedPassword);
    setMismatchedPassword(false);
    e.preventDefault();
    const url = "http://localhost/Quizappdatabase/loginandregister.php";
    let fData = new FormData();
    fData.append("email", email);
    fData.append("password", password);
    fData.append("registerbtn", registerbtn);
    axios
      .post(url, fData)
      .then((responce) => {
        if (responce.data.status === "emailavail") {
          console.log("Email Avail");
        } else if (responce.data.status === "emailtaken") {
          console.log("emailtaken");
          setEmailtaken(true);
        } else if (responce.data.status === "invalidemail") {
          console.log("invalidemail");
          setinvalidEmail(true);
        } else if (responce.data.status === "weakpassword") {
          setEmailtaken(false);
          console.log("weakpassword");
          setweakpassword(true);
        } else if (responce.data.status === "strongpassword") {
          console.log("weakpassword");
        } else if (responce.data.status === "registersuccess") {
          console.log("registersuccess");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.registerpopupcontainer}>
      <div style={{ gap: " 12px" }} className={styles.registerpopup}>
        <h1 style={{ textAlign: "center", marginBottom: "12px" }}>Register</h1>

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
          Register
        </button>
      </div>
    </div>
  );
}
