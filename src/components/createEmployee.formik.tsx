import { Field, FieldArray, Form, Formik } from "formik"
import { IEmployee } from "../types/interfaces"
import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { TextField } from "formik-material-ui"
import { addEmployee } from "../services/employee.service"
import React from "react"

// let renderCount = 0;

const CreateEmployeeFormik: React.FC<{}> = () => {
    const initialValues: IEmployee = {
      id: 0,
      firstName: "", lastName: "", email: "", phoneNumber: "",
      addresses: [{
        streetName: "",
        postalCode: "",
        apartmentNumber: 0,
        state: "",
        country: ""
      }]
    }

    // renderCount++;
  
    return (
      <Card>
        <CardContent>
        <h3 style={{ textAlign: 'left'}}>Add Employee (Formik)</h3>
        {/* <h3 style={{ textAlign: 'right'}}>renderCount={renderCount}</h3> */}
  
          <Formik
            initialValues={initialValues}
            onSubmit={(values/*, actions*/) => {
              console.log({ values/*, actions*/ });
              alert(JSON.stringify({ values/*, actions*/}, null, 9));
              addEmployee(values);
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

                {/* <pre style={{ textAlign: 'left'}}>{JSON.stringify({ values, errors}, null, 9)}</pre> */}
               </Form>
            )}
          </Formik>

        </CardContent>
      </Card>
    )
  }
  
export default CreateEmployeeFormik;
  