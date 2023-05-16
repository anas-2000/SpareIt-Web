import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { Rating } from '@mui/material';

const Container = styled.div`
    height: 90vh;
    position: relative;
    background-color: white;
    outline: 1px solid #fff7f7;
`;

const Image = styled.img`
  height: 70%;
  width: 90%;
  display: block;
  margin-right: auto;
  margin-left: auto;
  object-fit: contain;
`;

const Info = styled.div`
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    margin-left: 10px;
`;

const Title = styled.h4`
    //font-weight: 500;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;
`;

const Price = styled.h4`
  font-weight: 500;
  flex: 1;
  position: relative;
`;

const RatingDiv = styled.div`
display: flex;
  justify-content: center;
`;


const ItemCard = ({ item }) => {

  return (
    <Link to={`/products/${item.id}`} style={{ textDecorationLine: 'none', color: 'inherit' }}>

      <Container>
        <Image src={item.img[0]} />
        <Info>
          <Title>{item.title}</Title>
          <RatingDiv>
            <Rating name="read-only" value={item.rating} readOnly />
          </RatingDiv>
          <Price>Rs {item.price}</Price>
        </Info>
      </Container>
    </Link>
  )
}

export default ItemCard