import './style.scss';
import { useOnWheel } from '../../_helpers/customHooks';

import React from 'react';

const ScrollingList = ({ children }) => {

  const { wheeledElement, onMouseWheel } = useOnWheel();

  return (
    <ul ref={wheeledElement} onWheel={onMouseWheel} className="ScrollingList">
      {children}
    </ul>
  );
};

export default ScrollingList;
