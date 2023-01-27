import React from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import { products } from '../products'


const Container = styled.div`
    padding: 20px;
    display: flex;
`

const Products = () => {
  return (
    <Container>
        {products.map((product) => (
            <ProductCard product = {product} key ={product.id} />
        ))}
    </Container>
  )
}

export default Products