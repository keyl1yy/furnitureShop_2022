import { useEffect, useState } from "react";
import axios from "axios";

const url = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json';

export const useGetCityOption = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const getAllCity = async () => {
        setIsLoading(true);
        try {
            const res = await axios(url);
            setData(res?.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        getAllCity()
    },[])



    return {data, error, isLoading}
}