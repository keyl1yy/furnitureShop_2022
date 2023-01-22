import React from 'react'
import { Route, Redirect, Navigate } from "react-router-dom";
import { useReducer } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
    //! State
    const {isLoginAdmin,isLoading} = useSelector(store => store.admin);
    const tokenAdmin = localStorage.getItem("accessTokenAdmin");

    //! Render
    if ( tokenAdmin) {
        return props.children;
    }
    return <Navigate to="/admin/login" replace />;
}

export default PrivateRoute