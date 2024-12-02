import styles from "./quiz.module.css";
import Imagecomponents from "./Passedimagecomponents";
import { useEffect, useState } from "react";
import Passedimagecomponents from "./Passedimagecomponents";
import Failedimagecomponents from "./Failedimagecomponents";

export default function Result({ navigate, quizQuestions, score, timerRef }) {
  const incorrectanswers = quizQuestions.length - score;
  const incorrectanswerpercentage =
    (incorrectanswers / quizQuestions.length) * 100;
  const correctpercentage = (score / quizQuestions.length) * 100;
  const [quizpassed, setquizpassed] = useState(false);

  useEffect(() => {
    score > quizQuestions.length / 2 ? setquizpassed(true) : "";
  }, []);

  return (
    <div className={styles.resultscreencontainer}>
      {clearTimeout(timerRef.current)}
      {quizpassed ? <Passedimagecomponents /> : <Failedimagecomponents />}
      <div className={styles.resultscreen}>
        <h1>Results:</h1>
        <h1>
          {quizpassed ? "Congratulations!" : "Opps! Better Luck Next Time"}
        </h1>
        <h1>{quizpassed ? "You Have Passed" : "You have Failed"}</h1>
        <h3>User's Score is:</h3>
        <h1>
          {score} / {quizQuestions.length}
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
              <span> {correctpercentage}%</span>
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
              <span>{incorrectanswers} Incorrect answers</span>
              <span> {incorrectanswerpercentage}%</span>
            </div>
          </div>
        </div>
        <button
          className={`${styles.btn} ${styles.btn1}`}
          onClick={() => {
            navigate("/");
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
