import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";


const ReviewForm = ({details, paymentMethod }) => {
    const cart = useSelector((state) => state.cart);
    
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cart.products.map((product) => (
                    <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.title} secondary={product.desc} />
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>  
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
            </Grid>
        </React.Fragment>
    )
}

export default ReviewForm