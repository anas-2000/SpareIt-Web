import React from 'react'
import { deals } from '../products';
import styled from 'styled-components'
import ItemCard from './ItemCard';
import { useState } from 'react';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const Container = styled.div`
    //display: flex;
    //padding: 20px;
    position: relative;
    justify-content: space-between;
    background-color: #f5f5f5;
    overflow: hidden;
    border: 2px solid red;
    border-radius: 5px;
    
`;
const Header = styled.div`
    border-bottom: 1px solid lightgray;
    height: 50px;
    /* margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px; */
    display: flex;
    margin-bottom: 1px;
    background-color: white;
    align-items: center;
    justify-content: space-evenly;
`;
const Title = styled.h3`
  /* font-weight: 700;
  text-align: left; */
`;


const Wrapper = styled.div`
  display: flex;
`;

const Arrow = styled.div`
width: 30px;
height: 30px;
background-color: white; 
border-radius: 50%;
display:flex;
align-items:center;
justify-content: center;
position: absolute;
outline: 1px solid #c4b3b343;
//top: 50px;
//bottom: 0;
margin: auto;
cursor: pointer;
//opacity: 0.5;
z-index: 2;
&:hover{
}
//using props
// If the value of the direction prop is "left" we will set the left value to be 10px;
// If the value of the direction prop is "right" we will set the right value to be 10px;
left: ${props => props.direction === "left" && "305px"};
right: ${props => props.direction === "right" && "10px"};
`;

const Deals = () => {

    const [startIndex, setStartIndex] = useState(0);
    const itemsperpage = 1;

    const handleClick = (direction) =>{

    }

  return (
    <Container>
        <Header>
        <Title> DEALS OF THE DAY </Title>
        <Arrow direction = "left" onClick={()=>handleClick("left")} /*passing props to our styled component. direction is a prop. we are passing the value "left to it" */ >  
          <ArrowBackIosNewIcon fontSize='small' sx={{color: "gray", backgroundColor: "white"}}/>
        </Arrow>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
          <ArrowForwardIosIcon fontSize='small' sx={{color: "gray", backgroundColor: "white"}} />
        </Arrow>
        </Header>
        <Wrapper>
            {/* <ProductSlider items={deals} /> */}
        {deals.slice(startIndex, startIndex+itemsperpage).map((deal) => (
            <ItemCard item = {deal} />  
        ))}
        </Wrapper>
    </Container>
  )
}

export default Deals