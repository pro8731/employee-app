import React, { useState } from 'react';
import './App.css';
import EmployeeList from './components/employeeList';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Grid } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import EmployeeReactHookForm from './components/employee.reactHookForm';
import EmployeeFormik from './components/employee.formik';
import NavigationDrawer from './components/navigation-drawer';
import ApplicationHeader from './components/application-header';
import CreateEmployee from './components/createEmployee';
import EditEmployee from './components/editEmployee';
import DeleteEmployee from './components/deleteEmployee';
import AlertDialog from './components/alert-dialog';


const App: React.FC<{}> = ({}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(-1);

  const updateSelectedEmployeeId = (id: number):void => {
    setSelectedEmployeeId(id);
  }

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
                <Route path="/" element={<EmployeeList selectedEmployeeId={selectedEmployeeId} updateSelectedEmployeeId={updateSelectedEmployeeId} />} />

                <Route path="/add-employee-react-hook" element={<CreateEmployee formComponent={<EmployeeReactHookForm id={-1} />} />} />
                <Route path="/add-employee-formik" element={<CreateEmployee formComponent={<EmployeeFormik id={-1} />} />} /> 

                {selectedEmployeeId !== undefined && selectedEmployeeId > -1 ? (
                  <>
                  <Route path="/edit-employee-react-hook" element={<EditEmployee formComponent={<EmployeeReactHookForm id={selectedEmployeeId} />} />} />
                  <Route path="/edit-employee-formik" element={<EditEmployee formComponent={<EmployeeFormik id={selectedEmployeeId} />} />} />
                  <Route path="/delete-employee" element={<DeleteEmployee selectedEmployeeId={selectedEmployeeId} />} />
                  </> 
                ) : (
                  <>
                  <Route path="/edit-employee-react-hook" Component={AlertDialog} />
                  <Route path="/edit-employee-formik" Component={AlertDialog} />
                  <Route path="/delete-employee" Component={AlertDialog} />
                  </>
                )}
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

