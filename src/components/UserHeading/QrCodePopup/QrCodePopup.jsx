import './style.scss';
import sprite from '../../../img/sprite.svg';
import { hidePopup } from '../../../_actions';
import { useSwipeable } from 'react-swipeable';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { last } from 'underscore';
import getPhoto from '../../../_src/lib/api/getPhoto';
import download from 'downloadjs';

const parsePhotoName = (photo_url, flag) => last(photo_url.split(`/${flag}/`));
const is_iphone = navigator.userAgent.match(/iPhone|iPad|iPod/i);

const QrCodePopup = ({ qr_share, qr_add, hidePopup }) => {
  const [qr, setQr] = useState(true);

  const onCodeClick = () => {
    if (qr_add) {
      setQr(prevState => !prevState);
    }
  };

  const savePhoto = async () => {
    const directory = qr ? 'qr_share' : 'qr_add';
    const file = qr ? qr_share : qr_add;
    const fileName = parsePhotoName(file, directory);
    if (!is_iphone) {
      const data = await getPhoto(directory, fileName);
      return download(data, `${directory}.png`, 'image/png');
    }
    let link = document.createElement('a');
    link.download = `${directory}.png`;
    link.href =
      'https://evgen.xcard.one/file/directory/' +
      directory +
      '/name/' +
      fileName +
      '/download';
    link.click();
  };

  const text = {
    share: 'Отсканируйте QR-код, чтобы перейти на эту страницу в браузере',
    add: 'Отсканируйте QR-код, чтобы сохранить в контакты на телефоне'
  };

  const handlers = useSwipeable({
    onSwipedRight: () => onCodeClick(),
    onSwipedLeft: () => onCodeClick(),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="QrCodePopup">
      <svg onClick={hidePopup} className="QrCodePopup__icon-close">
        <use href={`${sprite}#icon-close`} />
      </svg>

      <div className="QrCodePopup__text-box">
        <p className="QrCodePopup__text">{qr ? text.share : text.add}</p>
      </div>
      <div className="QrCodePopup__qr-cloud">
        <div className="QrCodePopup__qr-shadow"></div>
        <div
          {...handlers}
          onClick={onCodeClick}
          className="QrCodePopup__qr-container"
        >
          <div className="QrCodePopup__qr-box">
            <img
              src={qr ? qr_share : qr_add}
              alt="qr-code"
              className="QrCodePopup__qr"
            />
          </div>
        </div>
      </div>

      <button onClick={savePhoto} className="QrCodePopup__btn-download">
        Скачать qr-код
      </button>
    </div>
  );
};

const mapStateToProps = ({ profile }) => ({
  qr_share: profile.qr_share,
  qr_add: profile.qr_add
});

export default connect(
  mapStateToProps,
  { hidePopup }
)(QrCodePopup);
