import { JitsiMeeting } from '@jitsi/react-sdk'
import React from 'react'

const MeetingAdmin = () => {
  //! State

  //! Render
  return (
    <div className='container-admin'>
        <JitsiMeeting
            roomName="Furniture meeting room"
            getIFrameRef = { node => node.style.height = "100%"}
            configOverwrite = {{ 
              startWithAudioMuted: true, 
            
            }} 
            useStaging = { true }
        />
    </div>
  )
}

export default MeetingAdmin