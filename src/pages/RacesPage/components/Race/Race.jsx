import React, {useState} from 'react';

import './Race.scss';

export function Race(props) {
    const [show, setShow] = useState(false);

    const thisRace = props.race;

    const handleClick = () => {
        show ? setShow(false) : setShow(true);
    }

    return (
        <div className={"c-race"}>
            <h1 onClick={handleClick}>{thisRace.name} ({thisRace.edition})</h1>
            {show && <div className={"content"}>
                <p className={"c-race__description"}><i>{thisRace.description}</i></p>
                <h2 className={"c-race__stats-title"}>Estadísticas base</h2>
                <div className={"c-race__base-stats"}>
                    {Object.keys(thisRace.baseStats).map((stat, i) => <div key={i} className={"c-race__stat"}>
                        <h3>{stat.toUpperCase()}</h3>
                        <h3>{thisRace.baseStats[stat]}</h3>
                    </div>)}
                </div>
                {thisRace.skills && <div className={"c-race__skills"}>
                    <h2 className={"c-race__skills-title"}>Bonificación racial</h2>
                    {thisRace.skills.map((skill, i) => <div key={i} className={"c-race__skill"}>
                        <p><b>{skill.name}</b></p>
                        <p>{skill.description}</p>
                    </div>)}
                </div>}

                {thisRace.draconianSkills.positive && <div className={"c-race__skills"}>
                    <h2 className={"c-race__skills-title"}>Bonificación racial</h2>
                    {thisRace.draconianSkills.positive.map((skill, i) => <div key={i} className={"c-race__skill"}>
                        <p><b>{skill.name}</b></p>
                        <p>{skill.description}</p>
                    </div>)}
                    <h2 className={"c-race__skills-title"}>Penalización racial</h2>
                    {thisRace.draconianSkills.negative.map((skill, i) => <div key={i} className={"c-race__skill"}>
                        <p><b>{skill.name}</b></p>
                        <p>{skill.description}</p>
                    </div>)}
                </div>}
            </div>}
        </div>
    )
}