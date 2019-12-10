import React from 'react';

const ItemSlider = ({item:{imgUrl, headerText, text}}) => {
  return (
    <li>
      <p className='TrainingWindows__header-text'>
        {headerText}
      </p>
      <div className="TrainingWindows__image-box">
        <img src={imgUrl} alt=""/>
      </div>
      <p className='TrainingWindows__text'>
        {text}
      </p>
    </li>
  )
};

export default ItemSlider;