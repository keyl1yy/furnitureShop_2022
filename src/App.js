import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Home from "./components/HomePage/Home";
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useDispatch,useSelector } from "react-redux";
import { getProducts } from "./redux/features/productsSlice";
import Products from "./components/ProductScreen/Products";
import SingleProduct from "./components/ProductScreen/SingleProduct";
import Cart from "./components/Cart/Cart";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getAmount, getOrderTotal, getShippingFee, getTotal } from "./redux/features/cartSlice";
import SignUp from "./components/Auth/SignUp/SignUp";
import Login from "./components/Auth/Login/Login";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Auth/ForgotPassword/ResetPassword";
import User from "./components/User/User";
import {Alert,AlertTitle} from '@mui/material'
import { loginUserToken } from "./redux/features/authSlice";
import LoginAdmin from "./components/Admin/LoginAdmin/LoginAdmin";
import Loading from "./components/LoadingScreen/Loading";
import Dashboard from "./components/Admin/AdminPage/Dashboard/Dashboard";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import SharedProductLayout from "./components/SharedLayout/SharedProductLayout";
import SharedAdminLayout from "./components/SharedLayout/SharedAdminLayout";
import UsersManage from "./components/Admin/AdminPage/UserPage/UsersManage";
import { loginAdminWithToken } from "./redux/features/adminSlice";
import OrderAdmin from "./components/Admin/AdminPage/OrderPage/OrderAdmin";
import StatisticAdmin from "./components/Admin/AdminPage/StatisticPage/StatisticAdmin";
import ProductManage from "./components/Admin/AdminPage/ProductPage/ProductManage";
import MeetingAdmin from "./components/Admin/AdminPage/Meeting/MeetingAdmin";

AOS.init();

const resetToken = localStorage.getItem('resetPassToken');

const getAccessToken = () => {
  const res = localStorage.getItem('accessToken');
  return res? res : ''
}
const getAccessTokenAdmin = () => {
  const res = localStorage.getItem('accessTokenAdmin');
  return res? res : ''
}

function App() {
  //! State
  const [isShowSidebar,setIsShowSidebar] = useState(false);
  const [isFormAuth,setIsFormAuth] = useState({
    isLogin: false,
    isForgotPassword: false,
    isSignUp: false,
  })
  const [isAdminPage,setIsAdminPage] = useState(false);
  const {amount,cartProducts} = useSelector(store => store.cartProducts)
  const {errCode,msg,name} = useSelector(store => store.auth)
  const {errCode: errCodeAdmin} = useSelector(store => store.admin)
  const [accessToken,setAccessToken] = useState(getAccessToken())
  const [accessTokenAdmin,setAccessTokenAdmin] = useState(getAccessTokenAdmin())

  const dispatch = useDispatch();

  

  //! Effect
  useEffect(() => {
    setAccessToken(getAccessToken())
    setAccessTokenAdmin(getAccessTokenAdmin())
  },[errCode])
  
  useEffect(() => {
    dispatch(getProducts())
    if(accessToken){
      dispatch(loginUserToken(accessToken))
    }
    if(accessTokenAdmin){
      dispatch(loginAdminWithToken(accessTokenAdmin))
    }
  },[])
  useEffect(() => {
    dispatch(getAmount())
    dispatch(getTotal())
    dispatch(getShippingFee())
    dispatch(getOrderTotal())
  },[cartProducts])
  
  //!Render
  return (
    <BrowserRouter>
      <div id='alert-success' className='alertAuth hide'>
            <Alert severity="success">
                <AlertTitle>Login Success</AlertTitle>
                <div id='content-success' style={{display: 'inline-block'}}>{msg}</div> — <strong>Hello_{name}!!!</strong>
            </Alert>
      </div>
      {isFormAuth.isLogin && <Login setIsFormAuth={setIsFormAuth}/>}
      {isFormAuth.isSignUp && <SignUp setIsFormAuth={setIsFormAuth}/>}
      {isFormAuth.isForgotPassword && <ForgotPassword setIsFormAuth={setIsFormAuth}/>}
      <Routes>
        <Route path='/' element={<SharedLayout 
                                  accessToken={accessToken} 
                                  errCode={errCode} 
                                  setIsFormAuth={setIsFormAuth} 
                                  isShowSidebar={isShowSidebar} 
                                  amount={amount} 
                                  setIsShowSidebar={setIsShowSidebar} 
                                  isAdminPage={isAdminPage}/>}>
          <Route index element={<Home/>} />
          <Route path='about' element={<About/>} />
          <Route path='products' element={<SharedProductLayout/>}>
            <Route index element={<Products/>} />
            <Route path=':id' element={<SingleProduct/>}/>
          </Route>
          <Route path="cart" element={<Cart/>} />
          <Route path="reset-password/:id" element={<ResetPassword resetToken={resetToken}/>}/>
          <Route path="user/:id" element={<User accessToken={accessToken}/>}/>
          <Route path="admin/login" element={<LoginAdmin setIsAdminPage={setIsAdminPage} accessTokenAdmin={accessTokenAdmin}/>}/>
          <Route path="admin" element={<SharedAdminLayout setIsAdminPage={setIsAdminPage} accessTokenAdmin={accessTokenAdmin}/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='users' element={<UsersManage/>}/>
            <Route path="order" element={<OrderAdmin/>} />
            <Route path="statistic" element={<StatisticAdmin/>} />
            <Route path="product" element={<ProductManage/>} />
            <Route path="meeting" element={<MeetingAdmin/>} />
          </Route>
          <Route path="*" element={<Loading/>}/>
        </Route>
      </Routes>
      <Footer isAdminPage={isAdminPage}/>
    </BrowserRouter>
  );
}


export default App;
