import './style.scss';
import sprite from '../../../img/sprite.svg';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { hidePopup, resetCurrentWork, alertSuccess } from '../../../_actions';

const WorkPopupView = ({
  portfolio,
  hidePopup,
  resetCurrentWork,
  alertSuccess
}) => {
  const linkRef = useRef(null);

  const { name, description, image_url, work_url } = portfolio.currentWork;

  const imageBox = image_url ? { backgroundImage: `url(${image_url})` } : null;

  const resetPopup = () => {
    hidePopup();
    resetCurrentWork();
  };

  const copyToClipboard = e => {
    linkRef.current.focus();
    linkRef.current.select();
    document.execCommand('copy');
    alertSuccess('This link is copied to the clipboard');
  };

  return (
    <div className="WorkPopupView">
      <div onClick={resetPopup} className="WorkPopupView__cancel-box">
        <svg className="WorkPopupView__icon-cancel">
          <use xlinkHref={`${sprite}#icon-cancel`} />
        </svg>
      </div>
      <div className="WorkPopupView__image-box" style={imageBox} />
      <footer className="WorkPopupView__footer">
        <div className="WorkPopupView__footer-container">
          <h1 className="WorkPopupView__footer-title">{name}</h1>
          {work_url && (
            <div className="WorkPopupView__footer-link-box">
              <input
                ref={linkRef}
                className="WorkPopupView__footer-link"
                value={work_url}
                readOnly
              />
              <svg
                onClick={copyToClipboard}
                className="WorkPopupView__icon-chain"
              >
                <use xlinkHref={`${sprite}#icon-chain`} />
              </svg>
            </div>
          )}
          <p className="WorkPopupView__footer-description">{description}</p>
        </div>
      </footer>
    </div>
  );
};

const mapStateToProps = ({ portfolio }) => ({ portfolio });

export default connect(
  mapStateToProps,
  { hidePopup, resetCurrentWork, alertSuccess }
)(WorkPopupView);
