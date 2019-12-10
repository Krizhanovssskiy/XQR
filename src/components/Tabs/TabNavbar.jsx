import React from 'react';
import Tab from './Tab';

const TabsNavbarScroll = ({
  children,
  onClickfunc,
  activeTab,
  classPrefix
}) => {
  return (
    <ul className={`${classPrefix}__tabs-list`}>
      {children.map((child ,key)=> {
        const { tabsLabel } = child.props;
        return (
          <Tab
            key={key}
            onClickfunc={onClickfunc}
            activeTab={activeTab}
            tabsLabel={tabsLabel}
            classPrefix={classPrefix}
          />
        );
      })}
    </ul>
  );
};

export default TabsNavbarScroll;
