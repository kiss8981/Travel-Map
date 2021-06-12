import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import DialogButton from '@material-ui/core/Button'
import '../css/profile.css'

function share() {
  window.navigator.share({
    title: `${JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_name}님의 여행기록`, // 공유될 제목
    text: '친구의 여행 기록을 더 자세히 확인해봐요!', // 공유될 설명
    url: window.location.protocol + "//" + window.location.host + "/list/" +  JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id, // 공유될 URL
  });
}

function openMapUser() {
  window.location.href = window.location.protocol + "//" + window.location.host + "/map/" +  JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id;
}

function openListUser(){
  window.location.href = window.location.protocol + "//" + window.location.host + "/list/" +  JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id;
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
                      <h2>내 정보</h2>
                      <DialogButton variant="contained" color="default" onClick={openMapUser}>지도보기</DialogButton>
                      <DialogButton variant="contained" color="default" style={{marginLeft: "15px"}} onClick={openListUser}>방문 기록보기</DialogButton>
                      <br/>
                      <DialogButton variant="contained" color="default" onClick={share} style={{marginTop: "10px", marginBottom: "10px"}}><i class="fas fa-share-alt"></i>&nbsp;공유하기</DialogButton>
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