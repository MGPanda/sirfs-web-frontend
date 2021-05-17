import React, {useState} from 'react';

import './RegisterPage.scss';
import {API} from "../../shared/const/api.const";

export function RegisterPage() {

    // eslint-disable-next-line no-control-regex
    const passwordRegex = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');

    const [user] = useState({});
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setUsernameExists(false);
        setEmailExists(false);
        setInvalidEmail(false);
        setPasswordsDontMatch(false);

        if (!passwordRegex.exec(user.email)) {
            setInvalidEmail(true);
            return;
        }

        if (user.password !== user.confirmPassword) {
            setPasswordsDontMatch(true);
            return;
        }
        API.post('register', user).then((res) => {
            if (res.data.error && res.data.username) {
                setUsernameExists(true);
            } else if (res.data.error && res.data.email) {
                setEmailExists(true);
            } else {
                API.post('login', user).then((res) => {
                    localStorage.setItem('userData', JSON.stringify(res.data.userData));
                    localStorage.setItem('token', res.data.token);
                    const user = localStorage.getItem('userData');

                    if (user) {
                        window.location.href = '/';
                    }
                });
            }
        });
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