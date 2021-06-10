import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import '../css/profile.css'

function facebookShare() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.protocol + "//" + window.location.host + "/lists/" + window.localStorage.getItem('user_id')));
}

function twitterShare() {
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.protocol + "//" + window.location.host + "/lists/" + window.localStorage.getItem('user_id')));
}

class listUserVisted extends Component {
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
    ins.setAttribute('data-ad-unit', 'DAN-oteeZ21L0udfdnx2');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }
  render() {
    return (
      <>
        <Container>
        <div className="profile">
          <div className="profile-div">
            <h1 className="profile-h1"><img className="profile-img" src={localStorage.getItem("user_image")} alt='profile-img'/>{window.localStorage.getItem('user_name')}님의 프로필</h1>
            </div>
            <div className="user-info text-center">
                <h2>이메일</h2>
                <h4>{window.localStorage.getItem('user_email')}</h4>
                <hr style={{width: '60%'}}/>
                <h2>유저 ID</h2>
                <h4>{window.localStorage.getItem('user_id')}</h4>
                <hr style={{width: '60%'}}/>
                <h2>프로필 링크</h2>
                <h4>{window.location.protocol + "//" + window.location.host + "/lists/" + window.localStorage.getItem('user_id')}</h4>
            </div>
            <div className="user-share text-center">공유하기<br />
                <a className="share-logo-link" onClick={facebookShare} href=""><i className="fab fa-facebook" style={{marginTop: '10px'}}></i> 페이스북</a>
                <a className="share-logo share-logo-link" onClick={twitterShare} href=""><i className="fab fa-twitter"></i> 트위터</a>
            </div>
        </div>
        <div className="adfit" style={{width: "100%", margin: "auto"}}/>
        </Container>
      </>
    );
  }
}

export default listUserVisted;