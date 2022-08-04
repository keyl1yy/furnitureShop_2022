import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
const SharedLayout = (props) => {
  return (
    <>
        <Navbar props={props}/>
        <Sidebar props={props}/>
        <Outlet/>
    </>
  )
}

export default SharedLayout