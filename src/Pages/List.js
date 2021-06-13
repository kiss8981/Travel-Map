import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import VisitedList from '../compoents/VisitedList'
import DialogButton from '@material-ui/core/Button'

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
    ins.setAttribute('data-ad-unit', 'DAN-N89Otl8PT8vjD8Da');
  
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
                <h1 className="title mb-5" style={{marginTop: "18%"}}>로그인시 정보를 확인할 수 있습니다!</h1>
                <div className="sub-title-button">
                <Link className="logout-button" to="/login" style={{marginBottom: "15%"}}>로그인</Link>
                </div>
                <div className="adfit" style={{width: "80%",  margin: "0% auto"}}/>
              </Container>
              </>
            ) : (
            <>
            <Container>
            <div className="sub-title-button">
              <DialogButton variant="contained" color="default" onClick={this.share}>나의 여행기록 공유하기</DialogButton>
            </div>
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