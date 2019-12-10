import './style.scss';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import UserLoginProfile from '../UserLoginProfile';

// import { PopUpNotifications } from './PopUpNotifications';

class UserNav extends Component {
  static propTypes = {
    isChangePage: propTypes.bool.isRequired
  };

  popUpUseBalance = () => {
    return (
      <ul className="UserNav__popUp-balance">
        <li>
          <div>
            <span>Ваш баланс </span>
            <span className="UserNav__pro-item">$0</span>
          </div>
        </li>
        <li>
          <div>
            <button className="UserNav__balance-btn UserNav__balance-btn--replenish">
              Пополнить
            </button>
            <button className="UserNav__balance-btn UserNav__balance-btn--derive">
              Вывести
            </button>
          </div>
        </li>
      </ul>
    );
  };

  render() {
    const { popupToShow } = this.props;
    return (
      <nav className="UserNav">
        {/*
                  <div className="UserNav__item-box UserNav__notific-bell">
                 <div className="UserNav__icon-box UserNav__icon-box--left">
                 /!*<span className="UserNav__icon-label">Notifications</span>*!/
                 /!*<svg className="UserNav__icon">*!/
                 /!*    <use xlinkHref={`${sprite}#icon-bell`}/>*!/
                 /!*</svg>*!/
                 </div>*

                 {
                 PopUpNotifications()
                 }
                 </div>
                 <div className="UserNav__item-box">
                 <NavLink className="UserNav__icon-box UserNav__icon-box--left" to={"/cart"}>
                 <svg className="UserNav__icon">
                 <use xlinkHref={`${sprite}#icon-cart`}/>
                 </svg>
                 </NavLink>
                 </div>
                 */}
        <UserLoginProfile clazz="UserNav" />

        {/* <Backdrop show={popupToShow === USER_MENU} /> */}
      </nav>
    );
  }
}

const mapStateToProps = ({ popupToShow }) => ({ popupToShow });

export default connect(mapStateToProps)(UserNav);
