import React from 'react';
import Login from './page/Login'
import Register from './page/Register'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
      </Routes>
  );
}

export default App;
