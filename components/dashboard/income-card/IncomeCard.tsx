import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AvailableBooksCard from "../pie-chart/AvailableBooksCard";
const IncomeCard: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "white", height: "124vh"}} 
        marginTop={"24px"} padding={"24px"}>
      <Typography variant="subtitle2" color="text.secondary">
        This Month Statistics
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Tue, 14 Nov, 2024, 11:30 AM
      </Typography>
      <Card
        sx={{ p: 2, borderRadius: "16px", boxShadow: 3, marginTop: "24px" }}
      >
        <CardContent>
          <Box mt={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="subtitle1">Income</Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  backgroundColor: "rgb(244,245,247)",
                  py: 0.3,
                  px: 1,
                  fontSize: "12px",
                }}
              >
                This Month
              </Typography>
            </Box>
            <Box display="flex" gap={1} alignItems="center">
              <Typography variant="h6" fontWeight="bold">
                ETB 9460.00
              </Typography>
              <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                <ArrowDownwardIcon color="error" fontSize="small" />
                <Typography variant="body2" color="error" ml={0.5}>
                  1.5%
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Compared to ETB9940 last month
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Last Month Income{" "}
              <Typography component="span" fontWeight="bold">
                ETB 25658.00
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
      < AvailableBooksCard />
    </Box>
  );
};

export default IncomeCard;
