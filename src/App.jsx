import { useState } from "react";
import Header from "./header/Header";
import Quizhub from "./quizhub/Quizhub";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./Mainpage";
import Astronomy from "./quiz/Astronomy";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Mainpage />} />
          <Route path="/Astronomy" element={<Astronomy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
