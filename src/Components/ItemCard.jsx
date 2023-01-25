import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    //flex:1; 
    //margin: 20px;
    /* margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 0px; */
    height: 70vh;
    position: relative;
    background-color: white;
    outline: 1px solid #fff7f7;
`;

const Image = styled.img`
  height: 80%;
  width: 90%;
  object-fit: contain;
`;

const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 10px;
`;

const Title = styled.h3`
    //font-weight: 500;
    flex: 1;
`;

const Price = styled.h4`
font-weight: 500;
flex: 1;
`;


const ItemCard = ({item}) => {
  return (
    <Container>
      <Image src = {item.img[0]} />
      <Info>
        <Title>{item.title}</Title>
        <Price>Rs {item.price}</Price>
      </Info>
    </Container>
  )
}

export default ItemCard