import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './css/App.css';

import Home from './Pages/Home'
import Add from './Pages/Add'
import ListVisted from './Pages/List'
import ListUser from './Pages/ListUser'
import Profile from './Pages/Profile'

import Header from './Layouts/Header'
import Footer from './Layouts/Footer'

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/add" component={Add}/>
          <Route path="/list" component={ListVisted}/>
          <Route path="/lists/:userid" component={ListUser}/>
          <Route path="/profile" component={Profile}/>
        </Switch>
      <Footer />
  </BrowserRouter>
  );
}

export default App;
