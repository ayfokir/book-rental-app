
import React, { useMemo, useRef, UIEvent, useEffect } from 'react';
import { Owner } from '@/app/types/Book';

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
} from 'material-react-table';
import { Box } from '@mui/material';


// Define props interface
interface OwnerTableProps {
  data: Owner[];
  columns: MRT_ColumnDef<Owner>[];
  height: '300px' | '528px'; // Height can be either '300px' or '645px'
}

const OwnerTable: React.FC<OwnerTableProps> = ({ data, columns, height }) => {
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

export default OwnerTable;
