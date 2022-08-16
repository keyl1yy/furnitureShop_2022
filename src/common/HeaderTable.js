import styled from "@emotion/styled";
import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

//! MUI_Custom
const HeaderTableLeft = styled(Box)(({ theme }) => ({
    "&>form":{
        display: "flex",
        alignItems: "center",

    }
}));

const HeaderTableRight = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const flexCenterIcon = {
  display: "flex",
  alignItems: "center",
  color: "#102a42",
  cursor: "pointer",
};

const HeaderTable = (props) => {
  //! State
  const path =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
  const { filterData, setFilterData, listData, setListData } = props;
    const [valueTextField, setValueTextField] = useState("");
  //!Function

   const handleFilter = (e) => {
       e.preventDefault();
    setFilterData(valueTextField)
   } 

  //! Render
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: ".75rem 1rem",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <HeaderTableLeft>
        <form onSubmit={(e) => handleFilter(e)}>
            <TextField
                id="filter-table"
                label={`${path}`}
                placeholder={`Filter ${path}...`}
                
                value={valueTextField}
                onChange={(e) => setValueTextField(e.target.value)}
                
                variant="standard"
            />
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#ab7a5f",
                    "&:hover": { backgroundColor: "#b99179" },
                    marginLeft: ".5rem",
                }}
                type="submit"
            >
            Filter
            </Button>
        </form>    
          
      </HeaderTableLeft>
      <HeaderTableRight>
        <FullscreenIcon sx={flexCenterIcon} />
        <ReplayIcon sx={flexCenterIcon} />
      </HeaderTableRight>
    </Paper>
  );
};

export default HeaderTable;
