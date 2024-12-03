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
    }, 1000);

    const handlePopState = () => {
      setfastmode(false);
    };

    window.addEventListener("popstate", handlePopState());
    return () => {
      window.removeEventListener("popstate", null);
    };
  }, []);

  const [showRegister, setshowRegister] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      {loading ? (
        <div
          style={{
            opacity: opacity,
            transition: "all 0.4s ease-in-out",
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
        <Header
          setshowRegister={setshowRegister}
          showRegister={showRegister}
          setshowLogin={setshowLogin}
          showLogin={showLogin}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Quizhub
          setshowLogin={setshowLogin}
          showLogin={showLogin}
          setshowRegister={setshowRegister}
          showRegister={showRegister}
          quizzes={quizzes}
          fastmode={fastmode}
          setfastmode={setfastmode}
          setDatabase={setDatabase}
          database={database}
          searchTerm={searchTerm}
        />
      </>
    </>
  );
}
