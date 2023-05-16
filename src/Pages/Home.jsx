import React from 'react'
import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'
import Catalog from '../Components/Catalog'
import Products from '../Components/Products'
import Footer from '../Components/Footer'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Catalog />
      <Products category={"All"} make={[]} year={[]} />
      <Footer />
    </div>

  )
}

export default Home