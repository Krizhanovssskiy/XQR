import './style.scss';
import imageUrl from '../../../_helpers/media';
import { SERVICEVIEW } from '../../../_constants';

import { showPopup, setCurrentService } from '../../../_actions';
import React from 'react';
import { connect } from 'react-redux';

const Service = ({
  showPopup,
  id,
  name,
  price,
  image_url,
  setCurrentService
}) => {
  const imgSrc = image_url ? image_url : imageUrl;
  const onServiceClick = () => {
    setCurrentService({ id });
    showPopup(SERVICEVIEW);
  };
  return (
    <li onClick={onServiceClick} className="Service">
      <div
        style={{ backgroundImage: `url(${imgSrc})` }}
        className="Service__image-box"
      />
      <div className="Service__title-box">
        <h2 className="Service__title">{name}</h2>
      </div>
      {price && (
        <div className="Service__price-box">
          <p className="Service__price">&#36;{price}</p>
        </div>
      )}
    </li>
  );
};

export default connect(
  null,
  { showPopup, setCurrentService }
)(Service);
