import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  title: {
    display: true,
    text: 'Product Statistic',
  },  
}

export function ChartStatistic(props) {
  const {labels, dataStatistic} = props;
  const data = {
    labels,
    datasets: [
      {
        label: 'Product',
        data: dataStatistic,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return <Bar options={options} data={data} />;
}
