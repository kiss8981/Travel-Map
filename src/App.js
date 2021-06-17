import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './css/App.css';

import Home from './Pages/Home'
import Add from './Pages/Add'
import ListVisted from './Pages/List'
import ListUser from './Pages/ListUser'
import Profile from './Pages/Profile'
import ImageDes from './Pages/imageDes'
import UserMap from './Pages/UserMap'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'

import Header from './Layouts/Header'
import Footer from './Layouts/Footer'

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/add" component={Add}/>
          <Route path="/list" component={ListVisted}/>
          <Route path="/lists/:userid" component={ListUser}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/map/:userid" component={UserMap}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/image/:imageid" component={ImageDes}/>
          <Route path="/login" component={Login}/>
          <Route component={NotFound} />
        </Switch>
      <Footer />
  </BrowserRouter>
  );
}

export default App;
