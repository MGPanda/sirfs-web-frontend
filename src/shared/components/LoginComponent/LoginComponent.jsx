import {API} from "../../const/api.const";

export async function LoginComponent(user) {
    let isLoggedIn = false;

    try {
        const login = await API.post('login', user);
        localStorage.setItem('userData', JSON.stringify(login.data.userData));
        localStorage.setItem('token', login.data.token);
        isLoggedIn = true;
    } catch (e) {
        isLoggedIn = false;
    }

    return isLoggedIn;
}