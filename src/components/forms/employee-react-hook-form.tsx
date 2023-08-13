import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from "react";
import { FormMode, initEmployee } from "../../types/types";
import { addEmployee, getEmployee, putEmployee } from "../../services/employee-service";
import { Subscription } from "rxjs";
import { validationSchema } from "../../types/form-validation";


const EmployeeReactHookForm: React.FC<{id: number}> = ({ id }) => {

  const [formMode] = useState<FormMode>(id > 0 ? FormMode.EDIT : FormMode.ADD);

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm ({
    defaultValues: {
        firstName: initEmployee.firstName ?? "", 
        lastName: initEmployee.lastName ?? "", 
        email: initEmployee.email ?? "", 
        phoneNumber: initEmployee.phoneNumber ?? "",            
        addresses: initEmployee.addresses
      },
      mode: "onChange",
      resolver: yupResolver(validationSchema),        
  });

  const { fields, append, remove } = useFieldArray({
    name: "addresses",
    control
  });

  const navigate = useNavigate();

  const subscriptionRef = useRef<Subscription | null>();

  useEffect(
    function setEmployeeOnMounting() {
      if (formMode === FormMode.EDIT) {
        subscriptionRef.current = getEmployee(id).subscribe((data) => {
        reset(data);
      });
    }

    return () => {
      if (subscriptionRef.current && !subscriptionRef.current.closed) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    } 
  }, []);

  const onSubmit = (data: any) => {
    if (formMode === FormMode.ADD) {
      subscriptionRef.current = addEmployee(data)
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
      subscriptionRef.current = putEmployee(data)
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
        <h3 style={{ textAlign: 'left'}}>{formMode} Employee (react-hook-form)</h3>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

          <Grid container spacing={2}>
                  
              <Grid item xs={6}>
                <TextField fullWidth {...register("firstName", {
                  required: true
                  })} 
                  name="firstName"
                  label="First Name"
                  placeholder="First Name" 
                  InputLabelProps={{ shrink: true }}  
                  variant="standard"
                  error={!!errors.firstName}
                  helperText={
                      errors.firstName && `${errors.firstName.message}`
                  } 
                >
                </TextField>
              </Grid>
              <Grid item xs={6}>  
                  <TextField fullWidth {...register('lastName', {
                      required: true
                  })} 
                  name="lastName"
                  label="Last Name" 
                  placeholder="Last Name" 
                  InputLabelProps={{ shrink: true }}  
                  variant="standard"
                  error={!!errors.lastName}
                  helperText={
                      errors.lastName && `${errors.lastName.message}`
                  } 
                >
                </TextField>
              </Grid>
              <Grid item xs={6}>  
                  <TextField fullWidth {...register("email", {
                      required: true
                  })} 
                  name="email"
                  label="Email" 
                  placeholder="Email" 
                  InputLabelProps={{ shrink: true }}  
                  variant="standard" 
                  type="email"
                  error={!!errors.email}
                  helperText={
                      errors.email && `${errors.email.message}`
                  } 
                >
                </TextField>
              </Grid>
              <Grid item xs={6}>  
                  <TextField fullWidth {...register("phoneNumber", {
                      required: true
                  })}
                  name="phoneNumber"
                  label="Phone Number" 
                  placeholder="Phone Number" 
                  InputLabelProps={{ shrink: true }}  
                  variant="standard" 
                  type="tel"
                  error={!!errors.phoneNumber}
                  helperText={
                      errors.phoneNumber && `${errors.phoneNumber.message}`
                  } 
                >
                </TextField>
              </Grid>
              
              <Grid item xs={12}> 
              {fields.map((field, index) => {
              return (
                  <div key={field.id}>
                  <section className={"section"} key={field.id}>

                  <Grid item>
                      <Typography variant="body2" style={{ textAlign: 'left'}}>Addresses</Typography>
                  </Grid>  

                  <Grid container direction={'row'} spacing={2} rowSpacing={10}>
                      <Grid item xs={4}>  
                      <TextField fullWidth
                          {...register(`addresses.${index}.streetName` as const, {
                              required: true
                          })}
                          name={`addresses.${index}.streetName`}
                          label="Street Name"
                          placeholder="Street Name"
                          variant="standard"
                          error={!!errors.addresses?.[index]?.streetName}
                          helperText={
                             errors?.addresses?.[index]?.streetName && `${errors?.addresses?.[index]?.streetName?.message}`
                          }  
                      />
                      </Grid>
                      <Grid item xs={1}>  
                      <TextField fullWidth
                          type="number"
                          {...register(`addresses.${index}.apartmentNumber` as const, {
                              valueAsNumber: true,
                              required: true
                          })}
                          name={`addresses.${index}.apartmentNumber`}
                          label="Apartment Number"
                          placeholder="Apartment Number"
                          variant="standard"
                          error={!!errors?.addresses?.[index]?.apartmentNumber}
                          helperText={
                              errors?.addresses?.[index]?.apartmentNumber && `${errors?.addresses?.[index]?.apartmentNumber?.message}`
                          } 
                      />
                      </Grid>
                      <Grid item xs={1}>  
                      <TextField fullWidth
                          type="text"
                          {...register(`addresses.${index}.postalCode` as const, {
                              required: true
                          })}
                          name={`addresses.${index}.postalCode`}
                          label="Postal Code"
                          placeholder="Postal Code"
                          variant="standard"
                          error={!!errors?.addresses?.[index]?.postalCode}
                          helperText={
                              errors?.addresses?.[index]?.postalCode && `${errors?.addresses?.[index]?.postalCode?.message}`
                          } 
                      />
                      </Grid>
                      <Grid item xs={2}>  
                      <TextField fullWidth
                          type="text"
                          {...register(`addresses.${index}.state` as const, {
                              required: true
                          })}
                          name={`addresses.${index}.state`}
                          label="State"
                          placeholder="State"
                          variant="standard"
                          error={!!errors?.addresses?.[index]?.state}
                          helperText={
                              errors?.addresses?.[index]?.state && `${errors?.addresses?.[index]?.state?.message}`
                          } 
                      />
                      </Grid>
                      <Grid item xs={2}>  
                      <TextField fullWidth
                          type="text"
                          {...register(`addresses.${index}.country` as const, {
                              required: true
                          })}
                          name={`addresses.${index}.country`}
                          label="Country"
                          placeholder="Country"
                          variant="standard"
                          error={!!errors?.addresses?.[index]?.country}
                          helperText={
                              errors?.addresses?.[index]?.country && `${errors?.addresses?.[index]?.country?.message}`
                          } 
                      />
                      </Grid>
                      <Grid item xs={2}>  

                      <Button fullWidth type="button" variant="contained" color="secondary" onClick={() => remove(index)}>
                          DELETE
                      </Button>
                      </Grid>

                      </Grid>

                  </section>
                  </div>
              );
              })}
              </Grid>

              <Grid item xs={2}>
              <Button fullWidth type="button" color="secondary" variant="contained" 
                  onClick={() =>
                      append({
                      streetName: "",
                      apartmentNumber: 0,
                      postalCode: "",
                      state: "",
                      country: ""
                      })
                  }
                  >APPEND</Button>
              </Grid>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={4}>
                  <Button fullWidth type="submit" variant="contained" color="primary">Submit</Button>
              </Grid>

          </Grid>

        </form>        
      </CardContent>
    </Card>
  )
}

export default EmployeeReactHookForm;

