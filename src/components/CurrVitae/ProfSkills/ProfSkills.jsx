import './style.scss';
import sprite from '../../../img/sprite.svg';

import React from 'react';

const ProfSkills = ({ data }) => {
  const profSkills = data.map(({ id, name, stars }) => {
    // const iconLvl = Math.ceil(stars / 10) * 10;
    const iconLvl = stars * 10;
    const percentSkill = stars * 10;
    return (
      <li key={id} className="ProfSkills__item">
        <div className="ProfSkills__text-box">
          <h3 className="cv-name">{name}</h3>
          <h4 className="cv-subname">{percentSkill}&#37;</h4>
        </div>
        <svg className="ProfSkills__icon">
          <use xlinkHref={`${sprite}#icon-arc-${iconLvl}`} />
        </svg>
      </li>
    );
  });
  return <ul className="ProfSkills__list">{profSkills}</ul>;
};

export default ProfSkills;
