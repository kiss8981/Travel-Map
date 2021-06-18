import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import NaverLogin from 'react-login-by-naver';
import KakaoLogin from 'react-kakao-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import EmailLogin from '../utills/EmailLogin';
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios';
import Alert from '@material-ui/lab/Alert'

class login extends Component {
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
    ins.setAttribute('data-ad-unit', 'DAN-ZEhWoDMiRsPSVVMb');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }
  render() {
    const responseGoogle = (response) => {
        async function getData() {
            document.getElementById('login-class').style.display = "none"
            document.getElementById('login-loding').style.display = "block"
            const userData = {
                'type': 'GoogleUser',
                'user_id': response.profileObj.googleId,
                'user_email': response.profileObj.email,
                'user_name': response.profileObj.name
            }
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'token': 'token'
            }
            var apiResponse = await axios.post(`https://travel.audiscordbot.xyz/api/userinfo/${response.profileObj.googleId}`, userData, { headers });
            window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${apiResponse.data.user_id}", "user_email": "${response.profileObj.email}", "user_name": "${response.profileObj.name}", "user_image": "${response.profileObj.imageUrl}", "user_token": "${apiResponse.data.user_token}"}}`);
            window.location.href = window.location.protocol + "//" + window.location.host;
        }
        getData()
      }
    
    const responseNaver = (naverUser) => {
      async function getData() {
          document.getElementById('login-class').style.display = "none"
          document.getElementById('login-loding').style.display = "block"
          const userData = {
              'type': 'naverUser',
              'user_id': naverUser.id,
              'user_email': naverUser.email,
              'user_name': naverUser.name,
              'user_nickname': naverUser.nickname,
              'user_gender': naverUser.gender
          }
          const headers = {
              'Access-Control-Allow-Origin': '*',
              'token': 'token'
          }
          var apiResponse = await axios.post(`https://travel.audiscordbot.xyz/api/userinfo/${naverUser.id}`, userData, { headers });
          window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${apiResponse.data.user_id}", "user_email": "${naverUser.email}", "user_name": "${naverUser.name}", "user_image": "${naverUser.profile_image}", "user_token": "${apiResponse.data.user_token}"}}`);
          window.location.href = window.location.protocol + "//" + window.location.host;
      }
      getData()
    }

    const responseKakao = (KakaoUser) => {
      async function getData() {
          document.getElementById('login-class').style.display = "none"
          document.getElementById('login-loding').style.display = "block"
          const userData = {
              'type': 'KakaoUser',
              'user_id': KakaoUser.profile.id,
              'user_email': KakaoUser.profile.kakao_account.email,
              'user_name': KakaoUser.profile.kakao_account.profile.nickname
          }
          const headers = {
              'Access-Control-Allow-Origin': '*',
              'token': 'token'
          }
          var apiResponse = await axios.post(`https://travel.audiscordbot.xyz/api/userinfo/${KakaoUser.profile.id}`, userData, { headers });
          window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${apiResponse.data.user_id}", "user_email": "${KakaoUser.profile.kakao_account.email}", "user_name": "${KakaoUser.profile.kakao_account.profile.nickname}", "user_image": "${KakaoUser.profile.kakao_account.profile.profile_image_url}", "user_token": "${apiResponse.data.user_token}"}}`);
          window.location.href = window.location.protocol + "//" + window.location.host;
      }
      getData()
    }

    const failAlert = (res) => {
      document.getElementById('fail-alart').style.display = "flex"
    }

    const responseFacebook = (FacebookUser) => {
      async function getData() {
        document.getElementById('login-class').style.display = "none"
        document.getElementById('login-loding').style.display = "block"
        const userData = {
            'type': 'FacebookUser',
            'user_id': FacebookUser.id,
            'user_email': FacebookUser.email,
            'user_name': FacebookUser.name
        }
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'token': 'token'
        }
        var apiResponse = await axios.post(`https://travel.audiscordbot.xyz/api/userinfo/${FacebookUser.id}`, userData, { headers });
        window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${apiResponse.data.user_id}", "user_email": "${FacebookUser.email}", "user_name": "${FacebookUser.name}", "user_image": "${FacebookUser.picture.data.url}", "user_token": "${apiResponse.data.user_token}"}}`);
        window.location.href = window.location.protocol + "//" + window.location.host;
      }
    getData()
    }

    const responseFailGoogle = (res) => {
      alert('구글 로그인 오류발생')
      console.log(res)
    }

    const responseFailNaver = (res) => {
      alert('네이버 로그인 오류발생')
      console.log(res)
    }

    const responseFailKakaoLogin = (res) => {
      alert('카카오 로그인 오류발생')
      console.log(res)
    }

    const responseFailFacebookLogin = (res) => {
      alert('페이스북 로그인 오류발생')
      console.log(res)
    }
  
    return (
      <>
            <Container>
            <h1 className="title mt-4 mb-4">로그인</h1>
            <div id="login-loding" style={{display: "none", marginTop: "30vh", marginBottom: "30vh"}}>
              <h1 className="title"><CircularProgress color="secondary" style={{marginRight: "20px", marginTop: "auto", marginBottom: "auto"}}/> 로그인중...</h1>
            </div>
            <div id="login-class" style={{display: "block"}}>
              {localStorage.getItem("authenticated") === null ? (
                <>
                  <div className="login">
                  <Alert className="mt-4" id="fail-alart" severity="error" style={{width: "100%", margin: 'auto', display: 'none', maxWidth: '500px'}} onClose={() => {document.getElementById('fail-alart').style.display = "none"}}>오류발생!</Alert>
                  <EmailLogin failAlert={failAlert}>
                  </EmailLogin>
                  <div className="login-social">
                    <NaverLogin 
                        clientId="Y7TSJ0r__scAdoqud_Si"
                        callbackUrl="https://travel-report.xyz/login"
                        render={(props) => <button className="social-login" style={{background: '#1FC700'}} onClick={props.onClick}><i className="xi-2x xi-naver"></i></button>}
                        onSuccess={responseNaver}
                        onFailure={responseFailNaver}
                    />
                    <GoogleLogin
                        clientId="183101622325-9e3rckitc7jt7ienvkva4q92j1okkkel.apps.googleusercontent.com"
                        render={(props) => <button className="social-login" style={{background: '#D93025'}}onClick={props.onClick}><i className="xi-2x xi-google"></i></button>}
                        onSuccess={responseGoogle}
                        onFailure={responseFailGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <KakaoLogin
                      token="6fb2e2b96c7ddb5a37dc65c2caf25816"
                      render={({ onClick }) => {
                        return (
                          <>
                          <button className="social-login" style={{background: '#FFEB00'}} onClick={(e) => {
                            e.preventDefault();
                            onClick();
                          }}>
                            <i className="xi-2x xi-kakaotalk text-dark"></i></button>
                        </>
                        );
                      }}
                      onSuccess={responseKakao}
                      onFail={responseFailKakaoLogin}
                    />
                    <FacebookLogin
                      appId="201487418524887"
                      fields="name,email,picture"
                      callback={responseFacebook}
                      onFailure={responseFailFacebookLogin}
                      render={(props) => <button className="social-login" style={{background: '#4267B2'}} onClick={props.onClick}><i className="xi-2x xi-facebook"></i></button>}/>
                    </div>
                  </div>
                </>
              ) : (
                  <h1 className="title" style={{marginBottom: "30vh", marginTop: "25vh"}}>이미 로그인되어 있습니다</h1>
              )}
            </div>
             <div className="adfit" style={{width: "100%", margin: "auto"}}/>
             </Container>
      </>
    );
  }
}

export default login;