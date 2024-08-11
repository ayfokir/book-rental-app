import React from 'react';
import { Box, Card, CardContent, Typography, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip);

const AvailableBooksCard: React.FC = () => {
  // Sample data for the donut chart
  const data = {
    labels: ['Fiction', 'Self Help', 'Business'],
    datasets: [
      {
        data: [54, 20, 26],
        backgroundColor: ['#007bff', '#28a745', '#dc3545'],
        hoverBackgroundColor: ['#007bff', '#28a745', '#dc3545'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
    },
  };

  return (
    <Card sx={{ p: 2, borderRadius: '16px', boxShadow: 3, marginTop: "24px" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" color="text.secondary">
            Available Books
          </Typography>
          <Typography sx={{backgroundColor: "rgb(244,245,247)", py: 0.3, px: 1,  fontSize: "12px"}}> Today </Typography >
        </Box>
        
        <Box 
                  mt={2}
                  mb={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '150px',
                    height: '150px',
                    margin: '0 auto' // Centers the box horizontally
                  }}>
          <Doughnut data={data} options={options} />
        </Box>
        
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ color: '#007bff' }} />
            </ListItemIcon>
            <ListItemText primary="Fiction" />
            <Typography variant="body2">54</Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ color: '#28a745' }} />
            </ListItemIcon>
            <ListItemText primary="Self Help" />
            <Typography variant="body2">20</Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ color: '#dc3545' }} />
            </ListItemIcon>
            <ListItemText primary="Business" />
            <Typography variant="body2">26</Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default AvailableBooksCard;
