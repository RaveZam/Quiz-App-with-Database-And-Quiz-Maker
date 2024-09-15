import AstronomyComponent from "./AstronomyComponent";
import styles from "./quizhub.module.css";
import { useNavigate } from "react-router-dom";

export default function Quizhub({ fastmode, setfastmode }) {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <h2 style={{ color: "white" }}>Recently Published</h2>

      <div className={styles.quizhub}>
        <AstronomyComponent
          fastmode={fastmode}
          setfastmode={setfastmode}
          navigate={navigate}
        />
      </div>
    </div>
  );
}
