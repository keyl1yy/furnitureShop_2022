import axios, { requestFormData } from '../axios'

export const createOrder = (data) => {
    return axios.post('/order', data, requestFormData())
}
