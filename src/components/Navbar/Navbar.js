import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {FaBars,FaShoppingCart} from 'react-icons/fa'
import {BsFillPersonPlusFill} from 'react-icons/bs'

import urlImg from '../../public/img/logo.svg'


const Navbar = ({setIsShowSidebar}) => {
    let activeStyle = {
        borderBottom: '2px solid #936a53'
      };
    return (
        <nav>
            <div className='nav-center'>
                <div className='nav-header'>
                    <Link to='/'>
                        <img src={urlImg} alt='logo'/>
                    </Link>
                    <button type='button' className='nav-toggle' onClick={() => setIsShowSidebar((prev) => !prev)}>
                        <FaBars/>
                    </button>
                </div>
                <ul className='nav-links'>
                    <li>
                        <NavLink to='/'
                                style={({ isActive }) =>
                                isActive ? activeStyle : undefined}>
                            home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/about'
                                style={({ isActive }) =>
                                isActive ? activeStyle : undefined}>
                            about
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/products'
                                style={({ isActive }) =>
                                isActive ? activeStyle : undefined}>
                            products
                        </NavLink>
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
                    {/* <button className='login-btn' type='button' onClick={() => setIsFormLogin((prev) => {
                        return{
                            ...prev,
                            isLogin: true,
                        }
                    })}> */}
                    <button className='login-btn' type='button'>
                        login 
                        <BsFillPersonPlusFill className='icon-login'/>
                    </button> 
                </div>
            </div>
        </nav>
    )
}

export default Navbar
