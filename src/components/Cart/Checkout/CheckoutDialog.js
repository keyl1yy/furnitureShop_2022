import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/system";
import React, { Fragment, useState } from "react";
import useToggleDialog from "../../../hooks/useToggleDialog";
import CloseIcon from "@mui/icons-material/Close";
import ShippingAddress from "./Steps/ShippingAddress";
import PaymentDetail from "./Steps/PaymentDetail";
import ReviewOrder from "./Steps/ReviewOrder";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { lightTheme } from "../../../theme/themeMui";
import { useGetCityOption } from "../../../hooks/city/useGetCity";
import './CheckoutDialog.scss'

const steps = ["Shipping address", "Payment details", "Review your order"];

const StepCustom = styled(Step)(({ theme }) => ({
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: "#ab7a5f",
  },
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
    color: "#ab7a5f",
  },
}));

const CheckoutDialog = () => {
  //! State
  const { open, toggle, shouldRender } = useToggleDialog();
  const {data: listCity, isLoading, error} = useGetCityOption();

  const [activeStep, setActiveStep] = useState(0);
  const [completedStep, setCompletedStep] = useState([]);
  const [valueCheckout, setValueCheckout] = useState({});
  //! Function
  const handleCloseModal = () => {
    setActiveStep(0);
    toggle && toggle();

  }
  //! Effect

  //! Render
  return (
    <Fragment>
      <ThemeProvider theme={lightTheme}>
        <button type="button" className="btn btn-checkout" onClick={toggle}>
          Checkout
        </button>
        {shouldRender && (
          <Dialog maxWidth="lg" fullWidth={true} open={open} scroll='paper'>
              <CloseIcon
                  onClick={handleCloseModal}
                  sx={{
                      position: "absolute",
                      top: "2rem",
                      right: "2rem",
                      cursor: "pointer",
                      "&:hover": { transform: "scale(1.2)" },
                  }}
              />
            <Box sx={{ height: "90vh", padding: "1rem" }}>
              <DialogTitle>
                <Typography
                  sx={{ color: "#453227", marginBottom: "1rem", fontSize: '2.125rem' }}
                >
                  Check out
                  <ShoppingBasketIcon sx={{width: "3rem", fontSize:"2rem"}}/>
                </Typography>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    return (
                      <StepCustom
                        key={label}
                        completed={index < activeStep ? true : false}
                      >
                        <StepLabel>{label}</StepLabel>
                      </StepCustom>
                    );
                  })}
                </Stepper>
              </DialogTitle>
              <DialogContent sx={{height: 'calc(100% - 200px)'}}>
                <DialogContentText>
                  {/* <Button onClick={() => {
                      setActiveStep(prev => prev+1)
                  }}>Next</Button> */}
                </DialogContentText>
                  {activeStep === 0 && <ShippingAddress setActiveStep={setActiveStep} listCity={listCity} setValueCheckout={setValueCheckout}/>}
                  {activeStep === 1 && <PaymentDetail setActiveStep={setActiveStep} valueCheckout={valueCheckout} setValueCheckout={setValueCheckout}/>}
                  {activeStep === 2 && <ReviewOrder valueCheckout={valueCheckout}/>}
              </DialogContent>
            </Box>
          </Dialog>
        )}
      </ThemeProvider>
    </Fragment>
  );
};

export default CheckoutDialog;
