import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notify({open,setOpen}) {
    const {msg,errCode} = useSelector(store => store.resetPass)

  const handleClose = () => {
    setOpen(false);
    document.getElementsByTagName('nav')[0].style.display = 'flex';
    document.getElementsByTagName('aside')[0].style.display = 'unset';
    document.getElementsByTagName('footer')[0].style.display = 'flex';
  };

  const handleClickClose = () => {
    if(errCode!==10){
      setOpen(false);
    }else{
      setOpen(true);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        sx={{borderRadius:'16px'}}
        keepMounted
        onClose={() => handleClickClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{msg}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {errCode===10 ? 'Your password has been changed successfully. Back to the Shop?': 'Password reset failed. Your session has expired, please try again later.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{margin:'0 auto'}}>
            <Link to='/'>
                <Button onClick={handleClose}>Go to Shop</Button>
            </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
