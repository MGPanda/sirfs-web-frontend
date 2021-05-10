import React from 'react';
import {Route, Switch} from "react-router-dom";
import {ClassesPage} from "../../pages/ClassesPage/ClassesPage";
import {CharacterCreationPage} from "../../pages/CharacterCreationPage/CharacterCreationPage";
import {RacesPage} from "../../pages/RacesPage/RacesPage";
import {RegisterPage} from "../../pages/RegisterPage/RegisterPage";

export function Routes() {
    return(
        <Switch>
            <Route path={"/create-character/:edition"}>
                <CharacterCreationPage/>
            </Route>
            <Route path={"/class"}>
                <ClassesPage/>
            </Route>
            <Route path={"/race"}>
                <RacesPage/>
            </Route>
            <Route path={"/register"}>
                <RegisterPage/>
            </Route>
            <Route exact path={"/"}>
                <h1>Home</h1>
            </Route>
            <Route path={"*"}>
                <h1>404</h1>
            </Route>
        </Switch>
    )
}