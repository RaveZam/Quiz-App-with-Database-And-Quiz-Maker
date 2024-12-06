import styles from "../quizhub.module.css";

export default function Errorcomponent({ condition, className, message }) {
  return (
    <>
      <p
        style={{ whiteSpace: "wrap" }}
        className={`${styles.errormsg} ${condition ? className : ""}`}
      >
        {message}
      </p>
    </>
  );
}
