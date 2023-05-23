import { Accordion, AccordionDetails, AccordionSummary, Alert, Backdrop, Box, CircularProgress, Grid, Paper, Snackbar, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import { FastField, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import ButtonCustom from '../../../../common/Button/Button'
import InputCustom from '../../../../common/Input/Input'
import { createUser } from '../../../../services/authService'
import CloseIcon from '@mui/icons-material/Close';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetSingleUser } from '../../../../hooks/users/userHook'
import { updateUserId } from '../../../../services/adminPage/userService'

const BackgroundForm = styled(Paper)(({theme}) => ({
    height: '100%',
    overflowY: 'scroll',
    padding: '2rem 3rem',
    position: 'relative',
    '&:before': {
        content: "''",
        maxWidth: '500px',
        width: "100%",
        height: '50%',
        backgroundColor: theme.palette.defaultLayout.colorIconNav,
        position: 'absolute',
        clipPath: 'polygon(100% 100%, 0% 100%, 100% 0)',
        bottom: '0',
        right: '0',
        opacity: 0.2,   
    },
    '&:after': {
        content: "''",
        maxWidth: '500px',
        width: "100%",
        height: '50%',
        backgroundColor: theme.palette.defaultLayout.colorIconNav,
        clipPath: 'polygon(0 0, 0% 100%, 100% 0)',
        position: 'absolute',
        top: '0',
        left: '0',
        opacity: .4
    }
}))

const EditUser = () => {
    //! State
    const theme = useTheme();
    const {id} = useParams();
    const {data: dataUser, isLoading} = useGetSingleUser(id);
    const {phoneNumber, name, email, address} = dataUser;
    // console.log("dataUser",dataUser);
    const initialValues = {
        phoneNumber: phoneNumber,
        name: name,
        address: address,
        password: "",
        email: email,
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
        await updateUserId(id,data).then((res) => {
            // if(res?.response?.status === 401) {
            //     setMes({...mes, type: "error", msg: res?.response?.data?.msg})
            // }
            if(res?.status === 200){
                setMes({...mes,type: "success",msg: "Update password user successfully!"})
            }
            setOpen(true);
            setTimeout(() => {
                navigate("/admin/users",{replace: true})
            },800)
        }).catch((err) => {
            console.log("err",err);
        })
        
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleBack = () => {
        navigate("/admin/users",{replace: true})
        
    }



    //! Render
    // if(true) {
    //     return(
    //         <Backdrop 
    //             sx={{ color: "#936a53", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //             open={isLoading || false}
    //         >
    //             <CircularProgress color="inherit"/>
    //         </Backdrop>
    //     )
        
    // }

  return (
    <div className='container-admin'>
        <Backdrop 
            sx={{ color: "#936a53", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading || false}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        <Snackbar anchorOrigin={{vertical: "top",horizontal: "right"}} sx={{marginBottom: '3rem'}} open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert severity={mes?.type || "success"} onClose={handleClose}>
            {mes?.msg}
            </Alert>
        </Snackbar>
        <BackgroundForm elevation={3}>
            <CloseIcon onClick={handleBack} sx={{position: 'absolute', top: '2rem', right: '2rem',cursor: 'pointer','&:hover':{transform: 'scale(1.2)'}}} />
            <Typography variant='h3' component="h1" sx={{marginBottom: '2rem'}}>User </Typography>
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
                                        // label="PhoneNumber"
                                        name="phoneNumber"
                                        placeholder="PhoneName..."
                                        disabled={true}
                                        sx={{width:'95%'}}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{display:'flex', justifyContent: 'flex-end'}}>
                                    <FastField
                                        component={InputCustom}
                                        // label="YourName"
                                        name="name"
                                        placeholder="FullName..."
                                        disabled={true}
                                        sx={{width:'95%'}}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{marginTop: '2rem'}}>
                                <Grid item xs={12} sx={{display:'flex', justifyContent: 'space-between'}}>
                                    <FastField
                                        component={InputCustom}
                                        // label="Email"
                                        name="email"
                                        disabled={true}
                                        placeholder="Email..."
                                        sx={{width: '100%'}}
                                    />
                                </Grid>
                            </Grid>
                            {/* <Grid container sx={{marginTop: '2rem'}}>
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
                            </Grid> */}
                            <Grid container sx={{marginTop: '2rem'}}>
                                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <FastField
                                        component={InputCustom}
                                        // label="Address"
                                        name="address"
                                        disabled={true}
                                        placeholder="Address..."
                                        sx={{width: "100%"}}
                                        type="text"
                                    />
                                </Grid>
                            </Grid>
                            <Accordion sx={{backgroundColor:'transparent',outline:'unset', border: 'unset', boxShadow:'unset', paddingLeft:0}}>
                                <AccordionSummary
                                    // expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography component='h2' sx={{color: `${theme.palette.defaultLayout.colorBtn}`,fontWeight:"500"}}>
                                        Change password?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container sx={{marginTop: '2rem'}}>
                                        <Grid item xs={12} sx={{display:'flex', justifyContent: 'space-between'}}>
                                            <FastField
                                                component={InputCustom}
                                                label="Password"
                                                name="password"
                                                placeholder="Password..."
                                                sx={{width:'95%'}}
                                                // type="password"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{marginTop: '2rem'}}>
                                        <Grid item xs={12} sx={{display:'flex', justifyContent: 'space-between'}}>
                                            <FastField
                                                component={InputCustom}
                                                label="ConfirmPassword"
                                                name="confirmPassword"
                                                placeholder="ConfirmPassword..."
                                                sx={{width:'95%'}}
                                                // type="password"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{marginTop: "2rem"}}>
                                        <Grid item xs={12} sx={{display: 'flex', justifyContent: "flex-start",}}>
                                            <ButtonCustom
                                                title="Update"
                                                type="submit"
                                                variant="contained"
                                                sx={{height: '45px', width: '140px'}}
                                            />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            
                        </Form>
                    )
                }}
            </Formik>
        </BackgroundForm>
    </div>
  )
}

export default EditUser