import axios from "../axios";
import { GET_ADDRESS_ID_API } from "./apiRoutes";

const getAddressWithIdUser = (id) => {
    return axios.get(`${GET_ADDRESS_ID_API}${id}`)
}

export {getAddressWithIdUser}