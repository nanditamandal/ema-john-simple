import React, {createContext, useState} from 'react';

import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import Inventory from './Component/Inventory/Inventory';
import NotMatch from './Component/NotMatch/NotMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import Review from './Component/Review/Review';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import User from './Component/User/User';
import Shipment from './Component/Shipment/Shipment';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const[logInUser, setLogInUser]= useState({
    isSignedIn: false,
    name: '', 
    email:'',
    photo:'',
    password:'',
    error:'',
    success: false
 
  });
  console.log(logInUser);


  return (
    <UserContext.Provider value={[logInUser, setLogInUser]} >
      
     <h4>email: {logInUser.email}</h4>
      <Header></Header>
 
      <Router>
        <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/inventory">
                <Inventory></Inventory>
            </Route>
           
            <Route path="/login">
                <Login></Login>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            
            <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
              </Route>
              <PrivateRoute exact path="/PrivateRoute">
                <Shipment></Shipment>
              </PrivateRoute>
              
            <Route path="*">
              <NotMatch></NotMatch>
            </Route>
        </Switch>
      </Router>
      
    
    </UserContext.Provider>
  );
}

export default App;
