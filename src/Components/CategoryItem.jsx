import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { mobile } from "../responsive";

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
    //outline: 0.5px solid red;
    //background-color: #8C1C3A;
    //background-color: #6b1004;
    
`;
const Image = styled.img`
    width: 210px;
    height: 80%;
    object-fit: contain;
    ${mobile({ height: "20vh" })}
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
`;

const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/category?name=${item.title}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >
                <Image src={item.img} />
                <Info>
                    <Title>
                        {item.title}
                    </Title>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem