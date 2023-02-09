import React, { Component, useEffect } from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import { products } from '../products'
import { Box, Stack } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;  
    //justify-content: space-evenly;
   // background-color: #f5f5f5;
`

const Products = ({ category, make, year }) => {
  const items_per_page = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * items_per_page;
  const indexOfFirstItem = indexOfLastItem - items_per_page;
  //const [renderProducts, setRenderProducts] = useState(category === "All" ? products: products.filter(product => product.category === category));
  const renderProducts = category === "All" ? products : products.filter(product => product.category === category);
  const currentProducts = renderProducts.slice(indexOfFirstItem, indexOfLastItem);
  const [filteredProducts, setFilteredProducts] = useState([]);


  // useEffect(() => {
  //   if(make.length === 0){
  //     setFilteredProducts(renderProducts);
  //     console.log(1);
  //   }
  //   else{
  //     if(year.length === 0){
  //       var temp = renderProducts.filter(product => make.indexOf(product.vehicle) !== -1);
  //       setFilteredProducts(temp);
  //     }
  //     else{
  //       var temp = renderProducts.filter(product => make.indexOf(product.vehicle) !== -1 && year.indexOf(product.vehiclemodel) !== -1);
  //       setFilteredProducts(temp);
  //     }
  //   }
  // }, [make, year])


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

  const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ paddingBottom: "20px" }}>
        <Divider light />
        <Container>
          {currentProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Container>
        <Stack mt="50px" alignItems="center">
          {renderProducts.length > items_per_page && (
            <Pagination
              shape='circular'
              defaultPage={1}
              count={Math.ceil(renderProducts.length / items_per_page)}
              page={currentPage}
              onChange={paginate}
              size="large"
              color='primary'
            />)}
        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default Products