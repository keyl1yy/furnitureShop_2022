import React, { useState } from 'react'
import { useGetDataStatistic } from '../../../../hooks/statistic/useGetDataStatistic'
import HeaderTable from '../../../../common/Table/HeaderTable'
import moment from 'moment'
import { Box, Grid, Paper, Tooltip } from '@mui/material'
import {ChartStatistic} from './ChartStatistic'
import TableCustom from '../../../../common/Table/TableCustom'
const StatisticAdmin = (props) => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().startOf('month').format('YYYY-MM-DD'),
    endDate: moment().endOf('month').format('YYYY-MM-DD')
  })
  const {data, isLoading, error, refresh } = useGetDataStatistic(dateRange);
  //! Props
  const {handleFullScreen} = props;
  //! State
  const labels = data.map(el => el.name);
  const dataStatistic = data.map(el => el.amount);
  console.log("bahjdbska",labels, dataStatistic, data);
  const columns = [
    {
      field: 'name',
      headerName: 'Product name',
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return(
          <Tooltip title={params?.value} placement="bottom">
            <div>
              {params?.value}
            </div>
          </Tooltip>
        )
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      valueGetter: (params) => `${params.value} đ`
    },
    {
      field: 'amount',
      headerName: 'Amount',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'color',
      headerName: 'Color',
      renderCell: (params) => {
        const colorList = [];
        params.value.forEach(color => {
          const amount = params.value.reduce((result, colorCurrent) => {
            if(color === colorCurrent){
              return result +=1
            }else{
              return result
            }
          },0)
          if(colorList.indexOf(`${color}_${amount}`) === -1){
            colorList.push(`${color}_${amount}`)
          }
        })
        return(
          <>
            {colorList.map(el => {
              return(
                <Tooltip key={el} title={el.split("_")[1]} placement="bottom">
                  <div style={{backgroundColor: `${el.split("_")[0]}`, width: '20px', height: '20px', borderRadius: '4px'}}>
                  </div>
                </Tooltip>
              )
            })}
          </>
        )
      }
    }
  ]
  //! Function

  //! Effect

  //! Render
  return (
    <div className='container-admin'>
      <HeaderTable
        handleFullScreen={handleFullScreen}
        isDateRange={true}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper sx={{height: '100%'}}>
            <ChartStatistic labels={labels} dataStatistic={dataStatistic} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <TableCustom rows={(data || [])?.map(el => {
              return{
                id: el?.idProduct,
                ...el
              }
            })} columns={columns} isLoading={isLoading} sx={{display:'flex',alignItems: 'center'}}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default StatisticAdmin