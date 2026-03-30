import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Game from './Pages/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />}/>
        {/* <Route path="/playGame/:id/:username" element={<Play />} />
        <Route path="/endedGame/:id/:username" element={<End />}/> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
