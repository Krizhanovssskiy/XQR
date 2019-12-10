import './style.scss';

import React from 'react';
import { connect } from 'react-redux';
import { hidePopup } from "../../../../_actions";

const VideoPlayer = ({ hidePopup }) => {
  return (
    <div className='VideoPlayer'>
      <iframe
        type="text/html"
        src="http://www.youtube.com/embed/8wRnKhT1B0c?autoplay=1&origin=http://example.com"
        frameBorder="0"
        autoPlay={'1'}
      />

      <div
        onClick={() => hidePopup()}
        className="Lending__closed-menu"
      />
    </div>
  )
}

export default connect(
  null,
  {
    hidePopup
  }
)(VideoPlayer);
