import React, {useEffect, useState} from 'react';

import './ClassesPage.scss';
import {API} from "../../shared/const/api.const";
import {Class} from "./components/Class/Class";

export function ClassesPage() {
    const [classes, setClasses] = useState([]);

    const getClasses = () => {
        API.get('api/class').then((res) => {
            res.data.classes.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            res.data.classes.sort((a, b) => (a.edition > b.edition) ? -1 : ((b.edition > a.edition) ? 1 : 0));
            setClasses(res.data.classes);
        })
    }

    useEffect(getClasses, []);

    return (
        <div className={"p-classes"}>
            <div className={"container"}>
                {classes.map((thisClass, i) => <Class key={i} class={thisClass}/>)}
            </div>
        </div>
    )
}