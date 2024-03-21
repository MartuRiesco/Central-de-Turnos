import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Home from './Components/Home/home';

function App() {
  return (
    <div className='App p-5'>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='/home' element={ <Home /> } />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
