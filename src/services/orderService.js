import axios, { requestFormData } from '../axios'
import { CREATE_ORDER_API } from './apiRoutes'

export const createOrder = (data) => {
    return axios.post(CREATE_ORDER_API, data, requestFormData())
}
