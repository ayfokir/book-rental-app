'use client'
import React from 'react';
import { Card, CardContent, Typography, Button, Box, Container, Divider, Grid } from '@mui/material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBook } from '@/redux/slices/SelectedBookSlice'
import { RootState } from "@/redux/store/Store";
import BookCard from './BookCard';
const Books: React.FC = () => {

const books = [
  {
    image: "/uploads/Atomic Habit.jpeg",
    title: "Atomic Habit",
    description: "Transform your habits and achieve your goals with this powerful book.",
    price: "$12.00",
    rating: "4.7"
  },
  // {
  //   image: "/uploads/Awakayns.jpg",
  //   title: "Awakayns",
  //   description: "An inspiring tale of personal growth and self-discovery.",
  //   price: "$15.00",
  //   rating: "4.3"
  // },

  {
    image: "/uploads/freen Michaels.jpg",
    title: "freen Michaels",
    description: "A captivating story of adventure and courage.",
    price: "$14.00",
    rating: "4.6"
  },
  {
    image: "/uploads/over ruled.jpg",
    title: "over ruled",
    description: "A critical look at the complexities of legal systems and justice.",
    price: "$11.00",
    rating: "4.0"
  },
  {
    image: "/uploads/Rich Dad Poor Dad.jpeg",
    title: "Rich Dad Poor Dad",
    description: "Learn the secrets of financial success from this best-selling book.",
    price: "$13.00",
    rating: "4.8"
  },
  {
    image: "/uploads/Start With Why Book , Simon Sinek - Simon Sinek.jpeg",
    title: "Start With Why Book , Simon Sinek - Simon Sinek",
    description: "Discover the importance of finding your 'Why' to inspire and lead.",
    price: "$16.00",
    rating: "4.9"
  },
  {
    image: "/uploads/start.jpg",
    title: "start",
    description: "Kickstart your journey towards success with practical advice and tips.",
    price: "$7.00",
    rating: "3.9"
  },
  {
    image: "/uploads/The Power of Know.jpeg",
    title: "The Power of Know",
    description: "Harness the power of knowledge to unlock your true potential.",
    price: "$18.00",
    rating: "4.4"
  },
  {
    image: "/uploads/The Secret.jpeg",
    title: "The Secret",
    description: "Unveil the secrets to achieving your dreams and living a fulfilled life.",
    price: "$20.00",
    rating: "4.7"
  }
];

    return (
        <>
        <Container maxWidth="xl">
        <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
        mb: 2,
        paddingLeft: "24px",
        paddingTop: "20px",
        border: 'none', // Ensure no border
        alignItems: 'center',
      }}
    >
      <Box>
        <Image
          src="/uploads/The Power of Know.jpeg"
          alt="The Power of Know"
          width={200}
          height={270}
        />
      </Box>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography gutterBottom variant="h6" component="div">
          The Power of Know
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Harness the power of knowledge to unlock your true potential.
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mt: 2, mb: 2 }}>
          USD: $80
        </Typography>
        <Button sx={{ mb: 1, textTransform: 'none' }} variant="outlined">
          FREE Shipping  
        </Button>
        <Button variant="contained" color="primary" sx={{ mt: 2, textTransform: 'none' }}>
          Shop this item 
        </Button>
      </CardContent>
    </Box>
      </Container>

            <Divider sx={{
                pt: 1,
                borderBottomWidth: 1.5, // Adjust thickness (default is 1px)
                // borderBottomColor: 'primary.main', // Change color if needed (e.g., 'black' or theme color)
                borderBottomStyle: 'solid' // Ensure the style is solid
                }} />
            <Container  maxWidth="xl" >
              <Grid container spacing={2} justifyContent="flex-start" sx={{  paddingLeft: "24px", paddingTop: "20px"}}>
              {books?.map((book, index) => (
                <Grid item key={index} sx={{ gap: 8 }}>
              <BookCard
              key={book.title} // Assuming title is unique; adjust if necessary
              image={book.image}
              title={book.title}
              description={book.description}
              price={book.price}
              rating={book.rating}

            />
                </Grid>
              ))}
            </Grid>
        </Container>
      </>
  );
};

export default Books;
