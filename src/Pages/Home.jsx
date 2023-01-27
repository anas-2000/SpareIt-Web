import React from 'react'
import Navbar from '../Components/Navbar'
import { Box } from '@mui/material'
import Announcements from '../Components/Announcements'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'
import Catalog from '../Components/Catalog'
import Products from '../Components/Products'


const Home = () => {
  return (
    <Box width = "400px" sx={{width: { xl: '1488px'}}} m ="auto">
        <Announcements/>
        <Navbar />
        <Slider />
        <Categories />
        <Catalog />
        <Products />
    </Box>  
    
  )
}

export default Home