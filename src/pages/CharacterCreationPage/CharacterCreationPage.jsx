import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import './CharacterCreationPage.scss';
import {API} from "../../shared/const/api.const";

export function CharacterCreationPage(props) {
    const {edition} = useParams();

    const [char] = useState({});
    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);

    const getFullInfo = () => {
        API.get(`api/class/${edition}`).then((res) => {
            res.data.classes.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            setClasses(res.data.classes);
        });

        API.get(`api/race/${edition}`).then((res) => {
            res.data.races.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            setRaces(res.data.races);
        });
    }

    const handleSubmit = () => {

    }

    useEffect(getFullInfo, [edition]);

    return(
        <div className={"p-character-creation"}>
            <form onSubmit={handleSubmit}>
                <input value={char.name} placeholder={"Nombre de tu personaje"}/>
                <select value={char.race}>
                    {classes.map((currentClass, i) => <option>
                        {currentClass.name}
                    </option>)}
                </select>

                <select value={char.race}>
                    {races.map((race, i) => <option>
                        {race.name}
                    </option>)}
                </select>
            </form>
        </div>
    )
}