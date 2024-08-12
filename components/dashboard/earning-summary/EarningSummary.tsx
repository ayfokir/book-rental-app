import React from 'react';
import { Box, Typography, Select, MenuItem, useTheme } from '@mui/material';
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area,
} from 'recharts';

const data = [
  { name: 'May', last6Months: 250000, lastYear: 100000 },
  { name: 'Jun', last6Months: 220000, lastYear: 150000 },
  { name: 'Jul', last6Months: 260000, lastYear: 220000 },
  { name: 'Aug', last6Months: 240000, lastYear: 170000 },
  { name: 'Sep', last6Months: 210000, lastYear: 180000 },
  { name: 'Oct', last6Months: 230000, lastYear: 190000 },
];

const EarningSummary: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, p: 3, boxShadow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mr: 2 }}>Earning Summary</Typography>
          <Select defaultValue="Mar 2022 - Oct 2024" variant="outlined" size="small">
            <MenuItem value="Mar 2022 - Oct 2024">Mar 2022 - Oct 2024</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: theme.palette.primary.main }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="body2">Last 6 Months</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: theme.palette.grey[500] }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: theme.palette.grey[500], mr: 1 }} />
            <Typography variant="body2">Same Period Last Year</Typography>
          </Box>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height={276}>
        <ComposedChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }} // Adjust the margins here
        >
          <defs>
            <linearGradient id="colorLast6Months" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value / 1000}k Birr`} />
          <Tooltip formatter={(value: number) => `${value} Birr`} />
          <Area
            type="monotone"
            dataKey="last6Months"
            stroke={theme.palette.primary.main}
            fill="url(#colorLast6Months)"
            name="Last 6 months"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="lastYear"
            stroke={theme.palette.grey[500]}
            strokeDasharray="3 3"
            name="Same period last year"
            dot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default EarningSummary;
