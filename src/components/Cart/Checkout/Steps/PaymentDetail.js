import { Grid } from '@mui/material'
import { FastField, Form, Formik } from 'formik'
import React, { Fragment, useEffect, useState } from 'react'
import * as yup from 'yup'
import RadioPaymentCheckout from '../../../../common/RadioInput/RadioPaymentCheckout'
import {paymentList} from '../../../../constant/paymentList'
import LoadingButton from '@mui/lab/LoadingButton';

const PaymentDetail = (props) => {
  //! Props

  const {setActiveStep, valueCheckout, setValueCheckout} = props;
  //! State
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const initialValues={
    paymentType: ""
  }

  const validateYup = yup.object().shape({
    paymentType: yup.string().required("Required!")
  })
  //! Function
  const handleSubmitForm = (values, formikBag) => {
    console.log(values,'values');
    setValueCheckout({...valueCheckout, ...values})
    setIsLoadingButton(true);
  }
  //! Effect
  useEffect(() => {
    if(isLoadingButton){
      const timeOut = setTimeout(() => {
        setActiveStep((prev) => (prev + 1))
        setIsLoadingButton(false);
      }, 1500);

      return () => {
        clearTimeout(timeOut);
      }
    }
  },[isLoadingButton])
  //! Render
  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validateYup}
        enableReinitialize
        onSubmit={(values, formikBag) => handleSubmitForm(values, formikBag)}
      >
        {(helperFormik) => {
          console.log("helperFormik",helperFormik);
          return(
            <Form>
              <Grid container sx={{marginTop:'2.5rem'}}>
                <Grid item xs={12}>
                  <FastField
                    component={RadioPaymentCheckout}
                    dataOption={paymentList}
                    name="paymentType"
                    title="Payment Type"
                    sx={{textAlign: 'center',fontSize: '24px', textTransform:'uppercase', marginBottom: '.8rem'}}
                  />
                </Grid>
                <Grid container sx={{marginTop: '1rem', display:'flex', justifyContent: 'flex-end', position: 'absolute', right:'40px', bottom: '40px'}}>
                {/* <ButtonCustom loading={true} variant="outlined" type="submit" title="Next"/> */}
                <LoadingButton disabled={helperFormik.values.paymentType === ''} loading={isLoadingButton} type="submit" variant="outlined">
                  Next
                </LoadingButton>
              </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Fragment>
  )
}

export default PaymentDetail