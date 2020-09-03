import React from 'react';

import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import Inventory from './Component/Inventory/Inventory';
import NotMatch from './Component/NotMatch/NotMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 
import Review from './Component/Review/Review';
import ProductDetails from './Component/ProductDetails/ProductDetails';

function App() {
  return (
    <div >
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
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            
            <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
              </Route>
            <Route path="*">
              <NotMatch></NotMatch>
            </Route>
        </Switch>
      </Router>
      
    
    </div>
  );
}

export default App;
