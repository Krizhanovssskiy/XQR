import './style.scss';

import React, { Fragment } from 'react';
import girl from "../../img/girl.png";
import sprite from "../../img/sprite.svg";

const VideoContainer = () => {

  return (
    <Fragment>
      <ul className="UserMainInfo__video-container">
        <li className="UserMainInfo__video-item">
          <div className="UserMainInfo__video-box UserMainInfo__video-box--active">
            <img src={girl} alt="" className="UserMainInfo__video-preview" />
            <svg className="UserMainInfo__icon-play">
              <use xlinkHref={`${sprite}#icon-triangle`} />
            </svg>
          </div>
          <p className="UserMainInfo__video-title">About me shortly</p>
        </li>
        <li className="UserMainInfo__video-item">
          <div className="UserMainInfo__video-box">
            <img src={girl} alt="" className="UserMainInfo__video-preview" />
            <svg className="UserMainInfo__icon-play">
              <use xlinkHref={`${sprite}#icon-triangle`} />
            </svg>
          </div>
          <p className="UserMainInfo__video-title">о моих услугах</p>
        </li>
        <li className="UserMainInfo__video-item">
          <div className="UserMainInfo__video-box">
            <img src={girl} alt="" className="UserMainInfo__video-preview" />
            <svg className="UserMainInfo__icon-play">
              <use xlinkHref={`${sprite}#icon-triangle`} />
            </svg>
          </div>
          <p className="UserMainInfo__video-title">о моих товарах</p>
        </li>
        <li className="UserMainInfo__video-item">
          <div className="UserMainInfo__video-box">
            <img src={girl} alt="" className="UserMainInfo__video-preview" />
            <svg className="UserMainInfo__icon-play">
              <use xlinkHref={`${sprite}#icon-triangle`} />
            </svg>
          </div>
          <p className="UserMainInfo__video-title">для фанатов</p>
        </li>
      </ul>
    </Fragment>
  )
};

export default VideoContainer;