import { Facebook, Instagram, MailOutlineOutlined, Phone, Room, Twitter } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    margin-top: 20px;
    background-color: #f5f5f5;
    ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div` 
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const Center = styled.div` 
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`;
const Right = styled.div` 
    flex: 1;
    right: 20px;
    padding: 20px;
`;

const Logo = styled.h1`
    
`;
const Desc = styled.p`
margin: 20px 0px;
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;


const Title = styled.h3`
    margin-bottom: 30px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>SpareIT</Logo>
            <Desc>SpareIt aims to revolutionize the Pakistani spare parts industry and by automating the spare parts supply chain.
            </Desc>
            <SocialContainer>
                <SocialIcon color='#3B5999'>
                    <Facebook />
                </SocialIcon>
                <SocialIcon color='#E4405F'>
                    <Instagram />
                </SocialIcon>
                <SocialIcon color='#55ACEE'>
                    <Twitter    />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Terms and Conditions</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><Room  style={{marginRight: "10px"}} /> street 1 sector 2, Islamabad</ContactItem>
            <ContactItem><Phone style={{marginRight: "10px"}} /> +12 345 678910</ContactItem>
            <ContactItem><MailOutlineOutlined style={{marginRight: "10px"}} />email@email.com</ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
    </Container>
  )
}

export default Footer