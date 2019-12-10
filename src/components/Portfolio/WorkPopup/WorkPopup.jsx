import './style.scss';
import sprite from '../../../img/sprite.svg';
import { useInputs } from '../../../_helpers/customHooks';
import { connect } from 'react-redux';
import {
  hidePopup,
  createWork,
  updateWork,
  destroyWork,
  resetCurrentWork
} from '../../../_actions';
import React, { useRef } from 'react';
import PopupWrapper from '../../PopupWrapper';
import i18next from "i18next";

const WorkPopup = ({
  hidePopup,
  resetCurrentWork,
  createWork,
  updateWork,
  destroyWork,
  auth,
  profile,
  portfolio
}) => {
  const { api_token } = auth.user;
  const imageImputRef = useRef(null);
  const { alias } = profile;
  const { currentWork } = portfolio;
  currentWork.work_url = currentWork.work_url || '';

  const onSubmitWork = () => {
    const profile_id = profile.id;
    const { name, description, work_url, image } = inputs;

    if (!inputs._isTouched) {
      resetPopup();
      return;
    }

    const formData = new FormData();
    formData.append('profile_id', profile_id);
    formData.append('name', name);
    formData.append('description', description);
    if (work_url) formData.append('work_url', work_url);
    if (image) formData.append('image', image);
    if (currentWork.id) {
      updateWork({ api_token, alias, work_id: currentWork.id, formData });
    } else {
      createWork({ api_token, alias, formData });
    }
    resetPopup();
  };

  const onClickDeleteWork = () => {
    if (currentWork.id) {
      destroyWork({ api_token, alias, work_id: currentWork.id });
    }
    resetPopup();
  };
  const { onFormSubmit, onInputChange, inputs } = useInputs(onSubmitWork, {
    ...currentWork,
    image: '',
    imagePreviewUrl: ''
  });

  const resetPopup = () => {
    hidePopup();
    resetCurrentWork();
  };

  const renderPreview = () => {
    const { imagePreviewUrl } = inputs;
    let previewStyle, previewImageStyle;
    if (imagePreviewUrl) {
      previewStyle = { backgroundImage: `url(${imagePreviewUrl})` };
      previewImageStyle = { background: 'none' };
    } else if (currentWork.image_url) {
      previewStyle = { backgroundImage: `url(${currentWork.image_url})` };
      previewImageStyle = { background: 'none' };
    } else {
      previewStyle = null;
      previewImageStyle = null;
    }

    return (
      <div className="WorkPopup__preview" style={previewStyle}>
        <div className="WorkPopup__preview-image" style={previewImageStyle}>
          <div
            onClick={() => imageImputRef.current.click()}
            className="WorkPopup__icon-box"
          >
            <svg className="WorkPopup__icon-photo-camera">
              <use xlinkHref={`${sprite}#icon-photo-camera`} />
            </svg>

            <input
              ref={imageImputRef}
              className="WorkPopup__file-input"
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={onInputChange}
              name="image"
            />
          </div>
        </div>
        <div className="WorkPopup__text-box">
          <h4 className="WorkPopup__title">{inputs.name}</h4>
          <p className="WorkPopup__description">{inputs.description}</p>
        </div>
      </div>
    );
  };

  return (
    <PopupWrapper
      onFormSubmit={onFormSubmit}
      onClickDelete={onClickDeleteWork}
      onClickReset={resetPopup}
    >
      {renderPreview()}
      <div className="WorkPopup__inputs-container">
        <input
          onChange={onInputChange}
          value={inputs.name}
          type="text"
          name="name"
          className="WorkPopup__input"
          placeholder={i18next.t("name_work_placeholder")}
        />
        <input
          onChange={onInputChange}
          value={inputs.description}
          type="text"
          name="description"
          className="WorkPopup__input"
          placeholder={i18next.t("description")}
        />
        <input
          onChange={onInputChange}
          value={inputs.work_url}
          type="text"
          name="work_url"
          className="WorkPopup__input"
          placeholder={i18next.t("link_on_work")}
        />
      </div>
    </PopupWrapper>
  );
};

const mapStateToProps = ({ profile, auth, portfolio }) => ({
  profile,
  auth,
  portfolio
});

export default connect(
  mapStateToProps,
  { hidePopup, createWork, updateWork, destroyWork, resetCurrentWork }
)(WorkPopup);
