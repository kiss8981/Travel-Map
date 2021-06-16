import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
        <footer>
            <ul className="footerlist">
            <Link className="nav-link footer-link" to="/">홈</Link>
            <Link className="nav-link footer-link" to="/list">목록</Link>
            <Link className="nav-link footer-link" to="/add">기록하기</Link>
            <Link className="nav-link footer-link" to="/profile">프로필</Link>
            </ul>
            <a className="nav-link footer-link mb-1" href="https://travel-report.xyz/privacy">개인정보처리방침</a>
            <div className="footer-text">Copyright 2021 Dohyun Kim.<br/>All rights reserved</div>
        </footer>
        </>
    )
};


export default Footer;