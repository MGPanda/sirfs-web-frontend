import React, {useState} from 'react';

import './RegisterPage.scss';
import {API} from "../../shared/const/api.const";

export function RegisterPage() {

    const [user] = useState({});
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [invalidEmail, setinvalidEmail] = useState(false);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setUsernameExists(false);
        setEmailExists(false);
        setinvalidEmail(false);
        setPasswordsDontMatch(false);

        if (user.password !== user.confirmPassword) {
            setPasswordsDontMatch(true);
            return;
        }
        API.post('register', user).then((res) => {});
    }

    const handleChange = (event) => {
        user[event.target.name] = event.target.value;
    }

    return (
        <div className={"p-register"}>
            <div className={"container"}>
                <form className={"c-form"} onSubmit={handleSubmit} onChange={handleChange}>
                    <input value={user.username} placeholder={"Nombre de usuario"} name={"username"}/><br/>
                    {usernameExists && <p className={"c-form__warning"}>El usuario ya existe.</p>}
                    <input value={user.email} placeholder={"Correo electrónico"} name={"email"}/><br/>
                    {invalidEmail && <p className={"c-form__warning"}>El correo no es válido.</p>}
                    {emailExists && <p className={"c-form__warning"}>El correo ya está asociado a una cuenta.</p>}
                    <input value={user.password} type={"password"} placeholder={"Contraseña"} name={"password"}/><br/>
                    <input value={user.confirmPassword} type={"password"} placeholder={"Confirmar contraseña"}
                           name={"confirmPassword"}/><br/>
                    {passwordsDontMatch && <p className={"c-form__warning"}>Las contraseñas no coinciden.</p>}
                    <button type={"submit"}>Registrarse</button>
                </form>
            </div>
        </div>
    )
}