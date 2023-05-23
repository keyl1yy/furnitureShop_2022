import { useEffect, useState } from "react"
import { getDataStatisticService } from "../../services/adminPage/statisticService";

export const useGetDataStatistic = ({startDate, endDate}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getDataStatisticService({startDate, endDate});
      if(response && response?.status === 200) {
        setIsLoading(false);
        setData(response?.data?.data)
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  },[startDate, endDate])

  const refresh = () => {
    getData()
  }

  return {data, isLoading, error, refresh}
}