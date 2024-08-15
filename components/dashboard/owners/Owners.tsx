"use client";
import React, { use, useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StatusSwitch from "../books/StatusSwitch";
const Owners: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  console.log("inside Owner page:", users);

  const formattedUsers = users.map((user, index) => {
    // Generate a sequential book_id starting from "01"
    const user_id = (index + 1).toString().padStart(2, "0");
    console.log("users", users);
    return {
      owner_id: user_id,
      owner: user.email,
      location: user.location,
      upload: user.Books.length,
    };
  });
  console.log("formattedUsers", formattedUsers);

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
    dispatch(fetchUsersStart());
  }, []);

  // if (loading) {
  //   // Optionally render a loading spinner or message while checking auth
  //   return <div>Loading...</div>;
  // }

  const handleEdit = (user:Owner) => {
    console.log(user)
    // Handle edit action
    // router.push(`/upload/?id=${book.book_id}`)
    // console.log('Edit book:', id);
  };

  const handleDelete = (id: string) => {
    // Handle delete action
    // dispatch(deleteBookStart(book.book_id))
    console.log('Delete book:', id);
  };




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
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      Cell: ({ cell }) => <StatusSwitch />
    },
    {
      accessorKey: 'actions',
      header: 'Action',
      size: 100,
      Cell: ({ row }) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={() => handleEdit(row.original)}>
            <EditIcon sx={{color: "black"}} />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original.owner_id)}>
            <DeleteIcon sx={{color: "red"}} />
          </IconButton>
        </div>
      ),
    },
    {
      accessorKey: 'approve',
      size: 120,
      header: '',
      Cell: ({ row }) => {
        const ownerId = Number(row.original.owner_id);
        return (
          <div>
            <Button 
              sx={
                ownerId % 2 === 0
                  ? { backgroundColor: "#B0B0B0", color: "white" }
                  : { backgroundColor: "#00BFFF", color: "white" }
              }
            >
              {ownerId % 2 === 0 ? "Approved" : "Approve"}
            </Button>
          </div>
        );
      }
    }
    
    
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
