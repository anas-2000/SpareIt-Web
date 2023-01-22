import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    flex:1; 
    margin: 20px;
    height: 30vh;
    position: relative;
    &:hover{
        transition: all 0.75s ease;
        transform: scale(1.2, 1.2);
        //zoom: 1.1;
    }
    background-color: white;
    outline: 1px solid #fff7f7;
    //background-color: #8C1C3A;
    //background-color: #6b1004;
    
`;
const Image = styled.img`
    width: 210px;
    height: 80%;
    object-fit: contain;
    //object-fit: cover;
    //height: 300px;
    //background-color: #8C1C3A;
    //background-color: #6b1004;
   //background-color: #1C2026;
   //background-color: darkred;
   //background-color: #40140A;
    //border-radius: 50%;
`;
const Info = styled.div`
/*     position: absolute;
    top: 0;
    left: 0; */
/*     width: 100%;
    height: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Title = styled.h3`
    font-family: 'Oswald', sans-serif;
    font-weight: 500;
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Image src={item.img} />
        <Info>
            <Title>
                {item.title}
            </Title>
        </Info>
    </Container>
  )
}

export default CategoryItem