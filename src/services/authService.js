import axios from '../axios'
import { attachTokenToHeader } from '../axios'
import { CHANGE_PASS_WORD_USER_API, DELETE_USER_API, GET_ALL_USER_API, LOGIN_USER_API, LOGIN_USER_TOKEN_API, LOG_OUT_API, RESET_PASS_WORD_API, SEND_MAIL_API, UPDATE_USER_INFO_API } from './apiRoutes'
const createUser = (data) => {
    return axios.post(GET_ALL_USER_API,data)
}
const deleteUser = (id) => {
    return axios.delete(`${DELETE_USER_API}/${id}`)
}
const loginUser = (data) => {
    return axios.post(LOGIN_USER_API,data)
}
const sendEmail = (data) => {
    console.log('email',data);
    return axios.post(SEND_MAIL_API,data)
}
const resetPassword = (data,token) => {
    return axios.post(RESET_PASS_WORD_API,data,attachTokenToHeader(token))
}
const loginWithToken = (token) => {
    return axios.post(LOGIN_USER_TOKEN_API,attachTokenToHeader(token))
}
const logoutUser = (token) => {
    return axios.post(LOG_OUT_API,attachTokenToHeader(token))
}

const updateUserInfo = (data, token) => {
    return axios.put(UPDATE_USER_INFO_API, data, attachTokenToHeader(token))
}

const changePasswordUser = (data, token) => {
    return axios.put(CHANGE_PASS_WORD_USER_API, data, attachTokenToHeader(token))
}

export {createUser,loginUser,sendEmail,resetPassword,
        loginWithToken,logoutUser, deleteUser,
        updateUserInfo, changePasswordUser}