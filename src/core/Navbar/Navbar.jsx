import React from 'react';

import './Navbar.scss';
import {NavLink} from "react-router-dom";

export function Navbar() {
    return(
        <div className={"c-navbar"}>
            <NavLink exact to={"/"} activeClassName={"selected"}>Home</NavLink>
            <NavLink to={"/register"} activeClassName={"selected"}>Register</NavLink>
            <NavLink to={"/login"} activeClassName={"selected"}>Login</NavLink>
            <NavLink exact to={"/create-character/1e"} activeClassName={"selected"}>1e</NavLink>
            <NavLink exact to={"/create-character/2e"} activeClassName={"selected"}>2e</NavLink>
            <NavLink to={"/class"} activeClassName={"selected"}>Clases</NavLink>
            <NavLink to={"/race"} activeClassName={"selected"}>Razas</NavLink>
        </div>
    )
}