import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
        <header>
        <Link to="/">홈</Link><br/>
        <Link to="/photo">사진</Link><br/>
        <Link to="rooms">방 소개</Link><br/>
        </header>
        </>
    )
}


export default Header;