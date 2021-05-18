import React, {useState} from 'react';

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

    const [errors, setErrors] = useState({});

    const validateErrors = async () => {
        let errors = {};

        if (user.username === '') {
            errors.noUsername = "Introduce un nombre de usuario.";
        }

        if (user.email === '') {
            errors.noEmail = "Introduce una dirección de correo.";
        } else if (!passwordRegex.exec(user.email)) {
            errors.invalidEmail = "El correo no es válido.";
        }

        if (user.password === '') {
            errors.noPassword = "Introduce una contraseña.";
        }

        if (user.password !== user.confirmPassword) {
            errors.passwordsDontMatch = "Las contraseñas no coinciden.";
        }
        await API.post('register', user).then((res) => {
            if (res.data.error && res.data.username) {
                errors.usernameExists = "El usuario ya existe.";
            } else if (res.data.error && res.data.email) {
                errors.emailExists = "El correo ya está asociado a una cuenta.";
            }
        });

        setErrors(errors);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        validateErrors().then(r => {
            if (Object.keys(errors).length === 0) {
                LoginComponent(user).then((res) => {
                    const user = localStorage.getItem('userData');
                    if (user) {
                        window.location.href = '/';
                    }
                });
            }
        });
    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

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