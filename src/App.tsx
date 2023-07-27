import React, { useRef, useState } from 'react';
import './App.css';
import EmployeeList from './components/employeeList';
import { Route, Routes } from 'react-router-dom';
import CreateEmployeeReactHookForm from './components/createEmployee.rhf';
import CreateEmployeeFormik from './components/createEmployee.formik';
import NavigationDrawer from './components/navigation-drawer';
import ApplicationHeader from './components/application-header';
import { Box, CssBaseline, Grid, Toolbar } from '@mui/material';



function App() {
  return (
    <div className="App">

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <ApplicationHeader />

      <NavigationDrawer />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

        <Grid container spacing={3}>
          <Grid item xs={12}>

            <div style={{ marginTop: '20px', height: 300, width: '100%' }}>

              <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/add-employee-react-hook" element={<CreateEmployeeReactHookForm />} />
                <Route path="/add-employee-formik" element={<CreateEmployeeFormik />} /> 
              </Routes>

            </div>

           </Grid>
        </Grid>

      </Box>
    </Box>
    </div>
  );
}

export default App;
