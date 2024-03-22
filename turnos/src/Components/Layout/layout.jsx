import { React, useState } from 'react';
import './styles.css';
//import Logo from '../Logo/logo';
import { Link, useLocation } from 'react-router-dom';
function Layout({ children }) {

  const [ collapsed, setCollapsed ] = useState(false)
  const location = useLocation();
  const userMenu = [
    {
        name: 'Home',
        path: '/home',
        icon: 'ri-home-6-line'
    },
    {
        name: 'Turnos',
        path: '/turnos',
        icon: 'ri-home-6-line'
    },
    {
        name: 'Clientes',
        path: '/profile',
        icon: 'ri-user-line'
    },
    {
        name: 'Logout',
        path: '/logout',
        icon: 'ri-logout-box-line'
    }
  ];

  const menuToBeRendered = userMenu

  return (
    <div className='main'>
        <div className='d-flex layout'>
            <div className='sidebar'>
                    <div className="sidebar-header">
                        {/* <Logo /> */}
                        <h1>Lg</h1>
                    </div>

                    <div className="menu">
                        { menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return  <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                        <i className={menu.icon}></i>
                                        {!collapsed &&  <Link to={menu.path}>{menu.name}</Link>}
                                    </div>
                        })}
                    </div>
            </div>

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

                    <div className='d-flex'>
                        <i className="ri-notification-line header-action-icon"></i>
                    </div>
                </div>
                <div className="body">
                    { children }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout;