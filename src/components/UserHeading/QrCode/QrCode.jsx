import './style.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ShareAdd from '../ShareAdd';
import { QR_CODE } from '../../../_constants';
import { showPopup } from '../../../_actions';
import QrCodePopup from '../QrCodePopup/QrCodePopup';
import Modal from '../../Modal';

const QrCode = ({ profile, isChangePage, popupToShow, showPopup }) => {
  const { user_profile, qr_share, qr_add } = profile;
  const [qrShare, setQrshare] = useState('');
  const [qrAdd, setQradd] = useState('');
  const [flag, setFlag] = useState(true);

  const onClickCode = () => {
    // setFlag(flag => !flag);
    showPopup(QR_CODE);
  };

  useEffect(() => {
    if (qr_share) setQrshare(qr_share);
    if (qr_add) setQradd(qr_add);
    else setQradd(qr_share);
  }, [user_profile, qr_share, qr_add]);

  const classPrefix = isChangePage ? 'QrCode' : 'QrCode';
  return (
    <>
      <div onClick={onClickCode} className={`${classPrefix}`}>
        <div className={`${classPrefix}__box`}>
          {flag ? (
            <img
              src={qrShare}
              alt="qr-code"
              className={`${classPrefix}__code`}
            />
          ) : (
            <img src={qrAdd} alt="qr-code" className={`${classPrefix}__code`} />
          )}
        </div>
      </div>
      {/* {!isChangePage && qr_add && (
        <ShareAdd flag={flag} setQrCode={onClickCode} />
      )} */}
      {/* {popupToShow === QR_CODE && (
        <Modal>
          <QrCodePopup />
        </Modal>
      )} */}
    </>
  );
};

QrCode.propTypes = {
  code: PropTypes.string
};

const mapStateToProps = ({ alert, profile, isChangePage, popupToShow }) => ({
  alert,
  profile,
  isChangePage,
  popupToShow
});

export default connect(
  mapStateToProps,
  { showPopup }
)(QrCode);
