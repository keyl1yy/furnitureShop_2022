import React, { useEffect, useState } from 'react'
import { FormControl, IconButton, Input as InputMUI, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
const InputCustom = (props) => {
    //! State
    const {field, form, label, sx, placeholder, type, disabled, variant} = props;
    const typeInput = type || 'text'
    // console.log("field",field);
    const name = field?.name;
    const valueInput = field?.value;
    // console.log("value",value);
    const error = form?.errors?.[name];
    const touched = form?.touched?.[name]; 

    const [isShowPassword, setIsShowPassword] = useState(false);

    //! Function
    const handleChange = (e) => {
        form && form.setFieldValue(name, e.target.value);
    }

    const handleClickShowPassword = () => {
      setIsShowPassword(!isShowPassword);
    }

    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    }

    //! Render
    if(name.toLowerCase().includes('password')){
      return(
        <TextField
          error={(error&&touched) ? true : false}
          id={`input-custom-${label}`}
          label={label}
          value={valueInput}
          placeholder={placeholder}
          type={ isShowPassword ? 'text' : typeInput}
          sx={{...sx}}
          variant={`${variant ? variant : "standard"}`}
          onChange={handleChange}
          helperText={(error&&touched) ? error : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{marginRight: "0px"}}
                >
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          {...props}
      />
    )
    }
  return (
    <TextField
        error={(error&&touched) ? true : false}
        id={`input-custom-${label}`}
        label={label}
        value={valueInput }
        placeholder={placeholder}
        disabled={disabled || false}
        type={typeInput}
        sx={{...sx}}
        variant={`${variant ? variant : "standard"}`}
        onChange={handleChange}
        helperText={(error&&touched) ? error : ""}
        InputProps={{
          startAdornment: (
            name==='price'?
          <InputAdornment position="start">
            $
          </InputAdornment>
          :
          undefined
        )

        }}
        {...props}
    />
  )
}

export default InputCustom