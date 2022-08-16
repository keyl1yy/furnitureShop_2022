import React,{useState,useEffect} from 'react'
import { useNavigate,Outlet } from 'react-router-dom';
import SidebarAdmin from '../Admin/AdminPage/SidebarAdmin/SidebarAdmin'
import { useSelector } from 'react-redux';
import NavbarAdmin from '../Admin/AdminPage/NavbarAdmin/NavbarAdmin';
import {useDispatch} from 'react-redux'
import loginAdminWithToken from '../../redux/features/adminSlice'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../../theme/themeMui';
const SharedAdminLayout = (props) => {
    const {setIsAdminPage,accessTokenAdmin, handle} = props;
    const dispatch = useDispatch();
    const {errCode} = useSelector(store => store.admin)
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false)
    const [isOpenSidebar,setIsOpenSidebar] = useState(false);
    useEffect(() => {
        setIsAdminPage(true)
        if(!accessTokenAdmin || errCode!==10){
          navigate('/admin/login')
        }
    },[])
  return (
    
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline/>
        <NavbarAdmin setIsOpenSidebar={setIsOpenSidebar} />
        <SidebarAdmin setIsOpenSidebar={setIsOpenSidebar} isOpenSidebar={isOpenSidebar} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Outlet/>
    </ThemeProvider>

  )
}

export default SharedAdminLayout