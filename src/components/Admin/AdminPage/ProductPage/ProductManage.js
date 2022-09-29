import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTable from "../../../../common/Table/HeaderTable";
import TableCommon from "../../../../common/Table/table";
import { useGetAllProduct } from "../../../../hooks/products/productHook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotiAdmin from "../../../../helper/NotiAdmin";
import { deleteProduct } from "../../../../services/adminPage/productService";

const columns = [
  {
    id: "_id",
    label: "Id",
    minWidth: 170,
  },
  {
    id: "name",
    label: "Name product",
    minWidth: 170,
    align: "center",
  },
  {
    id: "description",
    label: "Description",
    minWidth: 500,
  },
  // {
  //   id: "stock",
  //   label: "Stock",
  //   minWidth: 50,
  // },
  {
    id: "company",
    label: "Company",
    minWidth: 170,
    align: "right",
  },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "right",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
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

const ProductManage = (props) => {
  //! State
  const { handleFullScreen } = props;
  const [filterProduct, setFilterProduct] = useState("");
  const {
    data: listProduct,
    error,
    loading,
    refresh,
  } = useGetAllProduct(filterProduct);
  console.log("listProduct", listProduct);
  const action = [
    <EditIcon sx={styleActionIcon} id="edit" />,
    <DeleteIcon sx={{ ...styleActionIcon, margin: "unset" }} id="delete" />,
  ];
  const rows = listProduct.map((el) => {
    const { _id, name, description, company, category, price, stock } = el;
    return { _id, name, description, company, category, price, action};
  });

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState({type: '',msg:''});
  //! Function
  const handleCreate = () => {
    navigate("/admin/products/create", { replace: true });
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/${id}`,{replace: true})
  }

  const handleDelete = async (id) => {
      console.log("Handle delete product!",id);
      try {
          const response = await deleteProduct(id);
          if(response && response?.status===200){
            setMes({...mes, type: "success", msg: response?.data?.msg})
            setOpen(true)
            refresh && refresh();
          }
          console.log("response",response);
      } catch (error) {
          console.log('error',error);
      }
  }

  //! Render
  return (
    <div className="container-admin">
      <NotiAdmin open={open} setOpen={setOpen} mes={mes}/>
      <HeaderTable
        filterData={filterProduct}
        setFilterData={setFilterProduct}
        placeholder="Product name ..."
        refresh={refresh}
        handleFullScreen={handleFullScreen}
        handleCreate={handleCreate}
      />
      <TableCommon columns={columns} rows={rows} loading={loading} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </div>
  );
};

export default ProductManage;
