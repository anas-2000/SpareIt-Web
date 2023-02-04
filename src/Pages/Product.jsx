import React from 'react'
import styled from 'styled-components'
import Announcements from '../Components/Announcements'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Container = styled.div``;

const Product = () => {
  return (
    <Container>
        <Announcements />
        <Navbar />
        <Wrapper>
            <ImgContainer>
            <Image src = 'https://cache2.pakwheels.com/ad_pictures/5598/nexen-tire-roadian-hp-285-60r18-55986890.jpg' />
            </ImgContainer>
            <InfoContainer>
                <Title>
                    <Desc></Desc>
                </Title>
            </InfoContainer>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Product