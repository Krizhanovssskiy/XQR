

import React from 'react';
import { connect } from 'react-redux';
import { showPopup, hidePopup } from '../../../_actions';
import { Link } from 'react-router-dom';
import {POPUP_SUBSCRIPTION} from "../../../_constants";

const PopupMenu = ({showPopup, hidePopup}) => (

  <div className='Lending__PopupMenu'>
    <nav className='Lending__PopupMenu-nav'>
      <Link
        onClick={() => showPopup(POPUP_SUBSCRIPTION)}
        to='/'
      >
        Скачать
      </Link>
      <Link
        onClick={() => showPopup(POPUP_SUBSCRIPTION)}
        to='/'
      >
        Функции
      </Link>
      <Link
        onClick={() => showPopup(POPUP_SUBSCRIPTION)}
        to='/'
      >
        FAQ
      </Link>
    </nav>

    <div
      onClick={() => hidePopup()}
      className="Lending__closed-menu"
    />


  </div>
);

export default connect(
  null,
  {
    showPopup,
    hidePopup
  }
)(PopupMenu);