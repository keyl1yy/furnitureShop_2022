import { Backdrop, Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { handleGetAddressCity } from '../../../../../helper';
import { useGetCityOption } from '../../../../../hooks/city/useGetCity';
import { getOrderDetailAction } from '../../../../../redux/features/orderSlice';
import Tooltip from '@mui/material/Tooltip';
import OrderDetailItem from './OrderDetailItem';
import {enumStatus, enumPaymentStatus} from '../../../../../constant/enumOrder'
import { Field, Form, Formik } from 'formik';
import SelectCustom from '../../../../../common/Select/Select';
import ButtonCustom from '../../../../../common/Button/Button';
import '../orderAdmin.scss'
import CloseIcon from '@mui/icons-material/Close';

const OrderDetailAdmin = (props) => {
    //! Props

    //! State
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderDetailSchema = useSelector(store => store.order)
    const {orderDetail, isLoadingOrderDetail} = orderDetailSchema;
    const {data: listCity, isLoading} = useGetCityOption();

    //! Function
    const handleBackOrderPage = () => {
      navigate("/admin/order", { replace: true });
    }
    //! Effect
    useEffect(() => {
      dispatch(getOrderDetailAction(id))
    },[])
    //! Render
    if(isLoadingOrderDetail || isLoading) {
      return(
        <Backdrop 
            sx={{ color: "#936a53", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoadingOrderDetail || isLoading || false}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
      )
    }
    
  return (
    <div className='container-admin'>
      <Paper sx={{padding: '2rem', position: 'relative'}}>
        <CloseIcon sx={{position: 'absolute', top: '2rem', right: '2rem',cursor: 'pointer',color: '#453227', '&:hover': {
          scale: '1.2',
          transition: 'all .5s'
        }}} onClick={handleBackOrderPage}/>
        <Grid container spacing={2} sx={{marginBottom: '1rem'}}>
          <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.25rem'}}>
            <Typography variant='h6'>
              Hoá đơn
            </Typography>
            <Typography variant='h6' sx={{color: '#DECBC0'}}>
              {orderDetail?._id}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{marginBottom: '2rem'}}>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '30%'}}>
              <Typography variant='subtitle1'>
                Khách hàng
              </Typography>
            </Box>
            <Box sx={{width: '70%', padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
              <Typography variant='body1'>
                {orderDetail?.name}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{marginBottom: '2rem'}}>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '30%'}}>
              <Typography variant='subtitle1'>
                Số điện thoại
              </Typography>
            </Box>
            <Box sx={{width: '70%', padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
              <Typography variant='body1'>
                {orderDetail?.phoneNumber}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '30%'}}>
              <Typography variant='subtitle1'>
                Email
              </Typography>
            </Box>
            <Box sx={{width: '70%', padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
              <Typography variant='body1'>
                {orderDetail?.email}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid  container sx={{marginBottom: '2rem'}}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '30%'}}>
              Địa chỉ nhận hàng
            </Box>
            <Box sx={{width: '70%', padding: '8px 16px', border: '1px dashed #d9d9d9', borderRadius: '4px'}}>
              <Typography variant='body1'>
                {orderDetail?.address && handleGetAddressCity(orderDetail?.address, listCity)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {orderDetail?.note && 
        <Grid  container sx={{marginBottom: '2rem'}}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '30%'}}>
              Note
            </Box>
            <Box sx={{width: '70%', padding: '8px 16px', border: '1px dashed #d9d9d9', borderRadius: '4px'}}>
              <Typography variant='body1'>
                {orderDetail?.note}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        }
        <Grid container sx={{marginBottom: '2rem'}}>
          <Grid item xs={12} sx={{marginBottom: '1rem'}}>
            <Typography variant='subtitle1'>
              Danh sách sản phẩm
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {(orderDetail?.products || [])?.map((el) => {
              return(
                <OrderDetailItem key={el?._id} order={el}/>
              )
            })}
          </Grid>
        </Grid>
        {
          orderDetail?.discount?.discountCode && 
        <Grid container spacing={4} sx={{marginBottom: '2rem'}}>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '30%'}}>
              <Typography variant='subtitle1'>
                Mã discount
              </Typography>
            </Box>
            <Box sx={{width: '70%', padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
              <Tooltip title={orderDetail?.discount?.discountCode} placement="bottom">
                <Typography variant='body1'>
                  {orderDetail?.discount?.discountCode}
                </Typography>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '50%'}}>
              <Typography variant='subtitle1'>
                Giá trị discount
              </Typography>
            </Box>
            <Box sx={{width: '50%', padding: '8px 16px', border: '1px dashed #d9d9d9', borderRadius: '4px'}}>
              <Typography variant='body1'>
                {`${orderDetail?.discount?.discountValue} đ`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        }
        <Grid container spacing={4} sx={{marginBottom: '2rem'}}>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '50%'}}>
              <Typography variant='subtitle1'>
                Kiểu thanh toán
              </Typography>
            </Box>
            <Box sx={{width: '50%', padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
                <Typography variant='body1'>
                  {orderDetail?.paymentType?.paymentTypeDetail}
                </Typography>
            </Box>
          </Grid>
          {
            orderDetail?.paymentType?.numberBank && 
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1.25rem'}}>
            <Box sx={{width: '50%'}}>
              <Typography variant='subtitle1'>
                Tài khoản ngân hàng
              </Typography>
            </Box>
            <Box sx={{width: '50%', padding: '8px 16px', border: '1px dashed #d9d9d9', borderRadius: '4px'}}>
              <Typography variant='body1'>
                {`${orderDetail?.paymentType?.numberBank}`}
              </Typography>
            </Box>
          </Grid>
          } 
        </Grid>
        <Grid container spacing={4} sx={{marginTop: '1rem'}}>
          <Grid item xs={6} sx={{padding:'1rem', paddingLeft: '16px!important', marginLeft:'16px', paddingTop: '16px!important',border: '1px dashed #d9d9d9'}}>
            <Formik 
              initialValues={{
                status: orderDetail?.status ?? '',
                paymentStatus: orderDetail?.paymentStatus ?? ''
              }}
              enableReinitialize
              onSubmit={(value, formikBag) => {
                console.log("formUpdateStatusOrder",value);
              }}
            >
              <Form>
                <Grid container>
                  <Grid item xs={12} sx={{display: 'flex', marginBottom: '1rem'}}>
                    <Box sx={{width: '50%', display: 'flex', alignItems: 'center'}}>
                      <Typography variant='subtitle2'>
                        Trạng thái đơn hàng
                      </Typography>
                    </Box>
                    <Box sx={{width: '50%'}}>
                      <Field
                        component={SelectCustom}
                        name="status"
                        dataOption={enumStatus}
                        variant="outlined"
                        sx={{width: '100%'}}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{display: 'flex', marginBottom: '1rem'}}>
                    <Box sx={{width: '50%', display: 'flex', alignItems: 'center'}}>
                      <Typography variant='subtitle2'>
                        Trạng thái thanh toán
                      </Typography>
                    </Box>
                    <Box sx={{width: '50%'}}>
                      <Field
                        component={SelectCustom}
                        name="paymentStatus"
                        dataOption={enumPaymentStatus}
                        variant="outlined"
                        sx={{width: '100%'}}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <ButtonCustom
                      title="Cập nhật"
                      type="submit"
                      variant="contained"
                    />
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
          <Grid container xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '1rem'}}>
              <Grid item xs={6} >
                <Grid container sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '32px', marginRight: '32px'}}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{fontSize: '18px'}}>
                      Tổng hoá đơn
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end', marginRight: '2rem'}}>
                    <Typography variant='body2' sx={{color: '#ab7a5f', fontWeight: '500', fontSize: '20px', position: 'relative'}}>
                      {orderDetail?.totalPrice < orderDetail?.totalPriceProduct && <span className='price-underline'>{`${orderDetail?.totalPriceProduct} đ`}</span>}
                      {`${orderDetail?.totalPrice} đ`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default OrderDetailAdmin