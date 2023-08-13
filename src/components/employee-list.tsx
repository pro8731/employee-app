import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IEmployeeList, IEmployeeListProps } from '../types/interfaces'
import { getEmployees } from '../services/employee-service';


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


const EmployeeList: React.FC<IEmployeeListProps> = ({selectedEmployeeId, updateSelectedEmployeeId}) => {
    const [employees, setEmployees] = useState<IEmployeeList>([]);
    const [selectedRowId, setSelectedRowId] = useState<number>();

    useEffect(
      function setEmployeesOnMounting() {
        setSelectedRowId(selectedEmployeeId);

        const subscription = getEmployees().subscribe((employees) => {
          setEmployees(employees);
        });

        return () => {
          if (subscription) {
            subscription.unsubscribe();
          }
        }
    }, []);

    const onRowSelectionModelChangeHandler = (ids: any) => {
      if (ids.length === 0) {
        ids=[];
        ids.push(-1);
      } 
      else if (ids.length > 1) {
        let id = ids.pop();
        ids=[];
        ids.push(id);
      }
      
      setSelectedRowId(ids[0]);
      updateSelectedEmployeeId(ids[0]);
    }

    return (
        <>
          <DataGrid sx={{
              "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                display: "none"
              }
            }}
            autoPageSize 
            checkboxSelection
            columnHeaderHeight={50} 
            rowHeight={25} 
            rows={employees} 
            columns={columns} 
            rowSelectionModel={selectedRowId}
            onRowSelectionModelChange={onRowSelectionModelChangeHandler}
            hideFooterSelectedRowCount={true}
          /> 
        </>
    );
};

export default EmployeeList;
