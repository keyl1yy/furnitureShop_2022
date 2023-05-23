import { useEffect, useState } from "react"
import { getDataDashboardService } from "../../services/adminPage/dashboardService";

export const useGetDataDashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getDataDashboardService();
      if(response && response.status === 200){
        setIsLoading(false);
        setData(response.data.data);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  },[])

  const refresh = () => {
    getData();
  }

  return {data, isLoading, error, refresh}
}