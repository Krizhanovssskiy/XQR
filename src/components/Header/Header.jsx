import './header.scss';
import sprite from '../../img/sprite.svg';
import { QR_CODE, USER_MENU, QUIZZES_POPUP } from '../../_constants';
import { connect } from 'react-redux';

import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import UserNav from './UserNav';
import Backdrop from '../Dropdown/Backdrop';
import Dropdown from '../Dropdown';
import QrCodePopup from '../UserHeading/QrCodePopup/QrCodePopup';
import Quizzes from '../Quizzes';
// import Lang from './Lang';

const Header = ({ isChangePage, popupToShow }) => {
  return (
    <header className="Header">
      <div className="Header__shadow-box">
        <div className="Header__container container">
          <div className="Header__box Header__box--left">
            <Link to="/" className="Header__title">
              <svg className="Header__logo">
                <use xlinkHref={`${sprite}#icon-xqr`} />
              </svg>
            </Link>
            <Search />
          </div>

          <div className="Header__box Header__box--right">
            <UserNav isChangePage={isChangePage} />
            {/* <Lang /> */}
          </div>
          <Backdrop show={popupToShow === QR_CODE || popupToShow === QUIZZES_POPUP} />
          <Dropdown show={popupToShow === QR_CODE}>
            <QrCodePopup />
          </Dropdown>
          <Dropdown show={popupToShow === QUIZZES_POPUP} ch={QUIZZES_POPUP}>
            <Quizzes />
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = ({ isChangePage, popupToShow }) => ({
  isChangePage,
  popupToShow
});

export default connect(mapStateToProps)(Header);
