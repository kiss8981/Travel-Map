import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import NaverLogin from 'react-login-by-naver';
import axios from 'axios';

class login extends Component {
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
    ins.setAttribute('data-ad-unit', 'DAN-SWMYIQHjehzCWbvj');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }
  render() {
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
            var apiResponse = await axios.post(`https://travel.audiscordbot.xyz/api/userinfo/${response.profileObj.googleId}`, userData, { headers });
            window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${response.profileObj.googleId}", "user_email": "${response.profileObj.email}", "user_name": "${response.profileObj.name}", "user_image": "${response.profileObj.imageUrl}", "user_token": "${apiResponse.data.user_token}"}}`);
            window.location.href = window.location.protocol + "//" + window.location.host;
        }
        getData()
      }
    
    const responseNaver = (naverUser) => {
      async function getData() {
          const userData = {
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
          window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${naverUser.id}", "user_email": "${naverUser.email}", "user_name": "${naverUser.name}", "user_image": "${naverUser.profile_image}", "user_token": "${apiResponse.data.user_token}"}}`);
          window.location.href = window.location.protocol + "//" + window.location.host;
      }
      getData()
    }

    const responseFail = () => {
      window.location.href = window.location.protocol + "//" + window.location.host;
    }
  
    return (
      <>
            <Container>
            <h1 className="title mt-4 mb-4">로그인</h1>

            {localStorage.getItem("authenticated") === null ? (
                <div className="login">
                <NaverLogin 
                    clientId="Y7TSJ0r__scAdoqud_Si"
                    callbackUrl="https://travel-report.xyz/login"
                    render={(props) => <button className="social-login" onClick={props.onClick}><img src="https://travel.audiscordbot.xyz/image/naverlogin.png" className="naver-login-image"></img></button>}
                    onSuccess={responseNaver}
                    onFailure={responseFail}
                />
                <GoogleLogin
                    clientId="183101622325-9e3rckitc7jt7ienvkva4q92j1okkkel.apps.googleusercontent.com"
                    render={(props) => <button className="social-login" onClick={props.onClick}><img src="https://travel.audiscordbot.xyz/image/googlelogin.png" className="naver-login-image"></img></button>}
                    onSuccess={responseGoogle}
                    onFailure={responseFail}
                    cookiePolicy={'single_host_origin'}
                />
                </div>
            
            ) : (
                <h1 className="title" style={{marginBottom: "20%", marginTop: "20%"}}>이미 로그인되어 있습니다</h1>
            )}
             <div className="adfit" style={{width: "100%", margin: "auto"}}/>
             </Container>
      </>
    );
  }
}

export default login;