import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import Alert from '@material-ui/lab/Alert'

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
    type: "emailUser",
    veNumber: "qwertyuiop0472346",
    userVeNumber: "12312312313212",
    veEmail: false
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

  signUpVerificationHandler = (e) => {
    this.setState({ userVeNumber: e.target.value });
  }

  signUpClickHandler = () => {
    const { id, password, confirmPassword, name, email, type, veEmail } = this.state;
    var user_id = document.getElementById('user_id')
    var user_email = document.getElementById('user_email')
    var user_pw = document.getElementById('user_pw')
    var user_name = document.getElementById('user_name')
    var necessaryPar = document.getElementById('necessary-par')
    if(user_id.value === "" || user_email.value === "" || user_pw.value === "" || user_name.value === "") {
      document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "필수 입력란을 입력해 주세요"
      document.getElementById("fail-alart").style.display = "flex"
    } else {
      if( confirmPassword !== password ) {
        document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "비밀번호가 일치하지 않습니다."
        document.getElementById("fail-alart").style.display = "flex"
      } else {
        if ( veEmail === true ) {
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
            if (res.result === "failed") {
              document.getElementsByClassName("MuiAlert-message")[0].innerHTML = res.info
              document.getElementById("fail-alart").style.display = "flex"
            } else if (res.result === "success") {
              window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${res.user_id}", "user_email": "${res.user_email}", "user_name": "${res.user_name}", "user_image": "https://travel.audiscordbot.xyz/image/icons-map.png", "user_token": "${res.user_token}"}}`);
              window.location.href = window.location.protocol + "//" + window.location.host;
            }
          });
        } else {
          document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "이메일을 인증해 주세요."
          document.getElementById("fail-alart").style.display = "flex"
        }
      }
    }
  };

  verificationEmail = () => {
    const { userVeNumber, veNumber } = this.state;
    if (userVeNumber === veNumber) {
      document.getElementById("success-alart-2").style.display = "flex"
      this.setState({ veEmail: true });
      document.getElementById("sendemail").style.display = "none"
      document.getElementById("ve-email-check").style.display = "none"
      document.getElementById("user_verification").readOnly = true;
      document.getElementById("user_email").readOnly = true;
      document.getElementsByClassName("MuiAlert-message")[2].innerHTML = "이메일 주소가 인증되었습니다!"
    } else {
      document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "인증번호가 올바르지 않습니다"
      document.getElementById("fail-alart").style.display = "flex"
    }
  }

  sendEmail = () => {
    const { email } = this.state;
    var user_email = document.getElementById('user_email')
    if(user_email.value === "") {
      document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "이메일 주소를 입력해 주세요."
      document.getElementById("fail-alart").style.display = "flex"
    } else {
      fetch(`https://travel.audiscordbot.xyz/api/email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "token": "token"
            },
            body: JSON.stringify({
              'UserEmail': email
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.result === "failed") {
                if (res.code.code === "EENVELOPE") {
                  document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "올바르지 않은 이메일 주소입니다"
                  document.getElementById("fail-alart").style.display = "flex"
                } else {
                  document.getElementsByClassName("MuiAlert-message")[0].innerHTML = res.info
                  document.getElementById("fail-alart").style.display = "flex"
                }
              } else if (res.result === "success") {
                document.getElementsByClassName("MuiAlert-message")[1].innerHTML = res.info
                document.getElementById("success-alart").style.display = "flex"
                this.setState({ veNumber: String(res.number) });
              }
            });
        }
  }

  render() {
    return (
      <>
            <Container>
            <h1 className="title mt-4 mb-4">회원가입</h1>
            <div className="loginModal" style={{marginBottom: "18vh", marginTop: "10vh"}}>
            <Alert className="mb-4" id="fail-alart" severity="error" style={{width: "100%", margin: 'auto', display: 'none', maxWidth: '500px'}} onClose={() => {document.getElementById('fail-alart').style.display = "none"}}>오류발생!</Alert>
            <Alert className="mb-4" id="success-alart" severity="success" style={{width: "100%", display: 'none', margin: 'auto', maxWidth: '500px'}} onClose={() => {document.getElementById('success-alart').style.display = "none"}}>!</Alert>
            <Alert className="mb-4" id="success-alart-2" severity="success" style={{width: "100%", display: 'none', margin: 'auto', maxWidth: '500px'}} onClose={() => {document.getElementById('success-alart').style.display = "none"}}>!</Alert>
              <div className="modalContents">
                <text><i class="fas fa-address-card"></i> 아이디</text>
                <input
                  name="username"
                  id="user_id"
                  className="loginPw"
                  type="username"
                  placeholder="아이디"
                  onChange={this.signUpIdHandler}
                />
                <text><i className="fas fa-lock"></i> 비밀번호</text>
                <input
                  name="password"
                  id="user_pw"
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호"
                  onChange={this.signUpPwHandler}
                />
                <text><i className="fas fa-lock"></i> 비밀번호 확인</text>
                <input
                  name="password"
                  id="user_pw_confirm"
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호 확인"
                  onChange={this.signUpPwConfirmHandler}
                />
                <text><i className="fas fa-envelope"></i> 이메일</text>
                <input
                  name="email"
                  id="user_email"
                  className="loginPw"
                  type="text"
                  placeholder="이메일"
                  onChange={this.signUpEmailHandler}
                />
                <button className="loginBtn mt-2 mb-1" id="sendemail" style={{fontSize: '15px'}} onClick={this.sendEmail}>인증번호 발송</button>
                <text><i className="fas fa-user-check"></i> 인증</text>
                <input
                  name="verification"
                  id="user_verification"
                  className="loginPw"
                  type="text"
                  placeholder="인증번호"
                  onChange={this.signUpVerificationHandler}
                ></input>
                <button className="loginBtn mt-2 mb-1" id="ve-email-check" style={{fontSize: '15px', width: '100%'}} onClick={this.verificationEmail}>인증</button>
                <text><i className="fas fa-user"></i>  이름</text>
                <input
                  name="name"
                  className="loginPw"
                  id="user_name"
                  type="text"
                  placeholder="이름"
                  onChange={this.signUpNameHandler}
                />
                <button className="loginBtn" onClick={this.signUpClickHandler} style={{fontSize: '15px'}}>
                  {" "}
                  회원가입{" "}
                </button>
              </div>
            </div>
            <div className="adfit" style={{width: "100%", margin: "auto"}}/>
            </Container>
            
      </>
    );
  }
}

export default home;