import React from 'react'

function Layout({ children }) {
  return (
    <div className='main p-2'>
        <div className='d-flex layout'>
            <div className='sidebar'>
                    <h1>Sidebar</h1>
            </div>

            <div className='content'>
                <div className="header">
                    header
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