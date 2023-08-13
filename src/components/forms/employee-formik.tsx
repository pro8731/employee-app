import { Field, FieldArray, Form, Formik } from "formik"
import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { TextField } from "formik-material-ui"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormMode, initEmployee } from "../../types/types"
import { addEmployee, getEmployee, putEmployee } from "../../services/employee-service"
import { Subscription } from "rxjs"
import { validationSchema } from "../../types/form-validation"


const EmployeeFormik: React.FC<{id: number}> = ({ id }) => {

  const [formMode] = useState<FormMode>(id > 0 ? FormMode.EDIT : FormMode.ADD);
  const [initValue, setInitValue] = useState(initEmployee);
  
  const navigate = useNavigate();

  const subscriptionRef = useRef<Subscription | null>();

  useEffect(
    function setEmployeeOnMounting() {
      if (formMode === FormMode.EDIT) {
        subscriptionRef.current = getEmployee(id).subscribe((data: any) => {
          setInitValue(data);
        });
      }

      return () => {
        if (subscriptionRef.current && !subscriptionRef.current.closed) {
          subscriptionRef.current.unsubscribe();
          subscriptionRef.current = null;
        }
      } 
    }, []);

  const handleSubmit = (values: any) => {
    if (formMode === FormMode.ADD) {
      subscriptionRef.current = addEmployee(values)
      .subscribe({
        next: (data) => {
          console.log(data);   
          navigate("/");
        },
        error: (e) => {
          console.log(e.response.data);
          alert(e.response.data);
        },
        complete: () => console.log('done'),
      });
    } 
    else if (formMode === FormMode.EDIT) {
      subscriptionRef.current = putEmployee(values)
      .subscribe({
        next: (data) => {
          console.log(data);            
          navigate("/");
        },
        error: (e) => {
          console.log(e.response.data);
          alert(e.response.data);
        },
        complete: () => console.log('done'),
      });
    }
  }
  
  return (
    <Card>
      <CardContent>
      <h3 style={{ textAlign: 'left'}}>{formMode} Employee (Formik)</h3>

        <Formik
          initialValues={initValue}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          >
          {({ values, errors }) => (
              <Form autoComplete="off">
              <Grid container spacing={2}>
                  
                  <Grid item xs={6}>
                    <Field fullWidth 
                      name="firstName" 
                      component={TextField} 
                      label="First Name" 
                      variant="standard"
                    >
                    </Field>
                  </Grid>
                  <Grid item xs={6}>  
                    <Field fullWidth 
                      name="lastName" 
                      component={TextField} 
                      label="Last Name" 
                      variant="standard"
                    >
                    </Field>
                  </Grid>
                  <Grid item xs={6}>  
                    <Field fullWidth 
                      name="email" 
                      component={TextField} 
                      label="Email" 
                      variant="standard"
                    >
                    </Field>
                  </Grid>
                  <Grid item xs={6}>  
                    <Field fullWidth 
                      name="phoneNumber" 
                      component={TextField} 
                      label="Phone Number" 
                      variant="standard"
                    >
                    </Field>
                  </Grid>

                  <Grid item xs={12}> 
                  <FieldArray name="addresses">
                  {({ push, remove }: any) => (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant="body2" style={{ textAlign: 'left'}}>Addresses</Typography>
                      </Grid>  

                    {values.addresses.map((field, index) => (
                      <div key={index}>
                      <Grid container direction={'row'} spacing={2} rowSpacing={10}>
                        <Grid item xs={4}>  
                          <Field fullWidth 
                            key={index} 
                            name={`addresses.${index}.streetName`} 
                            component={TextField} 
                            label="Street Name" 
                            variant="standard"
                          >
                          </Field>
                        </Grid>
                        <Grid item xs={1}>  
                          <Field fullWidth 
                            key={index} 
                            name={`addresses.${index}.apartmentNumber`} 
                            type="number" 
                            component={TextField} 
                            label="Apartment Number" 
                            variant="standard"
                          >
                          </Field>
                        </Grid>
                        <Grid item xs={1}>  
                          <Field fullWidth 
                            key={index} 
                            name={`addresses.${index}.postalCode`} 
                            component={TextField} 
                            label="Postal Code" 
                            variant="standard"
                          >
                          </Field>
                        </Grid>
                        <Grid item xs={2}>  
                          <Field fullWidth 
                            key={index} 
                            name={`addresses.${index}.state`} 
                            component={TextField} 
                            label="State" 
                            variant="standard"
                          >
                          </Field>
                        </Grid>
                        <Grid item xs={2}>  
                          <Field fullWidth 
                            key={index} 
                            name={`addresses.${index}.country`} 
                            component={TextField} 
                            label="Country" 
                            variant="standard"
                          >
                          </Field>
                        </Grid>                          
                        <Grid item xs={2}>  
                          <Button fullWidth 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => remove(index)}
                          >
                            DELETE
                          </Button>
                        </Grid>
                      </Grid>
                      </div>
                      ))}

                      <br></br>

                    <Grid item xs={2}>
                      <Button fullWidth 
                        type="button" 
                        color="secondary" 
                        variant="contained" 
                        onClick={() =>
                            push({
                            streetName: "",
                            apartmentNumber: 0,
                            postalCode: "",
                            state: "",
                            country: ""
                            })
                        }
                      >
                        APPEND
                      </Button>
                    </Grid>
                    </React.Fragment>
                  )}
                  </FieldArray>
                </Grid>

              <Grid item xs={12}>
              </Grid>
                  <Grid item xs={4}>
                  <Button fullWidth 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                  >
                    Submit</Button>
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
  