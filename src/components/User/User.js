import React,{useState,useEffect} from 'react'
import './user.scss'
import { useSelector,useDispatch } from 'react-redux';
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import { logoutUserRedux } from '../../redux/features/authSlice';
import UserInfo from './Info/UserInfo';
import Loading from '../LoadingScreen/Loading';

const User = ({accessToken}) => {
    //!Props

    //! State
    const {id} = useParams();
    const search = useLocation().search;
    const [isOrder, setIsOrder] = useState(JSON.parse(new URLSearchParams(search).get("order") || "false"));
    const [isInfo,setIsInfo] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errCode,phoneNumber,name,email,address, isLoading} = useSelector(store => store.auth)

    //! Function
    const handleLogOutUser = () => {
        dispatch(logoutUserRedux(accessToken))
    }

    //! Function
    useEffect(() => {
        if(!accessToken || id!==accessToken) navigate('/')
    },[])

    //! Render
    if(isLoading) {
        return(
            <Loading/>
        )
    }

    return (
        <section className='screen-default account-page'>
            <div className='account-page-wrap'>
                <div className='sidebar-account-wrap'>
                    <div className='sidebar-account'>
                        <h3 style={{marginLeft:'1rem'}}>{name}</h3>
                        <div className='option-account'>
                            <div id='info' className={`${!isOrder ? 'sidebar-account-item is-active' : 'sidebar-account-item'}`} onClick={() => setIsOrder(false)}>
                                Thông tin cá nhân
                            </div>
                            <div id='order' className={`${isOrder ? 'sidebar-account-item is-active' : 'sidebar-account-item'}`} onClick={() => setIsOrder(true)}>
                                Danh sách đơn hàng
                            </div>
                            <Link to='/' className='sidebar-account-item' onClick={() => handleLogOutUser()}>
                                Thoát
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='content-account'>
                    {!isOrder &&
                        <UserInfo name={name} phoneNumber={phoneNumber} email={email} address={address}/>
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