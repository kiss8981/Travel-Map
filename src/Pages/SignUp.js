import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

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
    veEmail: false,
    openFailAlert: false,
    openSuccessAlart: false
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
    if(user_id.value === "" || user_email.value === "" || user_pw.value === "" || user_name.value === "") {
      document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "?????? ???????????? ????????? ?????????"
      this.setState({openFailAlert: true})
    } else {
      if( confirmPassword !== password ) {
        document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "??????????????? ???????????? ????????????."
        this.setState({openFailAlert: true})
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
              this.setState({openFailAlert: true})
            } else if (res.result === "success") {
              window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${res.user_id}", "user_email": "${res.user_email}", "user_name": "${res.user_name}", "user_image": "https://travel.audiscordbot.xyz/image/icons-map.png", "user_token": "${res.user_token}"}}`);
              window.location.href = window.location.protocol + "//" + window.location.host;
            }
          });
        } else {
          document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "???????????? ????????? ?????????."
          this.setState({openFailAlert: true})
        }
      }
    }
  };

  verificationEmail = () => {
    const { userVeNumber, veNumber } = this.state;
    if (userVeNumber === veNumber) {
      document.getElementsByClassName("MuiAlert-message")[1].innerHTML = "????????? ????????? ?????????????????????!"
      this.setState({openSuccessAlart: true})
      this.setState({ veEmail: true });
      document.getElementById("sendemail").style.display = "none"
      document.getElementById("ve-email-check").style.display = "none"
      document.getElementById("user_verification").readOnly = true;
      document.getElementById("user_email").readOnly = true;
    } else {
      document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "??????????????? ???????????? ????????????"
      this.setState({openFailAlert: true})
    }
  }

  sendEmail = () => {
    const { email } = this.state;
    var user_email = document.getElementById('user_email')
    if(user_email.value === "") {
      document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "????????? ????????? ????????? ?????????."
      this.setState({openFailAlert: true})
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
                  document.getElementsByClassName("MuiAlert-message")[0].innerHTML = "???????????? ?????? ????????? ???????????????"
                  this.setState({openFailAlert: true})
                } else {
                  document.getElementsByClassName("MuiAlert-message")[0].innerHTML = res.info
                  this.setState({openFailAlert: true})
                }
              } else if (res.result === "success") {
                document.getElementsByClassName("MuiAlert-message")[1].innerHTML = res.info
                this.setState({openSuccessAlart: true})
                this.setState({ veNumber: String(res.number) });
              }
            });
        }
  }

  render() {
    const { openFailAlert,  openSuccessAlart } = this.state;
    return (
      <>
            <Container>
            <h1 className="title mt-4 mb-4">????????????</h1>
            <div className="loginModal" style={{marginBottom: "18vh", marginTop: "10vh"}}>
            <Collapse in={openFailAlert}>
              <Alert className="mb-4" severity="error" style={{width: "100%", margin: 'auto', maxWidth: '500px'}} action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {this.setState({openFailAlert: false})}}><CloseIcon fontSize="inherit" /></IconButton>}>Close me!</Alert>
            </Collapse>
            <Collapse in={openSuccessAlart}>
              <Alert className="mb-4" severity="success" style={{width: "100%", margin: 'auto', maxWidth: '500px'}} action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {this.setState({openSuccessAlart: false})}}><CloseIcon fontSize="inherit" /></IconButton>}>Close me!</Alert>
            </Collapse>
              <div className="modalContents">
                <text><i className="fas fa-address-card"></i> ?????????</text>
                <input
                  name="username"
                  id="user_id"
                  className="loginPw"
                  type="username"
                  placeholder="?????????"
                  onChange={this.signUpIdHandler}
                />
                <text><i className="fas fa-lock"></i> ????????????</text>
                <input
                  name="password"
                  id="user_pw"
                  className="loginPw"
                  type="password"
                  placeholder="????????????"
                  onChange={this.signUpPwHandler}
                />
                <text><i className="fas fa-lock"></i> ???????????? ??????</text>
                <input
                  name="password"
                  id="user_pw_confirm"
                  className="loginPw"
                  type="password"
                  placeholder="???????????? ??????"
                  onChange={this.signUpPwConfirmHandler}
                />
                <text><i className="fas fa-envelope"></i> ?????????</text>
                <input
                  name="email"
                  id="user_email"
                  className="loginPw"
                  type="text"
                  placeholder="?????????"
                  onChange={this.signUpEmailHandler}
                />
                <button className="loginBtn mt-2 mb-1" id="sendemail" style={{fontSize: '15px'}} onClick={this.sendEmail}>???????????? ??????</button>
                <text><i className="fas fa-user-check"></i> ??????</text>
                <input
                  name="verification"
                  id="user_verification"
                  className="loginPw"
                  type="text"
                  placeholder="????????????"
                  onChange={this.signUpVerificationHandler}
                ></input>
                <button className="loginBtn mt-2 mb-1" id="ve-email-check" style={{fontSize: '15px', width: '100%'}} onClick={this.verificationEmail}>??????</button>
                <text><i className="fas fa-user"></i>  ??????</text>
                <input
                  name="name"
                  className="loginPw"
                  id="user_name"
                  type="text"
                  placeholder="??????"
                  onChange={this.signUpNameHandler}
                />
                <button className="loginBtn" onClick={this.signUpClickHandler} style={{fontSize: '15px'}}>
                  {" "}
                  ????????????{" "}
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