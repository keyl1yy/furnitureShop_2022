import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const toastTify = (typeToast, message) => {
    switch(typeToast) {
        case "success": 
            toast.success(`${message}`,{
                autoClose: 1500
            })
            return
        case "error": 
            toast.error(`${message}`,{
                autoClose: 1500
            })
            return
        case "warn":
            toast.warn(`${message}`,{
                autoClose: 1500
            })
            return
        case "info": 
            toast.info(`${message}`,{
                autoClose: 1500
            })
            return
        default:
            toast(`${message}`,{
                autoClose: 1500
            })
    }
}

