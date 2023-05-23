import axios from '../../axios'
import { STATISTIC_URL } from '../apiRoutes'

export const getDataStatisticService = (query) => {
  return axios.get(STATISTIC_URL ,{params: query})
}