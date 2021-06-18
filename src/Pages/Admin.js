import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import AdminPage from '../compoents/AdminUserList'

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
                <AdminPage />
                <div className="adfit" style={{width: "100%", margin: "auto"}}/>
            </Container>
      </>
    );
  }
}

export default admin;