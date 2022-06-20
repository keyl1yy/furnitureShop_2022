import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/features/productsSlice";
import Products from "./components/ProductScreen/Products";
import SingleProduct from "./components/ProductScreen/SingleProduct";

function App() {
  const [isShowSidebar,setIsShowSidebar] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  },[])
  
  return (
    <BrowserRouter>
      <Navbar setIsShowSidebar={setIsShowSidebar}/>
      <Sidebar isShowSidebar={isShowSidebar} setIsShowSidebar={setIsShowSidebar}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/products/:id" element={<SingleProduct/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}


export default App;
