import React from 'react'

import styled from 'styled-components'
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Badge } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import Logo from '../assets/images/logo.png';
import { red } from '@mui/material/colors';
import { mobile } from "../responsive";
//const Container = styled.div`height: 60px; background-color: white;`

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'


const Container = styled.div`
height: 60px;
${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content: space-between;
align-items: center;
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
`
const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
//min-width: 33.3333%;
`
const MenuItem = styled.div`
font-size: 14px;
cursor:pointer;
margin-left: 25px;
`


const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                  <TextField id="SearchField" variant='outlined' color='warning' size='small' placeholder='Search' InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                              <SearchIcon sx={{ color: red[500] }} />
                          </InputAdornment>
                      )
                  }}></TextField>
            </Left>
            <Center>
            <img src = {Logo} alt = "Logo" style = {{width: '100px', height: '60px/', margin: '0 20px'}} />
            </Center>
            <Right>
                <MenuItem>Register</MenuItem>
                <MenuItem>SignIn</MenuItem>
                <MenuItem>
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                    </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>

    //  <Stack direction="row" justify-content="space-around" 
    // sx={{gap: {sm: '122px', xs: '40px'}, mt: {sm : '32px', xs: '20px'}, justifyContent: 'center'}} px="20px">
    //     <TextField id="SearchField" variant='outlined' color='warning' size='small' placeholder='Search' InputProps={{
    //         endAdornment: (
    //             <InputAdornment position="end">
    //                 <SearchIcon color='warning'/>
    //             </InputAdornment>
    //         )
    //     }}></TextField>
    //     <Typography variant = "h4" fontWeight="bold" color="#d91438">Spare-IT</Typography>
    //     <Stack direction="row" alignItems="center" justifyContent="flex-end">
    //         <MenuItem>Register</MenuItem>
    //         <MenuItem>SignIn</MenuItem>
    //         <MenuItem>
    //         <Badge badgeContent={4} color="primary">
    //             <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
    //         </Badge>
    //         </MenuItem>
    //     </Stack>
        
    // </Stack> 
  )
}

export default Navbar