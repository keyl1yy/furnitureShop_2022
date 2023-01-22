import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import successIcon from '../../../../public/img/tick.png'
import { getAccessToken } from '../../../../helper';
import { useNavigate } from 'react-router-dom';
const CheckoutSuccess = () => {
  //! Props

  //! State
    const navigate = useNavigate();
    const accessToken = getAccessToken();

  //! Function
  const handleClickBtn = () => {
    navigate(`/user/${accessToken}?order=${true}`, { replace: true });
  }
  //! Effect

  //! Render
  return (
    <Box sx={{height: 'calc(100vh - 10rem)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{padding: '3rem 4rem', backgroundColor: '#eaded7', marginBottom: '12rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant='h4' gutterBottom sx={{fontWeight: '500'}}>
          Your order has been received
        </Typography>
        <Box sx={{marginTop:'1rem', marginBottom: '1rem', '&>img': {
          width: '80px'
        }}}>
          <img src={successIcon} alt='success'/>
        </Box>
        <Typography variant='h6' gutterBottom>
          Thank you for your purchase !!!
        </Typography>
        <Button onClick={handleClickBtn} sx={{marginTop: '2rem', padding: '.8rem 1.8rem', fontSize: '20px', 
                    backgroundColor: '#b99179', '&:hover': {
                      backgroundColor: '#c5a491'
                    }}} variant='contained'>
          Check Order
        </Button>
      </Box>
    </Box>
  )
}

export default CheckoutSuccess