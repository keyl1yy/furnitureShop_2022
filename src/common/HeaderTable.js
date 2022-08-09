import styled from '@emotion/styled'
import { Box, Paper, TextField } from '@mui/material'
import React from 'react'
import ReplayIcon from '@mui/icons-material/Replay';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

//! MUI_Custom
const HeaderTableLeft = styled(Box) (({theme}) => ({

}))

const HeaderTableRight = styled(Box) (({theme}) => ({
    display: "flex",

}))

const flexCenterIcon = {
    display: "flex",
    alignItems: "center",
    color: "#102a42",
    cursor: "pointer"
}

const HeaderTable = (props) => {
    //! State
    const path = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]
    const {filterData, setFilterData} = props;
    //! Render
    return (
        <Paper sx={{ width: "100%", overflow: "hidden", padding: ".75rem 1rem", marginBottom:"1.5rem", display:"flex", justifyContent:"space-between", alignItems: "center" }}>
            <HeaderTableLeft>
            <TextField
                id="filter-table"
                label={`${path}`}
                placeholder={`Filter ${path}...`}
                multiline
                value={filterData}
                onChange={(e) => setFilterData(e.target.value)}
                maxRows={1}
                variant="standard"
                />
            </HeaderTableLeft>
            <HeaderTableRight>
                <FullscreenIcon sx={flexCenterIcon}/>
                <ReplayIcon sx={flexCenterIcon}/>
            </HeaderTableRight>
        </Paper>
    )
}

export default HeaderTable