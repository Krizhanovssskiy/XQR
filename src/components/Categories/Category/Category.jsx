import './style.scss';
import imageUrl from '../../../_helpers/media';
import { CATEGORY } from '../../../_constants';

import { showPopup, setCurrentCategory } from '../../../_actions';
import React from 'react';
import { connect } from 'react-redux';

const Category = ({
  showPopup,
  id,
  name,
  price,
  image_url,
  setCurrentCategory
}) => {
  const imgSrc = image_url ? image_url : imageUrl;
  const onCategoryClick = () => {
    setCurrentCategory({ id });
    showPopup(CATEGORY);
  };
  return (
    <li onClick={onCategoryClick} className="Category">
      <div
        style={{ backgroundImage: `url(${imgSrc})` }}
        className="Category__image-box"
      />
      <div className="Category__title-box">
        <h2 className="Category__title">{name}</h2>
      </div>
    </li>
  );
};

export default connect(
  null,
  { showPopup, setCurrentCategory }
)(Category);
