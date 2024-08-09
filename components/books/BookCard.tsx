// components/CategoryItem.tsx
'use client'
import Image from 'next/image';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { setSelectedBook } from '@/redux/slices/SelectedBookSlice';
import { Book } from  '@/app/types/Book';


const BookCard: React.FC<Book> = ({ image, title, description, rental_price, rating }) => {
    const dispatch = useDispatch(); // Get dispatch function from Redux
    const handleSelectBook = () => {
    dispatch(setSelectedBook({ title, image , description, rental_price, rating}))
    }
    return (
    <Link href={"/book-overview"} onClick={handleSelectBook} >
    <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
    <Image
          src={image}
          alt={title}
          width={200}
          height={270}
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
          Rental Price: ${rental_price}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Rating: {rating}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Rent Now
        </Button> */}
      </CardContent>
    </Card>
    </Link >
  );
};

export default BookCard;
