import styled from "styled-components"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react"
import { SliderItems } from "../data"
import { mobile } from "../responsive";

const Container = styled.div`
width: 100%;
height:90vh;
display: flex;
position: relative;
overflow: hidden;
${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
height: 100%;
display: flex;
transition: all 1.5s ease;
transform: translateX(${props => props.slideIndex * -100}vw);
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
top: 0;
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



const Slide = styled.div`


width: 100vw;
height: 100vh;
display: flex;
align-items: center;

`;


const ImgContainer = styled.div`
height: 100%;


flex:1;
`;



const Image = styled.img`
height: 90%;
width: 100%;


`;






const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [leftarrowColor, setLeftArrowColor] = useState("red");
    const [rightarrowColor, setRightArrowColor] = useState("red");

    const mouseEnter = (direction) => {
        if (direction === "left") {
            setLeftArrowColor("white");
        }
        else {
            setRightArrowColor("white");
        }

    };

    const mouseLeave = (direction) => {
        if (direction === "left") {
            setLeftArrowColor("red");
        }
        else {
            setRightArrowColor("red");
        }

    };



    
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : SliderItems.length - 1); 
            
        }
        else {
            setSlideIndex(slideIndex < SliderItems.length - 1 ? slideIndex + 1 : 0);
        }
    }
    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")} onMouseEnter={() => mouseEnter("left")}
                onMouseLeave={() => mouseLeave("left")}>
                <ArrowBackIosNewIcon sx={{ color: leftarrowColor }} />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {SliderItems.map((item) => (
                    <Slide>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")} onMouseEnter={() => mouseEnter("right")}
                onMouseLeave={() => mouseLeave("right")}>
                <ArrowForwardIosIcon sx={{ color: rightarrowColor }} />
            </Arrow>
        </Container>
    )
}

export default Slider