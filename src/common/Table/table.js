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
    TableRow as TableRowMUI,
  } from "@mui/material";
import { useState } from "react";
// import TableCell from "./TableCell";
import TableRow from "./TableRow";

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
              <TableRowMUI>
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
              </TableRowMUI>
            </TableHead>
            <TableBody>
              {rows
                .map((row,index) => {
                  return (
                    <TableRow
                      key={row.id}
                      row={row}
                      columns={columns}
                    />
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