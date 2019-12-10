import './styles.scss';
import sprite from '../../img/sprite.svg';
import qr_code from '../../img/qr-code-small_sm.png';
import { RATING, YES_NO } from '../../_constants';
import useTextInputs from '../../_helpers/useTextInputs';
import { connect } from 'react-redux';
import { hidePopup } from '../../_actions';
import React, { useState } from 'react';
import Quiz from './Quiz';

const Quizzes = ({ hidePopup }) => {
  const [editingMode, setEditingMode] = useState(true);

  const onToggleEditingMode = () => setEditingMode(editing => !editing);

  const onClickSave = () => {
    // hidePopup();
  };
  const INITIAL_INPUTS = { quizName: '', opinion: '' };

  const { onFormSubmit, onInputChange, inputs } = useTextInputs(
    onClickSave,
    INITIAL_INPUTS
  );

  // useEffect(() => {
  // Get Quizzes from server
  // });
  const config = {
    label: 'Перейти к просмотру',
    icon: (
      <svg className="Quizzes__icon-visible">
        <use xlinkHref={`${sprite}#icon-visible`} />
      </svg>
    ),
    title: (
      <input
        onChange={onInputChange}
        value={inputs.quizName}
        name="quizName"
        className="Quizzes__input"
        type="text"
        placeholder="Название опроса"
      />
    )
  };
  if (!editingMode) {
    config.label = 'Редактировать';
    config.icon = (
      <svg className="Quizzes__icon-pencil">
        <use xlinkHref={`${sprite}#icon-pencil`} />
      </svg>
    );
    config.title = <p className="Quizzes__title">{inputs.quizName}</p>;
  }

  return (
    <div className="Quizzes">
      <div className="Quizzes__view">
        <p onClick={onToggleEditingMode} className="Quizzes__view-label">
          {config.label}
          {config.icon}
        </p>
      </div>
      <div className="Quizzes__input-box">{config.title}</div>
      <div className="Quizzes__questions-container">
        <Quiz kind={RATING} editingMode={editingMode} />
        <Quiz kind={YES_NO} editingMode={editingMode} />
      </div>
      {editingMode && (
        <div className="Quizzes__add-container">
          <div className="Quizzes__add-box">
            <svg className="Quizzes__icon-sign">
              <use xlinkHref={`${sprite}#icon-plus_in_circle`} />
            </svg>
            <p className="Quizzes__add-label">Добавить вопрос</p>
          </div>
          <div className="Quizzes__add-box">
            <svg className="Quizzes__icon-sign">
              <use xlinkHref={`${sprite}#icon-plus_in_circle`} />
            </svg>
            <p className="Quizzes__add-label">Добавить рейтинг</p>
          </div>
        </div>
      )}

      <div className="Quizzes__text-aria-box">
        <label
          htmlFor="Quizzes__text-aria"
          className="Quizzes__text-aria-label"
        >
          Нам важно Ваше мнение
        </label>
        <textarea
          onChange={onInputChange}
          value={inputs.opinion}
          className="Quizzes__text-aria"
          name="opinion"
          id="Quizzes__text-aria"
          cols="30"
          rows="5"
        ></textarea>
      </div>

      <div className="Quizzes__buttons-box">
        <button onClick={hidePopup} className="Quizzes__button">
          Отменить
        </button>
        <button
          onClick={onFormSubmit}
          className="Quizzes__button Quizzes__button--inverse"
        >
          Сохранить
        </button>
      </div>
      <div className="Quizzes__share-box">
        <button className="Quizzes__qr-container">
          <div
            className="Quizzes__icon-download-box"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${qr_code})`
            }}
          >
            <svg className="Quizzes__icon-download">
              <use xlinkHref={`${sprite}#icon-download`} />
            </svg>
          </div>
          <span className="Quizzes__share-label">Сохранить qr</span>
        </button>
        <button className="Quizzes__button Quizzes__button--secondary">
          <span className="Quizzes__share-label">Ссылка</span>
          <svg className="Quizzes__icon-link">
            <use xlinkHref={`${sprite}#icon-link`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default connect(
  null,
  {
    hidePopup
  }
)(Quizzes);
