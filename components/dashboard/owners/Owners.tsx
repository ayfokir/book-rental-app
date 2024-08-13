"use client";
import React, { use, useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "@/components/dashboard/sideBar/SideBar";
import Header from "@/components/dashboard/header/Header";
import { useRouter } from "next/navigation";
import getAuth from "@/app/util/Auth";
import OwnerTable from "../table/OwnerTable";
import { MRT_ColumnDef } from "material-react-table";
import { Owner } from "@/app/types/Book";
import { RootState } from "@/redux/store/Store";
import { fetchUsersStart } from "@/redux/slices/User";
import { useSelector, useDispatch } from "react-redux";
const Owners: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch   = useDispatch()
  const users  =  useSelector((state: RootState)  => state.users.users)
  console.log("inside Owner page:", users)


  const formattedUsers = users.map((user, index) => {
    // Generate a sequential book_id starting from "01"
    const user_id = (index + 1).toString().padStart(2, '0');
    console.log("users", users)
    return {
      owner_id: user_id,
      owner: user.email,
      location: user.location,
      upload: user.Books.length
    };
  });
  console.log("formattedUsers",formattedUsers)




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
    dispatch(fetchUsersStart())
  }, []);

  // if (loading) {
  //   // Optionally render a loading spinner or message while checking auth
  //   return <div>Loading...</div>;
  // }

  const columns: MRT_ColumnDef<Owner>[] = [
    {
      accessorKey: "owner_id",
      header: "Owner ID",
      size: 100,
    },
    {
      accessorKey: "owner",
      header: "owner",
      size: 100,
    },
    {
      accessorKey: "upload",
      header: "Upload",
      size: 150,
    },
    {
      accessorKey: "location",
      header: "Location",
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
          <OwnerTable data={formattedUsers} columns={columns} height="528px" />
        </Box>
      </Box>
    </Box>
  );
};

export default Owners;
