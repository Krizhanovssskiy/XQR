import './style.scss';

import React from 'react';
import i18next from "i18next";

const PopUpAddedGoals = ({goalId,
                           valueInput,
                           onReset,
                           onChangeInput,
                           onSubmitData,
                           onDeleteData
                         }) => {
  return (
    <div className="PopUpAddedTask__popup-box">
      <form
        onSubmit={onSubmitData}
        className="PopUpAddedTask__popup-form">
        <input
          value={valueInput}
          onChange={onChangeInput}
          type="text"
          className="PopUpAddedTask__popup-input"
        />
        <div className="MainInfoContact__btns-block">
          <button
            onClick={onReset}
            className="MainInfoContact__popup-btn"
          >
            {i18next.t("cancel_btn")}
          </button>
          <button
            onClick={onSubmitData}
            className="MainInfoContact__popup-btn"
          >
            {i18next.t("save_btn")}
          </button>
        </div>
      </form>

      {
        goalId && (
          <span
            className='PopUpAddedTask__delete-btn'
            onClick={() => onDeleteData(goalId)}
          >
            {i18next.t("delete_btn")}
          </span>
        )
      }
    </div>
  )
};

export default PopUpAddedGoals;