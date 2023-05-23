import axios from "../../axios"
import { attachTokenToHeader } from '../../axios'
import { USER_URL } from "../apiRoutes"

export const getAllUser = (query) => {
    return axios.get(USER_URL,{params: query})
}

export const getUserId = (id) => {
    return axios.get(`${USER_URL}/${id}`)
}

export const updateUserId = (id, data) => {
    return axios.patch(`${USER_URL}/${id}`,data)
}

