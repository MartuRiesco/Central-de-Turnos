import React from 'react';
import './styles.css';
//import Logo from '../Logo/logo';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, /* useNavigate */ } from 'react-router-dom';

//import axios from 'axios';
function Layout({ children }) {

  
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const location = useLocation();
  const userMenu = [
    {
        name: 'Solicitar Turno',
        path: '/home',
        icon: 'ri-arrow-right-line'
    },
    {
        name: 'Mis Turnos',
        path: '/appointments',
        icon: 'ri-calendar-check-line'
    },
    {
        name: 'Mi Perfil',
        path: '/get-user-info-by-id',
        icon: 'ri-user-line'
    },
    {
        name: 'Cuenta Empleado',
        path:'/apply-employee-account',
        icon:'ri-user-add-line'
    }
  ];
  const adminMenu = [
    {
        name: 'Usuarios registrados',
        path: '/admin/users',
        icon: 'ri-user-line'
    },
    {
        name: 'Turnos',
        path: '/employee/appointments',
        icon: 'ri-calendar-check-line'
    },
    {
        name: 'Servicios',
        path: '/admin/employees',
        icon: 'ri-user-add-line'
    }
  ];

  const employeeMenu = [
    {
        name: 'Usuarios',
        path: '/admin/users',
        icon: 'ri-user-line'
    },
    {
        name: 'Turnos',
        path: '/employee/appointments',
        icon: 'ri-user-add-line'
    },
    {
        name: 'Mí Perfil',
        path: `/employee/profile/${user?._id}`,
        icon: 'ri-user-line'
    },

  ];

  const welcome = user?.isAdmin ? 'Gestiona tu empresa, ' : user?.isEmployee ? 'Revisa tus reservas, ' : 'Te damos la bienvenida a nuestra central de turnos, ';
  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isEmployee ? employeeMenu : userMenu;
  const role = user?.isAdmin ? 'Admin' : user?.isEmployee ? 'Profesional' : 'Premium';

  return (
    <div className='main'>
        <div className='layout'>

            

            <div className='welcome'>
                <h1>Hola!</h1>
                <p>{welcome} <span className='welcome-name'>{user?.name}</span>!</p>
                <p className='role'>{role}</p>
            </div>

            <div className='sidebar'>
                    <div className="sidebar-header">
                    </div>

                    <div className="menu">
                        { menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return  <Link to={menu.path} className='menu-bg'>
                                        <div className={`menu-item ${isActive && 'active-menu-item'}`}>
                                            <i className={menu.icon}></i>
                                            <p>{menu.name}</p>
                                        </div>
                                        </Link>
                        })}
                                <div className='menu-bg' onClick={() => {
                                    localStorage.clear()
                                    navigate('/login')
                                }} >
                                        <div className='menu-item'>
                                            <i className='ri-logout-box-line'></i>
                                            <p>Logout</p>
                                        </div>
                                </div>
                          
                    </div>
            </div>

            <div className="body">
                    { children }
                </div>
        </div>
    </div>
  )
}

export default Layout;