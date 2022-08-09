import axios from "../../axios"
import { attachTokenToHeader } from '../../axios'

const getAllUser = () => {
    return axios.get('/users')
}

export {getAllUser}