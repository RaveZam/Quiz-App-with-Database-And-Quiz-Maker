import { useState } from "react";
import Header from "./header/Header";
import Quizhub from "./quizhub/Quizhub";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mainpage from "./Mainpage";
import Astronomy from "./quiz/Quiz";

import "./App.css";

function App() {
  const astronomyquestions = [
    {
      id: 1,
      questiontext: "What is the largest planet in the solar system?",
      options: ["Mercury", "Mars", "Jupiter", "Pluto"],
      correctanswer: "Jupiter",
      gif: "./images/astronomygifs/question1gif.gif",
    },
    {
      id: 2,
      questiontext: "What is the closest planet to the Sun?",
      options: ["Earth", "Mercury", "Venus", "Jupiter"],
      correctanswer: "Mercury",
      gif: "./images/astronomygifs/question2gif.gif",
    },
    {
      id: 3,
      questiontext: "What is the largest planet in the solar system",
      options: ["Mercury", "Mars", "Jupiter", "Pluto"],
      correctanswer: "Jupiter",
    },
  ];
  const [fastmode, setfastmode] = useState(false);

  const url = "http://localhost/answerit_quizdatabase/index.php";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Mainpage fastmode={fastmode} setfastmode={setfastmode} />}
          />
          <Route
            path="/Astronomy"
            element={
              <Astronomy
                astronomyquestions={astronomyquestions}
                setfastmode={setfastmode}
                fastmode={fastmode}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
