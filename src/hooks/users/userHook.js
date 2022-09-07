import { useEffect, useState } from "react"
import { getAllUser, getUserId } from "../../services/adminPage/userService";

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

export const useGetSingleUser = (id) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const getUserID = async () => {
        setIsLoading(true);
        try {
            const response = await getUserId(id);
            if(response && response?.status === 200) {
                setData(response?.data)
                setIsLoading(false)
            }
            
        } catch (error) {
            setError(error);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserID()
    },[])

    const refresh = () => {
        getUserID()

    }
    return {data, isLoading, error, refresh}
}