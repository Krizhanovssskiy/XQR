import './styles.scss';
import { connect } from 'react-redux';
import { hidePopup } from '../../../_actions';
import React from 'react';

const Backdrop = ({ show, hidePopup }) => {
  const cssClasses = ['Backdrop', show ? 'Backdrop--open' : 'Backdrop--closed'];

  return (
    <div onClick={() => hidePopup()} className={cssClasses.join(' ')}></div>
  );
};

export default connect(
  null,
  { hidePopup }
)(Backdrop);
