import React from 'react';
import logo from '../images/logo/mesto-logo.svg';

export default function Header(props){
    return(
        <header className="header header-margin">
            <a href="#" className="header__href">
                <img src={logo} alt="Логотип страницы мест в России" className="header__logo" />
            </a>
        </header>
    );
}
