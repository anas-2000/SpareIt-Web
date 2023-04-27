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
   //const user = false; //to be deleted later. Just for demo
   const user = useSelector((state) => state.user.currentUser);
   return (
      <BrowserRouter>
         <Routes>
            {/* <Route exact path="/">
               <Home />
            </Route> */}
            <Route exact path="/" element={<Home />} />
            <Route path="/products/category?" element={<ProductList />} />
            <Route path="/cart" element={user?<ShoppingCart />:<Navigate to="/login" />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/login" element={<LogIn />} /> */}
            <Route path="/login" element={user?<Navigate to="/" />:<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products/:id" element={<Product />} />
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