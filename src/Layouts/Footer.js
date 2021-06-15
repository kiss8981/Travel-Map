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
            <Link className="nav-link footer-link" href="https://github.com/kiss8981/Travel-Map/blob/main/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8.md">개인정보처리방침</Link>
            </ul>
            <div className="footer-text">Copyright 2021 Dohyun Kim.<br/>All rights reserved</div>
        </footer>
        </>
    )
};


export default Footer;