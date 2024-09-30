import Quizhub from "./quizhub/Quizhub";
import Header from "./header/Header";
import { useEffect, useState } from "react";
import Preloader from "./preloaders/Preloader";

export default function Mainpage({
  setDatabase,
  database,
  quizzes,
  fastmode,
  setfastmode,
}) {
  const [loading, isLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        isLoading(false);
      }, 500);
    }, 1200);

    const handlePopState = () => {
      setfastmode(false);
    };

    window.addEventListener("popstate", handlePopState());
    return () => {
      window.removeEventListener("popstate", null);
    };
  }, []);
  return (
    <>
      {loading ? (
        <div
          style={{
            opacity: opacity,
            transition: "all 0.3s ease-in-out",
            position: "absolute",
            height: "100vh",
            backgroundColor: "#2e1736",
          }}
        >
          <Preloader />
        </div>
      ) : (
        ""
      )}
      <>
        <Header />
        <Quizhub
          quizzes={quizzes}
          fastmode={fastmode}
          setfastmode={setfastmode}
          setDatabase={setDatabase}
          database={database}
        />
      </>
    </>
  );
}
