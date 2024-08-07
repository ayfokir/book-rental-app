// components/TrendsSection.tsx
import React from 'react';
import { Typography, Grid } from '@mui/material';
import CategoryItem from './category/Category';

interface Trend {
    image: string;
    label: string;
}

const trends: Trend[] = [
    { image: '/trendes/vintage.webp', label: 'Vintage Tees' },
    { image: '/trendes/maximalist.webp', label: 'Maximalist Decor' },
    { image: '/trendes/Crochet Looks.webp', label: 'Crochet Looks' },
    { image: '/trendes/Best Friend.webp', label: 'Best Friend Gifts' },
    { image: '/trendes/sports.webp', label: 'Shell Jewelry' },
    { image: '/trendes/shell.webp', label: 'Sports-Inspired Styles' },
];

const TrendsSection: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Typography variant="h5" gutterBottom>
                Check out the season's biggest trends
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {trends.map((trend, index) => (
                    <Grid item key={index}>
                        <CategoryItem image={trend.image} label={trend.label} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TrendsSection;
