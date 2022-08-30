import React from 'react'
import { TableRow as TableRowMUI, TableCell } from '@mui/material'
const TableRow = (props) => {
    //! State
    const {row, columns} = props;
    //! Function

    //! Render
  return (
    <TableRowMUI
        hover
        role="checkbox"
        tabIndex={-1}
        
    >
        {columns?.map((column) => {
        const value = row[column.id];
        return (
            <TableCell key={column.id} align={column.align} sx={{textOverflow:"ellipsis"}}>
            {value}
            </TableCell>
        );
        })}
    </TableRowMUI>
  )
}

export default TableRow