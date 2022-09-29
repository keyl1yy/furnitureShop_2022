import {useEffect, useState} from 'react'
import {getAllProducts, getSingleProductAxios} from '../../services/adminPage/productService'
export const useGetAllProduct = (query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await getAllProducts(query);
            if(response?.status === 200){
                setData(response?.data?.products);
                setIsLoading(false)
            }
            
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            getProducts();
        },500)
        return(() => {
            clearTimeout(timeOut);
        })
    },[query])

    const refresh = () => {
        getProducts()
    }

    return {data, error, isLoading, refresh}
}

export const useGetProductId = (id) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProductWithId = async () => {
        setIsLoading(true);
        try {
            const response = await getSingleProductAxios(id);
            if(response && response?.status === 200) {
                setData(response?.data?.product);
                setIsLoading(false);
            }
            
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProductWithId();
    },[])
    const refresh = () => {
        getProductWithId();
    }

    return {data, isLoading, error, refresh}
}
