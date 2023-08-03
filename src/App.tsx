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
import { IEmployee } from './types/interfaces';
import CreateEmployee from './components/createEmployee';
import EditEmployee from './components/editEmployee';
import DeleteEmployee from './components/deleteEmployee';


function App() {
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(-1);

  const initEmployee = {
    id: 0,
    firstName: "", lastName: "", email: "", phoneNumber: "",            
    addresses: [{ streetName: "", apartmentNumber: 0, postalCode: "", state: "", country: "" }]
  };  

  const updateSelectedEmployeeId = (id: number):void => {
    setSelectedEmployeeId(id);
    // alert("app update employee id - selectedRow: " + id);
  }

  const updateSelectedEmployee = (data: any):void => {
    setSelectedEmployee(data);
    // alert("app update employee - employee: " + data);
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
            {/* <h3 style={{ textAlign: 'right'}}>selectedEmployeeId={selectedEmployeeId}</h3> */}

              <Routes>
                <Route path="/" element={<EmployeeList selectedEmployeeId={selectedEmployeeId} updateSelectedEmployeeId={updateSelectedEmployeeId} updateSelectedEmployee={updateSelectedEmployee} />} />

                <Route path="/add-employee-react-hook" element={<CreateEmployee formComponent={<EmployeeReactHookForm employee={initEmployee} />} />} />
                <Route path="/add-employee-formik" element={<CreateEmployee formComponent={<EmployeeFormik employee={initEmployee} />} />} /> 

                {selectedEmployeeId !== undefined && selectedEmployeeId > 0 ? (
                  <>
                  <Route path="/edit-employee-react-hook" element={<EditEmployee formComponent={<EmployeeReactHookForm employee={selectedEmployee ?? initEmployee} />} />} />
                  <Route path="/edit-employee-formik" element={<EditEmployee formComponent={<EmployeeFormik employee={selectedEmployee ?? initEmployee} />} />} />
                  <Route path="/delete-employee" element={<DeleteEmployee selectedEmployeeId={selectedEmployeeId} />} />
                  </> 
                ) : (
                  <>
                  <Route path="" />
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

