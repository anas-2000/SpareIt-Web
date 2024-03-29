import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import SignUp from "./Pages/SignUp";
import ShoppingCart from "./Pages/ShoppingCart"
import Checkout from "./Pages/Checkout";
//import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";



const App = () => {
   const user = useSelector((state) => state.user.currentUser);
   return (
      <BrowserRouter>
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products/category?" element={<ProductList />} />
            <Route path="/cart" element={user?<ShoppingCart />:<Navigate to="/login" />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/login" element={<LogIn />} /> */}
            <Route path="/login" element={user?<Navigate to="/" />:<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products/:id" element={<Product />} />

         </Routes>
      </BrowserRouter>
   );
};

export default App;