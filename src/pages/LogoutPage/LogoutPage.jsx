import React, {useEffect} from 'react';

export function LogoutPage() {
    const logout = () => {
        localStorage.clear();

        window.location.href = '/';
    }

    useEffect(logout, []);

    return(
        <div className={"p-logout"}>

        </div>
    )
}