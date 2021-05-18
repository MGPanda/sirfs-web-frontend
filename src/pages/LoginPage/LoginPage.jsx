import React, {useEffect, useState} from 'react';

import './LoginPage.scss';
import {LoginComponent} from "../../shared/components/LoginComponent/LoginComponent";

export function LoginPage() {

    // eslint-disable-next-line no-control-regex
    const passwordRegex = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])');

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        'errors': true,
    });

    const validateErrors = () => {
        setErrors({});

        let errors = {};

        if (user.email === '') {
            errors.noEmail = "Introduce una dirección de correo.";
        } else if (!passwordRegex.exec(user.email)) {
            errors.invalidEmail = "El correo no es válido.";
        }

        if (user.password === '') {
            errors.noPassword = "Introduce una contraseña.";
        }

        setErrors(errors);
    }

    const login = () => {
        if (Object.keys(errors).length === 0) {
            LoginComponent(user).then((res) => {
                if (res) {
                    const user = localStorage.getItem('userData');
                    if (user) {
                        window.location.href = '/';
                    }
                } else {
                    setErrors({
                        ...errors,
                        'wrongCombination': "El correo y la contraseña que has introducido no coinciden.",
                    })
                }
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        validateErrors();
    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(login, [errors]);

    return (
        <div className={"p-login"}>
            <div className={"container"}>
                <form className={"c-form"} onSubmit={handleSubmit} onChange={handleChange}>
                    <input defaultValue={user.email} placeholder={"Correo electrónico"} name={"email"}/>
                    {errors.noEmail && <p className={"c-form__warning"}>{errors.noEmail}</p>}
                    {errors.invalidEmail && <p className={"c-form__warning"}>{errors.invalidEmail}</p>}
                    <input defaultValue={user.password} type={"password"} placeholder={"Contraseña"} name={"password"}/>
                    {errors.noPassword && <p className={"c-form__warning"}>{errors.noPassword}</p>}
                    {errors.wrongCombination && <p className={"c-form__warning"}>{errors.wrongCombination}</p>}
                    <button type={"submit"}>Iniciar sesión</button>
                </form>
            </div>
        </div>
    )
}