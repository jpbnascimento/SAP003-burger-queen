import React from 'react';
import logo from "./img/logo-2.svg";
import './header.scss';

const Header = () => {

    return(
        <header className="logo">
            <img src={logo} alt="logo"></img>
        </header>
    )
}


export default Header;