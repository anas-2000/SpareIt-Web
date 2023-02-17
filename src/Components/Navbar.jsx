import React from 'react'

import styled from 'styled-components'
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Badge } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

//import Logo from '../assets/images/logo.png';
import { mobile } from "../responsive";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
height: 60px;
border-bottom: 5px solid;

${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content: space-between;
align-items: center;
${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
//min-width: 33.3333%; // try this if navbar not proper on smaller screens
`
const Center = styled.div`
flex:1;
align-items: center;
justify-content: center;
//min-width: 33.3333%;
`;

const Logo = styled.h2`
  font-weight: 600;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
//min-width: 33.3333%;
`
const MenuItem = styled.div`
font-size: 14px;
cursor:pointer;
margin-left: 25px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const theme = createTheme({
    palette: {
        primary: {
            main: red[800],
        },
        secondary: {
            main: blue[500],
        }
    },
});

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    return (
        <ThemeProvider theme={theme}>
            <Container style={{borderColor: red[800]}}>
                <Wrapper>
                    <Left>
                        <TextField id="SearchField" variant='outlined'  size='small' placeholder='Search' InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon sx={{ color:"primary.main" }} />
                                </InputAdornment>
                            )
                        }}></TextField>
                    </Left>
                    <Center>
                        {/* <img src={Logo} alt="Logo" style={{ width: '100px', height: '60px/', margin: '0 20px' }} /> */}
                        <Logo>SPARE<span style={{color: red[800]}}>IT</span></Logo>
                    </Center>
                    <Right>
                        <MenuItem style={{color: red[800]}}>Register</MenuItem>
                        <MenuItem style={{color: red[800]}}>SignIn</MenuItem>
                        <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon color='primary'></ShoppingCartOutlinedIcon>
                            </Badge>
                        </MenuItem>
                        </Link>
                    </Right>
                </Wrapper>
            </Container>
        </ThemeProvider>
    );
}

export default Navbar