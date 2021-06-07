import React from 'react'
import { Link } from 'react-router-dom'

import Github_logo from '../assets/github_logo.svg'
import Rss_logo from '../assets/rss_logo.svg'

const Header = () => {
    return (
        <>
        <footer>
            <Link className="nav-link footer-link" to="/">홈</Link>
            <Link className="nav-link footer-link" to="/list">목록</Link>
            <Link className="nav-link footer-link" to="/add">기록하기</Link>
            <ul className="footer-social">
                <li><a href="https://github.com/kiss8981"><img src={Github_logo} alt="github" className="github_icon"/></a></li>
                <li><a href="https://kiss8981.github.io/"><img src={Rss_logo} alt="blog" className="blog_icon"/></a></li>
            </ul>
            <div className="footer-text">Copyright © 2021 Dohyun Kim.<br/>All rights reserved</div>
        </footer>
        </>
    )
};


export default Header;