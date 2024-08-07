// components/CategoryItem.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface CategoryItemProps {
    image: string;
    label: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ image, label }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <img src={image} alt={label} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <Typography variant="subtitle1">{label}</Typography>
        </Box>
    );
};

export default CategoryItem;
