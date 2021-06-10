import React, { Component } from 'react';
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
    ins.setAttribute('data-ad-unit', 'DAN-VwP9f4yTsDlZOR54');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }

  render() {
    return (
      <>
            {localStorage.getItem("user_id") === null ? (
              <>
              <Container>
                <h1 className="title mb-5" style={{marginTop: "18%"}}>로그인시 정보를 확인할 수 있습니다!</h1>
                <div className="adfit" style={{width: "80%",  margin: "11% auto"}}/>
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