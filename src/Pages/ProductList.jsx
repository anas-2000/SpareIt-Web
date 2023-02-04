import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcements from '../Components/Announcements';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Products from '../Components/Products';
import { modelOptions , Options ,FetchData } from '../Utils/FetchData';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
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

const Option = styled.option``;


const ProductList = () => {

  const [makes, setMake] = useState([]);
  const [years, setYear] = useState([]);

  const [selectedMake, setSelectedMake] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);

  useEffect(() => {
    async function getMake (){
      
      //const yearData = await FetchData('https://car-data.p.rapidapi.com/cars/years', modelOptions);
      //const makeData = await FetchData('https://car-data.p.rapidapi.com/cars/makes', modelOptions);
      
      const makeData = await FetchData('https://car-api2.p.rapidapi.com/api/makes', Options);
      //setMake(makeData.data);
      setMake(makeData.data.map(({id,name}) => name));
    };

    async function getYear(){
      const yearData = await FetchData('https://car-api2.p.rapidapi.com/api/years', Options);
      
      setYear(yearData);
    }
    if(makes.length === 0){
      getMake();
    };
    if(years.length === 0){
      getYear();
    }


  }, []);

  

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

  return (
    <Container>
        <Announcements />
        <Navbar />
        <Title>ALL PRODUCTS</Title>
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
          sx={{color: "crimson"}}
        >
          {makes.map((make) => (
            <MenuItem key={make} value={make} sx={{color: "crimson"}}>
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
          sx={{color: "crimson"}}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year} sx={{color: "crimson"}}>
              <Checkbox color='error' sx={{ color: "crimson" }} checked={selectedYear.indexOf(year) > -1} />
              <ListItemText sx={{ color: "crimson" }} primary={year} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}><Button variant="contained" color='error' size='large'>Find</Button></FormControl>
        
        </Filter>

            {/* <Filter>
              <Select>
                <Option disabled selected>
                  Year
                </Option>
                {years.length > 0 && (years.map((year, index) => (
                  <Option key={index}>
                    {year}
                  </Option>
                )))}
              </Select>
              <Select>
                <Option disabled selected>
                  Make
                </Option>
                {makes.length > 0 && (makes.map((make) => (
                  <Option key={make.id} >
                    {make.name}
                  </Option>
                )))}
              </Select>
            </Filter> */}
        </FilterContainer>
        <Products />
        <Footer />
    </Container>
  )
}

export default ProductList