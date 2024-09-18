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
        />
        <QuizTopics
          fastmode={fastmode}
          setfastmode={setfastmode}
          navigate={navigate}
          quizname={"Example"}
          quizdesc={"Lorem ipsum dolor sit amet consectetur adipisicing el"}
        />
        <QuizTopics
          fastmode={fastmode}
          setfastmode={setfastmode}
          navigate={navigate}
          quizname={"Example"}
          quizdesc={"Lorem ipsum dolor sit amet consectetur adipisicing el"}
        />
        <QuizTopics
          fastmode={fastmode}
          setfastmode={setfastmode}
          navigate={navigate}
          quizname={"Example"}
          quizdesc={"Lorem ipsum dolor sit amet consectetur adipisicing el"}
        />
      </div>
    </div>
  );
}
