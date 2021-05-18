/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import './CharacterCreationPage.scss';
import {API} from "../../shared/const/api.const";

export function CharacterCreationPage() {
    const {edition} = useParams();

    const [char, setChar] = useState({
        class: {},
        race: {
            baseStats: [],
        },
    });

    const [backgroundImg, setBackgroundImg] = useState();

    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);

    const getFullInfo = () => {
        API.get(`api/class/${edition}`).then((res = {
            classes: []
        }) => {
            res.data.classes.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            setClasses(res.data.classes);
            char.class = res.data.classes[Math.floor(Math.random() * res.data.classes.length)];
        }).then(() => {
            API.get(`api/race/${edition}`).then((res = {
                races: []
            }) => {
                res.data.races.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                setRaces(res.data.races);
                setChar({
                    ...char,
                    'race': res.data.races[Math.floor(Math.random() * res.data.races.length)],
                });
            });
        });
    }

    const handleSubmit = () => {

    }

    const handleChange = (event) => {

        const currentVal = event.target.name;

        switch (currentVal) {
            case "race":
                setChar({
                    ...char,
                    "race": races[event.target.selectedIndex],
                });
                break;
            case "class":
                setChar({
                    ...char,
                    "class": classes[event.target.selectedIndex],
                });
                break;
            default:
                setChar({
                    ...char,
                    [event.target.name]: event.target.value,
                });
                break;
        }
    }

    const updateBackgroundImg = () => {
        if (char.class.img !== undefined) {
            setBackgroundImg(require("../../assets/img/class-icons/" + char.class.img).default);
        }
    }

    useEffect(getFullInfo, []);
    useEffect(updateBackgroundImg, [char.class]);

    return (
        <div className={"p-character-creation"}
             style={{backgroundImage: "url('" + backgroundImg + "')"}}
        >
            <div className={"container"}>
                <form className={"c-form"} onSubmit={handleSubmit} onChange={handleChange}>
                    <img src={"https://mural.uv.es/igilgir/images/AIDA/chema.jpg"} alt={"Retrato de " + char.name}
                         className={"p-character-creation__img"}/>
                    <input defaultValue={char.name} placeholder={"Nombre de tu personaje"} name={"name"}/>
                    <select value={char.class.name} name={"class"} onChange={handleChange}>
                        {classes.map((currentClass, i) => <option key={i}>
                            {currentClass.name}
                        </option>)}
                    </select>
                    {char.class.description && <p><em>{char.class.description}</em></p>}
                    <select value={char.race.name} name={"race"} onChange={handleChange}>
                        {races.map((race, i) => <option key={i}>
                            {race.name}
                        </option>)}
                    </select>
                    {char.race.description && <p><em>{char.race.description}</em></p>}
                    <div className={"p-character-creation__stats"}>
                        {Object.keys(char.race.baseStats).map((stat, i) => <div key={i}
                                                                                className={"p-character-creation__stat"}>
                            <h3>{stat.toUpperCase()}</h3>
                            <h3>{char.race.baseStats[stat]}</h3>
                        </div>)}
                    </div>
                    <button type={"submit"}>Crear personaje</button>
                </form>
            </div>
        </div>
    )
}