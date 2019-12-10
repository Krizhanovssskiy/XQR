
import React from 'react';
import sprite from "../../img/sprite.svg";
import i18next from 'i18next';

const PopUpAddedContacts = ({placeholder, contactId, valueInput, onSubmitData, onChangeInput, onDeleteContact, onReset}) => {
  return (
    <div className="MainInfoContact__popup-box">
      {
        contactId && (
          <button
            className='MainInfoContact__popup-delete-contact'
            onClick={() => onDeleteContact(contactId)}
          >
            <svg className='MainInfoContact__popup-delete-contact__icon'>
              <use xlinkHref={`${sprite}#icon-reset`} />
            </svg>
            {i18next.t("delete_btn")}
          </button>
        )
      }
      <form
        onSubmit={onSubmitData}
        className="MainInfoContact__popup-form-website">
        <input
          placeholder={placeholder}
          onChange={onChangeInput}
          value={valueInput || ""}
          type="text"
          className="MainInfoContact__popup-input"
        />
      </form>
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
    </div>
  )
};

export default PopUpAddedContacts;