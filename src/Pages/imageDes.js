import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import ImageDesDetail from '../compoents/ImageDesDetail'

class listVisted extends Component {
  render() {
    const { params } = this.props.match;
    return (
      <>
        <Container>
            <h1 className="title mt-4 mb-4">상세정보</h1>
            <ImageDesDetail imageid={params.imageid}/>
        </Container>
      </>
    );
  }
}

export default listVisted;