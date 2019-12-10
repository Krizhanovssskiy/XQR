import React from 'react';

const Tab = ({ tabsLabel, activeTab, classPrefix, onClickfunc }) => {
  const tabClassName =
    activeTab === tabsLabel
      ? `${classPrefix}__tab-item ${classPrefix}__tab-item--active`
      : `${classPrefix}__tab-item`;

  return (
    <li
      key={tabsLabel}
      className={tabClassName}
      onClick={() => onClickfunc(tabsLabel)}>
      <h3 className={`${classPrefix}__tab-title`}>{tabsLabel}</h3>
    </li>
  );
};

export default Tab;
