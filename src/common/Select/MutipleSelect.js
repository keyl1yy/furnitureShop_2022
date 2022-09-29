import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

const MultipleSelect = (props) => {
    //! State
    const {form, field, sx, label, dataOption} = props;
    const name = field?.name;
    const value = field?.value;
    const error = form?.errors?.[name]
    const touched = form?.touched?.[name];

    const [dataSelect, setDataSelect] = useState([]);
    //! Function
    const handleChange = (e) => {
        const {
            target: { value },
          } = e;
        form && form?.setFieldValue(name,typeof value === 'string' ? value.split(',') : value)
    }
    //! Effect

    //! Render
  return (
    <FormControl 
        variant="standard"
        sx={{...sx}}
        error={(error&&touched) ? true : false}
    >
        <InputLabel id={label}>{label}</InputLabel>
        <Select
            labelId={label}
            value={value}
            label={label}
            multiple
            onChange={handleChange}
        >
            {dataOption?.map((el,index) => {
                const {value, label} = el;
                return(
                    <MenuItem key={index} value={value}>{label}</MenuItem>
                )
            })}
        </Select>
        {
            (error && touched) && <FormHelperText>{error}</FormHelperText>
        }
    </FormControl>
  )
}

export default MultipleSelect