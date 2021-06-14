import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Map from '../utills/map';

class home extends Component {
  componentDidMount() {
    let ins = document.createElement('ins');
    let scr = document.createElement('script');
  
    ins.className = 'kakao_ad_area';
    ins.style = "display:none;";
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute('data-ad-width', '728');
    ins.setAttribute('data-ad-height', '90');
    ins.setAttribute('data-ad-unit', 'DAN-A4YGwiYEIbA7Q7Kh');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }

  render() {
    return (
      <>
            {localStorage.getItem("authenticated") === null ? (
              <>
              <Container>
                <h1 className="title" style={{marginTop: "30vh", marginBottom: "20px"}}>로그인시 정보를 확인할 수 있습니다!</h1>
                <div className="sub-title-button">
                  <Link className="logout-button" to="/login" style={{marginBottom: "36vh"}}>로그인</Link>
                </div>
                <div className="adfit" style={{width: "100%"}}/>
              </Container>
              </>
            ) : (
            <>
            <Map/>
            <Container>
            <div className="adfit mt-2" style={{width: "100%", margin: "auto"}}/>
            </Container>
            </>)
            }
      </>
    );
  }
}

export default home;