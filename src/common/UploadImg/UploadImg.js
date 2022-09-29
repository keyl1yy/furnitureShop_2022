import { Box, Button, Grid, ImageList, ImageListItem, TextField } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from 'react'
import { convertFileToBase64 } from '../../helper';
import { cloneDeep, isArray } from "lodash";
import LoopIcon from '@mui/icons-material/Loop';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { styled } from '@mui/system';
import { useTheme } from '@mui/system';
import DialogImg from './DialogImg';
import CloseIcon from '@mui/icons-material/Close';
import ImgItem from './ImgItem';

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
    backgroundColor: '#000',
    "&:hover": {
      opacity: .5,
      transition: 'ease-in-out .5s'
    }
    // top: '50%',
    // left: '50%',
    // fontSize: '40px',
    // transform: 'translate(-50%, -50%)',
    // cursor:'pointer',
    // color: theme.palette.defaultLayout.colorIconNav
}))

const UploadImg = (props) => {
    //! State
    // console.log('propsProduct',props);
    const {form, field} = props;
    const name = field?.name;
    const value = field?.value;
    const [isLoading, setIsLoading] = useState(false);
    const [listFile, setListFile] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { errors, touched, setFieldValue } = form ?? {};

    const theme = useTheme();
    //! Function
    
    const handleChange = async (event) => {
        if(event.target.files){
            setIsLoading(true);
            try {
              const nextImages = cloneDeep(value);
              nextImages.push(event.target.files[0]);
            //   console.log("nextImages",nextImages);
              setFieldValue(name, nextImages);
            } catch (error) {
              console.log(error, "error");
            } finally {
              setIsLoading(false);
            }
        }
        
    };


    const handleRemoveImg = (index) => {
      const tempImgs = value.filter((el,ind) => ind !==index);
      setFieldValue(name, tempImgs);
    }
    
    //! Effect
    useEffect(() => {
        if (isArray(value)) {
            //* Check and convert all file image to base 64
            const requestConvertToBase64 = value.map((file) =>{
      
              if(typeof file === "string"){
                return file
              }
              return convertFileToBase64(file)
            }
            );
            (async () => {
              const allImgConverted = await Promise.all(requestConvertToBase64);
              setListFile(allImgConverted);
            })();
            
            
          }
    },[value, setFieldValue])

    //! Render
  return (
      <Box container spacing={2} sx={{display:'flex',justifyContent: 'flex-start',gap:'1rem', width:'100%'}}>
        <Box >
            <Button
                variant="outlined"
                component="label"
                sx={{
                    width:'200px',
                    height: '200px',
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    borderStyle: "dashed"
                }}
            >
                { isLoading ? <LoopIcon/> : <AddIcon />}
                Images
                <input hidden accept="image/*" multiple type="file" onChange={handleChange}/>
            </Button>
        </Box>
        <Box sx={{height:200,overflowY:'hidden', flex:1, overflowX:'scroll', display:'flex', alignItems:'center'}}>
            <Box sx={{display:'flex', height:200}}>
                {listFile.map((el,index) => {
                    return(
                      <ImgItem key={index} src={el} index={index} handleRemoveImg={handleRemoveImg}/>
                        // <WrapImages key={index} sx={{height:200, width: 200, marginRight: '.7rem'}}>
                        //     <IconDetailImg>
                        //       <FingerprintIcon sx={{fontSize:'40px', color: theme.palette.defaultLayout.colorIconNav, cursor:'pointer',zIndex:1}} onClick={handleShowDetailImg}/>
                        //     </IconDetailImg>
                        //     <IconRemoveImg onClick={() => handleRemoveImg(el,index)}/>

                        //     <img src={el} alt={`img-${index}`} loading="lazy" style={{width:"100%", height: '100%', objectFit:'cover', borderRadius:'8px'}}/>
                        //     <DialogImg isOpen={isOpen} setIsOpen={setIsOpen} src={el} />
                        // </WrapImages>
                    )
                })}
            </Box>
            
        </Box>
      </Box>
  )
}

export default UploadImg