import React, {useState} from 'react';

import './Navbar.scss';
import {NavLink} from "react-router-dom";

export function Navbar() {
    const [token] = useState(localStorage.getItem('token'));

    return (
        <div className={"c-navbar"}>
            <NavLink exact to={"/"}><h1 className={"c-navbar__title"}>SiRFS</h1></NavLink>
            <div className={"c-navbar__links"}>
                {token === null && <NavLink to={"/register"} activeClassName={"selected"}>Register</NavLink>}
                {token === null && <NavLink to={"/login"} activeClassName={"selected"}>Login</NavLink>}
                {token !== null && <NavLink to={"/logout"} activeClassName={"selected"}>Logout</NavLink>}
                {token !== null && <NavLink exact to={"/create-character/1e"} activeClassName={"selected"}>1e</NavLink>}
                {token !== null && <NavLink exact to={"/create-character/2e"} activeClassName={"selected"}>2e</NavLink>}
                <NavLink to={"/class"} activeClassName={"selected"}>Clases</NavLink>
                <NavLink to={"/race"} activeClassName={"selected"}>Razas</NavLink>
            </div>
        </div>
    )
}