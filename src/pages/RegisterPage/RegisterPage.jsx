import React, {useEffect, useState} from 'react';

import './RegisterPage.scss';
import {API} from "../../shared/const/api.const";
import {LoginComponent} from "../../shared/components/LoginComponent/LoginComponent";

export function RegisterPage() {

    // eslint-disable-next-line no-control-regex
    const passwordRegex = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])');

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        'errors': true,
    });

    const validateErrors = () => {
        setErrors({});
        let tempErrors = {};

        if (user.username === '') {
            tempErrors.noUsername = "Introduce un nombre de usuario.";
        }

        if (user.email === '') {
            tempErrors.noEmail = "Introduce una dirección de correo.";
        } else if (!passwordRegex.exec(user.email)) {
            tempErrors.invalidEmail = "El correo no es válido.";
        }

        if (user.password === '') {
            tempErrors.noPassword = "Introduce una contraseña.";
        }

        if (user.password !== user.confirmPassword) {
            tempErrors.passwordsDontMatch = "Las contraseñas no coinciden.";
        }

        API.post('register', user).then((res) => {
            if (res.data.error && res.data.username) {
                setErrors({
                    ...errors,
                    'usernameExists': "El usuario ya existe.",
                });
            } else if (res.data.error && res.data.email) {
                setErrors({
                    ...errors,
                    'emailExists': "El correo ya está asociado a una cuenta.",
                });
            }
        });

        setErrors(tempErrors);
    };

    const login = () => {
        if (Object.keys(errors).length === 0) {
            console.log(Object.keys(errors).length);
            LoginComponent(user).then((res) => {
                const user = localStorage.getItem('userData');
                if (user) {
                    window.location.href = '/';
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
        <div className={"p-register"}>
            <div className={"container"}>
                <form className={"c-form"} onSubmit={handleSubmit} onChange={handleChange}>
                    <input defaultValue={user.username} placeholder={"Nombre de usuario"} name={"username"}/><br/>
                    {errors.noUsername && <p className={"c-form__warning"}>{errors.noUsername}</p>}
                    {errors.usernameExists && <p className={"c-form__warning"}>{errors.usernameExists}</p>}
                    <input defaultValue={user.email} placeholder={"Correo electrónico"} name={"email"}/><br/>
                    {errors.noEmail && <p className={"c-form__warning"}>{errors.noEmail}</p>}
                    {errors.invalidEmail && <p className={"c-form__warning"}>{errors.invalidEmail}</p>}
                    {errors.emailExists && <p className={"c-form__warning"}>{errors.emailExists}</p>}
                    <input defaultValue={user.password} type={"password"} placeholder={"Contraseña"} name={"password"}/><br/>
                    {errors.noPassword && <p className={"c-form__warning"}>{errors.noPassword}</p>}
                    <input defaultValue={user.confirmPassword} type={"password"} placeholder={"Confirmar contraseña"}
                           name={"confirmPassword"}/><br/>
                    {errors.passwordsDontMatch && <p className={"c-form__warning"}>{errors.passwordsDontMatch}</p>}
                    <button type={"submit"}>Registrarse</button>
                </form>
            </div>
        </div>
    )
}