import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Home from './Components/Home/home';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/Private/ProtectedRoute';
import PublicRoute from './Components/Private/PublicRoute';


function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <div className='App p-5'>
      <BrowserRouter>
          {loading && (
              <div className='spinner-parent'>
              <div class="spinner-border" role="status">
              </div>
            </div>
          )}
          
          <Toaster
              position="top-center"
              reverseOrder={false}
          />
          <Routes>
              <Route path='/login' element={ 
                  <PublicRoute>
                      <Login /> 
                  </PublicRoute>
                
                    } 
              />
              <Route path='/register' element={ 
                <PublicRoute>
                    <Register /> 
                </PublicRoute>
                    } 
              />
              <Route 
                path='/' element={
                  <ProtectedRoute>
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