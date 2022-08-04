import { AppBar, Box, Toolbar, styled, alpha,InputBase,
     Avatar, Typography, Accordion, AccordionSummary, Menu, MenuItem, Fade, Button, Badge, Stack } from '@mui/material'
import urlLogo from '../../../../public/img/logo.svg'
import SearchIcon from '@mui/icons-material/Search';
import avatar from '../../../../public/img/avatarDF.jpeg'
import React, { useState } from 'react'
import './NavbarAdmin.scss'
import { ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

const StyledToolbar = styled(Toolbar)({
  display:'flex',
  justifyContent:'space-between',
  backgroundColor:'#decbc0'
})

const AdminAccount = styled(Box)(({theme}) => ({
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  gap:'8px'
}))
const MenuOpenSidebar = styled(MenuIcon)(({theme}) => ({
  fontSize:'30px',
  color:'#453227',
  cursor:'pointer',
  transition:'all .3s linear',
  '&:hover':{
    transform:'rotate(90deg)'
  }
}))
const NavbarAdmin = (props) => {
  // console.log('props',props);
  const {setIsOpenSidebar} = props;
  const [anchorEl,setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position='fixed' sx={{width:{xs:'100%',md:'calc(100% - 300px)'},boxShadow:'unset'}}>
      <StyledToolbar>
        <Box flex={1}>
          <MenuOpenSidebar sx={{display:{xs:'unset',md:'none'}}} onClick={() => setIsOpenSidebar(true)}/>
        </Box>
        <AdminAccount>
          <Stack direction='row' sx={{marginRight:'1rem'}} gap={3}>
            <Badge color="primary" badgeContent={3} showZero>
              <MailIcon sx={{fontSize:'30px',color:'#ab7a5f',cursor:'pointer'}}/>
            </Badge>
            <Badge color="primary" badgeContent={3} showZero>
              <NotificationsIcon sx={{fontSize:'30px',color:'#ab7a5f',cursor:'pointer'}}/>
            </Badge>
          </Stack>
          <Avatar sx={{width:'30px',height:'30px'}} src={avatar} alt='avatar'/>
          <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{color:'#453227',display:{xs:'none',sm:'unset'}}}
            >
              KeyLy
          </Button>
        </AdminAccount>
      </StyledToolbar>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default NavbarAdmin