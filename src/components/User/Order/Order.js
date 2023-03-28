import React, { Fragment, useEffect } from 'react'
import { getUserInfo } from '../../../helper';
import '../user.scss'
import './order.scss'
import { useDispatch,useSelector } from "react-redux";
import { getOrderByIdUser } from '../../../redux/features/orderSlice';
import { Skeleton } from '@mui/material';
import emptyIcon from '../../../public/img/empty-img.png'
import { isEmpty } from 'lodash';
import OrderDetail from './Detail/OrderDetail';
import { StyledEngineProvider } from '@mui/material/styles';


const Order = () => {
    //! Props
    const OrderSlice = useSelector(store => store.order);
    const {isLoadingOrderUser, orderUser} = OrderSlice;
    console.log("nsjkabds",orderUser);
    //! State
    const infoUser = getUserInfo();
    const dispatch = useDispatch();
    //! Function

    //! Effect
    useEffect(() => {
        if(infoUser){
            dispatch(getOrderByIdUser(infoUser?._id))
        }
    },[])
    //! Render
    const renderLoading = () => {
        return(
            <Fragment>
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
            </Fragment>
        )
    }

    const renderEmptyData = () => {
        return(
            <Fragment>
                <div className='img-empty'>
                    <img src={emptyIcon} alt='empty'/>
                </div>
            </Fragment>
        )
    }

    return (
    <Fragment>
        <div className='order-account'>
            <h3>Đơn hàng của bạn</h3>
        </div>
        {isLoadingOrderUser && renderLoading()}
        {!isLoadingOrderUser && orderUser?.orderData?.length === 0 && renderEmptyData()}
        {!isLoadingOrderUser && !isEmpty(orderUser?.orderData) && orderUser?.orderData?.map((el,ind) => {
            return(
                <OrderDetail key={el?._id} order={el}/>
            )
        })}
    </Fragment>
  )
}

export default Order