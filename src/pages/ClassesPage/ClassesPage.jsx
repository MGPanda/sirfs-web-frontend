import React, {useEffect, useState} from 'react';

import './ClassesPage.scss';
import {API} from "../../shared/const/api.const";

export function ClassesPage() {
    const [classes, setClasses] = useState([]);

    const getClasses = () => {
        API.get('api/class').then((res) => {
            console.log(res);
            console.log(process.env.REACT_APP_BACK_URL);
            setClasses(res);
        })
    }

    useEffect(getClasses, []);

    return(
        <div className={"p-classes"}>
            {classes.map((thisClass, i) => <div>

            </div>)}
        </div>
    )
}