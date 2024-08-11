import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "./sideBar/SideBar";
import IncomeCard from "./income-card/IncomeCard";
import BookTable from "./book-table/BookTable";
import EarningSummary from "./earning-summary/EarningSummary";
import Header from "./header/Header";
import { useRouter } from "next/navigation";
import getAuth from '@/app/util/Auth';
const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const KnowCustomer  = async ()  => {
      const customer=  await getAuth()
      if (!customer.token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
    KnowCustomer
  }, []);

  // if (loading) {
  //   // Optionally render a loading spinner or message while checking auth
  //   return <div>Loading...</div>;
  // }

  return (
    <Box sx={{ display: "flex", backgroundColor: "rgb(240,242,255)" , paddingBottom: '80px'}}>
      {/* Sidebar */}
      <Box sx={{ width: isSmallScreen ? "100%" : "20%" }}>
        <SideBar />
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: isSmallScreen ? "100%" : "75%",  height: '100vh', // Full height
        }}
      >
        <Header />
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", flexDirection: "column" }}>
            <IncomeCard />
          </Grid>

          <Grid item xs={12} md={6} lg={8} sx={{ display: "flex", flexDirection: "column", gap: 3 }}  >
            <BookTable />
            <EarningSummary />
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
