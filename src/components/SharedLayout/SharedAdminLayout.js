import React,{useState,useEffect} from 'react'
import { useNavigate,Outlet, useLocation } from 'react-router-dom';
import SidebarAdmin from '../Admin/AdminPage/SidebarAdmin/SidebarAdmin'
import { useSelector } from 'react-redux';
import NavbarAdmin from '../Admin/AdminPage/NavbarAdmin/NavbarAdmin';
import {useDispatch} from 'react-redux'
import loginAdminWithToken from '../../redux/features/adminSlice'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../../theme/themeMui';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
const SharedAdminLayout = (props) => {
  //! State
    const {setIsAdminPage,accessTokenAdmin, handleFullScreen} = props;
    const [darkMode, setDarkMode] = useState(false)
    const [isOpenSidebar,setIsOpenSidebar] = useState(false);
    const pathName = useLocation().pathname.split("/")[2];
  //! Effect
    useEffect(() => {
        setIsAdminPage(true)
    },[])

  //! Function

  //! Render
  if(pathName && pathName === "login"){
    return(
      <Outlet/>
    )
  }
  return (
    <FullScreen handle={handleFullScreen}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline/>
          <NavbarAdmin setIsOpenSidebar={setIsOpenSidebar} />
          <SidebarAdmin setIsOpenSidebar={setIsOpenSidebar} isOpenSidebar={isOpenSidebar} darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Outlet/>
      </ThemeProvider>
    </FullScreen>

  )
}

export default SharedAdminLayout