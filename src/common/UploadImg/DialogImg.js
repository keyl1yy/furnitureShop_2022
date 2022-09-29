import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

const DialogImg = (props) => {
    //! State
    const {isOpen, setIsOpen, src} = props;
    //! Function
    const handleClose = () => {
        setIsOpen(!isOpen);
    }
    //! Effect

    //! Render
  return (
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        sx={{zIndex: 11}}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Image Detail
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <img src={src} alt="img-demo" style={{width: '100%', height: '100%', objectFit:'cover', borderRadius:'8px'}}/>
        </DialogContent>
    </BootstrapDialog>
  )
}

export default DialogImg