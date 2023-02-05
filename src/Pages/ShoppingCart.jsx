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

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
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

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

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

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: black;
//   color: white;
//   font-weight: 600;
// `;


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
    const shipping = 500;
    const discount = 1000;

    useEffect(() => {
        function calculateTotal() {
            var sum = 0;
            cartItems.forEach(items => {
                sum = sum + items.quantity * items.product.price;
            });
            setSubTotal(sum);
            setTotal(subtotal + shipping - discount);
        }

        calculateTotal();
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Announcements />
                <Navbar />
                <Wrapper>
                    <Title>YOUR CART</Title>
                    <Top>
                        <Button variant='outlined'>CONTINUE SHOPPING</Button>
                        <TopTexts>
                            <TopText>CART({cartItems.length})</TopText>
                            <TopText>Your Wishlist (0)</TopText>
                        </TopTexts>
                        <Button variant="contained">CHECKOUT NOW</Button>
                    </Top>
                    <Bottom>
                        <Info>
                            {cartItems.map((item) => (
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
                            ))}
                        </Info>
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
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
                            </SummaryItem>
                            <Button>CHECKOUT NOW</Button>
                        </Summary>
                    </Bottom>
                </Wrapper>
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

export default Cart;