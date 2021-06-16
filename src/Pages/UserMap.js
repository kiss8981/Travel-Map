import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import UserMap from '../utills/userMap';

class home extends Component {
  componentDidMount() {
    let ins = document.createElement('ins');
    let scr = document.createElement('script');
  
    ins.className = 'kakao_ad_area';
    ins.style = "display:none;";
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute('data-ad-width', '320');
    ins.setAttribute('data-ad-height', '100');
    ins.setAttribute('data-ad-unit', 'DAN-0LMfMjezazMcpdX1');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }

  render() {
    const { params } = this.props.match;
    return (
      <>
            <UserMap userid={params.userid}/>
            <Container>
            <div className="adfit mt-2" style={{width: "100%", margin: "auto"}}/>
            </Container>
      </>
    );
  }
}

export default home;