import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const SelectCustom = (props) => {
    //! State
    const {form, field, sx, label, dataOption} = props;
    const name = field?.name;
    const value = field?.value;
    const error = form?.errors?.[name]
    const touched = form?.touched?.[name];
    //! Function
    const handleChange = (e) => {
        form && form?.setFieldValue(name, e.target.value)
    }


    //! Render
  return (
    <FormControl 
        variant="standard"
        sx={{...sx}}
        error={(error&&touched) ? true : false}
        {...props}
    >
        <InputLabel id={label}>{label}</InputLabel>
        <Select
            labelId={label}
            value={value}
            label={label}
            onChange={handleChange}
        >
            {dataOption?.map((el,index) => {
                const {value, label} = el;
                return(
                    <MenuItem key={el.value} value={value}>{label}</MenuItem>
                )
            })}
        </Select>
        {
            (error && touched) && <FormHelperText>{error}</FormHelperText>
        }
    </FormControl>
  )
}

export default SelectCustom