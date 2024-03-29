import React from 'react'
import styled from 'styled-components'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';



const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(255, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;


const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 24%;
    max-width: 24%;
    height: 350px; 
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
    flex-direction: column;
    outline: 1px solid #c4b3b343;
    &:hover ${Info} {
        opacity: 1;
    }
`;
const Image = styled.img`
    height: 75%;
    width: 90%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: red;
        transform: scale(1.1);
    }
`;

const CardFooter = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid #c4b3b343;
`

const Title = styled.h4`  
    padding-top: 20px;
    font-weight: 500;
`;

const RatingDiv = styled.div`
display: flex;
  justify-content: center;
`;

const Price = styled.h4`
  font-weight: 500;
  flex: 1;
  text-align: center;
`;

const ProductCard = ({ product }) => {

    return (
        <Container>
            <Image src={product.img[0]} />
            <Info>
                <Icon>
                    <ShoppingCartOutlinedIcon />
                </Icon>
                <Icon>
                    <Link to={`/products/${product._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }} >
                        <SearchOutlinedIcon />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlinedIcon />
                </Icon>
            </Info>
            <CardFooter>
                <Title> {product.title}</Title>
                <RatingDiv>
                    <Rating name="read-only" value={product.rating} readOnly />
                </RatingDiv>
                <Price>Rs {product.price}</Price>
            </CardFooter>
        </Container>
    )
}

export default ProductCard