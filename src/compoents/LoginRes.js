import React from "react";
import { Link } from "react-router-dom"

function LoginRes() {
  return (
      <>
        <h1 className="title mb-5" style={{marginTop: "25vh"}}>로그인 후 이용해 주세요!</h1>
        <div className="sub-title-button">
        <Link className="logout-button" to="/login" style={{marginBottom: "25vh"}}>로그인</Link>
        </div>
      </>
    );
}

export default LoginRes;