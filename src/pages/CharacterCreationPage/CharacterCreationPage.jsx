import React, {useState} from 'react';
// import {useParams} from 'react-router-dom';

import './CharacterCreationPage.scss';

export function CharacterCreationPage(props) {
    // const {edition} = useParams();

    const [char] = useState({});

    const handleSubmit = () => {

    }

    return(
        <div className={"p-character-creation"}>
            <form onSubmit={handleSubmit}>
                <input value={char.name} placeholder={"Nombre de tu personaje"}/>
                <select value={char.race}>

                </select>
            </form>
        </div>
    )
}