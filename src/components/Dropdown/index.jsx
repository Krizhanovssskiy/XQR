import './styles.scss';
import { connect } from 'react-redux';
import { hidePopup } from '../../_actions';
import { USER_MENU } from '../../_constants';
import { CSSTransition } from 'react-transition-group';
import { useSwipeable } from 'react-swipeable';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';

import React, { useRef, useEffect } from 'react';

const Dropdown = ({ children, popupToShow, show, hidePopup, classPostfix, ch }) => {
  const dropdownRef = useRef(null);
  const cssClasses = [
    'Dropdown',
    classPostfix === USER_MENU ? 'Dropdown__userMenu' : ''
  ];
  useEffect(() => {
    if (show) {
      disableBodyScroll(dropdownRef.current);
    } else if (!popupToShow) {
      // enableBodyScroll();
      clearAllBodyScrollLocks();

    }
    // return () => {
    // };
  }, [show]);

  const handlers = useSwipeable({
    onSwipedUp: () => hidePopup(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const animationTiming = {
    enter: 500,
    exit: 300
};


  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      timeout={animationTiming}
      in={show}
      classNames="fade-slide"
    >
      <div
        {...handlers}
        onClick={e => e.stopPropagation()}
        className={cssClasses.join(' ')}
      >
        <div ref={dropdownRef} className="Dropdown__container">
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({popupToShow}) => ({popupToShow});

export default connect(
  mapStateToProps,
  { hidePopup }
)(Dropdown);
