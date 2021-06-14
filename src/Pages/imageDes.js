import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import ImageDesDetail from '../compoents/ImageDesDetail'

class listVisted extends Component {
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
    const { params } = this.props.match;
    return (
      <>
        <Container>
            <h1 className="title mt-4 mb-4">상세정보</h1>
            <ImageDesDetail imageid={params.imageid}/>
            <div className="adfit" style={{width: "100%", margin: "auto"}}/>
        </Container>
      </>
    );
  }
}

export default listVisted;