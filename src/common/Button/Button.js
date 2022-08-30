import { Button as ButtonMUI} from '@mui/material'
import React from 'react'

const ButtonCustom = (props) => {
    //! State
    const {title, sx, variant, disabled, onClick, type} = props;
    //! Function

    //! Render
  return (
    <ButtonMUI 
        sx={{...sx}}
        variant={variant}
        disabled={disabled}
        type={type}
        onClick={onClick}
    >
        {title}
    </ButtonMUI>
  )
}

export default ButtonCustom