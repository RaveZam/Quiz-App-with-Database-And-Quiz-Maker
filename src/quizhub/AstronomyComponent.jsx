import styles from "./quizhub.module.css";

export default function AstronomyComponent({ navigate }) {
  function showprestart() {}

  let quizname = "Astronomy Quiz";

  return (
    <>
      <div className={styles.quizcontainer}>
        <div className={styles.quizbg}>
          <img
            className={styles.quizbgimg}
            src="./images/astronomy.webp"
            alt=""
          />
        </div>

        <div className={styles.quiztxtdescription}>
          <h1 className={styles.quiztitle}> {quizname}</h1>
          <p className={styles.quizdesc}>
            Anything about space and whats beyond the skies.
          </p>
          <button onClick={() => navigate("/Astronomy")} className={styles.btn}>
            Take Quiz
          </button>
        </div>
      </div>
      {/* ////////// */}
      <div className={styles.overlay}>
        <img src="" alt="" /> test test
        <div className={styles.popup}>
          <div className={styles.imagewrapper}>
            <img src="./images/astronomy.webp" alt="" />
          </div>
          <div className={styles.popupinfo}>
            <h1>{quizname}</h1>
            <span>Made By: Runielle Raven </span>
            <span className={styles.difficulty}>Difficulty Level: </span>
            <span>10 Questions </span>
            <button className={styles.btn}>Play</button>
          </div>
        </div>
      </div>
    </>
  );
}
