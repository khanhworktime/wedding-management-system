import React, {useEffect} from 'react';
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from "./page/Login";
import Page from "./page/Mainpage";
import Dashboard from "./page/Dashboard";
import {ToastContainer} from "react-toastify";
import 'semantic-ui-css/semantic.min.css'

function App() {

    const navigate = useNavigate()

    useEffect(()=>{
      if (!localStorage.getItem('accessToken')) navigate("/login")
    })
  return (
      <div>
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="*" element={<Page/>}/>
          </Routes>
          <ToastContainer/>
      </div>

  );
}

export default App;
