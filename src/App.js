import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './css/App.css';

import Home from './Pages/Home'

import Header from './Layouts/Header'
import Footer from './Layouts/Footer'

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Switch>
        <Route exact path="/" component={Home}/>
        </Switch>
      <Footer />
  </BrowserRouter>
  );
}

export default App;
