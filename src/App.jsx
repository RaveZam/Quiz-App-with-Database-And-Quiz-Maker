import { useEffect, useState } from "react";
import Header from "./header/Header";
import Quizhub from "./quizhub/Quizhub";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Mainpage from "./Mainpage";
import Quiz from "./quiz/Quiz";
import Quizmaker from "./quizmakersection/Quizmaker";

import "./App.css";

function App() {
  const [fastmode, setfastmode] = useState(false);

  const [database, setDatabase] = useState(() => {
    return localStorage.getItem("database") || ""; //extra line just to store the database on a local storage
  });

  const [quizzes, setquizzes] = useState([]);
  const url = "http://localhost/Quizappdatabase/fetchquiz.php"; //show fetch quiz php

  //Set All Quizzes Into A Array
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
                // quizzes={quizzes}
                // setfastmode={setfastmode}
                fastmode={fastmode}
                database={database}
              />
            }
          />
          <Route path="Quizmaker" element={<Quizmaker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
