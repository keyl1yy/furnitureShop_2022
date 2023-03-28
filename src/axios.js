import axios from "axios";

const urlWeb = window.location.origin;

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error?.response?.status === 401) {
        localStorage.removeItem('accessTokenAdmin');
    }
    return error
  });

export const attachTokenToHeader = (token) => {
    console.log("hoatla1",token);
    instance.interceptors.request.use(function(config) {
        config.headers['Authentication'] = `Bearer ${token}`;
        return config;
    }, function(error) {
        return error;
    })
}



export const requestFormData = () => {
    instance.interceptors.request.use(function(config) {
        config.headers['Content-Type'] = "multipart/form-data";
        return config;
    }, function(error) {
        return error;
    })
}

export const attachBaseVnPayHeader = () => {
    instance.baseURL = 'http://localhost:8888/'
}

export default instance;