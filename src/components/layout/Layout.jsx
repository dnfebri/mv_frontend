import React, { Children } from 'react'
import SideBar from './SideBar'
import Navbar from './Navbar'

const Layout = (props) => {
  return (
    <div className="flex h-screen overflow-hidden">

    <SideBar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar />
        <main>
          <div className="px-1 sm:px-2 lg:px-4 py-2 w-full max-w-9xl mx-auto">
            {props.children}
          </div>
        </main>
      </div>
      
    </div>
  )
}

export default Layout