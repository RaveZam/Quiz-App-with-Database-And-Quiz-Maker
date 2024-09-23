import { useReducer, useRef, useState, useEffect } from "react";
import styles from "./quiz.module.css";
import Ingameheader from "../header/Ingameheader";
import answerclick from "/sounds/answerclick.wav";
import bgmmusic from "/sounds/astronomybgm.mp3";
import success from "/sounds/success.mp3";
import fail from "/sounds/fail.mp3";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Result from "./Result";
import Quizquestions from "./Quizquestions";

export default function Quiz({ fastmode, database }) {
  const clicksound = useRef(null);
  const successsound = useRef(null);
  const failsound = useRef(null);
  const navigate = useNavigate();
  const url = "http://localhost/Quizappdatabase/fetch.php";
  const [astronomyquestions, setastronomyquestions] = useState([]);

  useEffect(() => {
    if (database) {
      localStorage.setItem("database", database);
    }
  }, [database]);

  useEffect(() => {
    const storedDatabase = localStorage.getItem("database");
    let fData = new FormData();
    fData.append("database", storedDatabase);
    axios
      .post(url, fData)
      .then((response) => {
        setastronomyquestions(response.data);
      })
      .catch((error) => {
        console.log("Error posting data:", error);
      });
  }, [database]);

  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const currentquestion = astronomyquestions[currentQuestionIndex];
  let array = null;
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
      {/* <audio ref={bgref} src={bgmmusic} autoPlay loop /> */}
      <Ingameheader />
      {finish || currentQuestionIndex == astronomyquestions.length ? (
        <Result
          astronomyquestions={astronomyquestions}
          score={score}
          timerRef={timerRef}
          navigate={navigate}
        />
      ) : (
        <Quizquestions
          slideTimer={slideTimer}
          astronomyquestions={astronomyquestions}
          currentQuestionIndex={currentQuestionIndex}
          currentquestion={currentquestion}
          array={array}
          isDisabled={isDisabled}
          showCorrectAnswer={showCorrectAnswer}
          optionClicked={optionClicked}
        />
      )}
    </>
  );
}
