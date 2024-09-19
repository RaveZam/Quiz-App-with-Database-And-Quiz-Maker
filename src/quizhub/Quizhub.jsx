import QuizTopics from "./QuizTopics";
import styles from "./quizhub.module.css";
import { useNavigate } from "react-router-dom";

export default function Quizhub({ fastmode, setfastmode }) {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h2 style={{ color: "white" }}>Recently Published</h2>

      <div className={styles.quizhub}>
        <QuizTopics
          fastmode={fastmode}
          setfastmode={setfastmode}
          navigate={navigate}
          quizname={"Astronomy"}
          quizdesc={" Anything about space and whats beyond the skies."}
          quizlink={"/Quiz"}
        />
        <QuizTopics
          fastmode={fastmode}
          setfastmode={setfastmode}
          navigate={navigate}
          quizname={"Biology"}
          quizdesc={"The study of living organisms and their interactions."}
          quizlink={"/Quiz2"}
        />
      </div>
    </div>
  );
}
