import {useEffect, useState} from 'react'
import {getAllProducts} from '../../services/adminPage/productService'
export const useGetAllProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await getAllProducts();
            if(response?.status === 200){
                setData(response?.data?.products);
                setLoading(false)
            }
            console.log("responseProduct",response);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts()
    },[])

    const refresh = () => {
        getProducts()
    }

    return {data, error, loading, refresh}
}
