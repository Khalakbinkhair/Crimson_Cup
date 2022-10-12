import React, { useEffect,useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
// import TrackOrder from './Components/Body/trackOrder.jsx';
import { CartProvider } from 'react-use-cart';
// import Dashboard from './Components/Body/dashboard.jsx';
import Dashboard from './Components/Body/Dashboard.js';
import './index.css';

import { useHistory } from "react-router-dom"
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';


import Home  from './Components/Home/home';
import Cart from './Components/Body/Cart';


axios.defaults.baseURL="https://restaurantapi.fatmonk.studio/api/";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
  <React.StrictMode>
 

 <Router>
      <Routes>
      <Route  exact path="/:restaurantslug" element={<Home />} /> 
      <Route  exact path="/:restaurantslug/:table_no" element={<Home />} /> 

      <Route  exact path="/:restaurantslug/cart"    element={<Cart />} /> 
      <Route  exact path="/:restaurantslug/:table_no/cart"    element={<Cart />} /> 
      <Route  exact path="/:restaurantslug/orders"    element={<Dashboard />} /> 
      <Route  exact path="/:restaurantslug/:table_no/orders"    element={<Dashboard />} /> 
      
    </Routes>
    </Router>   
  </React.StrictMode>
  </CartProvider>
);


reportWebVitals();
