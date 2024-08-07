// components/TrendsSection.tsx
import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import CategoryItem from './category/Category';

interface Trend {
    image: string;
    label: string;
}

const trends: Trend[] = [
    { image: '/trendes/Art of power.jpg', label: 'Vintage Tees' },
    { image: '/trendes/Atomic Habit.jpeg', label: 'Maximalist Decor' },
    { image: '/trendes/Awakyans.jpg', label: 'Crochet Looks' },
    { image: '/trendes/freen Michaels.jpg', label: 'Best Friend Gifts' },
    { image: '/trendes/over ruled.jpg', label: 'Shell Jewelry' },
    { image: '/trendes/start.png', label: 'Sports-Inspired Styles' },
];

const TrendsSection: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h5" gutterBottom>
          Check out the season's biggest trends
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {trends.map((trend, index) => (
            <Grid item key={index} sx={{ gap: 2 }}>
              <CategoryItem image={trend.image} label={trend.label} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
};

export default TrendsSection;
