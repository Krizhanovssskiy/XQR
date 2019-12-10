import './style.scss';
import sprite from '../../../img/sprite.svg';
import { pick } from 'underscore';
import { useInputs } from '../../../_helpers/customHooks';
import { connect } from 'react-redux';
import {
  hidePopup,
  createCategory,
  updateCategory,
  destroyCategory,
  resetCurrentCategory
} from '../../../_actions';
import React, { useRef } from 'react';
import PopupWrapper from '../../PopupWrapper/PopupWrapper';
import i18next from "i18next";

const PopupCategories = ({
  auth,
  profile,
  categories,
  hidePopup,
  createCategory,
  updateCategory,
  destroyCategory,
  resetCurrentCategory
}) => {
  const { api_token } = auth.user;
  const imageImputRef = useRef(null);
  const { alias } = profile;
  const { currentCategory } = categories;

  const onSubmitCategory = () => {
    if (!inputs._isTouched) {
      resetPopup();
      return;
    }

    const profile_id = profile.id;
    const { name, image } = inputs;

    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);
    if (currentCategory.id) {
      updateCategory({
        api_token,
        alias,
        category_id: currentCategory.id,
        formData
      });
    } else {
      formData.append('profile_id', profile_id);
      createCategory({ api_token, alias, formData });
    }
    resetPopup();
  };

  const onClickDeleteCategory = () => {
    if (currentCategory.id) {
      destroyCategory({ api_token, alias, category_id: currentCategory.id });
    }
    resetPopup();
  };

  const { onFormSubmit, onInputChange, inputs } = useInputs(onSubmitCategory, {
    ...pick(currentCategory, 'name'),
    image: '',
    imagePreviewUrl: ''
  });

  const resetPopup = () => {
    hidePopup();
    resetCurrentCategory();
  };

  const renderPreview = () => {
    const { imagePreviewUrl } = inputs;
    let previewStyle;
    if (imagePreviewUrl) {
      previewStyle = { backgroundImage: `url(${imagePreviewUrl})` };
    } else if (currentCategory.image_url) {
      previewStyle = { backgroundImage: `url(${currentCategory.image_url})` };
    } else {
      previewStyle = null;
    }

    return (
      <div className="PopupCategories__preview" style={previewStyle}>
        <div className="PopupCategories__text-box">
          <h4 className="PopupCategories__title">{inputs.name}</h4>
        </div>
        <div
          onClick={() => imageImputRef.current.click()}
          className="PopupCategories__icon-box"
        >
          <svg className="PopupCategories__icon-photo-camera">
            <use xlinkHref={`${sprite}#icon-photo-camera`} />
          </svg>

          <input
            ref={imageImputRef}
            className="PopupCategories__file-input"
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={onInputChange}
            name="image"
          />
        </div>
      </div>
    );
  };

  return (
    <PopupWrapper
      onFormSubmit={onFormSubmit}
      onClickDelete={onClickDeleteCategory}
      onClickReset={resetPopup}
    >
      {renderPreview()}
      <div className="PopupCategories__inputs-container">
        <input
          onChange={onInputChange}
          value={inputs.name}
          type="text"
          name="name"
          className="PopupCategories__input"
          placeholder={i18next.t("group_contact.name_categories")}
        />
      </div>
    </PopupWrapper>
  );
};

const mapStateToProps = ({ profile, auth, categories }) => ({
  profile,
  auth,
  categories
});

export default connect(
  mapStateToProps,
  {
    hidePopup,
    createCategory,
    updateCategory,
    destroyCategory,
    resetCurrentCategory
  }
)(PopupCategories);
