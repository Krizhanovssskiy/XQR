import './style.scss';

import React from 'react';

const RegLog = props => {
  return (
    <div className="RegLog">
      <h1 className="RegLog__header">{props.header}</h1>
      {props.children}
    </div>
  );
};

export default RegLog;
