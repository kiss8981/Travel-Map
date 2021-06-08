import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
        <footer>
            <Link className="nav-link footer-link" to="/">홈</Link>
            <Link className="nav-link footer-link" to="/list">목록</Link>
            <Link className="nav-link footer-link" to="/add">기록하기</Link>
            <ul className="footer-social">
                <li><a href="https://github.com/kiss8981"><img src='https://travel.audiscordbot.xyz/image/github_logo.svg' alt="github" className="github_icon"/></a></li>
                <li><a href="https://kiss8981.github.io/"><img src='https://travel.audiscordbot.xyz/image/rss_logo.svg' alt="blog" className="blog_icon"/></a></li>
            </ul>
            <div className="footer-text">Copyright © 2021 Dohyun Kim.<br/>All rights reserved</div>
        </footer>
        </>
    )
};


export default Header;