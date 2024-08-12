// import React, { useMemo, useRef, UIEvent, useEffect } from 'react';
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
//   type MRT_ColumnDef,
//   type MRT_RowVirtualizer,
// } from 'material-react-table';
// import { Box } from '@mui/material';

// type Book = {
//   id: string;
//   bookNo: string;
//   owner: string;
//   ownerAvatar: string;
//   status: string;
//   statusColor: string;
//   price: string;
// };

// const data: Book[] = [
//   { id: '1', bookNo: '6485', owner: 'Nardos T', ownerAvatar: '/avatar1.png', status: 'Rented', statusColor: 'red', price: '40 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '2', bookNo: '5665', owner: 'Harry M', ownerAvatar: '/avatar2.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
//   { id: '3', bookNo: '1755', owner: 'Tesfu N', ownerAvatar: '/avatar3.png', status: 'Free', statusColor: 'blue', price: '0.0 Birr' },
// ];

// const BookTable: React.FC = ({flag}: string) => {
//   const tableContainerRef = useRef<HTMLDivElement>(null); // Reference to table container
//   const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null); // Reference to Virtualizer instance

//   const columns = useMemo<MRT_ColumnDef<Book>[]>(
//     () => [
//       {
//         accessorKey: 'id',
//         header: 'No.',
//         size: 100,
//       },
//       {
//         accessorKey: 'bookNo',
//         header: 'Book no.',
//         size: 150,
//       },
//       {
//         accessorKey: 'owner',
//         header: 'Owner',
//         size: 200,
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         size: 150,
//       },
//       {
//         accessorKey: 'price',
//         header: 'Price',
//         size: 150,
//       },
//       {
//         accessorKey: 'price',
//         header: 'Price',
//         size: 150,
//       },
//       {
//         accessorKey: 'price',
//         header: 'Price',
//         size: 150,
//       },
//       {
//         accessorKey: 'price',
//         header: 'Price',
//         size: 150,
//       },
//     ],
//     [],
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     enablePagination: false,
//     enableRowVirtualization: true,
//     muiTableContainerProps: {
//       ref: tableContainerRef, // get access to the table container element
//       sx: { 
//         // maxHeight: '645px', // Set maximum height
//         maxHeight: '300px', // Set maximum height
//         overflowY: 'auto', // Enable vertical scrolling
//         // overflowX: 'hidden', // Disable horizontal scrolling
//       },
//       onScroll: (event: UIEvent<HTMLDivElement>) => {
//         const { scrollHeight, scrollTop, clientHeight } = event.target as HTMLDivElement;
//         // handle scroll event to fetch more data if necessary
//       },
//     },
//     rowVirtualizerInstanceRef, // get access to the virtualizer instance
//     rowVirtualizerOptions: { overscan: 4 },
//   });

//   // Prevent window from scrolling when table container is visible
//   useEffect(() => {
//     if (tableContainerRef.current) {
//       document.body.style.overflow = 'hidden';
//       return () => {
//         document.body.style.overflow = '';
//       };
//     }
//   }, []);

//   return (
//     <Box sx={{ paddingTop: '24px', width: "100%" }}>
//       <MaterialReactTable table={table} />
//     </Box>
//   );
// };

// export default BookTable;

import React, { useMemo, useRef, UIEvent, useEffect } from 'react';
import { Book } from '@/app/types/Book';
import { Owner } from '@/app/types/Book';

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
} from 'material-react-table';
import { Box } from '@mui/material';


// Define props interface
interface BookTableProps {
  data: Book[];
  columns: MRT_ColumnDef<Book>[];
  height: '300px' | '528px'; // Height can be either '300px' or '645px'
}

const BookTable: React.FC<BookTableProps> = ({ data, columns, height }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null); // Reference to table container
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null); // Reference to Virtualizer instance

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
    enableRowVirtualization: true,
    muiTableContainerProps: {
      ref: tableContainerRef, // get access to the table container element
      sx: { 
        maxHeight: height, // Set maximum height based on prop
        overflowY: 'auto', // Enable vertical scrolling
      },
      onScroll: (event: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target as HTMLDivElement;
        // handle scroll event to fetch more data if necessary
      },
    },
    rowVirtualizerInstanceRef, // get access to the virtualizer instance
    rowVirtualizerOptions: { overscan: 4 },
  });

  // Prevent window from scrolling when table container is visible
  useEffect(() => {
    if (tableContainerRef.current) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, []);

  return (
    <Box sx={{ paddingTop: '24px', width: "100%" }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default BookTable;
