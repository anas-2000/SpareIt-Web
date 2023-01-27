import React from 'react'
import styled from 'styled-components'
import { products } from '../products';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Container = styled.div`
    flex: 1;
    margin: 5px;
`;

const Circle = styled.div`
    
`;
const Image = styled.img`
    
`;
const Info = styled.div`
    
`;
const Icon = styled.div`
`;

const ProductCard = ({product}) => {
  return (
    <Container>
        <Circle />
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