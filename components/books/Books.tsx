// components/TrendsSection.tsx
import React from "react";
import { Typography, Grid, Box, Container } from "@mui/material";
import CategoryItem from "./book-category/Category";

interface Trend {
  image: string;
  label: string;
}

const trends: Trend[] = [
  { image: "/trendes/Think and Grow Rich.jpeg", label: "Think and Grow Rich" },
  // { image: '/trendes/Start With Why Book , Simon Sinek - Simon Sinek.jpeg', label: 'Start With Why Book , Simon Sinek - Simon Sinek' },
  { image: "/trendes/The Power of Know.jpeg", label: "The Power of Know" },
  // { image: '/trendes/The Secret.jpeg', label: 'The Secret' },
  { image: "/trendes/Think and Grow Rich.jpeg", label: "Think and Grow Rich" },
  { image: "/trendes/The Power of Know.jpeg", label: "The Power of Know" },

  { image: "/trendes/Rich Dad Poor Dad.jpeg", label: "Rich Dad Poor Dad" },
  { image: "/trendes/Atomic Habit.jpeg", label: "Atomic Habit" },
  { image: "/trendes/Rich Dad Poor Dad.jpeg", label: "Rich Dad Poor Dad" },
  { image: "/trendes/Atomic Habit.jpeg", label: "Atomic Habit" },

  // { image: '/trendes/Art of power.jpg', label: 'Art of power' },
  { image: "/trendes/Awakyans.jpg", label: "Awakyans" },
  { image: "/trendes/freen Michaels.jpg", label: "freen Michaels" },
  // { image: '/trendes/over ruled.jpg', label: 'over ruled' },
  // { image: '/trendes/start.png', label: 'Start' },
];

const Books: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ pb: 6, pt: 4 }}>
          Check out the season's biggest trends
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {trends.map((trend, index) => (
            <Grid item key={index} sx={{ gap: 8 }}>
              <CategoryItem image={trend.image} label={trend.label} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Books;
