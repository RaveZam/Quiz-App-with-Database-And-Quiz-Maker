import { useState } from "react";
import Header from "./header/Header";
import Quizhub from "./quizhub/Quizhub";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mainpage from "./Mainpage";
import Astronomy from "./quiz/Astronomy";

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
            path="/Astronomy"
            element={
              <Astronomy setfastmode={setfastmode} fastmode={fastmode} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
