import { Grid, IconButton, Paper, Typography, Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useGetDataDashboard } from "../../../../hooks/dashboard/useGetDataDashboard";
import PersonIcon from "@mui/icons-material/Person";
import ChairIcon from "@mui/icons-material/Chair";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TableUser from "./TableUser";
import TopProduct from "./TopProduct";
import ChartDashboard from "./ChartDashboard";

const Dashboard = () => {
  const {
    data: dataDashboard,
    error,
    isLoading,
    refresh,
  } = useGetDataDashboard();
  console.log("dataDashboard", dataDashboard);
  //! State

  //! Function

  //! Render
  return (
    <div className="container-admin">
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Paper>
            <Box
              sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: 'space-between' }}
            >
              <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <IconButton aria-label="users" size="large">
                  <PersonIcon />
                </IconButton>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Users
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {dataDashboard?.userLength}
                  </Typography>
                </Stack>
              </Box>
              <Button href="/admin/users"> view detail</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Box
              sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: 'space-between' }}
            >
              <Box sx={{display: 'flex',alignItems: 'center', gap: '1rem'}}>
                <IconButton aria-label="users" size="large">
                  <ShoppingCartIcon />
                </IconButton>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Orders
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {dataDashboard?.orderLength}
                  </Typography>
                </Stack>
              </Box>
              <Button href='/admin/order'>view detail</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Box
              sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: 'space-between' }}
            >
              <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <IconButton aria-label="users" size="large">
                  <ChairIcon />
                </IconButton>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    Products
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {dataDashboard?.productLength}
                  </Typography>
                </Stack>
              </Box>
              <Button href="/admin/products">view detail</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Paper sx={{marginTop: '1rem'}}>
        <Box sx={{p: 2}}>
          <TableUser dataTable={dataDashboard?.potentialUser} isLoading={isLoading}/>
        </Box>
      </Paper>
      <Grid container spacing={2} sx={{marginTop: '1rem', marginBottom: '1rem'}}>
        <Grid item xs={4}>
          <Paper>
            <Box sx={{padding: 2}}>
              <TopProduct products={dataDashboard?.productGroup}/>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <Box sx={{padding: 2}}>
              <ChartDashboard products={dataDashboard?.productGroup}/>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
