import axios from "../../axios"
import { ORDER_URL } from "../apiRoutes";

export const getOrderUserByIdService = (id) => {
    return axios.get(`${ORDER_URL}/${id}`)
}

export const getAllOrderService = (query) => {
    return axios.get(ORDER_URL, {params: query});
}

export const getOrderDetailByIdService = (id) => {
    return axios.get(`${ORDER_URL}/${id}/order`)
}