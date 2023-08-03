import axios from 'axios'
import { EMPLOYEE_API_URL } from '../environement';
import { IEmployee } from '../types/interfaces';


export function getEmployees() {
    return axios
    .get(EMPLOYEE_API_URL)
    .then(response => {
        console.log(response);
        return response.data;
    }) 
    .catch(error => {
        if (axios.isAxiosError(error)) {
            console.log(error.response)
          } else {
            console.error(error);
          }
        return error;
    })
};

export function addEmployee(data: IEmployee) {
    return axios.post<IEmployee>(EMPLOYEE_API_URL, data)
    .then(response => {
        console.log(response);
        return response.data;
    }) 
    .catch(error => {
        if (axios.isAxiosError(error)) {
            console.log(error.response)
            if (error.response?.status === 409) {
                console.error("Duplicate Email of employee Id!");
            }
          } else {
            console.error(error);
          }
        return error;
    })
};

export function putEmployee(data: IEmployee) {
    return axios.put<IEmployee>(EMPLOYEE_API_URL + '/' + data.id, data)
    .then(response => {
        console.log(response);
        return response.data;
    }) 
    .catch(error => {
        if (axios.isAxiosError(error)) {
            console.log(error.response)
            if (error.response?.status === 404) {
                console.error("Employee does not exist!");
            }
          } else {
            console.error(error);
          }
        return error;
    })
};

export function getEmployee(id: number) {
    return axios.get<IEmployee>(EMPLOYEE_API_URL + '/' + id)
    .then(response => {
        console.log(response);
        return response.data;
    }) 
    .catch(error => {
        if (axios.isAxiosError(error)) {
            console.log(error.response)
            if (error.response?.status === 404) {
                console.error("Employee does not exist!");
            }
          } else {
            console.error(error);
          }
        return error;
    })
};

export function deleteEmployee(id: number) {
    return axios.delete<IEmployee>(EMPLOYEE_API_URL + '/' + id)
    .then(response => {
        console.log(response);
        return response.data;
    }) 
    .catch(error => {
        if (axios.isAxiosError(error)) {
            console.log(error.response)
            if (error.response?.status === 404) {
                console.error("Employee does not exist!");
            }
          } else {
            console.error(error);
          }
        return error;
    })
};
