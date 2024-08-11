import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'This Year',
      data: [100, 200, 150, 300, 200, 400, 350, 450],
      fill: false,
      borderColor: '#36A2EB',
    },
    {
      label: 'Last Year',
      data: [50, 100, 125, 175, 250, 300, 350, 400],
      fill: false,
      borderColor: '#FFCE56',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Earning Summary',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Earnings (in Birr)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
  },
};

const EarningSummary: React.FC = () => {
  return (
    <Card sx={{ height: '400px' }}>
      <CardContent>
        <Typography variant="h6">Earning Summary</Typography>
        <Line data={data}  />
      </CardContent>
    </Card>
  );
};

export default EarningSummary;
