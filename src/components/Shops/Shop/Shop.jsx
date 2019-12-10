import './style.scss';
import imageUrl from '../../../_helpers/media';
import { SHOPVIEW } from '../../../_constants';

import { showPopup, setCurrentShop } from '../../../_actions';
import React from 'react';
import { connect } from 'react-redux';

const Shop = ({
  showPopup,
  id,
  name,
  price,
  image_url,
                setCurrentShop
}) => {
  const imgSrc = image_url ? image_url : imageUrl;
  const onServiceClick = () => {
    setCurrentShop({ id });
    showPopup(SHOPVIEW);
  };
  return (
    <li onClick={ onServiceClick } className="Service">
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
  { showPopup, setCurrentShop }
)(Shop);
