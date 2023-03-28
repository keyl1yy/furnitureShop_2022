import { useEffect, useState } from "react"
import { getAddressWithIdUser } from "../../services/addressPersonalService";

export const useGetAddressPersonal = (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await getAddressWithIdUser(id);
            if(response && response?.status === 200){
                setData(response?.data?.data);
                setIsLoading(false);
            }
            console.log("responseAddress",response);
        } catch (error) {
            setError(error);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(id) {
            getData()
        }
    },[id])

    const refresh = () => {
        getData()
    }

    return {data, error, isLoading, refresh}
}