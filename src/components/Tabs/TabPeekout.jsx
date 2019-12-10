import React, { useRef, useEffect } from 'react';

const TabPeekout = ({ tabsLabel, classPrefix }) => {
  const liElement = useRef(null);

  useEffect(() => {
    liElement.current.scrollIntoView({ inline: 'center' });
  }, []);

  const tabClassName = `${classPrefix}__tab-item ${classPrefix}__tab-item--active`;
  return (
    <li ref={liElement} key={tabsLabel} className={tabClassName}>
      <h3 className={`${classPrefix}__tab-title`}>{tabsLabel}</h3>
    </li>
  );
};

export default TabPeekout;
