import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap'

class listUserVisted extends Component {
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
                <h1 className="title mb-4" style={{marginTop: '30vh'}}>찾을수 없는 페이지 입니다</h1>
                <div className="sub-title-button">
                    <Link className="logout-button" to="/" style={{marginBottom: "30vh"}}>홈으로 돌아가기</Link>
                </div>
             <div className="adfit" style={{width: "100%", margin: "auto"}}/>
            </Container>
      </>
    );
  }
}

export default listUserVisted;