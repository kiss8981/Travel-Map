import React, { Component } from 'react';
import { Container } from 'react-bootstrap'

class home extends Component {
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
    ins.setAttribute('data-ad-unit', 'DAN-0LMfMjezazMcpdX1');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }
  state = {
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    type: "emailUser"
  };

  signUpIdHandler = (e) => {
    this.setState({ id: e.target.value });
  };

  signUpPwHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  signUpEmailHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  signUpNameHandler = (e) => {
    this.setState({ name: e.target.value });
  };

  signUpPwConfirmHandler = (e) => {
    this.setState({ confirmPassword: e.target.value });
  }

  signUpClickHandler = () => {
    const { id, password, confirmPassword, name, email, type } = this.state;
    var user_id = document.getElementById('user_id')
    var user_email = document.getElementById('user_email')
    var user_pw = document.getElementById('user_pw')
    var user_name = document.getElementById('user_name')
    var necessaryPar = document.getElementById('necessary-par')
    if(user_id.value === "" || user_email.value === "" || user_pw.value === "" || user_name.value === "") {
        necessaryPar.style.display = "block";
    } else {
      if( confirmPassword != password ) {
        var NecessaryparConfirmFalse = document.getElementById('necessary-par-confirm-false')
        NecessaryparConfirmFalse.style.display = "block";
      } else {
        fetch(`https://travel.audiscordbot.xyz/api/userinfo/register/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": "token"
          },
          body: JSON.stringify({
            'user_id': id,
            'user_password': password,
            'user_name': name,
            'user_email': email,
            'type': type
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.result == "failed") {
              alert(res.info)
              window.location.reload()
            } else if (res.result == "success") {
              window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${res.user_id}", "user_email": "${res.user_email}", "user_name": "${res.user_name}", "user_image": "https://travel.audiscordbot.xyz/image/icons-map.png", "user_token": "${res.user_token}"}}`);
              window.location.href = window.location.protocol + "//" + window.location.host;
            }
          });
      }
    }
  }; 

  render() {
    return (
      <>
            <Container>
            <h1 className="title mt-4 mb-4">회원가입</h1>
            <div className="loginModal" style={{marginBottom: "10vh", marginTop: "10vh"}}>
              <div className="modalContents">
                <input
                  name="username"
                  id="user_id"
                  className="loginPw"
                  type="username"
                  placeholder="아이디"
                  onChange={this.signUpIdHandler}
                />
                <input
                  name="password"
                  id="user_pw"
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호"
                  onChange={this.signUpPwHandler}
                />
                <input
                  name="password"
                  id="user_pw"
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호 확인"
                  onChange={this.signUpPwConfirmHandler}
                />
                <input
                  name="email"
                  id="user_email"
                  className="loginPw"
                  type="text"
                  placeholder="이메일"
                  onChange={this.signUpEmailHandler}
                />
                <input
                  name="name"
                  className="loginPw"
                  id="user_name"
                  type="text"
                  placeholder="이름"
                  onChange={this.signUpNameHandler}
                />
                <button className="loginBtn" onClick={this.signUpClickHandler}>
                  {" "}
                  회원가입{" "}
                </button>
                <div role="alert" id="necessary-par" className="alert alert-warning mt-3" style={{display: "none"}}>필수 입력란을 입력해 주세요</div>
                <div role="alert" id="necessary-par-confirm-false" className="alert alert-warning" style={{display: "none"}}>비밀번호가 일치하지 않습니다.</div>
              </div>
            </div>
            <div className="adfit" style={{width: "100%", margin: "auto"}}/>
            </Container>
            
      </>
    );
  }
}

export default home;