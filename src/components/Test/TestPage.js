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
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8000/graphql',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query:`
          query {
            books{
              id
              name
            }
          }
          `
      })
    })
    const data = await response.json()
    console.log(data,'hoatlala');
  }
  //! Effect
  useEffect(() => {
    fetchApi();
  },[])
  //! Function
  


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
