import React, { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { getSingleProduct } from '../../redux/features/singleProductSlice';

const SingleProduct = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(id))
  },[])

  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct