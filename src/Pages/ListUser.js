import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import VisitedUserList from '../compoents/VisitedUserList'

class listUserVisted extends Component {
  render() {
    const { params } = this.props.match;
    return (
      <>
            <Container>
            <h1 className="title mt-4 mb-4">여행 기록지</h1>
             <VisitedUserList userid={params.userid}/>
             </Container>
      </>
    );
  }
}

export default listUserVisted;