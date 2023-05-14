import React from 'react'

import styled from 'styled-components'
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Badge, List, Box, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

//import Logo from '../assets/images/logo.png';
import { mobile } from "../responsive";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { logOut } from '../Redux/userRedux';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../Redux/cartRedux';

//for searching
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web';

// css for algolia searchbox
import 'instantsearch.css/themes/satellite.css';
import SearchResult from './SearchResult';


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

const Article = styled.div`
z-index: 4;
/* height: 400px; */
margin-bottom: -10px;
`
const Image = styled.img`
    width: 80px;
    height: 90px;
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



const showHits = ({ hit }) => {
    return (
        <Box sx={{ display: 'flex', zIndex: '5', width: '100px', height: '80px' }}>
            <Box sx={{ flex: '1' }}>
                <img src={JSON.parse(hit.img)[0]} />
            </Box>
            <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="p">{hit.category}</Typography>
                <Typography variant='h3'><Highlight attribute="title" hit={hit} /></Typography>
                <Typography variant="p">Rs{hit.price}</Typography>
            </Box>
        </Box>
    )
}

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = () => {
        dispatch(logOut());
        dispatch(emptyCart());
        window.location.reload();
        // navigate('/');
    };

    const StyledSearchBox = styled(SearchBox)`
    .ais-SearchBox-input {
        border: 1px solid red !important;
    }
`;

    // for searching
    const algoliaClient = algoliasearch('UA0B0CAN82', 'a15be29c0fcc61f2dd0ff51dc5877c71');

    const searchClient = {
        ...algoliaClient,
        search(requests) {
            if (requests.every(({ params }) => !params.query)) {
                // Here we have to do something else
                return Promise.resolve({
                    results: requests.map(() => ({
                        hits: [],
                        nbHits: 0,
                        nbPages: 0,
                        page: 0,
                        processingTimeMS: 0,
                        hitsPerPage: 0,
                        exhaustiveNbHits: false,
                        query: '',
                        params: '',
                    })),
                });
            }

            return algoliaClient.search(requests);
        },
    };

    const indexName = 'products';

    function Hit({ hit }) {
        return (
            // <article>
            //     <img src={JSON.parse(hit.img)[0]} alt={hit.title} />
            //     <p>{hit.category}</p>
            //     <h1>
            //         <Highlight attribute="title" hit={hit} />
            //     </h1>
            //     <p>Rs{hit.price}</p>
            // </article>
            // <Article>
            <SearchResult product={hit} />
            // </Article>
        );
    }





    return (
        <ThemeProvider theme={theme}>
                <Container style={{ borderColor: red[800] }}>
            <InstantSearch searchClient={searchClient} indexName={indexName} insights={true}>
                    <Wrapper>
                        <Left>
                            <StyledSearchBox />
                            {/* <Hits hitComponent={Hit} /> */}


                            {/* <TextField id="SearchField" variant='outlined' size='small' placeholder='Search' InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon sx={{ color: "primary.main" }} />
                                </InputAdornment>
                            )
                        }}></TextField> */}
                        </Left>
                        <Center>
                            {/* <img src={Logo} alt="Logo" style={{ width: '100px', height: '60px/', margin: '0 20px' }} /> */}
                            <Logo>SPARE<span style={{ color: red[800] }}>IT</span></Logo>
                        </Center>
                        <Right>
                            <Link to="/signup" style={{ textDecorationLine: 'none' }}>
                                <MenuItem style={{ color: red[800] }}>REGISTER</MenuItem>
                            </Link>
                            <Link to="/login" style={{ textDecorationLine: 'none' }}>
                                <MenuItem style={{ color: red[800] }}>SIGNIN</MenuItem>
                            </Link>
                            <MenuItem>
                                <Button variant='text' endIcon={<LogoutIcon />} size="small" onClick={signOut} >signout</Button>
                            </MenuItem>
                            <Link to="/cart">
                                <MenuItem>
                                    <Badge badgeContent={quantity} color="primary">
                                        <ShoppingCartOutlinedIcon color='primary'></ShoppingCartOutlinedIcon>
                                    </Badge>
                                </MenuItem>
                            </Link>

                        </Right>
                    </Wrapper>
                <Box sx={{position: 'absolute', zIndex: '4'}}>
                    <Hits hitComponent={Hit} />
                </Box>
            </InstantSearch>
                </Container>
        </ThemeProvider>
    );
}

export default Navbar