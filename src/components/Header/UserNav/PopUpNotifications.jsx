
import date from '../../../img/date.png';
import girl from '../../../img/girl.png';

import React from 'react';


export const PopUpNotifications = () => {

  const notification = () => {
    return (
      <li className='UserNav__Notifications__list-item'>
        <div className="UserNav__Notifications__img-box">
          <img src={girl} alt='girl'/>
        </div>
        <div className="UserNav__Notifications__info-box">
          <p>
            <span>Konstancia Algremonto</span> added you to his(her) contacts
          </p>
          <div className='UserNav__Notifications__date-box'>
            <img src={date} alt="date"/>
            <span>
              20 june at 20:52
            </span>
          </div>
        </div>
      </li>
    )
  };

  return (
    <ul className='UserNav__Notifications'>
      {notification()}
      {notification()}
      {notification()}
      {notification()}
      {notification()}
    </ul>
  )
};
