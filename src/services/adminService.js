import axios from '../axios'
import { attachTokenToHeader } from '../axios'
import { LOGIN_ADMIN_API, LOGIN_ADMIN_TOKEN_API } from './apiRoutes'

const loginAdmin = (data) => {
    return axios.post(LOGIN_ADMIN_API,data)
}
const loginAdminWithTokenAPI = (token) => {
    console.log("hoatla",token);
    return axios.post(LOGIN_ADMIN_TOKEN_API,attachTokenToHeader(token))
}

export {loginAdmin,loginAdminWithTokenAPI}