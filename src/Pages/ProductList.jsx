import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcements from '../Components/Announcements';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Products from '../Components/Products';
import { Options, FetchData } from '../Utils/FetchData';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';


const Container = styled.div``;

const Title = styled.h1`
  font-weight: 700;
  margin: 20px;
  text-align: center;
  ::before,::after{
    content:" ";
    width:10px;
    height:10px;
    margin-bottom: 7px;
    border-radius:50%;
    background: red;
    display:inline-block;
  }
`;


const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Filter = styled.div`
  flex:1;
  margin: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const FilterText = styled.h3`
  //font-size: 20px;
  //margin: 20px;
  flex:1;
  font-weight: 500;
  margin-right: 20px;
  margin-left: 20px;
`;

const Top = styled.div`
  align-items: center;
  padding: 20px;

`

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 20px;
//   flex: 1;
// `;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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



const ProductList = () => {

  const makes = ["Honda Civic", "Honda City", "Honda Vezel", "Toyota Corolla", "Toyota Yaris", "Toyota Aqua",
    "Toyota Prius", "Toyota Fortuner", "Suzuki Alto", "Suzuki Cultus", "Suzuki WagonR", "Suzuki Swift",
    "Daihatsu Cuore", "Daihatsu Move", "Daihatsu Mira", "Daihatsu Hijet"];

  const years = ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010",
    "2009", "2008", "2007", "2005", "2004", "2003", "2002", "2001", "2000"];

  // const [makes, setMake] = useState([]);
  // const [years, setYear] = useState([]);

  const [selectedMake, setSelectedMake] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function getMake() {

  //     //const yearData = await FetchData('https://car-data.p.rapidapi.com/cars/years', modelOptions);
  //     //const makeData = await FetchData('https://car-data.p.rapidapi.com/cars/makes', modelOptions);

  //     const makeData = await FetchData('https://car-api2.p.rapidapi.com/api/makes', Options);
  //     //setMake(makeData.data);
  //     setMake(makeData.data.map(({ id, name }) => name));
  //   };

  //   async function getYear() {
  //     const yearData = await FetchData('https://car-api2.p.rapidapi.com/api/years', Options);

  //     setYear(yearData);
  //   }
  //   if (makes.length === 0) {
  //     getMake();
  //   };
  //   if (years.length === 0) {
  //     getYear();
  //   }


  // }, []);



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMake(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleYearChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedYear(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const continueShopping = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}> 
    <Container>
      <Navbar />
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Top>
      {name !== "All" &&(<Button variant='contained'  onClick={continueShopping}><ArrowBackIosNewIcon /> Back to home</Button>)}
      </Top>
      <Title>{name === "All" ? " ALL PRODUCTS " : " " + name.toUpperCase() + " "}</Title>
      </Box>
      
      <FilterContainer>
        <FilterText>FIND PARTS FOR YOUR CAR</FilterText>
        <Filter>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label" color='error'>Make</InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={selectedMake}
              onChange={handleChange}
              input={<OutlinedInput color='error' label="Make" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              sx={{ color: "crimson" }}
            >
              {makes.map((make) => (
                <MenuItem key={make} value={make} sx={{ color: "crimson" }}>
                  <Checkbox color='error' sx={{ color: "crimson" }} checked={selectedMake.indexOf(make) > -1} />
                  <ListItemText sx={{ color: "crimson" }} primary={make} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label2" color='error'>Year</InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={selectedYear}
              onChange={handleYearChange}
              input={<OutlinedInput color='error' label="Year" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              sx={{ color: "crimson" }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year} sx={{ color: "crimson" }}>
                  <Checkbox color='error' sx={{ color: "crimson" }} checked={selectedYear.indexOf(year) > -1} />
                  <ListItemText sx={{ color: "crimson" }} primary={year} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl sx={{ m: 1, width: 200 }}><Button variant="contained" color='error' size='large'>Find</Button></FormControl> */}
        </Filter>
      </FilterContainer>
      <Products category={name} makes={selectedMake} years={selectedYear} />
      <Footer />
    </Container>
    </ThemeProvider>
  )
}

export default ProductList

// Keep objects that have specific attribute value in js object array?