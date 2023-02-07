import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import SignUp from "./Pages/SignUp";
import ShoppingCart from "./Pages/ShoppingCart"
import Checkout from "./Pages/Checkout";
//import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



const App = () => {
   const user = false; //to be deleted later. Just for demo
   
   return (
      <BrowserRouter>
         <Routes>
            {/* <Route exact path="/">
               <Home />
            </Route> */}
            <Route exact path="/" element={<Home />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/products/:category">
               <ProductList />
            </Route>
            <Route path="/product/:id">
               <Product />
            </Route>
            <Route path="/cart">
               <ShoppingCart />
            </Route>
            <Route path="checkout">
               <Checkout />
            </Route>
            <Route path="/login">{user ? <Navigate to="/" /> : <LogIn />}</Route>
            <Route path="/register">
               {user ? <Navigate to="/" /> : <SignUp />}
            </Route> */}
         </Routes>
      </BrowserRouter>
   );
   // return <Home />;
   //return <Product />
   //return <SignUp />
   //return <LogIn />
   //return <ShoppingCart />
   //return <Checkout />
};

export default App;