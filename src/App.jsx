import { useEffect, useState } from "react";
import Header from "./header/Header";
import Quizhub from "./quizhub/Quizhub";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Mainpage from "./Mainpage";
import Quiz from "./quiz/Quiz";
import Finishscreen from "./FnishScreen/Finishscreen";

import "./App.css";

function App() {
  const [fastmode, setfastmode] = useState(false);
  const [quizzes, setquizzes] = useState([]);
  const [database, setDatabase] = useState(() => {
    return localStorage.getItem("database") || "";
  });

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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Mainpage
                path="/"
                quizzes={quizzes}
                fastmode={fastmode}
                setfastmode={setfastmode}
                setDatabase={setDatabase}
                database={database}
              />
            }
          />
          <Route
            path="/Quiz"
            element={
              <Quiz
                quizzes={quizzes}
                setfastmode={setfastmode}
                fastmode={fastmode}
                database={database}
              />
            }
          />
        </Routes>
        {/* <Routes path="/Finishscreen" element={<Finishscreen />} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
