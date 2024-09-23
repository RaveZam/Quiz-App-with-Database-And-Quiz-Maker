import styles from "./quiz.module.css";
import answerclick from "/sounds/answerclick.wav";
import bgmmusic from "/sounds/astronomybgm.mp3";

import { useRef } from "react";
let array = null;

export default function Quizquestions({
  slideTimer,
  currentquestion,
  isDisabled,
  showCorrectAnswer,
  optionClicked,
  checkcorrectanswer,
}) {
  const clicksound = useRef(null);
  return (
    <div className={styles.AstronomyQuiz}>
      <audio ref={clicksound} src={answerclick} preload="auto" />
      <audio src={bgmmusic} autoPlay loop />
      <div className={styles.hidden}>
        {(array = JSON.parse(currentquestion.options))}
      </div>
      <div className={styles.questioncontainer}>
        <h1 className={styles.slidetimer}>{slideTimer} Seconds Left!</h1>
        <h1 className={styles.question}>{currentquestion.questions}</h1>
        <img
          className={styles.gif}
          src={currentquestion.gif}
          alt="questiongif"
        />
      </div>
      <div className={styles.optionscontainer}>
        <ul className={styles.uloptions}>
          {array.map((option, index) => (
            <button
              disabled={isDisabled}
              className={`${styles.optionbuttons} ${styles.optionbuttons1} ${
                showCorrectAnswer
                  ? currentquestion.correctanswer == option
                    ? styles.green
                    : styles.darken
                  : ""
              } ${
                optionClicked == option &&
                optionClicked !== currentquestion.correctanswer
                  ? styles.red
                  : ""
              }
            `}
              onClick={() => {
                checkcorrectanswer(option, index);
                clicksound.current.play();
              }}
              key={index}
            >
              {option}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
