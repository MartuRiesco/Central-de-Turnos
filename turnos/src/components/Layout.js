import { React, useState } from 'react';
import './styles.css';
//import Logo from '../Logo/logo';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, /* useNavigate */ } from 'react-router-dom';
import { Badge } from 'antd';
//import axios from 'axios';
function Layout({ children }) {

  const [ collapsed, setCollapsed ] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const location = useLocation();
  const userMenu = [
    {
        name: 'Solicitar Turno',
        path: '/book-appointment',
        icon: 'ri-arrow-right-line'
    },
    {
        name: 'Mis Turnos',
        path: '/get-appointments-by-user-id',
        icon: 'ri-calendar-check-line'
    },
    {
        name: 'Mis Datos',
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
        name: 'Usuarios',
        path: '/get-all-users',
        icon: 'ri-user-line'
    },
    {
        name: 'Empleados',
        path: '/get-all-employees',
        icon: 'ri-user-add-line'
    },

  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className='main'>
        <div className='layout'>

            <div className='content'>
                <div className="header">
                    { collapsed ? 
                        <i 
                            className="ri-menu-2-line header-action-icon" onClick={() => setCollapsed(false)}>
                        </i> : 
                        <i
                             className="ri-close-line header-action-icon" onClick={() => setCollapsed(true)}>
                        </i>
                    }

                    <div className='d-flex align-items-center'>
                    
                    <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
                        <i className="ri-notification-line header-action-icon"></i>
                    </Badge>
                    </div>
                </div>
                
            </div>

            <div className='welcome'>
                <h1>Hola!</h1>
                <p>Bienvenido, <span className='welcome-name'>{user?.name}</span>!</p>
            </div>

            <div className='sidebar'>
                    <div className="sidebar-header">
                        {/* <Logo /> */}
                        {/* <h1>Lg</h1> */}
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