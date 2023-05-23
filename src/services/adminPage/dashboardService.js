import axios from "../../axios"
import { GET_DASHBOARD_API } from "../apiRoutes"

export const getDataDashboardService = () => {
  return axios.get(GET_DASHBOARD_API)
}