import styles from "./quiz.module.css";
import Imagecomponents from "./Imagecomponents";

export default function Result({
  navigate,
  astronomyquestions,
  score,
  timerRef,
}) {
  return (
    <div className={styles.resultscreencontainer}>
      {clearTimeout(timerRef.current)}
      <Imagecomponents />
      <div className={styles.resultscreen}>
        <h1>Results:</h1>
        <h1>Congratulations!</h1>
        <h1>You Have Passed</h1>
        <h3>Runielle Raven's Score is:</h3>
        <h1>
          {score} / {astronomyquestions.length}
        </h1>
        <div className={styles.scorescontainer}>
          <div className={styles.correctanswers}>
            <div className={styles.iconimgcontainer}>
              <img
                className={styles.icon}
                src="./images/check.png"
                alt="check"
              />
            </div>
            <div className={styles.txtcontainer}>
              <span> {score} Correct answers</span>
              <span> 20%</span>
            </div>
          </div>
          <div className={styles.incorrectanswers}>
            <div className={styles.iconimgcontainer}>
              <img
                className={styles.icon}
                src="./images/close.png"
                alt="close"
              />
            </div>
            <div className={styles.txtcontainer}>
              <span> {score} Incorrect answers</span>
              <span> 20%</span>
            </div>
          </div>
        </div>
        <button
          className={`${styles.btn} ${styles.btn1}`}
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          Finsh{" "}
        </button>
      </div>
    </div>
  );
}
