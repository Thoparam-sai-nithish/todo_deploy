import React from 'react'
import NavigationBar from './NavigationBar'
import './RootLayout.css'
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <div className='rootStyles row ' >

      <div className='navigationStyles col-sm-3 '>
        <NavigationBar/>
      </div>
      <div className='outletStyles col-sm-9 p-0 border  rounded-4'>
        <Outlet/>
      </div>

    </div>
  )
}

export default RootLayout