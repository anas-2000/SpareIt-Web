import React from 'react'
import styled from 'styled-components'
import Stack from '@mui/material/Stack';
import Deals from './Deals';
import FeaturedProducts from './FeaturedProducts';
import RecommendedProducts from './RecommendedProducts';


const Container = styled.div`
    background-color: white;
    padding-top: 30px;
    margin: 80px;
`;

const Catalog = () => {
  return (
    <Container>
        <Stack direction={{xs:'column', md:'row'}} spacing={10}>
            <Deals />
            <FeaturedProducts />
            <RecommendedProducts />
        </Stack>
    </Container>
  )
}

export default Catalog