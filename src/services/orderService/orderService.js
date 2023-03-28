import axios from "../../axios"

export const getOrderUserByIdService = (id) => {
    return axios.get(`/order/${id}`)
}

export const getAllOrderService = (query) => {
    return axios.get(`/order`, {params: query});
}

export const getOrderDetailByIdService = (id) => {
    return axios.get(`/order/${id}/order`)
}