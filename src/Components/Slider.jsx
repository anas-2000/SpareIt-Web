import styled from "styled-components"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import { useState } from "react"
import { SliderItems } from "../data"

const Container = styled.div`
width: 80%;
height:100vh;
display: flex;
position: relative;
//background-color: #D91438;
overflow: hidden;
margin-left: auto;
margin-right: auto;
`;

const Wrapper = styled.div`
height: 100%;
//width: inherit;
display: flex;
transition: all 1.5s ease;
transform: translateX(${props => props.slideIndex * -100}vw);
`;

const Arrow = styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7; 
border-radius: 50%;
display:flex;
align-items:center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
margin: auto;
cursor: pointer;
opacity: 0.5;
z-index: 2;
&:hover{
    background-color: white;
    zoom: 1.05;
}
//using props
// If the value of the direction prop is "left" we will set the left value to be 10px;
// If the value of the direction prop is "right" we will set the right value to be 10px;
left: ${props => props.direction === "left" && "10px"};
right: ${props => props.direction === "right" && "10px"};
`;


/* const Slide = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
`; */
const Slide = styled.div`
//width: inherit;
//width:100%;
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`;

/* const ImgContainer = styled.div`
height: 100%;
width: 100%;
flex:1;
`; */
const ImgContainer = styled.div`
height: 100%;
//width: inherit;
flex:1;
`;

/* const InfoContainer = styled.div`
flex: 1;
padding: 50px;
`; */
/* const Image = styled.img`
height: 80%;
`; */
const Image = styled.img`
height: 80%;
width: 78%;
`;

/* const Title = styled.h1`
`;
const Description = styled.p``;

const Button = styled.button``; */




const Slider = () => {
  
    const [slideIndex, setSlideIndex] = useState(0); 
    //function to implement arrow button functionality
    const handleClick = (direction) => {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ?  slideIndex - 1: SliderItems.length - 1); //if slide index > 0 decrement slide index by 1
            // else go to the last slide       
        }
        else{
            setSlideIndex(slideIndex < SliderItems.length - 1 ? slideIndex + 1: 0);
        }
    }
    return (
    <Container>
        <Arrow direction = "left" onClick={()=>handleClick("left")} /*passing props to our styled component. direction is a prop. we are passing the value "left to it" */ >  
            <ArrowLeftOutlinedIcon/>
        </Arrow>
       {/*  <Wrapper>
            <Slide>
                <ImgContainer>
                    <Image src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" />
                </ImgContainer>
            </Slide>
        </Wrapper> */}
        <Wrapper slideIndex = {slideIndex}>
            {SliderItems.map((item) =>(
          <Slide>
            <ImgContainer>
                  <Image src={item.img} />
              </ImgContainer>
          </Slide>
          ))}
          </Wrapper>
          <Arrow direction="right" onClick={()=>handleClick("right")}>
              <ArrowRightOutlinedIcon />
          </Arrow>  
    </Container>
  )
}

export default Slider