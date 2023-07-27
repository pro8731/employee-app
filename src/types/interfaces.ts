export interface IAddress {
    streetName?: string;
    postalCode?: string;
    apartmentNumber: number;
    state?: string;
    country?: string;
}

export interface IEmployee {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    addresses: IAddressList;  
}  

export interface IAddressList extends Array<IAddress> {} 
export interface IEmployeeList extends Array<IEmployee> {} 

