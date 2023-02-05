import React from 'react'
import styled from 'styled-components'
import ItemCard from './ItemCard';
import { recommendedProducts } from '../products';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { mobile } from "../responsive";



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
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    justify-content: space-evenly;
    ${mobile({
    padding: "10px",
    justifyContent: "flex-start",
    alignItems:"center",
    flexDirection:"column"
    })}
`;
const Title = styled.h3`
  ${mobile({
  flexDirection: "column",
})}
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
margin: auto;
cursor: pointer;
z-index: 2;
&:hover{
  background-color: red;
}
//left: ${props => props.direction === "left" && "305px"};
right: ${props => props.direction === "right" && "10px"};
right: ${props => props.direction === "left" && "50px"};

${mobile({
  position:"absolute  ",
  right: props => props.direction === "right" && "10px",
  right: props => props.direction === "left" && "50px",
  top:"35px"
})}
`;


const RecommendedProducts = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsperpage = 1;
  const [leftarrowColor, setLeftArrowColor] = useState("gray");
  const [rightarrowColor, setRightArrowColor] = useState("gray");

  const mouseEnter = (direction) => {
    if(direction==="left"){
      setLeftArrowColor("white");
    }
    else{
      setRightArrowColor("white");
    }
    
  };
  
  const mouseLeave = (direction) => {
    if(direction === "left"){
      setLeftArrowColor("gray");
    }
    else{
      setRightArrowColor("gray");
    }
    
  };

  const handleClick = (direction) =>{

    if(startIndex === recommendedProducts.length - 1){
      setStartIndex(0);
    }
    else{
      setStartIndex(startIndex + itemsperpage);
    }

  };
  return (
    <Container>
    <Header>
    <Title> JUST FOR YOU </Title>
    <Arrow direction = "left" onClick={()=>handleClick("left")}  onMouseEnter={()=> mouseEnter("left")}
      onMouseLeave ={()=>mouseLeave("left")} /*passing props to our styled component. direction is a prop. we are passing the value "left to it" */ >  
      <ArrowBackIosNewIcon fontSize='small' sx={{color: leftarrowColor}}/>
    </Arrow>
    <Arrow direction="right" onClick={()=>handleClick("right")}   onMouseEnter={()=> mouseEnter("right")}
      onMouseLeave ={()=>mouseLeave("right")}>
      <ArrowForwardIosIcon fontSize='small' sx={{color: rightarrowColor}} />
    </Arrow>
    </Header>
    <Wrapper>
        {/* <ProductSlider items={deals} /> */}
    {recommendedProducts.slice(startIndex, startIndex+itemsperpage).map((product) => (
        <ItemCard item = {product} />  
    ))}
    </Wrapper>
</Container>
  )
}

export default RecommendedProducts