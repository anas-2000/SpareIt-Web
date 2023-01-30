import React, { Children } from 'react'
import { deals } from '../products';
import styled from 'styled-components'
import ItemCard from './ItemCard';
import { useState } from 'react';
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
    display: flex;
    margin-bottom: 1px;
    background-color: #fafafa;
    align-items: center;
    justify-content: space-evenly;
`;
const Title = styled.h3`
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
`;

const Deals = () => {

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

      if(startIndex === deals.length - 1){
        setStartIndex(0);
      }
      else{
        setStartIndex(startIndex + itemsperpage);
      }

    }

  return (
    <Container>
        <Header>
        <Title> DEALS OF THE DAY </Title>
        <Arrow direction = "left" onClick={()=>handleClick("left")}  onMouseEnter={()=> mouseEnter("left")}
         onMouseLeave ={()=>mouseLeave("left")}>  
          <ArrowBackIosNewIcon fontSize='small' sx={{color: leftarrowColor}}/>
        </Arrow>
        <Arrow direction="right" onClick={()=>handleClick("right")}   onMouseEnter={()=> mouseEnter("right")}
         onMouseLeave ={()=>mouseLeave("right")}>
          <ArrowForwardIosIcon fontSize='small' sx={{color: rightarrowColor}} />
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