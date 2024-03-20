import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/login';
import Register from './Components/Register/register'
import './App.css';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <main>
        
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </main>




 
    </div>
  </BrowserRouter>
  );
}

export default App;
