import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const NotiAdmin = (props) => {
    //! State
    const {open, setOpen, mes} = props;

    //! Function
    const handleClose = () => {
        setOpen(false);
    }

    //! Render
  return (
    <Snackbar anchorOrigin={{vertical: "top",horizontal: "right"}} sx={{marginBottom: '3rem'}} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={mes?.type || "success"} onClose={handleClose}>
        {mes?.msg}
        </Alert>
    </Snackbar>
  )
}

export default NotiAdmin