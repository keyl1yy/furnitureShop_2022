import axios from '../axios'

const createUser = (data) => {
    return axios.post('/api/v1/users',data)
}
const loginUser = (data) => {
    return axios.post('/api/v1/users/login',data)
}

export {createUser,loginUser}