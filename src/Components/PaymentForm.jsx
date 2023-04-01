import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';

const PaymentForm = ({payment}) => {
    // const [method, setMethod] = useState([]);

    const handleChange = (event) => {
        // setMethod(event.target.value);
        payment(event.target.value);
    }


    return (
        <React.Fragment>
            {/* <Typography variant="h6" gutterBottom>
                Payment method
            </Typography> */}
            <FormControl>
                <FormLabel id="paymentMethod">Payment Method</FormLabel>
                <RadioGroup
                    aria-labelledby="paymentMethod"
                    defaultValue="card"
                    name="radio-buttons-group"
                    // value={method}
                    onChange={handleChange}
                >
                    <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                    <FormControlLabel value="cod" control={<Radio />} label="Cash On delivery" />
                </RadioGroup>
            </FormControl>

            {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox  name="creditCard" value="true" />}
                        label="Credit Card"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox  name="cod" value="true" />}
                        label="Cash On Delivery"
                    />
                </Grid> */}
            {/* <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox  name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid> */}
        </React.Fragment>
    )
}

export default PaymentForm