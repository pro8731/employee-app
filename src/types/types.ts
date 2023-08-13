export enum FormMode {
    ADD = "Add",
    EDIT = "Edit",
}
 
export const initEmployee = {
    id: 0,
    firstName: "", lastName: "", email: "", phoneNumber: "",            
    addresses: [{ streetName: "", apartmentNumber: 0, postalCode: "", state: "", country: "" }]
}; 

