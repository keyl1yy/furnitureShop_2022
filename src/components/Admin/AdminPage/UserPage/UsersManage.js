import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetAllUser } from "../../../../hooks/users/userHook";
import "../AdminPage.scss";
import TableCommon from "../../../../common/table";
import HeaderTable from "../../../../common/HeaderTable";

const columns = [{
  id: "_id",
  label: "Id",
  minWidth: 170,
},
{
  id: "name",
  label: "Name",
  minWidth: 170,
  align: "center"
},
{
  id: "phoneNumber",
  label: "Phone number",
  minWidth: 170,
  align: "center"
},
{
  id: "email",
  label: "Email",
  minWidth: 170,
  align: "right"
},
{
  id:"address",
  label: "Address",
  minWidth: 200,
  align: "right"
}
]

const UsersManage = (props) => {
  //! State
  const {data: listUser, loading, error, refresh} = useGetAllUser();
  const [filterUser, setFilterUser] = useState("");
  console.log('valueFilter',filterUser);
  //! Config table
  const rows = listUser.map((el) => {
    const {_id, name, phoneNumber, email, address}= el;
    return{
      _id, name, phoneNumber, email, address
    }
  })

  //! Function

  //! Effect

  //! Render
  return (
    
      <div className="container-admin">
        <HeaderTable filterData={filterUser} setFilterData={setFilterUser}/>
        <TableCommon columns={columns} rows={rows} loading={loading}/>
      </div>
    
  );
};

export default UsersManage;
