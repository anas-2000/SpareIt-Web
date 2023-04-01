import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { cartItems } from '../products';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useEffect } from 'react';





// to be removed
const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

//

const ReviewForm = ({details, paymentMethod }) => {
    const cart = useSelector((state) => state.cart);
    // const [total, setTotal] = useState(0);
    // const [subtotal, setSubTotal] = useState(0);
    // const shipping = 500;


    // useEffect(() => {
    //     function calculateTotal() {
    //         var sum = 0;
    //         cartItems.forEach(items => {
    //             sum = sum + items.quantity * items.product.price;
    //         });
    //         setSubTotal(sum);
    //         setTotal(sum + shipping);
    //         getTotal(sum + shipping);
    //     }

    //     calculateTotal();
    // }, []);

    // console.log(details);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cart.products.map((product) => (// change to product._id when using data from backend
                    <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.title} secondary={product.desc} />
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                    // <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
                    //     <ListItemText primary={item.product.name} secondary={item.product.desc} />
                    //     <Typography variant="body2">{item.product.price}</Typography>
                    // </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {cart.total}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{details['firstName']} {details['lastName']}</Typography>
                    <Typography gutterBottom>{details['address1']}, {details['address2']}, {details['city']}, {details['state']},
                    {details['zip']}, {details['country']}</Typography>
                </Grid>
                {/* {paymentMethod === 'card' && (
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>)} */}
            </Grid>
        </React.Fragment>
    )
}

export default ReviewForm