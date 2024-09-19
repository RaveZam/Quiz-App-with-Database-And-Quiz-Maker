import { useEffect, useState } from "react";
import Header from "./header/Header";
import Quizhub from "./quizhub/Quizhub";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Mainpage from "./Mainpage";
import Quiz from "./quiz/Quiz";

import "./App.css";

function App() {
  // const astronomyquestions = [
  //   {
  //     id: 1,
  //     questiontext: "What is the largest planet in the solar system?",
  //     options: ["Mercury", "Mars", "Jupiter", "Pluto"],
  //     correctanswer: "Jupiter",
  //     gif: "./images/astronomygifs/question1gif.gif",
  //   },
  //   {
  //     id: 2,
  //     questiontext: "What is the closest planet to the Sun?",
  //     options: ["Earth", "Mercury", "Venus", "Jupiter"],
  //     correctanswer: "Mercury",
  //     gif: "./images/astronomygifs/question2gif.gif",
  //   },
  //   {
  //     id: 3,
  //     questiontext: "What is the largest planet in the solar system",
  //     options: ["Mercury", "Mars", "Jupiter", "Pluto"],
  //     correctanswer: "Jupiter",
  //   },
  //   {
  //     id: 3,
  //     questiontext: "What is the largest planet in the solar system",
  //     options: ["Mercury", "Mars", "Jupiter", "Pluto"],
  //     correctanswer: "Jupiter",
  //   },
  // ];

  const [fastmode, setfastmode] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Mainpage fastmode={fastmode} setfastmode={setfastmode} />}
          />
          <Route
            path="/Quiz"
            element={<Quiz setfastmode={setfastmode} fastmode={fastmode} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
