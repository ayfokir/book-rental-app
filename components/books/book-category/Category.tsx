// components/CategoryItem.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
interface CategoryItemProps {
    image: string;
    label: string;
}



const CategoryItem: React.FC<CategoryItemProps> = ({ image, label }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Image
                src={image} 
                alt={label} 
                width={200}
                height={260}
                />
            <Typography variant="subtitle1">{label}</Typography>
        </Box>
    );
};

// style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
export default CategoryItem;
