import React, {useState} from 'react';

import './CharacterCreationPage.scss';

export function CharacterCreationPage(props) {
    const [char, setChar] = useState({
        name: '',
        race: null,

    });

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