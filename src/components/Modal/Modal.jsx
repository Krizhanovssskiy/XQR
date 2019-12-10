import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { hidePopup } from '../../_actions';

const modalRoot = document.getElementById('modal');

const Modal = ({ hidePopup, children }) => {
  return ReactDOM.createPortal(
    <div className="Modal">
      <div>{children}</div>
    </div>,
    modalRoot
  );
};

export default connect(
  null,
  { hidePopup }
)(Modal);

// const Modal = ({ hidePopup, children }) => {
//   return ReactDOM.createPortal(
//     <div onClick={hidePopup} className="Modal">
//       <div onClick={e => e.stopPropagation()}>{children}</div>
//     </div>,
//     modalRoot
//   );
// };
