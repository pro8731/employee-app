import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { IEmployee, IEmployeeList, IEmployeeListProps } from '../types/interfaces'
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


const EmployeeList: React.FC<IEmployeeListProps> = ({selectedEmployeeId, updateSelectedEmployeeId, updateSelectedEmployee}) => {
    const [employee, setEmployee] = useState<IEmployeeList>([]);
    const [selectedRowId, setSelectedRowId] = useState<number>();
    const [selectionModel, setSelectionModel] = React.useState<GridRowSelectionModel>(
      () => employee.filter((r) => r.id > 0).map((r) => r.id)
    );

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
      // alert("on mouting initial value passed in from parent: " + selectedEmployeeId);
      setSelectedRowId(selectedEmployeeId);
    }, []);

    const onRowSelectionModelChangeHandler = (ids: any) => {
      if (ids.length > 1) {
        const selectionSet = new Set(selectionModel);
        const result = ids.filter((s: GridRowId) => !selectionSet.has(s));

        ids = result;

        setSelectionModel(ids);
      } else {
        setSelectionModel(ids);
      }

      const selectedIDs = new Set(ids);
      setSelectedRowId(ids);
      let selectedRowId = Number(ids[0]);
      updateSelectedEmployeeId(selectedRowId);
      const selectedRowData = employee.filter((row: { id: GridRowId; }) =>
        selectedIDs.has(selectedRowId),
      );
      updateSelectedEmployee(selectedRowData[selectedRowId-1]);
    }

    return (
        <>
          <h3 style={{ textAlign: 'left'}}>Employee List</h3>
          <DataGrid sx={{
              "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                display: "none"
              }
            }}
            autoPageSize 
            checkboxSelection
            columnHeaderHeight={50} 
            rowHeight={25} 
            rows={employee} 
            columns={columns} 
            rowSelectionModel={selectedRowId}
            onRowSelectionModelChange={onRowSelectionModelChangeHandler}
          /> 
        </>
    );
};

export default EmployeeList;
