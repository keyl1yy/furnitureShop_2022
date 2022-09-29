import React from 'react'
import { TableRow as TableRowMUI, TableCell } from '@mui/material'

const TableRow = (props) => {
    //! State
    const {row, columns, handleDelete, handleEdit} = props;
    // console.log("row",row);
    // console.log("columns",columns);
    //! Function

    //! Render
  return (
    <TableRowMUI
        hover
        role="checkbox"
        tabIndex={-1}
    >
        {columns?.map((column,index) => {
        const value = row[column.id];
        if(typeof value === 'object'){
          return(
            <TableCell key={index} align={column.align} sx={{textOverflow:"ellipsis"}}>
              {value.map((el,index) => {
                
                const {id} = el.props;
    
                return(
                  <span key={index} onClick={() =>  id === "delete"? handleDelete(row["_id"]) : handleEdit(row["_id"])}>
                  {/* <span key={index}> */}
                    {el}
                  </span>
                )
              })}
            </TableCell>
          )
        }
        return (
            <TableCell key={index} align={column.align} sx={{textOverflow:"ellipsis"}}>
            {value}
            </TableCell>
        );
        })}
    </TableRowMUI>
  )
}

export default TableRow