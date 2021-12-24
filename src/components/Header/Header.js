import React from "react";
import {auth} from "../../firebase-config"
import {signOut} from "firebase/auth";
import "./Header.scss";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";

export default function Header() {

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <header className="page-header">
            <Link to="/"><img src={logo} width="210" height="35" alt="Логотип" className="page-header__logo" /></Link>
            <Link to="/" onClick={logout} className="page-header__logout">Выйти</Link>
        </header>
    );
};