"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "@/components/dashboard/sideBar/SideBar";
import Header from "@/components/dashboard/header/Header";
import { useRouter } from "next/navigation";
import getAuth from "@/app/util/Auth";
import BookTable from "../table/BookTable";
import { MRT_ColumnDef } from "material-react-table";
import { Book } from "@/app/types/Book";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";
import StatusSwitch from "./StatusSwitch";
const Books: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const books = useSelector((state: RootState) => state.books.books);

  const formattedBooks = books.map((book, index) => {
    // Generate a sequential book_id starting from "01"
    const book_id = (index + 1).toString().padStart(2, "0");

    return {
      id: book_id,
      book_id: book.book_id,
      author_name: book.book.author_name,
      owner: book.owner.email,
      book_name: book.book.book_name,
      category: book.book.category,
      status: book.status.charAt(0).toUpperCase() + book.status.slice(1), // Capitalize the status
      // price: `${book.price} Birr`,
    };
  });

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

  const columns: MRT_ColumnDef<Book>[] = [
    {
      accessorKey: "id",
      header: "No.",
      size: 100,
    },
    {
      accessorKey: "author_name",
      header: "Author",
      size: 150,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      size: 200,
    },
    {
      accessorKey: "category",
      header: "Category",
      size: 150,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      Cell: ({ cell }) => <StatusSwitch />
    },
    {
      accessorKey: "book_name",
      header: "Book Name",
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
        <SideBar isFullHeight={false} />{" "}
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
          <BookTable data={formattedBooks} columns={columns} height="528px" />
        </Box>
      </Box>
    </Box>
  );
};

export default Books;
