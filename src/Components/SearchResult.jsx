import { Typography } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import { Highlight } from 'react-instantsearch-hooks-web';
import { Link } from 'react-router-dom';


const Container = styled.div`
    z-index: 4;
    flex: 1;
   
    
   
   
    width: 60vw; 
   
   
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: white;
   
`;

const Image = styled.img`

width: 75%;
   
   
   
`;

const ImageContainer = styled.div`
flex: 1;
height: 80%;
`

const Info = styled.div`
    flex: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const SearchResult = ({ product }) => {
    return (
        <Link to={`/products/${product.objectID}`} style={{ color: 'inherit', textDecoration: 'inherit' }} >
            <Container>
                <ImageContainer>
                    <Image src={JSON.parse(product.img)[0]} />
                </ImageContainer>
                <Info>
                    <Typography variant='h7'>{product.category}</Typography>
                    <Typography variant='h6'><Highlight attribute="title" hit={product} /></Typography>
                    <Typography variant='p'>Rs {product.price}</Typography>
                </Info>
            </Container>
        </Link>
    )
}

export default SearchResult