import React, { useEffect } from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import { Box, Stack } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import axios from "axios";



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;  
`

const Products = ({ category, makes, years }) => {
  const items_per_page = 20;//
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * items_per_page;
  const indexOfFirstItem = indexOfLastItem - items_per_page;
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category === "All" ?
            "http://localhost:3000/api/products" :
            `http://localhost:3000/api/products?category=${category.replace(/&/g, '%26')}`

        );
        setProducts(res.data);
        setFetching(false);
      } catch (err) { }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    if (category !== "All") {
      if (makes.length === 0) {
        setFilteredProducts(products);
      }
      else {
        if (years.length === 0) {
          const filteredData = products.filter(item =>
            item.vehicle.some(make => makes.includes(make)) || item.vehicle.length === 0
          );
          setFilteredProducts(filteredData);
        }
        else {
          const filteredData = products.filter(item =>
            item.vehicle.some(make => makes.includes(make)) &&
            (item.vehiclemodel.some(year => years.includes(year)) || item.vehiclemodel.length === 0)
          );
          setFilteredProducts(filteredData);
        }
      }

    }
    else{
      setFilteredProducts(products);
    }
  }, [products, category, makes, years]);


  useEffect(() => {
    setCurrentProducts(filteredProducts.slice(indexOfFirstItem, indexOfLastItem));

  }, [products, filteredProducts, category, currentPage]);


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

  if (fetching) {
    return <div>Loading...</div>
  }
  else {
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
            {filteredProducts.length > items_per_page && (
              <Pagination
                shape='circular'
                defaultPage={1}
                count={Math.ceil(products.length / items_per_page)}
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
}

export default Products