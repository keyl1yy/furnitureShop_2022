import React, { Fragment, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FormControl, IconButton, Menu, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    menuItem: {
        backgroundColor: 'transparent!important',
        paddingTop: '0!important',
        paddingBottom: '0!important',
        '&>form': {
            display: 'flex',
            flexDirection: 'column',
            '&>div': {
                height: 'unset',
                '&>div': {
                    height: '100%',
                    width: '100px',
                    fontSize: '13px'
                }
            }
        }
    }
})

const FilterSelectTable = (props) => {
    //! Props
    const {handleSearch,searchValue, placeholder, querySearch, type, options} = props;
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
        if(valueTextField === 'all'){
            valueQuery[querySearch] = '';
        }else{
            valueQuery[querySearch] = valueTextField;
        }
        handleSearch({...valueQuery});
    }

    const handleChangeInput = (e) => {
        setValueTextField(e?.target?.value)
    
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
                    {/* <TextField variant="standard" placeholder={placeholder ?? ''} value={valueTextField} onChange={handleChangeInput}/> */}
                    <FormControl fullWidth>
                        <Select 
                            labelId="filter-select-table"
                            id="filter-select-table-standard" 
                            value={valueTextField} 
                            onChange={handleChangeInput} 
                            defaultChecked='all'>
                            {(options || []).map((item) => {
                                const {value, label} = item;
                                return(
                                    <MenuItem key={`${label}-${value}`} value={value}>{label}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <IconButton sx={{backgroundColor: '#06D0F8', borderRadius: '4px', marginTop: '1rem', fontSize: '13px'}} type="submit">
                        Search
                    </IconButton>
                </form>
            </MenuItem>
        </Menu>
    </Fragment>
  )
}

export default FilterSelectTable