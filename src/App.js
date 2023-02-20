import React, { Suspense } from 'react';
import './App.css';
import Login from './Components/ResuableApp/Pages/Login';
import Signup from './Components/ResuableApp/Pages/Signup';
import { Route, Routes } from "react-router-dom";
import Dashboard from './Components/ResuableApp/Pages/Dashboard';

function App() {
  return (
    <>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
