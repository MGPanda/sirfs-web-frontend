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

    const handleChange = (event) => {
        char[event.target.name] = event.target.value;
        console.log(char);
    }

    useEffect(getFullInfo, [edition]);

    return (
        <div className={"p-character-creation"}>
            <div className={"container"}>
                <form className={"c-form"} onSubmit={handleSubmit} onChange={handleChange}>
                    <input value={char.name} placeholder={"Nombre de tu personaje"} name={"name"}/><br/>
                    <select value={char.race} name={"class"}>
                        {classes.map((currentClass, i) => <option key={i}>
                            {currentClass.name}
                        </option>)}
                    </select><br/>
                    <select value={char.race} name={"race"}>
                        {races.map((race, i) => <option key={i}>
                            {race.name}
                        </option>)}
                    </select>
                    {/*{char.race && <div className={"c-race__base-stats"}>*/}
                    {/*    {Object.keys(races[char.race]).map((stat, i) => <div key={i} className={"c-race__stat"}>*/}
                    {/*        <h3>{stat.toUpperCase()}</h3>*/}
                    {/*        <h3>{races[char.race].baseStats[stat]}</h3>*/}
                    {/*    </div>)}*/}
                    {/*</div>}*/}
                </form>
            </div>
        </div>
    )
}