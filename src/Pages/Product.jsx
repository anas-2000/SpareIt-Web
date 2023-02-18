import React from 'react'
import styled from 'styled-components'
import Announcements from '../Components/Announcements'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react"
import { mobile } from "../responsive"
import { products } from '../products'
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom'
import { addProduct } from '../Redux/cartRedux'
import { useDispatch } from "react-redux";


const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  position: relative;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const Arrow = styled.div`
width: 50px;
height: 50px;
background-color: white; 
border-radius: 50%;
display:flex;
align-items:center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
margin: auto;
cursor: pointer;
//opacity: 0.5;
z-index: 2;
&:hover{
    //background-color: white;
    background-color: red;
    transform: scale(1.1);
}
//using props
// If the value of the direction prop is "left" we will set the left value to be 10px;
// If the value of the direction prop is "right" we will set the right value to be 10px;
left: ${props => props.direction === "left" && "10px"};
right: ${props => props.direction === "right" && "10px"};
`;

const ImgContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
  `;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
  
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const StyledButton = styled.button`
  padding: 15px;
  border: 2px solid red;
  background-color: white;
  color: red;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f5caca;
  }
`;

const Quantity = styled.div`
`;

const Product = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [leftarrowColor, setLeftArrowColor] = useState("red");
  const [rightarrowColor, setRightArrowColor] = useState("red");
  // const [amount, setAmount] = useState(1);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState(products.find((product) => product.id == id));
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();


  const addToCart = () => {
    dispatch(
      addProduct({ ...product, quantity })
    );
  }

  const handleClick = (direction) => {
    if (direction === "left") {
      setImageIndex(imageIndex > 0 ? imageIndex - 1 : product.img.length - 1); //if slide index > 0 decrement slide index by 1
      // else go to the last slide       
    }
    else {
      setImageIndex(imageIndex < product.img.length - 1 ? imageIndex + 1 : 0);
    }
  }

  const mouseEnter = (direction) => {
    if (direction === "left") {
      setLeftArrowColor("white");
    }
    else {
      setRightArrowColor("white");
    }

  };

  const mouseLeave = (direction) => {
    if (direction === "left") {
      setLeftArrowColor("red");
    }
    else {
      setRightArrowColor("red");
    }

  };

const handleQuantity = (type) => {
  if (type === "dec") {
    quantity > 1 && setQuantity(quantity - 1);
  } else {
    setQuantity(quantity + 1);
  }
};



  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer >
          <Arrow direction="left" onClick={() => handleClick("left")} onMouseEnter={() => mouseEnter("left")}
            onMouseLeave={() => mouseLeave("left")}>
            <ArrowBackIosNewIcon sx={{ color: leftarrowColor }} />
          </Arrow>
          {/* {products[8].img.map((image) => (
                <Image src = {image} />
            ))} */}

          <Image src={product.img[imageIndex]} />

          <Arrow direction="right" onClick={() => handleClick("right")} onMouseEnter={() => mouseEnter("right")}
            onMouseLeave={() => mouseLeave("right")}>
            <ArrowForwardIosIcon sx={{ color: rightarrowColor }} />
          </Arrow>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}
          </Desc>
          <Price>Rs {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Button variant="text" onClick={() => handleQuantity("dec")} color='error'><RemoveIcon sx={{ color: "red" }} /></Button>
              <Amount>{quantity}</Amount>
              <Button variant="text" onClick={() => handleQuantity("inc")} color='error'><AddIcon sx={{ color: "red" }} /></Button>
            </AmountContainer>
            <StyledButton onClick={() => addToCart()}>ADD TO CART</StyledButton>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Product