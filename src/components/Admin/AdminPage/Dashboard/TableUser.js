import React from 'react'
import TableCustom from '../../../../common/Table/TableCustom'
const TableUser = (props) => {
  //! Props
  const {dataTable, isLoading} = props;
  //! State
  const columns = [
    {
      field: 'id',
      headerName: 'ID User',
      width: 250,
      sortable: false
    },
    {
      field: 'name', 
      headerName: 'Name',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone number',
      width: 150
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200
    }
  ]
  //! Function

  //! Effect

  //! Render
  return (
    <TableCustom
      rows={(dataTable || []).map(el => {
        return{
          id: el?._id,
          ...el
        }
      })}
      columns={columns}
      isLoading={isLoading}
      sx={{display: 'flex', alignItems: 'center', height: '100%'}}
    />
  )
}

export default TableUser