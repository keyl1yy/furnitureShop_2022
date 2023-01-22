import { useEffect, useState } from "react";
import { getDiscountDetail } from "../../services/discountService";

const useGetDiscountWithCode = (discountCode) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true)
        try {
            const response = await getDiscountDetail(discountCode);
            console.log("responseDiscount", response);
        } catch (error) {
            setError(error);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(discountCode){
            getData();
        }
    },[])

    const refresh = () => {
        getData()
    }

    return {data, error, isLoading, refresh}
}

export default useGetDiscountWithCode;