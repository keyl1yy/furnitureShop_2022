import React from 'react'
import { Route, Redirect, Navigate } from "react-router-dom";
import { useReducer } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  console.log("props",props);
    //! State
    const {errCode} = useSelector(store => store.admin);
    const tokenAdmin = localStorage.getItem("accessTokenAdmin");

    //! Render
    if (errCode === 10 || tokenAdmin) {//! Error logic
        return props.children;
      }
    return <Navigate to="/admin/login" replace />;
}

export default PrivateRoute