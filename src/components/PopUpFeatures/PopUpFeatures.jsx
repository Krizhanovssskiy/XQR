import './style.scss';

import React, { Component } from 'react';

import { PhotoCameraBtn, Reset, CheckedIn } from '../Buttons';
import _ from 'underscore';

const check = arr => _.every(arr, num => num);

class PopUpFeature extends Component {
  state = {
    images: 'test',
    name: '',
    price: 0,
    description: 'Some description her'
  };

  recordingChanges = name => e => {
    e.preventDefault();
    let value = name === 'price' ? Number(e.target.value) : e.target.value;
    this.setState({
      [name]: value
    });
  };

  saveCardObj = () => {
    const {
      onclosePopUp,
      createServices,
      profile_id,
      alias,
      authUser
    } = this.props;
    const { api_token } = authUser;
    const flag = check(Object.values(this.state));
    if (flag && api_token) {
      createServices({
        api_token,
        alias,
        profile_id,
        ...this.state
      });
    }
    this.setState({
      images: '',
      name: '',
      price: 0.0,
      description: 'Some description her'
    });
    onclosePopUp();
  };

  reset = () => {
    this.props.onclosePopUp();
    this.setState({
      images: '',
      name: '',
      price: 0.0,
      description: 'Some description her'
    });
  };

  onInputChange = e => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file && file.type.match('image')) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({
          images: fileReader.result
        });
      };
      fileReader.readAsDataURL(file);
    }
  };

  render() {
    const { images, name, price, description } = this.state;
    const { enterName } = this.props;
    return (
      <div className="PopUpFeature__container">
        <div className="PopUpFeature__content-box">
          <div
            className={
              images
                ? 'PopUpFeature__img-container'
                : 'PopUpFeature__img-container  PopUpFeature__icon-border'
            }
          >
            <div className="PopUpFeature__img-box">
              <img
                className="PopUpFeature__img"
                // src={images || ""}
                // alt={name}
              />
            </div>
            <p className="PopUpFeature__text-text">{name}</p>
            <label htmlFor="file-input" className="PopUpFeature__added-file">
              <PhotoCameraBtn className="PopUpFeature__btn-icon-photo" />
              <input
                className="PopUpFeature__input-file"
                id="file-input"
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={e => this.onInputChange(e)}
              />
            </label>
            <p className="PopUpFeature__price-text">${price}</p>
          </div>
          <form onSubmit={this.saveCardObj} className="PopUpFeature__form-box">
            <input
              value={name}
              placeholder={enterName}
              onChange={this.recordingChanges('name')}
              className="PopUpFeature__form-input PopUpFeature__input-name-total"
              type="text"
            />

            <label className="PopUpFeature__form-input PopUpFeature__input-label-total PopUpFeature__input-name-total">
              $
              <input
                value={price || ''}
                onChange={this.recordingChanges('price')}
                className="PopUpFeature__input-name-total PopUpFeature__input-total"
                type="number"
              />
            </label>

            <input
              value={description}
              onChange={this.recordingChanges('description')}
              className="PopUpFeature__form-input PopUpFeature__input-description"
              type="text"
            />

            <div className="PopUpFeature__form-btn-box">
              <Reset
                onClick={this.reset}
                className="PopUpFeature__form-btn-reset"
              />
              <CheckedIn
                onClick={this.saveCardObj}
                className="PopUpFeature__form-btn-checked"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PopUpFeature;
