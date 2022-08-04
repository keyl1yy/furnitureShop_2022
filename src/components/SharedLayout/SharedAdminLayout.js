import React,{useState,useEffect} from 'react'
import { useNavigate,Outlet } from 'react-router-dom';
import SidebarAdmin from '../Admin/AdminPage/SidebarAdmin/SidebarAdmin'
import { useSelector } from 'react-redux';
import NavbarAdmin from '../Admin/AdminPage/NavbarAdmin/NavbarAdmin';

const SharedAdminLayout = (props) => {
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
        <Outlet/>
    </>
  )
}

export default SharedAdminLayout