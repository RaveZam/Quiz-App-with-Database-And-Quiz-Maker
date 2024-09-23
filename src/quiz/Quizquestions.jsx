import styles from "./quiz.module.css";

export default function Quizquestions({
  astronomyquestions,
  array,
  slideTimer,
  currentquestion,
  isDisabled,
  showCorrectAnswer,
  optionClicked,
}) {
  return (
    <div className={styles.AstronomyQuiz}>
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
