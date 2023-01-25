import React from 'react'
import Navbar from '../Components/Navbar'
import { Box } from '@mui/material'
import Announcements from '../Components/Announcements'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'

import { categories } from '../data'
import ProductSlider from '../Components/ProductSlider'

const Home = () => {
  return (
    <Box width = "400px" sx={{width: { xl: '1488px'}}} m ="auto">
        <Announcements/>
        <Navbar />
        <Slider />
        <Categories items={categories} />
    </Box>  
    
  )
}

export default Home