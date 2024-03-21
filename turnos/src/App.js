import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Register from './Components/Register/register';

function App() {
  return (
    <div className='App p-5'>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
