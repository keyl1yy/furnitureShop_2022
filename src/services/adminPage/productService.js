import axios, { requestFormData } from "../../axios"
import { attachTokenToHeader } from '../../axios'

const PRODUCT_URL = "/products";

const getAllProducts = (query) => {
    return axios.get(PRODUCT_URL,{params: query})
}
const getSingleProductAxios = (id) => {
    return axios.get(`${PRODUCT_URL}/${id}`)
}

const createProduct = (data) => {
    return axios.post(`${PRODUCT_URL}/create`, data, requestFormData())
}

const deleteProduct = (id) => {
    return axios.delete(`${PRODUCT_URL}/${id}`)
}
const updateProduct = (id, data) => {
    return axios.post(`${PRODUCT_URL}/${id}`,data, requestFormData())
}
export {getAllProducts, createProduct, deleteProduct, getSingleProductAxios, updateProduct}