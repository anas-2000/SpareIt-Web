import React from 'react'
import styled from 'styled-components'
import { products } from '../products';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 100;
    left: 0;
    z-index: 3;
    background-color: rgba(255, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
`;


const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px; 
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover ${Info} {
        opacity: 1;
    }
`;

// const Circle = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     background-color: white;
//     position: absolute;
// `;
const Image = styled.img`
    height: 75%;
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

const ProductCard = ({product}) => {
  return (
    <Container>
        {/* <Circle /> */}
        <Image src = {product.img[0]} />
        <Info>
            <Icon>
                <ShoppingCartOutlinedIcon />
            </Icon>
            <Icon>
                <SearchOutlinedIcon />
            </Icon>
            <Icon>
                <FavoriteBorderOutlinedIcon />
            </Icon>
        </Info>
    </Container>
  )
}

export default ProductCard