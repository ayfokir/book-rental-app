import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "./sideBar/SideBar";
import IncomeCard from "./income-card/IncomeCard";
import BookTable from "./table/BookTable";
import EarningSummary from "./earning-summary/EarningSummary";
import Header from "./header/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import getAuth from "@/app/util/Auth";
import { MRT_ColumnDef } from "material-react-table";
import { Book } from "@/app/types/Book";
import { UseSelector, UseDispatch } from "react-redux";
import { RootState } from "@/redux/store/Store";
import { fetchBooksStart } from "@/redux/slices/Book";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const dispatch  = useDispatch()
  const books =   useSelector((state:RootState) => state.books.books)
  // Transform the fetched data into the desired format

  const formattedBooks = books.map((book, index) => {
    // Generate a sequential book_id starting from "01"
    const book_id = (index + 1).toString().padStart(2, '0');
    return {
      id: book_id,
      book_id: book.book_id,
      book_no: book.book_no,
      owner: book.owner.email,
      status: book.status.charAt(0).toUpperCase() + book.status.slice(1), // Capitalize the status
      price: `${book.price} Birr`,
    };
  });
  // console.log("see books inside dashboard:", books.books)
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    const KnowCustomer = async () => {
      const customerDataString = await getAuth();
      if (customerDataString.token) {
        const currentTime = new Date().getTime();
        if (currentTime > customerDataString.expiration) {
          localStorage.removeItem("customer");
          router.push("/login");
        } else {
          // Token is valid
        }
      } else {
        // No customer data found
        router.push("/login");
      }
    };
    KnowCustomer(); // Call the function
    dispatch(fetchBooksStart())
  }, [router]);
  
  const columns: MRT_ColumnDef<Book>[] = [
    {
      accessorKey: "id",
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
      size: 250,
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
    accessorKey: 'actions',
    header: 'Action',
    size: 100,
    Cell: ({ row }) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={() => handleEdit(row.original)}>
          <EditIcon sx={{color: "black"}} />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.original)}>
          <DeleteIcon sx={{color: "red"}} />
        </IconButton>
      </div>
    ),
  }
  ];

  const handleEdit = (book: Book) => {
    // Handle edit action
    router.push(`/upload/?id=${book.book_id}`)
    console.log('Edit book:', book);
  };

  const handleDelete = (book: Book) => {
    // Handle delete action
    console.log('Delete book:', book);
  };


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
            <BookTable data={formattedBooks} columns={columns} height="300px" />
            <EarningSummary />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
