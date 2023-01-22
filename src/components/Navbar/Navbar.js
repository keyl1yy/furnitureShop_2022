import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {FaBars,FaShoppingCart,FaUser} from 'react-icons/fa'
import {BsFillPersonPlusFill} from 'react-icons/bs'
import { useSelector,useDispatch } from 'react-redux';
import urlImg from '../../public/img/logo.svg'



const Navbar = ({props}) => {
    const {accessToken:tokenLogin,setIsShowSidebar,amount,setIsFormAuth,errCode,isAdminPage} = props;
    let activeStyle = {
        borderBottom: '2px solid #936a53'
      };
    const dispatch = useDispatch;
    return (
        <nav className={`${isAdminPage?'display-none':''}`}>
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
                                {amount}
                            </span>
                        </span>
                    </Link>
                    {/* <button className='login-btn' type='button' onClick={() => setIsFormLogin((prev) => {
                        return{
                            ...prev,
                            isLogin: true,
                        }
                    })}> */}
                    { errCode!==10 ?
                    (<button className='login-btn' type='button' onClick={() => setIsFormAuth((prev) => {
                        return{
                            ...prev,
                            isLogin: true,
                        }
                    })}>
                        login 
                        <BsFillPersonPlusFill className='icon-login'/>
                    </button>)
                     : 
                    ( <Link to={`/user/${tokenLogin}`} className='login-btn'>
                        User 
                        <FaUser className='icon-login'/>
                    </Link>)}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
