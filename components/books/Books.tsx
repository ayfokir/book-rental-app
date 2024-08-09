// components/TrendsSection.tsx
"use client"
import React from "react";
import { Typography, Grid, Box, Container } from "@mui/material";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";

const Books: React.FC = () => {
  const books = useSelector((state: RootState) =>  {
    console.log(state)
  return  state.books.books
  })
console.log("see books:", books)

  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ pb: 6, pt: 4 }}>
          Check out the season's biggest trends
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {books.map((book, index) => (
            <Grid item key={index} sx={{ gap: 8 }}>
          <BookCard
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
      </Box>
    </Container>
  );
};

export default Books;
