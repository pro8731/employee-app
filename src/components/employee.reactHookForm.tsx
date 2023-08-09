import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { addEmployee, getEmployee, putEmployee } from "../services/employee.service";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { FormMode, initEmployee } from "../types/types";


const EmployeeReactHookForm: React.FC<{id: number}> = ({ id }) => {
    const [formMode] = useState<FormMode>(id > 0 ? FormMode.EDIT : FormMode.ADD);
  
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

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm ({
      defaultValues: {
          firstName: initEmployee.firstName ?? "", 
          lastName: initEmployee.lastName ?? "", 
          email: initEmployee.email ?? "", 
          phoneNumber: initEmployee.phoneNumber ?? "",            
          addresses: initEmployee.addresses
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema),        
    });

    const { fields, append, remove } = useFieldArray({
      name: "addresses",
      control
    });

    const navigate = useNavigate();

    const onSubmit = (data: any) => {
      console.log(data);
      if (formMode === FormMode.ADD) {
          addEmployee(data);
      } else {
          putEmployee(data);
      }
      navigate("/");
    }

    const setEmployee = () => {
      getEmployee(id).then((data) => {
        reset({...data});
      })
      .catch((error: any) => {
        console.log(error);
      });
    }

    useEffect(() => {
      if (formMode === FormMode.EDIT) {
        setEmployee();
      }
    }, []);

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
                  label="First Name"
                  placeholder="First Name" 
                  InputLabelProps={{ shrink: true }}  
                  variant="standard">
                </TextField>
              </Grid>
              <Grid item xs={6}>  
                  <TextField fullWidth {...register('lastName', {
                      required: true
                  })} 
                  label="Last Name" 
                  placeholder="Last Name" 
                  InputLabelProps={{ shrink: true }}  
                  variant="standard">
                  </TextField>
              </Grid>
              <Grid item xs={6}>  
                  <TextField fullWidth {...register("email", {
                      required: true
                  })} 
                  label="Email" 
                  placeholder="Email" 
                  InputLabelProps={{ shrink: true }}  
                  variant="standard" 
                  type="email">
                  </TextField>
              </Grid>
              <Grid item xs={6}>  
                  <TextField fullWidth {...register("phoneNumber", {
                      required: true
                  })}
                  label="Phone Number" 
                  placeholder="Phone Number" 
                  InputLabelProps={{ shrink: true }}  
                  variant="standard" 
                  type="tel">
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
                          label="Street Name"
                          placeholder="Street Name"
                          {...register(`addresses.${index}.streetName` as const, {
                              required: true
                          })}
                          className={errors?.addresses?.[index]?.streetName ? "error" : ""}
                          defaultValue={field.streetName}
                          variant="standard"
                      />
                      </Grid>
                      <Grid item xs={1}>  
                      <TextField fullWidth
                          label="Apartment Number"
                          placeholder="Apartment Number"
                          type="number"
                          {...register(`addresses.${index}.apartmentNumber` as const, {
                              valueAsNumber: true,
                              required: true
                          })}
                          className={errors?.addresses?.[index]?.apartmentNumber ? "error" : ""}
                          defaultValue={field.apartmentNumber}
                          variant="standard"
                      />
                      </Grid>
                      <Grid item xs={1}>  
                      <TextField fullWidth
                          label="Postal Code"
                          placeholder="Postal Code"
                          type="text"
                          {...register(`addresses.${index}.postalCode` as const, {
                              required: true
                          })}
                          className={errors?.addresses?.[index]?.postalCode ? "error" : ""}
                          defaultValue={field.postalCode}
                          variant="standard"
                      />
                      </Grid>
                      <Grid item xs={2}>  
                      <TextField fullWidth
                          label="State"
                          placeholder="State"
                          type="text"
                          {...register(`addresses.${index}.state` as const, {
                              required: true
                          })}
                          className={errors?.addresses?.[index]?.state ? "error" : ""}
                          defaultValue={field.state}
                          variant="standard"
                      />
                      </Grid>
                      <Grid item xs={2}>  
                      <TextField fullWidth
                          label="Country"
                          placeholder="Country"
                          type="text"
                          {...register(`addresses.${index}.country` as const, {
                              required: true
                          })}
                          className={errors?.addresses?.[index]?.country ? "error" : ""}
                          defaultValue={field.country}
                          variant="standard"
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

