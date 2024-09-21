import axios from "axios";
import QuizTopics from "./QuizTopics";
import styles from "./quizhub.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Quizhub({ fastmode, setfastmode }) {
  const [quizzes, setquizzes] = useState([]);
  const url = "http://localhost/Quizappdatabase/fetchquiz.php";

  useEffect(() => {
    axios
      .get(url)
      .then((responce) => {
        setquizzes(responce.data);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h2 style={{ color: "white" }}>Recently Published</h2>
      <div className={styles.quizhub}>
        {quizzes.map((quiz) => (
          <QuizTopics
            key={quiz.id_quiznames}
            quizname={quiz.quizname}
            quizdesc={quiz.quizdescription}
            quizbg={quiz.bgimg}
            madeby={quiz.madeby}
          />
        ))}
      </div>
    </div>
  );
}
