import React from 'react'
import TableCommon from '../../../../common/Table/table';
import { useGetAllProduct } from '../../../../hooks/products/productHook';

const columns = [
    {
        id: "id",
        label: "Id",
        minWidth: 170,
    },
    {
        id: "name",
        label: "Name product",
        minWidth: 170,
        align: "center"
    },
    {
        id: "description",
        label: "Description",
        minWidth: 500,
        
    },
    {
        id: "company",
        label: "Company",
        minWidth: 170,
        align: "right"
    },
    {
        id:"category",
        label: "Category",
        minWidth: 170,
        align: "right"
    },
    {
        id:"price",
        label: "Price",
        minWidth: 170,
        align: "right"
    }
]

const ProductManage = () => {
    //! State
    const {data: listProduct, error, loading, refresh} = useGetAllProduct();
    console.log('dataPro',listProduct);
    const rows = listProduct.map((el) => {
        const {id, name, description, company, category, price} = el;
        return{id, name, description, company, category, price}
    })
    //! Render
  return (
    <div className='container-admin'>
        <TableCommon columns={columns} rows={rows} loading={loading}/>
    </div>
  )
}

export default ProductManage