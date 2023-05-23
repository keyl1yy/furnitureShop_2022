import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

const useStyles = makeStyles({
    tableMUI: {
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: "#829AB0"
        },
        '& .MuiDataGrid-columnHeadersInner': {
            backgroundColor: "#829AB0"
        }
    }
})

const TableCustom = (props) => {
    //! Props
    const {rows, columns, isLoading, key, sx} = props;
    //! State
    const classes = useStyles();
    //! Function

    //! Effect

    //! Render
    
    return (
        <Box sx={{ height: 400, width: '100%' , ...sx}}>
            <DataGrid
                key='table-MUI__KeyleLA'
                sx={{width: '100%'}}
                className={classes?.tableMUI}
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
                }}
                loading={isLoading}
                pageSizeOptions={[10]}
                autoHeight
                disableColumnFilter
                disableColumnMenu
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}

export default TableCustom