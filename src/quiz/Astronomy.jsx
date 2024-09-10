import { useState } from "react";
import styles from "./astronomy.module.css";

export default function Astronomy() {
  const astronomyquestions = [
    {
      id: 1,
      questiontext: "What is the largest planet in the solar system?",
      options: ["Mercury", "Mars", "Jupiter", "Pluto"],
      correctanswer: "Jupiter",
    },
    {
      id: 2,
      questiontext: "What is the closest planet to the Sun?",
      options: ["Earth", "Venus", "Mercury", "Jupiter"],
      correctanswer: "Mercury",
    },
    {
      id: 3,
      questiontext: "What is the largest planet in the solar system",
      options: ["Mercury", "Mars", "Jupiter", "Pluto"],
      correctanswer: "Jupiter",
    },
  ];
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const currentquestion = astronomyquestions[currentQuestionIndex];
  const [score, setScore] = useState(0);
  const [finish, setFinished] = useState(false);

  function checkcorrectanswer(option) {
    //checks if finished na yung quiz
    if (currentQuestionIndex == astronomyquestions.length - 1) {
      console.log("last question");
      setFinished(true);
    }
    //checks if tama yung sagot ni user and sets the score
    if (option == currentquestion.correctanswer) {
      setTimeout(() => {
        setScore(score + 1);
        setcurrentQuestionIndex(currentQuestionIndex + 1);
      }, 3000);
    } else {
      setTimeout(() => {
        setcurrentQuestionIndex(currentQuestionIndex + 1);
      }, 3000);
    }
  }

  return (
    <>
      {/* conditionally irrender yung components if done naba yung quiz or hindi */}
      {finish ? (
        // result screen
        <div className={styles.resultscreen}>
          <h1>{score}</h1>
        </div>
      ) : (
        // quiz screen
        <div className={styles.AstronomyQuiz}>
          <h1>{currentquestion.questiontext}</h1>
          <ul>
            {currentquestion.options.map((option, index) => (
              <button onClick={() => checkcorrectanswer(option)} key={index}>
                {option}
              </button>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
