import React from 'react';

import './Class.scss';

export function Class(props) {
    const thisClass = props.class;

    return(
        <div className={"c-class"}>
            <h1 className={"c-class__name"}>{thisClass.name} ({thisClass.edition})</h1>
            <p className={"c-class__description"}><i>{thisClass.description}</i></p>
            <div className={"c-class__equippables"}>
                <p><b>Objetos equipables:</b></p>
                <ul>
                    {thisClass.equippables.map((equippable, i) => <li key={i}>{equippable}</li>)}
                </ul>
            </div>
            <div className={"c-class__skills"}>
                {thisClass.skills.flat(1).map((skill, i) => <div key={i} className={"c-class__skill"}>
                    <p><b>{skill.name}</b></p>
                    <p><i>{skill.subtitle}</i></p>
                    <p>{skill.description}</p>
                </div>)}
            </div>
        </div>
    )
}