import { Grid } from '@mui/material'
import { FastField, Field, Form, Formik } from 'formik'
import { find } from 'lodash'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import ButtonCustom from '../../../../common/Button/Button'
import InputCustom from '../../../../common/Input/Input'
import InputMutiline from '../../../../common/Input/InputMutiline'
import SelectCustom from '../../../../common/Select/Select'
import { useGetCityOption } from '../../../../hooks/city/useGetCity'
import Loading from '../../../LoadingScreen/Loading'
import LoadingButton from '@mui/lab/LoadingButton';
import * as yup from 'yup'


const ShippingAddress = ({setActiveStep, listCity, setValueCheckout}) => {
  //! State
  const cityOptions = listCity?.map((el) => {
    return{
      value: el?.Id,
      label: el?.Name
    }
  })

  const [currentCity, setCurrentCity] = useState("");
  const [currentDistrict, setCurrentDistrict] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    note: "",
    city: "",
    district: "",
    ward: ""
  }

  const validateYup = yup.object().shape({
    name: yup.string().required("Required!"),
    phoneNumber: yup.string().required("Required!").max(10,'SĐT không hợp lệ!').min(10,"SĐT không hợp lệ!").trim(),
    email: yup.string().required("Required!").email("Invalid email!").trim(),
    address: yup.string().required("Required!"),
    city: yup.string().required("Required!"),
    district: yup.string().required("Required!"),
    ward: yup.string().required("Required!")
  })
  //! Effect
  useEffect(() => {
    const districtData = listCity?.find(el => el?.Id === currentCity)?.Districts?.map(el => {
      return{
        value: el?.Id,
        label: el?.Name
      }
    })
    setDistrictOptions(districtData)
  },[currentCity])

  useEffect(() => {
    const wardData = listCity?.find(el => el?.Id === currentCity)?.Districts?.find(el => el?.Id === currentDistrict)?.Wards?.map(el => {
      return {
        value: el?.Id,
        label: el?.Name
      }
    })
    setWardOptions(wardData);
  },[currentDistrict])
  
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

  //! Function
  const handleSubmit = (values, formikBag) => {
    console.log("submitSuccess",values);
    setValueCheckout({...values})
    setIsLoadingButton(true);
    
    // setActiveStep((prev) => (prev + 1))
  }


  //! Render
  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validateYup}
        onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
      >
        {(helperFormik) => {
          setCurrentCity(helperFormik?.values?.city);
          setCurrentDistrict(helperFormik?.values?.district)
          return(
            <Form>
              <Grid container sx={{marginTop:'2.5rem'}}>
                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-start'}}>
                  <FastField
                    component={InputCustom}
                    name="name"
                    label="FullName"
                    variant="outlined"
                    placeholder="fullName..."
                    size="small"
                    sx={{width: '99%', borderRadius: '16px'}}
                  />
                </Grid>
                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <FastField
                    component={InputCustom}
                    name="phoneNumber"
                    label="PhoneNumber"
                    variant="outlined"
                    size="small"
                    placeholder="phoneNumber..."
                    sx={{width: '99%'}}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{marginTop: '1rem'}}>
                <Grid item xs={12}>
                  <FastField
                    component={InputCustom}
                    name="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    placeholder="email..."
                    sx={{width: '100%'}}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{marginTop: '1rem'}}>
                <Grid item xs={12}>
                  <FastField
                    component={InputCustom}
                    name="address"
                    label="Address"
                    variant="outlined"
                    size="small"
                    placeholder="address..."
                    sx={{width: '100%'}}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{marginTop: '.5rem'}} spacing={1}>
                <Grid item xs={4}>
                  <FastField
                    component={SelectCustom}
                    name="city"
                    variant="outlined"
                    size="small"
                    sx={{width: '100%'}}
                    label="Chọn Tỉnh/Thành phố"
                    dataOption={cityOptions}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={SelectCustom}
                    name="district"
                    variant="outlined"
                    size="small"
                    sx={{width: '100%'}}
                    dataOption={districtOptions || []}
                    label="Chọn Quận/Huyện"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={SelectCustom}
                    name="ward"
                    variant="outlined"
                    size="small"
                    sx={{width: '100%'}}
                    label="Chọn Phường/Xã"
                    dataOption={wardOptions || []}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{marginTop: '1rem'}}>
                <Grid item xs={12}>
                  <FastField
                    component={InputMutiline}
                    name="note"
                    label="Note"
                    variant="outlined"
                    size="small"
                    placeholder="note..."
                    sx={{width: '100%'}}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{marginTop: '1rem', display:'flex', justifyContent: 'flex-end', position: 'absolute', right:'40px', bottom: '40px'}}>
                {/* <ButtonCustom loading={true} variant="outlined" type="submit" title="Next"/> */}
                <LoadingButton loading={isLoadingButton} type="submit" variant="outlined">
                  Next
                </LoadingButton>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Fragment>
  )
}

export default ShippingAddress