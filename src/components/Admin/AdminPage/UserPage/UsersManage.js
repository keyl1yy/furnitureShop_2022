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
import React, { useEffect, useRef, useState } from "react";
import { useGetAllUser } from "../../../../hooks/users/userHook";
import "../AdminPage.scss";
import TableCommon from "../../../../common/Table/table";
import HeaderTable from "../../../../common/Table/HeaderTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../../services/authService";
import NotiAdmin from '../../../../helper/NotiAdmin';

const columns = [
  {
    id: "_id",
    label: "Id",
    minWidth: 170,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "center",
  },
  {
    id: "phoneNumber",
    label: "Phone number",
    minWidth: 170,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 200,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    align: "center",
  },
];

const styleActionIcon = {
  marginRight: "1rem",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "100%",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, .1)",
  },
};

const UsersManage = (props) => {
  //! State
  const [filterUser, setFilterUser] = useState("");
  const { data: listUser, loading, error, refresh } = useGetAllUser(filterUser);
  const { handleFullScreen } = props;

  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState({type: '',msg: ''})

  const navigate = useNavigate();
  //! Config table
  const action = [
    <EditIcon sx={styleActionIcon} id="edit" />,
    <DeleteIcon sx={{ ...styleActionIcon, margin: "unset" }} id="delete" />,
  ];
  const rows = listUser.map((el) => {
    const { _id, name, phoneNumber, email, address } = el;

    return {
      _id,
      name,
      phoneNumber,
      email,
      address,
      action,
    };
  });

  //! Function
  const handleCreate = () => {
    navigate(`${window.location.pathname}/create`);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id);
      if(response && response?.status === 200){
          setMes({...mes, type: "success", msg: "Remove user successful!!!"})
          setOpen(true)
          refresh && refresh();
      }
    } catch (error) {
      console.log("error",error);
    }
  };

  const handleEditUser = (id) => {
    navigate(`/admin/users/${id}`,{replace: true})
  };
  //! Effect

  //! Render
  return (
    <div className="container-admin">
      <NotiAdmin open={open} setOpen={setOpen} mes={mes}/>
      <HeaderTable
        filterData={filterUser}
        setFilterData={setFilterUser}
        listData={filterUser}
        placeholder="user name..."
        refresh={refresh}
        handleFullScreen={handleFullScreen}
        handleCreate={handleCreate}
      />
      <TableCommon
        columns={columns}
        rows={rows}
        loading={loading}
        handleDelete={handleDeleteUser}
        handleEdit={handleEditUser}
      />
    </div>
  );
};

export default UsersManage;
