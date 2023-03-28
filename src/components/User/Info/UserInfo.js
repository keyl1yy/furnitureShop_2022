import React, { Fragment, useEffect, useState } from 'react'
import './userInfo.scss'
import '../user.scss'
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux';
import { changePasswordAction, updateUserAction } from '../../../redux/features/authSlice';
import { getAccessToken, getUserInfo } from '../../../helper';
import { ToastContainer } from 'react-toastify';
import { useGetAddressPersonal } from '../../../hooks/users/useGetAddressPersonal';
import emptyImgUrl from '../../../public/img/empty-img.png'
const UserInfo = (props) => {
    //! Props
    const {phoneNumber,name,email,address} = props;
    //! Selector
    const {statusCodeChangePassword} = useSelector(store => store.auth)
    //! State
    const dispatch = useDispatch();
    const userLoginInfo = getUserInfo();
    const {data: listAddressPersonal, isLoading: isLoadingPersonalAddress, error: errorPersonalAddress, refresh: refreshPersonalAddress} = useGetAddressPersonal(userLoginInfo?._id);
    const [isTogglePass, setIsTogglePass] = useState(false);
    const [isToggleAddress, setIsToggleAddress] = useState(false);
    const initialValues = {
        name: name ?? '',
        phoneNumber: phoneNumber ?? '',
        email: email ?? '',
        address: address ?? '',
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    }
    //! Function
    const handleSubmit = (values, formikBag) => {
        if(!isTogglePass){
            dispatch(updateUserAction({token: getAccessToken(), values: values}))
        }else{
            dispatch(changePasswordAction({token: getAccessToken(), values: values}))
        }
    }

    const handleChange = (helperFormik, name, value) => {
        helperFormik?.setFieldValue(name, value)
    }
    const checkValidateChangePassword = (values) => {
        if(!isTogglePass){
            return true
        }else{
            if(!values?.oldPassword || !values?.newPassword || !values?.newPasswordConfirm){
                return false
            }else if(values?.newPassword !== values?.newPasswordConfirm) {
                return false
            }else{
                return true
            }
        }
    }

    const handleClickAddressPersonal = () => {
        setIsToggleAddress(!isToggleAddress);
        setIsTogglePass(false);
    }

    const handleClickPasswordToggle = () => {
        setIsTogglePass(!isTogglePass);
        setIsToggleAddress(false);
    }
    //! Effect
    useEffect(() => {
        if(statusCodeChangePassword){
            setIsTogglePass(false);
        }
    },[statusCodeChangePassword])
    //! Render
  return (
      <Fragment>
        <ToastContainer/>
        <Formik
            initialValues={initialValues}
            validateOnMount
            onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
        >
            {(helperFormik) => {
                let isCheckBtn = checkValidateChangePassword(helperFormik.values);
                console.log("isCheckBtn",isCheckBtn);
                return(
                    <Form>
                        <div className='info-account'>
                            <h3>Thông tin tài khoản</h3>
                            <div className='info-account-item'>
                                <div className='title-info'>
                                    Họ tên
                                </div>
                                <div className='content-info'>
                                    <FastField name='name' placeholder='Your name' onChange={(e) => handleChange(helperFormik, e.target.name, e.target.value)} disabled={false}/>
                                </div>
                            </div>
                            <div className='info-account-item'>
                                <div className='title-info'>
                                    Số điện thoại
                                </div>
                                <div className='content-info'>
                                    <FastField type='text' name='phoneNumber' placeholder='SĐT của bạn' onChange={(e) => handleChange(helperFormik, e.target.name, e.target.value)} disabled/>
                                </div>
                            </div>
                            <div className='info-account-item'>
                                <div className='title-info'>
                                    Email
                                </div>
                                <div className='content-info'>
                                    <FastField type='email' name='email'  placeholder='Email của bạn' value={email} disabled/>
                                </div>
                            </div>
                            <div className='info-account-item'>
                                <div className='title-info'>
                                    Địa chỉ
                                </div>
                                <div className='content-info'>
                                    <FastField type='text' name='address' placeholder='Địa chỉ của bạn' onChange={(e) => handleChange(helperFormik, e.target.name, e.target.value)} disabled={isTogglePass}/>
                                </div>
                            </div>
                            <div className='option-user'>
                                <div className={`${isTogglePass ? 'pass-toggle is-active' : 'pass-toggle'}`} onClick={handleClickPasswordToggle}>
                                    Thay đổi mật khẩu
                                </div>
                                <div className={`${isToggleAddress ? 'address-toggle is-active' : 'address-toggle'}`} onClick={handleClickAddressPersonal}>
                                    Địa chỉ nhận hàng
                                </div>
                            </div>
                            {
                                isToggleAddress && (
                                    <>
                                    {listAddressPersonal?.length === 0 && <img className='empty-img-wrap' src={emptyImgUrl} alt='empty-img'/>}
                                    </>
                                )
                            }
                            {isTogglePass && 
                                <div className='wrap-toggle'>
                                    <div className='info-account-item'>
                                        <div className='title-info'>
                                            Mật khẩu cũ
                                        </div>
                                        <div className='content-info'>
                                            <input id='old-pass' name='oldPassword' type='password' placeholder='Mật khẩu cũ' onChange={(e) => handleChange(helperFormik, e.target.name, e.target.value)}/>
                                            {helperFormik.errors.oldPassword && <span className='err'>{helperFormik.errors.oldPassword}</span>}
                                        </div>
                                    </div>
                                    <div className='info-account-item'>
                                        <div className='title-info'>
                                            Mật khẩu mới
                                        </div>
                                        <div className='content-info'>
                                            <input id='new-pass' name='newPassword' type='password' placeholder='Mật khẩu mới' onChange={(e) => handleChange(helperFormik, e.target.name, e.target.value)}/>
                                            {helperFormik.errors.newPassword && <span className='err'>{helperFormik.errors.newPassword}</span>}
                                        </div>
                                    </div>
                                    <div className='info-account-item'>
                                        <div className='title-info'>
                                            Nhập lại mật khẩu
                                        </div>
                                        <div className='content-info'>
                                            <input id='check-pass' name='newPasswordConfirm' type='password' placeholder='Nhập lại mật khẩu' onChange={(e) => handleChange(helperFormik, e.target.name, e.target.value)}/>
                                            {helperFormik.errors.newPasswordConfirm &&<span className='err'>{helperFormik.errors.newPasswordConfirm}</span>}
                                        </div>
                                    </div>
                                </div>}
                                        
                            <div className={`info-account-btn ${(!isTogglePass && !isToggleAddress) ? 'start' : 'end'} ${!isCheckBtn? 'btn-disabled': ''}`}>
                                {!isTogglePass ? 
                                <button type='submit'>Cập nhật tài khoản</button>
                                :
                                <button type='submit' disabled={!isCheckBtn}>Thay đổi mật khẩu</button>
                                }
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
      </Fragment>
  )
}

export default UserInfo