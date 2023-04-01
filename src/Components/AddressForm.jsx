import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const AddressForm = ({details}) => {
    // const [userDetails, setUserDetails]= useState({});
    const detRef = useRef({});

    const userDetails ={};
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [address1, setaddress1] = useState('');
    const [address2, setaddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setstate] = useState('');
    const [zip, setzip] = useState('');
    const [country, setcountry] = useState('');

    const handleChange = (event) => {
        detRef.current[event.target.name] = event.target.value;
        // setUserDetails({[event.target.name]: event.target.value});
        // userDetails[event.target.name] = event.target.value;
        // console.log(userDetails);
        // details(event.target.name, event.target.value);
        // details(userDetails);
    }

    // console.log(userDetails);

    useEffect(() => {
        return () => {
            
            // details(userDetails);
            // userDetails['firstName'] = firstName;
            // userDetails['lastName'] = lastName;
            // console.log(userDetails);
            console.log(detRef.current)
            details(detRef.current);
            // details = detRef.current;
        }
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={handleChange}
                        // onChange={setFirstName}
                        // onBlur={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onChange={handleChange}
                        // onBlur={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        onChange={handleChange}
                        // onBlur={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        onChange={handleChange}
                        // onBlur={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        onChange={handleChange}
                        // onBlur={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        // onBlur={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        onChange={handleChange}
                        // onBlur={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        onChange={handleChange}
                        // onBlur={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox  name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default AddressForm