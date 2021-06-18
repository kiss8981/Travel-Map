import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import VisitedList from '../compoents/VisitedList'
import DialogButton from '@material-ui/core/Button'
import LoginRes from '../compoents/LoginRes'
import Alert from '@material-ui/lab/Alert'

class listVisted extends Component {
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
    ins.setAttribute('data-ad-unit', 'DAN-cEqnbZ3lY27vg4nz');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }

  share() {
    window.navigator.share({
      title: `${JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_name}님의 여행기록`, // 공유될 제목
      text: `${JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_name}님의 여행 기록을 확인해봐요!`, // 공유될 설명
      url: window.location.protocol + "//" + window.location.host + "/lists/" +  JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id, // 공유될 URL
    });
  }
  render() {
    return (
      <>  
      <h1 className="title mt-4 mb-4">나의 여행 기록지</h1>
            {localStorage.getItem("authenticated") === null ? (
              <>
              <Container>
                <LoginRes/>
                <div className="adfit" style={{width: "100%",  margin: "0% auto"}}/>
              </Container>
              </>
            ) : (
            <>
            <Container>
            <div className="sub-title-button">
              <DialogButton variant="contained" color="default" style={{backgroundColor: 'white'}} onClick={this.share}>나의 여행기록 공유하기</DialogButton>
            </div>
              <Alert className="mt-4" id="success-alart" severity="success" style={{display: 'none'}} onClose={() => {document.getElementById('success-alart').style.display = "none"}}>성공적으로 삭제되었습니다! </Alert>
             <VisitedList/>
             <div className="adfit" style={{width: "100%", margin: "auto"}}/>
             </Container>
            </>)
            }
      </>
    );
  }
}

export default listVisted;