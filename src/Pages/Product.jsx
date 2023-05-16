import React, { useEffect } from 'react'
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
// import { products } from '../products'
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom'
import { addProduct } from '../Redux/cartRedux'
import { useDispatch, useSelector } from "react-redux";
import { publicRequest, userRequest } from "../requestMethods";
import Comments from '../Components/Comments'
import { blue, red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography } from '@mui/material'

import RelatedProductCard from '../Components/RelatedProductCard'
// import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';



// for recommendations
import { useRelatedProducts } from '@algolia/recommend-react';
import { RelatedProducts } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
// import '@algolia/ui-components-horizontal-slider-theme';
import RelatedProduct from '../Components/RelatedProduct'

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
top: 45vh;
/* bottom: 0; */
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

const Top = styled.div`
  align-items: center;
  padding: 20px;
`




// for recommendations: related items
// commented out for testing
// const recommendClient = recommend('UA0B0CAN82', 'a15be29c0fcc61f2dd0ff51dc5877c71');
// const indexName = 'products';

function RelatedItem({ item }) {
  return (
    <RelatedProductCard product = {item} />
  );
}




const Product = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [leftarrowColor, setLeftArrowColor] = useState("red");
  const [rightarrowColor, setRightArrowColor] = useState("red");
  // const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // const [product, setProduct] = useState(products.find((product) => product.id == id));
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [userMessage, setUserMessage] = useState({});
  const [rating, setRating] = useState(0);
  const user = useSelector((state) => state.user.currentUser); // comment for testing
  const navigate = useNavigate();



  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        // getComments();
        setLoading(false);
      } catch { }
    };
    getProduct();
  }, [id]);

  const getComments = async () => {
    try {
      const res = await publicRequest.get(`/comments?product=${product._id}`);
      setComments(res.data);

    }
    catch (err) { }
  }

  useEffect(() => {
    getComments();
  })

  const addToCart = () => {
    // const cartproduct = {...product, quantity};

    dispatch(
      // addProduct({ ...product, quantity })
      addProduct({ ...product, 'quantity': quantity })
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

  const submitComment = async () => {
    if (!user) {
      alert('You must be logged in to submit a review!');
    }
    else {
      const review = {
        rating: parseInt(rating),
        comment: userMessage,
        product: id
      };
      const res = await userRequest.post('/comments', review);
      setComments(comments.concat(res.data));

    }

  };

  const continueShopping = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>
  }
  else {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Navbar />
          <Top>
          <Button variant='contained' onClick={continueShopping}><ArrowBackIosNewIcon /> CONTINUE SHOPPING</Button>
          </Top>
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
              <Comments comments={comments} setUserMessage={setUserMessage} setRating={setRating} />
              <Button onClick={submitComment} variant='contained' sx={{ mt: 3, ml: 2, mb: 2 }}>Submit </Button>
            </InfoContainer>
          </Wrapper>
          {/* commented out for testing */}
          <Box sx={{margin: '20px'}}>
            <RelatedProduct product={product} />
          </Box>
            
          <Footer />
        </Container>
      </ThemeProvider>
    )
  }
}

export default Product