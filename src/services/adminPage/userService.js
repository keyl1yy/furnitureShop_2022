import axios from "../../axios"
import { attachTokenToHeader } from '../../axios'

export const getAllUser = (query) => {
    return axios.get('/users',{params:{
        name: query
    }})
}

export const getUserId = (id) => {
    return axios.get(`/users/${id}`)
}

export const updateUserId = (id, data) => {
    return axios.patch(`/users/${id}`,data)
}

