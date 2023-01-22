import axios, { attachBaseVnPayHeader } from "../axios";

export const postVNPay = (data) => {
    return axios.post('/vnPay/create_payment_url', data);
}
