import { Button, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FastField, Field, Form, Formik, yupToFormErrors } from "formik";
import * as Yup from "yup"
import InputCustom from "../../common/Input/Input";
import SelectCustom from "../../common/Select/Select"
import ButtonCustom from "../../common/Button/Button";
import RadioButtonCustom from "../../common/RadioInput/RadioButton";
const TestPage = () => {
  //! State
  const [isAnimating, setIsAnimating] = useState(false);
  const countryOption = ["Korea", "China", "Vietnam", "Thailan"]
  const genderOption = [
    {
        value: "female",
        label: "Female",
    },
    {
        value: "male",
        label: "Male"
    },
    {
        value: "other",
        label: "Other"
    }
  ]
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  const variants = {
    open: { opacity: 0 },
    close: { opacity: 1, x: 100 },
  };
  //! Effect

  //! Function
  const handleSubmit = (values, formikBag) => {
      console.log("valuesFormik",values);
  }


  //! Render
  return (
    <Paper
      sx={{
        height: "3000px",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0 2rem",
        flexDirection: "column",
      }}
    >
      <Paper
        sx={{
          height: "1000px",
          backgroundColor: "yellowgreen",
          width: "100%",
        }}
      />
      <Box
        sx={{
          width: "200px",
          height: "200px",
          backgroundColor: "red",
          marginBottom: "5rem",
        }}
        component={motion.div}
        // initial={{
        //     opacity: 0,
        //     x: "-100%"
        // }}
        // animate={{
        //     x: isAnimating?  1000 : 0,
        //     opacity: isAnimating? 1 : 0.5,
        //     rotate:isAnimating? 360 : 0
        // }}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          type: "spring",
          stiffness: 60,
          duration: 10,
        }}
        onClick={() => setIsAnimating(!isAnimating)}
      />
      <Box
        sx={{ width: 200, height: 200, backgroundColor: "green", marginBottom: "5rem"}}
        initial={"open"}
        variants={variants}
        animate={"close"}
        transition={{
            duration: 2
        }}
      />
       <motion.h1
            initial={{ opacity:0, x: -100 }}
            whileInView={{opacity:1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.8 }}
            className="banner-container_content__text"
          >
            CPIE INTERNATIONAL <br /> REAL ESTATE STOCK EXCHANGE
          </motion.h1>
      <Box
        sx={{width: 200, height: 200, backgroundColor: "pink"}}
        component={motion.div}
        layout
        initial={{
            opacity: 0,
            x: -100
        }}
        whileInView={{
            opacity: 1,
            x: 0
        }}
        viewport={{
            amount: 0.8
        }}
        transition={{
            duration: 1
        }}
      />

        <Formik
            initialValues={{
                name: "",
                age: "",
                country: "",
                gender: ""
            }}
            enableReinitialize
            validationSchema={Yup.object({
                name: Yup.string()
                    .required("Required!"),
                age: Yup.string()
                    .required("Required!"),
                country: Yup.string()
                    .required("Required!")
            })}
            onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
        >
            {(helperFormik) => {
                return(
                    <Form style={{display:"flex", flexDirection: "column"}}>
                        <Field
                            component={InputCustom}
                            name="name"
                            label="Name"
                            sx={{width: "50vw", marginBottom: "2rem"}}
                        />
                        <Field
                            component={InputCustom}
                            name="age"
                            label="Age"
                            sx={{width: "50vw", marginBottom: "2rem"}}
                        />
                        <Field
                            component={SelectCustom}
                            name="country"
                            label="Country"
                            sx={{width: "50vw",marginBottom:"2rem"}}
                            dataOption={countryOption}
                        />
                        <FastField
                            component={RadioButtonCustom}
                            name="gender"
                            title="Gender"
                            dataOption={genderOption}
                        />
                        <ButtonCustom
                            variant="contained"
                            title="Submit"
                            type="submit"
                        />
                    </Form>
                )
            }}
        </Formik>

    </Paper>
  );
};

export default TestPage;
