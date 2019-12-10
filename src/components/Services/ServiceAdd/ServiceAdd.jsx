import './style.scss';
import sprite from '../../../img/sprite.svg';
import { SERVICE, ADD_NEW } from '../../../_constants';

import { connect } from 'react-redux';
import { showPopup } from '../../../_actions';
import React from 'react';

const ServiceAdd = ({ showPopup, lang }) => {
  return (
    <li onClick={() => showPopup(SERVICE)} className="ServiceAdd">
      <div className="ServiceAdd__icon-box">
        <svg className="ServiceAdd__icon">
          <use xlinkHref={`${sprite}#icon-plus`} />
        </svg>
      </div>
      <p className="ServiceAdd__text">{ADD_NEW[lang]}</p>
    </li>
  );
};

const mapStateToProps = ({ lang }) => ({ lang });

export default connect(
  mapStateToProps,
  { showPopup }
)(ServiceAdd);
