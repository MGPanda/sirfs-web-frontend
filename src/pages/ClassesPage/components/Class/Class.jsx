import React, {useState} from 'react';

import './Class.scss';
import {Skill} from "../Skill/Skill";

export function Class(props) {
    const [show, setShow] = useState(false);

    const thisClass = props.class;

    const handleClick = () => {
        show ? setShow(false) : setShow(true);
    }

    return (
        <div className={"c-class"}>
            <h1 className={"c-class__name"} onClick={handleClick}>{thisClass.name} ({thisClass.edition})</h1>
            {show && <div className={"content"}>
                <p className={"c-class__description"}><i>{thisClass.description}</i></p>
                <div className={"c-class__equippables"}>
                    <p><b>Objetos equipables:</b></p>
                    <ul>
                        {thisClass.equippables.map((equippable, i) => <li key={i}>{equippable}</li>)}
                    </ul>
                </div>
                {thisClass.extra && <p>
                    <b>{thisClass.extra.name}:</b> {thisClass.extra.description}
                </p>}
                <div className={"c-class__skillset"}>
                    <h2>Habilidades</h2>
                    {thisClass.skills.map((skill, i) => <div key={i} className={"c-class__level"}>
                        <h3>Nivel {i+1}</h3>
                        <div className={"c-class__skills"}>
                            <Skill skill={skill[0]}/>
                            <Skill skill={skill[1]}/>
                            <Skill skill={skill[2]}/>
                        </div>
                    </div>)}
                </div>
            </div>}
        </div>
    )
}