import React, { useState } from 'react'
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import "./customDateRange.scss"
import moment from 'moment';

const convertDate = (date) => {
  const formatDate = moment(date).format("yyyy/ddd, MMM D")
  return formatDate.split("/")
}

const DateRangePage = () => {
  //! State
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ]);
  const [startDateChange, setStartDateChange] = useState(convertDate(new Date()));
  const [endDateChange, setEndDateChange] = useState(convertDate(new Date()));
  //! Function
  const handleChangeDate = (item) => {
    setStartDateChange(convertDate(item[0].startDate));
    setEndDateChange(convertDate(item[0].endDate));
    setState(item)
  }
  //! Render
  return (
    <div className='container-admin'>
      <div className='dateRange'>
        <div className='dateRange-title'>
          <div className='dateRange-title-startDate'>
            <p className='dateRange-title-startDate-year'>{startDateChange[0]}</p>
            <p className='dateRange-title-startDate-date'>{startDateChange[1]}</p>
          </div>
          <div className='dateRange-title-endDate'>
            <p className='dateRange-title-endDate-year'>{endDateChange[0]}</p>
            <p className='dateRange-title-endDate-date'>{endDateChange[1]}</p>
          </div>
        </div>
        <DateRange
          editableDateInputs={true}
          onChange={item => handleChangeDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          months={2}
          direction="horizontal"
        />
        <div className='dateRange-btn'>
          <button className='dateRange-btn-cal'>cancel</button>
          <button className='dateRange-btn-submit'>OK</button>

        </div>
      </div>
    </div>

  )
}

export default DateRangePage