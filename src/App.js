import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
AOS.init();

function App() {
  const [isShowSidebar,setIsShowSidebar] = useState(false);
  const [isFormAuth,setIsFormAuth] = useState({
    isLogin: false,
    isForgotPassword: false,
    isSignUp: false,
  })
  const {amount,cartProducts} = useSelector(store => store.cartProducts)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  },[])
  useEffect(() => {
    dispatch(getAmount())
    dispatch(getTotal())
    dispatch(getShippingFee())
    dispatch(getOrderTotal())
  },[cartProducts])
  
  return (
    <BrowserRouter>
      {isFormAuth.isLogin && <Login setIsFormAuth={setIsFormAuth}/>}
      {isFormAuth.isSignUp && <SignUp setIsFormAuth={setIsFormAuth}/>}
      {isFormAuth.isForgotPassword && <ForgotPassword setIsFormAuth={setIsFormAuth}/>}
      <Navbar setIsFormAuth={setIsFormAuth} setIsShowSidebar={setIsShowSidebar} amount={amount}/>
      <Sidebar setIsFormAuth={setIsFormAuth} isShowSidebar={isShowSidebar} amount={amount} setIsShowSidebar={setIsShowSidebar}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/products/:id" element={<SingleProduct/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/reset-password/:id" element={<ResetPassword/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}


export default App;
