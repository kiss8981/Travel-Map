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
import Admin from './Pages/Admin'

import Header from './Layouts/Header'
import Footer from './Layouts/Footer'

import ChannelService from './compoents/Channel'

function App() {
  const userId = () => {
    if (window.localStorage.getItem("authenticated") === null || window.localStorage.getItem("authenticated") === "" || window.localStorage.getItem("authenticated") === undefined) {
      return 'undefined'
    } else {
      return JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id
    }
  }

  const userName = () => {
    if (window.localStorage.getItem("authenticated") === null || window.localStorage.getItem("authenticated") === "" || window.localStorage.getItem("authenticated") === undefined) {
      return ("미로그인 유저")
    } else {
      return JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_name
    }
  }

  const userEmail = () => {
    if (window.localStorage.getItem("authenticated") === null || window.localStorage.getItem("authenticated") === "" || window.localStorage.getItem("authenticated") === undefined) {
      return ("미로그인 유저")
    } else {
      return JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_email
    }
  }
  // Boot Channel as a registered user
  ChannelService.boot({
    "pluginKey": "e8acd63a-d11b-4a90-b5e1-b623231b7ba1", //please fill with your plugin key
    "memberId": userId(),
    "profile": {
      "name": userName(),
      "email": userEmail(), 
      "id": userId()
    }
  });
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
          <Route path="/admin" component={Admin}/>
          <Route component={NotFound} />
        </Switch>
      <Footer />
  </BrowserRouter>
  );
}

export default App;
