import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcements from "../Components/Announcements";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { cartItems } from "../products";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router";
import { decreaseProduct, increaseProduct, removeAllProducts, removeProduct } from '../Redux/cartRedux'
import { useDispatch } from "react-redux";

// const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;



const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;


const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;



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



const Cart = () => {
  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const shipping = 1000;
  // const discount = 1000;
  const cart = useSelector((state) => state.cart);

  // const [stripeToken, setStripeToken] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromCart = (product) => {
    dispatch(
      removeProduct({ ...product })
    );
  };

  const decreaseItemQuantity = (product) => {
    dispatch(
      decreaseProduct({ ...product })
    );
  };

  const increaseItemQuantity = (product) => {
    dispatch(
      increaseProduct({ ...product })
    );
  };
  const emptyCart = () => {
    dispatch(
      removeAllProducts()
    );
  };


  // const onToken = (token) => {
  //   setStripeToken(token);
  // };


  // useEffect(() => {
  //   function calculateTotal() {
  //     var sum = 0;
  //     cart.products.forEach(items => {
  //       sum = sum + items.quantity * items.product.price;
  //     });
  //     setSubTotal(sum);
  //     setTotal(subtotal + shipping);
  //   }

  //   calculateTotal();
  // }, []);

  const checkOut = () => {
    navigate('/checkout');
  };

  const continueShopping = () => {
    navigate('/');
  };


  return (

    <ThemeProvider theme={theme}>
      <Container>
        <Navbar />
        <Wrapper>
          <Title>YOUR CART</Title>
          <Top>
            <Button variant='outlined' onClick={continueShopping}>CONTINUE SHOPPING</Button>
            <TopTexts>
              <TopText>CART({cart.products.length})</TopText>
              <TopText>Your Wishlist (0)</TopText>
            </TopTexts>

            <ButtonGroup>
              <Button variant="contained" onClick={checkOut} sx={{marginRight:"20px"}}>CHECKOUT NOW</Button>
              <Button onClick={emptyCart}>Empty Cart</Button>
            </ButtonGroup>

            {/* moved to checkout */}
            {/* <StripeCheckout
                name="SPAREIT"
                // image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description={`Your total is Rs ${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button variant="contained">CHECKOUT NOW</Button>
              </StripeCheckout> */}



          </Top>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Box>
                  <Product>
                    <ProductDetail>
                      <Image src={product.img[0]} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        {/* <Button variant="text"><Remove onClick={() => removeFromCart(product)} /></Button> */}
                        <Button variant="text"><Remove onClick={() => decreaseItemQuantity(product)} /></Button>
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Button variant="text"><Add onClick={() => increaseItemQuantity(product)} /></Button>
                      </ProductAmountContainer>
                      <ProductPrice>Rs {product.price * product.quantity}</ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </Box>
              ))}

              {/* {cartItems.map((item) => (
                                <Box>
                                    <Product>
                                        <ProductDetail>
                                            <Image src={item.product.img[0]} />
                                            <Details>
                                                <ProductName>
                                                    <b>Product:</b> {item.product.title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>ID:</b> {item.product.id}
                                                </ProductId>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Button variant="text"><Remove /></Button>
                                                <ProductAmount>{item.quantity}</ProductAmount>
                                                <Button variant="text" ><Add /></Button>
                                            </ProductAmountContainer>
                                            <ProductPrice>{item.product.price}</ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                    <Hr />
                                </Box>
                            ))} */}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>Rs {shipping}</SummaryItemPrice>
              </SummaryItem>
              {/* <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>Rs -{discount}</SummaryItemPrice>
              </SummaryItem> */}
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>Rs {cart.total + shipping}</SummaryItemPrice>
              </SummaryItem>
              {/* <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>Rs {subtotal}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>Rs {shipping}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping Discount</SummaryItemText>
                                <SummaryItemPrice>Rs -{discount}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>Rs {total}</SummaryItemPrice>
                            </SummaryItem> */}
              {/* <StripeCheckout
                name="SPAREIT"
                // image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description={`Your total is Rs ${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout> */}
              <Button onClick={checkOut}>CHECKOUT NOW</Button>

            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Cart;