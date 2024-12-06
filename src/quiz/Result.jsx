import styles from "./quiz.module.css";
import Imagecomponents from "./Passedimagecomponents";
import { useEffect, useState } from "react";
import Passedimagecomponents from "./Passedimagecomponents";
import Failedimagecomponents from "./Failedimagecomponents";
import { FaTrophy } from "react-icons/fa6";

import axios from "axios";

export default function Result({
  navigate,
  quizQuestions,
  score,
  timerRef,
  readyToFetch,
}) {
  const incorrectanswers = quizQuestions.length - score;
  const incorrectanswerpercentage =
    (incorrectanswers / quizQuestions.length) * 100;
  const correctpercentage = (score / quizQuestions.length) * 100;
  const [quizpassed, setquizpassed] = useState(false);

  const username = localStorage.getItem("username");
  const database = localStorage.getItem("database");
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    score >= quizQuestions.length / 2 ? setquizpassed(true) : "";
    if (readyToFetch == true) {
      const url = "http://localhost/Quizappdatabase/fetchleaderboards.php";
      let fData = new FormData();
      fData.append("username", username);
      fData.append("database", database);
      axios
        .post(url, fData)
        .then((responce) => setLeaderboards(responce.data))
        .catch((error) => console.log(error));
    } else {
      null;
    }
  }, [readyToFetch]);

  return (
    <div className={styles.resultscreencontainer}>
      {clearTimeout(timerRef.current)}

      <div style={{ paddingTop: "16px" }} className={styles.resultscreen}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              alignItems: "center",
              marginRight: "12px",
            }}
          >
            <h1 style={{ color: "white" }}>
              {quizpassed ? "Congratulations!" : "Better Luck Next Time!"}
            </h1>
            <h1 style={{ color: "white", marginBottom: "8px" }}>
              {quizpassed ? "You Have Passed!" : "You have Failed"}
            </h1>
            <img
              style={{
                width: "64px",
                height: "64px",
                margin: "4px",
                marginBottom: "16px",
              }}
              src={
                quizpassed ? "./images/accept.png" : "./images/incorrect.png"
              }
              alt=""
            />
            <h3 style={{ color: "white" }}>{username}'s Score is:</h3>
            <h1 style={{ color: "white", marginBottom: "8px" }}>
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
                  <span style={{ fontSize: "0.9vw" }}>
                    {score} Correct answers
                  </span>
                  <span style={{ fontSize: "1vw" }}> {correctpercentage}%</span>
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
                  <span style={{ fontSize: "0.9vw" }}>
                    {incorrectanswers} Incorrect answers
                  </span>
                  <span style={{ fontSize: "1vw" }}>
                    {" "}
                    {incorrectanswerpercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.leaderboards}>
            <h1 style={{ marginLeft: "24px", color: "white" }}>Rankings</h1>
            <div style={{ display: "flex", padding: "12px" }}>
              <div style={{ margin: "8px" }}>
                <h2 style={{ color: "white" }}>Rank</h2>
                {leaderboards.slice(0, 5).map((data, index) => (
                  <div>
                    <h2 style={{ color: "white", marginTop: "4px" }}>
                      {index + 1 == 1 ? (
                        <FaTrophy
                          style={{
                            color: "#FFD700",
                            marginRight: "6px",
                            transform: "translateX(-2px)",
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {index + 1 == 2 ? (
                        <FaTrophy
                          style={{
                            color: "#C0C0C0",
                            marginRight: "4px",
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {index + 1 == 3 ? (
                        <FaTrophy
                          style={{
                            color: "#CE8946",
                            marginRight: "4px",
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {index + 1}
                    </h2>
                  </div>
                ))}
              </div>
              <div style={{ margin: "8px" }}>
                <h2 style={{ color: "white" }}>Username</h2>
                {leaderboards.slice(0, 5).map((data) => (
                  <div>
                    <h2 style={{ color: "white", marginTop: "4px" }}>
                      {data.username}
                    </h2>
                  </div>
                ))}
              </div>
              <div style={{ margin: "8px" }}>
                <h2 style={{ color: "white" }}>Score</h2>
                {leaderboards.slice(0, 5).map((data) => (
                  <div>
                    <h2 style={{ color: "white", marginTop: "4px" }}>
                      {data.final_score}/{quizQuestions.length}
                    </h2>
                  </div>
                ))}
              </div>
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
