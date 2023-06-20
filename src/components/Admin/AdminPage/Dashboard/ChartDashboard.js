import { Typography } from '@mui/material';
import React, { Fragment } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartStatistic } from '../StatisticPage/ChartStatistic';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const ChartDashboard = (props) => {
  //! Props
  const {products} = props;
  console.log("hoatlaPro", products);
  //! State
  const labels = products?.map(el => el?.name);
  const data = products?.map(el => el?.amount)
  //! Function

  //! Effect

  //! Render
  return (
    <Fragment>
      <Typography variant='h6' component='h1' gutterBottom sx={{marginBottom: '1rem'}}>Analytics</Typography>
      <ChartStatistic labels={labels} dataStatistic={data}/>
    </Fragment>
  )
}

export default ChartDashboard