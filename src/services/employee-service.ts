import { IEmployee, IEmployeeList } from "../types/interfaces";
import { EMPLOYEE_API_URL } from "../environement";
import { catchError, map, Observable, throwError } from 'rxjs'
import { axios } from "./axios";
import { AxiosError } from "axios";


export function getEmployees(): Observable<IEmployeeList> {
    return axios
    .get<IEmployeeList>(EMPLOYEE_API_URL)
    .pipe(
        map(({ data }) => {
            return data
        }),
        catchError((error: Error | AxiosError) => {
            if (error instanceof AxiosError)  {
                console.log(error);
                handleError(error, 'getEmployees');
            } 
            else {
                console.log(error);
                handleError(error, 'getEmployees');
            }            
            return throwError(() => error);
        })
    )
};

export function addEmployee(data: IEmployee): Observable<IEmployee> {
    return axios
    .post<IEmployee>(EMPLOYEE_API_URL, data)
    .pipe(
        map(({ data }) => {
            return data
        }),
        catchError((error: Error | AxiosError) => {
            if (error instanceof AxiosError)  {
                console.log(error);
                handleError(error, 'addEmployee');
            } 
            else {
                console.log(error);
                handleError(error, 'addEmployee');
            }            
            return throwError(() => error);   
        })
    )
};

export function putEmployee(data: IEmployee): Observable<IEmployee> {
    return axios
    .put<IEmployee>(EMPLOYEE_API_URL + '/' + data.id, data)
    .pipe(
        map(({ data }) => {
            return data
        }),
        catchError((error: Error | AxiosError) => {
            if (error instanceof AxiosError)  {
                console.log(error);
                handleError(error, 'putEmployee');
            } 
            else {
                console.log(error);
                handleError(error, 'putEmployee');
            }            
            return throwError(() => error);
        })
    )
};

export function getEmployee(id: number): Observable<IEmployee> {
    return axios
    .get<IEmployee>(EMPLOYEE_API_URL + '/' + id)
    .pipe(
        map(({ data }) => {
            return data
        }),
        catchError((error: Error | AxiosError) => {
            if (error instanceof AxiosError)  {
                console.log(error);
                handleError(error, 'getEmployee');
            } 
            else {
                console.log(error);
                handleError(error, 'getEmployee');
            }            
            return throwError(() => error);
        })
    )
};

export function deleteEmployee(id: number): Observable<IEmployee> {
    return axios
    .delete<IEmployee>(EMPLOYEE_API_URL + '/' + id)
    .pipe(
        map(({ data }) => {
            return data
        }),
        catchError((error: Error | AxiosError) => {
            if (error instanceof AxiosError)  {
                console.log(error);
                handleError(error, 'deleteEmployee');
            } 
            else {
                console.log(error);
                handleError(error, 'deleteEmployee');
            }            
            return throwError(() => error);
        })
    )
};

export function handleError(error: any, api: string) {
    if (error.response?.status === 404) {
        console.log("function: " + api + ", message: " + error.message + ", response: " + error.response.data);
    }
    else if (error.response?.status === 409) {
        console.log("function: " + api + ", message: " + error.message + ", response: " + error.response.data);
    }
    else {
        console.log(error);
    }
}
 