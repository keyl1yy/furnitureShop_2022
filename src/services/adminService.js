import axios from '../axios'
import { attachTokenToHeader } from '../axios'

const loginAdmin = (data) => {
    return axios.post('/admin/login',data)
}
const loginAdminWithTokenAPI = (token) => {
    return axios.post('/admin/login-with-token',attachTokenToHeader(token))
}

export {loginAdmin,loginAdminWithTokenAPI}