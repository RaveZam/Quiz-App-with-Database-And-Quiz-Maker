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
          quizdesc={
            "Anything about Planets, Galaxies and preety stars above us"
          }
          quizlink={"/Quiz"}
          quizbg={"./images/astronomy.avif"}
        />
        <QuizTopics
          fastmode={fastmode}
          setfastmode={setfastmode}
          navigate={navigate}
          quizname={"Biology"}
          quizdesc={"The study of living organisms and their interactions."}
          quizlink={"/Quiz2"}
          quizbg={"./images/biologybg.jfif"}
        />
      </div>
    </div>
  );
}
