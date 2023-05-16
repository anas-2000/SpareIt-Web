import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControl, FormLabel } from '@mui/material';

const PaymentForm = ({payment}) => {

    const handleChange = (event) => {
        payment(event.target.value);
    }


    return (
        <React.Fragment>
            <FormControl>
                <FormLabel id="paymentMethod">Payment Method</FormLabel>
                <RadioGroup
                    aria-labelledby="paymentMethod"
                    defaultValue="card"
                    name="radio-buttons-group"
                    onChange={handleChange}
                >
                    <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                    <FormControlLabel value="cod" control={<Radio />} label="Cash On delivery" />
                </RadioGroup>
            </FormControl>
        </React.Fragment>
    )
}

export default PaymentForm