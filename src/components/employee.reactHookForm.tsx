import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { IEmployee } from "../types/interfaces";
import { addEmployee, getEmployee, putEmployee } from "../services/employee.service";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from "react";

// let renderCount = 0;

const EmployeeReactHookForm: React.FC<{employee: IEmployee}> = ({ employee }) => {
    let mode = employee.id > 0 ? 'Edit' : 'Add';

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        phoneNumber: Yup.string()
          .required('Phone Number is required'),
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
      });

    const navigate = useNavigate();
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<IEmployee>({
        defaultValues: {
            id: employee.id,
            firstName: employee.firstName, 
            lastName: employee.lastName, 
            email: employee.email, 
            phoneNumber: employee.phoneNumber,            
            addresses: employee.addresses
          },
      });

      const { fields, append, remove } = useFieldArray({
        name: "addresses",
        control
      });

      const onSubmit = (data: IEmployee) => {
        console.log(data);
        // alert(JSON.stringify({ data, errors}, null, 9));
        if (mode === 'Add') {
            addEmployee(data);
        } else if (mode === 'Edit') {
            putEmployee(data);
        }
        navigate("/");
      }

      const setEmployee = () => {
        getEmployee(employee.id).then((data: any) => {
          reset({...data});
          // console.log(data);
        })
        .catch((error: any) => {
          console.log(error);
        });
      }
  
      useEffect(
        function setEmployeeOnMounting() {
        setEmployee();
      }, []);

    //   renderCount++;

      return (
        <Card>
          <CardContent>
          <h3 style={{ textAlign: 'left'}}>{mode} Employee (react-hook-form)</h3>
          {/* <h3 style={{ textAlign: 'right'}}>renderCount={renderCount}</h3> */}

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

            <Grid container spacing={2}>
                    
                <Grid item xs={6}>
                  <TextField fullWidth {...register("firstName", {
                    required: true
                    })} label="First Name" placeholder="First Name" variant="standard"></TextField>
                </Grid>
                <Grid item xs={6}>  
                    <TextField fullWidth {...register("lastName", {
                        required: true
                    })} label="Last Name" placeholder="Last Name" variant="standard"></TextField>
                </Grid>
                <Grid item xs={6}>  
                    <TextField fullWidth {...register("email", {
                        required: true
                    })} 
                    label="Email" placeholder="Email" variant="standard" type="email"></TextField>
                </Grid>
                <Grid item xs={6}>  
                    <TextField fullWidth {...register("phoneNumber", {
                        required: true
                    })}
                    label="Phone Number" placeholder="Phone Number" variant="standard" type="tel"></TextField>
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

