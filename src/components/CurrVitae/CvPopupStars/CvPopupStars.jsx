import './style.scss';
import sprite from '../../../img/sprite.svg';

import React from 'react';

const Star = ({ starNumber, onChange, name, value }) => {
  // console.log
  const startClassName = starNumber > value ? 'Star__icon' : 'Star__icon--filled'
  return (
    <div
      onClick={() => onChange({ target: { name, value: starNumber } })}
      className="Star__box"
    >
      <svg className={startClassName}>
        <use xlinkHref={`${sprite}#icon-star-cv`} />
      </svg>
    </div>
  );
};

const CvPopupStars = ({ type, name, onChange, value }) => {
  const amount = 10;
  const levels = [...Array(amount)];
  return (
    <div className="CvPopupStars">
      <input
        className="CvPopupStars__input"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />

      {levels.map((level, i) => (
        <Star
          key={i}
          starNumber={i + 1}
          onChange={onChange}
          name={name}
          value={value}
        />
      ))}
    </div>
  );
};

export default CvPopupStars;
