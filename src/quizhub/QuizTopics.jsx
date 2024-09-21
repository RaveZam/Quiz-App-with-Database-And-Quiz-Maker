import { Form, useActionData } from "react-router-dom";
import styles from "./quizhub.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../quiz/Quiz";
import axios from "axios";

export default function QuizTopics({
  fastmode,
  setfastmode,
  quizname,
  quizdesc,
  quizbg,
  madeby,
  quizdatabase,
}) {
  const [popup, showpopup] = useState(false);
  const [gamestart, setgamestart] = useState(false);
  const navigate = useNavigate();

  function showprestart() {
    showpopup(true);
    // console.log(quizdatabase);
  }
  function setphpdatabase() {}

  return (
    <>
      <div className={styles.quizcontainer}>
        <div className={styles.quizbg}>
          <img className={styles.quizbgimg} src={quizbg} alt="" />
        </div>

        <div className={styles.quiztxtdescription}>
          <h1 className={styles.quiztitle}> {quizname}</h1>

          <p className={styles.quizdesc}>{quizdesc}</p>

          <button
            onClick={() => showprestart()}
            className={`${styles.btn} ${styles.btn1}`}
          >
            Take Quiz
          </button>
        </div>
      </div>
      {popup ? (
        <div className={styles.overlay}>
          <div className={`${styles.popup} ${popup ? styles.slide : ""}`}>
            <div className={styles.imagewrapper}>
              <img
                onClick={() => showpopup(false)}
                className={styles.close}
                src="./images/cancel.png"
                alt="cancel"
              />
              <img className={styles.popupbg} src={quizbg} alt="" />
            </div>
            <div className={styles.popupinfo}>
              <h1>{quizname}</h1>
              <span>Made By: {madeby} </span>
              <span className={styles.difficulty}>Difficulty Level: </span>
              <span>Questions: 10 </span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "0.7vw",
                  color: "red",
                  marginTop: "4px",
                  marginBottom: "4px",
                }}
              >
                10 Seconds to answer Each Questions!{" "}
              </span>

              <div
                style={{ marginBottom: "4px" }}
                className={styles.switchcontainer}
              >
                <span className={styles.seconds}> 5 Second Mode:</span>
                <label className={styles.switch}>
                  <input
                    onClick={() => setfastmode(!fastmode)}
                    className={styles.checkbox}
                    type="checkbox"
                  />
                  <span className={styles.slider} />
                </label>
              </div>
              <button
                onClick={() => setphpdatabase() & navigate("/Quiz")}
                className={styles.startbtn}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
