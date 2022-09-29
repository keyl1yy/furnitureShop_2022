import { InputAdornment, TextField } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description';
import React from 'react'

const InputMutiline = (props) => {
    //! State
    const {field, form, label, sx, placeholder, type, disabled} = props;
    // console.log("field",field);
    const name = field?.name;
    const value = field?.value;
    // console.log("value",value);
    const error = form?.errors?.[name];
    const touched = form?.touched?.[name]; 

    //! Function
    const handleChange = (e) => {
        form && form.setFieldValue(name, e.target.value);
    }
    //! Effect

    //! Render
  return (
    <TextField
        error={(error&&touched) ? true : false}
        id={`input-custom-${label}`}
        label={label}
        value={value}
        multiline
        rows={4}
        placeholder={placeholder}
        sx={{...sx}}
        variant="standard"
        onChange={handleChange}
        helperText={(error&&touched) ? error : ""}
    />
  )
}

export default InputMutiline