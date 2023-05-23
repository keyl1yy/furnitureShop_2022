import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
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
import TableCustom from "../../../../common/Table/TableCustom";
import ActionTable from "../../../../common/Table/ActionTable.js/ActionTable";
import FilterSearchTable from "../../../../common/Table/ActionTable.js/FilterSearchTable";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [filterUser, setFilterUser] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  });
  const { data: listUser, loading, error, refresh } = useGetAllUser(filterUser);
  const { handleFullScreen } = props;

  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState({type: '',msg: ''})
  const navigate = useNavigate();
  //! Config table
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 250
    },
    {
      field: 'name',
      headerName: 'Full name',
      width: 200,
      sortable: false,
      renderHeader: (paramsHeader) => {
        return(
          <Box>
            Full name
            <FilterSearchTable handleSearch={setFilterUser} querySearch='name' searchValue={filterUser}/>
          </Box>
        )
      }
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone number',
      width: 200,
      sortable: false,
      renderHeader: () => {
        return(
          <Box>
            Phone number
            <FilterSearchTable handleSearch={setFilterUser} querySearch='phoneNumber' searchValue={filterUser}/>
          </Box>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      sortable: false,
      renderHeader: () => {
        return(
          <Box>
            Email
            <FilterSearchTable handleSearch={setFilterUser} querySearch='email' searchValue={filterUser}/>
          </Box>
        )
      }
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200
    },
    {
      field: 'action',
      headerName: '',
      width: 50,
      renderCell: (params) => {
        return(
          <Fragment>
            <ActionTable params={params} handleEdit={() => handleEditUser(params?.id)} handleDelete={() => handleDeleteUser(params?.id)}/>
          </Fragment>
        )
      }
    }
  ]
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
          setTimeout(() => {
            refresh && refresh();
          },500)
      }
    } catch (error) {
      console.log("error",error);
    }
  };

  const handleEditUser = (id) => {
    navigate(`/admin/users/${id}`,{replace: true})
  };

  const handleRefreshData = () => {
    setFilterUser({
      name: '',
      phoneNumber: '',
      email: ''
    })
  }
  //! Effect

  //! Render

  return (
    <div className="container-admin">
      <NotiAdmin open={open} setOpen={setOpen} mes={mes}/>
      <HeaderTable
        filterData={filterUser}
        setFilterData={setFilterUser}
        placeholder="user name..."
        refresh={refresh}
        handleRefreshData={handleRefreshData}
        handleFullScreen={handleFullScreen}
        handleCreate={handleCreate}
      />
      <TableCustom
        rows={listUser?.map(el => {
          return{
            id:el?._id,
            ...el
          }
        })}
        columns={columns}
        isLoading={loading}
      />
    </div>
  );
};

export default UsersManage;
