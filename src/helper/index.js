import { useGetCityOption } from "../hooks/city/useGetCity";

export const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken ?? ''
}

export const getUserInfo = () => {
  const userInfo = localStorage.getItem('user');
  return userInfo ? JSON.parse(userInfo) : null
}

export const handleGetAddressCity = (address, listCity) => {
  const addressList = address?.split("(")
  const cityCode = addressList[1]?.split(")")[0];
  const city = listCity?.find(el => {
    return Number(el?.Id) === Number(cityCode?.split("-")[2])
  });
  const district = city?.Districts?.find(el => Number(el?.Id) === Number(cityCode?.split("-")[1]));
  const ward = district?.Wards?.find(el => Number(el?.Id) === Number(cityCode?.split("-")[0]));
  return `${addressList[0]}, ${ward?.Name}, ${district?.Name}, ${city?.Name}`
}