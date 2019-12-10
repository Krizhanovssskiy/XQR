import sprite from '../../../img/sprite.svg';
import checkIsIdFromDB from '../../../_helpers/checkIsIdFromDB';

import { connect } from 'react-redux';
import {
  deleteCvEntity,
  createForm,
  removeForm,
  onFormInputChange
} from '../../../_actions';

import React from 'react';
import CvPopupStars from '../CvPopupStars/CvPopupStars';
import i18next from "i18next";

const CvForm = ({
  cvLabelIdx,
  auth,
  cvLabels,
  entity,
  lastForm,
  deleteCvEntity,
  createForm,
  removeForm,
  cvData,
  onFormInputChange
}) => {
  const { inputsMetadata, apiPath, apiKey, formsKey } = cvLabels[cvLabelIdx];
  const cv_id = cvData.id;
  const { api_token } = auth.user;


  const onInputChange = e => {
    const { name, value } = e.target;
    onFormInputChange({ formsKey, entity_id: entity.id, name, value });
  };

  const onDeleteEntity = id => {
    const { alias } = auth.user;
    if (checkIsIdFromDB(id)) {
      deleteCvEntity({ api_token, alias, cv_id: cvData.id, id, apiPath, apiKey, formsKey });
    } else {
      removeForm({ formsKey, id });
    }
  };

  const onCreateForm = () => {
    createForm({ cv_id, inputsMetadata, formsKey, cvLabelIdx });
  };

  const renderInputs = inputsMetadata => {
    return (
      <div className="CvPopup__inputs-box">
        {inputsMetadata.map(({ placeholder, name, type }, i) =>
          name === 'stars' ? (
            <CvPopupStars
              key={name}
              type={type}
              name={name}
              onChange={onInputChange}
              value={entity[name]}
            />
          ) : (
            <input
              key={name}
              type={type}
              name={name}
              onChange={onInputChange}
              value={entity[name]}
              placeholder={placeholder}
              className="CvPopup__input"
            />
          )
        )}
      </div>
    );
  };
  return (
    <>
      <form className="CvPopup__form">
        {renderInputs(inputsMetadata)}
        <div
          onClick={() => onDeleteEntity(entity.id)}
          role="button"
          className="CvPopup__btn-delete"
        >
          <svg className="CvPopup__icon-delete">
            <use xlinkHref={`${sprite}#icon-delete`} />
          </svg>
          <span className="CvPopup__text-delete">{i18next.t("delete_btn")}</span>
        </div>
      </form>
      {lastForm && (
        <div
          onClick={onCreateForm}
          role="button"
          className="CvPopup__btn-container-add"
        >
          <div className="CvPopup__btn CvPopup__btn-plus">
            <svg className="CvPopup__icon-plus">
              <use xlinkHref={`${sprite}#icon-plus`} />
            </svg>
          </div>
          <span className="CvPopup__btn-description">{i18next.t("add_more")}</span>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ cvData, cvLabels, auth }) => ({
  cvData,
  cvLabels,
  auth
});

export default connect(
  mapStateToProps,
  {
    deleteCvEntity,
    createForm,
    removeForm,
    onFormInputChange
  }
)(CvForm);
