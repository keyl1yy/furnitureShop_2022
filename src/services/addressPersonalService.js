import axios from "../axios";

const getAddressWithIdUser = (id) => {
    return axios.get(`/address-personal/${id}`)
}

export {getAddressWithIdUser}