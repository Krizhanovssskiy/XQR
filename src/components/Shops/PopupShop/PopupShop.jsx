import './style.scss';
import sprite from '../../../img/sprite.svg';
import { validatePrice } from '../../../_helpers/formValidation';

import { pick } from 'underscore';
import { useInputs } from '../../../_helpers/customHooks';
import { connect } from 'react-redux';
import {
  hidePopup,
  createShop,
  updateShop,
  destroyShop,
  resetCurrentShop,
  alertError
} from '../../../_actions';
import React, { useRef } from 'react';
import PopupWrapper from '../../PopupWrapper/PopupWrapper';
import i18next from "i18next";

const PopupShop = ({
  auth,
  profile,
  shops,
  alert,
  hidePopup,
   createShop,
   updateShop,
   destroyShop,
   resetCurrentShop,
  alertError
}) => {
  const { api_token } = auth.user;
  const imageImputRef = useRef(null);
  const { alias } = profile;
  const { currentShop } = shops;

  const onSubmitShop = () => {
    if (!inputs._isTouched) {
      resetPopup();
      return;
    }

    const profile_id = profile.id;
    const { name, price, description, image } = inputs;

    if (!validatePrice(price) && price !== '') {
      alertError(i18next.t("error_price_format_invalid"));
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (price) formData.append('price', price);
    formData.append('description', description);
    if (image) formData.append('image', image);
    if (currentShop.id) {
      updateShop({
        api_token,
        alias,
        product_id: currentShop.id,
        formData
      });
    } else {
      formData.append('profile_id', profile_id);
      createShop({ api_token, alias, formData });
    }
    resetPopup();
  };

  const onClickDeleteService = () => {
    if (currentShop.id) {
      destroyShop({ api_token, alias, product_id: currentShop.id });
    }
    resetPopup();
  };

  const { onFormSubmit, onInputChange, inputs } = useInputs(onSubmitShop, {
    ...pick(currentShop, 'name', 'price', 'description'),
    image: '',
    imagePreviewUrl: ''
  });

  const resetPopup = () => {
    hidePopup();
    resetCurrentShop();
  };

  const renderPreview = () => {
    const { imagePreviewUrl } = inputs;
    let previewStyle;
    if (imagePreviewUrl) {
      previewStyle = { backgroundImage: `url(${imagePreviewUrl})` };
    } else if (currentShop.image_url) {
      previewStyle = { backgroundImage: `url(${currentShop.image_url})` };
    } else {
      previewStyle = null;
    }

    return (
      <div className="PopupServices__preview" style={previewStyle}>
        <div className="PopupServices__text-box">
          <h4 className="PopupServices__title">{inputs.name}</h4>
        </div>
        {inputs.price && (
          <div className="PopupServices__price-box">
            <p className="PopupServices__price">{inputs.price}</p>
          </div>
        )}
        <div
          onClick={() => imageImputRef.current.click()}
          className="PopupServices__icon-box"
        >
          <svg className="PopupServices__icon-photo-camera">
            <use xlinkHref={`${sprite}#icon-photo-camera`} />
          </svg>

          <input
            ref={imageImputRef}
            className="PopupServices__file-input"
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
      onClickDelete={onClickDeleteService}
      onClickReset={resetPopup}
    >
      {renderPreview()}
      <div className="PopupServices__inputs-container">
        <input
          onChange={onInputChange}
          value={inputs.name}
          type="text"
          name="name"
          className="PopupServices__input"
          placeholder={i18next.t("popup_services.name_placeholder")}
          required
        />
        <p className="PopupServices__input">
          &#36; &nbsp;
          <input
            onChange={onInputChange}
            value={inputs.price}
            type="number"
            step="0.01"
            name="price"
            className="PopupServices__input PopupServices__input-price"
            placeholder={i18next.t("price")}
          />
        </p>
        <input
          onChange={onInputChange}
          value={inputs.description}
          type="text"
          name="description"
          className="PopupServices__input"
          placeholder={i18next.t("description")}
        />
        {alert.message && (
          <p className="PopupServices__error">{alert.message}</p>
        )}
      </div>
    </PopupWrapper>
  );
};

const mapStateToProps = ({ profile, auth, shops, alert }) => ({
  profile,
  auth,
  shops,
  alert
});

export default connect(
  mapStateToProps,
  {
    hidePopup,
    createShop,
    updateShop,
    destroyShop,
    resetCurrentShop,
    alertError
  }
)(PopupShop);
