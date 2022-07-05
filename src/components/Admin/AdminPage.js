import React,{useState,useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
const AdminPage = (props) => {
  const {setIsAdminPage,accessTokenAdmin} = props;
  const {errCode} = useSelector(store => store.admin)
  const navigate = useNavigate();
  useEffect(() => {
    setIsAdminPage(true)
    if(!accessTokenAdmin && errCode!==10){
      navigate('/admin/login')
    }
  },[])
  return (
    <div>AdminPage</div>
  )
}

export default AdminPage