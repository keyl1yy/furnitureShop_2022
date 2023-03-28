import { Button, Paper, Typography, Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  
  const [check, setCheck] = useState({a: 1, b:2})
  const objA = {
    key: 1
  }

  const objB = {
    key: 1
  }

  console.log("haotla", objA, objB ,objA == objB , objA.key === objB.key);
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


  useEffect(() => {
    console.log("sahjdbsajhd",check.a);
  },[check.a])

  //! Render
  return (
    <>
      <button onClick={() => setCheck((prev) => {
        return{
          ...prev,
          b:10
        }
      })}>Button</button>
    </>
  );
};

export default TestPage;
