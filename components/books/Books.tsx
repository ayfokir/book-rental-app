// components/GiftCategories.js
import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const giftCategories = [
  {
    title: 'Anniversary gifts',
    image: '/path/to/anniversary-image.jpg', // replace with actual image path
  },
  {
    title: 'Gifts for him',
    image: '/path/to/gifts-for-him-image.jpg', // replace with actual image path
  },
  {
    title: 'Gifts for her',
    image: '/path/to/gifts-for-her-image.jpg', // replace with actual image path
  },
  {
    title: 'Personalized gift ideas',
    image: '/path/to/personalized-gift-ideas-image.jpg', // replace with actual image path
  },
  {
    title: 'Wedding gifts',
    image: '/path/to/wedding-gifts-image.jpg', // replace with actual image path
  },
];

const GiftCategories = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Shop our popular gift categories
      </Typography>
      <Grid container spacing={3}>
        {giftCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {category.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GiftCategories;
