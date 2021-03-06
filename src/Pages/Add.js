import React, { Component } from 'react';
import AddReport from '../compoents/AddReport';
import { Container } from 'react-bootstrap';

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
    ins.setAttribute('data-ad-unit', 'DAN-1caEY9DWJE7yf0eQ');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }
  render() {
    return (
      <>
        <Container>
            <h1 className="title mt-4 mb-4">여행기록 만들기</h1>
            <AddReport/>
            <div className="adfit" style={{width: "100%",  margin: "2% auto"}}/>
        </Container>

    </>
    );
  }
}

export default home;