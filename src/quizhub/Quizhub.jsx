import axios from "axios";
import QuizTopics from "./QuizTopics";
import styles from "./quizhub.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Quizhub({
  setDatabase,
  quizzes,
  fastmode,
  setfastmode,
  database,
}) {
  return (
    <div style={{ marginTop: "2%" }} className={styles.page}>
      <h2
        style={{
          color: "white",
          fontWeight: "600",
          fontSize: "3vw",
        }}
      >
        Welcome to AnswerIt
      </h2>
      <span style={{ color: "#B59CBA" }}>
        Here are some quizzes you can join or create your own!
      </span>
      <div style={{ marginTop: "16px" }} className={styles.quizhub}>
        {quizzes.map((quiz) => (
          <QuizTopics
            key={quiz.id_quiznames}
            quizname={quiz.quizname}
            quizdesc={quiz.quizdescription}
            quizbg={quiz.bgimg}
            madeby={quiz.madeby}
            fastmode={fastmode}
            setfastmode={setfastmode}
            quizdatabase={quiz.database}
            setDatabase={setDatabase}
            database={database}
            slide={quiz.slides}
            difficulty={quiz.difficultylevel}
          />
        ))}
      </div>
      {/* <div className={styles.createsection}>
        <button className={styles.createbutton}> + Create Quiz!</button>
      </div> */}
    </div>
  );
}
