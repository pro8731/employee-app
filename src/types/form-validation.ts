import * as Yup from 'yup';

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const charRegExp = /^[aA-zZ\s]+$/

export const validationSchema = Yup
.object()
    .shape({
        firstName: Yup
            .string()
            .max(20, 'First name must be at most 20 characters')
            .required('First Name is required')
            .matches(charRegExp, 'Only alphabets are allowed for this field'),
        lastName: Yup
            .string()
            .max(20, 'Last name must be at most 20 characters')
            .required('Last Name is required')
            .matches(charRegExp, 'Only alphabets are allowed for this field'),
        email: Yup
            .string()
            .max(30, 'Email must be at most 30 characters')
            .required('Email is required')
            .email('Email is invalid'),
        phoneNumber: Yup.string()
            .required('Phone Number is required').matches(phoneRegExp, 'Phone number is not valid'),
            addresses: Yup.array().of(
                Yup.object().shape ({
                    streetName: Yup
                        .string()
                        .max(30, 'Street name must be at most 30 characters')
                        .required('Street Name is required'),
                    apartmentNumber: Yup
                        .number()
                        .max(1000, 'Apartment number must be at most 1000')
                        .required('Apartment Number is required')
                        .test(
                            'Is positive?', 
                            'ERROR: The number must be greater than 0!', 
                            (value) => value > 0
                        ),
                    postalCode: Yup
                        .string()
                        .max(8, 'Postal Code must be at most 8 characters')
                        .required('Postal Code is required'),
                    state: Yup
                        .string()
                        .max(20, 'State must be at most 20 characters')
                        .required('State is required')
                        .matches(charRegExp, 'Only alphabets are allowed for this field'),
                    country: Yup
                        .string()
                        .max(20, 'Country must be at most 20 characters')
                        .required('Country is required')
                        .matches(charRegExp, 'Only alphabets are allowed for this field')
    }))
});
