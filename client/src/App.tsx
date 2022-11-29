import React from 'react';
import Login from './page/Login'
import Register from './page/Register'
import { Routes, Route } from 'react-router-dom'
import Mainpage from "./page/Mainpage";
import BookingPage from "./page/BookingPage";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Mainpage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/booking" element={<BookingPage />}/>
      </Routes>
  );
}

export default App;
