import { Grid, Typography } from '@mui/material'
import React, { Fragment, useCallback, useMemo } from 'react'

const TopProduct = (props) => {
  //! Props
  const {products} = props;
  //! State

  const totalProducts = products?.reduce((prev, cur) => {
    return prev + (cur?.amount * cur?.price)
  },0)
  //! Function
  //! Effect

  //! Render
  return (
    <Fragment>
      <Typography variant='h6' component="h1" gutterBottom sx={{marginBottom: '1rem'}}>Top Product</Typography>
      {(products || [])?.map(el => {
        const {name, amount, price} = el;
        return(
          <Grid container key={el?.id} sx={{marginBottom: '.75rem'}}>
            <Grid item xs={4}>
              {name}
            </Grid>
            <Grid item xs={2}>
              {amount}
            </Grid>
            <Grid item xs={3}>
              {price} đ
            </Grid>
            <Grid item xs={3}>
              {amount * price} đ
            </Grid>
          </Grid>
        )
      })}
      <Grid container>
        <Grid item xs={6}/>
        <Grid item xs={3} sx={{fontSize: '1rem', fontWeight: '500'}}>
          Total:
        </Grid>
        <Grid item xs={3} sx={{fontWeight: '500'}}>
          {totalProducts} đ
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default TopProduct