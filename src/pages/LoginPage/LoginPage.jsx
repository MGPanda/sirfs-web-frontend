import React, {useState} from 'react';

import './LoginPage.scss';
import {API} from "../../shared/const/api.const";

export function LoginPage() {

    const [user] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        API.post('login', user).then((res) => {
            localStorage.setItem('userData', JSON.stringify(res.data.userData));
            localStorage.setItem('token', res.data.token);
            const user = localStorage.getItem('userData');

            if (user) {
                window.location.href = '/';
            }
        }).catch((err) => {

        })
    }

    const handleChange = (event) => {
        user[event.target.name] = event.target.value;
    }

    return (
        <div className={"p-login"}>
            <div className={"container"}>
                <form className={"c-form"} onSubmit={handleSubmit} onChange={handleChange}>
                    <input value={user.email} placeholder={"Correo electrónico"} name={"email"}/><br/>
                    <input value={user.password} type={"password"} placeholder={"Contraseña"} name={"password"}/><br/>
                    <button type={"submit"}>Iniciar sesión</button>
                </form>
            </div>
        </div>
    )
}