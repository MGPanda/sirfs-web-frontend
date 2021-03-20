import React from 'react';

import './Skill.scss';

export function Skill(props) {
    const skill = props.skill;

    return(
        <div className={"c-skill"}>
            <p><b>{skill.name}</b></p>
            <p><i>{skill.subtitle}</i></p>
            <p>{skill.description}</p>
        </div>
    )
}