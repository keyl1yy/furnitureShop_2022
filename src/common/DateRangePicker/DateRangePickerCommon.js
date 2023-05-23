import { Box, IconButton, Popover, TextField } from '@mui/material'
import moment from 'moment';
import React, { Fragment, useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EastIcon from '@mui/icons-material/East';

const DateRangePickerCommon = (props) => {
  //! Props
  const {dateRange, setDateRange} = props;
  //! State
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: moment(dateRange.startDate).toDate(),
    endDate: moment(dateRange.endDate).toDate(),
    key: 'dateRange'
  });
  const open = Boolean(anchorEl);
  const id = open ? 'date-range-popover' : undefined;
  //! Function
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }


  const handleSelect = (ranges) => {
    if(ranges?.dateRange?.startDate && ranges?.dateRange?.endDate){
      const {startDate, endDate} = ranges.dateRange;
      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      })
      setSelectionRange((prev) => {
        return{
          ...prev, startDate, endDate
        }
      })
    }
  }
  //! Effect

  //! Render
  return (
    <Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}} aria-describedby={id}>
        <IconButton component="span" onClick={handleClick}>
          <DateRangeIcon/>
        </IconButton>
        <Box sx={{p: '4px 12px', border: '1px solid grey', borderRadius: '4px'}}>
          {moment(selectionRange.startDate).format('ll')} - {moment(selectionRange.endDate).format('ll')}
        </Box>
      </Box>  
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}/>

      </Popover>
    </Fragment>
  )
}

export default DateRangePickerCommon