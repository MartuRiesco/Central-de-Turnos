import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Home from './Components/Home/home';
//import PublicRoute from './Components/PublicRoute/publicRoute';
import { Toaster } from 'react-hot-toast';
//import ProtectedRoute from './Components/ProtectedRoute/protectedRoute'

function App() {
  return (
    <div className='App p-2'>
      <BrowserRouter>
          <Toaster
            position= "top-center"
            reverseOrder= { false }
          />
          <Routes>
              <Route path='/login' element={ 
                  //<PublicRoute>
                      <Login /> 
                  //</PublicRoute>
                    } 
              />
              <Route path='/register' element={ 
                  //<PublicRoute>
                      <Register /> 
                  //</PublicRoute>
                    } 
              />
              <Route 
                path='/' element={
                  //<ProtectedRoute>
                      <Home /> 
                  //</ProtectedRoute>
                   } 
              />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
