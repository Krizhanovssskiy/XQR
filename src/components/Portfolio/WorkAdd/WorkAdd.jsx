import './style.scss';
import sprite from '../../../img/sprite.svg';
import { WORK, ADD_NEW } from '../../../_constants';

import { connect } from 'react-redux';
import { showPopup } from '../../../_actions';
import React from 'react';

const WorkAdd = ({ showPopup, lang }) => {
  return (
    <li onClick={() => showPopup(WORK)} className="WorkAdd">
      <div className="WorkAdd__icon-box">
        <svg className="WorkAdd__icon">
          <use xlinkHref={`${sprite}#icon-plus`} />
        </svg>
      </div>
      <p className="WorkAdd__text">{ADD_NEW[lang]}</p>
    </li>
  );
};

const mapStateToProps = ({ lang }) => ({ lang });

export default connect(
  mapStateToProps,
  { showPopup }
)(WorkAdd);
