import React, { Component } from 'react';
import AddReport from '../compoents/AddReport';
import { Container } from 'react-bootstrap';

class home extends Component {
  render() {
    return (
      <>
        <Container>
            <h1 className="title mt-4 mb-4">여행기록 만들기</h1>
            <AddReport/>
        </Container>
    </>
    );
  }
}

export default home;