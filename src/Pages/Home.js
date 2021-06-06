import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Map from '../utills/map';

class home extends Component {
  render() {
    return (
      <>
        <div>
            map
            <Map/>
        </div>
    </>
    );
  }
}

export default home;