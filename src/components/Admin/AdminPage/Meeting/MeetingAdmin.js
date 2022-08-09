import { JitsiMeeting } from '@jitsi/react-sdk'
import React from 'react'

const MeetingAdmin = () => {
  return (
    <div className='container-admin'>
        <JitsiMeeting
            roomName="My room"
            getIFrameRef = { node => node.style.height = "800px"}
            configOverwrite = {{ 
            startWithAudioMuted: true, 
            
            }} 
        />
    </div>
  )
}

export default MeetingAdmin