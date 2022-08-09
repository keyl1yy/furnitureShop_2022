import React,{useState,useEffect} from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible,AiOutlineClose} from 'react-icons/ai'
import './LoginAdmin.scss'
import { Field, FastField, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { loginAdminRedux, loginAdminWithToken } from '../../../redux/features/adminSlice'
import { Alert, AlertTitle } from '@mui/material'
import {Link, useNavigate, useParams} from 'react-router-dom'


const LoginAdmin = (props) => {
    const {setIsAdminPage,accessTokenAdmin} = props;
    const {msg,errCode,token} = useSelector(store => store.admin)
    const navigate = useNavigate();
    const [isEye,setIsEye] = useState(false);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if(accessTokenAdmin){
            
    //         dispatch(loginAdminWithToken(accessTokenAdmin))
    //     }
    // },[])
    useEffect(() => {
        if(errCode === 10){
            navigate('/admin')
        }
    },[errCode])

    useEffect(() => {
        setIsAdminPage(true)
    },[])
  return (
      <>
      <div id='alert-fail' className='alertAuth hide'>
            <Alert sx={{padding:'12px 20px',}} severity="error">
                <AlertTitle>Login Failed</AlertTitle>
                <div id='content-fail' style={{display: 'inline-block'}}>{msg}</div> — <strong>check it out!</strong>
            </Alert>
        </div>
        <div className='wrap-login-admin'>
            <div className='wrap-login-admin-container'>
                <div className='wrap-login-admin-container-content'>
                    <Formik
                        initialValues={{
                            userName:'',
                            password:''
                        }}
                        enableReinitialize
                        validationSchema={Yup.object({
                            userName: Yup.string()
                                .required('Required!')
                                .trim(),
                            password: Yup.string()
                                .required('Required!')
                                .trim()
                                .min(6,'Password need more than 6 characters!')
                        })}
                        onSubmit={(values,formikBag) => {
                            console.log('loginAdmin');
                            dispatch(loginAdminRedux(values));
                            // navigate('/admin')
                        }}
                    >
                        <Form className='wrap-login-admin-container-content-form'>
                            <h3 className='wrap-login-admin-container-content-form-title'>
                                ADMIN
                            </h3>
                            <div className='wrap-login-admin-container-content-form-item'>
                                <FastField type='text' name='userName' id='userName' placeholder='admin...'/>
                                <span className='err-text'>
                                    <ErrorMessage name='userName'/>
                                </span>
                            </div>
                            <div className='wrap-login-admin-container-content-form-item'>
                                <div className='relative'>
                                    <Field type={`${isEye?'text':'password'}`} name='password' id='password' placeholder='Your password must be more 6 characters!'/>
                                    <span className='wrap-login-admin-container-content-form-item-icon' onClick={() => setIsEye(!isEye)}>
                                        {!isEye ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                                    </span>
                                </div>
                                <span className='err-text'>
                                    <ErrorMessage name='password'/>
                                </span>
                            </div>
                            <button type='submit' className='wrap-login-admin-container-content-form-btn'>
                                Đăng nhập
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className='bg-opacity'/>
            </div>
        </div>
      </>
  )
}

export default LoginAdmin