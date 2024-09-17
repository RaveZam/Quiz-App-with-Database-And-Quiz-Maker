import { useReducer, useRef, useState, useEffect } from "react";
import styles from "./astronomy.module.css";
import Ingameheader from "../header/Ingameheader";
import answerclick from "/sounds/answerclick.wav";
import bgmmusic from "/sounds/astronomybgm.mp3";
import success from "/sounds/success.mp3";
import fail from "/sounds/fail.mp3";
import { useParams } from "react-router-dom";

export default function Astronomy({ fastmode, setfastmode }) {
  const clicksound = useRef(null);
  const successsound = useRef(null);
  const failsound = useRef(null);

  const astronomyquestions = [
    {
      id: 1,
      questiontext: "What is the largest planet in the solar system?",
      options: ["Mercury", "Mars", "Jupiter", "Pluto"],
      correctanswer: "Jupiter",
      gif: "./images/astronomygifs/question1gif.gif",
    },
    {
      id: 2,
      questiontext: "What is the closest planet to the Sun?",
      options: ["Earth", "Mercury", "Venus", "Jupiter"],
      correctanswer: "Mercury",
      gif: "./images/astronomygifs/question2gif.gif",
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
  const [showCorrectAnswer, setshowCorrectAnswer] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [optionClicked, setOptionClicked] = useState("");
  const slidetimenumber = fastmode ? 5 : 10;

  // ******* ******************************************** TIMER FUNCTION***************************************************

  const [slideTimer, setSlideTimer] = useState(slidetimenumber);
  const timerRef = useRef();

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setSlideTimer((slideTimer) => {
        if (slideTimer > 0) {
          return slideTimer - 1;
        } else {
          clearInterval(timerRef.current);
          nextSlide();
        }
      });
    }, 1000);
  };

  function nextSlide() {
    setcurrentQuestionIndex(
      (prevcurrentQuestionIndex) => prevcurrentQuestionIndex + 1
    );
    setSlideTimer(slidetimenumber);
    startTimer();
  }

  // *************************************************** TIMER FUNCTION***************************************************

  // *************************************************** BUTTON FUNCTION**************************************************
  function checkcorrectanswer(option) {
    //checks if finished na yung quiz
    clearInterval(timerRef.current);

    setDisabled(true);

    if (currentQuestionIndex == astronomyquestions.length - 1) {
      setTimeout(() => {
        setFinished(true);
      }, 6000);
    }

    //checks if tama yung sagot ni user and sets the score
    if (option == currentquestion.correctanswer) {
      setScore(score + 1);
      setTimeout(() => {
        successsound.current.play();
      }, 3000);
    } else {
      setTimeout(() => {
        failsound.current.play();
      }, 3000);
    }
    setTimeout(() => {
      setshowCorrectAnswer(true);
      setOptionClicked(option);

      setTimeout(() => {
        setcurrentQuestionIndex(currentQuestionIndex + 1);
        setshowCorrectAnswer(false);
        setDisabled(false);
        setOptionClicked(null);
        setSlideTimer(slidetimenumber);
        startTimer();
      }, 3000);
    }, 3000);
  }

  // *************************************************** BUTTON FUNCTION***************************************************

  const [timerpopup, settimerpopup] = useState(true);
  const [timer, setTimer] = useState(3);
  if (timer >= 0) {
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  } else if (timer == -1 && timerpopup) {
    settimerpopup(!timerpopup);
    startTimer();
  }
  return (
    <>
      {timerpopup ? (
        <div className={styles.timercontainer}>
          <h1 className={styles.timer}>{timer == 0 ? "Go!" : timer}</h1>
        </div>
      ) : (
        ""
      )}
      <audio ref={clicksound} src={answerclick} preload="auto" />
      <audio ref={successsound} src={success} preload="auto" />
      <audio ref={failsound} src={fail} preload="auto" />
      {/* <audio src={bgmmusic} autoPlay loop /> */}

      <Ingameheader />
      {/* conditionally irrender yung components if done naba yung quiz or hindi */}

      {finish || currentQuestionIndex == astronomyquestions.length ? (
        // result screen
        <div className={styles.resultscreen}>
          {clearTimeout(timerRef.current)}
          <h1>{score}</h1>
        </div>
      ) : (
        // quiz screen
        <div className={styles.AstronomyQuiz}>
          <div className={styles.questioncontainer}>
            <h1 className={styles.slidetimer}>{slideTimer} Seconds Left!</h1>
            <h1 className={styles.question}>{currentquestion.questiontext}</h1>
            <img
              className={styles.gif}
              src={currentquestion.gif}
              alt="questiongif"
            />
          </div>
          <div className={styles.optionscontainer}>
            <ul className={styles.uloptions}>
              {currentquestion.options.map((option, index) => (
                <button
                  disabled={isDisabled}
                  className={`${styles.optionbuttons} ${
                    styles.optionbuttons1
                  } ${
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
      )}
    </>
  );
}
