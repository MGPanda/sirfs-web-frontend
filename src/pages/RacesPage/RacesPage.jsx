import React, {useEffect, useState} from 'react';

import './RacesPage.scss';
import {API} from "../../shared/const/api.const";
import {Race} from "./components/Race/Race";

export function RacesPage() {
    const [races, setRaces] = useState([]);

    const getRaces = () => {
        API.get('api/race').then((res) => {
            res.data.races.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            res.data.races.sort((a, b) => (a.edition > b.edition) ? -1 : ((b.edition > a.edition) ? 1 : 0));
            setRaces(res.data.races);
        })
    }

    useEffect(getRaces, []);

    return(
        <div className={"p-races"}>
            <div className={"container"}>
                {races.map((race, i) => <Race key={i} race={race}/>)}
            </div>
        </div>
    )
}