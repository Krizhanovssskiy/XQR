import './style.scss';
import sprite from '../../../img/sprite.svg';

import React from 'react';

const LangSkills = ({ data }) => {
  const renderIcons = stars => {
    const levels = [...Array(10)];
    return levels.map((item, i) => {
      const iconType = stars < i + 1 ? 'lang-circle' : 'lang-circle-filled';
      return (
        <div key={i} className="LangSkills__icon-box">
          <svg className="LangSkills__icon">
            <use xlinkHref={`${sprite}#icon-${iconType}`} />
          </svg>
        </div>
      );
    });
  };

  const langSkills = data.map(({ id, name, stars }) => {
    return (
      <li key={id} className="LangSkills__item">
        <div className="LangSkills__container">
          <h3 className="cv-name">{name}</h3>
          <div className="LangSkills__icons-box">{renderIcons(stars)}</div>
        </div>
        <div className="LangSkills__text-box">
          <h4 className="cv-subname">{stars * 10}&#37;</h4>
          {/* <h4 className="cv-subname">{description}</h4> */}
        </div>
      </li>
    );
  });
  return <ul className="LangSkills__list">{langSkills}</ul>;
};

export default LangSkills;
