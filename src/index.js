import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './HomePage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import AboutPage from './AboutPage';
import store from './redux/store';
import { Provider } from 'react-redux';

import './custom.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/cart" component={CartPage}/>
          <Route exact path="/product" component={ProductPage}/>
          <Route exact path="/checkout" component={CheckoutPage}/>
          <Route exact path="/about" component={AboutPage}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
