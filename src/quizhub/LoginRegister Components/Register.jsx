import styles from "../quizhub.module.css";
export default function Register() {
  return (
    <div className={styles.registerpopupcontainer}>
      <div style={{ gap: " 4px" }} className={styles.registerpopup}>
        <h1 style={{ textAlign: "center", marginBottom: "12px" }}>Register</h1>
        <span>Email</span>
        <input className={styles.userinputfield} type="text" />
        <span>Password</span>
        <input className={styles.userinputfield} type="text" />
        <span>Confirm Password</span>
        <input className={styles.userinputfield} type="text" />
        <p style={{ fontSize: "12px", margin: "4px" }}>
          By signing up, i agree to the Privacy Policy and the terms of
          Services.
        </p>
        <button className={styles.regbutton}>Register</button>
      </div>
    </div>
  );
}
