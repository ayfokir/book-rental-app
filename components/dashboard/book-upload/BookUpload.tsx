"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "@/components/dashboard/sideBar/SideBar";
import Header from "@/components/dashboard/header/Header";
import { useRouter } from "next/navigation";
import getAuth from "@/app/util/Auth";
import UploadForm from "@/components/dashboard/book-upload/UploadForm";

const BookUpload: React.FC = () => {

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
      <SideBar  /> 
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
        <Box display={"flex"} justifyContent={"center"}  sx={{backgroundColor: "white", marginTop: "24px", height: "98.3vh"}}>
          
            <UploadForm />
          </Box>
        
      </Box>
    </Box>
  );
};

export default BookUpload;
