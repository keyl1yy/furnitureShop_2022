import React, { useState } from 'react'
import { useGetDataDashboard } from '../../../../hooks/dashboard/useGetDataDashboard'

const Dashboard = () => {
  const {data: dataDashboard, error, isLoading, refresh} = useGetDataDashboard();
  console.log("dataDashboard", dataDashboard);
  //! State
  
  //! Function
  
  //! Render
  return (
    <div className='container-admin'>
    </div>

  )
}

export default Dashboard