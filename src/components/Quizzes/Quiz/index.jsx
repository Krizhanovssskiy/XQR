import './styles.scss';
import sprite from '../../../img/sprite.svg';
import { RATING, YES_NO } from '../../../_constants';

import React from 'react';

const Quiz = ({ kind, editingMode, idx, stars, setStars, yesNo, setYesNo }) => {
  const renderYesNo = () => (
    <div className="Quiz__radio-container-yes-no">
      <div className="Quiz__radio-group">
        <input
          type="radio"
          className="Quiz__radio-input"
          id="Yes"
          checked={yesNo === 'Yes'}
          // onChange={() => setYesNo('Yes')}
        />
        <label htmlFor="Yes" className="Quiz__radio-label">
          <span className="Quiz__radio-btn"></span>
          <p className="Quiz__radio-group-text">Да</p>
        </label>
      </div>

      <div className="Quiz__radio-group">
        <input
          type="radio"
          className="Quiz__radio-input"
          id="No"
          checked={yesNo === 'No'}
          // onChange={() => setYesNo('No')}
        />
        <label htmlFor="No" className="Quiz__radio-label">
          <span className="Quiz__radio-btn"></span>
          <p className="Quiz__radio-group-text">Нет</p>
        </label>
      </div>
    </div>
  );

  const renderRating = () => {
    const levels = [...Array(5)];
    return (
      <div className="Quiz__radio-container-stars">
        {levels.map((item, index) => (
          <div key={index} className="Quiz__radio-group-star">
            <input
              type="radio"
              className="Quiz__radio-input"
              id={index}
              checked={stars === index}
              // onChange={() => setStars(index)}
            />
            <label htmlFor={index} className="Quiz__radio-label">
              <svg className="Quiz__icon-star">
                <use xlinkHref={`${sprite}#icon-star-cv`} />
              </svg>
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="Quiz">
      <div className="Quiz__title-box">
        {editingMode ? (
          <input
            className="Quizzes__input"
            type="text"
            placeholder="Вопрос номер 1"
            name={idx}
          />
        ) : (
          <p className="Quizzes__title">Вопрос номер 1</p>
        )}
        {editingMode && (
          <svg className="Quizzes__icon-sign">
            <use xlinkHref={`${sprite}#icon-minus_in_circle`} />
          </svg>
        )}
      </div>
      {kind === RATING && renderRating()}
      {kind === YES_NO && renderYesNo()}
    </div>
  );
};

export default Quiz;
