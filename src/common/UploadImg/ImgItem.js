import { Box, styled } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useTheme } from '@mui/material';
import DialogImg from './DialogImg';


const WrapImages = styled(Box) (({theme}) => ({
    height:200,
    width: 200,
    marginRight: '.7rem',
    position: 'relative',
    
}))

const IconRemoveImg = styled(CloseIcon) (({theme}) => ({
    position: 'absolute',
    right: '8px',
    top: '8px',
    color: theme.palette.defaultLayout.borderColor,
    padding: '2px',
    borderRadius:'100%',
    cursor: 'pointer',
    transition: 'ease-in-out .5s',
    opacity: 0,
    "&:hover": {
      backgroundColor: theme.palette.defaultLayout.background,
      opacity: .9
    }
}))

const IconDetailImg = styled(Box) (({theme}) => ({
    position:'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    opacity: 0,
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'ease-in-out .5s',
    backgroundColor: '#d9d9d9',
    "&:hover": {
      opacity: .5,
      transition: 'ease-in-out .5s'
    }
}))

const ImgItem = (props) => {
    //! State
    const {src, index, handleRemoveImg} = props;
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    //! Function
    const handleShowDetailImg = () => {
        setIsOpen(!isOpen);
    }
    //! Render
  return (
    <WrapImages sx={{height:200, width: 200, marginRight: '.7rem'}}>
        <IconDetailImg>
            <FingerprintIcon sx={{fontSize:'40px', color: theme.palette.defaultLayout.colorIconNav, cursor:'pointer',zIndex:1}} onClick={handleShowDetailImg}/>
        </IconDetailImg>
        <IconRemoveImg onClick={() => handleRemoveImg(index)}/>
        <img src={src} alt={`img-${index}`} loading="lazy" style={{width:"100%", height: '100%', objectFit:'cover', borderRadius:'8px'}}/>
        <DialogImg isOpen={isOpen} setIsOpen={setIsOpen} src={src} />
    </WrapImages>
  )
}

export default ImgItem