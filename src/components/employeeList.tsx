import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IEmployeeList } from '../types/interfaces'
import { getEmployees } from '../services/employee.service';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
     { field: 'streetName', headerName: 'Street Name', width: 150, 
      valueGetter: (employee) => employee.row.addresses[0].streetName
    },
    { field: 'apartmentNumber', headerName: 'Apartment Number', width: 150, 
      valueGetter: (employee) => employee.row.addresses[0].apartmentNumber
    },
    { field: 'postalCode', headerName: 'Postal Code', width: 150, 
      valueGetter: (employee) => employee.row.addresses[0].postalCode
    },
    { field: 'state', headerName: 'State', width: 150, 
      valueGetter: (employee) => employee.row.addresses[0].state
    },
    { field: 'country', headerName: 'Country', width: 150, 
      valueGetter: (employee) => employee.row.addresses[0].country
    } 
  ];


const EmployeeList: React.FC<{}> = () => {
    const [employee, setEmployee] = useState<IEmployeeList>([]);

    const setEmployees = () => {
      getEmployees().then((data: any) => {
        setEmployee(data);
        console.log(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    }
  
    useEffect(
      function setEmployeesOnMounting() {
      setEmployees();
     }, []);
  
    return (
        <>
          <h3 style={{ textAlign: 'left'}}>Employee List</h3>
          <DataGrid autoPageSize columnHeaderHeight={50} rowHeight={25} rows={employee} columns={columns} /> 
        </>
    );
};

export default EmployeeList;



  