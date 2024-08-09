'use client'
import React from 'react';
import { Card, CardContent, Typography, Button, Box, Container } from '@mui/material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBook } from '@/redux/slices/SelectedBookSlice'
import { RootState } from "@/redux/store/Store";

const BookOverview: React.FC = () => {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.selectedBook.selectedBook);

  const handleClick = () => {
    if (book) {
    dispatch(setSelectedBook(book));
    }
    };

    if (!book) {
    return <Box> There is No Selected Book  </Box>; // Or some other fallback UI
    }

    const { image, title, description, rental_price, rating } = book;

    return (
    <Container maxWidth="xl">
     <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', mb: 2 }}>
      <Box>
        <Image
          src={image}
          alt={title}
          width={200}
          height={270}
        />
      </Box>
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
          Rental Price: ${rental_price}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Rating: {rating}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleClick}>
          Rent Now
        </Button>
      </CardContent>
    </Card>
    </Container>  
  );
};

export default BookOverview;
