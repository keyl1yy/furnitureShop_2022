import React,{useState,useEffect} from 'react'
import './user.scss'
import { useSelector,useDispatch } from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { logoutUserRedux } from '../../redux/features/authSlice';


const User = ({accessToken}) => {
    const {id} = useParams();
    const [isInfo,setIsInfo] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errCode,phoneNumber,name,email,address} = useSelector(store => store.auth)

    const handleLogOutUser = () => {
        dispatch(logoutUserRedux(accessToken))
    }

    useEffect(() => {
        if(!accessToken || id!==accessToken) navigate('/')
    },[])
    return (
        <section className='screen-default account-page'>
            <div className='account-page-wrap'>
                <div className='sidebar-account-wrap'>
                    <div className='sidebar-account'>
                        <h3 style={{marginLeft:'1rem'}}>{name}</h3>
                        <div className='option-account'>
                            <div id='info' className='sidebar-account-item is-active'>
                                Thông tin cá nhân
                            </div>
                            <div id='order' className='sidebar-account-item'>
                                Danh sách đơn hàng
                            </div>
                            <Link to='/' className='sidebar-account-item' onClick={() => handleLogOutUser()}>
                                Thoát
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='content-account'>
                    {isInfo &&
                        <div className='info-account'>
                            <h3>Thông tin tài khoản</h3>
                            <div className='info-account-item'>
                                <div className='title-info'>
                                    Họ tên
                                </div>
                                <div className='content-info'>
                                    <input type='text' placeholder='Tên của bạn' value={name}/>
                                </div>
                            </div>
                            <div className='info-account-item'>
                                <div className='title-info'>
                                    Số điện thoại
                                </div>
                                <div className='content-info'>
                                    <input type='text' placeholder='SĐT của bạn' value={phoneNumber} disabled/>
                                </div>
                            </div>
                            <div className='info-account-item'>
                                <div className='title-info'>
                                    Email
                                </div>
                                <div className='content-info'>
                                    <input type='email' placeholder='Email của bạn' value={email} disabled/>
                                </div>
                            </div>
                            <div className='info-account-item'>
                                <div className='title-info'>
                                    Địa chỉ
                                </div>
                                <div className='content-info'>
                                    <input type='text' placeholder='Địa chỉ của bạn' value={address}/>
                                </div>
                            </div>
                            <div className='pass-toggle'>
                                Thay đổi mật khẩu
                            </div>
                            {/* {isTogglePass && 
                            <div className='wrap-toggle'>
                                <div className='info-account-item'>
                                    <div className='title-info'>
                                        Mật khẩu cũ
                                    </div>
                                    <div className='content-info'>
                                        <input id='old-pass' type='password' placeholder='Mật khẩu cũ' value={togglePassword.oldPass} onInput={(e) => setTogglePassword((prev) => {
                                            return{
                                                ...prev,
                                                oldPass:e.target.value
                                            }
                                        })}/>
                                        {errOldPass.isErr && <span className='err'>{errOldPass.message}</span>}
                                    </div>
                                </div>
                                <div className='info-account-item'>
                                    <div className='title-info'>
                                        Mật khẩu mới
                                    </div>
                                    <div className='content-info'>
                                        <input id='new-pass' type='password' placeholder='Mật khẩu mới' value={togglePassword.newPass} onInput={(e) => setTogglePassword((prev) => {
                                            return{
                                                ...prev,
                                                newPass: e.target.value
                                            }
                                        })}/>
                                        {errNewPass.isErr && <span className='err'>{errNewPass.message}</span>}

                                    </div>
                                </div>
                                <div className='info-account-item'>
                                    <div className='title-info'>
                                        Nhập lại mật khẩu
                                    </div>
                                    <div className='content-info'>
                                        <input id='check-pass' type='password' placeholder='Nhập lại mật khẩu' value={togglePassword.newPassChecked} onInput={(e) => setTogglePassword((prev) => {
                                            return{
                                                ...prev,
                                                newPassChecked: e.target.value
                                            }
                                        })}/>
                                        {errPassChecked.isErr && <span className='err'>{errPassChecked.message}</span>}
                                    </div>
                                </div>
                            </div>
                            } */}
                            <div className='info-account-btn'>
                                <button type='button'>Cập nhật tài khoản</button>
                            </div>
                        </div>
                    }
                    {/* {isOrder && 
                        <div className='order-account'>
                            <h3>Đơn hàng của bạn</h3>
                        </div>
                    } */}
                </div>
            </div>
        </section>
    )
}

export default User