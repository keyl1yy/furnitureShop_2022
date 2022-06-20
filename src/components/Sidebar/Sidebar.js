import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai'
import {FaShoppingCart} from 'react-icons/fa'
import {BsFillPersonPlusFill} from 'react-icons/bs'
import urlImg from '../../public/img/logo.svg'



const Sidebar = ({isShowSidebar,setIsShowSidebar}) => {


    return (
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
                    <Link to='/cart' className='cart-btn'>
                        cart
                        <span className='cart-container'>
                            <FaShoppingCart/>
                            <span className='cart-values'>
                                0
                            </span>
                        </span>
                    </Link>
                    <button className='login-btn' type='button'>
                        login 
                        <BsFillPersonPlusFill className='icon-login'/>
                    </button> 
                </div>
        </aside>
    )
}

export default Sidebar
