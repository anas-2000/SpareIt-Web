
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../Components/AddressForm';
import PaymentForm from '../Components/PaymentForm';
import Review from '../Components/ReviewForm';
import { red, blue } from '@mui/material/colors';
import { useState } from 'react';
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userRequest } from "../requestMethods";
import { emptyCart } from '../Redux/cartRedux'
import { useDispatch } from "react-redux";



function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                SPAREIT
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//     switch (step) {
//         case 0:
//             return <AddressForm />;
//         case 1:
//             return <PaymentForm />;
//         case 2:
//             return <Review />;
//         default:
//             throw new Error('Unknown step');
//     }
// }

const theme = createTheme({
    palette: {
        primary: {
            main: red[800],
        },
        secondary: {
            main: blue[500],
        }
    },
});

const KEY = process.env.REACT_APP_STRIPE;

const Checkout = () => {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = React.useState(0);
    const [paymentMethod, setpaymentMethod] = useState('card');
    const [details, setDetails] = useState({
        // 'firstName':'',
        // 'lastName': '',
        // 'address1': '',
        // 'address2': '',
        // 'city': '',
        // 'state': '',
        // 'zip': '',
        // 'country': '',
    });
    const userDetails = {};
    // const details = {
    //     'firstName':'',
    //     'lastName': '',
    //     'address1': '',
    //     'address2': '',
    //     'city': '',
    //     'state': '',
    //     'zip': '',
    //     'country': '',
    // };

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setlastName] = useState('');
    // const [address1, setaddress1] = useState('');
    // const [address2, setaddress2] = useState('');
    // const [city, setCity] = useState('');
    // const [state, setstate] = useState('');
    // const [zip, setzip] = useState('');
    // const [country, setcountry] = useState('');

    const [stripeToken, setStripeToken] = useState(null);
    const [total, setTotal] = useState(0);
    const [shipping, setShipping] = useState(1000);
    const [custaddress, setAddress] = useState('');
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState();


    // const setDetails = (key, value) => {
    //     details[key] =  value;
    // };

    const onToken = (token) => {
        setStripeToken(token);
    };

    // useEffect(() => {
    //     const addOrder = async () => {
    //         const prod = cart.products;
    //         const productCount = prod.reduce((acc, product) => {
    //             if (product._id in acc) {  //change id to _id when connecting with database
    //                 acc[product._id]++;
    //             } else {
    //                 acc[product._id] = 1;
    //             }
    //             return acc;
    //         }, {});

    //         // const result = Object.entries(productCount).map(([id, count]) => ({ productID: id, quantity: count }));
    //         const result = Object.entries(productCount).map(([id, count]) => ({ product: id, quantity: count })); // add seller id to this

    //         const order = {
    //             customer: user._id,
    //             products: result,
    //             amount: cart.total + shipping,
    //             address: custaddress,
    //             status: "approved",
    //         };
    //         try {
    //             const res = await userRequest.post("/orders", order);
    //             console.log(res.body);
    //             setOrderId(res.body._id);
    //         } catch{}
    //     }


    //     const makeRequest = async () => {
    //         try {
    //             const res = await userRequest.post("/stripe/payment", {
    //                 tokenId: stripeToken.id,
    //                 amount: cart.total * 100,
    //             });
    //             navigate('/', {
    //                 stripeData: res.data,
    //                 products: cart,
    //             })
    //             // history.push("/", {
    //             //     stripeData: res.data,
    //             //     products: cart,
    //             // });
    //         } catch { }
    //     };

    //     stripeToken && addOrder();
    //     // addOrder();
    //     stripeToken && makeRequest();

    // }, [stripeToken, cart, navigate]);


    useEffect(() => {
        const makeRequest = async () => {
            if (stripeToken) {
                try {
                    const res = await userRequest.post("/stripe/payment", {
                        tokenId: stripeToken.id,
                        amount: (cart.total + shipping) * 100,
                    });
                    checkOut();
                    setpaymentMethod('cod');
                    setActiveStep(steps.length);
                    // navigate('/', {
                    //     stripeData: res.data,
                    //     products: cart,
                    // })
                } catch { }
            }
        };

        // stripeToken && checkOut();
        stripeToken && makeRequest();
    }, [stripeToken])

    const checkOut = () => {
        
        const addOrder = async () => {
            const prod = cart.products;
            // console.log(prod);
            const productCount = prod.reduce((acc, product) => {
                const { _id: _id, seller } = product;
                if (product._id in acc) {  //change id to _id when connecting with database
                    acc[product._id].quantity++;
                } else {
                    acc[product._id] = {quantity: 1, seller};
                }
                return acc;
            }, {});

            // const result = Object.entries(productCount).map(([id, count]) => ({ productID: id, quantity: count }));
        //    console.log(productCount);
            const result = Object.entries(productCount).map(([id, count]) => ({ product: id, quantity: count.quantity, seller: count.seller })); // add seller id to this
            // console.log(result);

            const order = {
                customer: user._id,
                // products: result,
                items: result,
                amount: cart.total + shipping,
                address: custaddress,
                status: "approved",
            };
            try {
                const res = await userRequest.post("/orders", order);
                setOrderId(res.data._id);
                dispatch(emptyCart());
                // postSellersRevenue(res.data._id);
                const sellers = cart.products.reduce((acc, product) => {
                    const { seller, price, quantity } = product;
                    const totalAmount = price * quantity;
                    if (acc[seller]) {
                        // acc[seller] += totalAmount;
                        acc[seller].amount += totalAmount;

                    } else {
                        // acc[seller] = totalAmount;
                        acc[seller] = {amount: totalAmount, order: res.data._id}
                        // acc[seller].orderId = orderid;
                    
                    // }
                    // acc[seller].orderId = res.data._id;
                    // console.log(acc);
                    return acc;
                    }
                }, {});
                    const result = Object.entries(sellers).map(([id, orderdet]) => ({ seller: id, order: orderdet.order, amount: orderdet.amount }));
                    const res2 = await userRequest.post("/revenue", result);
            } catch { }
        }

        const postSellersRevenue = async (orderid) => {
            const sellers = cart.products.reduce((acc, product) => {
                const { seller, price, quantity } = product;
                const totalAmount = price * quantity;

                if (acc[seller]) {
                    acc[seller] += totalAmount;
                } else {
                    acc[seller] = totalAmount;
                    acc[seller].orderId = orderid;
                
                }
                // acc[seller].orderId = orderid;
                console.log(acc);
                return acc;
            }, {});
            console.log(sellers);
            const res = await userRequest.post("/revenue", sellers);
            console.log(res);
        }


        // const makeRequest = async () => {
        //     try {
        //         const res = await userRequest.post("/stripe/payment", {
        //             tokenId: stripeToken.id,
        //             amount: cart.total * 100,
        //         });
        //         navigate('/', {
        //             stripeData: res.data,
        //             products: cart,
        //         })
        //     } catch { }
        // };

        addOrder();
        // if(stripeToken){
        //     makeRequest();
        // }


    }

    // const makeRequest = async () => {
    //     if (stripeToken) {
    //         try {
    //             const res = await userRequest.post("/stripe/payment", {
    //                 tokenId: stripeToken.id,
    //                 amount: (cart.total + shipping) * 100 ,
    //             });
    //             navigate('/', {
    //                 stripeData: res.data,
    //                 products: cart,
    //             })
    //         } catch { }
    //     }
    // };


    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm details={setDetails} />;
            case 1:
                return <PaymentForm payment={setpaymentMethod} />;
            case 2:
                return <Review details={details} payment={paymentMethod} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        // if(activeStep === 0){  
        //     if(details['firstName'].length > 0 && details['lastName'].length > 0 && details['address1'].length > 0
        //     && details['address2'].length > 0 && details['city'].length > 0 && details['zip'].length > 0
        //     && details['country'].length > 0){
        //         setActiveStep(activeStep + 1);        
        //     }
        //     return;
        // }
        // if(activeStep === 2){
        //     console.log(details);
        // }
        if (activeStep === steps.length - 1) {
            if (paymentMethod !== 'card')
                checkOut();
        }

        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        SPAREIT
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <>{paymentMethod === 'card' ?
                        <StripeCheckout
                            name="SPAREIT"
                            // image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            billingAddress
                            shippingAddress
                            description={`Your total is Rs ${cart.total + shipping}`}
                            amount={(cart.total + shipping) * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            {/* <Button variant="contained" onClick={makeRequest}>CHECKOUT NOW</Button> */}
                        </StripeCheckout>
                        : (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order id is {orderId}. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                                    <Button variant="contained" onClick={() => (navigate('/'))}>Continue Shopping</Button>
                                </Box>
                            </React.Fragment>
                        )} </> : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                {/* {activeStep === steps.length - 1 ? (
                                    <Button
                                        variant="contained"
                                        onClick={checkOut}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Place order
                                    </Button>) :
                                    (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 3, ml: 1 }}
                                        >
                                            Next
                                        </Button>
                                    )

                                } */}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    )
}

export default Checkout