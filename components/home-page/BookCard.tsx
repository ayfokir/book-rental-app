// components/CategoryItem.tsx
'use client'
import Image from 'next/image';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';
import Link from 'next/link';

interface Book {
  title:  string
  description: string;
  price: string;
  rating: string ;
  image:  string;
}

const BookCard: React.FC<Book> = ({ image, title, description, price, rating }) => {
    return (
      <Link href={"/"}>
      <Box sx={{ maxWidth: "200px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: 1 }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
          <Image
            src={image}
            alt={title}
            width={150}
            height={150}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </Box>
        <CardContent sx={{ padding: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {description.length > 50 ? `${description.substring(0, 50)}...` : description}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
            USD ${price}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
            {rating} ★
          </Typography>
          {/* <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            {reviewCount} reviews
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            {shopName}
          </Typography> */}
        </CardContent>
      </Box>
    </Link>
  );
};

export default BookCard;
