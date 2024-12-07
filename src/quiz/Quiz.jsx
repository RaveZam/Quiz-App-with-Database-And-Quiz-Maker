import { useReducer, useRef, useState, useEffect } from "react";
import styles from "./quiz.module.css";
import Ingameheader from "../header/Ingameheader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Result from "./Result";
import Quizquestions from "./Quizquestions";
import Timerscreen from "./Timerscreen";
import success from "/sounds/success.mp3";
import fail from "/sounds/fail.mp3";
import Preloader from "../preloaders/Preloader";

export default function Quiz({ fastmode, database }) {
  // This part is only for the preloader
  const [loading, isLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        isLoading(false);
      }, 500);
    }, 1200);
  }, []);

  const navigate = useNavigate();

  // This Part Saves what quiz is on refresh as a string
  useEffect(() => {
    if (database) {
      localStorage.setItem("database", database);
    }
  }, [database]);

  const [quizQuestions, setquizQuestions] = useState([]);

  const url = "http://localhost/Quizappdatabase/fetch.php";
  useEffect(() => {
    const storedDatabase = localStorage.getItem("database"); // finds the database string where it exists in the quiz database table.
    let fData = new FormData();
    fData.append("database", storedDatabase);
    axios
      .post(url, fData)
      .then((response) => {
        setquizQuestions(response.data); // this automatically receives the response that is encoded from php.
      })
      .catch((error) => {
        console.log("Error posting data:", error);
      });
  }, [database]);

  const [score, setScore] = useState(0);
  const [finish, setFinished] = useState(false);

  const [showCorrectAnswer, setshowCorrectAnswer] = useState(false);

  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const currentquestion = quizQuestions[currentQuestionIndex];

  const [isDisabled, setDisabled] = useState(false);

  const [optionClicked, setOptionClicked] = useState(""); // Records the Selected Option to compare the right answer

  const successsound = useRef(null);
  const failsound = useRef(null);

  // ******* ******************************************** TIMER FUNCTION***************************************************

  const slidetimenumber = fastmode ? 5 : 10;
  const [slideTimer, setSlideTimer] = useState(slidetimenumber);
  const timerRef = useRef();

  // The Timer Function
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

  // *************************************************** UPLOAD SCORE ***************************************************

  const UploadScore = (finalscore) => {
    if (finalscore > 0) {
      const username = localStorage.getItem("username");
      const TheDatabase = localStorage.getItem("database");
      setreadyToFetch(true);
      console.log("Setted the Ready to Fetch State to true");

      const ScoreUrl = "http://localhost/Quizappdatabase/uploadscore.php";
      let scoreData = new FormData();
      scoreData.append("username", username);
      console.log(
        finalscore + ": This is the final score before inserting to SQL"
      );
      scoreData.append("score", finalscore); // Use finalscore here
      scoreData.append("TheDatabase", TheDatabase);
      axios
        .post(ScoreUrl, scoreData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error posting data:", error);
        });
    } else {
      console.log("dodge first tick");
    }
  };

  // *************************************************** UPLOAD SCORE ***************************************************

  // *************************************************** BUTTON FUNCTION**************************************************

  function checkcorrectanswer(option) {
    clearInterval(timerRef.current); // pauses the timer when user picks an option
    setDisabled(true); // disable buttons while a question is picked

    if (currentQuestionIndex == quizQuestions.length - 1) {
      setTimeout(() => {
        // UploadScore(score); // Pass the updated score here
        setFinished(true);
      }, 6000);
    }

    // Checks if the correct answer is chosen depending on the option that is selected
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
      setTimeout(() => {
        const speakcorrectanswer = new SpeechSynthesisUtterance(
          currentquestion.correctanswer
        );
        window.speechSynthesis.speak(speakcorrectanswer);
      }, 500);

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
  const [timer, setTimer] = useState(1);
  const [canspeak, setcanspeak] = useState(false);

  // CountDown
  if (timer >= 0) {
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  } else if (timer == -1 && timerpopup) {
    settimerpopup(!timerpopup);
    setcanspeak(true);
    startTimer();
  }

  // *************************************************** USE EFFECT TO UPLOAD SCORE ***************************************************

  const [readyToFetch, setreadyToFetch] = useState(false);
  useEffect(() => {
    if (finish) {
      UploadScore(score);
    }
  }, [score, finish]);

  return (
    <>
      {loading ? (
        <div
          style={{
            opacity: opacity,
            transition: "all 0.3s ease-in-out",
            position: "absolute",
            height: "100vh",
            backgroundColor: "#2e1736",
          }}
        >
          <Preloader />
        </div>
      ) : (
        ""
      )}
      <>
        <audio ref={successsound} src={success} preload="auto" />
        <audio ref={failsound} src={fail} preload="auto" />
        <Timerscreen timerpopup={timerpopup} timer={timer} />
        <Ingameheader />
        {finish || currentQuestionIndex == quizQuestions.length ? (
          <Result
            readyToFetch={readyToFetch}
            setreadyToFetch={setreadyToFetch}
            quizQuestions={quizQuestions}
            score={score}
            timerRef={timerRef}
            navigate={navigate}
          />
        ) : (
          <Quizquestions
            slideTimer={slideTimer}
            currentQuestionIndex={currentQuestionIndex}
            currentquestion={currentquestion}
            isDisabled={isDisabled}
            showCorrectAnswer={showCorrectAnswer}
            optionClicked={optionClicked}
            checkcorrectanswer={checkcorrectanswer}
            canspeak={canspeak}
          />
        )}
      </>
    </>
  );
}
