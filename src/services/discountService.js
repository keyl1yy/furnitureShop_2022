import axios from "../axios";

export const sendMailDiscountService = (email) => {
    return axios.post('/discount/email',{email: email})
}

export const getDiscountDetail = (discountCode) => {
    return axios.get(`/discount/code/${discountCode}`)
}