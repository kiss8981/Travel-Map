import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

const responseGoogle = (response) => {
    window.localStorage.setItem("user_id", response.googleId);
    window.localStorage.setItem("user_email", response.Ft.pu);
    window.localStorage.setItem("user_name", response.Ft.Ue);
    window.location.reload();
  }

const logout = () => {
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("user_email");
    window.localStorage.removeItem("user_name");
    window.location.reload();
  }

const Header = () => {
    return (
        <>
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand href="/">여행기록</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">홈</Link>
                        <Link className="nav-link" to="/list">목록</Link>
                        <Link className="nav-link" to="/add">기록하기</Link>
                    </Nav>
                </Navbar.Collapse>
                {localStorage.getItem("user_id") === null ? (
                    <GoogleLogin
                    clientId='183101622325-9e3rckitc7jt7ienvkva4q92j1okkkel.apps.googleusercontent.com'
                    buttonText="로그인"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    />
                ) : (
                    <GoogleLogout
                    clientId="183101622325-9e3rckitc7jt7ienvkva4q92j1okkkel.apps.googleusercontent.com"
                    buttonText="로그아웃"
                    onLogoutSuccess={logout}
                    />
                )}
                </Container>
            </Navbar>
        </header>
        </>
    )
}


export default Header;