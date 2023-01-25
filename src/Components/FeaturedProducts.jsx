import React from 'react'
import styled from 'styled-components'
import { featuredProducts } from '../products'
import ItemCard from './ItemCard';
import { useState } from 'react';


const Container = styled.div`
    //display: flex;
    //padding: 20px;
    border: 1px solid lightgray;
    border-radius: 5px;
    position: relative;
    justify-content: space-between;
    background-color: #f5f5f5;
    overflow: hidden;
    
`;
const Header = styled.div`
    border-bottom: 1px solid lightgray;
    height: 50px;
    background-color: #fafafa;
    /* margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px; */
    align-items: center;
    margin-bottom: 1px;
    justify-content: space-evenly;
`;
const Title = styled.h3`
  //font-weight: 700;
  //text-align: left;
`;


const Wrapper = styled.div`
  display: flex;
`;

const FeaturedProducts = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsperpage = 1;
  return (
    <Container>
    <Header>
    <Title> FEATURED </Title>
    </Header>
    <Wrapper>
        {/* <ProductSlider items={deals} /> */}
    {featuredProducts.slice(startIndex, startIndex+itemsperpage).map((product) => (
        <ItemCard item = {product} />  
    ))}
    </Wrapper>
    
</Container>
  )
}

export default FeaturedProducts