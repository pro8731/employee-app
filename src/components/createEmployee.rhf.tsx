import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { IEmployee } from "../types/interfaces";
import { addEmployee } from "../services/employee.service";

// let renderCount = 0;

const CreateEmployeeReactHookForm: React.FC<{}> = () => {
      const { register, control, handleSubmit, formState: { errors } } = useForm<IEmployee>({
        defaultValues: {
            id: 0,
            firstName: "", lastName: "", email: "", phoneNumber: "",            
            addresses: [{ streetName: "", apartmentNumber: 0, postalCode: "", state: "", country: "" }]
          },
          mode: "onBlur"        
      });

      const { fields, append, remove } = useFieldArray({
        name: "addresses",
        control
      });

      const onSubmit = (data: IEmployee) => {
        console.log(data);
        alert(JSON.stringify({ data, errors}, null, 9));
        addEmployee(data);
      }

    //   renderCount++;

      return (
        <Card>
          <CardContent>
          <h3 style={{ textAlign: 'left'}}>Add Employee (react-hook-form)</h3>
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

export default CreateEmployeeReactHookForm;

