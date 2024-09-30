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
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <h2
        style={{
          color: "white",
          fontWeight: "600",
          fontSize: "3vw",
          marginBottom: "8px",
        }}
      >
        Welcome to AnswerIt!
      </h2>
      <span>Here are </span>
      <div className={styles.quizhub}>
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
        {/* <button
          style={{ height: "40%", borderRadius: "50px" }}
          onClick={() => navigate("/Quizmaker")}
        >
          Create Quiz
        </button> */}
      </div>
    </div>
  );
}
