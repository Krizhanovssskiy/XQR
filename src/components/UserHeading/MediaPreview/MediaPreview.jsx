import './style.scss';
import sprite from '../../../img/sprite.svg';
import React, { useRef, useEffect } from 'react';

const MediaPreview = ({
  imagePreviewUrl,
  videoPreviewUrl,
  onFileCancel,
  onFileSubmit
}) => {
  const myRef = useRef(null);

  useEffect(() => {
    if (imagePreviewUrl) {
      myRef.current.appendChild(imagePreviewUrl);
    }
  }, [imagePreviewUrl]);

  return (
    <div className="MediaPreview">
      <div
        ref={myRef}
        className="MediaPreview__circle"
        style={{ backgroundImage: `url(${imagePreviewUrl})` }}
      >
        {videoPreviewUrl && (
          <video className="MediaPreview__video" loop autoPlay controls={true}>
            <source src={videoPreviewUrl} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="MediaPreview__controls">
        <div
          className="MediaPreview__icon-box"
          role="button"
          onClick={onFileCancel}
        >
          <svg className="MediaPreview__icon--cancel">
            <use xlinkHref={`${sprite}#icon-cancel`} />
          </svg>
        </div>
        <div
          className="MediaPreview__icon-box"
          role="button"
          onClick={onFileSubmit}
        >
          <svg className="MediaPreview__icon--confirm">
            <use xlinkHref={`${sprite}#icon-confirm`} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MediaPreview;
