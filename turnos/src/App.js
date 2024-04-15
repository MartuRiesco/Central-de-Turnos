import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login'
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyEmployee from './pages/ApplyEmployee';
import Notifications from './pages/Notifications';
import UsersList from './pages/Admin/UsersList';
import EmployeeList from './pages/Admin/EmployeeList';
import Profile from './pages/Employee/Profile';
import Layout from './components/Layout';
import BookAppointment from './pages/BookAppointment';


function App() {

  const { loading } = useSelector(state => state.alerts);

  return (
    <div className='App'>
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
                  </PublicRoute>}/>
              <Route path='/register' element={ 
                  <PublicRoute>
                      <Register /> 
                  </PublicRoute>
                }/>
              <Route path='/' element={ 
                  <ProtectedRoute>
                      <Layout /> 
                  </ProtectedRoute>
                }/>

              <Route path='/home' element={ 
                  <ProtectedRoute>
                      <Home /> 
                  </ProtectedRoute>
                }/>
                <Route path='/apply-employee-account' element={ 
                  <ProtectedRoute>
                      <ApplyEmployee /> 
                  </ProtectedRoute>
                  
                }/>
                <Route path='/notifications' element={ 
                  <ProtectedRoute>
                      <Notifications /> 
                  </ProtectedRoute>
                }/>

                <Route path='/admin/users' element={ 
                  <ProtectedRoute>
                      <UsersList /> 
                  </ProtectedRoute>
                }/>

                <Route path='/admin/employees' element={ 
                  <ProtectedRoute>
                      <EmployeeList /> 
                  </ProtectedRoute>
                }/>

                <Route path='/employee/profile/:employeeId' element={ 
                  <ProtectedRoute>
                      <Profile /> 
                  </ProtectedRoute>
                }/>

              <Route path='/book-appointment/:employeeId' element={ 
                  <ProtectedRoute>
                      <BookAppointment /> 
                  </ProtectedRoute>
                }/>
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
