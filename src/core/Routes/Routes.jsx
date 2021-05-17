import React from 'react';
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
    return(
        <Switch>
            <Route path={"/create-character/:edition"}>
                <CharacterCreationPage/>
            </Route>
            <Route path={"/class"}>
                <ClassesPage/>
            </Route>
            <Route path={"/login"}>
                <LoginPage/>
            </Route>
            <Route path={"/logout"}>
                <LogoutPage/>
            </Route>
            <Route path={"/race"}>
                <RacesPage/>
            </Route>
            <Route path={"/register"}>
                <RegisterPage/>
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