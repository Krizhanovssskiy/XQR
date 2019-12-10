import { useOnWheel } from '../../_helpers/customHooks';
import React from 'react';
import TabPeekout from './TabPeekout';
import Tab from './Tab';

const TabsNavbarScroll = ({
  children,
  onClickfunc,
  activeTab,
  classPrefix
}) => {
  const { wheeledElement, onMouseWheel } = useOnWheel();

  return (
    <ul
      ref={wheeledElement}
      onWheel={onMouseWheel}
      className={`${classPrefix}__tabs-list`}
    >
      {children.map(child => {
        const { tabsLabel } = child.props;
        return activeTab === tabsLabel ? (
          <TabPeekout
            key={tabsLabel}
            tabsLabel={tabsLabel}
            classPrefix={classPrefix}
          />
        ) : (
          <Tab
            key={tabsLabel}
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
