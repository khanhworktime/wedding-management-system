import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from "./page/Login";
import Page from "./page/Mainpage";
import {ToastContainer} from "react-toastify";
import 'semantic-ui-css/semantic.min.css'

function App() {

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
