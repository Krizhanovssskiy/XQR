import './style.scss';

import React from 'react';
import { connect } from 'react-redux';
import { showPopup } from '../../../_actions';
import Modal from '../../Modal/Modal';
import CvPopup from '../CvPopup/CvPopup';

const CvSection = ({ title, showPopup, popupToShow, children, isChangePage }) => {
  const onShowPopup = () => {
    showPopup(title);
  };

  return (
    <>
      <div onClick={isChangePage ? onShowPopup : null} className="CvSection">
        <h2 className="cv-header">{title}</h2>
        {children}
      </div>
      {popupToShow === title && (
        <Modal>
          <CvPopup />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = ({ popupToShow, isChangePage }) => ({ popupToShow, isChangePage });

export default connect(
  mapStateToProps,
  { showPopup }
)(CvSection);
