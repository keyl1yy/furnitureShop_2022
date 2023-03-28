import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HeaderTable from '../../../../common/Table/HeaderTable';
import TableCustom from '../../../../common/Table/TableCustom';
import NotiAdmin from '../../../../helper/NotiAdmin'
import { getAllOrder } from '../../../../redux/features/orderSlice';
import {enumStatus, enumPaymentStatus} from '../../../../constant/enumOrder'
import { Box, Chip, Tooltip } from '@mui/material';
import { handleGetAddressCity } from '../../../../helper';
import { useGetCityOption } from '../../../../hooks/city/useGetCity';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ActionTable from '../../../../common/Table/ActionTable.js/ActionTable'
import { useNavigate } from 'react-router-dom';
import FilterSearchTable from '../../../../common/Table/ActionTable.js/FilterSearchTable';

const OrderAdmin = (props) => {
  //! Props
  const {handleFullScreen} = props;
  //! State
  const [filterOrder, setFilterOrder] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  });
  const {data: listCity, isLoading} = useGetCityOption()
  const dispatch = useDispatch();
  const orderSchema = useSelector(store => store.order)
  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState({type: '', msg: ''}); 
  
  const navigate = useNavigate();
  //! Table
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 250
    },
    {
      field: 'name',
      headerName: 'Khách hàng',
      width: 150,
      sortable: false,
      renderHeader: (paramsHeader) => {
        return(
          <Box>
            Khách hàng
            <FilterSearchTable handleSearch={setFilterOrder} querySearch="name" searchValue={filterOrder}/>
          </Box>
        )
      }
    },
    {
      field: 'address',
      headerName: 'Địa chỉ nhận hàng',
      headerAlign: 'center',
      // align: 'center',
      width: 400,
      renderCell: (params) => {
        return(
            <Tooltip title={handleGetAddressCity(params?.value,listCity)} placement="bottom">
              <div>
                {handleGetAddressCity(params?.value,listCity)}
              </div>
            </Tooltip>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      align: 'center',
      width: 250,
      sortable: false,
      renderHeader: (paramsHeader) => {
        return(
          <Box>
            Email
            <FilterSearchTable handleSearch={setFilterOrder} querySearch="email" searchValue={filterOrder}/>
          </Box>
        )
      }
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      width: 150,
      sortable: false,
      renderHeader: (paramsHeader) => {
        return(
          <Box>
            Số điện thoại
            <FilterSearchTable handleSearch={setFilterOrder} querySearch="phoneNumber" searchValue={filterOrder} type="number"/>
          </Box>
        )
      }
    },
    {
      field: 'paymentType',
      headerName: 'Hình thức thanh toán',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => `${params?.value?.paymentTypeDetail}`
    },
    {
      field: 'status',
      headerName: 'Trạng thái đơn hàng',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const statusOrder = enumStatus?.find(el => el?.value === params?.value);
        return(
          <Fragment>
            {statusOrder ? 
            <Chip label={statusOrder?.label} variant='outlined' sx={{borderColor: `${statusOrder?.color}`, color: `${statusOrder?.color}`, borderRadius: '8px'}}/>
            : null}
          </Fragment>
        )
      }
    },
    {
      field: 'paymentStatus',
      headerName: 'Trạng thái thanh toán',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const paymentStatusOrder = enumPaymentStatus?.find(el => el?.value === params?.value);
        return(
          <Fragment>
            {paymentStatusOrder ? 
            <Chip label={paymentStatusOrder?.label} variant='outlined' sx={{borderColor: `${paymentStatusOrder?.color}`, color: `${paymentStatusOrder?.color}`, borderRadius: '8px'}}/>
            : null}
        </Fragment>
        )
      }
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng hoá đơn',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      valueGetter: (params) => `${params?.value} đ`
    },
    {
      field: 'action',
      headerName: '',
      width: 50,
      renderCell: (params) => {
        return(
          <ActionTable  handleDetailView={() => handleDetailView(params?.id)}/>
        )
      }
    }
  ]
  //! Function
  const handleDetailView = (id) => {
    navigate(`/admin/order/${id}`,{replace: true})
  }
  const handleRefreshData = () => {
    setFilterOrder({
      name: '',
      phoneNumber: '',
      email: ''
    })
  }
  //! Effect
  useEffect(() => {
    dispatch(getAllOrder(filterOrder))
  },[filterOrder])
  //! Render
  const {orderAllData, isLoadingOrder} = orderSchema;
  return (
    <div className='container-admin'>
      <NotiAdmin open={open} setOpen={setOpen} mes={mes}/>
      <HeaderTable
        handleFullScreen={handleFullScreen}
        handleRefreshData={handleRefreshData}
      />
      <TableCustom rows={orderAllData?.map((el) => {
        return {
          id: el?._id,
          ...el
        }
      })} columns={columns} isLoading={isLoadingOrder}/>
      
    </div>
  )
}

export default OrderAdmin