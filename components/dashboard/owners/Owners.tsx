"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "@/components/dashboard/sideBar/SideBar";
import Header from "@/components/dashboard/header/Header";
import { useRouter } from "next/navigation";
import getAuth from "@/app/util/Auth";
import OwnerTable from "../table/OwnerTable";
import { MRT_ColumnDef } from "material-react-table";
import { Owner } from "@/app/types/Book";
const Owners: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const KnowCustomer = async () => {
      const customer = await getAuth();
      if (!customer.token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    KnowCustomer;
  }, []);

  // if (loading) {
  //   // Optionally render a loading spinner or message while checking auth
  //   return <div>Loading...</div>;
  // }

  const data: Owner[] = [
    {
      owner_id: "1",
      quantity: "5",
      location: "Aisle 3",
      status: "Rented",
      price: "40 Birr",
      owner: "Nardos T",
    },
    {
      owner_id: "2",
      quantity: "10",
      location: "Aisle 1",
      status: "Free",
      price: "0.0 Birr",
      owner: "Harry M",
    },
    {
      owner_id: "3",
      quantity: "8",
      location: "Aisle 4",
      status: "Free",
      price: "0.0 Birr",
      owner: "Emily K",
    },
    {
      owner_id: "3",
      quantity: "8",
      location: "Aisle 4",
      status: "Free",
      price: "0.0 Birr",
      owner: "Emily K",
    },
    {
      owner_id: "3",
      quantity: "8",
      location: "Aisle 4",
      status: "Free",
      price: "0.0 Birr",
      owner: "Emily K",
    },
    {
      owner_id: "3",
      quantity: "8",
      location: "Aisle 4",
      status: "Free",
      price: "0.0 Birr",
      owner: "Emily K",
    },
    {
      owner_id: "3",
      quantity: "8",
      location: "Aisle 4",
      status: "Free",
      price: "0.0 Birr",
      owner: "Emily K",
    },
    {
      owner_id: "3",
      quantity: "8",
      location: "Aisle 4",
      status: "Free",
      price: "0.0 Birr",
      owner: "Emily K",
    },
    {
      owner_id: "3",
      quantity: "8",
      location: "Aisle 4",
      status: "Free",
      price: "0.0 Birr",
      owner: "Emily K",
    },
    {
      owner_id: "3",
      quantity: "8",
      location: "Aisle 4",
      status: "Free",
      price: "0.0 Birr",
      owner: "Emily K",
    },
    // Add more data as needed
  ];

  const columns: MRT_ColumnDef<Owner>[] = [
    {
      accessorKey: "owner_id",
      header: "Owner ID",
      size: 100,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      size: 100,
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 150,
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
    {
      accessorKey: "owner",
      header: "Owner",
      size: 200,
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
        <SideBar isFullHeight={false} />
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
        <Box display={"flex"} justifyContent={"center"}>
          <OwnerTable data={data} columns={columns} height="528px" />
        </Box>
      </Box>
    </Box>
  );
};

export default Owners;
