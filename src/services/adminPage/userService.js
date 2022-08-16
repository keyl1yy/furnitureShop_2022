import axios from "../../axios"
import { attachTokenToHeader } from '../../axios'

const getAllUser = (query) => {
    return axios.get('/users',{params:{
        name: query
    }})
}

export {getAllUser}