import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import VisitedList from '../compoents/VisitedList'

class listVisted extends Component {

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
            <Container>
            <h1 className="title mt-4 mb-4">여행 기록지</h1>
             <VisitedList/>
             </Container>
            </>)
            }
      </>
    );
  }
}

export default listVisted;