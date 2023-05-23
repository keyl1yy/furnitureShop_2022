import axios from "../axios";
import { GET_DISCOUNT_API, SEND_DISCOUNT_API } from "./apiRoutes";

export const sendMailDiscountService = (email) => {
    return axios.post(SEND_DISCOUNT_API,{email: email})
}

export const getDiscountDetail = (discountCode) => {
    return axios.get(`${GET_DISCOUNT_API}/${discountCode}`)
}