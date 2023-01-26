import React from 'react'
import styled from 'styled-components'
import CategorySlider from './CategorySlider';
import { categories } from '../data';


const Container = styled.div`
    //display: flex;
    padding: 20px;
    position: relative;
    justify-content: space-between;
    background-color: #f5f5f5;
    overflow: hidden;
    
`;
const Title = styled.h1`
  font-weight: 700;
  text-align: center;
  ::before,::after{
    content:" ";
    width:10px;
    height:10px;
    margin-bottom: 7px;
    border-radius:50%;
    background: red;
    display:inline-block;
  }
`;

const FeatureText = styled.h4`
    font-weight: 500;
    color: red;
    text-align: center;
`;


const Categories = () => {
  return (
    <Container>
      <FeatureText> TOP FEATURED COLLECTIONS </FeatureText>
      <Title> SHOP BY CATEGORIES </Title>
      <CategorySlider items={categories} />
    </Container>
  )
}

export default Categories