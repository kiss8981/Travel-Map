import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './css/App.css';

import Home from './Pages/Home'
import Add from './Pages/Add'
import ListVisted from './Pages/List'

import Header from './Layouts/Header'
import Footer from './Layouts/Footer'

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/add" component={Add}/>
          <Route exact path="/list" component={ListVisted}/>
        </Switch>
      <Footer />
  </BrowserRouter>
  );
}

export default App;
