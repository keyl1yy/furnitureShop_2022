import { useTheme } from '@emotion/react';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

const RadioPaymentCheckout = (props) => {
    //! State
    const theme = useTheme();
    const {title, sx, field, form, dataOption} = props;
    // console.log("propsRadio",props);
    const name = field?.name;
    const value = field?.value;
    //! Function
    const handleChange = (value) => {
        form && form?.setFieldValue(name,value)
    }

    const handleClickPayment = (value) => {
        handleChange(value);
    }

    //! Render
  return (
    <FormControl sx={{width: '100%'}}>
        <FormLabel 
            id={`radio-button-${name}`}
            sx={{...sx, color: theme.palette.defaultLayout.hoverBtn}}
        >{title}</FormLabel>
        <RadioGroup
            aria-labelledby={`radio-button-${name}`}
            defaultValue={value}
            name={name}
            onChange={(e) => handleChange(e.target.value)}
        >   
        {dataOption?.map((el,index) => {
            const {value, label, imgUrl, subTitle} = el;
            return(
                <Grid container 
                        columnSpacing={2} 
                        key={el.value} 
                        sx={{
                            border: '2px solid #d9d9d9',
                            borderColor: `${field?.value === value ? theme.palette.defaultLayout.hoverBtn : '#d9d9d9'}`,
                            borderRadius:'16px',
                            alignItems:'center',
                            padding: '1rem 1.3rem', 
                            width: '100%', 
                            marginBottom: '1.3rem', 
                            // cursor:'pointer'
                            
                        }}>
                    <Grid item xs={1}>
                        <FormControlLabel value={value} control={<Radio/>}/>
                    </Grid>
                    <Grid item xs={2} sx={{placeItems: 'center'}}>
                        <img src={imgUrl} alt={value} style={{minWidth:'35px', maxHeight:'35px',maxWidth:'55px', display:'block'}}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant='subtitle1' component="h4">{label}</Typography>
                        {subTitle && <Typography variant='subtitle2' component="h5">{subTitle}</Typography>}
                    </Grid>
                </Grid>
            )
        })}
        </RadioGroup>
    </FormControl>
  )
}

export default RadioPaymentCheckout