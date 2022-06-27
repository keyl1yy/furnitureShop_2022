import React,{useEffect, useState} from 'react'
import '../auth.scss'
import {AiOutlineEye,AiOutlineEyeInvisible,AiOutlineClose} from 'react-icons/ai'
import { Stack, Typography,Paper } from '@mui/material'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles';
import * as Yup from 'yup'
import { Formik,Form,ErrorMessage,Field, FastField } from 'formik'
import { useDispatch } from 'react-redux'
import { resetPasswordRedux } from '../../../redux/features/resetSlice'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const [checkEye,setCheckEye] = useState({
        isEye: false,
        isEyeSecond: false
      });

    useEffect(() => {
        document.getElementsByTagName('nav')[0].style.display = 'none';
        document.getElementsByTagName('aside')[0].style.display = 'none';
        document.getElementsByTagName('footer')[0].style.display = 'none';

    },[])
  return (
      <Box sx={{width:'100%',
                height:'100vh',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                backgroundImage: 'linear-gradient(to left, #f3e7e9 0%,#e3eeff 50%, #d1fdff 100%)'
                }}>
        <Box sx={{ width: '42%',
                    padding:'1.5rem',
                    backgroundColor: '#8C716B',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:'16px'}}>
            <Stack sx={{width:'100%'}} spacing={2}>
                <Typography fontSize="sm" fontWeight="lg" sx={{color:'#FFF',
                                textAlign:'center',
                                textTransform:'uppercase',
                                }} level='h1' component='h1'>ResetPassword</Typography>
                <Formik
                    initialValues={{
                        newPassword:'',
                        confirmNewPass:'',
                    }}
                    enableReinitialize
                    validationSchema={Yup.object({
                        newPassword: Yup.string()
                            .required('Pls enter your new password!')
                            .trim()
                            .min(6,'Password need more than 6 characters!'),
                        confirmNewPass: Yup.string()
                            .required('Pls confirm your new password')
                            .trim()
                            .oneOf([Yup.ref('newPassword')], 'Password must match')
                    })}
                    onSubmit = {(values,formikBag) => {
                        const {newPassword:password} = values
                        dispatch(resetPasswordRedux(password))
                        
                    }}
                >
                    <Form className='wrap-login-container-content-form'>
                        <div className='wrap-login-container-content-form-item'>
                            <div className='relative'>
                                <Field name='newPassword' type={`${checkEye.isEye ? 'text' : 'password'}`} id='newPassword' placeholder='Mật khẩu phải có ít nhất 6 kí tự!'/>
                                <span id='eyePass' className='wrap-login-container-content-form-item-icon' onClick={() => setCheckEye((prev) => {
                                    return{
                                        ...prev,
                                        isEye: !checkEye.isEye
                                    }
                                })}>
                                {!checkEye.isEye ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                                </span>
                            </div>
                            {<ErrorMessage name='newPassword'/> ?
                            <span style={{color:'#FA8065'}}  className='err-text'>
                                <ErrorMessage name='newPassword'/>
                            </span> : null}
                        </div>
                        <div className='wrap-login-container-content-form-item'>
                            <div className='relative'>
                                <Field name='confirmNewPass' type={`${checkEye.isEyeSecond ? 'text' : 'password'}`} id='confirmNewPass' placeholder='Vui lòng nhập lại mật khẩu!'/>
                                <span id='eyeCheckPass' className='wrap-login-container-content-form-item-icon' onClick={() => setCheckEye((prev) => {
                                    return{
                                        ...prev,
                                        isEyeSecond: !checkEye.isEyeSecond
                                    }
                                })}>
                                {!checkEye.isEyeSecond ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                                </span>
                            </div>
                            <span style={{color:'#FA8065'}} className='err-text'>
                                <ErrorMessage name='confirmNewPass'/>
                            </span>
                        </div>
                        <button type='submit' className='wrap-login-container-content-form-btn btn-reset'>
                            Reset
                        </button>
                    </Form>
                </Formik>               
            </Stack>
        </Box>
      </Box>
  )
}

export default ResetPassword