import { Button, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FastField, Field, Form, Formik, yupToFormErrors } from "formik";
import * as Yup from "yup"
import InputCustom from "../../common/Input/Input";
import SelectCustom from "../../common/Select/Select"
import ButtonCustom from "../../common/Button/Button";
import RadioButtonCustom from "../../common/RadioInput/RadioButton";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { postVNPay } from "../../services/vnpayService";
import { useNavigate } from "react-router-dom";
const TestPage = () => {
  //! State
  const navigate = useNavigate();
  //! Effect

  //! Function
  const notify = async () => {
    toast("Default Notification !");
    // toast.success("Custom Style Notification with css class!", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    //   className: 'foo-bar'
    // });
    try {
      const response = await postVNPay({
        orderType: 'topup',
        amount: '50000',
        orderDescription: 'check VNPAY HOATLA',
        bankCode: '',
        language: 'vn'
      })
      console.log("response",response);
      if(response &&  response?.status === 200){
        window.open(response?.data?.url)
      }
    } catch (error) {
      console.log("errorr",error);
    }
  };

  //! Render
  return (
    <>
      <button onClick={notify}>Button</button>
      <ToastContainer />
    </>
  );
};

export default TestPage;
