import { Field, FieldArray, Form, Formik } from "formik"
import { IEmployee } from "../types/interfaces"
import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { TextField } from "formik-material-ui"
import { addEmployee, getEmployee, putEmployee } from "../services/employee.service"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';

// let renderCount = 0;

const EmployeeFormik: React.FC<{employee: IEmployee}> = ({ employee }) => {
  let mode = employee.id > 0 ? 'Edit' : 'Add';

  const [initValue, setInitValue] = useState(employee);
  
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    phoneNumber: Yup.string()
      .required('Phone Number is required'),
    addresses: Yup.array().of(
      Yup.object().shape ({
        streetName: Yup.string()
          .required('Street Name is required'),
        apartmentNumber: Yup.number()
          .required('Apartment Number is required'),
        postalCode: Yup.string()
          .required('Postal Code is required'),
        state: Yup.string()
          .required('State is required'),
        country: Yup.string()
          .required('Country is required')
      }))
    });

  const navigate = useNavigate();

  const setEmployee = () => {
    getEmployee(employee.id).then((data: any) => {
      setInitValue(data);
      console.log(data);
    })
    .catch((error: any) => {
      console.log(error);
    });
  }

  useEffect(
    function setEmployeeOnMounting() {
    if (mode === 'Edit') {
      setEmployee();
    }
  }, []);

  // renderCount++;
  
    return (
      <Card>
        <CardContent>
        <h3 style={{ textAlign: 'left'}}>{mode} Employee (Formik)</h3>
        {/* <h3 style={{ textAlign: 'right'}}>renderCount={renderCount}</h3> */}
  
          <Formik
            initialValues={initValue}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values/*, actions*/) => {
              // console.log({ values/*, actions*/ });
              // alert(JSON.stringify({ values/*, actions*/}, null, 9));
              if (mode === 'Add') {
                addEmployee(values);
              } else if (mode === 'Edit') {
                putEmployee(values);
              }
              navigate("/");
            }}>
            {({ values, errors }) => (
               <Form autoComplete="off">
                <Grid container spacing={2}>
                   
                   <Grid item xs={6}>
                     <Field fullWidth name="firstName" component={TextField} label="First Name" variant="standard"></Field>
                   </Grid>
                   <Grid item xs={6}>  
                     <Field fullWidth name="lastName" component={TextField} label="Last Name" variant="standard"></Field>
                   </Grid>
                   <Grid item xs={6}>  
                     <Field fullWidth name="email" component={TextField} label="Email" variant="standard"></Field>
                   </Grid>
                   <Grid item xs={6}>  
                     <Field fullWidth name="phoneNumber" component={TextField} label="Phone Number" variant="standard"></Field>
                   </Grid>

                   <Grid item xs={12}> 
                   <FieldArray name="addresses">
                    {({ push, remove }: any) => (
                      <React.Fragment>
                        <Grid item>
                          <Typography variant="body2" style={{ textAlign: 'left'}}>Addresses</Typography>
                        </Grid>  

                      {values.addresses.map((_, index) => (
                        <Grid container direction={'row'} spacing={2} rowSpacing={10}>
                          <Grid item xs={4}>  
                            <Field fullWidth name={`addresses.${index}.streetName`} component={TextField} label="Street Name" variant="standard"></Field>
                          </Grid>
                          <Grid item xs={1}>  
                            <Field fullWidth name={`addresses.${index}.apartmentNumber`} type="number" component={TextField} label="Apartment Number" variant="standard"></Field>
                          </Grid>
                          <Grid item xs={1}>  
                            <Field fullWidth name={`addresses.${index}.postalCode`} component={TextField} label="Postal Code" variant="standard"></Field>
                          </Grid>
                          <Grid item xs={2}>  
                            <Field fullWidth name={`addresses.${index}.state`} component={TextField} label="State" variant="standard"></Field>
                          </Grid>
                          <Grid item xs={2}>  
                            <Field fullWidth name={`addresses.${index}.country`} component={TextField} label="Country" variant="standard"></Field>
                          </Grid>                          
                          <Grid item xs={2}>  
                            <Button fullWidth variant="contained" color="secondary" 
                                onClick={() => remove(index)}
                              >
                                DELETE
                            </Button>
                          </Grid>
                        </Grid> ))}

                        <br></br>

                      <Grid item xs={2}>
                        <Button fullWidth type="button" color="secondary" variant="contained" 
                          onClick={() =>
                              push({
                              streetName: "",
                              apartmentNumber: 0,
                              postalCode: "",
                              state: "",
                              country: ""
                              })
                          }
                          >APPEND</Button>
                      </Grid>
                      </React.Fragment>
                    )}
                   </FieldArray>
                  </Grid>

                <Grid item xs={12}>
                </Grid>
                   <Grid item xs={4}>
                    <Button fullWidth type="submit" variant="contained" color="primary">Submit</Button>
                   </Grid>

                </Grid>
              </Form>
            )}
          </Formik>

        </CardContent>
      </Card>
    )
  }
  
export default EmployeeFormik;
  