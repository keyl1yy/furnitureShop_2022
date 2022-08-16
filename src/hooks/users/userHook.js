import { useEffect, useState } from "react"
import { getAllUser } from "../../services/adminPage/userService";

export const useGetAllUser = (query) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getListUser = async () => {
        setLoading(true)
        try {
            const response = await getAllUser(query);
            if(response?.status === 200) {
                setData(response?.data);
                setLoading(false);
            }
        } catch (error) {
            setError(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getListUser()
    },[query])
    const refresh = () => {
        getListUser()
    }

    return {data, error, loading, refresh}
}