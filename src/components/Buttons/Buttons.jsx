import './style.scss';

import React from 'react';
import sprite from '../../img/sprite.svg';

const Reset = ({ className, onClick }) => (
  <span onClick={onClick} className={`Button__none-background`}>
    <svg className={`Button__none-background-icon ${className}`}>
      <use xlinkHref={`${sprite}#icon-reset`} />
    </svg>
  </span>
);

const CheckedIn = ({ className, onClick }) => (
  <span onClick={onClick} className={`Button__none-background ${className}`}>
    <svg className="Button__none-background-icon">
      <use xlinkHref={`${sprite}#icon-checked-in`} />
    </svg>
  </span>
);

const PlusBtn = ({ className, onClick }) => (
  <span onClick={onClick} className={`Button__plus ${className}`}>
    <svg className="Button__plus-icon">
      <use xlinkHref={`${sprite}#icon-plus`} />
    </svg>
  </span>
);

const SocialNetworkBtn = ({ className, iconId, onClick }) => (
  <span onClick={onClick} className={`Button__social-network ${className}`}>
    <svg className="Button__social-network-icon">
      <use xlinkHref={`${sprite}#icon-${iconId}`} />
    </svg>
  </span>
);

const PlusCircle = ({ className, onClick }) => (
  <span onClick={onClick} className={`Button__plusCircle ${className}`}>
    <svg className="Button__plusCircle-icon">
      <use xlinkHref={`${sprite}#icon-plusCircle`} />
    </svg>
  </span>
);

const PhotoCameraBtn = ({ className, onClick }) => (
  <span onClick={onClick} className={`Button__photo-camera-box ${className}`}>
    <svg className="Button__photo-camera-icon">
      <use xlinkHref={`${sprite}#icon-photo-camera`} />
    </svg>
  </span>
);

export {
  Reset,
  CheckedIn,
  PlusBtn,
  SocialNetworkBtn,
  PlusCircle,
  PhotoCameraBtn
};
