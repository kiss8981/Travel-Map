import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import Map from '../utills/map';

class home extends Component {
  render() {
    return (
      <>
            {localStorage.getItem("user_id") === null ? (
              <>
              <Container>
                <div role="alert" id="uploadstatus-alert" className="alert alert-info" style={{marginBottom: "20%", marginTop: "5%"}}>로그인후 이용해주세요!</div>
                <h1 className="title mt-4" style={{marginBottom: "30%"}}>로그인 시 추가 정보를 확인할 수 있습니다!</h1>
              </Container>
              </>
            ) : (
            <>
            <Map/>
            </>)
            }
      </>
    );
  }
}

export default home;