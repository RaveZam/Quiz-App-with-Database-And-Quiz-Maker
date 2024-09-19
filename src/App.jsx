import { useEffect, useState } from "react";
import Header from "./header/Header";
import Quizhub from "./quizhub/Quizhub";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Mainpage from "./Mainpage";
import Quiz from "./quiz/Quiz";
import Quiz2 from "./quiz/Quiz2";
import Finishscreen from "./FnishScreen/Finishscreen";

import "./App.css";

function App() {
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
          <Route
            path="/Quiz2"
            element={<Quiz2 setfastmode={setfastmode} fastmode={fastmode} />}
          />
        </Routes>
        <Routes path="/Finishscreen" element={<Finishscreen />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
