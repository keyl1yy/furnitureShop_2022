import React,{useState,useEffect} from 'react'
import {Link, useNavigate, useParams, BrowserRouter, Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux';
import NavbarAdmin from './NavbarAdmin/NavbarAdmin';
import SidebarAdmin from './SidebarAdmin/SidebarAdmin';
import Dashboard from './Dashboard/Dashboard';
import Users from './UserPage/Users';
const AdminPage = (props) => {
  const {setIsAdminPage,accessTokenAdmin} = props;
  const {errCode} = useSelector(store => store.admin)
  const navigate = useNavigate();

  const [isOpenSidebar,setIsOpenSidebar] = useState(false);
  useEffect(() => {
    setIsAdminPage(true)
    if(!accessTokenAdmin && errCode!==10){
      navigate('/admin/login')
    }
  },[])
  return (
    <>
      <NavbarAdmin setIsOpenSidebar={setIsOpenSidebar} />
      <SidebarAdmin setIsOpenSidebar={setIsOpenSidebar} isOpenSidebar={isOpenSidebar}/>
    </>
  )
}

export default AdminPage