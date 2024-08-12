import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "./sideBar/SideBar";
import IncomeCard from "./income-card/IncomeCard";
import BookTable from "./table/BookTable";
import EarningSummary from "./earning-summary/EarningSummary";
import Header from "./header/Header";
import { useRouter } from "next/navigation";
import getAuth from "@/app/util/Auth";
import { MRT_ColumnDef } from "material-react-table";
import { Book } from "@/app/types/Book";
const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    const KnowCustomer = async () => {
      const customer = await getAuth();
      if (!customer.token) {
        router.push("/login");
      } else {
        // setLoading(false);
      }
    };
    KnowCustomer;
  }, []);

  const data = [
    {
      book_id: "1",
      book_no: "6485",
      owner: "Nardos T",
      status: "Rented",
      price: "40 Birr",
    },
    {
      book_id: "2",
      book_no: "5665",
      owner: "Harry M",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      book_id: "2",
      book_no: "5665",
      owner: "Harry M",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      book_id: "2",
      book_no: "5665",
      owner: "Harry M",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      book_id: "2",
      book_no: "5665",
      owner: "Harry M",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      book_id: "2",
      book_no: "5665",
      owner: "Harry M",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      book_id: "2",
      book_no: "5665",
      owner: "Harry M",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      book_id: "2",
      book_no: "5665",
      owner: "Harry M",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      book_id: "2",
      book_no: "5665",
      owner: "Harry M",
      status: "Free",
      price: "0.0 Birr",
    },
    // Add more data as needed
  ];
  const columns: MRT_ColumnDef<Book>[] = [
    {
      accessorKey: "book_id",
      header: "No.",
      size: 100,
    },
    {
      accessorKey: "book_no",
      header: "Book no.",
      size: 150,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      size: 200,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 150,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgb(240,242,255)",
        paddingBottom: "80px",
      }}
    >
      {/* Sidebar */}
      <Box sx={{ width: isSmallScreen ? "100%" : "20%" }}>
        <SideBar isFullHeight={true} />
      </Box>
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: isSmallScreen ? "100%" : "75%",
          height: "100vh", // Full height
        }}
      >
        <Header />
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <IncomeCard />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={8}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <BookTable data={data} columns={columns} height="300px" />
            <EarningSummary />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
