import React from 'react'
import styled from 'styled-components'
import { useState } from "react"
import { categories } from '../data';
import CategoryItem from './CategoryItem';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


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
`

const FeatureText = styled.h4`
    font-weight: 500;
    color: red;
    text-align: center;
`

const Arrow = styled.div`
width: 50px;
height: 50px;
background-color: white; 
border-radius: 50%;
display:flex;
align-items:center;
justify-content: center;
position: absolute;
top: 50px;
bottom: 0;
margin: auto;
cursor: pointer;
//opacity: 0.5;
z-index: 2;
&:hover{
    //background-color: red;
    zoom: 1.05;
}
//using props
// If the value of the direction prop is "left" we will set the left value to be 10px;
// If the value of the direction prop is "right" we will set the right value to be 10px;
left: ${props => props.direction === "left" && "10px"};
right: ${props => props.direction === "right" && "10px"};
`;
const Wrapper = styled.div`
//height: 100%;
//width: inherit;

display: flex;
transform: translateX(${props => props.startIndex * -20}vw);
//transition: all 1.5s ease;
//transform: translateX(${props => props.slideIndex * -100}vw);
`;


const Categories = () => {
  const num = 5; 
  const [startIndex, setStartIndex] = useState(0); 
  const [endIndex, setEndIndex] = useState(num); 
  const rem = categories.length % num;

  const handleClick = (direction) => {
      if(direction === "left"){
          if(startIndex > 0){
            setStartIndex(startIndex - 1);
          }
          else{
            if(rem === 0){
              setStartIndex(categories.length / num);
            }
            else{
              setStartIndex((categories.length /num) + 1);
            }
          }
          //setStartIndex(startIndex > 0 ?  startIndex - 1: categories.length - 1); //if slide index > 0 decrement slide index by 1
          // else go to the last slide       
      }
      else{
        //setStartIndex(startIndex < categories.length - 1 ? startIndex + 1: 0);
        if(rem === 0){
          if(startIndex < (categories.length/ num)){
            setStartIndex(startIndex + 1);
          }
          else{
            setStartIndex(0);
          }
        }
        else{
          if(startIndex < (categories.length / num) + 1){
            setStartIndex(startIndex + 1);
          }
          else{
            setStartIndex(0);
          }
        }
      }
  }
  

  /* const handleClick = (direction) => {
    if(direction === "left"){
      if(startIndex > 0){
        setEndIndex(startIndex);
        setStartIndex(startIndex - num);
      }
      else{
        if(rem === 0){
          setStartIndex(categories.length - num);
          setEndIndex(categories.length)
        }
        else{
          setStartIndex(categories.length - rem)
          setEndIndex(categories.length)
        }
        
      }
  
  }
  else{
      if(endIndex < categories.length){
        setStartIndex(endIndex);
        setEndIndex(endIndex + num);
      }
      else{
        setStartIndex(0);
        setEndIndex(num);
      }
  }
  } */
  return (
    <Container>
      <FeatureText> TOP FEATURED COLLECTIONS </FeatureText>
      <Title> SHOP BY CATEGORIES </Title>
      <Arrow direction = "left" onClick={()=>handleClick("left")} /*passing props to our styled component. direction is a prop. we are passing the value "left to it" */ >  
      <ArrowBackIosNewIcon sx={{color: "red", backgroundColor: "white"}}/>
      </Arrow>
     <Wrapper startIndex = {startIndex}>
        {/* {categories.slice(startIndex, endIndex).map((item) => (
          <CategoryItem item = {item} />  
        ))} */}

        {categories.map((item) => (
            <CategoryItem item = {item} />  
        ))}
     </Wrapper>
      <Arrow direction="right" onClick={()=>handleClick("right")}>
      <ArrowForwardIosIcon sx={{color: "red", backgroundColor: "white"}} />
      </Arrow>  
    </Container>
  )
}

export default Categories