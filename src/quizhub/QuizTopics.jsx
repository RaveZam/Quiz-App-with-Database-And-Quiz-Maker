import { Form, useActionData } from "react-router-dom";
import styles from "./quizhub.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../quiz/Quiz";
import axios from "axios";

export default function QuizTopics({
  fastmode,
  setfastmode,
  setDatabase,
  quizname,
  quizdesc,
  quizbg,
  madeby,
  quizdatabase,
  slide,
  difficulty,
}) {
  const [popup, showpopup] = useState(false);
  const [gamestart, setgamestart] = useState(false);
  const navigate = useNavigate();

  function showprestart() {
    showpopup(true);
  }
  function setphpdatabase() {
    setDatabase(quizdatabase);
  }

  const longText = quizdesc;
  const maxLength = 30;

  return (
    <>
      <div className={styles.quizcontainer}>
        <div onClick={() => showprestart()} className={styles.quizbg}>
          <img className={styles.quizbgimg} src={quizbg} alt="" />
          <button className={styles.overlaybutton}> Play Now</button>
        </div>
        <div className={styles.quiztxtdescription}>
          <h1
            style={{ fontWeight: "300", color: "white" }}
            className={styles.quiztitle}
          >
            {quizname}
          </h1>
          <span
            style={{
              whiteSpace: "nowrap",
              color: "#B59CBA",
              fontSize: "0.9vw",
            }}
          >
            <p>
              {longText.length > maxLength
                ? longText.substring(0, maxLength) + "..."
                : longText}
            </p>
          </span>
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              color: "#B59CBA",
              fontSize: "0.8vw",
              marginTop: "1px",
              opacity: "0.9",
            }}
          >
            <p style={{ marginRight: "4px" }}> Difficulty: {difficulty} </p>
            <p className={styles.quizdesc}>{slide} Questions</p>
          </div>
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
