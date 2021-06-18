import React, { Component } from "react";
import { Link } from 'react-router-dom'
 
class EmailLogin extends Component {
  state = {
    id: "",
    password: "",
  };

  loginIdHandler = (e) => {
    this.setState({ id: e.target.value });
  };

  loginPwHandler = (e) => {
    this.setState({ password: e.target.value });
  };


  loginClickHandler = () => {
    const { id, password } = this.state;
    fetch(`https://travel.audiscordbot.xyz/api/userinfo/login/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": "token"
      },
      body: JSON.stringify({
        'user_id': id,
        'user_password': password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result === "failed") {
          document.getElementsByClassName('MuiAlert-message')[0].innerHTML = res.info
          this.props.failAlert()
        } else if (res.result === "success") {
          window.localStorage.setItem("authenticated", `{"authenticated": {"user_id": "${res.user_id}", "user_email": "${res.user_email}", "user_name": "${res.user_name}", "user_image": "https://travel.audiscordbot.xyz/image/icons-map.png", "user_token": "${res.user_token}"}}`);
          window.location.href = window.location.protocol + "//" + window.location.host;
        }
      });
  }; 

 
  render() {
    return (
      <div className="loginModal">
        <div className="modalContents">
          <input
            name="username"
            className="loginPw"
            type="username"
            placeholder="아이디"
            onChange={this.loginIdHandler}
          />
          <input
            name="password"
            className="loginPw"
            type="password"
            placeholder="비밀번호"
            onChange={this.loginPwHandler}
          />
          <button className="loginBtn" onClick={this.loginClickHandler}>
            {" "}
            로그인{" "}
          </button>
        </div>
        <div className="loginEnd">
          <div className="loginLine">
            회원이 아니신가요? <Link to="/signup">이메일로 회원가입</Link>
          </div>
        </div>
      </div>
    );
  }
}


export default EmailLogin;