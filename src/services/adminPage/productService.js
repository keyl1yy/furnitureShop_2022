import axios from "../../axios"
import { attachTokenToHeader } from '../../axios'

const getAllProducts = () => {
    return axios.get('/products')
}

export {getAllProducts}