import { LoadingButton } from '@mui/lab';
import { Grid, Typography, Box } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetCityOption } from '../../../../hooks/city/useGetCity';
import { useDispatch } from 'react-redux';
import { checkoutVnPayAction } from '../../../../redux/features/cartSlice';
import { getUserInfo } from '../../../../helper';
import { createOrder } from '../../../../services/orderService';

const getDiscountCodeLocalStorage = () => {
  const discount = localStorage.getItem('discountCode');
  return discount ? JSON.parse(discount) : {}
}

const ReviewOrder = (props) => {
  //! Props
  const {valueCheckout} = props;
  const cartState = useSelector(store => store.cartProducts)
  const productList = JSON.parse(localStorage.getItem("cartProducts") || '');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  console.log(localStorage.getItem('discountCode'),'hoatlalla');
  const discountData = getDiscountCodeLocalStorage();
  const dispatch = useDispatch();

  const {data: listCity} = useGetCityOption();

  const idUser = getUserInfo()?._id;
  console.log("discountData",discountData, cartState);
  console.log("productList",productList);

  console.log("valueCheckout",valueCheckout);
  //! State

  //! Function
  const handleConfirmOrder = async (e) => {
    setIsLoadingButton(true);
    e.preventDefault();
    const orderValueFormData = handleValueOrder();
    if(valueCheckout?.paymentType !== 'cod'){
      setTimeout(() => {
        setIsLoadingButton(false);
        dispatch(checkoutVnPayAction({
          orderType: 'topup',
          amount: `${cartState?.orderTotal - renderTotalDiscount()}`,
          orderDescription: `TotalPrice: ${cartState?.orderTotal} Discount: ${renderTotalDiscount() ?? 0}`,
          bankCode: '',
          language: 'vn'
        }))
      },1500)
    }else{
      const response = await createOrder(orderValueFormData);
      setTimeout(() => {
        setIsLoadingButton(false);
      },1500)
    }
  }
  const handleValueOrder = () => {
    console.log('bhoatlaCheckout',productList, valueCheckout, discountData);
    const bodyFormData = new FormData();
    bodyFormData.append("idUser",idUser);
    bodyFormData.append("name",valueCheckout?.name);
    bodyFormData.append("phoneNumber",valueCheckout?.phoneNumber);
    bodyFormData.append("email", valueCheckout?.email);
    bodyFormData.append("address", `${valueCheckout?.address} ( ${valueCheckout?.ward}-${valueCheckout?.district}-${valueCheckout?.city} )`);
    bodyFormData.append("note", valueCheckout?.note);
    if(valueCheckout?.paymentType === 'cod'){
      bodyFormData.append("paymentType",JSON.stringify({paymentTypeDetail: `${valueCheckout?.paymentType}`}));

    }
    bodyFormData.append("discount",JSON.stringify({discountCode: `${discountData?.idDiscount}`,discountValue: renderTotalDiscount()}));
    bodyFormData.append("totalPrice",cartState?.orderTotal - renderTotalDiscount());
    bodyFormData.append("totalPriceProduct",cartState?.orderTotal)
    const convertProduct = productList?.map(item => {
      return({
        idProduct: item?.id,
        amount: item?.amountCart,
        color: item?.color,
        price: item?.price,
        img: item?.img,
        name: item?.name
      })
    })
    convertProduct?.forEach((el) => bodyFormData.append("products",JSON.stringify(el)));
    return bodyFormData;
  }

  const renderTotalDiscount = () => {
    let newTotalDiscount = 0;
    if(discountData?.valueDiscount){
      if(discountData?.valueDiscount?.includes('%')){
        newTotalDiscount = cartState?.orderTotal/100*parseInt(discountData?.valueDiscount);
      }else{
        newTotalDiscount = parseInt(discountData?.valueDiscount);
      }
      return newTotalDiscount
    }

    return 0;
  }

  //! Effect
  useEffect(() => {
    if(isLoadingButton){
      const timeOut = setTimeout(() => {
        // setActiveStep((prev) => (prev + 1))
        setIsLoadingButton(false);
        
      }, 1500);

      return () => {
        clearTimeout(timeOut);
      }
    }
  },[isLoadingButton])
  //! Render
  return (
    <Fragment>
      <Grid container>
        <Typography variant='h5'>
          Order detail
        </Typography>
        <Grid container sx={{marginTop: '2.5rem', padding: '.5rem', borderRadius: '16px', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', marginBottom: '3rem',}}>
          <Grid container xs={12} sx={{padding: '1rem 1.5rem', borderRadius: '16px',boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'}}>
            <Grid item xs={12} sx={{display: 'flex', justifyContent:'center', marginBottom: '1.5rem'}}>
              <Typography variant='h6'>
                Customer information
              </Typography>
            </Grid>
            <Grid container xs={10} sx={{marginBottom: '.75rem'}}>
              <Grid item xs={3}>
                <Typography variant='body1'>
                  Người đặt:
                </Typography>
              </Grid>
              <Grid item >
              <Typography variant='body1'>
                  <b>{valueCheckout?.name}</b>
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={10} sx={{marginBottom: '.75rem'}}>
              <Grid item xs={3}>
                <Typography variant='body1'>
                  Số điện thoại: 
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body1'>
                  <b>{valueCheckout?.phoneNumber}</b> 
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={10} sx={{marginBottom: '.75rem'}}>
              <Grid item xs={3}>
                <Typography variant='body1'>
                  Email:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body1'>
                  <b>{valueCheckout?.email}</b> 
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={10} sx={{marginBottom: '.75rem'}}>
              <Grid item xs={3}>
                <Typography variant='body1'>
                  Nhận sản phẩm tại: 
                </Typography>
              </Grid>
              <Grid item >
                <Typography variant='body1'>
                  <b>{valueCheckout?.address} <br/>{listCity?.find(el => el?.Id === valueCheckout?.city)?.Districts.find(el => el?.Id === valueCheckout?.district)?.Wards.find(el => el?.Id === valueCheckout?.ward)?.Name} - {listCity?.find(el => el?.Id === valueCheckout?.city)?.Districts.find(el => el?.Id === valueCheckout?.district)?.Name } - {listCity?.find(el => el?.Id === valueCheckout?.city)?.Name}</b> 
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={10} sx={{marginBottom: '.75rem'}}>
              <Grid item xs={3}>
                <Typography variant='body1'>
                  Hình thức thanh toán: 
                </Typography>
              </Grid>
              <Grid item >
                <Typography variant='body1'>
                  <b style={{textTransform: 'uppercase'}}>{valueCheckout?.paymentType}</b> 
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={10} sx={{marginBottom: '.75rem'}}>
              <Grid item xs={3}>
                <Typography variant='body1'>
                  Lưu ý:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body1'>
                  <b>{valueCheckout?.note}</b> 
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{padding:'1.5rem', borderRadius: '4px', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'}}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent:'center', marginBottom: '1.5rem'}}>
            <Typography variant='h6'>
              Product information
            </Typography>
          </Grid>
          <Grid container sx={{marginBottom: '1rem'}}>
            <Grid item xs={1} sx={{textAlign: 'center'}}>
              <Typography variant='subtitle1'>
                Image
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{textAlign: 'center'}}>
              <Typography variant='subtitle1'>
                NameProduct
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{textAlign: 'right'}}>
              <Typography variant='subtitle1'>
                Color
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{textAlign: 'right'}}>
              <Typography variant='subtitle1'>
                Amount
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{textAlign: 'center'}}>
              <Typography variant='subtitle1'>
                Price
              </Typography>
            </Grid>
          </Grid>
          {(productList || []).map((item, index) => {
            const {id, color, img, name, company, amountCart, price} = item;
            return(
              <Grid key={`${id}-${color}`}container>
                <Grid item xs={1}>
                  <img style={{width: '100%', borderRadius: '4px'}} src={img} alt={`${name}-${color}`}/>
                </Grid>
                <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Typography variant='body1' sx={{display: 'block'}}>
                    {name} - {company}
                  </Typography>
                </Grid>
                <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Box sx={{backgroundColor: `${color}`, width: '45px', height: '45px', borderRadius: '8px'}}/>
                </Grid>
                <Grid item xs={2} sx={{display:'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                  <Typography variant='body1' sx={{display: 'block'}}>
                    {amountCart}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Typography variant='body1' sx={{display: 'block'}}>
                    {amountCart*price} $
                  </Typography>
                </Grid>
              </Grid>   
            )
          })}
        </Grid>
        <Grid container sx={{padding:'1.5rem', marginTop: '2.5rem', marginBottom: '2.5rem', borderRadius: '4px', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'}}>
          <Grid item xs={12} sx={{marginBottom: '1.5rem'}}>
            <Typography variant='h6'>
              TotalPrice
            </Typography>
          </Grid> 
          <Grid container xs={10} sx={{marginBottom: '1rem'}}>
            <Grid item xs={3}>
              <Typography variant='body1'>
                TotalPriceOrder: 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                <b>
                  {cartState?.total}
                </b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={10} sx={{marginBottom: '1rem'}}>
            <Grid item xs={3}>
              <Typography variant='body1'>
                DiscountCode: 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                <b>
                  {discountData?.idDiscount}
                </b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={10} sx={{marginBottom: '1rem'}}>
            <Grid item xs={3}>
              <Typography variant='body1'>
                PriceReduced: 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                <b>
                  {renderTotalDiscount()}
                </b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={10} sx={{marginBottom: '1rem'}}>
            <Grid item xs={3}>
              <Typography variant='body1'>
                ShippingFee: 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                <b>
                  {cartState?.shippingFee}
                </b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={10} sx={{marginBottom: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem'}}>
            <Grid item xs={3}>
              <Typography variant='body1'>
                TotalPrice: 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                <b>
                  {cartState?.orderTotal - renderTotalDiscount()}
                </b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={10} sx={{paddingTop: '1rem', display:'flex', justifyContent: 'flex-end', position: 'absolute', right:'40px', bottom: '40px'}}>
        {/* <ButtonCustom loading={true} variant="outlined" type="submit" title="Next"/> */}
        <LoadingButton loading={isLoadingButton} type="submit" variant="outlined" onClick={handleConfirmOrder}>
          CheckOut
        </LoadingButton>
      </Grid>
    </Fragment>
  )
}

export default ReviewOrder