import {
    Backdrop,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
import { useState } from "react";

const TableCommon = (props) => {
    //! State
    const {columns, rows, loading} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //! Function
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
      };
    const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
    };
    
    //! Render
    return(
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Backdrop 
            sx={{ color: "#936a53",transform: "translateX(150px)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading || false}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  const { id, label, minWidth, align } = column;
                  return (
                    <TableCell
                      key={id}
                      align={align}
                      style={{ minWidth: minWidth }}
                      sx={{backgroundColor: "#829ab0"}}
                    >
                      {label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row,index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{textOverflow:"ellipsis"}}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
}

export default TableCommon