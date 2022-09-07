import { Alert, Box, Grid, Paper, Snackbar, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { FastField, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import ButtonCustom from '../../../../common/Button/Button'
import InputCustom from '../../../../common/Input/Input'
import { createUser } from '../../../../services/authService'
import CloseIcon from '@mui/icons-material/Close';
import { Navigate, useNavigate } from 'react-router-dom'

const BackgroundForm = styled(Paper)(({theme}) => ({
    height: '100%',
    padding: '2rem 3rem',
    position: 'relative',
    '&:before': {
        content: "''",
        width: '300px',
        height: '300px',
        backgroundColor: theme.palette.defaultLayout.colorIconNav,
        clipPath: 'circle(90.0% at 6% 5%)',
        position: 'absolute',
        top: '0',
        left: '0',
        opacity: .4
    },
    '&:after': {
        content: "''",
        width: '200px',
        height: '200px',
        backgroundColor: theme.palette.defaultLayout.hoverBtn,
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        position: 'absolute',
        right: '1rem',
        bottom: '1rem',
        opacity: .5

    }
}))

const CreateUser = () => {
    //! State
    const initialValues = {
        phoneNumber: "",
        name: "",
        address: "",
        password: "",
        email: "",
        confirmPassword: "",
    }

    const validate = Yup.object().shape({
        phoneNumber: Yup.string().required("Required!").max(10, "Phone number can not more than 10 character!").trim(),
        name: Yup.string().required("Required!").trim(),
        password: Yup.string().required("Required!").min(6, "Password must more than 6 character!").trim(),
        confirmPassword: Yup.string().required("Required!").oneOf([Yup.ref('password')], 'Passwords must match').trim(),
        email: Yup.string().email("Invalid email!").required("Required!").trim(),
        address: Yup.string().required("Required!").trim()
    })
    const [mes, setMes] = useState({type: '',msg: ''})
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    //! Effect

    //! Function
    const handleSubmit = async (values, formikBag) => {
        const data = {
            phoneNumber: values.phoneNumber,
            name: values.name,
            address: values.address,
            password: values.password,
            email: values.email,
        }
        await createUser(data).then((res) => {
            if(res?.response?.status === 401) {
                setMes({...mes, type: "error", msg: res?.response?.data?.msg})
            }
            if(res?.status === 200){
                setMes({...mes,type: "success",msg: "Create user successfully!"})
            }
            setOpen(true);

        }).catch((err) => {
            console.log("err",err);
        })
        navigate("/admin/users",{replace: true})
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleBack = () => {
        navigate("/admin/users",{replace: true})
        
    }

    //! Render
  return (
    <div className='container-admin'>
        <Snackbar anchorOrigin={{vertical: "top",horizontal: "right"}} sx={{marginBottom: '3rem'}} open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert severity={mes?.type || "success"} onClose={handleClose}>
            {mes?.msg}
            </Alert>
        </Snackbar>
        <BackgroundForm elevation={3}>
            <CloseIcon onClick={handleBack} sx={{position: 'absolute', top: '2rem', right: '2rem',cursor: 'pointer','&:hover':{transform: 'scale(1.2)'}}}/>
            <Typography variant='h3' component="h1" sx={{marginBottom: '2rem'}}>Create New User</Typography>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validate}
                onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
            >
                {(helperFormik) => {
                    return(
                        <Form className='form-create-user'>
                            <Grid container >
                                <Grid item xs={6} sx={{display:'flex', justifyContent: 'flex-start'}}>
                                    <FastField
                                        component={InputCustom}
                                        label="PhoneNumber"
                                        name="phoneNumber"
                                        placeholder="PhoneName..."
                                        sx={{width:'95%'}}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{display:'flex', justifyContent: 'flex-end'}}>
                                    <FastField
                                        component={InputCustom}
                                        label="YourName"
                                        name="name"
                                        placeholder="FullName..."
                                        sx={{width:'95%'}}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{marginTop: '2rem'}}>
                                <Grid item xs={12} sx={{display:'flex', justifyContent: 'space-between'}}>
                                    <FastField
                                        component={InputCustom}
                                        label="Email"
                                        name="email"
                                        placeholder="Email..."
                                        sx={{width: '100%'}}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{marginTop: '2rem'}}>
                                <Grid item xs={6} sx={{display:'flex', justifyContent: 'flex-start'}}>
                                    <FastField
                                        component={InputCustom}
                                        label="Password"
                                        name="password"
                                        placeholder="Password..."
                                        sx={{width:'95%'}}
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{display:'flex', justifyContent: 'flex-end'}}>
                                    <FastField
                                        component={InputCustom}
                                        label="ConfirmPassword"
                                        name="confirmPassword"
                                        placeholder="ConfirmPassword..."
                                        sx={{width:'95%'}}
                                        type="password"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{marginTop: '2rem'}}>
                                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <FastField
                                        component={InputCustom}
                                        label="Address"
                                        name="address"
                                        placeholder="Address..."
                                        sx={{width: "100%"}}
                                        type="text"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{marginTop: "2.5rem"}}>
                                <Grid item xs={12} sx={{display: 'flex', justifyContent: "flex-end",}}>
                                    <ButtonCustom
                                        title="Create"
                                        type="submit"
                                        variant="contained"
                                        sx={{height: '45px', width: '140px'}}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </BackgroundForm>
    </div>
  )
}

export default CreateUser