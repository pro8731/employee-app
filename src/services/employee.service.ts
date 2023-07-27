import axios from 'axios'
import { EMPLOYEE_API_URL } from '../environement';
import { IEmployee } from '../types/interfaces';


export function getEmployees() {
    return axios
    .get(EMPLOYEE_API_URL)
    .then(data => {
        console.log(data);
        return data.data;
    }) 
    .catch(error => {
        console.log(error);
        return error;
    })
};

export function addEmployee(data: IEmployee) {
    return axios.post<IEmployee>(EMPLOYEE_API_URL, data);
};
