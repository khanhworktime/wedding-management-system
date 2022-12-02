import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from "./page/Login";
import Page from "./page/Mainpage";
import Dashboard from "./page/Dashboard";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Page/>}/>
    </Routes>
  );
}

export default App;
