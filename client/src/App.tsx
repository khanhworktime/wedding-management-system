import React from 'react';
import Login from './page/Login'
import Register from './page/Register'
import { Routes, Route } from 'react-router-dom'
import Mainpage from "./page/Mainpage";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Mainpage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
      </Routes>
  );
}

export default App;
