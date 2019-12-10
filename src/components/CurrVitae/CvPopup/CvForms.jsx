import sprite from '../../../img/sprite.svg';
import checkIsIdFromDB from '../../../_helpers/checkIsIdFromDB';
import { connect } from 'react-redux';
import {
  showPopup,
  hidePopup,
  clearFromBlanks,
  addCvEntity,
  updateCvEntity,
  createForm
} from '../../../_actions';

import React, { useEffect } from 'react';

const CvForms = ({
  children,
  showPopup,
  hidePopup,
  clearFromBlanks,
  addCvEntity,
  updateCvEntity,
  cvLabels,
  cvData,
  auth,
  cvLabelIdx,
  createForm
}) => {
  const { formsKey, inputsMetadata } = cvLabels[cvLabelIdx];
  const formEntities = cvData[formsKey];
  const cv_id = cvData.id;
  const { api_token } = auth.user;

  useEffect(() => {
    if (formEntities.length === 0) {
      createForm({
        cvLabelIdx,
        cv_id,
        inputsMetadata,
        formsKey
      });
    }
  }, [
    formEntities.length,
    createForm,
    cvLabelIdx,
    cv_id,
    inputsMetadata,
    formsKey
  ]);

  const onCancel = () => {
    hidePopup();
    clearFromBlanks();
  };

  const onFormsPost = () => {
    const { alias } = auth.user;
    const forms = [];

    for (let item of cvLabels) {
      forms.push(...cvData[item.formsKey]);
    }

    const touchedForms = forms.filter(form => form.isTouched);
    let isPresentRequiredFields = true;
    touchedForms.forEach(form => {
      if (
        form.cvLabelIdx === 3 &&
        (form.date_start === '' || form.date_end === '')
      ) {
        alert(
          'Поля "Дата поступления" и "Дата окончания" в раздере "Образование" должны быть заполнены'
        );
        isPresentRequiredFields = false;
      }
    });

    if (!isPresentRequiredFields) return;

    touchedForms.forEach(form => {
      const { inputsMetadata, apiKey, apiPath } = cvLabels[form.cvLabelIdx];
      const cuttedForm = {};
      inputsMetadata.forEach(
        field => (cuttedForm[field.name] = form[field.name])
      );
      const formToPost = {
        api_token,
        id: form.id,
        form: cuttedForm,
        alias,
        cv_id,
        apiKey,
        apiPath
      };
      if (!checkIsIdFromDB(form.id)) {
        addCvEntity(formToPost);
      } else {
        updateCvEntity(formToPost);
      }
    });
    clearFromBlanks();
    hidePopup();
  };

  const onClickNav = direction => {
    let idx;
    if (direction === 'right') {
      const term = 1;
      idx = cvLabelIdx + term < cvLabels.length ? cvLabelIdx + term : 0;
    } else {
      const term = -1;
      idx = cvLabelIdx + term >= 0 ? cvLabelIdx + term : cvLabels.length - 1;
    }
    const popupToShow = cvLabels[idx].title;
    showPopup(popupToShow);
  };

  return (
    <>
      <div className="CvPopup__forms-container">{children}</div>

      <div className="CvPopup__footer">
        <button
          onClick={onCancel}
          className="CvPopup__btn CvPopup__btn-confirm-reset"
          type="reset"
        >
          <svg className="CvPopup__icon-cancel">
            <use xlinkHref={`${sprite}#icon-cancel`} />
          </svg>
        </button>
        <div className="CvPopup__nav-container">
          <div
            onClick={() => onClickNav('left')}
            className="CvPopup__btn-container"
          >
            <div className="CvPopup__btn CvPopup__btn-chevron" role="button">
              <svg className="CvPopup__icon-chevron">
                <use xlinkHref={`${sprite}#icon-contacts-chevron-left`} />
              </svg>
            </div>
            <span className="CvPopup__btn-description">Назад</span>
          </div>
          <div
            onClick={() => onClickNav('right')}
            className="CvPopup__btn-container"
          >
            <span className="CvPopup__btn-description">Вперед</span>
            <div className="CvPopup__btn CvPopup__btn-chevron" role="button">
              <svg className="CvPopup__icon-chevron">
                <use xlinkHref={`${sprite}#icon-contacts-chevron-right`} />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={() => onFormsPost()}
          className="CvPopup__btn CvPopup__btn-confirm-reset"
          type="submit"
        >
          <svg className="CvPopup__icon-confirm">
            <use xlinkHref={`${sprite}#icon-confirm`} />
          </svg>
        </button>
      </div>
    </>
  );
};

const mapStateToProps = ({ cvLabels, cvData, auth }) => ({
  cvLabels,
  cvData,
  auth
});

export default connect(
  mapStateToProps,
  {
    showPopup,
    hidePopup,
    clearFromBlanks,
    addCvEntity,
    updateCvEntity,
    createForm
  }
)(CvForms);
