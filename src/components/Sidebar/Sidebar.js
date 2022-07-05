import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai'
import {FaShoppingCart} from 'react-icons/fa'
import {BsFillPersonPlusFill} from 'react-icons/bs'
import urlImg from '../../public/img/logo.svg'
import { FaUser } from 'react-icons/fa';



const Sidebar = ({accessToken,errCode,setIsFormAuth,isShowSidebar,setIsShowSidebar,amount,isAdminPage}) => {

    const handleClickLoginIcon = () => {
        setIsFormAuth((prev) => {
            return{
                ...prev,
                isLogin:true,
            }
        });
        setIsShowSidebar((prev) => !prev)
    }

    return (
        <div className={`${isAdminPage?'display-none':''}`}>
            <aside className={`${isShowSidebar ? 'sidebar is-show-sidebar' : 'sidebar'}`}>
                <div className='sidebar-header'>
                    <img src={urlImg} alt='logo'/>
                    <button className='close-btn' onClick={() => setIsShowSidebar((prev) => !prev)}>
                        <AiOutlineClose/>
                    </button>
                </div>
                <ul className='nav-links'>
                        <li onClick={() => setIsShowSidebar((prev) => !prev)}>
                            <Link to='/'>
                                home
                            </Link>
                        </li>
                        <li onClick={() => setIsShowSidebar((prev) => !prev)}>
                            <Link to='/about'>
                                about
                            </Link>
                        </li>
                        <li onClick={() => setIsShowSidebar((prev) => !prev)}>
                            <Link to='/products'>
                                products
                            </Link>
                        </li>
                </ul>
                <div className='cart-btn-wrap'>
                        <Link to='/cart' className='cart-btn' onClick={() => setIsShowSidebar((prev) => !prev)}>
                            cart
                            <span className='cart-container'>
                                <FaShoppingCart/>
                                <span className='cart-values'>
                                    {amount}
                                </span>
                            </span>
                        </Link>
                        {
                        errCode!==10?
                            <button className='login-btn' type='button' onClick={() => handleClickLoginIcon()}>
                                login 
                                <BsFillPersonPlusFill className='icon-login'/>
                            </button>   
                        :
                            <Link to={`/user/${accessToken}`} className='login-btn' onClick={() => setIsShowSidebar(prev => !prev)}>
                                User 
                                <FaUser className='icon-login'/>
                            </Link>
                        }
                    </div>
            </aside>
        </div>
    )
}

export default Sidebar
