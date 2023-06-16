import axios, { requestFormData } from '../axios'
import { CREATE_ORDER_API } from './apiRoutes'

export const createOrder = (data) => {
    return axios.post(CREATE_ORDER_API, data, requestFormData())
}
export const updateStatusOrder = (data, id) => {
    return axios.patch(`${CREATE_ORDER_API}/${id}`, data)
}
