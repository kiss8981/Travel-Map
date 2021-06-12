import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import '../css/profile.css'

function facebookShare() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.protocol + "//" + window.location.host + "/lists/" + JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id));
}

function twitterShare() {
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.protocol + "//" + window.location.host + "/lists/" + JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id));
}

function facebookShareMap() {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.protocol + "//" + window.location.host + "/map/" + JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id));
}

function twitterShareMap() {
  window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.protocol + "//" + window.location.host + "/map/" + JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id));
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
        {localStorage.getItem("authenticated") === null ? (
          <>
              <div className="profile">
                <h1 className="profile-h1">프로필</h1>
                <h1 className="title mb-5" style={{marginTop: "18%"}}>로그인시 정보를 확인할 수 있습니다!</h1>
              </div>
          </>
          ) : (
            <>
              <div className="profile">
                <div className="profile-div">
                  <h1 className="profile-h1"><img className="profile-img" src={JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_image} alt='profile-img'/>{JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_name}님의 프로필</h1>
                  </div>
                  <div className="user-info text-center">
                      <h2>이메일</h2>
                      <h4>{JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_email}</h4>
                      <hr style={{width: '60%'}}/>
                      <h2>유저 ID</h2>
                      <h4>{JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id}</h4>
                      <hr style={{width: '60%'}}/>
                      <h2>내 지도</h2>
                      <h4><a href={window.location.protocol + "//" + window.location.host + "/map/" + JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id}>링크</a></h4>
                      <hr style={{width: '60%'}}/>
                      <h2>내 방문기록</h2>
                      <h4><a href={window.location.protocol + "//" + window.location.host + "/lists/" + JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id}>링크</a></h4>
                  </div>
                  <div className="user-share text-center">방문기록 공유하기<br />
                      <a className="share-logo-link" onClick={facebookShare} href=""><i className="fab fa-facebook" style={{marginTop: '10px'}}></i> 페이스북</a>
                      <a className="share-logo share-logo-link" onClick={twitterShare} href=""><i className="fab fa-twitter"></i> 트위터</a>
                  </div>
                  <div className="user-share text-center">지도 공유하기<br />
                      <a className="share-logo-link" onClick={facebookShareMap} href=""><i className="fab fa-facebook" style={{marginTop: '10px'}}></i> 페이스북</a>
                      <a className="share-logo share-logo-link" onClick={twitterShareMap} href=""><i className="fab fa-twitter"></i> 트위터</a>
                  </div>
              </div>
            </>
          )}
          <div className="adfit" style={{width: "100%", margin: "auto"}}/>
        </Container>
      </>
    );
  }
}

export default listUserVisted;