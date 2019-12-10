import React from 'react';

const ShareAdd = ({ setQrCode, flag }) => {
  const btnLeftClass = !flag
    ? 'ShareAdd__btn ShareAdd__btn-white'
    : 'ShareAdd__btn ShareAdd__btn-blue';
  const btnRightClass = flag
    ? 'ShareAdd__btn ShareAdd__btn-white'
    : 'ShareAdd__btn ShareAdd__btn-blue';

  return (
    <div className="ShareAdd">
      <span onClick={() => setQrCode('sm')} className={btnLeftClass}>
        Поделиться
      </span>
      <span onClick={() => setQrCode('lg')} className={btnRightClass}>
        Добавить
      </span>
    </div>
  );
};

export default ShareAdd;
