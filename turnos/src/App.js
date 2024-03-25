import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Home from './Components/Home/home';
//import PublicRoute from './Components/PublicRoute/publicRoute';
import { Toaster } from 'react-hot-toast';
<<<<<<< HEAD
//import ProtectedRoute from './Components/ProtectedRoute/protectedRoute'
=======
import ProtectedRoute from './Components/ProtectedRoute/protectedRoute';
>>>>>>> 20ffb08390c13bb5585d63789bec0fce0fdbd5af

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
<<<<<<< HEAD
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
=======
                   </PublicRoute> 
                    } 
              />
              <Route path='/register' element={ 
            /*       <PublicRoute> */
                      <Register /> 
                  /* </PublicRoute> */
                    } 
              />
              <Route 
                path='/home' element={
                  <ProtectedRoute>
>>>>>>> 20ffb08390c13bb5585d63789bec0fce0fdbd5af
                      <Home /> 
                  </ProtectedRoute>
                   } 
              />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
