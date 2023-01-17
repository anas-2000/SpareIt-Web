import React from 'react'
import Navbar from '../Components/Navbar'
import { Box } from '@mui/material'
import Announcements from '../Components/Announcements'
import Slider from '../Components/Slider'

const Home = () => {
  return (
    <Box width = "400px" sx={{width: { xl: '1488px'}}} m ="auto">
        <Announcements/>
        <Navbar />
        <Slider />
    </Box>
  )
}

export default Home