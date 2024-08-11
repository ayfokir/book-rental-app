'use client'
import React from 'react';
import { Card, CardContent, Typography, Button, Box, Container, Divider, Grid } from '@mui/material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBook } from '@/redux/slices/SelectedBookSlice'
import { RootState } from "@/redux/store/Store";
import DetailBookCard from './DetailBookCard';
const BookOverview: React.FC = () => {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.selectedBook.selectedBook);
  const relatedBooks =  useSelector((state: RootState) =>  {
  return  state.books.books.filter( (relatedBook) => relatedBook.title == book?.title)
} ) ;
console.log(relatedBooks)
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
        <>
        <Container maxWidth="xl">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          width: '100%', 
          mb: 2, 
          paddingLeft: "24px", 
          paddingTop: "20px",
          border: 'none' // Ensure no border
        }}>
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
              {relatedBooks?.map((book, index) => (
                <Grid item key={index} sx={{ gap: 8 }}>
              <DetailBookCard
              key={book.title} // Assuming title is unique; adjust if necessary
              image={book.image}
              title={book.title}
              description={book.description}
              rental_price={book.rental_price}
              rating={book.rating}
            />
                </Grid>
              ))}
            </Grid>
        </Container>
      </>
  );
};

export default BookOverview;
