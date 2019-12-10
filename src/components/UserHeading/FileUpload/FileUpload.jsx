import './style.scss';
import sprite from '../../../img/sprite.svg';

import React from 'react';
import { connect } from 'react-redux';
import { showPopup } from '../../../_actions';


const FileUpload = ({
  isPlaying,
  onInputChange,
  onFileSubmit,
  videoRef,
  onVideoClick,
  videoImputRef,
  imageImputRef,
  showPopup,
  videos
}) => {
  const onInputClick = type => {
    showPopup('FileUpload');
    if (type === 'video') {
      videoImputRef.current.click();
    } else if (type === 'image') {
      imageImputRef.current.click();
    }
    if (isPlaying) {
      videoRef.current.pause();
    }
  };

  return (
    <form className="FileUpload" onSubmit={onFileSubmit}>
      <div className="FileUpload__popup-box-video">

        {!!videos.length && isPlaying && (
          <p className="FileUpload__popup-video-text" onClick={onVideoClick}>
            Пауза
          </p>
        )}
         {!!videos.length && !isPlaying && (
          <p className="FileUpload__popup-video-text" onClick={onVideoClick}>
            Смотреть
          </p>
        )}
        {!!videos.length && <p
          className="FileUpload__popup-video-text"
          onClick={() => onInputClick('video')}
        >
          Заменить
        </p>}
        {!videos.length && <p
          className="FileUpload__popup-video-text"
          style={{textAlign: 'center'}}
          onClick={() => onInputClick('video')}
        >
          Загрузить видео
        </p>}
      </div>
      <div className="FileUpload__btn" onClick={() => onInputClick('image')}>
        <svg className="FileUpload__popup-image-icon">
          <use xlinkHref={`${sprite}#icon-photo-camera`} />
        </svg>
        <p className="FileUpload__popup-image-text">Сменить фото</p>
      </div>
      <input
        ref={videoImputRef}
        className="FileUpload__input"
        type="file"
        accept=".mp4, .3gp, .mov"
        onChange={onInputChange}
        name="video"
      />
      <input
        ref={imageImputRef}
        className="FileUpload__input"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={onInputChange}
        name="image"
      />
    </form>
  );
};

const mapStateToProps = ({ videos }) => ({ videos });

export default connect(
  mapStateToProps,
  { showPopup }
)(FileUpload);
