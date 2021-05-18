import React, {useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import {ClassesPage} from "../../pages/ClassesPage/ClassesPage";
import {CharacterCreationPage} from "../../pages/CharacterCreationPage/CharacterCreationPage";
import {RacesPage} from "../../pages/RacesPage/RacesPage";
import {RegisterPage} from "../../pages/RegisterPage/RegisterPage";
import {Page404} from "../../shared/pages/Page404/Page404";
import {LoginPage} from "../../pages/LoginPage/LoginPage";
import {LogoutPage} from "../../pages/LogoutPage/LogoutPage";
import {HomePage} from "../../pages/HomePage/HomePage";

export function Routes() {
    const [user, setUser] = useState();

    const isLoggedIn = () => {
        const user = localStorage.getItem('userData');
        if (user) {
            setUser(user);
        }
    }

    useEffect(isLoggedIn, []);

    return(
        <Switch>
            <Route path={"/create-character/:edition"}>
                {user ? <CharacterCreationPage/> : <Page404/>}
            </Route>
            <Route path={"/class"}>
                <ClassesPage/>
            </Route>
            <Route path={"/login"}>
                {user ? <HomePage/> : <LoginPage/>}
            </Route>
            <Route path={"/logout"}>
                <LogoutPage/>
            </Route>
            <Route path={"/race"}>
                <RacesPage/>
            </Route>
            <Route path={"/register"}>
                {user ? <HomePage/> : <RegisterPage/>}
            </Route>
            <Route exact path={"/"}>
                <HomePage/>
            </Route>
            <Route path={"*"}>
                <Page404/>
            </Route>
        </Switch>
    )
}