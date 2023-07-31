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


/////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface IFormComponentProps {
    formComponent?: React.ReactNode;
}

export interface IFormComponentProps {}

export interface IEmployeeListProps {
    selectedEmployeeId?: number;
    updateSelectedEmployeeId: (arg: number) => void
    updateSelectedEmployee: (arg: IEmployee) => void
}

export interface IEmployeeListProps {}
