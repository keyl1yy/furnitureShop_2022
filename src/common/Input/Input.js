import React from 'react'
import { FormControl, Input as InputMUI, InputLabel, OutlinedInput, TextField } from '@mui/material'
const InputCustom = (props) => {
    //! State
    const {field, form, label, sx, placeholder} = props;
    console.log("InputProps",props);
    const name = field?.name;
    const value = field?.value;
    const error = form?.errors?.[name];
    const touched = form?.touched?.[name]; 
    //! Function
    const handleChange = (e) => {
        form && form.setFieldValue(name, e.target.value);
    }

    //! Render
  return (
    <TextField
        error={(error&&touched) ? true : false}
        id={`input-custom-${label}`}
        label={label}
        value={value}
        placeholder={placeholder}
        sx={{...sx}}
        onChange={handleChange}
        helperText={(error&&touched) ? error : ""}
    />
  )
}

export default InputCustom