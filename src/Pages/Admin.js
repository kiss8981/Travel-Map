import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import AdminCheck from '../compoents/AdminCheck'
import LoginRes from '../compoents/LoginRes'

class admin extends Component {
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
    ins.setAttribute('data-ad-unit', 'DAN-8XQKEuhR9gYrix7s');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }

  

  render() {
    return (
      <>
            <Container>
                <h1 className="title mt-4 mb-4">관리자 페이지</h1>
                {localStorage.getItem("authenticated") === null ? (
                <>
                    <LoginRes/>
                    <div className="adfit mb-1" style={{width: "100%", margin: "5% auto"}}/>
                </>
                ) : (
                <>
                <AdminCheck />
                <div className="adfit" style={{width: "100%", margin: "auto"}}/>
                </>)}
            </Container>
      </>
    );
  }
}

export default admin;