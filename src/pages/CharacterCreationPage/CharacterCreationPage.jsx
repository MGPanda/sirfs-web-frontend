/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import './CharacterCreationPage.scss';
import {API} from "../../shared/const/api.const";

export function CharacterCreationPage(props) {
    const {edition} = useParams();

    const [char] = useState({});
    const [race, setRace] = useState({
        baseStats: []
    });

    const [thisClass, setThisClass] = useState({});

    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);

    const getFullInfo = () => {
        API.get(`api/class/${edition}`).then((res) => {
            res.data.classes.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            setClasses(res.data.classes);
            setThisClass(res.data.classes[0]);
        });

        API.get(`api/race/${edition}`).then((res) => {
            res.data.races.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            setRaces(res.data.races);
            setRace(res.data.races[0]);
        });
    }

    const handleSubmit = () => {

    }

    const handleChange = (event) => {
        char[event.target.name] = event.target.value;
    }

    const handleChangeRace = (event) => {
        setRace(races[event.target.selectedIndex]);
    }

    const handleChangeClass = (event) => {
        setThisClass(classes[event.target.selectedIndex]);

    }

    useEffect(getFullInfo, []);

    return (
        <div className={"p-character-creation"}>
            <div className={"container"}>
                <form className={"c-form"} onSubmit={handleSubmit} onChange={handleChange}>
                    <input value={char.name} placeholder={"Nombre de tu personaje"} name={"name"}/><br/>
                    <select value={char.class} name={"class"} onChange={handleChangeClass}>
                        {classes.map((currentClass, i) => <option key={i}>
                            {currentClass.name}
                        </option>)}
                    </select>
                    <p><em>{thisClass.description}</em></p>
                    <select value={char.race} name={"race"} onChange={handleChangeRace}>
                        {races.map((race, i) => <option key={i}>
                            {race.name}
                        </option>)}
                    </select>
                    <p><em>{race.description}</em></p>
                    <div className={"p-character-creation__stats"}>
                        {Object.keys(race.baseStats).map((stat, i) => <div key={i}
                                                                           className={"p-character-creation__stat"}>
                            <h3>{stat.toUpperCase()}</h3>
                            <h3>{race.baseStats[stat]}</h3>
                        </div>)}
                    </div>
                    <button type={"submit"}>Crear personaje</button>
                </form>
            </div>
        </div>
    )
}