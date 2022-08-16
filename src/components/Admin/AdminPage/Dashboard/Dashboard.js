import React from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk'
import { Paper, ThemeProvider, Typography } from '@mui/material'
import { theme } from '../../../../theme/themeMui'

const Dashboard = () => {
  return (
    <div className='container-admin'>
        <Paper color="primary">
          <Typography color="primary">TEST THEME MUI</Typography>
        </Paper>
      </div>

  )
}

export default Dashboard