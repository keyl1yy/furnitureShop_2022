import React, { Fragment, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    menuItem: {
        backgroundColor: 'transparent!important',
        paddingTop: '0!important',
        paddingBottom: '0!important',
        '&>form': {
            '&>div': {
                height: 'unset',
                '&>div': {
                    height: '100%',
                    fontSize: '13px'
                }
            }
        }
    }
})

const FilterSearchTable = (props) => {
    //! Props
    const {handleSearch,searchValue, placeholder, querySearch, type} = props;
    //! State
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [valueTextField, setValueTextField] = useState('');
    const open = Boolean(anchorEl);
    //! Function
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClickSearchIcon = (e) => {
        e.preventDefault();
        let valueQuery = searchValue;
        valueQuery[querySearch] = valueTextField;
        handleSearch({...valueQuery});
    }

    const handleChangeInput = (e) => {
        if(type === 'number'){
            if(Boolean(Number(e?.target?.value)) || Number(e?.target?.value) === 0){
                setValueTextField(e?.target?.value)
            }
        }else{
            setValueTextField(e?.target?.value)
        }
    }
    //! Effect

    //! Render
  return (
    <Fragment>
        <IconButton
            aria-label='filter-search'
            component='label'
            id="search-table-filter"
            aria-controls={open ? 'search-table-filter' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <MoreVertIcon/>
        </IconButton>
        <Menu
            id="search-table-filter"
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            MenuListProps={{
                'aria-labelledby': 'search-table-filter',
            }}
        >
            <MenuItem className={classes?.menuItem}>
                <form onSubmit={handleClickSearchIcon}>
                    <TextField variant="standard" placeholder={placeholder ?? ''} value={valueTextField} onChange={handleChangeInput}/>
                    <IconButton sx={{backgroundColor: '#06D0F8', borderRadius: '4px'}} type="submit">
                        <SearchIcon sx={{width:'13px', height: '13px'}}/>
                    </IconButton>
                </form>
            </MenuItem>
        </Menu>
    </Fragment>
  )
}

export default FilterSearchTable