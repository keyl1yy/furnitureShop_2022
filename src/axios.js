import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
      
    return error
  });

export const attachTokenToHeader = (token) => {
    instance.interceptors.request.use(function(config) {
        config.headers['Authentication'] = `Bearer ${token}`;
        return config;
    }, function(error) {
        return error;
    })
}

export default instance;