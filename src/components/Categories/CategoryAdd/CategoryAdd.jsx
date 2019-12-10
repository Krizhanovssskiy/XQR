import './style.scss';
import sprite from '../../../img/sprite.svg';
import { CATEGORY, ADD_NEW } from '../../../_constants';

import { connect } from 'react-redux';
import { showPopup } from '../../../_actions';
import React from 'react';

const CategoryAdd = ({ showPopup, lang }) => {
  return (
    <li onClick={() => showPopup(CATEGORY)} className="CategoryAdd">
      <div className="CategoryAdd__icon-box">
        <svg className="CategoryAdd__icon">
          <use xlinkHref={`${sprite}#icon-plus`} />
        </svg>
      </div>
      <p className="CategoryAdd__text">{ADD_NEW[lang]}</p>
    </li>
  );
};

const mapStateToProps = ({ lang }) => ({ lang });

export default connect(
  mapStateToProps,
  { showPopup }
)(CategoryAdd);
