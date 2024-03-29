import React from 'react'
import styled from 'styled-components'
import { useState } from "react"
import CategoryItem from './CategoryItem';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { mobile } from "../responsive";


const Container = styled.div`
margin-bottom: 30px;
`;

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
z-index: 2;
&:hover{
    background-color: red;
    transform: scale(1.1);
    
}
left: ${props => props.direction === "left" && "10px"};
right: ${props => props.direction === "right" && "10px"};
`;
const Wrapper = styled.div`


display: flex;
transform: translateX(${props => props.startIndex * -50}vw);
${mobile({ padding: "0px"})}


`;


const CategorySlider = ({items}) => {
  const num = 5;
  const [startIndex, setStartIndex] = useState(0); 
  const rem = items.length % num;

  const [leftarrowColor, setLeftArrowColor] = useState("red");
    const [rightarrowColor, setRightArrowColor] = useState("red");

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
        setLeftArrowColor("red");
        }
        else{
        setRightArrowColor("red");
        }
        
    };

  const handleClick = (direction) => {
      if(direction === "left"){
          if(startIndex > 0){
            setStartIndex(startIndex - 1);
          }
          else{
            if(rem === 0){
              setStartIndex(items.length / num);
            }
            else{
              setStartIndex((items.length /num) + 1);
            }
          }
          
          
      }
      else{
        
        if(rem === 0){
          if(startIndex < (items.length/ num)){
            setStartIndex(startIndex + 1);
          }
          else{
            setStartIndex(0);
          }
        }
        else{
          if(startIndex < (items.length / num) + 1){
            setStartIndex(startIndex + 1);
          }
          else{
            setStartIndex(0);
          }
        }
      }
  }
  

 
  return (
    <Container>
      <Arrow direction = "left" onClick={()=>handleClick("left")}  onMouseEnter={()=> mouseEnter("left")}
        onMouseLeave ={()=>mouseLeave("left")}>
          <ArrowBackIosNewIcon sx={{color: leftarrowColor}}/>
      </Arrow>
     <Wrapper startIndex = {startIndex}>

        {items.map((item) => (
            <CategoryItem item = {item} />  
        ))}
     </Wrapper>
     <Arrow direction="right" onClick={()=>handleClick("right")}   onMouseEnter={()=> mouseEnter("right")}
        onMouseLeave ={()=>mouseLeave("right")}>
          <ArrowForwardIosIcon sx={{color: rightarrowColor}} />
      </Arrow>  
    </Container>
  )
}

export default CategorySlider