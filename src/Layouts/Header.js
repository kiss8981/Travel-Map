import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

const responseGoogle = (response) => {
    async function getData() {
        const userData = {
            'user_id': response.profileObj.googleId,
            'user_email': response.profileObj.email,
            'user_name': response.profileObj.name
        }
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'token': 'token'
        }
        console.log(userData)
        var apiResponse = await axios.post(`https://travel.audiscordbot.xyz/api/userinfo/${response.profileObj.googleId}`, userData, { headers });
        window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${response.profileObj.googleId}", "user_email": "${response.profileObj.email}", "user_name": "${response.profileObj.name}", "user_image": "${response.profileObj.imageUrl}", "user_token": "${apiResponse.data.user_token}"}}`);
        window.location.reload();
    }
    getData()
  }

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
                            <GoogleLogin
                                clientId="183101622325-9e3rckitc7jt7ienvkva4q92j1okkkel.apps.googleusercontent.com"
                                buttonText="로그인"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        ) : (
                            <>
                            <Link className="nav-link" to="/profile" style={{verticalAlign: "middle"}}>내 정보</Link>
                            <Link className="nav-link" to={'/lists/' + JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id} style={{marginRight:"15px", verticalAlign: "middle"}}>프로필</Link>
                            <GoogleLogout
                                clientId="183101622325-9e3rckitc7jt7ienvkva4q92j1okkkel.apps.googleusercontent.com"
                                buttonText="로그아웃"
                                onLogoutSuccess={logout}
                            />
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