import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const logout = () => {
    window.localStorage.removeItem("authenticated");
    window.location.reload();
  }

const Header = () => {
    return (
        <>
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand href="/">기록으로 남기다</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">홈</Link>
                        <Link className="nav-link" to="/list">목록</Link>
                        <Link className="nav-link" to="/add">기록하기</Link>
                    </Nav>
                    <Nav className="ml-auto" style={{marginLeft: "auto"}}>
                        {localStorage.getItem("authenticated") === null ? (
                            <>
                            <Link className="logout-button" to="/login">로그인</Link>
                            </>
                        ) : (
                            <>
                            <Link className="nav-link" to="/profile" style={{verticalAlign: "middle"}}>내 정보</Link>
                            <Link className="nav-link" to={'/lists/' + JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id} style={{marginRight:"15px", verticalAlign: "middle"}}>프로필</Link>
                            <button className="logout-button"
                                onClick={logout}
                            >로그아웃</button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        </>
    )
}


export default Header;