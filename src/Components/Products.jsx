import React from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import { products } from '../products'
import { Box, Stack } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { useState } from 'react'



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    //justify-content: space-evenly;
   // background-color: #f5f5f5;
`

const Products = () => {
  const items_per_page = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * items_per_page;
  const indexOfFirstItem = indexOfLastItem - items_per_page;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({top: 1800, behavior: 'smooth'})
  }

  return (
    <Box >
    <Container>
        {currentProducts.map((product) => (
            <ProductCard product = {product} key ={product.id} />
        ))}
    </Container>
    <Stack mt = "100px" alignItems="center">
          {products.length > items_per_page && (
            <Pagination
            shape='circular'
            defaultPage={1}
            count={Math.ceil(products.length/items_per_page)}
            page={currentPage}
            onChange={paginate}
            size="large"  
            />)}
      </Stack>
    </Box>
  )
}

export default Products